source("templates/jp-data-cycle/R/paths.R")

file_size <- function(path) {
  info <- file.info(path)
  ifelse(is.na(info$size), 0, info$size)
}

consolidate_outputs <- function(config_path) {
  config <- read_simple_config(config_path)
  outputs_dir <- config$outputs_dir
  if (is.null(outputs_dir) || !dir.exists(outputs_dir)) {
    stop("outputs_dir ausente ou inexistente: ", outputs_dir)
  }

  files <- list.files(outputs_dir, recursive = TRUE, full.names = TRUE)
  files <- files[file.exists(files)]

  manifest <- data.frame(
    path = files,
    relative_path = sub(paste0("^", normalizePath(outputs_dir, mustWork = TRUE), "/?"), "", normalizePath(files, mustWork = FALSE)),
    extension = tolower(tools::file_ext(files)),
    size_bytes = vapply(files, file_size, numeric(1)),
    stringsAsFactors = FALSE
  )

  manifest_dir <- ensure_dir(file.path(outputs_dir, "_manifest"))
  out_path <- file.path(manifest_dir, "output_manifest.tsv")
  write.table(manifest, out_path, sep = "\t", row.names = FALSE, quote = FALSE)

  list(path = out_path, rows = nrow(manifest), total_bytes = sum(manifest$size_bytes))
}
