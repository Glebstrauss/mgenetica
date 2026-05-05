# ROADMAP_SITE.md

## Site vision

The MGenética site is the public, editorial and institutional layer of the project. It should communicate a serious, premium and scientifically trustworthy brand for genetics, quantitative genetics, animal breeding and applied genomics education.

The site should feel modern, elegant, precise and technological without becoming generic, overly colorful, template-like or administrative.

## Product role

The site is the public experience. It should:

- Present the MGenética identity and learning promise.
- Organize the course as a clear educational journey.
- Make modules easy to understand, navigate and complete.
- Support discovery through search, glossary, module index and study route.
- Stay fast and stable for GitHub Pages.
- Use modular content patterns that can later be managed by the internal app.

The app is not the public product. It is an internal panel for managing the site, pages, modules, publications and user projects. Site evolution must not alter the app unless explicitly requested.

## Homepage

The homepage should act as the main public introduction to MGenética. It should clearly explain:

- What MGenética is.
- Who the site is for.
- Why the learning path matters.
- Where to start.
- How modules connect concept, simulation, R code and interpretation.

The homepage should prioritize clarity, hierarchy, brand presence, premium composition and strong calls to action.

## Module pages

Module pages are the core educational content. They should:

- Present a consistent module header.
- Explain concepts before formulas.
- Connect R scripts to interpretation.
- Support exercises, quizzes and practical learning.
- Maintain readable spacing, tables, code blocks and callouts.
- Include clear previous/next navigation.

## Institutional pages

Institutional and utility pages should support the public experience without becoming filler. These include:

- About/Sobre: explains the public role, scope and principles of MGenética.
- Search/Busca: helps users find concepts, functions and modules.
- Glossary/Glossário: supports technical vocabulary.
- Study route/Roteiro: organizes progression over time.

## Visual direction

The visual direction is:

- Premium.
- Scientific.
- Modern.
- Elegant.
- Institutional.
- Technological.
- Clear.
- Trustworthy.

The logo should guide geometry, rhythm, contrast, precision and brand tone, but the design should not be limited to logo colors alone.

## Relationship with the app

The app is an internal management layer. The site should be structured so the app can later manage:

- Pages.
- Module metadata.
- Editorial regions.
- Navigation labels.
- Publication status.
- Content collections.

This preparation should happen through clear content organization and metadata, not by turning the public site into an admin interface.

## Content Governance

`data/site-manifest.yml` is the public-site content map. It is the canonical source for navigation, page registry, module registry, module order, phase membership, module card titles and module card summaries.

The `.qmd` pages remain the canonical source for longform teaching content, scientific explanation, exercises and page-specific editorial composition. The manifest may describe editable regions, but it should not become a dump of full scientific lessons.

Future app management should read and write only the declared public-site metadata and editable regions. It must not turn the public site into an administrative interface, and it must not silently alter teaching scripts, visual design tokens or longform scientific content without explicit editorial review.

Validation scripts should protect the contract between the manifest and public pages. When module cards, phases, page roles, statuses or navigation entries drift, the local validation should fail before publication.
