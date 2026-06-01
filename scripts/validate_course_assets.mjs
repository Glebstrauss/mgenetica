#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const visualMapPath = path.join(root, 'frontend/src/data/courseVisualAssets.js')
const assetsRoot = path.join(root, 'frontend/public')
const manifestPath = path.join(assetsRoot, 'course-assets/manifest.json')
const curriculumPath = path.join(root, 'frontend/src/data/legacy-curriculum.generated.json')
const quizPath = path.join(root, 'appwrite/functions/quizzes/quiz-bank.generated.json')

const visualSource = await fs.readFile(visualMapPath, 'utf8')
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
const curriculum = JSON.parse(await fs.readFile(curriculumPath, 'utf8'))
const quizzes = JSON.parse(await fs.readFile(quizPath, 'utf8'))

const expectedIds = Array.from({ length: 21 }, (_, index) => `module-${String(index + 1).padStart(2, '0')}`)
const mapIds = [...visualSource.matchAll(/'module-\d{2}'/g)].map((match) => match[0].replaceAll("'", ''))
const uniqueMapIds = [...new Set(mapIds)]

if (uniqueMapIds.length !== 21) {
  throw new Error(`Expected 21 mapped visual assets, found ${uniqueMapIds.length}.`)
}

for (const id of expectedIds) {
  if (!uniqueMapIds.includes(id)) {
    throw new Error(`Missing visual asset mapping for ${id}.`)
  }
}

const assetEntries = [...visualSource.matchAll(/src:\s*'([^']+)'/g)].map((match) => match[1])
for (const assetPath of assetEntries) {
  await fs.access(path.join(assetsRoot, assetPath))
}

const interactiveAssets = assetEntries.filter((item) => item.endsWith('.html'))
const imageAssets = assetEntries.filter((item) => item.endsWith('.svg'))
if (interactiveAssets.length !== 5) {
  throw new Error(`Expected 5 interactive HTML assets, found ${interactiveAssets.length}.`)
}
if (imageAssets.length !== 16) {
  throw new Error(`Expected 16 SVG assets, found ${imageAssets.length}.`)
}

if (!Array.isArray(manifest.modulos) || manifest.modulos.length !== 21) {
  throw new Error('Course asset manifest must contain 21 modules.')
}

if (!Array.isArray(curriculum.modules) || curriculum.modules.length !== 21) {
  throw new Error('Learner curriculum must contain 21 modules.')
}

if (!Array.isArray(quizzes) || quizzes.length !== 21) {
  throw new Error('Quiz bank must contain 21 quiz sets.')
}

const curriculumIds = new Set(curriculum.modules.map((item) => item.id))
const quizIds = new Set(quizzes.map((item) => item.id))
for (const id of expectedIds) {
  if (!curriculumIds.has(id)) throw new Error(`Missing curriculum module ${id}.`)
  if (!quizIds.has(id)) throw new Error(`Missing quiz set ${id}.`)
}

for (const quiz of quizzes) {
  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    throw new Error(`Quiz ${quiz.id} has no questions.`)
  }
}

console.log('Course asset validation OK')
console.log(`Mapped modules: ${uniqueMapIds.length}`)
console.log(`SVG assets: ${imageAssets.length}`)
console.log(`Interactive HTML assets: ${interactiveAssets.length}`)
