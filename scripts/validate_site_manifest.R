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

check_file <- function(path, label) {
  full_path <- file.path(repo_root, path)
  if (!file.exists(full_path)) {
    fail(sprintf("%s references missing file: %s", label, path))
  }
  invisible(TRUE)
}

pages <- manifest$content_pages$items
if (!length(pages)) fail("content_pages.items is empty")

for (page in pages) {
  check_file(page$href, paste0("page ", page$id))
  if (is.null(page$status)) fail(sprintf("page %s has no status", page$id))
}

modules <- manifest$content_collections$modules$items
if (length(modules) != 12) {
  fail(sprintf("expected 12 modules, found %s", length(modules)))
}

ids <- vapply(modules, function(item) item$id, character(1))
orders <- vapply(modules, function(item) item$order, numeric(1))

if (anyDuplicated(ids)) fail("duplicated module ids in manifest")
if (!all(orders == seq_along(orders))) fail("module order must be sequential from 1")

for (i in seq_along(modules)) {
  item <- modules[[i]]
  check_file(item$href, paste0("module ", item$id))
  check_file(item$script, paste0("module script ", item$id))

  module_text <- paste(readLines(file.path(repo_root, item$href), warn = FALSE), collapse = "\n")
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

for (phase in manifest$content_collections$modules$phases) {
  if (is.null(phase$summary) || !nzchar(phase$summary)) {
    fail(sprintf("phase %s has no summary", phase$id))
  }
  missing <- setdiff(phase$modules, ids)
  if (length(missing)) {
    fail(sprintf("phase %s references unknown modules: %s", phase$id, paste(missing, collapse = ", ")))
  }
}

cat("site manifest ok\n")
