#!/usr/bin/env Rscript

launch_dir <- getwd()
root <- local({
  args <- commandArgs(FALSE)
  file_arg <- args[grep("^--file=", args)]
  if (length(file_arg) == 0) getwd() else normalizePath(file.path(dirname(sub("^--file=", "", file_arg[[1]])), ".."), mustWork = TRUE)
})
setwd(root)

args <- commandArgs(trailingOnly = TRUE)
config_path <- if (length(args) >= 1) args[[1]] else "config/example.workflow.yml"
if (!grepl("^/", config_path) && file.exists(file.path(launch_dir, config_path))) {
  config_path <- file.path(launch_dir, config_path)
} else if (!grepl("^/", config_path) && !file.exists(config_path)) {
  config_path <- file.path(root, config_path)
}
config_path <- normalizePath(config_path, mustWork = TRUE)

source("R/common.R")
source("R/01_prepare_inputs.R")
source("R/02_write_parameters.R")
source("R/03_run_engine.R")
source("R/04_parse_results.R")
source("R/05_validate_results.R")

config <- read_simple_config(config_path)

cat("jp_blup_workflow_start\n")
cat("root=", root, "\n", sep = "")
cat("config=", config_path, "\n", sep = "")
cat("engine=", ifelse(is.null(config$engine) || !nzchar(config$engine), "mock", config$engine), "\n", sep = "")

input_manifest <- prepare_inputs(config, root)
param_path <- write_parameters(config, root)
engine_result <- run_engine(config, root)
output_manifest <- parse_results(config, engine_result, root)
validation <- validate_results(config, root)

cat("inputs=", nrow(input_manifest), "\n", sep = "")
cat("param=", param_path, "\n", sep = "")
cat("outputs=", nrow(output_manifest), "\n", sep = "")
cat("validated=", nrow(validation), "\n", sep = "")
cat("jp_blup_workflow_ok\n")
