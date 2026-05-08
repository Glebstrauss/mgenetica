base_url <- Sys.getenv("MGENETICA_SITE_URL", "https://glebstrauss.github.io/mgenetica")
base_url <- sub("/+$", "", base_url)

pages <- c(
  home = paste0(base_url, "/"),
  modules = paste0(base_url, "/modules/index.html"),
  search = paste0(base_url, "/busca.html"),
  glossary = paste0(base_url, "/glossario.html"),
  route = paste0(base_url, "/semanas/"),
  module01 = paste0(base_url, "/modules/modulo01-introducao-ao-melhoramento-animal.html")
)

read_page <- function(url) {
  con <- url(url, open = "rb")
  on.exit(close(con), add = TRUE)
  paste(readLines(con, warn = FALSE, encoding = "UTF-8"), collapse = "\n")
}

absolute_url <- function(path) {
  if (grepl("^https?://", path)) return(path)
  paste0(base_url, "/", sub("^/+", "", path))
}

extract_css_href <- function(page, id) {
  links <- regmatches(page, gregexpr("<link[^>]+>", page))[[1]]
  link <- links[grepl(sprintf('id="%s"', id), links, fixed = TRUE)]
  if (!length(link)) stop(sprintf("missing stylesheet link: %s", id), call. = FALSE)
  hit <- regexec('href="([^"]+)"', link[[1]])
  match <- regmatches(link[[1]], hit)[[1]]
  if (length(match) < 2) stop(sprintf("missing stylesheet href: %s", id), call. = FALSE)
  match[[2]]
}

assert <- function(ok, message) {
  if (!isTRUE(ok)) stop(message, call. = FALSE)
}

html <- lapply(pages, read_page)
light_css <- read_page(absolute_url(extract_css_href(html$home, "quarto-bootstrap")))
dark_css <- read_page(absolute_url(extract_css_href(
  sub('id="quarto-bootstrap"', 'id="quarto-bootstrap-light"', html$home),
  "quarto-bootstrap"
)))

editorial_pages <- html[c("home", "modules", "search", "glossary", "route")]
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
assert(grepl("Explorar a trilha", html$home, fixed = TRUE), "home missing secondary CTA")
assert(grepl("Escolha o melhor ponto de partida", html$home, fixed = TRUE), "home missing entry section")
assert(grepl("TRILHA COMPLETA", html$modules, fixed = TRUE), "module index missing landing badge")
assert(grepl("Fluxo recomendado", html$modules, fixed = TRUE), "module index missing guidance section")
assert(lengths(regmatches(html$modules, gregexpr('class="module-card"', html$modules, fixed = TRUE))) == 12, "module index should expose 12 module cards")
assert(grepl("PagefindUI", html$search, fixed = TRUE), "search page missing Pagefind")
assert(grepl("data-glossary", html$glossary, fixed = TRUE), "glossary page missing glossary hook")
assert(grepl("data-learning-map", html$route, fixed = TRUE), "route page missing learning map")
assert(grepl("Todos os módulos", html$module01, fixed = TRUE), "module page missing module index nav")
assert(grepl("module-orientation", html$module01, fixed = TRUE), "module page missing orientation pattern")
assert(grepl("quiz-container", html$module01, fixed = TRUE), "module page missing quiz container")
assert(gregexpr("quiz-container", html$module01, fixed = TRUE)[[1]][1] < gregexpr("module-nav", html$module01, fixed = TRUE)[[1]][1], "module quiz should appear before final navigation")

for (css in list(light = light_css, dark = dark_css)) {
  assert(grepl("body:has(.hero) #title-block-header", css, fixed = TRUE), "home title chrome hide rule missing from CSS")
  assert(grepl("body:has(.modules-landing) #title-block-header", css, fixed = TRUE), "module index title chrome hide rule missing from CSS")
  assert(grepl("body:has(.modules-landing) #quarto-sidebar", css, fixed = TRUE), "module index sidebar hide rule missing from CSS")
}

cat("deployed site ok\n")
