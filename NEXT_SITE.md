# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Publish and verify the utility-page and workflow-maintenance changes, then continue visual QA with emphasis on screenshot/browser review and conservative CSS organization.

## Scope

In scope:

- Public homepage.
- Module index.
- Representative module pages.
- Search, glossary, roteiro and sobre pages.
- Generated HTML checks after render/deploy.
- GitHub Pages workflow verification.
- `styles/main.scss` and public interaction scripts if regressions are found.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend.
- Authentication.
- Large scientific-content rewrites.
- New dependencies unless needed for a small validation script.

## Priorities

1. Publish the current changes and confirm the GitHub Pages workflow succeeds.
2. Confirm Busca, Glossário and Roteiro no longer show automatic heading numbers.
3. Confirm the Node.js 20 deprecation warning is gone or document any remaining warning.
4. Use `scripts/validate_deployed_site.R` as the standard generated-output check.
5. Continue visual QA with screenshot/browser review if available.
6. Keep all changes site-only and documented.

## Planned cycles

### Cycle 1 — Publish and workflow verification

- Publish the current changes if they are not yet deployed.
- Watch the GitHub Pages workflow.
- Confirm whether the Node.js 20 warning is resolved.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 2 — Utility page generated QA

- Fetch Busca, Glossário and Roteiro after deploy.
- Confirm no `header-section-number` or `data-number` remains.
- Check Pagefind, glossary and learning-map hooks.
- Run `scripts/validate_deployed_site.R`.

### Cycle 3 — Homepage and module index visual QA

- Inspect published homepage and module index.
- Check first viewport, logo treatment, section rhythm and CTAs.
- Correct medium/high-impact layout issues only.
- Test SCSS if styles are touched.

### Cycle 4 — Module page visual QA

- Inspect representative modules 1, 6 and 12.
- Check tables, code blocks, callouts, module nav and quiz placement.
- Correct spacing/readability regressions if found.
- Run manifest validation.

### Cycle 5 — Browser/screenshot QA or fallback

- Use browser/screenshot review if available.
- If unavailable, use deployed HTML checks and document the limitation.
- Only do conservative SCSS cleanup when supported by visual evidence.
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
- `curl -L https://glebstrauss.github.io/mgenetica/busca.html -o /private/tmp/mgenetica-busca.html`
- `curl -L https://glebstrauss.github.io/mgenetica/glossario.html -o /private/tmp/mgenetica-glossario.html`
- `curl -L https://glebstrauss.github.io/mgenetica/semanas/ -o /private/tmp/mgenetica-semanas.html`
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
