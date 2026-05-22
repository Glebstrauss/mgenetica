#!/usr/bin/env Rscript

args <- commandArgs(FALSE)
file_arg <- args[grep("^--file=", args)]
root <- if (length(file_arg) == 0) getwd() else normalizePath(file.path(dirname(sub("^--file=", "", file_arg[[1]])), ".."), mustWork = TRUE)
setwd(root)

status <- system2("Rscript", c("scripts/run_all.R", "config/example.workflow.yml"), stdout = TRUE, stderr = TRUE)
exit_status <- attr(status, "status")
if (!is.null(exit_status) && exit_status != 0) {
  cat(paste(status, collapse = "\n"), "\n")
  quit(status = exit_status)
}

required <- c(
  "work/inputs/datafile.txt",
  "work/inputs/pedigree.txt",
  "work/params/renumf90.par",
  "work/run/log_renumf90.txt",
  "work/run/log_airemlf90.txt",
  "work/run/log_blupf90.txt",
  "outputs/tables/breeding_values.tsv",
  "outputs/tables/variance_components.tsv",
  "outputs/manifest.tsv",
  "outputs/REPORT.md",
  "outputs/validation.tsv"
)

missing <- required[!file.exists(required)]
if (length(missing) > 0) {
  stop("Arquivos ausentes: ", paste(missing, collapse = ", "))
}

bv <- read.delim("outputs/tables/breeding_values.tsv", stringsAsFactors = FALSE)
vc <- read.delim("outputs/tables/variance_components.tsv", stringsAsFactors = FALSE)
if (nrow(bv) != 12) stop("breeding_values deveria ter 12 linhas")
if (!"h2" %in% vc$component) stop("variance_components sem h2")

cat("jp_blup_workflow_test_ok\n")
