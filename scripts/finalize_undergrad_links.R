#!/usr/bin/env Rscript

suppressPackageStartupMessages({
  library(yaml)
})

repo <- normalizePath(".", mustWork = TRUE)
manifest <- yaml::read_yaml(file.path(repo, "data/site-manifest.yml"))
mods <- manifest$content_collections$modules$items

href <- function(i) mods[[i]]$href
html <- function(i) sub("\\.qmd$", ".html", href(i))
title <- function(i) mods[[i]]$card_title
id <- function(i) mods[[i]]$id

replace_in_file <- function(path, replacements) {
  full <- file.path(repo, path)
  x <- paste(readLines(full, warn = FALSE), collapse = "\n")
  for (from in names(replacements)) {
    x <- gsub(from, replacements[[from]], x, fixed = TRUE)
  }
  writeLines(strsplit(x, "\n", fixed = TRUE)[[1]], full, useBytes = TRUE)
}

first_qmd <- href(1)
mid_qmd <- href(12)
last_i <- length(mods)
last_qmd <- href(last_i)
first_html <- html(1)

common <- c(
  "modules/modulo01-introducao-ao-melhoramento-animal.qmd" = first_qmd,
  "modules/modulo01-introducao-ao-melhoramento-animal.html" = first_html,
  "modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd" = last_qmd,
  "modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html" = html(last_i),
  "Começar M01" = "Começar M1",
  "Começar M0" = "Começar M1",
  "Começar pelo Módulo 01" = "Começar pelo Módulo M1",
  "Começar pelo Módulo M0" = "Começar pelo Módulo M1",
  "Abrir Módulo 01" = "Abrir Módulo M1",
  "Abrir Módulo M0" = "Abrir Módulo M1",
  "Módulo 01" = "Módulo M1",
  "Módulo M0" = "Módulo M1",
  "Explorar os 12 módulos" = "Explorar os 21 módulos",
  "Explorar os 22 módulos" = "Explorar os 21 módulos",
  "índice com os 12 módulos" = "índice com os 21 módulos",
  "índice com os 22 módulos" = "índice com os 21 módulos",
  "12 módulos guiados" = "21 módulos guiados",
  "22 módulos guiados" = "21 módulos guiados",
  "12 módulos" = "21 módulos",
  "22 módulos" = "21 módulos",
  "12 semanas" = "5 blocos",
  "roteiro de estudo de 12 semanas" = "roteiro de estudo em 5 blocos",
  "Começar M01" = "Começar M1"
)

for (path in c("index.qmd", "busca.qmd", "glossario.qmd", "certificado.qmd")) {
  replace_in_file(path, common)
}

replace_in_file("busca.qmd", c(
  "Abrir M01" = "Abrir M1",
  "Abrir M0" = "Abrir M1",
  "Abrir M12" = "Abrir M21"
))
replace_in_file("glossario.qmd", c(
  "Abrir M01" = "Abrir M1",
  "Abrir M0" = "Abrir M1",
  "Abrir M12" = "Abrir M21"
))
replace_in_file("certificado.qmd", c(
  "Revisar M01" = "Revisar M1",
  "Revisar M0" = "Revisar M1",
  "Revisar M12" = "Revisar M21",
  "36 horas" = "52 horas",
  "55 horas" = "52 horas"
))

cert_path <- file.path(repo, "certificado.qmd")
cert <- paste(readLines(cert_path, warn = FALSE), collapse = "\n")
modules_js <- paste(sprintf("    '%s'", vapply(mods, `[[`, character(1), "id")), collapse = ",\n")
titles_js <- paste(sprintf("    %s: '%s'", vapply(mods, `[[`, character(1), "id"), gsub("'", "\\\\'", vapply(mods, `[[`, character(1), "card_title"))), collapse = ",\n")
links_js <- paste(sprintf("    %s: '%s'", vapply(mods, `[[`, character(1), "id"), vapply(seq_along(mods), html, character(1))), collapse = ",\n")
cert <- sub("var MODULES = \\[[^;]+\\];", paste0("var MODULES = [\n", modules_js, "\n  ];"), cert)
cert <- sub("var MODULE_TITLES = \\{[^;]+\\};", paste0("var MODULE_TITLES = {\n", titles_js, "\n  };"), cert)
cert <- sub("var MODULE_LINKS = \\{[^;]+\\};", paste0("var MODULE_LINKS = {\n", links_js, "\n  };"), cert)
writeLines(strsplit(cert, "\n", fixed = TRUE)[[1]], cert_path, useBytes = TRUE)

data_readme <- file.path(repo, "data/README.md")
if (file.exists(data_readme)) {
  replace_in_file("data/README.md", c(
    "`modulo01_simulado.csv` até `modulo12_simulado.csv`" = "`modulo01_simulado.csv` até `modulo21_simulado.csv`",
    "scripts da pasta `scripts/`." = "scripts da pasta `scripts/`."
  ))
}

message("undergrad public links finalized")
