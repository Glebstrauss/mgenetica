Front-end learner app (separate from public Quarto site)

Quick start:
1. cd frontend
2. npm ci
3. npm run dev

This Vite+React surface is learner/app scope only.

- Public site Quarto source remains separate from this learner app.
- The intended primary domain is `https://www.mgenetica.com/`; GitHub Pages remains the hosting backend.
- GitHub Pages root is the active production target for this frontend.
- Appwrite remains backend of record for auth, email verification, functions and learner flows.

Production requirements:
- GitHub Pages deploy/workflow must stay aligned with the built frontend artifact
- The Pages artifact must include `frontend/public/CNAME` with `www.mgenetica.com`
- Appwrite Web Platform must include `www.mgenetica.com`
- Appwrite Auth must have email delivery/provider and verification template configured
- Verification callbacks must support `https://www.mgenetica.com/#verify-email` and local dev equivalents
- Appwrite admin runtime must include `ADMIN_EMAILS` and `APPWRITE_ADMIN_API_KEY` for admin summary mode
- Appwrite progress runtime must include `APPWRITE_ADMIN_API_KEY` or `APPWRITE_API_KEY` so learner progress can persist in user prefs
- Frontend env must expose Appwrite endpoint/project and function IDs when canonical defaults are not used

Learner authentication and validation:
- Sign-up creates an Appwrite account, starts an email session, sends `/account/verification`, and routes the learner to profile verification.
- Unverified sessions may view profile, resend verification email, refresh account status, or sign out.
- Courses, quizzes, progress persistence and admin access require `account.emailVerification === true`.
- The SPA callback route is `#/verify-email`; Appwrite may return `userId` and `secret` through hash query or URL query.
- Validate from `frontend/` with `npm test`, `npm run build`, `node ../scripts/smoke_appwrite_runtime.mjs`, and optional `node ../scripts/smoke_appwrite_real_login.mjs` plus `node ../scripts/smoke_appwrite_verification_request.mjs` when an Appwrite API key is present.
- Before committing Appwrite/workflow/env/docs changes, run `node ../scripts/check_secrets.mjs`; the scanner blocks Appwrite API key patterns without printing values.

Course visual assets:
- Module visuals live under `frontend/public/course-assets/`.
- The source contract for rendering them is `frontend/src/data/courseVisualAssets.js`.
- Static SVGs render as lazy `<img>` elements with module-specific alt text.
- Interactive HTML calculators render in lazy iframes with `sandbox="allow-scripts"` and `referrerPolicy="no-referrer"`.
- Keep generated curriculum JSON separate from the visual-asset map so future curriculum imports do not overwrite asset metadata.
- When replacing or adding an asset, update both the public file and `courseVisualAssets.js`, then run `npm test` and `npm run build`.
