import { Client, Account, Databases, ID } from 'appwrite';

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

const account = new Account(client);
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
    credentials: includeCredentials ? 'include' : 'same-origin',
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || 'Appwrite execution failed.');
  }
  if (typeof data?.responseBody === 'string' && data.responseBody.length > 0) {
    try {
      return JSON.parse(data.responseBody);
    } catch (_) {
      return data.responseBody;
    }
  }
  return data;
}

function normalizeAuthError(err) {
  const message = String(err?.message || '');
  if (/user_already_exists|already exists|already been registered/i.test(message)) {
    return 'Este e-mail já existe. Entre com a conta existente.'
  }
  if (/invalid credentials|invalid password|user_invalid_credentials/i.test(message)) {
    return 'E-mail ou senha inválidos.'
  }
  if (/origin|platform|host|domain|not allowed|general_unknown_origin/i.test(message)) {
    return 'Host atual não está liberado no Appwrite Web Platform. Adicione URL publicada antes de testar login.'
  }
  if (/network|failed to fetch/i.test(message)) {
    return 'Falha de rede ao falar com Appwrite.'
  }
  return message || 'Não foi possível autenticar.'
}

async function listCourses() {
  return executeFunction(functionIds.courses, { action: 'list' }, { includeCredentials: true });
}

async function submitQuiz(quizId, answers) {
  return executeFunction(functionIds.quizzes, { quizId, answers }, { includeCredentials: true });
}

async function getProgress(userId) {
  return executeFunction(functionIds.progress, { action: 'get', userId }, { includeCredentials: true });
}

async function getAuthCapabilities() {
  return executeFunction(functionIds.auth, { action: 'capabilities' }, { includeCredentials: true });
}

async function getAdminStatus(email) {
  return executeFunction(functionIds.admin, { action: 'status', email }, { includeCredentials: true });
}

async function createEmailSession(email, password) {
  return account.createEmailSession(email, password);
}

async function createAccount(email, password, name) {
  return account.create(ID.unique(), email, password, name || undefined);
}

async function deleteSession() {
  return account.deleteSession('current');
}

async function getAccount() {
  return account.get();
}

export {
  client,
  account,
  databases,
  pingAppwrite,
  functionIds,
  executeFunction,
  listCourses,
  submitQuiz,
  getProgress,
  getAuthCapabilities,
  getAdminStatus,
  createEmailSession,
  createAccount,
  deleteSession,
  getAccount,
  normalizeAuthError,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  PUBLIC_SITE_URL
};
