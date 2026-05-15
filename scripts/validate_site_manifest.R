#!/usr/bin/env Rscript

`%||%` <- function(x, y) {
  if (is.null(x) || length(x) == 0) y else x
}

fail <- function(message) {
  stop(message, call. = FALSE)
}

args <- commandArgs(trailingOnly = FALSE)
file_arg <- grep("^--file=", args, value = TRUE)
script_path <- if (length(file_arg)) sub("^--file=", "", file_arg[[1]]) else "scripts/validate_site_manifest.R"
repo_root <- normalizePath(file.path(dirname(script_path), ".."), mustWork = TRUE)
manifest_path <- file.path(repo_root, "data", "site-manifest.yml")

manifest <- yaml::read_yaml(manifest_path)
quarto <- yaml::read_yaml(file.path(repo_root, "_quarto.yml"))
course_content <- yaml::read_yaml(file.path(repo_root, "data", "course-content.yml"))$course_content
course_expansion <- yaml::read_yaml(file.path(repo_root, "data", "course-content-expansion.yml"))$course_content_expansion
course_practice <- yaml::read_yaml(file.path(repo_root, "data", "course-practice.yml"))$course_practice
glossary_data <- yaml::read_yaml(file.path(repo_root, "data", "glossary.yml"))$glossary
styles_text <- paste(
  readLines(file.path(repo_root, "styles", "main.scss"), warn = FALSE),
  readLines(file.path(repo_root, "styles", "main-dark.scss"), warn = FALSE),
  collapse = "\n"
)
body_extras_text <- paste(
  readLines(file.path(repo_root, "assets", "html", "body-extras.html"), warn = FALSE),
  collapse = "\n"
)
interactives_text <- paste(
  readLines(file.path(repo_root, "assets", "js", "interactives.js"), warn = FALSE),
  collapse = "\n"
)

check_file <- function(path, label) {
  full_path <- file.path(repo_root, path)
  if (!file.exists(full_path)) {
    fail(sprintf("%s references missing file: %s", label, path))
  }
  invisible(TRUE)
}

check_text <- function(text, needle, label) {
  if (is.null(needle) || !nzchar(needle)) fail(sprintf("%s is empty", label))
  if (!grepl(needle, text, fixed = TRUE)) {
    fail(sprintf("%s is missing from module index: %s", label, needle))
  }
}

check_contains <- function(text, needle, label) {
  if (!grepl(needle, text, fixed = TRUE)) {
    fail(sprintf("%s is missing required reference: %s", label, needle))
  }
}

check_integer_scalar <- function(value, label) {
  if (is.null(value) || length(value) != 1 || is.na(value) || value != as.integer(value)) {
    fail(sprintf("%s must be an integer scalar", label))
  }
  as.integer(value)
}

required_scalar <- function(item, field, label) {
  value <- item[[field]]
  if (is.null(value) || length(value) != 1 || is.na(value) || !nzchar(as.character(value))) {
    fail(sprintf("%s has missing or empty %s", label, field))
  }
  value
}

check_unique <- function(values, label) {
  duplicates <- unique(values[duplicated(values)])
  if (length(duplicates)) {
    fail(sprintf("%s has duplicated values: %s", label, paste(duplicates, collapse = ", ")))
  }
}

check_entry_link_labels <- function(path) {
  lines <- readLines(file.path(repo_root, path), warn = FALSE)
  entry_lines <- grep("\\{\\.entry-link|class=[\"'][^\"']*entry-link", lines)
  missing <- entry_lines[!grepl("aria-label\\s*=", lines[entry_lines])]
  if (length(missing)) {
    fail(sprintf(
      "%s has .entry-link without aria-label on line(s): %s",
      path,
      paste(missing, collapse = ", ")
    ))
  }
}

compare_nav_items <- function(actual, expected, label) {
  actual_hrefs <- vapply(actual, function(item) required_scalar(item, "href", label), character(1))
  actual_labels <- vapply(actual, function(item) required_scalar(item, "text", label), character(1))
  expected_hrefs <- vapply(expected, function(item) required_scalar(item, "href", label), character(1))
  expected_labels <- vapply(expected, function(item) required_scalar(item, "label", label), character(1))

  if (!identical(actual_hrefs, expected_hrefs)) {
    fail(sprintf("%s hrefs differ from site manifest", label))
  }
  if (!identical(actual_labels, expected_labels)) {
    fail(sprintf("%s labels differ from site manifest", label))
  }
}

allowed_statuses <- manifest$governance$statuses
if (is.null(allowed_statuses) || !length(allowed_statuses)) {
  fail("governance.statuses is empty")
}

