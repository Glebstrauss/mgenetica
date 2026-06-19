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
   - set the Pages custom domain to `www.mgenetica.com`
   - register `www.mgenetica.com` in Appwrite Web Platforms
   - configure Appwrite Auth e-mail delivery/provider and verification template
   - allow the verification callback URL used by the SPA: `https://www.mgenetica.com/#verify-email` plus local dev URLs such as `http://localhost:5173/#verify-email` when testing locally
   - confirm cookie/session auth and `/account/verification` work from the published Pages host
   - confirm `APPWRITE_API_KEY` and `APPWRITE_PROJECT_ID` exist for function deploy workflow
   - backend audit and real-login smokes accept `APPWRITE_API_KEY`, `APPWRITE_ADMIN_API_KEY`, or `APPWRITE_FUNCTION_API_KEY`
7. Admin panel runtime requirements:
   - configure `ADMIN_EMAILS` in live `mgenetica_admin_fn` variables with allowed admin e-mails
   - configure `APPWRITE_ADMIN_API_KEY` in live `mgenetica_admin_fn` variables for admin summary mode
   - `APPWRITE_API_KEY` is also accepted by the function as fallback, but `APPWRITE_ADMIN_API_KEY` is the clearer dedicated name
8. Learner progress persistence requirements:
   - `mgenetica_progress_fn` stores learner progress in Appwrite user prefs under `mgeneticaProgress`
   - preferred: grant `users.read` + `users.write` scopes so the runtime `APPWRITE_FUNCTION_API_KEY` can be used automatically
   - fallback: configure `APPWRITE_ADMIN_API_KEY` or `APPWRITE_API_KEY` in live `mgenetica_progress_fn` variables
   - quiz submissions update percent, attempts, pass state, and timestamps through that function
9. Learner e-mail verification gate:
   - sign-up creates the Appwrite account, starts a session, sends `/account/verification`, and keeps the learner on the profile verification state
   - `#/verify-email` consumes Appwrite `userId` and `secret` from hash query or URL query, confirms `/account/verification`, then refreshes account state
   - unverified sessions can view profile, resend verification e-mail, refresh account state, or sign out
   - courses, quizzes, progress and admin routes stay blocked until `account.emailVerification` is `true`
   - deployed runtime smoke now verifies that `mgenetica_auth_fn` advertises `email-verification`
10. Verification commands:
   - `cd frontend && npm test && npm run build`
   - `node scripts/check_secrets.mjs`
   - `node scripts/smoke_appwrite_runtime.mjs`
   - `node scripts/smoke_appwrite_real_login.mjs` when an Appwrite API key environment variable is present
   - `node scripts/smoke_appwrite_verification_request.mjs` when an Appwrite API key environment variable is present
11. Manual production verification:
   - create a fresh learner on the published site
   - confirm the provider email arrives
   - click the verification callback and confirm `account.emailVerification` becomes `true`
   - confirm catalog/course/quiz access unlocks only after verification
   - try a malformed or already-used callback link and confirm the recovery UI leads back to sign-in/account resend
   - use Linear follow-up `FEW-23` or its successor to resume this checklist if interrupted
