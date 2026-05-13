# NEXT_SITE.md

## Next recommended site-only block

Work only on public site. Do not alter app. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`internationalization-quality-pass-and-native-copy-polish`

## Status (2024-12-19)

**COMPLETE:** Full i18n rollout finished.
- All 38 pages translated to EN/ES.
- All validation gates pass.
- Ready for quality-review or publication.

## Objective (next phase)

Polish EN/ES localized copy quality and tighten locale-specific UX/accessibility. Verify internal links are correct per locale and terminology is consistent.

## Current local state

- Full EN/ES page trees created for:
  - Root pages (`index`, `search/busqueda`, `glossary/glosario`, `about/sobre`, `certificate/certificado`)
  - Modules index + 12 module pages (01–12)
  - Weekly roadmap (`semanas/index`)
- Quarto render patterns include `en/*`, `en/modules/*`, `en/semanas/*`, `es/*`, `es/modules/*`, `es/semanas/*`.
- Locale switcher routing supports special pages + module detail pages across `pt-BR/en/es`.
- Head metadata logic generates canonical/hreflang for special routes and module-detail localized pages.
- Validator enforces localized file existence for full EN/ES module sets plus certificate pages.
- All validation gates pass: JS syntax, manifest checks, prepublish gate, quarto render.
- All 38 localized QMD files present and render successfully.

## In scope (next quality-improvement block)

- Manual editorial polish of EN/ES copy in high-traffic pages (`index`, `modules/index`, `semanas/index`, `certificate/certificado`).
- Terminology normalization pass for genetics/statistics terms in EN/ES module bodies.
- Accessibility copy pass on localized `aria-label`/button text consistency.
- Verify intra-locale links are correct (EN pages → EN routes, ES pages → ES routes).
- Add deployed-site locale checks for full localized route samples (including certificate and representative modules).
- Run full prepublish and render checks after copy polish.
- Update `WORKLOG_SITE.md` and this file after completion.

## Out of scope

- App changes.
- Backend/auth/account features.
- Automatic publish without explicit request.
- New feature work unrelated to localization quality.
- Publishing current rollout (awaiting explicit user request or next phase completion).

## Recommended commands

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `node --check assets/js/i18n.js && node --check assets/js/progress.js && node --check assets/js/darkmode.js && node --check assets/js/interactives.js && node --check assets/js/quiz.js && node --check assets/js/teacher-mode.js`
- `quarto render`
- `Rscript scripts/prepublish_site_check.R`
- `git diff --check`

## Criteria for completion

- EN/ES copy is manually polished in prioritized public pages and representative modules.
- Terminology is consistent across EN/ES for key technical terms.
- Locale route/canonical/hreflang behavior remains valid after edits.
- Validators and prepublish checks pass.
- No app files changed.