required_governance <- c("navigation", "page_registry", "module_registry", "module_index_cards", "longform_content", "visual_system")
missing_governance <- setdiff(required_governance, names(manifest$governance$canonical_sources))
if (length(missing_governance)) {
  fail(sprintf("governance.canonical_sources missing: %s", paste(missing_governance, collapse = ", ")))
}

components_doc_path <- file.path(repo_root, "PUBLIC_SITE_COMPONENTS.md")
if (!file.exists(components_doc_path)) {
  fail("PUBLIC_SITE_COMPONENTS.md is missing")
}

components_doc <- paste(readLines(components_doc_path, warn = FALSE), collapse = "\n")
for (reference in c(
  "data/site-manifest.yml",
  ".qmd",
  "styles/main.scss",
  "styles/main-dark.scss",
  "assets/js/",
  "quizzes/",
  "## Page Patterns",
  "## Component Families",
  "## Responsive And Accessibility Rules",
  "## Maintenance Rules",
  "## Validation Contracts",
  "scripts/validate_site_manifest.R",
  "scripts/validate_deployed_site.R",
  "scripts/prepublish_site_check.R"
)) {
  check_contains(components_doc, reference, "PUBLIC_SITE_COMPONENTS.md")
}

for (class_name in c(
  ".hero",
  ".hero-panel-proof",
  ".page-hero",
  ".profile-hero",
  ".hero-learning-path",
  ".hero-action-note",
  ".hero-action-note-hint",
  ".public-wayfinding",
  ".public-wayfinding-grid",
  ".public-wayfinding-item",
  ".support-actions",
  ".home-wayfinding",
  ".public-session-check",
  ".public-session-check-grid",
  ".public-session-check-item",
  ".home-trust-anchors",
  ".home-first-session",
  ".home-output-standard",
  ".home-output-standard-grid",
  ".home-output-standard-item",
  ".home-path-contract",
  ".resource-grid",
  ".resource-card",
  ".entry-decision",
  ".home-audience",
  ".home-start-criteria",
  ".home-returning",
  ".home-evidence",
  ".home-readiness",
  ".home-continuity",
  ".home-outcome-map",
  ".modules-completion-flow",
  ".modules-wayfinding",
  ".modules-output-route",
  ".modules-output-route-grid",
  ".modules-output-route-item",
  ".modules-evidence-standard",
  ".modules-certificate-route",
  ".utility-examples",
  ".utility-query-plan",
  ".utility-evidence-route",
  ".utility-evidence-route-grid",
  ".utility-evidence-route-item",
  ".utility-wayfinding",
  ".utility-no-result",
  ".utility-result-close",
  ".utility-panel-hint",
  ".utility-decision",
  ".utility-session-check",
  ".route-finish-band",
  ".route-wayfinding",
  ".route-session-check",
  ".route-week-decision",
  ".route-session-plan",
  ".route-output-check",
  ".route-output-check-grid",
  ".route-output-check-item",
  ".route-start-today",
  ".route-session-split",
  ".route-evidence-ladder",
  ".route-recovery-plan",
  ".route-phase-handoff",
  ".route-weekly-output",
  ".route-table-guide",
  ".module-study-checkpoint",
  ".module-reading-rhythm",
  ".module-session-plan",
  ".module-session-plan-grid",
  ".module-session-plan-item",
  ".module-technical-scan",
  ".module-technical-scan-grid",
  ".module-technical-scan-item",
  ".module-script-lab",
  ".module-script-lab-grid",
  ".module-script-lab-item",
  ".module-evidence-path",
  ".module-practice-contract",
  ".module-takeaways",
  ".module-after-quiz",
  ".module-close-check",
  ".module-close-check-grid",
  ".module-close-check-item",
  ".module-return-note",
  ".module-nav",
  ".module-nav-card",
  ".certificate-preview",
  ".certificate-form",
  ".certificate-noscript",
  ".certificate-readiness-guide",
  ".certificate-scope",
  ".certificate-decision",
  ".certificate-evidence-review",
  ".certificate-evidence-review-grid",
  ".certificate-evidence-review-item",
  ".certificate-recovery",
  ".certificate-wayfinding",
  ".certificate-next-use",
  ".certificate-identity-note",
  ".certificate-final-check",
  ".certificate-session-check",
  ".certificate-pending-hint",
  ".certificate-progress-summary",
  "cert-next-pending-link",
  ".about-route",
  ".about-credibility",
  ".about-public-contract",
  ".about-editorial-boundary",
  ".about-wayfinding",
  ".about-visitor-path",
  ".section-cta",
  ".final-cta-hint",
  ".final-cta-checks",
  ".modules-next-step-hint",
  ".modules-next-step-checks",
  ".utility-next-step-copy",
  ".final-cta-actions"
)) {
  check_contains(components_doc, class_name, "PUBLIC_SITE_COMPONENTS.md")
  check_contains(styles_text, class_name, sprintf("styles for documented class %s", class_name))
}

