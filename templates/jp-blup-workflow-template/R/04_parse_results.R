parse_results <- function(config, engine_result, root = getwd()) {
  outputs_dir <- ensure_dir(path_from_config(config, "outputs_dir", root))
  engine <- engine_result$engine[[1]]
  output_dir <- engine_result$output_dir[[1]]

  if (engine == "mock") {
    bv <- read_tsv(file.path(output_dir, "breeding_values.tsv"))
    vc <- read_tsv(file.path(output_dir, "variance_components.tsv"))
  } else {
    stop("Parsing BLUPF90 real ainda exige adaptador por formato de saida deste modelo. Logs foram gerados em: ", output_dir)
  }

  final_dir <- ensure_dir(file.path(outputs_dir, "tables"))
  write_tsv(bv, file.path(final_dir, "breeding_values.tsv"))
  write_tsv(vc, file.path(final_dir, "variance_components.tsv"))

  manifest <- data.frame(
    artifact = c("breeding_values", "variance_components"),
    path = c(file.path(final_dir, "breeding_values.tsv"), file.path(final_dir, "variance_components.tsv")),
    rows = c(nrow(bv), nrow(vc)),
    engine = engine,
    stringsAsFactors = FALSE
  )
  write_tsv(manifest, file.path(outputs_dir, "manifest.tsv"))

  report <- c(
    "# JP BLUP workflow report",
    "",
    paste0("- project_id: ", config$project_id),
    paste0("- engine: ", engine),
    paste0("- breeding values: ", nrow(bv)),
    paste0("- variance components: ", nrow(vc)),
    paste0("- h2_mock: ", vc$estimate[vc$component == "h2"]),
    "",
    "Aviso: resultados `engine: mock` sao ficticios e servem apenas para validar fluxo."
  )
  writeLines(report, file.path(outputs_dir, "REPORT.md"), useBytes = TRUE)

  manifest
}
