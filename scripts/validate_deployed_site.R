`%||%` <- function(x, y) {
  if (is.null(x) || length(x) == 0) y else x
}

base_url <- Sys.getenv("MGENETICA_SITE_URL", "https://mgenetica.github.io")
base_url <- sub("/+$", "", base_url)

args <- commandArgs(trailingOnly = FALSE)
file_arg <- grep("^--file=", args, value = TRUE)
script_path <- if (length(file_arg)) sub("^--file=", "", file_arg[[1]]) else "scripts/validate_deployed_site.R"
repo_root <- normalizePath(file.path(dirname(script_path), ".."), mustWork = TRUE)
manifest <- yaml::read_yaml(file.path(repo_root, "data", "site-manifest.yml"))
modules <- manifest$content_collections$modules$items
module_pages <- setNames(
  vapply(
    modules,
    function(module) paste0(base_url, "/", sub("\\.qmd$", ".html", module$href)),
    character(1)
  ),
  sprintf("module%02d", vapply(modules, function(module) module$order, integer(1)))
)

pages <- c(
  home = paste0(base_url, "/"),
  modules = paste0(base_url, "/modules/index.html"),
  search = paste0(base_url, "/busca.html"),
  glossary = paste0(base_url, "/glossario.html"),
  route = paste0(base_url, "/semanas/"),
  about = paste0(base_url, "/perfil.html"),
  module_pages
)

read_page <- function(url) {
  con <- url(url, open = "rb")
  on.exit(close(con), add = TRUE)
  paste(readLines(con, warn = FALSE, encoding = "UTF-8"), collapse = "\n")
}

read_json_url <- function(url) {
  jsonlite::fromJSON(read_page(url), simplifyVector = FALSE)
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

assert(grepl("Começar M1", html$home, fixed = TRUE), "home missing primary CTA")
assert(grepl('aria-label="Começar pelo Módulo M1"', html$home, fixed = TRUE), "home missing primary CTA aria-label")
assert(grepl("Explorar os 21 módulos", html$home, fixed = TRUE), "home missing secondary CTA")
assert(grepl("Escolha o melhor ponto de partida", html$home, fixed = TRUE), "home missing entry section")
assert(grepl("TRILHA COMPLETA", html$modules, fixed = TRUE), "module index missing landing badge")
assert(grepl("Da genética básica à seleção genômica", html$modules, fixed = TRUE), "module index missing undergraduate landing")
assert(grepl('aria-label="Começar curso pelo primeiro bloco temático"', html$modules, fixed = TRUE), "course page missing primary CTA aria-label")
assert(lengths(regmatches(html$modules, gregexpr('class="module-card"', html$modules, fixed = TRUE))) == 21, "module index should expose 21 module cards")
assert(grepl("PagefindUI", html$search, fixed = TRUE), "search page missing Pagefind")
assert(grepl("data-glossary", html$glossary, fixed = TRUE), "glossary page missing glossary hook")
assert(grepl("Roteiro agora está na página do curso", html$route, fixed = TRUE), "route page should point to consolidated course page")
assert(grepl('aria-label="Abrir sequência de estudo na página do curso"', html$route, fixed = TRUE), "route missing consolidated sequence CTA aria-label")
assert(grepl("profile-hero", html$about, fixed = TRUE), "about page missing profile hero")
assert(grepl("public-page-triad", html$about, fixed = TRUE), "about page missing public page triad")
assert(grepl("Princípios", html$about, fixed = TRUE), "about page missing principles section")

deployed_module_pages <- html[names(module_pages)]
for (name in names(deployed_module_pages)) {
  page <- deployed_module_pages[[name]]
  assert(grepl("module-nav-index", page, fixed = TRUE), paste(name, "missing module index nav"))
  assert(grepl("module-reading-rhythm", page, fixed = TRUE), paste(name, "missing reading rhythm"))
  assert(grepl("module-orientation", page, fixed = TRUE), paste(name, "missing orientation pattern"))
  assert(grepl("module-session-plan", page, fixed = TRUE), paste(name, "missing session plan"))
  assert(grepl("module-glossary-support", page, fixed = TRUE), paste(name, "missing glossary support"))
  assert(grepl('class="quiz-container"', page, fixed = TRUE), paste(name, "missing quiz container"))
  assert(gregexpr('class="quiz-container"', page, fixed = TRUE)[[1]][1] < gregexpr("module-nav", page, fixed = TRUE)[[1]][1], paste(name, "quiz should appear before final navigation"))
}

script_lab_pages <- deployed_module_pages
for (name in names(script_lab_pages)) {
  module_number <- sub("^module", "", name)
  page <- script_lab_pages[[name]]
  assert(grepl("module-script-lab", page, fixed = TRUE), paste(name, "missing script lab"))
  assert(grepl(sprintf("../scripts/modulo%s.R", module_number), page, fixed = TRUE), paste(name, "missing public script link"))
  assert(grepl(sprintf("../data/modulo%s_simulado.csv", module_number), page, fixed = TRUE), paste(name, "missing generated CSV link"))
}

assert(!grepl('class="quiz-container"', html$modules, fixed = TRUE), "module index should not expose quiz container")

for (module in modules) {
  quiz <- read_json_url(absolute_url(module$quiz))
  module_number <- sprintf("%02d", module$order)
  assert(identical(quiz$module, module_number), paste(module$id, "deployed quiz module id mismatch"))
  assert(length(quiz$questions) >= 1, paste(module$id, "deployed quiz has no questions"))
  assert(length(quiz$questions) >= quiz$passMark, paste(module$id, "deployed quiz passMark is higher than question count"))
}

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