if (!identical(quarto$project$type, "website")) fail("_quarto.yml project.type must be website")
if (!identical(quarto$project[["output-dir"]], "docs")) fail("_quarto.yml project.output-dir must be docs")
if (is.null(quarto$website[["site-url"]]) || !grepl("^https://mgenetica.github.io/?$", quarto$website[["site-url"]])) {
  fail("_quarto.yml website.site-url must point to the public GitHub Pages site")
}

for (resource in c("assets/", "data/modulo*_simulado.csv", "data/course-content.yml", "data/course-content-expansion.yml", "data/course-practice.yml", "data/glossary.yml", "data/site-manifest.yml", "images/", "quizzes/", "scripts/modulo*.R")) {
  if (!resource %in% quarto$project$resources) {
    fail(sprintf("_quarto.yml project.resources missing %s", resource))
  }
}

if (is.null(course_content$source_policy$summary) || !nzchar(course_content$source_policy$summary)) {
  fail("data/course-content.yml source_policy.summary is missing")
}
if (is.null(course_content$modules) || length(course_content$modules) != 21) {
  fail("data/course-content.yml must contain 21 module content records")
}
if (is.null(course_expansion$modules) || length(course_expansion$modules) != 21) {
  fail("data/course-content-expansion.yml must contain 21 module expansion records")
}
if (is.null(course_practice$priority_modules) || length(course_practice$priority_modules) < 7) {
  fail("data/course-practice.yml must declare at least 7 priority modules")
}
if (is.null(course_practice$modules) || length(course_practice$modules) < 7) {
  fail("data/course-practice.yml must contain at least 7 rich practice modules")
}
if (is.null(glossary_data) || length(glossary_data) < 30) {
  fail("data/glossary.yml must contain at least 30 glossary terms")
}
glossary_terms <- vapply(glossary_data, function(item) required_scalar(item, "term", "glossary term"), character(1))
glossary_definitions <- vapply(glossary_data, function(item) required_scalar(item, "definition", "glossary definition"), character(1))
check_unique(tolower(glossary_terms), "data/glossary.yml term")
if (any(nchar(glossary_definitions) < 20)) {
  fail("data/glossary.yml contains definitions that are too short")
}
for (term in c("Herdabilidade", "BLUP", "Predição genômica")) {
  check_contains(interactives_text, term, "assets/js/interactives.js glossary data")
}

check_contains(body_extras_text, 'class="skip-link"', "body-extras.html")
check_contains(body_extras_text, "progress.js", "body-extras.html")
check_contains(body_extras_text, "darkmode.js", "body-extras.html")
check_contains(body_extras_text, "var hasQuiz = document.querySelector('.quiz-container')", "body-extras.html")
check_contains(body_extras_text, "if (hasQuiz) files.push('teacher-mode.js', 'quiz.js')", "body-extras.html")
check_contains(body_extras_text, "[data-viz], [data-learning-map], [data-glossary], .mg-viz", "body-extras.html")
check_contains(body_extras_text, "['modules', 'semanas']", "body-extras.html")

pages <- manifest$content_pages$items
if (!length(pages)) fail("content_pages.items is empty")

valid_page_roles <- c("public-home", "collection-index", "study-plan", "utility", "reference", "institutional")
page_ids <- vapply(pages, function(page) required_scalar(page, "id", "page"), character(1))
page_hrefs <- vapply(pages, function(page) required_scalar(page, "href", paste0("page ", page$id)), character(1))

check_unique(page_ids, "content_pages.items.id")
check_unique(page_hrefs, "content_pages.items.href")

