# Tracking Progress (CLI Agent Handoff)

## Current status

- Primary live target is now GitHub Pages root at https://mgenetica.github.io/mgenetica/
- The live URL now serves the React learner app shell directly, with published JS/CSS assets responding 200.
- Frontend Pages deploy path is .github/workflows/pages-frontend.yml
- Quarto publish path is manual only
- Optional Vercel deploy path is manual only
- Appwrite SDK configured in `frontend/src/lib/appwrite.js` with:
  - Project ID: `6a0b2fc1001c380eeb26`
  - Endpoint: `https://fra.cloud.appwrite.io/v1`
- Frontend now falls back to canonical Appwrite function IDs from `appwrite/functions.json` when env overrides are absent.
- Frontend now includes admin panel support gated by VITE_ADMIN_EMAILS and backed by mgenetica_admin_fn.
- Admin backend now supports `status` and `summary`; summary reads Appwrite admin data only when an admin API key is configured in function variables.
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
   - `APPWRITE_PROJECT_ID`
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
2. Add deployed Pages origin in Appwrite Web Platforms so browser auth/session cookies work.
3. Deploy Appwrite functions in cloud and confirm canonical IDs:
   - `mgenetica_courses_fn`
   - `mgenetica_quizzes_fn`
   - `mgenetica_progress_fn`
   - `mgenetica_auth_fn`
   - `mgenetica_admin_fn`
4. Configure admin function variable with one of:
   - `APPWRITE_ADMIN_API_KEY`
   - `APPWRITE_API_KEY`
5. Run real browser smoke test on published Pages host for:
   - create account
   - login
   - current account/session
   - courses/progress/admin checks

## Infra configured in GitHub already

- Appwrite project ID expected: `6a0b2fc1001c380eeb26`
- Actions variable set: `APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1`
- Workflow now auto-pushes Appwrite functions from `appwrite/` after required secrets are added.
- Frontend deploy to Pages now owns default live URL.
- Vercel deploy workflow now stays manual and optional.

## Next safe steps for any agent

1. Deploy functions with Appwrite Console/CLI.
2. Register GitHub Pages host in Appwrite Web Platforms.
3. Run `cd frontend && npm run build`.
4. Validate flow: ping -> login -> courses -> quiz submit -> admin status.

## Recent changes (automated agents)

- Appwrite functions were iteratively fixed and deployed via the CI workflow.
- The direct Pages frontend deploy and Appwrite deploy both completed successfully for commit `1bd3df3`.
- The admin backend was hardened again on 2026-05-19 to remove duplicate function definitions and add Appwrite summary support behind admin API-key configuration.
- Courses, quizzes, progress and auth functions deployed and smoke-tested (courses returned 200 + JSON).
- Frontend now includes a minimal client login flow using Appwrite Accounts (email/password) and executes functions with credentialed requests (cookies included).
- Todo created: implement full E2E tests for login -> listCourses -> submitQuiz.
- Frontend UI was upgraded into a polished course page that renders the full original Módulo 01 content, including all three R code blocks, explanatory callouts, a table of symbols, and a cleaner learning flow.
- Auth UX now supports both sign-in and account creation from the same panel, with clearer copy, feedback, and button states.
- Local preview/build checks are green, but the frontend was not actually live on Vercel when the deploy secrets were missing; that ambiguity is now corrected in workflow and docs.
- Remote build workflows were refreshed to use the newer JavaScript-action runtime path (`checkout@v5`, `setup-node@v6`, Node 24) before the next deploy.
- Frontend landing hero/auth layout was rebalanced after visual QA: headline scale reduced, CTA/buttons normalized, feature cards aligned, auth form controls unified, and the MGenética brand panel aligned with the left content column. Verified again with `cd frontend && npm run build`.
- Feature highlight cards in landing hero were restructured on 2026-05-19 to use icon -> heading -> explanatory copy hierarchy, replacing broken stacked text that was wrapping into awkward tall boxes.
- Landing hero structure was rewritten again on 2026-05-19 into a professional two-zone layout: top row for copy + brand panel, bottom row for three equal feature cards, to remove the previous amateur stretch/collision between the logo panel and feature boxes.
- Deep layout pass on 2026-05-19 fixed structural markup/CSS mismatch in landing hero so intended two-column hero grid now exists in DOM again; this removed cascading overlap and placement failures seen in repeated visual QA screenshots.
- Access flow changed on 2026-05-19 so the auth block no longer renders on the public home surface; sign-in/sign-up now open a dedicated access page while the homepage stays institutional.
