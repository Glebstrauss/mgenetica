# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`brand-identity-review-and-controlled-site-pilot`

## Objective

Review the new MGenética identity package before any integration. Do not import the brand CSS into published pages, do not alter homepage/course pages/layout globals, and keep the scientific course-practice review as a separate pending block before any commit, merge or publication.

## Current local state

- A complete initial identity package now exists as versionable source in `brand/`.
- `brand/01-auditoria-visual.md` audits `identidade_visual/`, the MGenética logo, the NEMO manual, fonts, slide models, project marks and current site styling.
- `brand/02-estrategia-de-marca.md` defines positioning, audiences, personality, voice, keywords, desired perception and differentiation.
- `brand/03-direcao-visual.md` defines the central concept, palettes, contrast rules, typography, icons, illustrations, scientific charts and correct/incorrect usage.
- `brand/04-design-system.md` defines color, type, spacing, border, shadow, radius and component tokens.
- `brand/05-guia-de-implementacao.md` explains how to apply the package across site, courses, consulting, posts, certificates, presentations and technical documents.
- `brand/06-aplicacoes-praticas.md` contains implementable HTML examples for hero, course card, consulting card, about section, CTAs, article feature, certificate and base layouts.
- `brand/preview.html` is an isolated visual preview that imports only `styles/brand-system.css`; it is not linked from navigation and is not part of the Quarto render list.
- New isolated CSS files were added in `styles/brand-tokens.css`, `styles/brand-system.css`, `styles/typography.css` and `styles/components.css`.
- The brand package is not yet imported into the active public pages.
- Current branch: `refactor/ux-minimalista-cursos`.
- No merge to `main` was performed.
- No commit, push or publication was performed.
- Homepage content was not edited in this UX-minimalista block; only global navigation changed through `_quarto.yml`.
- Study content is now centralized in `data/course-content.yml`.
- Expanded study prose is now centralized in `data/course-content-expansion.yml`.
- Rich worked examples, R labs and realistic quizzes for all 21 modules are now centralized in `data/course-practice.yml`.
- Glossary terms are now centralized in `data/glossary.yml`.
- `scripts/generate_undergrad_redesign.R` uses those files to generate module pages, R scripts, quizzes and the quick glossary data in `assets/js/interactives.js`.
- Each of the 21 thematic blocks now has a concise introduction, intuitive explanation, technical note, guided manual example, lab objective, lab observation, quiz focus and glossary terms.
- Each of the 21 thematic blocks now also has expanded sections: why the topic matters in animal breeding, how to think before the formula, mental steps, result interpretation and common mistake.
- Each generated module page now includes the markers `Termos para consultar no glossário`, `Passo guiado`, lab `Objetivo`, `Observe` and `Interpretação prática`.
- Each generated module page now also includes `Por que isso importa no melhoramento`, `Como pensar antes da fórmula`, `Passo a passo mental`, `Leitura do resultado` and `Erro comum`.
- Each generated R lab script now prints the module question, lab objective, observation cue and minimal R example.
- Each generated quiz now has 5 questions and pass mark 4.
- All 21 modules now have richer formula terms, commented manual calculations, expected results, decision prompts, concept-specific R labs and custom scientific quizzes.
- M16, M17 and M20 now include explicit simplification warnings so undergraduate examples are not confused with production genetic/genomic evaluation.
- M17 manual calculation was corrected to match the generated R lab: h² = 0.30, desvio = 20 and relative information = 1/8 produce EBV simplificado = 0.75.
- Generic fallback quiz wording was improved so old artificial distractors about site publication or tool use are gone.
- Glossary now includes additional technical terms such as valor genético, valor de acasalamento, acurácia, intensidade de seleção, intervalo de geração, efeito fixo, efeito aleatório, variância residual, BLUE, missing rate and validação cruzada.
- The validator now checks the new content source, expansion source, practice source, glossary source, rendered module content markers, all-module practice markers and exact quiz structure.
- Primary navbar/footer now omit `Roteiro` and `Glossário`.
- `modules/index.qmd` is now the course page.
- Global navigation labels this entry as `Curso`.
- `modules/index.qmd` now uses a minimal course layout: hero, progress/continue card, short about/skills text and 5 native expandable course modules.
- The course hero, progress card, module rows and final action were visually refined for better hierarchy and less raw feel.
- Each course module is a `course-module` details element.
- The 21 thematic blocks now appear as compact, polished `course-block-row` links, not cards.
- Each internal study page is titled `Bloco temático x.y`, with subtitle `Módulo n`.
- Internal study pages now disable sidebar, TOC and numbering.
- Internal study pages expose a `study-hero`, item list, sticky study toolbar and four linear `study-step` sections: leitura, exercício, laboratório R, interpretação/quiz.
- Internal study pages now place the study item list in a lateral `study-side-panel` inside `study-shell` on desktop; it stacks above content on mobile.
- Study page hero, toolbar, section spacing, lab block and navigation were refined for better reading rhythm.
- `semanas/index.qmd` was reduced to a compatibility page that points users back to the sequence inside the course page and no longer shows the full sidebar.
- `busca.qmd` is simplified around search plus return routes to Curso, Glossário and Avaliação and no longer shows the full sidebar.
- `glossario.qmd` remains as a simple standalone fallback, is no longer primary navigation and no longer shows the full sidebar.
- Every study page has a collapsible `Glossário rápido` using the existing `data-glossary` interactive hook plus a discrete `Glossário` quick link.
- Glossary access remains available but visually secondary.
- `Laboratório R` remains an item of study inside each thematic block.
- `assets/js/progress.js` now tracks local item completion for each thematic block and updates course progress/continue state.
- Validation contracts were updated in `data/site-manifest.yml` and `scripts/validate_site_manifest.R`.
- Light/dark styles were added for `course-minimal`, `course-module`, `course-block-row`, `study-hero`, `study-step`, `module-study-toolbar` and `module-glossary-fab`.
- Light/dark styles were refined for spacing, contrast, focus visibility, hover states and mobile comfort.
- New study layout styles were added for `study-shell`, `study-side-panel` and a compact lateral `study-item-panel`.
- Pre-existing unrelated untracked local files remain untouched: `.agents/`, `.vscode/`, `AUTOMATION_SITE.md`, `referências/`.