region_markers <- list(
  home = list(
    hero = "hero",
    "hero-panel-proof" = "hero-panel-proof",
    "hero-signal" = "hero-signal",
    "hero-action-note" = "hero-action-note",
    wayfinding = "home-wayfinding",
    "trust-anchors" = "home-trust-anchors",
    "first-session" = "home-first-session",
    "output-standard" = "home-output-standard",
    "path-contract" = "home-path-contract",
    orientation = "home-orientation",
    audience = "home-audience",
    "start-criteria" = "home-start-criteria",
    "module-anatomy" = "home-module-anatomy",
    "entry-decision" = "entry-decision",
    "entry-points" = "home-entry",
    returning = "home-returning",
    "platform-statement" = "platform-statement",
    discovery = "home-discovery",
    evidence = "home-evidence",
    "learning-loop" = "learning-loop-grid",
    "outcome-map" = "home-outcome-map",
    resources = "resource-grid",
    readiness = "home-readiness",
    continuity = "home-continuity",
    "phase-preview" = "phase-preview",
    "final-cta" = "home-final-cta"
  ),
  `modules-index` = list(
    hero = "course-minimal-hero",
    "course-progress" = "course-progress-card",
    "course-essentials" = "course-essentials",
    "course-module-list" = "course-module-list",
    "course-nav-tabs" = "course-nav-tabs",
    "course-about" = "course-about",
    "course-skills" = "course-skills",
    "course-info" = "course-info-strip",
    "study-sequence" = "course-study-sequence",
    "course-block" = "course-block",
    wayfinding = "modules-wayfinding",
    guidance = "modules-guidance",
    "output-route" = "modules-output-route",
    "completion-flow" = "modules-completion-flow",
    "evidence-standard" = "modules-evidence-standard",
    phases = "phase-grid",
    "module-grid" = "module-grid",
    "section-review" = "section-review",
    "certificate-route" = "course-final-action",
    "next-step" = "modules-next-step"
  ),
  `study-path` = list(
    hero = "page-hero",
    wayfinding = "route-wayfinding",
    "route-checkpoints" = "route-checkpoints",
    "route-overview" = "route-overview",
    "route-week-decision" = "route-week-decision",
    "route-start-today" = "route-start-today",
    "route-recovery-plan" = "route-recovery-plan",
    "route-session-plan" = "route-session-plan",
    "route-output-check" = "route-output-check",
    "route-session-split" = "route-session-split",
    "route-evidence-ladder" = "route-evidence-ladder",
    "route-phase-handoff" = "route-phase-handoff",
    "route-weekly-output" = "route-weekly-output",
    "route-map-intro" = "route-map-intro",
    "route-table-guide" = "route-table-guide",
    "section-review" = "section-review",
    routine = "routine-grid",
    "route-finish" = "route-finish-band",
    "session-check" = "route-session-check"
  ),
  search = list(
    hero = "page-hero",
    "utility-panel-hint" = "utility-panel-hint",
    "search-panel" = "search-panel",
    "support-actions" = "support-actions"
  ),
  glossary = list(
    hero = "page-hero",
    "utility-panel-hint" = "utility-panel-hint",
    "glossary-panel" = "glossary-panel",
    "support-actions" = "support-actions"
  ),
  certificate = list(
    hero = "page-hero",
    wayfinding = "certificate-wayfinding",
    "certificate-intro" = "certificate-intro",
    "certificate-scope" = "certificate-scope",
    "certificate-readiness" = "certificate-readiness-guide",
    "certificate-assessment-callout" = "certificate-assessment-callout",
    "certificate-decision" = "certificate-decision",
    "certificate-evidence-review" = "certificate-evidence-review",
    "certificate-recovery" = "certificate-recovery",
    "certificate-next-use" = "certificate-next-use",
    "certificate-identity" = "certificate-identity-note",
    "certificate-final-check" = "certificate-final-check",
    "session-check" = "certificate-session-check",
    "certificate-preview" = "certificate-preview",
    "certificate-form" = "certificate-form",
    "certificate-noscript" = "certificate-noscript",
    "certificate-gate" = "cert-gate"
  ),
  about = list(
    hero = "profile-hero",
    wayfinding = "about-wayfinding",
    "public-page-triad" = "public-page-triad",
    "about-route" = "about-route",
    credibility = "about-credibility",
    "public-contract" = "about-public-contract",
    "editorial-boundary" = "about-editorial-boundary",
    "visitor-path" = "about-visitor-path",
    principles = "Princípios",
    "site-map" = "site-map-grid",
    "about-next-step" = "about-next-step"
  ),
  assessment = list(
    hero = "page-hero",
    "certificate-assessment-overview" = "certificate-assessment-overview",
    "certificate-assessment-lab" = "certificate-assessment-lab",
    "certificate-assessment-rubric" = "certificate-assessment-rubric",
    "certificate-assessment-flow" = "certificate-assessment-flow"
  )
)

