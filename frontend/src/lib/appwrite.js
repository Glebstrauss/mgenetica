import { Client, Databases, ID } from 'appwrite';

const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || '6a0b2fc1001c380eeb26';
const PUBLIC_SITE_URL = import.meta.env.VITE_PUBLIC_SITE_URL || 'https://mgenetica.github.io/mgenetica/';
const DEFAULT_FUNCTION_IDS = {
  courses: 'mgenetica_courses_fn',
  quizzes: 'mgenetica_quizzes_fn',
  progress: 'mgenetica_progress_fn',
  auth: 'mgenetica_auth_fn',
  admin: 'mgenetica_admin_fn'
};

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);

async function pingAppwrite() {
  return client.ping();
}

const functionIds = {
  courses: import.meta.env.VITE_APPWRITE_FUNCTION_COURSES_ID || DEFAULT_FUNCTION_IDS.courses,
  quizzes: import.meta.env.VITE_APPWRITE_FUNCTION_QUIZZES_ID || DEFAULT_FUNCTION_IDS.quizzes,
  progress: import.meta.env.VITE_APPWRITE_FUNCTION_PROGRESS_ID || DEFAULT_FUNCTION_IDS.progress,
  auth: import.meta.env.VITE_APPWRITE_FUNCTION_AUTH_ID || DEFAULT_FUNCTION_IDS.auth,
  admin: import.meta.env.VITE_APPWRITE_FUNCTION_ADMIN_ID || DEFAULT_FUNCTION_IDS.admin
};

