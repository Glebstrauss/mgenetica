# PUBLIC_SITE_COMPONENTS.md

Reference for public-site patterns only. This file documents the visitor-facing MGenetica site and must not be used as app/admin documentation.

## Purpose

The public site uses editorial components to explain the MGenetica learning path, organize modules and support discovery. These patterns should remain scientific, premium, clear and modular enough for future content management through the internal app.

## Source Of Truth

- `data/site-manifest.yml`: public navigation, page registry, module order, module summaries, phase membership and editable-region metadata.
- `.qmd` pages: longform teaching content, page-specific editorial copy, exercises and scientific explanation.
- `styles/main.scss` and `styles/main-dark.scss`: visual system, public components, responsive behavior and dark-mode parity.
- `assets/js/`: public interactions only, loaded conditionally where possible.

## Page Patterns

- Homepage: brand introduction, learning promise, phase preview and primary next actions.
- Module index: complete public course catalog organized from the manifest-backed module journey.
- Module pages: consistent module header, objectives, teaching content, quiz, practical interpretation and previous/index/next navigation.
- Utility pages: search, glossary and study route use public hero sections plus task-focused panels.
- Institutional page: profile/about content uses `profile-hero`, public cards and restrained brand presentation.

## Component Families

- Hero components: `.hero`, `.page-hero`, `.profile-hero` introduce the page and should not coexist with Quarto's automatic title block.
- Card components: module, phase, statement, profile, public-page and routine cards share border, hover, focus and wrapping behavior through the final public component layer.
- CTA groups: `.hero-actions`, `.section-cta`, `.modules-landing-actions`, `.final-cta-actions` and `.profile-actions` should expose a clear primary path and restrained secondary actions.
- Module navigation: `.module-nav` and `.module-nav-card` keep module pages connected to previous, index and next destinations.
- Learning widgets: quizzes, progress indicators and visualizations must remain public learning aids, not admin controls.

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
