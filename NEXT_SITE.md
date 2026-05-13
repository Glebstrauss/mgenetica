# NEXT_SITE.md

## Next recommended site-only block

Work only on public site. Do not alter app. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`internationalization-wave2-modules-and-locale-qa`

## Objective

Advance from Wave 1 locale routing/pages to Wave 2 module-level localization and locale-specific QA hardening.

## Current local state

- Runtime i18n engine exists in `assets/js/i18n.js`.
- Locale dictionaries exist for `pt-BR`, `en`, `es` in `assets/i18n/`.
- Core runtime strings are localized across progress/quiz/teacher-mode/darkmode/interactives.
- Locale switcher routes Wave 1 pages by path (`/`, `/en/`, `/es/`) and keeps query fallback for non-localized routes.
- Quarto render patterns include localized trees (`en/*`, `es/*`, plus `modules/` and `semanas/` subroutes).
- Wave 1 localized pages exist for home, modules index, weekly roadmap, search, glossary and about.
- Head extras now inject canonical + hreflang links for localized Wave 1 pages.

## In scope

- Translate modules 01–03 landing/intro blocks into `en` and `es` localized variants while keeping script, quiz and data linkage intact.
- Define locale-safe strategy for non-localized module pages (fallback messaging + route guard behavior).
- Expand dictionaries for recurring scientific vocabulary consistency across `pt-BR`/`en`/`es`.
- Add deployed-site locale checks for Wave 1 routes and hreflang/canonical links.
- Run full prepublish and locale-targeted render checks.
- Update `WORKLOG_SITE.md` and this file after completion.

## Out of scope

- App changes.
- Backend/auth/account features.
- Automatic publish without explicit request.
- Full translation of all 12 module longform bodies in a single block.

## Recommended commands

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `node --check assets/js/i18n.js && node --check assets/js/progress.js && node --check assets/js/darkmode.js && node --check assets/js/interactives.js && node --check assets/js/quiz.js && node --check assets/js/teacher-mode.js`
- `quarto render`
- `Rscript scripts/prepublish_site_check.R`
- `git diff --check`

## Criteria for completion

- Module-localization Wave 2 scope (01–03 intro/landing segments) is published in source for `en` and `es`.
- Route behavior is explicit for localized vs non-localized module pages.
- Locale validators and prepublish checks pass.
- No app files changed.
