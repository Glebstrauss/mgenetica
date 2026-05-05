# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Publish or render the latest site-only refinements, then verify the generated HTML for the issues fixed in the last block: homepage/module-index section numbering, favicon/PWA metadata, Open Graph image URLs, glossary semantics and quiz reduced-motion behavior.

## Scope

In scope:

- Public homepage.
- Module index.
- Representative module pages.
- Search, glossary, roteiro and sobre pages.
- Generated HTML checks after render/deploy.
- `styles/main.scss` and public interaction scripts if regressions are found.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend.
- Authentication.
- Large scientific-content rewrites.
- New dependencies unless needed for a small validation script.

## Priorities

1. Render or publish the current site changes.
2. Verify generated HTML no longer shows numbered headings on homepage and module index.
3. Verify favicon/PWA and social image metadata resolve to valid URLs on root and nested pages.
4. Inspect homepage, module index and representative module pages after deploy.
5. Add lightweight generated-HTML validation if the checks are repetitive and stable.
6. Keep all changes site-only and documented.

## Planned cycles

### Cycle 1 — Publish/render verification

- Diagnose whether local Quarto is available.
- If unavailable, publish via GitHub Actions when requested or rely on the latest deployed artifact.
- Verify workflow/render status when publishing occurs.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 2 — Generated homepage QA

- Fetch rendered homepage HTML.
- Confirm homepage headings are not visually numbered.
- Check hero logo, primary CTA and secondary CTA in generated markup.
- Correct regressions if found and test.

### Cycle 3 — Generated module-index QA

- Fetch rendered module-index HTML.
- Confirm module-index headings are not visually numbered.
- Check module-index CTAs and phase/module cards.
- Correct regressions if found and test.

### Cycle 4 — Metadata and asset-link validation

- Check favicon, apple-touch-icon, manifest and Open Graph/Twitter image URLs on root and nested pages.
- Add a small validation script only if it stays dependency-light.
- Test with `curl` or the validation script.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 5 — Interaction and accessibility spot check

- Check glossary generated markup, quiz result markup and reduced-motion behavior by static inspection.
- Run JS syntax checks.
- Correct small regressions only.
- Register notes in `WORKLOG_SITE.md`.

### Cycle 6 — Final validation and next plan

- Run the full available validation command set.
- Update `WORKLOG_SITE.md`.
- Prepare the following `NEXT_SITE.md`.
- Record any deployment/cache caveats.

## Criteria for completion

- At least 6 cycles are executed unless there is a real blocker.
- Changes remain site-only.
- No app files are altered.
- Generated output is inspected through local render, deployed HTML or workflow artifacts.
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
