# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Commit, publish and QA the remaining local site-only changes from the institutional/utility page and validation-hardening rounds.

## Scope

In scope:

- Local validation before publication.
- Commit and push of the remaining site-only files.
- GitHub Pages workflow monitoring.
- Published-site QA for homepage, module index, module page, search, glossary, study route and about page.
- `scripts/validate_deployed_site.R` updates after publication if new rendered patterns should be asserted.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend, CMS or authentication.
- New visual sections before publishing the current local changes.
- New dependencies.

## Priorities

1. Run `Rscript scripts/prepublish_site_check.R`.
2. Confirm changed-file scope remains site-only.
3. Commit and push remaining local changes.
4. Watch GitHub Pages to completion.
5. Validate the newly published utility/institutional page patterns.

## Planned cycles

### Cycle 1 — Local validation

- Run `Rscript scripts/prepublish_site_check.R`.
- Run `git diff --check`.
- Review changed files.

### Cycle 2 — Commit and publish

- Stage only site/publication files.
- Commit with a clear message.
- Push to `main`.

### Cycle 3 — Workflow QA

- Poll the GitHub Actions run.
- Confirm prepublish validation, Quarto render, Pagefind, artifact upload and deploy succeed.

### Cycle 4 — Deployed-site validation

- Fetch the published pages.
- Update `scripts/validate_deployed_site.R` if needed to cover newly live utility/institutional page patterns.
- Run deployed-site validation.

### Cycle 5 — Records and next planning

- Update `WORKLOG_SITE.md`.
- Prepare the next `NEXT_SITE.md` for the next visual/content block.

## Criteria for completion

- Changes remain site-only.
- No app files are altered.
- Local prepublish passes.
- GitHub Pages workflow succeeds.
- Deployed-site validation passes after publication.
- `WORKLOG_SITE.md` and `NEXT_SITE.md` are updated.

## Recommended commands

- `Rscript scripts/prepublish_site_check.R`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript scripts/validate_deployed_site.R`
- `git diff --check`
- `git status --short --branch`
- `git add ...`
- `git commit -m "..."`
- `git push origin main`
- `curl -I https://glebstrauss.github.io/mgenetica/`
