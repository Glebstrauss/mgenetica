# AGENTS.md

## Project Fronts

- Live public site: `frontend/` Vite + React app.
- Course engine material: `course.yml`, `documentation/course-engine/`, generated module outputs and the `engine/` submodule.
- Backend services: `appwrite/` functions and deployment config.
- Optional API scaffold: `backend/`.

Work in the front that matches the request. Do not mix public UX, course-engine content, Appwrite runtime and backend scaffold changes without a concrete reason.

## Site Working Mode

- Diagnose before editing.
- Start from latest `origin/main`.
- Use a branch, never edit/publish `main` directly.
- Treat `frontend/` as the source of truth for visitor UX, consulting, training and learner routes.
- Keep public service pages clear, scientific, premium and decision-oriented.
- Prefer small route/data/style changes over broad rewrites.
- Run available tests and build before commit.

## Course-Engine Working Mode

The MGenética repository owns course-specific material:

- `course.yml`;
- canonical references and source files;
- course-specific agent profiles;
- generated and manually reviewed module outputs;
- audit files for source traceability.

The `engine/` directory is an external dependency. Do not copy or fork engine scripts into the MGenética root unless the user explicitly asks for a local override.

For course-engine work:

- Keep it separate from site and app work.
- Generate content only on a branch.
- Do not merge into `main` without human review.
- Do not publish the public site as part of content generation.
- Validate course configuration against `engine/schemas/course.schema.yml` before generation.
- Never overwrite generated module files without explicit user confirmation or an agreed `--overwrite` run.
- Final lesson references must use the canonical scientific format configured by the course. Technical source chunks, pages, hashes and retrieval scores belong in audit files, not in the public reference list.

## Validation

```bash
cd frontend
npm test
npm run build
```

For Appwrite function code, also run `node --check` on touched `.js` files.

## Publication Guardrail

Do not commit, push, open PRs, deploy or merge into `main` unless the user explicitly asks.
