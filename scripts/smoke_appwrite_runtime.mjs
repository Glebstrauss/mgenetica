#!/usr/bin/env node

const endpoint = process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1'
const projectId = process.env.APPWRITE_PROJECT_ID || '6a0b2fc1001c380eeb26'
const origin = process.env.APPWRITE_ORIGIN || 'https://mgenetica.github.io'

const functions = {
  auth: 'mgenetica_auth_fn',
  courses: 'mgenetica_courses_fn',
  quizzes: 'mgenetica_quizzes_fn',
  progress: 'mgenetica_progress_fn',
  admin: 'mgenetica_admin_fn'
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

async function request(pathname, { method = 'GET', body } = {}) {
  const response = await fetch(`${endpoint}${pathname}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': projectId,
      Origin: origin
    },
    body: body ? JSON.stringify(body) : undefined
  })
  return { response, data: await readJson(response) }
}

async function executeFunction(functionId, payload) {
  const { response, data } = await request(`/functions/${functionId}/executions`, {
    method: 'POST',
    body: {
      async: false,
      body: JSON.stringify(payload)
    }
  })

  let responseBody = data.responseBody
  if (typeof responseBody === 'string' && responseBody) {
    try {
      responseBody = JSON.parse(responseBody)
    } catch {
      responseBody = { message: responseBody }
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    responseStatusCode: Number(data.responseStatusCode || 0),
    responseBody
  }
}

const accountCheck = await request('/account')
if (![401, 403].includes(accountCheck.response.status)) {
  throw new Error(`/account with production Origin returned unexpected status ${accountCheck.response.status}`)
}

const authCapabilities = await executeFunction(functions.auth, { action: 'capabilities' })
if (!authCapabilities.ok || authCapabilities.responseStatusCode >= 400 || authCapabilities.responseBody?.ok !== true) {
  throw new Error('Auth capabilities function did not return ok=true.')
}
if (!authCapabilities.responseBody?.flows?.includes('email-verification')) {
  throw new Error('Auth capabilities function does not advertise email-verification.')
}

const protectedChecks = [
  ['courses', functions.courses, { action: 'list', locale: 'pt-BR' }],
  ['quizzes', functions.quizzes, { action: 'get', courseId: 'module-01', locale: 'pt-BR' }],
  ['progress', functions.progress, { action: 'get' }],
  ['admin', functions.admin, { action: 'status' }]
]

for (const [name, functionId, payload] of protectedChecks) {
  const result = await executeFunction(functionId, payload)
  const deniedByExecution = [401, 403].includes(result.status)
  const deniedByFunction = [401, 403].includes(result.responseStatusCode) || result.responseBody?.error === 'auth_required'
  if (!deniedByExecution && !deniedByFunction) {
    throw new Error(`${name} function should reject guest access, got status ${result.status}/${result.responseStatusCode}.`)
  }
}

console.log('Appwrite runtime smoke OK')
console.log(`Endpoint: ${endpoint}`)
console.log(`Project: ${projectId}`)
console.log(`Origin checked: ${origin}`)
console.log('Auth capabilities: ok')
console.log(`Protected functions checked: ${protectedChecks.length}`)
