#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'
require 'yaml'
require 'pathname'

COMMIT = 'a56b61bf79269ece0194ddc8c77febe336ce2020'
ROOT = Pathname(__dir__).join('..').expand_path

def git_show(path)
  output = `git show #{COMMIT}:#{path} 2>/dev/null`
  raise "Missing legacy path #{path} in commit #{COMMIT}" if output.nil? || output.strip.empty?

  output
end

def normalize_module_id(legacy_id)
  number = legacy_id.to_s.delete_prefix('M').to_i
  format('module-%02d', number)
end

structure = YAML.safe_load(git_show('data/course-structure-redesign.yml'))
content = YAML.safe_load(git_show('data/course-content.yml'))

course = structure.fetch('course_redesign')
content_modules = content.fetch('course_content').fetch('modules')
modules_by_id = course.fetch('modules').each_with_object({}) { |module_row, memo| memo[module_row.fetch('id')] = module_row }

curriculum_modules = course.fetch('blocks').flat_map do |block|
  block.fetch('modules').map do |legacy_id|
    module_row = modules_by_id.fetch(legacy_id)
    content_row = content_modules.fetch(legacy_id)
    {
      id: normalize_module_id(legacy_id),
      legacyId: legacy_id,
      order: legacy_id.delete_prefix('M').to_i,
      blockId: block.fetch('id'),
      blockTitle: block.fetch('title'),
      blockSummary: block.fetch('summary'),
      title: module_row.fetch('title'),
      feynmanQuestion: module_row.fetch('feynman_question'),
      objective: module_row.fetch('objective'),
      prerequisites: module_row.fetch('prerequisites'),
      topics: module_row.fetch('topics'),
      analogy: module_row.fetch('analogy'),
      animalExample: module_row.fetch('animal_example'),
      manualCalculation: module_row.fetch('manual_calculation'),
      rScript: module_row.fetch('r_script'),
      suggestedVisual: module_row.fetch('suggested_visual'),
      checkpoint: module_row.fetch('checkpoint'),
      task: module_row.fetch('task'),
      completionEvidence: module_row.fetch('completion_evidence'),
      estimatedTime: module_row.fetch('estimated_time'),
      intro: content_row.fetch('intro'),
      coreExplanation: content_row.fetch('core_explanation'),
      technicalNote: content_row.fetch('technical_note'),
      workedExample: content_row.fetch('worked_example'),
      labObjective: content_row.fetch('lab_objective'),
      labObserve: content_row.fetch('lab_observe'),
      quizFocus: content_row.fetch('quiz_focus'),
      glossaryTerms: content_row.fetch('glossary_terms')
    }
  end
end

quiz_bank = curriculum_modules.map do |course_row|
  quiz_number = course_row.fetch(:order)
  quiz_path = format('quizzes/quiz-%02d.json', quiz_number)
  quiz = JSON.parse(git_show(quiz_path))
  {
    id: course_row.fetch(:id),
    legacyId: course_row.fetch(:legacyId),
    title: quiz.fetch('title'),
    subtitle: quiz.fetch('subtitle'),
    passMark: quiz.fetch('passMark'),
    questions: quiz.fetch('questions')
  }
end

frontend_payload = {
  importedFromCommit: COMMIT,
  moduleCount: curriculum_modules.length,
  modules: curriculum_modules
}

backend_catalog = curriculum_modules.map do |course_row|
  {
    id: course_row.fetch(:id),
    order: course_row.fetch(:order),
    legacyId: course_row.fetch(:legacyId),
    blockId: course_row.fetch(:blockId),
    blockTitle: course_row.fetch(:blockTitle),
    title: course_row.fetch(:title),
    description: course_row.fetch(:objective),
    published: true
  }
end

File.write(ROOT.join('frontend/src/data/legacy-curriculum.generated.json'), JSON.pretty_generate(frontend_payload) + "\n")
File.write(ROOT.join('appwrite/functions/courses/catalog.generated.json'), JSON.pretty_generate(backend_catalog) + "\n")
File.write(ROOT.join('appwrite/functions/quizzes/quiz-bank.generated.json'), JSON.pretty_generate(quiz_bank) + "\n")

puts "generated #{frontend_payload[:moduleCount]} modules and #{quiz_bank.length} quizzes from #{COMMIT}"
