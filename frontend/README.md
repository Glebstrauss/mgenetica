Front-end learner app (separate from public Quarto site)

Quick start:
1. cd frontend
2. npm ci
3. npm run dev

This Vite+React surface is learner/app scope only.

- Public site Quarto source remains separate from this learner app.
- The current live app is served at `https://mgenetica.github.io/mgenetica/`.
- GitHub Pages root is the active production target for this frontend.
- Appwrite remains backend of record for auth, functions and learner flows.

Production requirements:
- GitHub Pages deploy/workflow must stay aligned with the built frontend artifact
- Appwrite Web Platform must include `https://mgenetica.github.io/mgenetica/`
- Appwrite admin runtime must include `ADMIN_EMAILS` and `APPWRITE_ADMIN_API_KEY` for admin summary mode
- Appwrite progress runtime must include `APPWRITE_ADMIN_API_KEY` or `APPWRITE_API_KEY` so learner progress can persist in user prefs
- Frontend env must expose Appwrite endpoint/project and function IDs when canonical defaults are not used

Course visual assets:
- Module visuals live under `frontend/public/course-assets/`.
- The source contract for rendering them is `frontend/src/data/courseVisualAssets.js`.
- Static SVGs render as lazy `<img>` elements with module-specific alt text.
- Interactive HTML calculators render in lazy iframes with `sandbox="allow-scripts"` and `referrerPolicy="no-referrer"`.
- Keep generated curriculum JSON separate from the visual-asset map so future curriculum imports do not overwrite asset metadata.
- When replacing or adding an asset, update both the public file and `courseVisualAssets.js`, then run `npm test` and `npm run build`.
