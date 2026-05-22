read_simple_config <- function(path) {
  if (!file.exists(path)) stop("Config nao encontrado: ", path)
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

path_from_config <- function(config, key, root = getwd()) {
  value <- config[[key]]
  if (is.null(value) || !nzchar(value)) stop("Chave ausente no config: ", key)
  if (grepl("^/", value)) value else file.path(root, value)
}

ensure_dir <- function(path) {
  dir.create(path, recursive = TRUE, showWarnings = FALSE)
  path
}

write_tsv <- function(x, path) {
  ensure_dir(dirname(path))
  write.table(x, path, sep = "\t", row.names = FALSE, quote = FALSE)
}

read_tsv <- function(path) {
  read.delim(path, stringsAsFactors = FALSE, check.names = FALSE)
}

required_columns <- function(data, cols, label) {
  missing <- setdiff(cols, names(data))
  if (length(missing) > 0) stop(label, " sem colunas: ", paste(missing, collapse = ", "))
}

template_root_from_script <- function() {
  args <- commandArgs(FALSE)
  file_arg <- args[grep("^--file=", args)]
  if (length(file_arg) == 0) return(getwd())
  script_path <- normalizePath(sub("^--file=", "", file_arg[[1]]), mustWork = TRUE)
  normalizePath(file.path(dirname(script_path), ".."), mustWork = TRUE)
}
