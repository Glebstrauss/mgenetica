# App Worklog

## 2026-06-21 — Legacy backend progress forgery patch

Patched the legacy Express `/progress` route so it no longer trusts client-provided `percent`. The route now rejects `percent`, requires raw quiz `answers`, normalizes numeric legacy course IDs to `module-XX`, scores against the packaged quiz bank, and returns server-computed score/pass/percent only. Added backend coverage for the scoring helper and documented the constraint in `backend/README.md`.

## 2026-06-21 — Security audit closure and CI deployment resolution

Security audit outcome:
- No committed secrets were found by `node scripts/check_secrets.mjs`.
- Dependency audit reported 0 vulnerabilities.
- Appwrite learner functions were hardened so `mgenetica_courses_fn`, `mgenetica_quizzes_fn`, and `mgenetica_progress_fn` require authenticated `users` execute permissions.
- Public `mgenetica_auth_fn` remains intentionally executable by guests for the limited capabilities endpoint.
- Learner progress is now server-authoritative: the frontend sends raw quiz answers, `mgenetica_progress_fn` scores against its packaged quiz bank, and client-provided score/pass/percent fields are no longer trusted.
- Quiz and progress submissions are rate-limited per learner/course with a 30-second minimum interval; rapid repeats return `429 rate_limited`.
- Admin status and quiz responses were reduced to avoid unnecessary operational detail or per-question answer leakage.
- Admin/progress logs now emit compact metadata instead of full payloads or learner user IDs.
- Appwrite admin/progress functions no longer fall back to hardcoded endpoint/project config; missing runtime config fails closed.
- Appwrite deploy workflow now syncs endpoint/project/API key variables into admin/progress functions so fail-closed runtime config works after deployment.

Validation:
- Local gates passed from repository root: `node scripts/check_secrets.mjs`, `npm --prefix frontend audit --json`, `npm --prefix frontend test`, `node scripts/validate_course_assets.mjs`, `node scripts/check_operational_risks.mjs`, `npm --prefix frontend run build`, and `node --check` for all Appwrite function entrypoints.
- Live runtime smoke passed after deploy: `APPWRITE_ORIGIN=https://www.mgenetica.com node scripts/smoke_appwrite_runtime.mjs`.

CI deployment resolution:
- Push `4900a7d` triggered `Secret scan`, `Appwrite Functions deploy`, and `Deploy Frontend to GitHub Pages`.
- `Secret scan` passed and `Appwrite Functions deploy` passed.
- `Deploy Frontend to GitHub Pages` failed only at the post-deploy `Smoke Appwrite runtime` step with `Auth capabilities function did not return ok=true.`
- The same smoke command passed shortly after against the live runtime, confirming the failure was a deployment-order/race condition rather than a persistent security or build defect.
- Resolution: no code change required for the security hardening; rerun the failed Pages workflow after Appwrite deploy completes if this race appears again.

Remaining recommendations:
- Keep backend smoke tests after Appwrite deploy, but consider adding a short retry/backoff around `scripts/smoke_appwrite_runtime.mjs` in the Pages workflow to tolerate function activation delay.
- If assessment integrity becomes higher-stakes, move quiz submission and progress persistence into one Appwrite function so scoring and persistence are atomic.
- Remaining audit findings 3, 4, and 5 are closed in local code: quiz submit throttling, compact admin/progress logs, and fail-closed Appwrite runtime config.

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

Resume handoff for final verification:
- Plan `b74bde7d-9b01-44d0-86c6-0141428ae842` documents the remaining finalization path.
- Code implementation is already present; resume work should start with audit/validation, not a greenfield rewrite.
- Orchestration attempt was blocked by local/remote config conflict, so resume directly or recreate a clean local-only orchestration config before launching child audits.
- Suggested resume commands from repo root: `npm test --prefix frontend`, `npm run build --prefix frontend`, `node scripts/check_secrets.mjs`, `node scripts/smoke_appwrite_runtime.mjs`, `node scripts/smoke_appwrite_real_login.mjs`, and `node scripts/smoke_appwrite_verification_request.mjs` when Appwrite key env vars are available.
- Remaining manual production check: create a fresh learner on the published site, receive the provider email, click the callback link, confirm `emailVerification=true`, verify catalog/course access, then test malformed or reused callback recovery.
