import { Client, Account, Databases } from 'appwrite';

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

async function executeFunction(functionId, payload = {}) {
  if (!functionId) {
    throw new Error('Missing Appwrite function ID.');
  }
  const res = await fetch(`https://fra.cloud.appwrite.io/v1/functions/${functionId}/executions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': '6a0b2fc1001c380eeb26'
    },
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

async function listCourses() {
  return executeFunction(functionIds.courses, {});
}

async function submitQuiz(quizId, answers) {
  return executeFunction(functionIds.quizzes, { quizId, answers });
}

export { client, account, databases, pingAppwrite, functionIds, executeFunction, listCourses, submitQuiz };
