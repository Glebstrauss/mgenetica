# PUBLIC_SITE_COMPONENTS.md

Reference for public-site patterns only. This file documents the visitor-facing MGenetica site and must not be used as app/admin documentation.

## Purpose

The public site uses editorial components to explain the MGenetica learning path, organize modules and support discovery. These patterns should remain scientific, premium, clear and modular enough for future content management through the internal app.

## Source Of Truth

- `data/site-manifest.yml`: public navigation, page registry, module order, module summaries, phase membership and editable-region metadata.
- `.qmd` pages: longform teaching content, page-specific editorial copy, exercises and scientific explanation.
- `styles/main.scss` and `styles/main-dark.scss`: visual system, public components, responsive behavior and dark-mode parity.
- `assets/js/`: public interactions only, loaded conditionally where possible.
- `quizzes/`: public quiz data for module self-assessment, referenced from the module registry in the manifest.

## Page Patterns

- Homepage: brand introduction, learning promise, initial orientation, module anatomy, visible learning path, repeatable learning loop, phase preview and primary next actions.
- Module index: complete public course catalog organized from the manifest-backed module journey, with phase-level guidance, support crosslinks before the full catalog and a decisive final next-step band.
- Module pages: consistent module header, objectives, teaching content, pre-quiz checkpoint, quiz, practical interpretation and previous/index/next navigation.
- Utility pages: search, glossary, certificate and study route use public hero sections plus task-focused panels.
- Institutional page: profile/about content uses `profile-hero`, public cards, site-map cards and restrained next-step guidance.

## Component Families

- Hero components: `.hero`, `.page-hero`, `.profile-hero` introduce the page and should not coexist with Quarto's automatic title block.
- Card components: module, phase, statement, profile, public-page and routine cards share border, hover, focus and wrapping behavior through the final public component layer.
- CTA groups: `.hero-actions`, `.section-cta`, `.modules-landing-actions`, `.utility-next-step`, `.final-cta-actions`, `.about-next-step-actions`, navbar journey CTA and `.profile-actions` should expose a clear primary path and restrained secondary actions.
- Learning-path components: `.hero-learning-path`, `.hero-signal`, `.home-orientation`, `.module-anatomy-grid`, `.learning-loop-grid`, `.modules-route`, `.modules-support`, `.modules-next-step`, `.route-overview`, `.route-map-intro`, `.module-study-checkpoint`, `.module-phase-start` and `.module-phase-note` clarify progression without turning the site into a dashboard.
- Discovery components: `.home-discovery`, `.discovery-grid` and `.discovery-card` connect search, glossary and route pages as learning support, not as admin utilities.
- Certificate components: `.certificate-intro`, `.certificate-status`, `.certificate-progress-list`, `.certificate-actions` and `.certificate-ready` keep the completion flow public and editorial while the progress logic remains browser-local.
- Institutional components: `.site-map-grid` and `.about-next-step` keep the about page connected to public learning routes.
- Module navigation: `.module-nav` and `.module-nav-card` keep module pages connected to previous, index and next destinations.
- Learning widgets: quizzes, progress indicators and visualizations must remain public learning aids, not admin controls. Quiz JSON files are data for public self-assessment and must stay aligned with each module's `data-module` value.

## Responsive And Accessibility Rules

- Mobile layouts should collapse to one column without horizontal overflow.
- Tables and code must remain readable on small screens.
- Focus states should be visible on cards, links, buttons and quiz controls.
- Dark mode must preserve contrast on utility pages, module pages and institutional branding.
- Floating controls should appear only where the current page needs them.

## Maintenance Rules

- Prefer manifest metadata for navigation, module order and card summaries.
- Keep scientific lesson content in `.qmd` files.
- Avoid adding new public patterns when an existing hero, card, CTA or module-navigation pattern fits.
- Do not delete old SCSS groups unless a later active rule clearly supersedes them and validation passes.
- Do not put app/admin behavior, authentication or backend assumptions into public components.

## Validation Contracts

- `scripts/validate_site_manifest.R` protects manifest/page/module contracts, Quarto navigation sync and this documentation file.
- `scripts/validate_deployed_site.R` protects the published public pages and representative module patterns after GitHub Pages deployment.
- `scripts/prepublish_site_check.R` is the required local gate before publication.
- GitHub Actions remains the authoritative full Quarto render path when local `quarto` is not available on `PATH`.
