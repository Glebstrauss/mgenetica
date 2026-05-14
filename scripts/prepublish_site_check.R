#!/usr/bin/env Rscript

args <- commandArgs(trailingOnly = FALSE)
file_arg <- grep("^--file=", args, value = TRUE)
script_path <- if (length(file_arg)) sub("^--file=", "", file_arg[[1]]) else "scripts/prepublish_site_check.R"
repo_root <- normalizePath(file.path(dirname(script_path), ".."), mustWork = TRUE)
setwd(repo_root)

if (!nzchar(Sys.getenv("QUARTO_NUM_THREADS"))) {
  Sys.setenv(QUARTO_NUM_THREADS = "1")
}

run <- function(label, command, args = character(), required = TRUE, env = character()) {
  cat(sprintf("\n==> %s\n", label))
  status <- system2(command, args, env = env)
  if (!identical(status, 0L) && required) {
    stop(sprintf("%s failed", label), call. = FALSE)
  }
  invisible(status)
}

run_r <- function(label, expr) {
  run(label, "Rscript", c("-e", shQuote(expr)))
}

run("Site manifest validation", "Rscript", "scripts/validate_site_manifest.R")
run_r(
  "YAML validation",
  'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); invisible(yaml::read_yaml(".github/workflows/quarto-publish.yml")); cat("yaml ok\\n")'
)
run_r(
  "SCSS validation",
  'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'
)

for (file in c(
  "assets/js/i18n.js",
  "assets/js/progress.js",
  "assets/js/darkmode.js",
  "assets/js/interactives.js",
  "assets/js/quiz.js",
  "assets/js/teacher-mode.js"
)) {
  run(sprintf("JS syntax: %s", file), "node", c("--check", file))
}

run("Module data scripts", "Rscript", "scripts/run_all_modules.R")
run("Whitespace/diff check", "git", c("diff", "--check"))

if (identical(Sys.getenv("SKIP_QUARTO_RENDER"), "1")) {
  cat("\n==> Quarto render\n")
  cat("skipped: SKIP_QUARTO_RENDER=1\n")
} else if (nzchar(Sys.which("quarto"))) {
  quarto_home <- Sys.getenv("QUARTO_RENDER_HOME", "/private/tmp/quarto-home")
  dir.create(quarto_home, recursive = TRUE, showWarnings = FALSE)
  run(
    "Quarto render",
    "quarto",
    "render",
    env = c(
      sprintf("HOME=%s", quarto_home),
      "RENV_CONFIG_AUTOLOADER_ENABLED=FALSE"
    )
  )
} else {
  cat("\n==> Quarto render\n")
  cat("skipped: quarto is not available on PATH\n")
}

cat("\nprepublish site check ok\n")
