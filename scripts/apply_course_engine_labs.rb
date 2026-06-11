#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'
require 'fileutils'
require 'optparse'

ROOT = File.expand_path('..', __dir__)
DEFAULT_EXPECTED_MODULES = 21

options = {
  package: nil,
  expected_modules: DEFAULT_EXPECTED_MODULES,
  dry_run: false
}

OptionParser.new do |parser|
  parser.banner = 'Usage: ruby scripts/apply_course_engine_labs.rb --package course-engine-admin/<package> [--dry-run]'
  parser.on('--package PATH', 'Pacote Admin com site-ingest.json') { |value| options[:package] = value }
  parser.on('--expected-modules N', Integer, 'Quantidade esperada de modulos') { |value| options[:expected_modules] = value }
  parser.on('--dry-run', 'Valida plano sem escrever') { options[:dry_run] = true }
end.parse!

abort 'erro: use --package course-engine-admin/<package>' unless options[:package]

package_dir = File.expand_path(options[:package], ROOT)
ingest_path = File.join(package_dir, 'site-ingest.json')
abort "erro: site-ingest.json ausente em #{package_dir}" unless File.file?(ingest_path)

ingest = JSON.parse(File.read(ingest_path, encoding: 'UTF-8'))
abort "erro: schema inesperado: #{ingest['schema'].inspect}" unless ingest['schema'] == 'mgenetica-site-ingest/v1'

modules = ingest['modulos']
abort 'erro: site-ingest.json sem modulos[]' unless modules.is_a?(Array)
abort "erro: esperado #{options[:expected_modules]} modulos, recebido #{modules.length}" unless modules.length == options[:expected_modules]

labs_src_dir = File.expand_path(ingest.dig('assets', 'labs_src_dir') || 'interactive', package_dir)
labs_dest_dir = File.expand_path(ingest.dig('assets', 'labs_dest_dir') || 'frontend/public/labs', ROOT)

lab_rows = modules.map do |row|
  route = row['module_route'].to_s
  lab_file = row['lab_file'].to_s
  public_path = row['lab_public_path'].to_s
  abort "erro: module_route invalido: #{row.inspect}" unless route.match?(/\Amodule-\d{2}\z/)
  abort "erro: lab_file invalido em #{route}: #{lab_file.inspect}" unless lab_file.match?(/\AM\d{2}_[A-Za-z0-9_-]+\.html\z/)
  abort "erro: lab_public_path invalido em #{route}: #{public_path.inspect}" unless public_path == "/labs/#{lab_file}"

  src = File.join(labs_src_dir, lab_file)
  abort "erro: lab ausente no pacote: #{src}" unless File.file?(src)

  {
    route: route,
    lab_file: lab_file,
    public_path: public_path,
    src: src,
    dst: File.join(labs_dest_dir, lab_file)
  }
end

def read_json(path)
  JSON.parse(File.read(path, encoding: 'UTF-8'))
end

def write_json(path, payload)
  File.write(path, "#{JSON.pretty_generate(payload)}\n", encoding: 'UTF-8')
end

def update_modules_payload(payload, lab_by_route)
  modules = payload['modules']
  abort 'erro: JSON sem modules[]' unless modules.is_a?(Array)

  touched = 0
  modules.each do |course|
    lab = lab_by_route[course['id']]
    next unless lab

    course['lab'] = lab[:public_path]
    course['labFile'] = lab[:lab_file]
    touched += 1
  end
  touched
end

def update_catalog_payload(payload, lab_by_route)
  abort 'erro: catalog.generated.json nao e lista' unless payload.is_a?(Array)

  touched = 0
  payload.each do |course|
    lab = lab_by_route[course['id']]
    next unless lab

    course['lab'] = lab[:public_path]
    course['labFile'] = lab[:lab_file]
    touched += 1
  end
  touched
end

lab_by_route = lab_rows.to_h { |row| [row[:route], row] }
json_targets = [
  ['frontend curriculum', File.join(ROOT, 'frontend/src/data/legacy-curriculum.generated.json'), :modules],
  ['Appwrite curriculum', File.join(ROOT, 'appwrite/functions/courses/legacy-curriculum.generated.json'), :modules],
  ['Appwrite catalog', File.join(ROOT, 'appwrite/functions/courses/catalog.generated.json'), :catalog]
]

updates = json_targets.map do |label, path, kind|
  abort "erro: JSON ausente: #{path}" unless File.file?(path)

  payload = read_json(path)
  touched = kind == :catalog ? update_catalog_payload(payload, lab_by_route) : update_modules_payload(payload, lab_by_route)
  abort "erro: #{label} tocou #{touched}/#{options[:expected_modules]} labs" unless touched == options[:expected_modules]

  [label, path, payload, touched]
end

unless options[:dry_run]
  FileUtils.mkdir_p(labs_dest_dir)
  lab_rows.each { |row| FileUtils.cp(row[:src], row[:dst]) }
  updates.each { |_label, path, payload, _touched| write_json(path, payload) }
end

puts JSON.pretty_generate(
  ok: true,
  dryRun: options[:dry_run],
  package: package_dir,
  labsCopied: options[:dry_run] ? 0 : lab_rows.length,
  labsDestDir: labs_dest_dir,
  jsonTargets: updates.map { |label, path, _payload, touched| { label: label, path: path, labs: touched } }
)
