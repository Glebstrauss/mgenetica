// Appwrite JS SDK client (frontend)
// Install: npm i appwrite

import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'http://localhost/v1')
  .setProject(process.env.APPWRITE_PROJECT || 'YOUR_PROJECT_ID');

// Example: use Databases for collections
const databases = new Databases(client);

export { client, databases };

// Usage example in frontend:
// databases.listDocuments(databaseId, collectionId)
// or call a function via fetch to the Appwrite Functions endpoint
