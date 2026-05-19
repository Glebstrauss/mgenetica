Using Appwrite with the frontend

1. Install SDK: `cd frontend && npm i appwrite`
2. Appwrite SDK is configured in `src/lib/appwrite.js` with:
   - endpoint: `VITE_APPWRITE_ENDPOINT` fallback -> `https://fra.cloud.appwrite.io/v1`
   - project: `VITE_APPWRITE_PROJECT_ID` fallback -> `6a0b2fc1001c380eeb26`
3. Function IDs default to canonical IDs from `appwrite/functions.json`. Override in `.env` only when cloud IDs differ:
   - `VITE_APPWRITE_FUNCTION_COURSES_ID`
   - `VITE_APPWRITE_FUNCTION_QUIZZES_ID`
   - `VITE_APPWRITE_FUNCTION_PROGRESS_ID`
   - `VITE_APPWRITE_FUNCTION_AUTH_ID`
4. App startup automatically calls `client.ping()` through `pingAppwrite()`.
5. The dashboard and quiz now call Appwrite Functions via:
   - `listCourses()`
   - `submitQuiz()`
6. Production deploy checklist:
   - keep the GitHub Pages frontend deployment aligned with the built artifact
   - register `https://mgenetica.github.io/mgenetica/` in Appwrite Web Platforms
   - confirm cookie/session auth works from the published Pages host
   - confirm `APPWRITE_API_KEY` and `APPWRITE_PROJECT_ID` exist for function deploy workflow
7. Admin panel runtime requirements:
   - configure `VITE_ADMIN_EMAILS` in frontend env to expose admin entrypoint for allowed users
   - configure `ADMIN_EMAILS` in live `mgenetica_admin_fn` variables with the same admin e-mails
   - configure `APPWRITE_ADMIN_API_KEY` in live `mgenetica_admin_fn` variables for admin summary mode
   - `APPWRITE_API_KEY` is also accepted by the function as fallback, but `APPWRITE_ADMIN_API_KEY` is the clearer dedicated name
