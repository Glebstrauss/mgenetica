# BACKLOG_SITE.md

Priority levels: critical, high, medium, low.

## 1. Homepage

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Refine first viewport composition | Improve hierarchy, logo presence, CTA placement and above-the-fold balance. | Desktop and mobile first viewport communicate brand, value and next action without crowding. |
| high | Strengthen learning narrative | Make the progression from concept to code to interpretation more explicit. | Homepage explains the educational journey before the full module list. |
| medium | Reduce duplicated module content | Avoid maintaining module card text in multiple places when a simple data source can support it. | Module cards can be updated from one canonical content structure or manifest. |
| medium | Improve final CTA | Make the end-of-page action more decisive and visually polished. | Users can clearly choose between module index and study route. |

## 2. Identity visual

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Consolidate visual system | Convert accumulated SCSS overrides into clearer sections/tokens. | Colors, spacing, cards, buttons and section patterns are easier to maintain. |
| high | Audit brand geometry | Ensure graphic motifs feel derived from the MGenética logo rather than decorative. | Repeated visual elements have consistent geometry, scale and purpose. |
| medium | Improve dark theme parity | Keep all public components visually coherent in dark mode. | New and existing components have readable contrast and matching premium finish in both themes. |

## 3. Navegação pública

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Review navbar labels and order | Ensure public navigation reflects the visitor journey. | Header prioritizes Início, Módulos, Roteiro, Busca, Glossário and Sobre clearly. |
| medium | Improve active states | Make active navigation states more visible without looking heavy. | Users can identify current location in header and sidebar. |
| medium | Add clearer module collection flow | Improve movement from module index to individual module pages. | Module index, sidebar and previous/next links feel connected. |

## 4. Páginas dos módulos

| Priority | Item | Description | Done when |
|---|---|---|---|
| critical | Standardize module headers | Ensure all module pages use consistent metadata, objectives and navigation. | Every module has the same structural pattern and no missing previous/next context. |
| high | Improve reading rhythm | Refine spacing, callouts, tables, code blocks and exercise sections. | Long modules feel readable on desktop and mobile. |
| high | Improve quiz placement | Ensure quizzes feel integrated into learning, not appended. | Quiz section has clear context and does not break flow. |
| medium | Add module summaries | Add concise summary blocks without inventing extensive new scientific content. | Each module closes with clear takeaways or next-step prompts. |

## 5. Estrutura editorial

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Define page patterns | Create reusable editorial patterns for hero, overview, cards, CTA and references. | Public pages share a coherent structure without copy-pasted visual drift. |
| high | Improve content metadata | Expand metadata for pages and modules to support future management. | Manifest contains page roles, editable regions, collection membership and publication status. |
| medium | Separate public content from internal notes | Keep planning and admin logic out of public pages. | Public pages contain visitor-facing content only. |

## 6. CTAs

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Clarify primary CTA hierarchy | Ensure each public page has one obvious next action. | CTA hierarchy is clear on homepage, modules index and module pages. |
| medium | Audit secondary CTAs | Remove or soften actions that compete with the main path. | Secondary buttons support the journey without visual noise. |
| low | Add contextual CTAs | Add small, relevant next actions where useful. | CTAs appear only where they help progression. |

## 7. Responsividade

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Mobile QA for homepage and modules | Check spacing, type scale, cards, tables, code and navigation. | No overlapping, cramped or horizontally broken content at common mobile widths. |
| high | Tablet layout audit | Ensure grids collapse at sensible breakpoints. | Two-column and three-column layouts adapt cleanly. |
| medium | Improve table/code handling | Keep scientific tables and code readable on small screens. | Tables and code scroll or wrap appropriately without breaking layout. |

## 8. Acessibilidade básica

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Keyboard navigation audit | Verify skip link, focus states and interactive elements. | A keyboard user can navigate header, content, quizzes and toggles. |
| high | Contrast audit | Check text, buttons, cards and dark mode contrast. | Key UI text meets practical contrast expectations. |
| medium | Improve ARIA for dynamic widgets | Ensure glossary, quizzes and visualizations expose useful labels. | Dynamic widgets have clear labels and states where needed. |

## 9. Performance

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Keep scripts conditional | Load interactive scripts only on pages that need them. | Unrelated pages do not load quiz/interactives code. |
| medium | Review font loading | Ensure typography remains premium without unnecessary blocking. | Fonts load efficiently with acceptable fallback behavior. |
| medium | Check generated page weight | Monitor HTML/CSS size as SCSS grows. | Large pages remain acceptable for GitHub Pages. |

## 10. Organização de componentes

| Priority | Item | Description | Done when |
|---|---|---|---|
| critical | Clean SCSS organization | Refactor appended sections into a clearer design-system structure. | SCSS is easier to scan, with tokens, base, components and page-specific sections. |
| high | Reduce repeated card patterns | Harmonize module cards, phase cards, statement cards and profile cards. | Cards share consistent class patterns and styling rules. |
| medium | Document public components | Add short documentation for page patterns and component intent. | Future work can reuse patterns without rediscovering them. |

## 11. Estrutura modular para futura gestão pelo app

| Priority | Item | Description | Done when |
|---|---|---|---|
| high | Expand site manifest | Add publication status, editable regions, ordering and content ownership. | The app can later read the manifest as a stable content map. |
| high | Align module index with manifest | Reduce hardcoded duplication between `modules/index.qmd` and `data/site-manifest.yml`. | Module metadata is maintained in one place or has a clear synchronization path. |
| medium | Define content governance | Clarify what belongs in public pages, manifest, worklog and internal app. | Future blocks do not mix public copy with admin concerns. |
| low | Add validation script | Add a simple check for manifest links and module references. | Broken manifest/page links can be caught before deploy. |
