# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Run rendered visual QA and safe cleanup for the public MGenética site. The priority is to inspect the actual rendered pages, compare desktop and mobile behavior, and only then remove older duplicate stylesheet rules that are demonstrably covered by the newer public component layer.

## Scope

In scope:

- Public homepage.
- Module index.
- Representative module pages.
- Search, glossary, roteiro and sobre pages.
- `styles/main.scss` and `styles/main-dark.scss`.
- Public interaction scripts when regressions are found.
- Site manifest validation.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend.
- Authentication.
- New dependencies unless strictly justified.
- Large scientific-content rewrites.
- Repositioning the product away from a premium public education/science site.

## Priorities

1. Render the site and inspect real desktop/mobile output.
2. Correct any visible homepage hierarchy, spacing, CTA or logo/capa issues.
3. Verify module index and representative module pages as a coherent editorial system.
4. Remove older duplicate SCSS only after visual parity is confirmed.
5. Validate accessibility-sensitive interactions and publication readiness.
6. Keep the content/manifest structure prepared for future app management without altering the app.

## Planned cycles

### Cycle 1 — Render and homepage visual QA

- Diagnose the rendered homepage at desktop and mobile widths.
- Check hero composition, logo use, CTAs, section rhythm and first-viewport clarity.
- Implement only concrete visual fixes found in the rendered output.
- Test with SCSS compilation and, when possible, browser screenshot review.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 2 — Public navigation and CTA flow

- Diagnose header, footer, homepage CTAs, module-index CTAs and public return paths.
- Correct confusing labels, weak hierarchy or broken navigation states.
- Test links through static checks or rendered browser review.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 3 — Module index and representative module pages

- Diagnose `modules/index.qmd` plus at least modules 1, 6 and 12.
- Improve spacing, editorial hierarchy, bottom navigation or quiz placement if needed.
- Run manifest validation and SCSS checks.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 4 — Safe SCSS duplicate removal

- Identify older rules that duplicate the public component layer.
- Remove only redundant rules that do not change rendered output materially.
- Compile light and dark SCSS after each meaningful cleanup.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 5 — Accessibility, responsiveness and interaction regression

- Check skip link, focus states, color contrast, reduced-motion behavior, quiz feedback, glossary search and teacher-mode toggle.
- Correct regressions or small semantic gaps.
- Run JS syntax checks and manifest validation.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 6 — Publication readiness and documentation

- Run the full validation command set.
- If Quarto is available, run `quarto render`.
- If local Quarto is unavailable, record the blocker and rely on GitHub Actions or another Quarto-enabled environment for render verification.
- Update `WORKLOG_SITE.md` and prepare the following `NEXT_SITE.md`.

## Criteria for completion

- At least 6 cycles are executed unless there is a real blocker.
- Changes remain site-only.
- No app files are altered.
- Rendered output is inspected if Quarto/browser tooling is available.
- `WORKLOG_SITE.md` is updated.
- `NEXT_SITE.md` is updated again at the end of the block.
- Available build, lint or tests are run.
- Any unavailable command is explicitly noted.

## Recommended commands

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
- `quarto render` if Quarto is available locally.
- GitHub Actions or GitHub Pages deploy verification if local Quarto is unavailable.