for (page in pages) {
  required_scalar(page, "title", paste0("page ", page$id))
  check_file(page$href, paste0("page ", page$id))
  if (!required_scalar(page, "status", paste0("page ", page$id)) %in% allowed_statuses) {
    fail(sprintf("page %s has invalid status", page$id))
  }
  if (!required_scalar(page, "role", paste0("page ", page$id)) %in% valid_page_roles) {
    fail(sprintf("page %s has invalid role", page$id))
  }
  if (!is.null(page$editable_regions)) {
    page_text <- paste(readLines(file.path(repo_root, page$href), warn = FALSE), collapse = "\n")
    markers <- region_markers[[page$id]]
    if (is.null(markers)) {
      fail(sprintf("page %s declares editable_regions but has no validator markers", page$id))
    }
    for (region in page$editable_regions) {
      marker <- markers[[region]]
      if (is.null(marker)) {
        fail(sprintf("page %s editable region has no marker mapping: %s", page$id, region))
      }
      if (!grepl(marker, page_text, fixed = TRUE)) {
        fail(sprintf("page %s is missing editable region marker %s (%s)", page$id, region, marker))
      }
    }
  }
}

primary_nav <- manifest$navigation$primary
footer_nav <- manifest$navigation$footer

check_unique(vapply(primary_nav, function(item) required_scalar(item, "id", "primary navigation item"), character(1)), "navigation.primary.id")
check_unique(vapply(footer_nav, function(item) required_scalar(item, "id", "footer navigation item"), character(1)), "navigation.footer.id")
check_unique(vapply(primary_nav, function(item) required_scalar(item, "href", paste0("primary navigation ", item$id)), character(1)), "navigation.primary.href")
check_unique(vapply(footer_nav, function(item) required_scalar(item, "href", paste0("footer navigation ", item$id)), character(1)), "navigation.footer.href")

nav_items <- c(primary_nav, footer_nav)
for (item in nav_items) {
  href <- required_scalar(item, "href", paste0("navigation ", item$id))
  required_scalar(item, "label", paste0("navigation ", item$id))
  if (grepl("^https?://", href)) next
  if (!href %in% page_hrefs) {
    fail(sprintf("navigation item %s references unregistered page: %s", item$id, href))
  }
}

for (item in primary_nav) {
  required_scalar(item, "type", paste0("primary navigation ", item$id))
}

compare_nav_items(quarto$website$navbar$left, primary_nav, "_quarto.yml navbar.left")
compare_nav_items(quarto$website[["page-footer"]]$center, footer_nav, "_quarto.yml page-footer.center")

if (is.null(manifest$navigation$cta)) {
  fail("navigation.cta is missing")
}
nav_cta <- manifest$navigation$cta
invisible(required_scalar(nav_cta, "id", "navigation.cta"))
invisible(required_scalar(nav_cta, "label", "navigation.cta"))
invisible(required_scalar(nav_cta, "href", "navigation.cta"))
invisible(required_scalar(nav_cta, "type", "navigation.cta"))
if (length(quarto$website$navbar$right) != 1) {
  fail("_quarto.yml navbar.right must contain exactly one journey CTA")
}
navbar_cta <- quarto$website$navbar$right[[1]]
if (!identical(required_scalar(navbar_cta, "href", "_quarto.yml navbar.right"), nav_cta$href)) {
  fail("_quarto.yml navbar.right href differs from navigation.cta")
}
if (!identical(required_scalar(navbar_cta, "text", "_quarto.yml navbar.right"), nav_cta$label)) {
  fail("_quarto.yml navbar.right label differs from navigation.cta")
}
check_file(nav_cta$href, "navigation.cta")

modules <- manifest$content_collections$modules$items
if (length(modules) != 21) {
  fail(sprintf("expected 21 modules, found %s", length(modules)))
}

module_index_path <- manifest$content_collections$modules$index
check_file(module_index_path, "module collection index")
module_index_text <- paste(readLines(file.path(repo_root, module_index_path), warn = FALSE), collapse = "\n")

ids <- vapply(modules, function(item) item$id, character(1))
orders <- vapply(modules, function(item) item$order, numeric(1))
module_hrefs <- vapply(modules, function(item) required_scalar(item, "href", paste0("module ", item$id)), character(1))
module_scripts <- vapply(modules, function(item) required_scalar(item, "script", paste0("module ", item$id)), character(1))
module_quizzes <- vapply(modules, function(item) required_scalar(item, "quiz", paste0("module ", item$id)), character(1))
for (path in unique(c(page_hrefs, module_hrefs, module_index_path))) {
  check_entry_link_labels(path)
}
sidebar_sections <- quarto$website$sidebar$contents
if (length(sidebar_sections) != 1 || !identical(sidebar_sections[[1]]$section, "Curso")) {
  fail("_quarto.yml sidebar must contain one Curso section")
}
expected_sidebar <- c(module_index_path, module_hrefs)
if (!identical(sidebar_sections[[1]]$contents, expected_sidebar)) {
  fail("_quarto.yml sidebar module contents differ from site manifest")
}

