read_simple_config <- function(path) {
  if (!file.exists(path)) {
    stop("Config nao encontrado: ", path)
  }

  lines <- readLines(path, warn = FALSE)
  lines <- trimws(lines)
  lines <- lines[nzchar(lines)]
  lines <- lines[!grepl("^#", lines)]
  lines <- lines[grepl(":", lines, fixed = TRUE)]

  keys <- trimws(sub(":.*$", "", lines))
  values <- trimws(sub("^[^:]+:", "", lines))
  values <- gsub("^['\"]|['\"]$", "", values)
  stats::setNames(as.list(values), keys)
}

project_path <- function(config, key, ...) {
  base <- config[[key]]
  if (is.null(base) || !nzchar(base)) {
    stop("Chave ausente no config: ", key)
  }
  file.path(base, ...)
}

ensure_dir <- function(path) {
  dir.create(path, recursive = TRUE, showWarnings = FALSE)
  path
}
