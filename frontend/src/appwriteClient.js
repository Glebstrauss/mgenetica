// Appwrite JS SDK client (frontend)
// Install: npm i appwrite

import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'http://localhost/v1')
  .setProject(process.env.APPWRITE_PROJECT || 'YOUR_PROJECT_ID');

// Example: use Databases for collections
const databases = new Databases(client);

// Helper to execute Appwrite Functions via REST API
async function executeFunction(functionId, payload) {
  const endpoint = (process.env.APPWRITE_ENDPOINT || 'http://localhost/v1').replace(/\/$/, '');
  const project = process.env.APPWRITE_PROJECT || 'YOUR_PROJECT_ID';
  const apiKey = process.env.APPWRITE_API_KEY || '';
  const url = `${endpoint}/functions/${functionId}/executions`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Appwrite-Project': project
  };
  if (apiKey) headers['X-Appwrite-Key'] = apiKey;
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) });
  return res.json();
}

export { client, databases, executeFunction };

// Usage example in frontend:
// import { executeFunction } from './appwriteClient'
// executeFunction(process.env.APPWRITE_FUNCTION_QUIZZES_ID, { quizId:1, answers:[true,false,true] })