async function executeFunction(functionId, payload = {}, { includeCredentials = true } = {}) {
  if (!functionId) {
    throw new Error('Missing Appwrite function ID. Check frontend env vars or keep canonical IDs aligned with appwrite/functions.json.');
  }
  const res = await fetch(`${APPWRITE_ENDPOINT}/functions/${functionId}/executions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': APPWRITE_PROJECT_ID
    },
    credentials: includeCredentials ? 'include' : 'omit',
    body: JSON.stringify({
      async: false,
      body: JSON.stringify(payload)
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || 'Appwrite execution failed.');
  }
  let payloadData = data;
  if (typeof data?.responseBody === 'string' && data.responseBody.length > 0) {
    try {
      payloadData = JSON.parse(data.responseBody);
    } catch (_) {
      payloadData = data.responseBody;
    }
  } else if (data?.responseBody && typeof data.responseBody === 'object') {
    payloadData = data.responseBody;
  }
  if (Number(data?.responseStatusCode || 0) >= 400) {
    throw new Error(payloadData?.message || data?.errors || 'Appwrite function execution failed.');
  }
  if (payloadData && typeof payloadData === 'object' && payloadData.ok === false) {
    throw new Error(payloadData.message || payloadData.error || 'Appwrite function returned an error.');
  }
  return payloadData;
}

function shouldUseCookieFallback() {
  return typeof window !== 'undefined';
}

function isLocalDevHost() {
  if (typeof window === 'undefined') return false;
  const host = String(window.location.hostname || '').toLowerCase();
  return host === 'localhost' || host === '127.0.0.1';
}

function getCookieFallbackStorage() {
  if (typeof window === 'undefined') return null;
  if (isLocalDevHost()) return window.localStorage || null;
  return window.sessionStorage || null;
}

function readCookieFallback() {
  const storage = getCookieFallbackStorage();
  if (!shouldUseCookieFallback() || !storage) return '';
  return storage.getItem('cookieFallback') || '';
}

function writeCookieFallback(response) {
  const storage = getCookieFallbackStorage();
  if (!shouldUseCookieFallback() || !storage) return;
  const fallback = response.headers.get('X-Fallback-Cookies');
  if (fallback) {
    storage.setItem('cookieFallback', fallback);
  }
}

function clearCookieFallback() {
  const storage = getCookieFallbackStorage();
  if (!shouldUseCookieFallback() || !storage) return;
  storage.removeItem('cookieFallback');
}

async function callAccountApi(path, { method = 'GET', payload, allowRetryWithoutCredentials = true } = {}) {
  const url = `${APPWRITE_ENDPOINT}${path}`;
  const run = async (credentials) => {
    const headers = {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': APPWRITE_PROJECT_ID
    };
    const cookieFallback = readCookieFallback();
    if (cookieFallback) headers['X-Fallback-Cookies'] = cookieFallback;
    const response = await fetch(url, {
      method,
      headers,
      credentials,
      body: payload ? JSON.stringify(payload) : undefined
    });
    writeCookieFallback(response);
    return response;
  };

  let response;
  try {
    response = await run('include');
  } catch (error) {
    if (!allowRetryWithoutCredentials || !shouldUseCookieFallback()) throw error;
    response = await run('omit');
  }

  const text = await response.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (_) {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Appwrite account request failed.');
  }

  return data;
}

function normalizeAuthError(err, messages = {}) {
  const message = String(err?.message || '');
  const isLoopback127 = typeof window !== 'undefined' && window.location.hostname === '127.0.0.1'
  if (/user_already_exists|already exists|already been registered/i.test(message)) {
    return messages.emailExists || 'Este e-mail já existe. Entre com a conta existente.'
  }
  if (/invalid credentials|invalid password|user_invalid_credentials/i.test(message)) {
    return messages.invalidCredentials || 'E-mail ou senha inválidos.'
  }
  if (/origin|platform|host|domain|not allowed|general_unknown_origin/i.test(message)) {
    return messages.originBlocked || 'Host atual não está liberado no Appwrite Web Platform. Adicione URL publicada antes de testar login.'
  }
  if (/network|failed to fetch/i.test(message)) {
    if (isLoopback127) {
      return messages.loopback127Blocked || '127.0.0.1 is not registered in Appwrite Web Platform. Open the app with localhost:5173 instead, or register 127.0.0.1 as a Web platform.'
    }
    return messages.network || 'Falha de rede ao falar com Appwrite.'
  }
  if (/missing scopes|role:\s*guests|account\W/i.test(message)) {
    return messages.sessionRejected || 'Session not accepted by Appwrite. Refresh the page and sign in again.'
  }
  if (/missing_admin_api_key|appwrite_function_api_key|function execution failed|appwrite function returned an error/i.test(message)) {
    return messages.servicesUnavailable || 'Learning services are temporarily unavailable. Please try again in a moment.'
  }
  return message || messages.generic || 'Não foi possível autenticar.'
}

function normalizeAppError(err, messages = {}) {
  const message = String(err?.message || '')
  if (/missing_admin_api_key|appwrite_function_api_key|function execution failed|appwrite function returned an error/i.test(message)) {
    return messages.servicesUnavailable || 'Learning services are temporarily unavailable. Please try again in a moment.'
  }
  if (/auth_required|session rejected|session not accepted|role:\s*guests|missing scopes/i.test(message)) {
    return messages.sessionRequired || 'Your session expired or was not accepted. Refresh and sign in again.'
  }
  return message || messages.generic || 'Could not complete the request.'
}

async function listCourses(locale) {
  return executeFunction(functionIds.courses, { action: 'list', locale }, { includeCredentials: true });
}

async function getQuiz(courseId, locale) {
  return executeFunction(functionIds.quizzes, { action: 'get', courseId, locale }, { includeCredentials: true });
}

async function submitQuiz(courseId, answers, locale) {
  return executeFunction(functionIds.quizzes, { action: 'submit', courseId, answers, locale }, { includeCredentials: true });
}

async function getProgress(userId) {
  return executeFunction(functionIds.progress, { action: 'get', userId }, { includeCredentials: true });
}

async function updateProgress(courseId, progress = {}) {
  return executeFunction(functionIds.progress, { action: 'update', courseId, ...progress }, { includeCredentials: true });
}

async function getAuthCapabilities() {
  return executeFunction(functionIds.auth, { action: 'capabilities' }, { includeCredentials: true });
}

async function getAdminStatus(email) {
  return executeFunction(functionIds.admin, { action: 'status', email }, { includeCredentials: true });
}

async function getAdminSummary(email) {
  return executeFunction(functionIds.admin, { action: 'summary', email }, { includeCredentials: true });
}

async function createEmailSession(email, password) {
  return callAccountApi('/account/sessions/email', {
    method: 'POST',
    payload: { email, password }
  });
}

async function createAccount(email, password, name) {
  return callAccountApi('/account', {
    method: 'POST',
    payload: { userId: ID.unique(), email, password, name: name || undefined }
  });
}

async function deleteSession() {
  const result = await callAccountApi('/account/sessions/current', {
    method: 'DELETE'
  });
  clearCookieFallback();
  return result;
}

async function getAccount() {
  return callAccountApi('/account', {
    method: 'GET'
  });
}

export {
  client,
  databases,
  pingAppwrite,
  functionIds,
  executeFunction,
  listCourses,
  getQuiz,
  submitQuiz,
  getProgress,
  updateProgress,
  getAuthCapabilities,
  getAdminStatus,
  getAdminSummary,
  createEmailSession,
  createAccount,
  deleteSession,
  getAccount,
  normalizeAuthError,
  normalizeAppError,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  PUBLIC_SITE_URL
};
