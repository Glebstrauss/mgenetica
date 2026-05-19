import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6a0b2fc1001c380eeb26');

const account = new Account(client);
const databases = new Databases(client);

async function pingAppwrite() {
  return client.ping();
}

const functionIds = {
  courses: import.meta.env.VITE_APPWRITE_FUNCTION_COURSES_ID || '',
  quizzes: import.meta.env.VITE_APPWRITE_FUNCTION_QUIZZES_ID || '',
  progress: import.meta.env.VITE_APPWRITE_FUNCTION_PROGRESS_ID || '',
  auth: import.meta.env.VITE_APPWRITE_FUNCTION_AUTH_ID || ''
};

// Execute Appwrite function from the browser. Uses cookie-based sessions when available.
async function executeFunction(functionId, payload = {}, { includeCredentials = true } = {}) {
  if (!functionId) {
    throw new Error('Missing Appwrite function ID.');
  }
  const res = await fetch(`https://fra.cloud.appwrite.io/v1/functions/${functionId}/executions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': '6a0b2fc1001c380eeb26'
    },
    credentials: includeCredentials ? 'include' : 'same-origin',
    body: JSON.stringify(payload)
  });

  // Appwrite returns an execution object. The real payload is in responseBody string.
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

async function listCourses() {
  // try to call with credentials (session) so protected functions work
  return executeFunction(functionIds.courses, {}, { includeCredentials: true });
}

async function submitQuiz(quizId, answers) {
  return executeFunction(functionIds.quizzes, { quizId, answers }, { includeCredentials: true });
}

// Authentication helpers
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

export { client, account, databases, pingAppwrite, functionIds, executeFunction, listCourses, submitQuiz, createEmailSession, createAccount, deleteSession, getAccount };