## Validation already completed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla scripts/run_all_modules.R`
- `node --check assets/js/progress.js`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`
- Rendered HTML scan confirmed:
  - no `Roteiro` or `Glossário` menu labels in rendered main pages;
  - `course-minimal-hero` exists in `docs/modules/index.html`;
  - 5 `course-module` elements exist in `docs/modules/index.html`;
  - 21 `course-block-row` links exist in `docs/modules/index.html`;
  - `course-progress-card` and `data-course-continue` exist in `docs/modules/index.html`;
  - `study-hero`, `study-step`, `module-study-toolbar`, `data-complete-item` and `data-next-study-link` exist in rendered M1 and M21;
  - `study-shell` and `study-side-panel` exist in rendered M1, M7 and M21;
  - `study-item` list renders without literal `:::` in `docs/modules/modulo01-*.html`;
  - `Roteiro agora está na página do curso` exists in `docs/semanas/index.html`;
  - `module-glossary-support`, `module-glossary-fab`, `Glossário rápido` and `data-glossary` exist in rendered M1 and M21;
  - no `module-card`, `thematic-block-card`, `module-session-plan`, `module-technical-scan`, `module-close-check`, sidebar navigation or raw `.qmd` links in sampled course/study pages;
  - no public `Avaliação da seção` copy in rendered course/support pages.
- Additional refinement scan confirmed the old heavy markers remain absent after the visual polish.
- After the lateral list change, full render/prepublish passed again and all 21 rendered module pages contain `study-shell` and `study-side-panel`.
- After the large UX block execution, full render/prepublish passed again. Rendered pages now include:
  - `course-hero-facts` on the course page;
  - 21 `course-block-action` row actions;
  - `study-side-hint` and initial `aria-current="step"` in all 21 module pages;
  - compact `support-actions` on Busca and Glossário;
  - Roteiro link to `#modulos-do-curso`, not the stale `#sequencia-de-estudo`.
- After the study content insertion block, full render/prepublish passed again. Rendered representative module pages now include:
  - glossary term lists from `data/course-content.yml`;
  - guided manual examples;
  - laboratory objective and observation prompts;
  - practical interpretation text;
  - glossary JavaScript data generated from `data/glossary.yml`.
- After the content expansion response, full render/prepublish passed again. Rendered M1, M7, M13 and M21 include:
  - why the topic matters;
  - how to think before formulas;
  - mental study steps;
  - result interpretation;
  - common mistake.
- After the scientific content upgrade, full render/prepublish passed again. Priority modules M1, M3, M7, M9, M10, M13 and M21 now include:
  - formula-term explanations;
  - commented manual calculation;
  - expected result;
  - decision prompt;
  - concept-specific R script with `INTERPRETACAO:`;
  - custom quiz with real conceptual distractors.
- After the all-module scientific content continuation, full render/prepublish passed again. All 21 modules now include:
  - formula-term explanations;
  - commented manual calculation;
  - expected result;
  - decision prompt;
  - concept-specific R script with `INTERPRETACAO:`;
  - custom quiz with real conceptual distractors.
- Additional content validation confirmed:
  - 84 rich practice marker hits in rendered source modules, equal to 4 markers across 21 modules;
  - 21 generated R scripts with `INTERPRETACAO:`;
  - old artificial quiz distractors remain absent from all quiz files;
  - full Quarto render generated 29 pages during `scripts/prepublish_site_check.R`.
- After the M16/M17/M20 scientific correction pass, full prepublish passed again.

## Recommended next review

1. Open the local rendered site and inspect:
   - `docs/modules/index.html`;
   - `docs/semanas/index.html`;
   - `docs/busca.html`;
   - `docs/glossario.html`;
   - M1, M7, M14, M18 and M21.
