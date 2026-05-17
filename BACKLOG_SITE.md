# BACKLOG_SITE.md

Priority levels: critical, high, medium, low.

This backlog lists remaining public-site work after the local Phase 1-4 redesign completion. Completed redesign items are intentionally removed so this file reflects open work only.

## 1. Homepage

| Priority | Item | Description | Done when |
|---|---|---|---|
| medium | Strengthen learning narrative | Make the progression from concept to code to interpretation more explicit without reintroducing homepage density. | Homepage explains the educational journey before the full module list with concise editorial rhythm. |
| medium | Reduce duplicated module content | Avoid maintaining module card text in multiple places when a simple data source can support it. | Module cards can be updated from one canonical content structure or manifest. |
| medium | Refine final CTA band | Keep the closing action decisive, premium and simpler than an app dashboard. | Users can clearly choose between module index and study route without CTA competition. |

## 2. Identity visual

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Consolidate visual system | Convert accumulated SCSS overrides into clearer sections and tokens. | Colors, spacing, cards, buttons and section patterns are easier to maintain. |
| medium | Audit brand geometry | Ensure repeated graphic motifs still feel derived from the MGenética identity rather than decorative drift. | Visual motifs have consistent geometry, scale and purpose. |
| medium | Improve dark theme parity | Keep all public components visually coherent in dark mode. | New and existing components have readable contrast and matching premium finish in both themes. |

## 3. Navegação pública

| Priority | Item | Description | Done when |
|---|---|---|---|
| medium | Improve active states | Make active navigation states clearer without reintroducing heavy button-like treatment. | Users can identify current location in header and module navigation with restrained styling. |
| medium | Strengthen module collection flow | Improve movement from module index to individual module pages and back. | Module index, module navigation and previous/next links feel connected. |
| low | Reassess utility-page discoverability | Keep search and glossary accessible without competing with the simplified primary journey. | Utility pages are easy to reach from appropriate public routes. |

## 4. Páginas dos módulos

| Priority | Item | Description | Done when |
|---|---|---|---|
| critical | Standardize module headers | Ensure all module pages use consistent metadata, objectives and navigation. | Every module has the same structural pattern and no missing previous/next context. |
| high | Improve reading rhythm | Refine spacing, callouts, tables, code blocks and exercise sections. | Long modules feel readable on desktop and mobile. |
| high | Improve quiz placement | Ensure quizzes feel integrated into learning, not appended. | Quiz section has clear context and does not break flow. |
| medium | Add concise module summaries | Add short takeaways without inventing extensive new scientific content. | Each module closes with clear takeaways or next-step prompts. |

## 5. Estrutura editorial

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Improve content metadata | Expand metadata for pages and modules to support future management. | Manifest contains page roles, editable regions, collection membership and publication status. |
| medium | Separate public content from internal notes | Keep planning and admin logic out of public pages. | Public pages contain visitor-facing content only. |
| medium | Clarify page-pattern reuse | Keep hero, CTA and guidance blocks coherent across localized pages. | Public pages share a structure without visual drift or excessive copy duplication. |

## 6. CTAs

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Clarify primary CTA hierarchy | Ensure each public page has one obvious next action. | CTA hierarchy is clear on homepage, modules index and module pages. |
| medium | Audit secondary CTAs | Remove or soften actions that compete with the main path. | Secondary buttons support the journey without visual noise. |
| low | Add contextual CTAs | Add small, relevant next actions only where they help progression. | CTAs appear only where they help progression. |

## 7. Responsividade

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Mobile QA for homepage and modules | Check spacing, type scale, cards, tables, code and navigation. | No overlapping, cramped or horizontally broken content at common mobile widths. |
| high | Tablet layout audit | Ensure grids collapse at sensible breakpoints. | Two-column and three-column layouts adapt cleanly. |
| medium | Improve table and code handling | Keep scientific tables and code readable on small screens. | Tables and code scroll or wrap appropriately without breaking layout. |

## 8. Acessibilidade básica

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Keyboard navigation audit | Verify skip link, focus states and interactive elements. | A keyboard user can navigate header, content, quizzes and toggles. |
| high | Contrast audit | Check text, buttons, cards and dark mode contrast. | Key UI text meets practical contrast expectations. |
| medium | Improve ARIA for dynamic widgets | Ensure glossary, quizzes and visualizations expose useful labels. | Dynamic widgets have clear labels and states where needed. |

## 9. Performance

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Keep scripts conditional | Load interactive scripts only on pages that need them. | Unrelated pages do not load quiz or interactives code. |
| medium | Review generated page weight | Monitor HTML and CSS size as SCSS grows. | Large pages remain acceptable for GitHub Pages. |
| medium | Check localized-route output cost | Ensure the expanded PT/EN/ES site tree does not create unnecessary asset duplication. | Localized output remains lean and predictable. |

## 10. Organização de componentes

| Priority | Item | Description | Done when |
|---|---|---|---|
| critical | Clean SCSS organization | Refactor appended sections into a clearer design-system structure. | SCSS is easier to scan, with tokens, base, components and page-specific sections. |
| high | Reduce repeated card patterns | Harmonize module cards, phase cards, statement cards and profile cards. | Cards share consistent class patterns and styling rules. |
| medium | Keep component documentation current | Update public pattern docs when active components change. | Future work can reuse patterns without rediscovering them. |

## 11. Estrutura modular para futura gestão pelo app

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Expand site manifest | Add publication status, editable regions, ordering and content ownership. | The app can later read the manifest as a stable content map. |
| high | Align module index with manifest | Reduce hardcoded duplication between `modules/index.qmd` and `data/site-manifest.yml`. | Module metadata is maintained in one place or has a clear synchronization path. |
| medium | Define content governance | Clarify what belongs in public pages, manifest, worklog and internal app. | Future blocks do not mix public copy with admin concerns. |
| low | Extend validation coverage | Add checks for manifest links, localized route contracts and module references where useful. | Broken public metadata and route drift are caught before deploy. |
