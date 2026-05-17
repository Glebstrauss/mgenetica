# NEXT_SITE.md

## Next recommended site-only block

Work only on public site. Do not alter app. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`post-publish-qa-and-module-polish`

## Status (2026-05-17)

**PUBLISHED AND LIVE:** the Phase 1-4 public-site redesign was validated locally, the remaining EN/ES translation leaks plus long-label layout adjustments were completed, and the site was published successfully on 2026-05-17.

- Phase 1 brand system reset is applied to the public site shell.
- Phase 2 homepage simplification is applied in PT, EN and ES.
- Phase 3 navigation/footer simplification and module-index redesign are applied in PT, EN and ES.
- Phase 4 local QA and prepublish workflow hardening are in place.
- The locale switcher is visible and base-path aware for GitHub Pages `/mgenetica/`.
- Full EN/ES coverage exists for utility pages, roadmap, module index and module detail pages 01-12.
- Remaining EN/ES text leaks in module follow-up labels, support CTAs and localized code-caption strings were corrected.
- Module navigation cards and action bands were adjusted to wrap longer translated labels more cleanly.
- Full Quarto render remains the publication path, using `RENV_CONFIG_AUTOLOADER_ENABLED=FALSE` during render, and the clean local render path was restored on 2026-05-17.
- The full prepublish gate passed with render enabled on 2026-05-17.
- GitHub Pages deployment on `main` completed successfully on 2026-05-17, and the live site responds at `https://mgenetica.github.io/mgenetica/`.

## Objective (next phase)

Run the post-publish QA pass against the live localized site, then limit future work to targeted module-detail polish, content-structure cleanup and routine publication maintenance. Keep copy concise, preserve the public editorial experience and avoid app-like behavior.

## Current local state

- Full EN/ES page trees exist for:
  - Root pages (`index`, `search/busqueda`, `glossary/glosario`, `about/sobre`, `certificate/certificado`)
  - Modules index + 12 module pages (01-12)
  - Weekly roadmap (`semanas/index`)
- Quarto render patterns include `en/*`, `en/modules/*`, `en/semanas/*`, `es/*`, `es/modules/*`, `es/semanas/*`.
- Locale switcher routing supports special pages and module detail pages across `pt-BR/en/es`.
- Head metadata logic generates canonical and hreflang for special routes and localized module detail pages.
- Validator enforces localized file existence for full EN/ES module sets plus certificate pages.
- Module R examples are static fenced code in QMD pages; executable R validation still runs through `scripts/run_all_modules.R` during prepublish.
- All 38 localized QMD source files are present.
- Browser QA already confirmed key homepage, localized search routes and representative module routes; wider module-detail browser QA is still the main next-step improvement.
- Full project render and the full prepublish site check now complete successfully after clearing stray generated source-side render artifacts.
- The live GitHub Pages deployment reflects the published redesign.

## In scope (next quality-improvement block)

- Wider browser spot-check of representative localized module detail pages on the live site.
- Final module-detail polish only if live review finds remaining visual density or spacing issues.
- Content-structure cleanup and SCSS maintainability work only after live UX issues are ruled out.
- Keep `WORKLOG_SITE.md`, `project_status.md` and this file aligned after completion.

## Out of scope

- App changes.
- Backend, auth or account features.
- Unnecessary republish without a meaningful site change.
- v6 platform migration or Astro adoption during a normal site-polish block.
- New feature work unrelated to localized public-site quality.

## Recommended commands

- `git status --short --branch`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/validate_site_manifest.R`
- `node --check assets/js/i18n.js && node --check assets/js/progress.js && node --check assets/js/darkmode.js && node --check assets/js/interactives.js && node --check assets/js/quiz.js && node --check assets/js/teacher-mode.js`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R`
- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE quarto render --no-execute`
- `git diff --check`
- `curl -s -I https://mgenetica.github.io/mgenetica/`

## Criteria for completion

- Prepublish gate passes for the chosen block depth before any future publish.
- Browser QA covers primary localized module-detail routes on the live site.
- No app files are changed.
- Any new publish corresponds to a real site change and a fresh validation pass.
