#!/usr/bin/env Rscript

args <- commandArgs(trailingOnly = TRUE)
config_path <- if (length(args) >= 1) args[[1]] else "templates/jp-data-cycle/config/example.dataset.yml"

source("templates/jp-data-cycle/R/validate_dataset.R")

result <- validate_dataset(config_path)

cat("validate_dataset_ok=", result$ok, "\n", sep = "")
cat("project_id=", result$project_id, "\n", sep = "")
cat("missing_required=", paste(result$missing_required, collapse = ","), "\n", sep = "")
cat("dirs_checked=", nrow(result$dir_status), "\n", sep = "")

if (!result$ok) {
  print(result$dir_status)
  quit(status = 1)
}
