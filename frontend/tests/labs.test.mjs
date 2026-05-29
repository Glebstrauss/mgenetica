import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const repoRoot = new URL('../..', import.meta.url).pathname

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

test('course-engine labs are wired into every generated module', () => {
  const curriculum = readJson(join(repoRoot, 'frontend/src/data/legacy-curriculum.generated.json'))
  const modules = curriculum.modules || []

  assert.equal(modules.length, 21)
  assert.equal(modules.filter((module) => /^\/labs\/[A-Za-z0-9_-]+\.html$/.test(module.lab || '')).length, 21)

  for (const module of modules) {
    assert.ok(existsSync(join(repoRoot, 'frontend/public', module.lab)), `${module.id} lab file exists`)
  }
})

test('backend catalog exposes lab metadata without loading lesson bodies', () => {
  const catalog = readJson(join(repoRoot, 'appwrite/functions/courses/catalog.generated.json'))

  assert.equal(catalog.length, 21)
  assert.equal(catalog.filter((course) => /^\/labs\/[A-Za-z0-9_-]+\.html$/.test(course.lab || '')).length, 21)
  assert.ok(catalog.every((course) => !('sections' in course)), 'catalog stays compact')
})

test('Appwrite course detail payload has the same lab contract', () => {
  const curriculum = readJson(join(repoRoot, 'appwrite/functions/courses/legacy-curriculum.generated.json'))
  const modules = curriculum.modules || []

  assert.equal(modules.length, 21)
  assert.equal(modules.filter((module) => /^\/labs\/[A-Za-z0-9_-]+\.html$/.test(module.lab || '')).length, 21)
})
