#!/usr/bin/env Rscript

args <- commandArgs(trailingOnly = TRUE)
config_path <- if (length(args) >= 1) args[[1]] else "templates/jp-data-cycle/config/example.dataset.yml"

source("templates/jp-data-cycle/R/consolidate_outputs.R")

result <- consolidate_outputs(config_path)

cat("consolidate_outputs_ok\n")
cat("manifest=", result$path, "\n", sep = "")
cat("rows=", result$rows, "\n", sep = "")
cat("total_bytes=", result$total_bytes, "\n", sep = "")
