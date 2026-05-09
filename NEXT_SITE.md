# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`publication-readiness-review`

## Objective

Review the accumulated local public-site visual/UX changes and decide whether to publish. The current local work improves homepage first-viewport CTA visibility, public navigation and footer completeness, module-index action/support flow, weekly route guidance, homepage discovery/orientation/module anatomy, search/glossary support flows, certificate access and certificate-page presentation, institutional About next actions, module phase-start and phase-transition notes, final module completion context, responsive code/table handling, component documentation, manifest governance and validation coverage.

## Current local state

- Local site changes are validated and ready for review.
- No commit, push or publication was performed in the latest long blocks.
- Full prepublish validation passed locally with the vendored Quarto CLI on `PATH`.
- Latest local screenshot artifacts:
  - `/private/tmp/mgenetica-block6-home-mobile.png`
  - `/private/tmp/mgenetica-block6-modules-mobile.png`
  - `/private/tmp/mgenetica-block6-modules-tablet.png`
  - `/private/tmp/mgenetica-block6-module03-mobile.png`
- Previous local screenshot artifacts:
  - `/private/tmp/mgenetica-block5-home-mobile.png`
  - `/private/tmp/mgenetica-block5-about-mobile.png`
  - `/private/tmp/mgenetica-block5-about-tablet.png`
  - `/private/tmp/mgenetica-block5-module06-mobile.png`
  - `/private/tmp/mgenetica-block4-home-mobile.png`
  - `/private/tmp/mgenetica-block4-certificate-mobile.png`
  - `/private/tmp/mgenetica-block4-certificate-tablet.png`
  - `/private/tmp/mgenetica-block4-route-mobile.png`
  - `/private/tmp/mgenetica-block3-home-mobile.png`
  - `/private/tmp/mgenetica-block3-search-mobile.png`
  - `/private/tmp/mgenetica-block3-module12-mobile.png`
  - `/private/tmp/mgenetica-block2-home-desktop.png`
  - `/private/tmp/mgenetica-block2-home-mobile.png`
  - `/private/tmp/mgenetica-block2-modules-mobile.png`
  - `/private/tmp/mgenetica-block2-modules-tablet.png`
  - `/private/tmp/mgenetica-block2-route-mobile.png`
- Earlier local screenshot artifacts also remain available:
  - `/private/tmp/mgenetica-home-desktop.png`
  - `/private/tmp/mgenetica-home-mobile.png`
  - `/private/tmp/mgenetica-modules-mobile.png`
  - `/private/tmp/mgenetica-route-mobile.png`
- Pre-existing untracked local files remain unrelated and untouched: `.agents/`, `.vscode/`, `AUTOMATION_SITE.md`.

## In scope

- Review rendered screenshots for visual quality.
- Re-run `git diff --check`.
- Re-run `Rscript scripts/prepublish_site_check.R` with Quarto available on `PATH` before any publication.
- If publication is requested, commit and push only the site-related tracked changes.
- After publication, watch the GitHub Actions deployment and run `Rscript scripts/validate_deployed_site.R`.

## Out of scope

- App changes.
- Backend, CMS, authentication or new dependencies in the project.
- Broad scientific lesson rewrites.
- Automatic publication without explicit user request.
- Cleanup of unrelated untracked local files.

## Recommended commands

- `git status --short --branch`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`
- `gh run list --limit 5`
- `gh run watch`
- `Rscript scripts/validate_deployed_site.R`

## Criteria for completion

- Screenshots are reviewed or explicitly accepted.
- Prepublication gate passes immediately before any publish.
- If published, GitHub Actions deployment completes successfully and deployed-site validation passes.
