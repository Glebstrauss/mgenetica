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
const verificationUrl = process.env.APPWRITE_VERIFICATION_URL || 'https://mgenetica.github.io/mgenetica/#verify-email'

if (!apiKey) {
  console.log('Skipping Appwrite verification request smoke: APPWRITE_API_KEY, APPWRITE_ADMIN_API_KEY, or APPWRITE_FUNCTION_API_KEY is not available.')
  process.exit(0)
}

const configuredEmail = process.env.APPWRITE_SMOKE_EMAIL || ''
const configuredPassword = process.env.APPWRITE_SMOKE_PASSWORD || ''
const userId = `verify_${crypto.randomUUID().replaceAll('-', '').slice(0, 24)}`
const email = configuredEmail || `mgenetica.verify.${Date.now()}@example.com`
const password = configuredPassword || `Mg!${crypto.randomUUID()}9a`
const name = 'MGenetica Verification Smoke User'

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

let created = false
try {
  if (!configuredEmail || !configuredPassword) {
    await requireOk('create verification smoke user', appwriteRequest('/users', {
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
  if (!cookie) throw new Error('Login succeeded but did not return a session cookie.')

  const account = await requireOk('get current account', appwriteRequest('/account', { cookie }))
  if (account.data?.email !== email || (created && account.data?.$id !== userId)) {
    throw new Error('Current account does not match the verification smoke user.')
  }

  await requireOk('request verification email', appwriteRequest('/account/verification', {
    method: 'POST',
    cookie,
    body: { url: verificationUrl }
  }))

  console.log('Appwrite verification request smoke OK')
  console.log(`Endpoint: ${endpoint}`)
  console.log(`Project: ${projectId}`)
  console.log(`Verification URL: ${verificationUrl}`)
  console.log('Created/logged in account and requested an email verification message. Manual inbox click remains separate.')
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