if (anyDuplicated(ids)) fail("duplicated module ids in manifest")
check_unique(module_hrefs, "module hrefs")
check_unique(module_scripts, "module scripts")
check_unique(module_quizzes, "module quizzes")
if (!all(orders == seq_along(orders))) fail("module order must be sequential from 1")

expected_content_ids <- sprintf("M%d", seq_along(modules))
content_ids <- names(course_content$modules)
if (!setequal(content_ids, expected_content_ids)) {
  fail(sprintf(
    "data/course-content.yml module ids must match M1-M21. Found: %s",
    paste(content_ids, collapse = ", ")
  ))
}

required_content_fields <- c(
  "intro",
  "core_explanation",
  "technical_note",
  "worked_example",
  "lab_objective",
  "lab_observe",
  "quiz_focus",
  "glossary_terms"
)
required_expansion_fields <- c(
  "why_it_matters",
  "intuition_expansion",
  "study_steps",
  "example_interpretation",
  "common_mistake"
)
for (content_id in expected_content_ids) {
  content <- course_content$modules[[content_id]]
  missing_fields <- setdiff(required_content_fields, names(content))
  if (length(missing_fields)) {
    fail(sprintf("data/course-content.yml %s missing fields: %s", content_id, paste(missing_fields, collapse = ", ")))
  }
  for (field in setdiff(required_content_fields, "glossary_terms")) {
    required_scalar(content, field, sprintf("content %s", content_id))
  }
  if (length(content$glossary_terms) < 3) {
    fail(sprintf("data/course-content.yml %s must have at least 3 glossary terms", content_id))
  }

  expansion <- course_expansion$modules[[content_id]]
  missing_expansion_fields <- setdiff(required_expansion_fields, names(expansion))
  if (length(missing_expansion_fields)) {
    fail(sprintf("data/course-content-expansion.yml %s missing fields: %s", content_id, paste(missing_expansion_fields, collapse = ", ")))
  }
  for (field in setdiff(required_expansion_fields, "study_steps")) {
    value <- required_scalar(expansion, field, sprintf("content expansion %s", content_id))
    min_chars <- if (identical(field, "common_mistake")) 45 else 80
    if (nchar(value) < min_chars) {
      fail(sprintf("data/course-content-expansion.yml %s %s is too short", content_id, field))
    }
  }
  if (length(expansion$study_steps) < 4) {
    fail(sprintf("data/course-content-expansion.yml %s must have at least 4 study steps", content_id))
  }
}

required_practice_fields <- c(
  "formula_terms",
  "manual_walkthrough",
  "manual_result",
  "r_preview",
  "lab_interpretation",
  "decision_prompt",
  "lab_code",
  "quiz_questions"
)
for (practice_id in course_practice$priority_modules) {
  if (!practice_id %in% expected_content_ids) {
    fail(sprintf("data/course-practice.yml unknown priority module: %s", practice_id))
  }
  practice <- course_practice$modules[[practice_id]]
  missing_practice_fields <- setdiff(required_practice_fields, names(practice))
  if (length(missing_practice_fields)) {
    fail(sprintf("data/course-practice.yml %s missing fields: %s", practice_id, paste(missing_practice_fields, collapse = ", ")))
  }
  if (length(practice$formula_terms) < 3) {
    fail(sprintf("data/course-practice.yml %s must have at least 3 formula terms", practice_id))
  }
  if (length(practice$manual_walkthrough) < 2) {
    fail(sprintf("data/course-practice.yml %s must have at least 2 manual walkthrough paragraphs", practice_id))
  }
  for (field in c("manual_result", "r_preview", "lab_interpretation", "decision_prompt", "lab_code")) {
    required_scalar(practice, field, sprintf("practice %s", practice_id))
  }
  if (length(practice$quiz_questions) != 5) {
    fail(sprintf("data/course-practice.yml %s must have exactly 5 quiz questions", practice_id))
  }
  for (question_index in seq_along(practice$quiz_questions)) {
    question <- practice$quiz_questions[[question_index]]
    label <- sprintf("data/course-practice.yml %s quiz question %s", practice_id, question_index)
    required_scalar(question, "text", label)
    if (is.null(question$options) || length(question$options) < 3) {
      fail(sprintf("%s must have at least 3 options", label))
    }
    check_integer_scalar(question$correct, sprintf("%s correct", label))
  }
}

