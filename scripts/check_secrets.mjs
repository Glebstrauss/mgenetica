#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(scriptDirectory, '..')
const ignoredDirectories = new Set([
  '.git',
  '.quarto',
  '.Rproj.user',
  '.superpowers',
  '.opencode',
  'node_modules',
  'dist',
  'build',
  'docs',
  '_freeze'
])
const ignoredFileNames = new Set([
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock'
])
const ignoredExtensions = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico',
  '.pdf',
  '.zip',
  '.gz',
  '.woff',
  '.woff2',
  '.ttf'
])

const rules = [
  {
    name: 'appwrite-standard-api-key',
    pattern: /standard_[A-Za-z0-9]{80,}/
  },
  {
    name: 'appwrite-api-key-env-assignment',
    pattern: /APPWRITE(?:_[A-Z0-9]+)*_API_KEY\s*[=:]\s*['\"]?(?:standard_)?[A-Za-z0-9_\-]{80,}/
  }
]

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, files)
      continue
    }
    if (!entry.isFile()) continue
    if (ignoredFileNames.has(entry.name)) continue
    if (ignoredExtensions.has(path.extname(entry.name).toLowerCase())) continue
    files.push(fullPath)
  }
  return files
}

function gitTrackedFiles() {
  try {
    const output = execFileSync('git', ['-C', root, 'ls-files', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' })
    return output
      .split('\n')
      .filter(Boolean)
      .filter((file) => !ignoredFileNames.has(path.basename(file)))
      .filter((file) => !ignoredExtensions.has(path.extname(file).toLowerCase()))
      .map((file) => path.join(root, file))
  } catch {
    return null
  }
}

function isProbablyText(filePath) {
  const buffer = fs.readFileSync(filePath)
  return !buffer.includes(0)
}

const filesToScan = gitTrackedFiles() || walk(root)
const findings = []
for (const filePath of filesToScan) {
  if (!isProbablyText(filePath)) continue
  const relativePath = path.relative(root, filePath)
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/)
  for (const [index, line] of lines.entries()) {
    for (const rule of rules) {
      if (rule.pattern.test(line)) {
        findings.push({ path: relativePath, line: index + 1, rule: rule.name })
      }
    }
  }
}

if (findings.length > 0) {
  console.error('Secret scan failed. Potential secret material found:')
  for (const finding of findings) {
    console.error(`- ${finding.path}:${finding.line} (${finding.rule})`)
  }
  console.error('Values are intentionally not printed. Remove the secret and rotate it before committing.')
  process.exit(1)
}

console.log('Secret scan OK')
