# App Worklog

## 2026-06-19 — Learner email verification gate

Implemented the learner-app email verification gate for Appwrite accounts.

Changes:
- Added `#verify-email` route parsing/building and route guards.
- Added Appwrite REST helpers for `/account/verification` send/confirm flows.
- Changed sign-up/login/session restore so unverified users remain signed in but cannot access courses, quizzes, progress, or admin.
- Added profile actions to resend verification email and refresh account status.
- Added verification callback screen and PT/EN/ES UI strings.
- Updated auth capability diagnostics, runtime/real-login smoke checks, and Appwrite setup docs.

Validation:
- `npm test` passed.
- `npm run build` passed.
- `node scripts/smoke_appwrite_runtime.mjs` failed before deployment because the live `mgenetica_auth_fn` still advertises the old capability list. Deploying `appwrite/functions/auth/index.js` is required before rerunning the runtime smoke.

Deployment note:
- Configure Appwrite Auth email provider/template and allow callback URLs such as `https://www.mgenetica.com/#verify-email` and local dev equivalents.
- Deploy `mgenetica_auth_fn`, then rerun `node scripts/smoke_appwrite_runtime.mjs`.

Closure verification:
- Commit `1122945` implemented the email verification gate.
- Commit `096888b` completed the remaining learner logo cleanup and visual QA threshold sync.
- `main` was pushed and matched `origin/main`.
- Appwrite Functions deploy passed for the verification-gate commit.
- GitHub Pages frontend deploy passed for the latest `main` commit.
- Final execution validation passed: `npm test`, `npm run build`, and `node scripts/smoke_appwrite_runtime.mjs`.
- `node scripts/smoke_appwrite_real_login.mjs` was checked and skipped locally because no Appwrite API key environment variable was available.
- Task status: closed after code, deploy, CI, runtime smoke, and worklog verification.

Documentation and Linear update:
- Repository documentation was updated across the root README, learner README, Appwrite frontend guide, Appwrite operations README, and this worklog.
- Linear project status was updated to record the delivered email verification gate, successful deploys, runtime smoke pass, and remaining optional real-login smoke dependency on Appwrite API key availability.

Immediate hardening:
- `node scripts/smoke_appwrite_real_login.mjs` passed when run from the repository root with an Appwrite API key available.
- The same smoke must be invoked as `node ../scripts/smoke_appwrite_real_login.mjs` from `frontend/`.
- Added a no-dependency secret scan at `scripts/check_secrets.mjs`, CI workflow `.github/workflows/secret-scan.yml`, and optional local hook `.githooks/pre-commit` to block committed Appwrite API key patterns without printing secret values.
- If an Appwrite key is exposed in terminal history, chat, or logs, rotate it in Appwrite even if it was never committed.

Verification UX/account hardening:
- Improved profile verification copy with inbox/spam guidance and a 60-second resend cooldown.
- Added explicit invalid/expired verification callback state with recovery CTA.
- Redirect verified learners to the course catalog after successful callback/status refresh.
- Added account security panel with verification state and all-session logout.
- Added `scripts/smoke_appwrite_verification_request.mjs` to validate `/account/verification` request flow without claiming manual inbox-link completion.
