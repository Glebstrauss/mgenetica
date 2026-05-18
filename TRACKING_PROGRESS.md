# Tracking Progress (CLI Agent Handoff)

## Current status

- Appwrite SDK configured in `frontend/src/lib/appwrite.js` with:
  - Project ID: `6a0b2fc1001c380eeb26`
  - Endpoint: `https://fra.cloud.appwrite.io/v1`
- App startup already pings Appwrite using `client.ping()`.
- Frontend now uses Appwrite Functions for courses and quiz submission.

## Completed implementation

- Backend scaffold: auth, courses, quizzes, progress.
- Frontend scaffold: learner dashboard + quiz.
- Appwrite scaffold: local compose + cloud function structure.
- Appwrite functions present:
  - `appwrite/functions/courses/index.js`
  - `appwrite/functions/quizzes/index.js`
  - `appwrite/functions/progress/index.js`
  - `appwrite/functions/auth/index.js`
- Frontend function integration:
  - `listCourses()`
  - `submitQuiz()`
- Appwrite function ID env template:
  - `frontend/.env.example`

## Pending (external inputs required)

1. Add GitHub secrets:
   - `APPWRITE_API_KEY`
   - `APPWRITE_PROJECT_ID`
2. Deploy Appwrite functions in Cloud and record function IDs.
3. Set `frontend/.env` values:
   - `VITE_APPWRITE_FUNCTION_COURSES_ID`
   - `VITE_APPWRITE_FUNCTION_QUIZZES_ID`
   - `VITE_APPWRITE_FUNCTION_PROGRESS_ID`
   - `VITE_APPWRITE_FUNCTION_AUTH_ID`

## Next safe steps for any agent

1. Deploy functions with Appwrite Console/CLI.
2. Paste function IDs into `frontend/.env`.
3. Run `cd frontend && npm run build`.
4. Validate flow: ping -> courses -> quiz submit.
