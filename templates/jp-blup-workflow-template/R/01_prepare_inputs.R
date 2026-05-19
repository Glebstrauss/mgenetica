prepare_inputs <- function(config, root = getwd()) {
  phenotypes <- read_tsv(path_from_config(config, "raw_phenotypes", root))
  pedigree <- read_tsv(path_from_config(config, "raw_pedigree", root))
  trait <- config$trait_name
  if (is.null(trait) || !nzchar(trait)) stop("trait_name ausente")

  required_columns(phenotypes, c("animal_id", "sex", "birth_year", trait), "phenotypes")
  required_columns(pedigree, c("animal_id", "sire_id", "dam_id"), "pedigree")

  work_dir <- path_from_config(config, "work_dir", root)
  input_dir <- ensure_dir(file.path(work_dir, "inputs"))

  sex_code <- ifelse(phenotypes$sex == "M", 1L, 2L)
  datafile <- data.frame(
    animal_id = phenotypes$animal_id,
    trait_value = phenotypes[[trait]],
    sex_code = sex_code,
    birth_year = phenotypes$birth_year,
    stringsAsFactors = FALSE
  )

  ped <- data.frame(
    animal_id = pedigree$animal_id,
    sire_id = pedigree$sire_id,
    dam_id = pedigree$dam_id,
    stringsAsFactors = FALSE
  )

  write.table(datafile, file.path(input_dir, "datafile.txt"), sep = " ", row.names = FALSE, col.names = FALSE, quote = FALSE)
  write.table(ped, file.path(input_dir, "pedigree.txt"), sep = " ", row.names = FALSE, col.names = FALSE, quote = FALSE)

  manifest <- data.frame(
    artifact = c("datafile", "pedigree"),
    path = c(file.path(input_dir, "datafile.txt"), file.path(input_dir, "pedigree.txt")),
    rows = c(nrow(datafile), nrow(ped)),
    stringsAsFactors = FALSE
  )
  write_tsv(manifest, file.path(work_dir, "input_manifest.tsv"))
  manifest
}
