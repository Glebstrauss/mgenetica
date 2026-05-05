# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Run a visual QA and publication-maintenance block after the deployed HTML checks. The priority is to inspect the site visually, address any medium/high-impact layout issues, and update the GitHub Pages workflow away from the Node.js 20 deprecation path if a safe workflow-only change is available.

## Scope

In scope:

- Public homepage.
- Module index.
- Representative module pages.
- Search, glossary, roteiro and sobre pages.
- Generated HTML checks after render/deploy.
- GitHub Pages workflow maintenance.
- `styles/main.scss` and public interaction scripts if regressions are found.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend.
- Authentication.
- Large scientific-content rewrites.
- New dependencies unless needed for a small validation script.

## Priorities

1. Inspect published homepage and module index visually.
2. Check representative module pages for spacing, tables, code blocks and quiz placement.
3. Use `scripts/validate_deployed_site.R` as the standard generated-output check.
4. Address the GitHub Actions Node.js 20 deprecation warning with a small workflow-only change if safe.
5. Continue conservative SCSS cleanup only after visual verification.
6. Keep all changes site-only and documented.

## Planned cycles

### Cycle 1 — Published visual QA

- Fetch or inspect the published homepage and module index.
- Check first viewport, logo treatment, heading scale, CTAs and section rhythm.
- Correct medium/high-impact layout issues only.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 2 — Module page visual QA

- Inspect representative modules 1, 6 and 12.
- Check tables, code blocks, callouts, module nav and quiz placement.
- Correct spacing/readability regressions if found.
- Run SCSS and manifest validation.

### Cycle 3 — Search, glossary and route QA

- Inspect search, glossary and roteiro pages.
- Check page hero consistency, Pagefind assets, glossary layout and table readability.
- Correct small public-page inconsistencies if found.
- Run JS syntax checks if scripts are touched.

### Cycle 4 — Publication workflow maintenance

- Review `.github/workflows/quarto-publish.yml`.
- Address the Node.js 20 deprecation warning only with a small, safe workflow change.
- Verify workflow YAML syntax and document any remaining risk.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 5 — Validation and conservative cleanup

- Run local validators and deployed-site validator.
- Remove or simplify only clearly redundant public-site CSS if visual checks support it.
- Test after each meaningful cleanup.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 6 — Final validation and next plan

- Run the full available validation command set.
- Publish if public files or workflow files changed and publication is required.
- Update `WORKLOG_SITE.md`.
- Prepare the following `NEXT_SITE.md`.
- Record any deployment/cache caveats.

## Criteria for completion

- At least 6 cycles are executed unless there is a real blocker.
- Changes remain site-only.
- No app files are altered.
- Published output is inspected through deployed HTML and, when available, browser/screenshot review.
- `WORKLOG_SITE.md` is updated.
- `NEXT_SITE.md` is updated again at the end of the block.
- Available build, lint or tests are run.
- Any unavailable command is explicitly noted.

## Recommended commands

- `command -v quarto`
- `quarto render` if Quarto is available locally.
- `curl -L https://glebstrauss.github.io/mgenetica/ -o /private/tmp/mgenetica-home.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/index.html -o /private/tmp/mgenetica-modules.html`
- `curl -I https://glebstrauss.github.io/mgenetica/images/og-card.png`
- `curl -I https://glebstrauss.github.io/mgenetica/images/favicon/site.webmanifest`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("yaml ok\n")'`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript scripts/validate_site_manifest.R`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `Rscript -e 'renv::status()'`
- `Rscript scripts/run_all_modules.R`
- `git diff --check`
