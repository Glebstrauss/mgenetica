base_url <- Sys.getenv("MGENETICA_SITE_URL", "https://glebstrauss.github.io/mgenetica")
base_url <- sub("/+$", "", base_url)

pages <- c(
  home = paste0(base_url, "/"),
  modules = paste0(base_url, "/modules/index.html"),
  search = paste0(base_url, "/busca.html"),
  glossary = paste0(base_url, "/glossario.html"),
  route = paste0(base_url, "/semanas/"),
  about = paste0(base_url, "/perfil.html"),
  module01 = paste0(base_url, "/modules/modulo01-introducao-ao-melhoramento-animal.html"),
  module06 = paste0(base_url, "/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html"),
  module12 = paste0(base_url, "/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html")
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

editorial_pages <- html[c("home", "modules", "search", "glossary", "route", "about")]
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
assert(grepl("profile-hero", html$about, fixed = TRUE), "about page missing profile hero")
assert(grepl("public-page-triad", html$about, fixed = TRUE), "about page missing public page triad")
assert(grepl("Princípios", html$about, fixed = TRUE), "about page missing principles section")

module_pages <- html[c("module01", "module06", "module12")]
for (name in names(module_pages)) {
  page <- module_pages[[name]]
  assert(grepl("Todos os módulos", page, fixed = TRUE), paste(name, "missing module index nav"))
  assert(grepl("module-header", page, fixed = TRUE), paste(name, "missing module header"))
  assert(grepl("module-orientation", page, fixed = TRUE), paste(name, "missing orientation pattern"))
  assert(grepl("module-objectives", page, fixed = TRUE), paste(name, "missing objectives pattern"))
  assert(grepl('class="quiz-container"', page, fixed = TRUE), paste(name, "missing quiz container"))
  assert(gregexpr('class="quiz-container"', page, fixed = TRUE)[[1]][1] < gregexpr("module-nav", page, fixed = TRUE)[[1]][1], paste(name, "quiz should appear before final navigation"))
}

assert(!grepl('class="quiz-container"', html$modules, fixed = TRUE), "module index should not expose quiz container")

for (css in list(light = light_css, dark = dark_css)) {
  assert(grepl("body:has(.hero) #title-block-header", css, fixed = TRUE), "home title chrome hide rule missing from CSS")
  assert(grepl("body:has(.page-hero) #title-block-header", css, fixed = TRUE), "utility title chrome hide rule missing from CSS")
  assert(grepl("body:has(.profile-hero) #title-block-header", css, fixed = TRUE), "about title chrome hide rule missing from CSS")
  assert(grepl("body:has(.modules-landing) #title-block-header", css, fixed = TRUE), "module index title chrome hide rule missing from CSS")
  assert(grepl("body:has(.modules-landing) #quarto-sidebar", css, fixed = TRUE), "module index sidebar hide rule missing from CSS")
  assert(grepl("body:has(.page-hero) .quarto-secondary-nav", css, fixed = TRUE), "mobile utility secondary nav hide rule missing from CSS")
  assert(grepl("body:has(.profile-hero) .quarto-secondary-nav", css, fixed = TRUE), "mobile about secondary nav hide rule missing from CSS")
  assert(grepl("body:has(.module-header) .quarto-secondary-nav", css, fixed = TRUE), "mobile module breadcrumb hide rule missing from CSS")
}

cat("deployed site ok\n")
