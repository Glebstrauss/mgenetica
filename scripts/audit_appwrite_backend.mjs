#!/usr/bin/env node

const endpoint = process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1'
const projectId = process.env.APPWRITE_PROJECT_ID || '6a0b2fc1001c380eeb26'
const apiKey =
  process.env.APPWRITE_API_KEY ||
  process.env.APPWRITE_ADMIN_API_KEY ||
  process.env.APPWRITE_FUNCTION_API_KEY ||
  ''

if (!apiKey) {
  console.log('Skipping Appwrite backend audit: APPWRITE_API_KEY, APPWRITE_ADMIN_API_KEY, or APPWRITE_FUNCTION_API_KEY is not available.')
  process.exit(0)
}

async function readJson(response) {
  const text = await response.text()
  if (!text) return {}
  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}

async function adminGet(pathname) {
  const response = await fetch(`${endpoint}${pathname}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': projectId,
      'X-Appwrite-Key': apiKey
    }
  })
  const data = await readJson(response)
  if (!response.ok) {
    throw new Error(`${pathname} failed with ${response.status}: ${data?.message || data?.error || 'unknown_error'}`)
  }
  return data
}

const users = await adminGet('/users?limit=100')
const functions = await adminGet('/functions?limit=100')
const functionIds = new Set((functions.functions || []).map((fn) => fn.$id))
const requiredFunctions = [
  'mgenetica_courses_fn',
  'mgenetica_quizzes_fn',
  'mgenetica_progress_fn',
  'mgenetica_auth_fn',
  'mgenetica_admin_fn'
]

for (const id of requiredFunctions) {
  if (!functionIds.has(id)) {
    throw new Error(`Missing Appwrite function: ${id}`)
  }
}

if (!Number.isFinite(Number(users.total)) || Number(users.total) < 1) {
  throw new Error('Appwrite backend has no users; expected existing real accounts.')
}

console.log('Appwrite backend audit OK')
console.log(`Endpoint: ${endpoint}`)
console.log(`Project: ${projectId}`)
console.log(`Users total: ${users.total}`)
console.log(`Functions total: ${functions.total}`)
console.log(`Required functions: ${requiredFunctions.length}`)
