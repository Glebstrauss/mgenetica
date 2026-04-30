# MGenética - executor dos scripts dos módulos
# Executa todos os scripts moduloXX.R a partir da raiz do projeto.

args <- commandArgs(trailingOnly = FALSE)
file_arg <- grep("^--file=", args, value = TRUE)

if (length(file_arg) == 0) {
  stop("Execute com Rscript scripts/run_all_modules.R", call. = FALSE)
}

this_file <- normalizePath(sub("^--file=", "", file_arg[[1]]), mustWork = TRUE)
project_root <- normalizePath(file.path(dirname(this_file), ".."), mustWork = TRUE)

old_wd <- setwd(project_root)
on.exit(setwd(old_wd), add = TRUE)

module_scripts <- list.files(
  "scripts",
  pattern = "^modulo[0-9]{2}\\.R$",
  full.names = TRUE
)

if (length(module_scripts) == 0) {
  stop("Nenhum script de módulo encontrado em scripts/.", call. = FALSE)
}

for (script in module_scripts) {
  message("Executando ", script)
  source(script, local = new.env(parent = globalenv()))
}

message("Todos os scripts foram executados com sucesso.")
