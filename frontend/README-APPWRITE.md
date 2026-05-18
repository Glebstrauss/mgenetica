Using Appwrite with the frontend

1. Install SDK: cd frontend && npm i appwrite
2. Set environment variables in Vercel or local .env: APPWRITE_ENDPOINT and APPWRITE_PROJECT
3. In production, point APPWRITE_ENDPOINT to your Appwrite installation (e.g., https://appwrite.example.com/v1)
4. Replace calls to /quizzes with either Appwrite Function endpoint or databases.listDocuments for collections.

Example fetch to function:
fetch(`${APPWRITE_ENDPOINT}/functions/<FUNCTION_ID>/executions`, { method: 'POST', headers: { 'X-Appwrite-Project': APPWRITE_PROJECT, 'Content-Type': 'application/json', 'X-Appwrite-Key': '<API_KEY>' }, body: JSON.stringify({quizId:1,answers:[true,false,true]}) })
