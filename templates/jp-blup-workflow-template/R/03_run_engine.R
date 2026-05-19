run_checked <- function(command, input, log_file, run_dir) {
  old <- getwd()
  on.exit(setwd(old), add = TRUE)
  setwd(run_dir)
  status <- system2(command, input = input, stdout = log_file, stderr = log_file)
  if (!identical(status, 0L)) stop("Falha em ", command, ". Veja ", file.path(run_dir, log_file))
}

run_mock_engine <- function(config, root = getwd()) {
  work_dir <- path_from_config(config, "work_dir", root)
  run_dir <- ensure_dir(file.path(work_dir, "run"))
  output_dir <- ensure_dir(file.path(work_dir, "engine_outputs"))
  datafile <- read.table(file.path(work_dir, "inputs", "datafile.txt"), col.names = c("animal_id", "trait_value", "sex_code", "birth_year"))

  mean_trait <- mean(datafile$trait_value)
  bv <- data.frame(
    animal_id = datafile$animal_id,
    ebv = round((datafile$trait_value - mean_trait) * 0.45, 4),
    reliability = round(seq(0.42, 0.78, length.out = nrow(datafile)), 4)
  )
  vc <- data.frame(
    component = c("additive", "residual", "phenotypic", "h2"),
    estimate = c(60, 120, 180, 60 / 180)
  )

  write_tsv(bv, file.path(output_dir, "breeding_values.tsv"))
  write_tsv(vc, file.path(output_dir, "variance_components.tsv"))
  writeLines(c("mock renumf90 ok", "input renumf90.par"), file.path(run_dir, "log_renumf90.txt"), useBytes = TRUE)
  writeLines(c("mock airemlf90 ok", "variance components generated"), file.path(run_dir, "log_airemlf90.txt"), useBytes = TRUE)
  writeLines(c("mock blupf90 ok", "breeding values generated"), file.path(run_dir, "log_blupf90.txt"), useBytes = TRUE)

  data.frame(engine = "mock", status = "ok", run_dir = run_dir, output_dir = output_dir, stringsAsFactors = FALSE)
}

require_bin <- function(config, key) {
  value <- config[[key]]
  if (is.null(value) || !nzchar(value) || !file.exists(value)) {
    stop("Executavel ausente: ", key, ". Configure caminho absoluto no YAML.")
  }
  value
}

run_blupf90_engine <- function(config, root = getwd()) {
  work_dir <- path_from_config(config, "work_dir", root)
  run_dir <- ensure_dir(file.path(work_dir, "run"))
  file.copy(file.path(work_dir, "inputs", "datafile.txt"), file.path(run_dir, "datafile.txt"), overwrite = TRUE)
  file.copy(file.path(work_dir, "inputs", "pedigree.txt"), file.path(run_dir, "pedigree.txt"), overwrite = TRUE)
  file.copy(file.path(work_dir, "params", "renumf90.par"), file.path(run_dir, "renumf90.par"), overwrite = TRUE)

  renumf90 <- require_bin(config, "renumf90_bin")
  airemlf90 <- require_bin(config, "airemlf90_bin")
  blupf90 <- require_bin(config, "blupf90_bin")

  run_checked(renumf90, input = "renumf90.par", log_file = "log_renumf90.txt", run_dir = run_dir)
  run_checked(airemlf90, input = "renf90.par", log_file = "log_airemlf90.txt", run_dir = run_dir)
  run_checked(blupf90, input = "renf90.par", log_file = "log_blupf90.txt", run_dir = run_dir)

  data.frame(engine = "blupf90", status = "ok", run_dir = run_dir, output_dir = run_dir, stringsAsFactors = FALSE)
}

run_engine <- function(config, root = getwd()) {
  engine <- config$engine
  if (is.null(engine) || !nzchar(engine)) engine <- "mock"
  if (engine == "mock") return(run_mock_engine(config, root))
  if (engine == "blupf90") return(run_blupf90_engine(config, root))
  stop("Engine desconhecida: ", engine)
}