for (i in seq_along(modules)) {
  item <- modules[[i]]
  for (field in c("id", "title", "card_title", "card_summary", "phase_id", "status", "href", "script", "quiz")) {
    required_scalar(item, field, sprintf("module %s", item$id %||% i))
  }
  if (!item$status %in% allowed_statuses) {
    fail(sprintf("module %s has invalid status", item$id))
  }
  check_file(item$href, paste0("module ", item$id))
  check_file(item$script, paste0("module script ", item$id))
  check_file(item$quiz, paste0("module quiz ", item$id))

  module_text <- paste(readLines(file.path(repo_root, item$href), warn = FALSE), collapse = "\n")
  module_number <- sprintf("%02d", item$order)
  if (!grepl("module-orientation", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing module-orientation", item$id))
  }
  if (!grepl("study-hero", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing study-hero", item$id))
  }
  if (!grepl("module-study-toolbar", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing module-study-toolbar", item$id))
  }
  if (!grepl("study-shell", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing study-shell layout", item$id))
  }
  if (!grepl("study-side-panel", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing lateral study item list", item$id))
  }
  if (!grepl("study-side-hint", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing lateral study item hint", item$id))
  }
  if (!grepl('aria-current="step"', module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing initial aria-current step", item$id))
  }
  if (!grepl("study-step", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing study-step sections", item$id))
  }
  if (!grepl("module-script-lab", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing module-script-lab", item$id))
  }
  if (!grepl("module-glossary-support", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing module-glossary-support", item$id))
  }
  if (!grepl("data-glossary", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing glossary hook", item$id))
  }
  if (!grepl(item$script, module_text, fixed = TRUE)) {
    fail(sprintf("module %s script lab does not link to %s", item$id, item$script))
  }
  csv_path <- sprintf("data/modulo%02d_simulado.csv", item$order)
  if (!grepl(csv_path, module_text, fixed = TRUE)) {
    fail(sprintf("module %s script lab does not link to %s", item$id, csv_path))
  }
  if (!grepl("module-nav-index", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing module-nav-index", item$id))
  }
  if (!grepl('<nav class="module-nav" aria-label="Navegação entre blocos temáticos">', module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing semantic thematic block navigation", item$id))
  }
  if (!grepl(sprintf('quiz-container data-module="%s"', module_number), module_text, fixed = TRUE)) {
    fail(sprintf("module %s quiz data-module does not match order", item$id))
  }
  if (!grepl("Interpretação e quiz", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing interpretation and quiz step", item$id))
  }
  content_label <- sprintf("M%s", i)
  if (content_label %in% course_practice$priority_modules) {
    for (marker in c("Termos da fórmula", "Cálculo comentado", "Resultado esperado", "Decisão guiada")) {
      if (!grepl(marker, module_text, fixed = TRUE)) {
        fail(sprintf("module %s is missing rich practice marker: %s", item$id, marker))
      }
    }
    script_text <- paste(readLines(file.path(repo_root, item$script), warn = FALSE), collapse = "\n")
    if (!grepl("INTERPRETACAO:", script_text, fixed = TRUE)) {
      fail(sprintf("module %s rich lab script is missing INTERPRETACAO", item$id))
    }
  }
  for (marker in c(
    "Termos para consultar no glossário",
    "Por que isso importa no melhoramento",
    "Como pensar antes da fórmula",
    "Passo a passo mental:",
    "Passo guiado:",
    "Leitura do resultado:",
    "Erro comum:",
    "Objetivo:",
    "**Observe:**",
    "Interpretação prática:"
  )) {
    if (!grepl(marker, module_text, fixed = TRUE)) {
      fail(sprintf("module %s is missing generated study content marker: %s", item$id, marker))
    }
  }
  if (!identical(item$quiz, sprintf("quizzes/quiz-%s.json", module_number))) {
    fail(sprintf("module %s quiz path does not match order", item$id))
  }

  quiz <- tryCatch(
    jsonlite::fromJSON(file.path(repo_root, item$quiz), simplifyVector = FALSE),
    error = function(err) fail(sprintf("module %s quiz JSON is invalid: %s", item$id, conditionMessage(err)))
  )
  if (!identical(quiz$module, module_number)) {
    fail(sprintf("module %s quiz module id should be %s", item$id, module_number))
  }
  required_scalar(quiz, "title", sprintf("module %s quiz", item$id))
  required_scalar(quiz, "subtitle", sprintf("module %s quiz", item$id))
  if (is.null(quiz$questions) || !is.list(quiz$questions) || length(quiz$questions) != 5) {
    fail(sprintf("module %s quiz must contain exactly 5 questions", item$id))
  }
  pass_mark <- check_integer_scalar(quiz$passMark, sprintf("module %s quiz passMark", item$id))
  if (pass_mark < 1 || pass_mark > length(quiz$questions)) {
    fail(sprintf("module %s quiz passMark must be between 1 and question count", item$id))
  }
  for (question_index in seq_along(quiz$questions)) {
    question <- quiz$questions[[question_index]]
    question_label <- sprintf("module %s quiz question %s", item$id, question_index)
    required_scalar(question, "text", question_label)
    if (is.null(question$options) || !is.character(unlist(question$options, use.names = FALSE)) || length(question$options) < 2) {
      fail(sprintf("%s must contain at least two text options", question_label))
    }
    options <- unlist(question$options, use.names = FALSE)
    if (any(!nzchar(options))) {
      fail(sprintf("%s contains an empty option", question_label))
    }
    correct <- check_integer_scalar(question$correct, sprintf("%s correct", question_label))
    if (correct < 0 || correct >= length(options)) {
      fail(sprintf("%s correct index is outside options", question_label))
    }
  }

  expected_previous <- if (i == 1) NULL else ids[[i - 1]]
  expected_next <- if (i == length(modules)) "certificate" else ids[[i + 1]]

  if (!identical(item[["previous"]], expected_previous)) {
    fail(sprintf("module %s previous should be %s", item$id, expected_previous %||% "null"))
  }
  if (!identical(item[["next"]], expected_next)) {
    fail(sprintf("module %s next should be %s", item$id, expected_next))
  }
}

for (phase_start_id in c("modulo01", "modulo03", "modulo06", "modulo13", "modulo18")) {
  module_index <- match(phase_start_id, ids)
  if (is.na(module_index)) {
    fail(sprintf("phase start module is missing from manifest: %s", phase_start_id))
  }
  module_text <- paste(readLines(file.path(repo_root, modules[[module_index]]$href), warn = FALSE), collapse = "\n")
  if (!grepl("study-hero", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing study-hero", phase_start_id))
  }
}

phase_ids <- vapply(manifest$content_collections$modules$phases, function(item) item$id, character(1))
if (anyDuplicated(phase_ids)) fail("duplicated phase ids in manifest")

phase_orders <- vapply(manifest$content_collections$modules$phases, function(item) item$order, numeric(1))
if (!all(phase_orders == seq_along(phase_orders))) fail("phase order must be sequential from 1")

for (phase in manifest$content_collections$modules$phases) {
  if (is.null(phase$summary) || !nzchar(phase$summary)) {
    fail(sprintf("phase %s has no summary", phase$id))
  }
  if (is.null(phase$index_summary) || !nzchar(phase$index_summary)) {
    fail(sprintf("phase %s has no index_summary", phase$id))
  }
  check_text(module_index_text, phase$label, sprintf("phase %s label", phase$id))
  check_text(module_index_text, phase$summary, sprintf("phase %s summary", phase$id))

  missing <- setdiff(phase$modules, ids)
  if (length(missing)) {
    fail(sprintf("phase %s references unknown modules: %s", phase$id, paste(missing, collapse = ", ")))
  }
}

phase_modules <- unlist(lapply(manifest$content_collections$modules$phases, function(phase) {
  stats::setNames(rep(phase$id, length(phase$modules)), phase$modules)
}), use.names = TRUE)

for (item in modules) {
  if (is.null(item$phase_id) || !item$phase_id %in% phase_ids) {
    fail(sprintf("module %s has invalid phase_id", item$id))
  }
  if (!identical(phase_modules[[item$id]], item$phase_id)) {
    fail(sprintf("module %s phase_id does not match phase.modules", item$id))
  }
  theme_number <- sub("^Bloco temático ([0-9.]+).*", "\\1", item$card_title)
  check_text(module_index_text, sprintf('class="course-block-index">%s</span>', theme_number), sprintf("module %s thematic block order", item$id))
  check_text(module_index_text, sprintf('href="%s"', basename(sub("\\.qmd$", ".html", item$href))), sprintf("module %s row link", item$id))
  check_text(module_index_text, sprintf("<strong>%s</strong>", item$title), sprintf("module %s title", item$id))
  check_text(module_index_text, item$card_summary, sprintf("module %s card_summary", item$id))
  check_text(module_index_text, '<span class="course-block-action">Estudar</span>', sprintf("module %s row action", item$id))
}

cat("site manifest ok\n")
