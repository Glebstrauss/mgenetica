# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`post-publication-validation`

## Objective

After the publication commit for the public UX QA changes is pushed, confirm the GitHub Actions deployment completed and validate the deployed GitHub Pages site.

## Current local state

- The latest local changes are intended for publication.
- Prepublication gate passed locally with the vendored Quarto CLI on `PATH`.
- Screenshot artifacts from the QA block are in `/private/tmp/mgenetica-site-qa`.
- The QA report is `/private/tmp/mgenetica-site-qa/visual-qa-report.json`.

## In scope

- Check GitHub Actions deployment status for the pushed commit.
- Run `Rscript scripts/validate_deployed_site.R` after the deployment is complete.
- If deployment fails, inspect logs and fix only publication-related site issues.
- Keep `WORKLOG_SITE.md` and `NEXT_SITE.md` current.

## Out of scope

- App changes.
- Backend, CMS, authentication or new dependencies in the project.
- Broad redesigns or scientific lesson rewrites.
- Unrelated cleanup of untracked local files.

## Recommended commands

- `git status --short --branch`
- `gh run list --limit 5`
- `gh run watch`
- `Rscript scripts/validate_deployed_site.R`
- `git diff --check`

## Criteria for completion

- The pushed commit has a successful deployment run.
- Deployed-site validation passes.
- Any deployment fix remains site-only.
