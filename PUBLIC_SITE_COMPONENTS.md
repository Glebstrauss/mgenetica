# Public Site Components

Reference for the current MGenetica React public site.

## Source Of Truth

- `frontend/src/App.jsx`: route composition, auth gates, page shells.
- `frontend/src/data/courseCurriculum.js`: course grouping and localized course metadata.
- `frontend/src/data/course-curriculum.generated.json`: generated course lesson payload consumed by the app.
- `frontend/src/data/servicePages.js`: consulting and training service content.
- `frontend/src/styles.css`: visual system, responsive layout and service page components.
- `frontend/public/`: brand asset and static redirects for older URLs.

## Page Families

- Home: learning promise, access actions and applied service cards.
- Service pages: `#/consultoria` and `#/treinamentos`, public and unauthenticated.
- Auth/account/admin: Appwrite-backed operational pages.
- Catalog/course/quiz: authenticated learner flow with progress persistence.

## Component Rules

- Keep public service pages diagnostic and decision-oriented, not generic sales pages.
- Keep auth/admin behavior out of service copy.
- Use existing button, chip, card, section and header patterns before adding new ones.
- Preserve keyboard access, visible focus, responsive one-column mobile layout and readable cards.
- Keep legacy static redirects lightweight and generated-free.

## Validation

- `cd frontend && npm test`
- `cd frontend && npm run build`
- `git diff --check`
