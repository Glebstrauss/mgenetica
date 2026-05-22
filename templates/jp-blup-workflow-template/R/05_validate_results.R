validate_results <- function(config, root = getwd()) {
  outputs_dir <- path_from_config(config, "outputs_dir", root)
  required <- c(
    file.path(outputs_dir, "tables", "breeding_values.tsv"),
    file.path(outputs_dir, "tables", "variance_components.tsv"),
    file.path(outputs_dir, "manifest.tsv"),
    file.path(outputs_dir, "REPORT.md")
  )
  exists <- file.exists(required)
  sizes <- ifelse(exists, file.info(required)$size, 0)

  status <- data.frame(
    path = required,
    exists = exists,
    size_bytes = sizes,
    stringsAsFactors = FALSE
  )
  write_tsv(status, file.path(outputs_dir, "validation.tsv"))

  if (!all(status$exists) || any(status$size_bytes <= 0)) {
    print(status)
    stop("Validacao falhou: saidas ausentes ou vazias")
  }

  status
}
