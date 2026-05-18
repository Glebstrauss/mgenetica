Using Appwrite with the frontend

1. Install SDK: `cd frontend && npm i appwrite`
2. Appwrite SDK is configured in `src/lib/appwrite.js` with:
   - endpoint: `https://fra.cloud.appwrite.io/v1`
   - project: `6a0b2fc1001c380eeb26`
3. Set function IDs in `.env` from `.env.example`:
   - `VITE_APPWRITE_FUNCTION_COURSES_ID`
   - `VITE_APPWRITE_FUNCTION_QUIZZES_ID`
   - `VITE_APPWRITE_FUNCTION_PROGRESS_ID`
   - `VITE_APPWRITE_FUNCTION_AUTH_ID`
4. App startup automatically calls `client.ping()` through `pingAppwrite()`.
5. The dashboard and quiz now call Appwrite Functions via:
   - `listCourses()`
   - `submitQuiz()`
