# NEXT_SITE.md

## Next recommended site-only block

Work only on public site. Do not alter app. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`scss-maintainability`

## Status (2026-05-19)

**PUBLISHED AND LIVE:** the Phase 1-4 public-site redesign was validated locally, the remaining EN/ES translation leaks plus long-label layout adjustments were completed, and the site was published successfully on 2026-05-17. Representative live module QA on 2026-05-17 found no visible regression. Manifest cleanup on 2026-05-17 removed duplicated phase labels from module items, and the theme toggle now uses an explicit label.
**SCSS MAINTAINABILITY:** on 2026-05-18, the first cleanup pass moved shared cyan token aliases into the top stylesheet token block and removed a later duplicate override.
**SPLIT ENTRYPOINT CLARITY:** on 2026-05-19, the public site now explicitly exposes a separate learner-platform entrypoint and the repo docs/workflows no longer imply that the React frontend should appear on GitHub Pages root.

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
- Shared cyan aliases now live in the main SCSS token block, reducing duplicate token definitions.
- Public navigation and homepage now include a learner-platform entrypoint that is separate from the open Quarto learning pages.
- Frontend deploy and Appwrite deploy workflows now fail loudly when required secrets are missing, to avoid false “live” assumptions.
- Learner-app production host and Appwrite web-platform origin are still external prerequisites, not solved by GitHub Pages publish.

## Objective (next phase)

Continue site-only maintainability and QA work if further cleanup is useful. Keep copy concise, preserve the public editorial experience and avoid app-like behavior. Treat learner-app hosting and Appwrite console setup as separate operational work, not Quarto-site work.

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
- Browser QA confirmed key homepage, localized search routes and representative localized module routes; the latest live spot-check found no visible module-detail issue.
- Module manifest now avoids repeating phase labels on each item.
- Theme control now uses explicit `theme.toggle` wording.
- Full project render and the full prepublish site check now complete successfully after clearing stray generated source-side render artifacts.
- The live GitHub Pages deployment reflects the published redesign.
- The public site now makes separation from the learner app explicit through its entrypoints.
- The separate learner app still requires Vercel production configuration and Appwrite Web Platform origin registration before it can be treated as live.

## In scope (next quality-improvement block)

- SCSS maintainability work that does not alter the public editorial design.
- Targeted module-detail polish only if later QA finds a visible density or spacing issue.
- Keep `WORKLOG_SITE.md`, `project_status.md` and this file aligned after completion.

## Out of scope

- App changes.
- Treating GitHub Pages publish as learner-app deploy.
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
- `curl -s https://api.github.com/repos/Mgenetica/mgenetica/actions/runs?per_page=10`

## Criteria for completion

- Prepublish gate passes for the chosen block depth before any future publish.
- Browser QA covers primary localized module-detail routes on the live site.
- Site work does not reintroduce ambiguity between Quarto public site and separate learner app.
- Any new publish corresponds to a real site change and a fresh validation pass.
