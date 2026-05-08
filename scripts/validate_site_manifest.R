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
styles_text <- paste(
  readLines(file.path(repo_root, "styles", "main.scss"), warn = FALSE),
  readLines(file.path(repo_root, "styles", "main-dark.scss"), warn = FALSE),
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
  "## Page Patterns",
  "## Component Families",
  "## Responsive And Accessibility Rules",
  "## Maintenance Rules"
)) {
  check_contains(components_doc, reference, "PUBLIC_SITE_COMPONENTS.md")
}

for (class_name in c(
  ".hero",
  ".page-hero",
  ".profile-hero",
  ".module-nav",
  ".module-nav-card",
  ".section-cta",
  ".final-cta-actions"
)) {
  check_contains(components_doc, class_name, "PUBLIC_SITE_COMPONENTS.md")
  check_contains(styles_text, class_name, sprintf("styles for documented class %s", class_name))
}

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
    "entry-points" = "home-entry",
    "platform-statement" = "platform-statement",
    "phase-preview" = "phase-preview",
    "final-cta" = "home-final-cta"
  ),
  `study-path` = list(
    hero = "page-hero",
    "route-checkpoints" = "route-checkpoints",
    routine = "routine-grid"
  ),
  search = list(
    hero = "page-hero",
    "utility-flow" = "utility-flow",
    "search-panel" = "search-panel"
  ),
  glossary = list(
    hero = "page-hero",
    "utility-flow" = "utility-flow",
    "glossary-panel" = "glossary-panel"
  ),
  about = list(
    hero = "profile-hero",
    "public-page-triad" = "public-page-triad",
    principles = "Princípios"
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
  if (!href %in% page_hrefs) {
    fail(sprintf("navigation item %s references unregistered page: %s", item$id, href))
  }
}

for (item in primary_nav) {
  required_scalar(item, "type", paste0("primary navigation ", item$id))
}

modules <- manifest$content_collections$modules$items
if (length(modules) != 12) {
  fail(sprintf("expected 12 modules, found %s", length(modules)))
}

module_index_path <- manifest$content_collections$modules$index
check_file(module_index_path, "module collection index")
module_index_text <- paste(readLines(file.path(repo_root, module_index_path), warn = FALSE), collapse = "\n")

ids <- vapply(modules, function(item) item$id, character(1))
orders <- vapply(modules, function(item) item$order, numeric(1))
module_hrefs <- vapply(modules, function(item) required_scalar(item, "href", paste0("module ", item$id)), character(1))
module_scripts <- vapply(modules, function(item) required_scalar(item, "script", paste0("module ", item$id)), character(1))

if (anyDuplicated(ids)) fail("duplicated module ids in manifest")
check_unique(module_hrefs, "module hrefs")
check_unique(module_scripts, "module scripts")
if (!all(orders == seq_along(orders))) fail("module order must be sequential from 1")

for (i in seq_along(modules)) {
  item <- modules[[i]]
  for (field in c("id", "title", "card_title", "card_summary", "phase_id", "status", "href", "script")) {
    required_scalar(item, field, sprintf("module %s", item$id %||% i))
  }
  if (!item$status %in% allowed_statuses) {
    fail(sprintf("module %s has invalid status", item$id))
  }
  check_file(item$href, paste0("module ", item$id))
  check_file(item$script, paste0("module script ", item$id))

  module_text <- paste(readLines(file.path(repo_root, item$href), warn = FALSE), collapse = "\n")
  if (!grepl("module-orientation", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing module-orientation", item$id))
  }
  if (!grepl("module-nav-index", module_text, fixed = TRUE)) {
    fail(sprintf("module %s is missing module-nav-index", item$id))
  }
  if (!grepl(sprintf('quiz-container data-module="%02d"', item$order), module_text, fixed = TRUE)) {
    fail(sprintf("module %s quiz data-module does not match order", item$id))
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
  check_text(module_index_text, sprintf("%02d · %s", phase$order, phase$label), sprintf("phase %s label", phase$id))
  check_text(module_index_text, phase$index_summary, sprintf("phase %s index_summary", phase$id))

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
  check_text(module_index_text, sprintf("**%02d**", item$order), sprintf("module %s order", item$id))
  check_text(module_index_text, sprintf("[%s](%s)", item$card_title, basename(item$href)), sprintf("module %s card link", item$id))
  check_text(module_index_text, item$card_summary, sprintf("module %s card_summary", item$id))
}

cat("site manifest ok\n")
