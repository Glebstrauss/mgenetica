#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'
require 'pathname'

ROOT = Pathname(__dir__).join('..').expand_path
DEFAULT_SITE_INGEST = ROOT.join('course-engine-admin/mgenetica-admin-package-validation/site-ingest.json')
SITE_INGEST_PATH = Pathname(ENV.fetch('COURSE_ENGINE_SITE_INGEST', DEFAULT_SITE_INGEST.to_s)).expand_path

CURRICULUM_TARGETS = [
  ROOT.join('frontend/src/data/legacy-curriculum.generated.json'),
  ROOT.join('appwrite/functions/courses/legacy-curriculum.generated.json')
].freeze

CATALOG_TARGET = ROOT.join('appwrite/functions/courses/catalog.generated.json')
PUBLIC_LABS_DIR = ROOT.join('frontend/public/labs')

def read_json(path)
  JSON.parse(path.read)
rescue JSON::ParserError => e
  raise "Invalid JSON at #{path}: #{e.message}"
end

def write_json(path, payload)
  path.write(JSON.pretty_generate(payload) + "\n")
end

def lab_lookup(site_ingest_path)
  raise "Missing site ingest: #{site_ingest_path}" unless site_ingest_path.file?

  ingest = read_json(site_ingest_path)
  modules = ingest.fetch('modulos')
  modules.each_with_object({}) do |row, memo|
    module_route = row.fetch('module_route')
    lab_public_path = row.fetch('lab_public_path')
    unless lab_public_path.match?(%r{\A/labs/[A-Za-z0-9_-]+\.html\z})
      raise "Unsafe lab path for #{module_route}: #{lab_public_path}"
    end

    memo[module_route] = {
      'lab' => lab_public_path,
      'labFile' => row.fetch('lab_file'),
      'labSourcePath' => row.fetch('lab_src'),
      'courseEngineModuleId' => row.fetch('id')
    }
  end
end

def assert_public_labs!(labs)
  missing = labs.values
    .map { |lab| PUBLIC_LABS_DIR.join(lab.fetch('lab').delete_prefix('/labs/')) }
    .reject(&:file?)
  return if missing.empty?

  raise "Missing public lab files:\n#{missing.map(&:to_s).join("\n")}"
end

def apply_to_curriculum(path, labs)
  payload = read_json(path)
  modules = payload.fetch('modules')
  touched = 0

  modules.each do |course|
    lab = labs.fetch(course.fetch('id'))
    course.merge!(lab)
    touched += 1
  end

  raise "Expected #{labs.length} modules in #{path}, touched #{touched}" unless touched == labs.length

  write_json(path, payload)
  touched
end

def apply_to_catalog(path, labs)
  payload = read_json(path)
  touched = 0

  payload.each do |course|
    lab = labs.fetch(course.fetch('id'))
    course['lab'] = lab.fetch('lab')
    course['labFile'] = lab.fetch('labFile')
    touched += 1
  end

  raise "Expected #{labs.length} catalog entries in #{path}, touched #{touched}" unless touched == labs.length

  write_json(path, payload)
  touched
end

labs = lab_lookup(SITE_INGEST_PATH)
assert_public_labs!(labs)

curriculum_counts = CURRICULUM_TARGETS.map { |path| [path, apply_to_curriculum(path, labs)] }
catalog_count = apply_to_catalog(CATALOG_TARGET, labs)

puts JSON.pretty_generate({
  site_ingest: SITE_INGEST_PATH.to_s,
  modules: labs.length,
  curriculum_targets: curriculum_counts.to_h { |path, count| [path.to_s.sub("#{ROOT}/", ''), count] },
  catalog_target: CATALOG_TARGET.to_s.sub("#{ROOT}/", ''),
  catalog_entries: catalog_count
})
