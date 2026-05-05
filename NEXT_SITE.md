# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Prepare the accumulated site-only changes for a safer publication by adding the prepublication check to the GitHub Pages workflow or a dedicated CI gate, then publish only after local validation passes.

## Scope

In scope:

- `.github/workflows/quarto-publish.yml` or a dedicated site validation workflow.
- `scripts/prepublish_site_check.R` if small CI compatibility adjustments are needed.
- Published-site QA after deployment.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend, CMS or authentication.
- Visual redesign.
- Large content rewrites.
- SCSS refactors unrelated to publication safety.

## Priorities

1. Keep publication workflow stable.
2. Ensure site validation runs before deployment or in an equivalent CI gate.
3. Avoid reintroducing Node/runtime publication warnings.
4. Publish only after `Rscript scripts/prepublish_site_check.R` passes locally.
5. Verify GitHub Pages output after deploy.

## Planned cycles

### Cycle 1 — Workflow audit

- Inspect `.github/workflows/quarto-publish.yml` and recent workflow assumptions.
- Decide whether to add the prepublish check inside the existing Pages workflow or as a separate validation workflow.
- Run local `Rscript scripts/prepublish_site_check.R` before editing.

### Cycle 2 — CI/prepublish integration

- Add the smallest safe validation step.
- If the full prepublish command is too expensive for Pages deployment, add the critical subset and document the tradeoff.
- Keep R/Quarto setup stable.

### Cycle 3 — Local validation

- Run YAML, manifest, SCSS, JS and `scripts/prepublish_site_check.R`.
- Confirm `quarto render` availability status.
- Fix only validation or workflow issues.

### Cycle 4 — Commit and publish

- Stage the accumulated site-only changes.
- Commit with a clear message.
- Push to `main` to trigger GitHub Pages.
- Watch the workflow to completion.

### Cycle 5 — Published QA

- Fetch homepage, module index and representative module pages.
- Run `scripts/validate_deployed_site.R`.
- Use browser QA if available.
- Confirm no workflow annotations/errors that require immediate correction.

### Cycle 6 — Records and next planning

- Update `WORKLOG_SITE.md`.
- Prepare the next `NEXT_SITE.md`.
- Record commit, workflow run and any remaining publication limitations.

## Criteria for completion

- Changes remain site-only.
- No app files are altered.
- `Rscript scripts/prepublish_site_check.R` passes before publish.
- GitHub Pages workflow completes successfully or any blocker is clearly documented.
- Published site validation passes after deploy.
- `WORKLOG_SITE.md` and `NEXT_SITE.md` are updated.

## Recommended commands

- `Rscript scripts/prepublish_site_check.R`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `git diff --check`
- `git status --short --branch`
- `git add ...`
- `git commit -m "..."`
- `git push origin main`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 3`
- `gh run watch <run-id> --repo Glebstrauss/mgenetica --exit-status`
