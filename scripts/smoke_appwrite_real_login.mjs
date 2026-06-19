#!/usr/bin/env node

import crypto from 'node:crypto'

const endpoint = process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1'
const projectId = process.env.APPWRITE_PROJECT_ID || '6a0b2fc1001c380eeb26'
const apiKey =
  process.env.APPWRITE_API_KEY ||
  process.env.APPWRITE_ADMIN_API_KEY ||
  process.env.APPWRITE_FUNCTION_API_KEY ||
  ''
const origin = process.env.APPWRITE_ORIGIN || 'https://mgenetica.github.io'

if (!apiKey) {
  console.log('Skipping real login smoke: APPWRITE_API_KEY, APPWRITE_ADMIN_API_KEY, or APPWRITE_FUNCTION_API_KEY is not available.')
  process.exit(0)
}

const configuredEmail = process.env.APPWRITE_SMOKE_EMAIL || ''
const configuredPassword = process.env.APPWRITE_SMOKE_PASSWORD || ''
const userId = `smoke_${crypto.randomUUID().replaceAll('-', '').slice(0, 24)}`
const email = configuredEmail || `mgenetica.smoke.${Date.now()}@example.com`
const password = configuredPassword || `Mg!${crypto.randomUUID()}9a`
const name = 'MGenetica Smoke User'

const functions = {
  auth: 'mgenetica_auth_fn',
  courses: 'mgenetica_courses_fn',
  quizzes: 'mgenetica_quizzes_fn',
  progress: 'mgenetica_progress_fn',
  admin: 'mgenetica_admin_fn'
}

function collectCookies(headers) {
  if (typeof headers.getSetCookie === 'function') {
    return headers.getSetCookie().map((cookie) => cookie.split(';')[0]).join('; ')
  }
  const cookie = headers.get('set-cookie')
  return cookie ? cookie.split(/,\s*(?=[^;,]+=)/).map((item) => item.split(';')[0]).join('; ') : ''
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

async function appwriteRequest(pathname, { method = 'GET', body, cookie, admin = false } = {}) {
  const response = await fetch(`${endpoint}${pathname}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': projectId,
      Origin: origin,
      ...(admin ? { 'X-Appwrite-Key': apiKey } : {}),
      ...(cookie ? { Cookie: cookie } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  })
  if (!response.ok) {
    console.error(`Request to ${pathname} failed: ${response.status} ${response.statusText}`)
    console.error(`Project ID: ${projectId}`)
    console.error(`Endpoint: ${endpoint}`)
  }
  const data = await readJson(response)
  return { response, data }
}

async function requireOk(label, promise) {
  const result = await promise
  if (!result.response.ok) {
    throw new Error(`${label} failed with ${result.response.status}: ${result.data?.message || result.data?.error || 'unknown_error'}`)
  }
  return result
}

async function executeFunction(functionId, payload, cookie) {
  const result = await appwriteRequest(`/functions/${functionId}/executions`, {
    method: 'POST',
    cookie,
    body: {
      async: false,
      body: JSON.stringify(payload)
    }
  })

  let responseBody = result.data.responseBody
  if (typeof responseBody === 'string' && responseBody) {
    try {
      responseBody = JSON.parse(responseBody)
    } catch {
      responseBody = { message: responseBody }
    }
  }

  const responseStatusCode = Number(result.data.responseStatusCode || result.response.status || 0)
  return {
    ...result,
    responseBody,
    responseStatusCode
  }
}

async function requireFunctionOk(label, functionId, payload, cookie) {
  const result = await executeFunction(functionId, payload, cookie)
  if (!result.response.ok || result.responseStatusCode >= 400 || result.responseBody?.ok === false) {
    throw new Error(`${label} failed with ${result.response.status}/${result.responseStatusCode}: ${result.responseBody?.message || result.responseBody?.error || result.data?.message || 'unknown_error'}`)
  }
  return result
}

async function requireFunctionDenied(label, functionId, payload, cookie) {
  const result = await executeFunction(functionId, payload, cookie)
  const denied = [401, 403].includes(result.responseStatusCode) || [401, 403].includes(result.response.status) || ['admin_required', 'auth_required'].includes(result.responseBody?.error)
  if (!denied) {
    throw new Error(`${label} should be denied for smoke user, got ${result.response.status}/${result.responseStatusCode}.`)
  }
  return result
}

let created = false
try {
  if (!configuredEmail || !configuredPassword) {
    await requireOk('create smoke user', appwriteRequest('/users', {
      method: 'POST',
      admin: true,
      body: { userId, email, password, name }
    }))
    created = true
  }

  const login = await requireOk('create email session', appwriteRequest('/account/sessions/email', {
    method: 'POST',
    body: { email, password }
  }))
  const cookie = collectCookies(login.response.headers)
  if (!cookie) {
    throw new Error('Login succeeded but did not return a session cookie.')
  }

  const account = await requireOk('get current account', appwriteRequest('/account', { cookie }))
  if (account.data?.email !== email || (created && account.data?.$id !== userId)) {
    throw new Error('Current account does not match the smoke user.')
  }
  const activeUserId = account.data?.$id || userId
  const authCapabilities = await requireFunctionOk('auth capabilities', functions.auth, { action: 'capabilities' }, cookie)
  if (!authCapabilities.responseBody?.flows?.includes('email-verification')) {
    throw new Error('Auth capabilities function does not advertise email-verification.')
  }

  const courses = await requireFunctionOk('courses list', functions.courses, { action: 'list', locale: 'pt-BR' }, cookie)
  if (!Array.isArray(courses.responseBody) || courses.responseBody.length !== 21) {
    throw new Error(`Expected 21 courses, got ${Array.isArray(courses.responseBody) ? courses.responseBody.length : 'non-array'}.`)
  }

  const quiz = await requireFunctionOk('quiz get', functions.quizzes, { action: 'get', courseId: 'module-01', locale: 'pt-BR' }, cookie)
  if (!Array.isArray(quiz.responseBody?.questions) || quiz.responseBody.questions.length === 0) {
    throw new Error('Quiz function did not return questions.')
  }

  await requireFunctionOk('progress get', functions.progress, { action: 'get', userId: activeUserId }, cookie)
  await requireFunctionOk('progress update', functions.progress, {
    action: 'update',
    courseId: 'module-01',
    percent: 100,
    quizScore: 1,
    quizTotal: 1,
    passMark: 1,
    passed: true,
    incrementAttempts: false
  }, cookie)
  await requireFunctionDenied('admin status', functions.admin, { action: 'status' }, cookie)

  console.log('Appwrite real login smoke OK')
  console.log(`Endpoint: ${endpoint}`)
  console.log(`Project: ${projectId}`)
  console.log(`Email verified: ${Boolean(account.data?.emailVerification)}`)
  console.log('Created/logged in account, checked email-verification capability, loaded courses, quiz, progress, and confirmed admin denial.')
} finally {
  if (created) {
    const cleanup = await appwriteRequest(`/users/${encodeURIComponent(userId)}`, {
      method: 'DELETE',
      admin: true
    })
    if (!cleanup.response.ok) {
      console.error(`Smoke cleanup failed for ${userId}: ${cleanup.response.status}`)
      process.exitCode = 1
    }
  }
}
