# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Publish and verify the landing-hierarchy, module-flow and dark-theme structure changes from the previous block, then continue with rendered visual QA and conservative SCSS consolidation.

## Scope

In scope:

- Public homepage.
- Module index.
- Representative module pages.
- Generated dark and light theme CSS.
- GitHub Pages workflow verification.
- Published HTML checks after deploy.
- `styles/main.scss` and `styles/main-dark.scss` if visual regressions are confirmed.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend.
- Authentication.
- Large scientific-content rewrites.
- New dependencies unless they are strictly needed for a lightweight site validation helper.

## Priorities

1. Publish the current site-only changes and watch the GitHub Pages workflow.
2. Confirm homepage and module index no longer show duplicated Quarto title/breadcrumb/sidebar chrome.
3. Confirm module quizzes render before final previous/index/next navigation.
4. Confirm the dark theme includes shared structural layout rules plus dark overrides.
5. Use browser/screenshot review if available; otherwise document the limitation and use generated HTML/CSS checks.
6. Continue SCSS cleanup only where it reduces real maintenance risk without changing the visual direction.

## Planned cycles

### Cycle 1 — Publish and workflow verification

- Commit and push the current site-only changes if not already published.
- Watch the GitHub Pages workflow until completion.
- Record whether the Node.js 20 deprecation annotation remains.
- Do not reintroduce `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` unless the R setup hang has been diagnosed.
- Register result in `WORKLOG_SITE.md`.

### Cycle 2 — Generated landing-page QA

- Fetch the published homepage and module index.
- Confirm generated title/breadcrumb/sidebar chrome is hidden or absent.
- Confirm hero/logo/CTA anchors remain intact.
- Run `scripts/validate_deployed_site.R`.

### Cycle 3 — Module flow QA

- Fetch representative modules 01, 06 and 12.
- Confirm each published page has quiz before module navigation.
- Check module navigation still links to previous/index/next targets correctly.
- Run `scripts/validate_site_manifest.R`.

### Cycle 4 — Theme parity QA

- Fetch or inspect generated light and dark CSS from GitHub Pages.
- Confirm dark CSS contains shared hero/module-index layout selectors and dark override selectors.
- Correct only confirmed dark/light parity regressions.
- Compile SCSS after any style change.

### Cycle 5 — Browser/screenshot QA or documented fallback

- Try the in-app browser/screenshot workflow.
- If unavailable, document the exact limitation and use deployed HTML/CSS checks as fallback.
- Review homepage, module index and one long module for mobile-sensitive layout risks.
- Make only evidence-backed visual fixes.

### Cycle 6 — SCSS structure and next planning

- Audit the late override sections in `styles/main.scss`.
- Consolidate only low-risk duplicated rules that improve maintainability.
- Run the full validation set.
- Update `WORKLOG_SITE.md` and prepare the next `NEXT_SITE.md`.

## Criteria for completion

- At least 6 cycles are executed unless there is a real blocker.
- Changes remain site-only.
- No app files are altered.
- Published output is inspected after deploy.
- Dark-theme structure is specifically checked.
- `WORKLOG_SITE.md` is updated.
- `NEXT_SITE.md` is updated again at the end of the block.
- Available build, lint or tests are run.
- Any unavailable browser/render command is explicitly noted.
- Workflow stability takes priority over removing the Node.js 20 warning.

## Recommended commands

- `command -v quarto`
- `quarto render` if Quarto is available locally.
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 1`
- `gh run watch <run-id> --repo Glebstrauss/mgenetica --exit-status`
- `curl -L https://glebstrauss.github.io/mgenetica/ -o /private/tmp/mgenetica-home-next.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/index.html -o /private/tmp/mgenetica-modules-next.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo01-introducao-ao-melhoramento-animal.html -o /private/tmp/mgenetica-mod01-next.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html -o /private/tmp/mgenetica-mod06-next.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html -o /private/tmp/mgenetica-mod12-next.html`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); invisible(yaml::read_yaml(".github/workflows/quarto-publish.yml")); cat("yaml ok\n")'`
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
