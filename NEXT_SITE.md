# NEXT_SITE.md

## Next recommended site-only block

Work only on public site. Do not alter app. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`review-or-publish-phase-1-4-site-redesign`

## Status (2026-05-14)

**READY FOR REVIEW:** Phase 1-4 site redesign block completed locally.
- Phase 1 brand system reset applied to the public site shell.
- Phase 2 homepage simplification applied in PT, EN and ES.
- Phase 3 navigation/footer simplification and module-index redesign applied in PT, EN and ES.
- Phase 4 local QA and full prepublish gate completed.
- Navbar language button is visible and base-path aware for GitHub Pages `/mgenetica/`.
- Full Quarto render blocker resolved for the official prepublish path.
- Follow-up visual correction applied: Home nav active color is neutral again, and the homepage logo panel uses the original full logo visual without an extra dark inset.

## Objective (next phase)

Review the completed local redesign, then either publish on explicit request or continue with a content-polish block for internal module pages. Keep copy concise, reduce repeated guidance blocks and preserve the public editorial experience.

## Current local state

- Full EN/ES page trees created for:
  - Root pages (`index`, `search/busqueda`, `glossary/glosario`, `about/sobre`, `certificate/certificado`)
  - Modules index + 12 module pages (01–12)
  - Weekly roadmap (`semanas/index`)
- Quarto render patterns include `en/*`, `en/modules/*`, `en/semanas/*`, `es/*`, `es/modules/*`, `es/semanas/*`.
- Locale switcher routing supports special pages + module detail pages across `pt-BR/en/es`.
- Locale switcher now accounts for project Pages base path `/mgenetica/`.
- Head metadata logic generates canonical/hreflang for special routes and module-detail localized pages.
- Validator enforces localized file existence for full EN/ES module sets plus certificate pages.
- Current validation gates pass for JS syntax, manifest checks, diff check and full prepublish with Quarto render.
- Full Quarto render now completes through `scripts/prepublish_site_check.R` with `RENV_CONFIG_AUTOLOADER_ENABLED=FALSE`.
- Module R examples are static fenced code in QMD pages; executable R validation still runs through `scripts/run_all_modules.R` during prepublish.
- All 38 localized QMD source files are present.
- Browser QA confirmed local page loading for PT/ES homepages and PT/EN module index, including visible language controls.

## In scope (next quality-improvement block)

- Optional visual polish for internal module detail pages after the index redesign.
- Optional browser spot-check of every localized module detail page before publication.
- Optional deployed-site validation after publication.
- Update `WORKLOG_SITE.md` and this file after completion.

## Out of scope

- App changes.
- Backend/auth/account features.
- Automatic publish without explicit request.
- New feature work unrelated to localization quality.
- Publishing current rollout (awaiting explicit user request or next phase completion).

## Recommended commands

- `git status --short --branch`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/validate_site_manifest.R`
- `node --check assets/js/i18n.js && node --check assets/js/progress.js && node --check assets/js/darkmode.js && node --check assets/js/interactives.js && node --check assets/js/quiz.js && node --check assets/js/teacher-mode.js`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/prepublish_site_check.R`
- `git diff --check`

## Criteria for completion

- Full prepublish gate passes.
- Browser QA covers primary localized routes.
- No app files changed.
- User explicitly approves publish, if publication is next.
