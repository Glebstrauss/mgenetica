# Tracking Progress (CLI Agent Handoff)

## Current status

- Appwrite SDK configured in `frontend/src/lib/appwrite.js` with:
  - Project ID: `6a0b2fc1001c380eeb26`
  - Endpoint: `https://fra.cloud.appwrite.io/v1`
- App startup already pings Appwrite using `client.ping()`.
- Frontend now uses Appwrite Functions for courses and quiz submission.
- The local frontend shell now opens with a polished welcome/home page and a full Módulo 01 learning view, including all R code blocks from the original page.
- Sign-in and account creation are available from the same auth panel with clearer UX states and feedback.

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
2. Deploy Appwrite functions in Cloud and record function IDs.
3. Set `frontend/.env` values:
   - `VITE_APPWRITE_FUNCTION_COURSES_ID`
   - `VITE_APPWRITE_FUNCTION_QUIZZES_ID`
   - `VITE_APPWRITE_FUNCTION_PROGRESS_ID`
   - `VITE_APPWRITE_FUNCTION_AUTH_ID`

## Infra configured in GitHub already

- Actions secret set: `APPWRITE_PROJECT_ID=6a0b2fc1001c380eeb26`
- Actions variable set: `APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1`
- Workflow now auto-pushes Appwrite functions from `appwrite/` after `APPWRITE_API_KEY` is added.

## Next safe steps for any agent

1. Deploy functions with Appwrite Console/CLI.
2. Paste function IDs into `frontend/.env`.
3. Run `cd frontend && npm run build`.
4. Validate flow: ping -> courses -> quiz submit.

## Recent changes (automated agents)

- Appwrite functions were iteratively fixed and deployed via the CI workflow.
- Courses, quizzes, progress and auth functions deployed and smoke-tested (courses returned 200 + JSON).
- Frontend now includes a minimal client login flow using Appwrite Accounts (email/password) and executes functions with credentialed requests (cookies included).
- Todo created: implement full E2E tests for login -> listCourses -> submitQuiz.
- Frontend UI was upgraded into a polished course page that renders the full original Módulo 01 content, including all three R code blocks, explanatory callouts, a table of symbols, and a cleaner learning flow.
- Auth UX now supports both sign-in and account creation from the same panel, with clearer copy, feedback, and button states.
- Local preview/build checks are green, and the current Vercel + Quarto publish runs on `main` are succeeding.
