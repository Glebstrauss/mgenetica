source("templates/jp-data-cycle/R/paths.R")

validate_dataset <- function(config_path) {
  config <- read_simple_config(config_path)
  required <- c("project_id", "raw_dir", "processed_dir", "analysis_dir", "outputs_dir", "work_dir")
  missing <- required[!vapply(required, function(key) !is.null(config[[key]]) && nzchar(config[[key]]), logical(1))]

  dirs <- c("raw_dir", "processed_dir", "outputs_dir")
  dir_status <- data.frame(
    key = dirs,
    path = vapply(dirs, function(key) config[[key]], character(1)),
    exists = vapply(dirs, function(key) dir.exists(config[[key]]), logical(1)),
    stringsAsFactors = FALSE
  )

  list(
    project_id = config$project_id,
    missing_required = missing,
    dir_status = dir_status,
    ok = length(missing) == 0 && all(dir_status$exists)
  )
}
