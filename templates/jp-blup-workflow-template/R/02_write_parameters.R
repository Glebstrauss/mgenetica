write_parameters <- function(config, root = getwd()) {
  work_dir <- path_from_config(config, "work_dir", root)
  input_dir <- file.path(work_dir, "inputs")
  param_dir <- ensure_dir(file.path(work_dir, "params"))
  param_path <- file.path(param_dir, "renumf90.par")

  lines <- c(
    "DATAFILE",
    file.path(input_dir, "datafile.txt"),
    "NUMBER_OF_TRAITS",
    "1",
    "NUMBER_OF_EFFECTS",
    "2",
    "OBSERVATION(S)",
    "2",
    "WEIGHT(S)",
    "",
    "EFFECTS: POSITIONS_IN_DATAFILE NUMBER_OF_LEVELS TYPE_OF_EFFECT [EFFECT NESTED]",
    "3 2 cross",
    "1 12 cross",
    "RANDOM_RESIDUAL VALUES",
    "120.0",
    "RANDOM_GROUP",
    "2",
    "RANDOM_TYPE",
    "add_animal",
    "FILE",
    file.path(input_dir, "pedigree.txt"),
    "(CO)VARIANCES",
    "60.0",
    "OPTION maxrounds 20",
    "OPTION conv_crit 1e-8"
  )

  writeLines(lines, param_path, useBytes = TRUE)
  param_path
}
