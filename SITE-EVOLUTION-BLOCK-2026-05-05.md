# Site evolution block — 2026-05-05

## Cycle 1 — Homepage

- Diagnosis: homepage had improved since the previous deploy, but the public promise and study journey still depended too much on the long module list.
- Implementation: added hero metadata, a clearer progression headline, a platform-structure section, and a final CTA to the module index and weekly route.
- Test: compiled `styles/main.scss` with `sass::sass_file`.
- Result: homepage now communicates public value, reproducible practice, and future editorial management more directly.

## Cycle 2 — Navigation and public flow

- Diagnosis: the "Módulos" navigation item sent visitors directly into Module 01 instead of giving a collection overview.
- Implementation: created `modules/index.qmd`, updated navbar labels and targets, added the modules index to the sidebar, and added an institutional footer.
- Test: parsed `_quarto.yml` with `yaml::read_yaml` and compiled SCSS.
- Result: visitors now have a public module landing page before entering individual lessons.

## Cycle 3 — Internal pages and editorial consistency

- Diagnosis: utility pages were visually sparse, and the public "Perfil" page still contained placeholders.
- Implementation: rewrote `perfil.qmd` as an institutional "Sobre" page and added editorial hero structures to search, glossary, and weekly route pages.
- Test: compiled SCSS and searched for old placeholder text.
- Result: internal pages now match the public editorial role of the site.

## Cycle 4 — Responsiveness and accessibility

- Diagnosis: global focus states, skip navigation, reduced-motion handling, and mobile touch targets needed stronger baseline treatment.
- Implementation: added skip link, focus-visible styling, reduced-motion media query, mobile button/nav adjustments, and deferred dynamic script injection.
- Test: compiled SCSS and ran `node --check` on core scripts.
- Result: keyboard and mobile behavior have a stronger baseline without changing the app.

## Cycle 5 — Content structure for future app management

- Diagnosis: `data/site-manifest.yml` did not reflect the new module index, public pages, footer, phases, or editable regions.
- Implementation: expanded the manifest with public pages, editable regions, module phases, updated navigation, and corrected public labels.
- Test: parsed manifest with `yaml::read_yaml`.
- Result: the site now has a clearer content map for future app-based management.

## Cycle 6 — Dark theme consistency

- Diagnosis: new public components had light-theme styling but incomplete dark-theme coverage.
- Implementation: added dark overrides for hero metadata, editorial cards, module index, page hero blocks, CTA, footer, search and glossary panels.
- Test: compiled both `styles/main.scss` and `styles/main-dark.scss`, then ran JS syntax checks for interactive scripts.
- Result: the new public site sections keep contrast and brand consistency in both themes.

## Cycle 7 — Conditional script integration

- Diagnosis: the glossary block uses `data-glossary`, but the conditional script loader only loaded `interactives.js` for visualizations and the learning map.
- Implementation: added `[data-glossary]` to the loader condition while keeping script loading page-specific.
- Test: ran JS syntax checks for the global scripts.
- Result: the glossary remains lazy-loaded and functional without loading interactive code on unrelated pages.
