# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`browser-visual-qa-after-structural-simplification`

## Objective

Perform true browser-based visual QA of the simplified public-site structure, with emphasis on desktop/mobile scanning, navigation clarity, dark mode coherence and absence of visual regressions after the SCSS pruning.

## Current local state

- The last publication completed successfully through GitHub Actions and deployed-site validation at commit `c7dd2e3`.
- The current local, unpublished site-only work simplifies public page structure by removing repeated guidance blocks from:
  - `index.qmd`;
  - `modules/index.qmd`;
  - `busca.qmd`;
  - `glossario.qmd`.
- The manifest, public component documentation and validator were updated so editable regions and required component references match the simplified structure.
- Post-simplification CSS cleanup removed unused light/dark SCSS selectors for retired homepage, module-index and utility-page guidance blocks.
- Targeted Quarto render passed locally for `index.qmd`, `modules/index.qmd`, `busca.qmd` and `glossario.qmd`.
- Rendered HTML inspection confirmed retired blocks are absent from the affected rendered pages and the retained core blocks still render:
  - homepage hero, wayfinding, output-standard, trust anchors, first-session and path-contract;
  - module-index wayfinding, guidance, output-route, completion flow, phases and module grid;
  - search/glossary utility evidence routes, panel hints and core query/recovery flows.
- Manifest validation, SCSS validation, whitespace diff check and full prepublish gate passed after the CSS cleanup.
- Browser tooling was not exposed in this session; no true desktop/mobile screenshot QA was performed.
- Pre-existing untracked local files remain unrelated and untouched: `.agents/`, `.vscode/`, `AUTOMATION_SITE.md`.

## In scope

- Perform true browser visual QA for the simplified homepage, module index, search and glossary pages at desktop, tablet and mobile widths when tooling is available.
- Check both light and dark themes if the browser/session tooling supports theme switching.
- Verify visual hierarchy, spacing, CTA clarity, navigation affordances and text density after the removal of repeated sections.
- Confirm retained components do not appear too sparse after simplification and that users still understand what MGenética offers and where to go next.
- Re-run manifest validation, SCSS validation, whitespace diff check and full prepublish gate after any visual adjustment.

## Out of scope

- App changes.
- Backend, CMS, authentication or new project dependencies.
- Automatic publication without explicit user request.
- Cleanup of unrelated untracked local files.

## Recommended commands

- `git status --short --branch`
- `git diff --check`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

## Criteria for completion

- Simplified pages are visually coherent and easier to scan on desktop and mobile.
- No retired blocks render in the affected pages.
- Core navigation, module access, search/glossary support and certificate paths remain available.
- Browser visual QA findings are either fixed or explicitly logged.
- Manifest validation, SCSS validation, whitespace diff check and full prepublish gate pass.
- No app files are changed.
