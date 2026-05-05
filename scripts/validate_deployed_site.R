base_url <- Sys.getenv("MGENETICA_SITE_URL", "https://glebstrauss.github.io/mgenetica")
base_url <- sub("/+$", "", base_url)

pages <- c(
  home = paste0(base_url, "/"),
  modules = paste0(base_url, "/modules/index.html"),
  module01 = paste0(base_url, "/modules/modulo01-introducao-ao-melhoramento-animal.html")
)

read_page <- function(url) {
  con <- url(url, open = "rb")
  on.exit(close(con), add = TRUE)
  paste(readLines(con, warn = FALSE, encoding = "UTF-8"), collapse = "\n")
}

assert <- function(ok, message) {
  if (!isTRUE(ok)) stop(message, call. = FALSE)
}

html <- lapply(pages, read_page)

editorial_pages <- html[c("home", "modules")]
for (name in names(editorial_pages)) {
  page <- editorial_pages[[name]]
  assert(!grepl("header-section-number", page, fixed = TRUE), paste(name, "has visible section numbers"))
  assert(!grepl("data-number=", page, fixed = TRUE), paste(name, "has numbered section metadata"))
}

for (name in names(html)) {
  page <- html[[name]]
  assert(!grepl("/mgenetica/mgenetica/", page, fixed = TRUE), paste(name, "has duplicated GitHub Pages path"))
  assert(grepl(paste0(base_url, "/images/favicon/favicon.ico"), page, fixed = TRUE), paste(name, "missing absolute favicon"))
  assert(grepl(paste0(base_url, "/images/favicon/site.webmanifest"), page, fixed = TRUE), paste(name, "missing absolute webmanifest"))
  assert(grepl(paste0(base_url, "/images/og-card.png"), page, fixed = TRUE), paste(name, "missing absolute social image"))
}

assert(grepl("Começar pelo Módulo 01", html$home, fixed = TRUE), "home missing primary CTA")
assert(grepl("Ver fases da trilha", html$home, fixed = TRUE), "home missing secondary CTA")
assert(grepl("TRILHA COMPLETA", html$modules, fixed = TRUE), "module index missing landing badge")
assert(grepl("Todos os módulos", html$module01, fixed = TRUE), "module page missing module index nav")
assert(grepl("quiz-container", html$module01, fixed = TRUE), "module page missing quiz container")

cat("deployed site ok\n")
