# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Validate, visually review and publish the accumulated site-only changes from the last work rounds, then perform post-deploy QA on the public GitHub Pages site.

## Scope

In scope:

- Local validation of the accumulated site changes.
- GitHub Pages workflow validation after push.
- Published-site QA for homepage, module index and representative module pages.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend, CMS or authentication.
- New design sections before the accumulated changes are published and reviewed.
- New dependencies.

## Priorities

1. Run `Rscript scripts/prepublish_site_check.R`.
2. Confirm the workflow prepublish gate is present and syntactically valid.
3. Commit and push only if validation passes.
4. Watch GitHub Pages to completion.
5. Validate the deployed homepage, module index and representative module pages.

## Planned cycles

### Cycle 1 — Local prepublish validation

- Run `Rscript scripts/prepublish_site_check.R`.
- Run `git diff --check`.
- Review git status and changed-file scope.

### Cycle 2 — Workflow readiness

- Confirm `.github/workflows/quarto-publish.yml` includes the prepublish gate before render/deploy.
- Confirm the local script supports CI skip-render behavior.
- Parse workflow YAML.

### Cycle 3 — Commit and publish

- Stage only site/publication files.
- Commit with a clear message.
- Push to `main`.

### Cycle 4 — GitHub Pages QA

- Watch or poll the GitHub Pages workflow.
- Confirm render, Pagefind, artifact upload and deploy pass.
- Check workflow annotations if tooling is available.

### Cycle 5 — Published-site validation

- Run `Rscript scripts/validate_deployed_site.R`.
- Fetch the homepage headers and representative pages.
- Record results in `WORKLOG_SITE.md`.

## Criteria for completion

- Changes remain site-only.
- No app files are altered.
- Local prepublish check passes.
- GitHub Pages workflow succeeds.
- Published-site validation passes.
- `WORKLOG_SITE.md` and `NEXT_SITE.md` are updated after publication QA.

## Recommended commands

- `Rscript scripts/prepublish_site_check.R`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript -e 'invisible(yaml::read_yaml(".github/workflows/quarto-publish.yml")); cat("workflow yaml ok\n")'`
- `git diff --check`
- `git status --short --branch`
- `git add ...`
- `git commit -m "..."`
- `git push origin main`
- `curl -I https://glebstrauss.github.io/mgenetica/`