2. Review the new content source:
   - `data/course-content.yml`;
   - `data/course-content-expansion.yml`;
   - `data/course-practice.yml`;
   - `data/glossary.yml`;
   - `quizzes/quiz-01.json`, `quizzes/quiz-07.json`, `quizzes/quiz-13.json`, `quizzes/quiz-18.json` and `quizzes/quiz-21.json`.
3. Check mobile width for:
   - expandable module rows;
   - 21 compact block rows;
   - study item lists and sticky toolbar;
   - glossary panel inside modules;
   - R lab and quiz spacing.
4. Check whether the refined visual feel is sufficiently professional:
   - course page looks like a study product, not an index;
   - module rows have enough respiro;
   - `Estudar` row actions help without making rows heavy;
   - study pages read comfortably from section to section;
   - lateral item list helps orientation without competing with content;
   - glossary does not compete with the main action.
5. Check whether the all-module study content is technically correct and appropriate for graduação:
   - examples are simple enough;
   - R labs are useful but not too complex;
   - glossary terms are neither excessive nor missing essential terms;
   - quizzes test interpretation, not memorization only.
6. Review simplified scientific treatments before commit:
   - M16 uses a linear-model demonstration before mixed-model intuition;
   - M17 uses simplified shrinkage to introduce BLUP/model animal intuition, not production BLUP;
   - M20 uses a very small genomic matrix example, not production genomic evaluation;
   - confirm the warnings are clear enough without making the modules too heavy.
7. In GitKraken, compare `refactor/ux-minimalista-cursos` against `main`.
8. If approved, commit in small groups:
   - minimal course page;
   - simplified study pages;
   - content sources + generated modules/labs/quizzes;
   - styles + validators;
   - generated module/page outputs.
9. Publish only after explicit authorization.

## Robust plan for large UX work blocks

Use this plan when the user asks for a large course UX block. Keep work site-only, stay on `refactor/ux-minimalista-cursos` unless a new branch is explicitly requested, and never publish automatically.

### Cycle 1 — Visual audit

- Inspect rendered `docs/modules/index.html`, M1, M7, M14, M18, M21, `docs/busca.html`, `docs/glossario.html` and `docs/semanas/index.html`.
- Record only study-friction issues: confusing hierarchy, cramped areas, duplicate text, weak primary action, poor rhythm, mobile pressure, keyboard/focus gaps.
- Do not reorganize architecture unless user explicitly asks.

### Cycle 2 — Course page polish

- Refine hero, progress card, module expansion rows, block rows and primary actions.
- Keep 5 modules and 21 thematic blocks.
- Avoid card sprawl and decorative sections.
- Validate with targeted render and HTML marker scan.

### Cycle 3 — Study page polish

- Refine `study-hero`, `module-study-toolbar`, lateral `study-side-panel`, reading width, lab block, quiz block and previous/next navigation.
- Keep laboratory as item inside the block.
- Keep glossary accessible but secondary.
- Validate desktop/mobile HTML structure.

### Cycle 4 — Support pages

- Simplify Busca, Glossário and Roteiro compatibility page only where they reduce study friction.
- Avoid duplicating course path or full module explanations.
- Keep each support page with one clear job.

### Cycle 5 — Accessibility and mobile pass

- Check focus visibility, touch target size, contrast, heading order, labels, aria labels and keyboard route.
- Inspect code blocks, quizzes, glossary and module rows at narrow widths.
- Remove text or UI that competes with the study flow.

### Cycle 6 — Validation and documentation

- Regenerate course pages.
- Render representative pages.
- Run manifest validation, JS syntax check, R module scripts, `git diff --check` and prepublish check.
- Update `WORKLOG_SITE.md` and `NEXT_SITE.md`.
- Stop before commit, merge, push or publication unless explicitly authorized.

### Large-block success criteria

- Student can answer: where I am, what item I am studying, what is next, what is done, where glossary is, and how to continue.
- Course page feels like a study product, not an index.
- Study pages feel light, stable and readable.
- Mobile has no cramped toolbar, clipped buttons or unreadable code.
- No repeated pages, no duplicated explanations, no decorative blocks without study purpose.
- Homepage unchanged unless navigation breaks.

## Recommended commands

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla scripts/run_all_modules.R`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

## Criteria for completion before merge/publication

- Manual browser review confirms the course pages feel cleaner and study-first.
- Manual browser review confirms expanded content solves the "too summarized" issue without becoming dense or repetitive.
- Manual browser review confirms this refinement improves visual quality without changing the current hierarchy.
- Course progress/continue state works after marking study items and after passing quizzes.
- `aria-current="step"` follows the current item after progress interactions.
- Curso clearly works as the single entry point for study.
- Course page does not feel like an index of cards.
- Expandable modules feel polished, not raw.
- Study pages guide leitura -> exercício -> laboratório R -> quiz without sidebar distraction.
- Study pages have comfortable spacing on desktop and mobile.
- Roteiro compatibility page does not feel like a second duplicated course page.
- Glossário rápido helps during study without interrupting reading.
- Search and glossary support pages do not duplicate the course path.
- No app files are changed.
- No merge to `main`.
- No publication without explicit authorization.
