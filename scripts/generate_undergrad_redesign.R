#!/usr/bin/env Rscript

suppressPackageStartupMessages({
  library(yaml)
  library(jsonlite)
})

repo <- normalizePath(".", mustWork = TRUE)
course <- yaml::read_yaml(file.path(repo, "data/course-structure-redesign.yml"))$course_redesign
mods <- course$modules
course_content <- yaml::read_yaml(file.path(repo, "data/course-content.yml"))$course_content
course_expansion <- yaml::read_yaml(file.path(repo, "data/course-content-expansion.yml"))$course_content_expansion
course_practice <- yaml::read_yaml(file.path(repo, "data/course-practice.yml"))$course_practice
glossary_items <- yaml::read_yaml(file.path(repo, "data/glossary.yml"))$glossary
content_by_id <- stats::setNames(course_content$modules, names(course_content$modules))
expansion_by_id <- stats::setNames(course_expansion$modules, names(course_expansion$modules))
practice_by_id <- stats::setNames(course_practice$modules, names(course_practice$modules))

`%||%` <- function(x, y) if (is.null(x)) y else x

module_content <- function(i) {
  id <- module_label(i)
  c(content_by_id[[id]] %||% list(), expansion_by_id[[id]] %||% list())
}

module_practice <- function(i) {
  practice_by_id[[module_label(i)]] %||% list()
}

slugify <- function(x) {
  x <- iconv(x, from = "", to = "ASCII//TRANSLIT")
  x <- tolower(x)
  x <- gsub("[^a-z0-9]+", "-", x)
  x <- gsub("(^-|-$)", "", x)
  x
}

module_num <- function(i) sprintf("%02d", i)
module_id <- function(i) sprintf("modulo%02d", i)
module_label <- function(i) mods[[i]]$id
module_file <- function(i) sprintf("modules/modulo%02d-%s.qmd", i, slugify(mods[[i]]$title))
module_html_file <- function(i) sub("\\.qmd$", ".html", module_file(i))
script_file <- function(i) sprintf("scripts/modulo%02d.R", i)
csv_file <- function(i) sprintf("data/modulo%02d_simulado.csv", i)
quiz_file <- function(i) sprintf("quizzes/quiz-%02d.json", i)

block_for <- function(label) {
  hit <- Filter(function(block) label %in% block$modules, course$blocks)
  if (length(hit) != 1) stop("block not found for ", label)
  hit[[1]]
}

theme_position <- function(i) {
  block <- block_for(module_label(i))
  match(module_label(i), unlist(block$modules))
}

theme_label <- function(i) {
  block <- block_for(module_label(i))
  sprintf("%s.%s", block$order, theme_position(i))
}

course_module_title <- function(block) {
  sprintf("Módulo %s: %s", block$order, block$title)
}

study_item_rows <- function(i) {
  m <- mods[[i]]
  list(
    list(id = "leitura-pergunta", type = "Leitura", title = sprintf("Pergunta simples: %s", m$feynman_question), time = "10 min", status = "atual", href = "#item-leitura-pergunta"),
    list(id = "leitura-conceito", type = "Leitura", title = "Conceito técnico e analogia", time = "15 min", status = "pendente", href = "#item-leitura-conceito"),
    list(id = "exercicio", type = "Exercício", title = "Cálculo manual pequeno", time = "15 min", status = "pendente", href = "#item-exercicio"),
    list(id = "laboratorio", type = "Laboratório", title = "Script R mínimo", time = "20 min", status = "pendente", href = "#item-laboratorio"),
    list(id = "quiz", type = "Quiz", title = "Verificação de conhecimento", time = "10 min", status = "pendente", href = "#item-quiz")
  )
}

study_item_lines <- function(i, compact = FALSE) {
  rows <- study_item_rows(i)
  if (compact) {
    return(c(
      '::: {.study-item-summary role="note" aria-label="Resumo dos itens de estudo do bloco temático"}',
      "**5 itens** · 70 min · leitura, exercício, laboratório R e quiz",
      ":::"
    ))
  }
  c(
    '::: {.study-item-panel role="navigation" aria-label="Itens de estudo deste bloco temático"}',
    "### Neste bloco",
    "",
    '<p class="study-side-hint">Siga a lista. O status muda conforme você conclui.</p>',
    "",
    '::: {.study-item-list role="list" aria-label="Lista de itens de estudo"}',
    unlist(lapply(seq_along(rows), function(idx) {
      row <- rows[[idx]]
      current_attr <- if (identical(row$status, "atual")) ' aria-current="step"' else ""
      c(
        sprintf('::: {.study-item .%s role="listitem" data-study-item-id="%s"}', if (identical(row$status, "atual")) "is-current" else "is-pending", row$id),
        sprintf('<span class="study-item-type">%s</span>', row$type),
        sprintf('<a class="study-item-link" href="%s" aria-label="Abrir item %s"%s><strong>%s</strong></a>', row$href, html_escape(row$title), current_attr, html_escape(row$title)),
        "",
        sprintf('<span class="study-item-meta">%s · status: %s</span>', row$time, row$status),
        ":::",
        ""
      )
    })),
    ":::",
    ":::"
  )
}

q <- function(x) as.character(jsonlite::toJSON(x, auto_unbox = TRUE))

html_escape <- function(x) {
  x <- as.character(x)
  x <- gsub("&", "&amp;", x, fixed = TRUE)
  x <- gsub("<", "&lt;", x, fixed = TRUE)
  x <- gsub(">", "&gt;", x, fixed = TRUE)
  x <- gsub('"', "&quot;", x, fixed = TRUE)
  x
}

bullet_lines <- function(x) {
  if (is.null(x) || !length(x)) return(character())
  paste0("- ", unlist(x, use.names = FALSE))
}

paragraph_lines <- function(x) {
  if (is.null(x) || !length(x)) return(character())
  unlist(x, use.names = FALSE)
}

inline_terms <- function(x) {
  if (is.null(x) || !length(x)) return("termos centrais do bloco")
  paste(unlist(x, use.names = FALSE), collapse = ", ")
}

script_text <- function(i) {
  m <- mods[[i]]
  cinfo <- module_content(i)
  pinfo <- module_practice(i)
  n <- module_num(i)
  title <- m$title
  r <- m$r_script
  if (is.null(r) || !nzchar(r)) r <- "mean(1:3)"
  if (!is.null(pinfo$lab_code) && nzchar(pinfo$lab_code)) {
    return(strsplit(pinfo$lab_code, "\n", fixed = TRUE)[[1]])
  }
  c(
    sprintf("# Bloco temático %s — %s", theme_label(i), title),
    "# Script didático mínimo gerado a partir da matriz de graduação.",
    "",
    sprintf("set.seed(%d)", 100 + i),
    "",
    sprintf("bloco_tematico <- %s", q(theme_label(i))),
    sprintf("titulo <- %s", q(title)),
    sprintf("pergunta <- %s", q(m$feynman_question)),
    sprintf("objetivo_laboratorio <- %s", q(cinfo$lab_objective %||% "Reproduzir o exemplo mínimo e interpretar a saída.")),
    sprintf("observe <- %s", q(cinfo$lab_observe %||% "Compare a saída antes e depois de alterar um valor.")),
    "",
    "animais <- paste0('A', sprintf('%02d', 1:8))",
    "base <- seq(10, 45, length.out = length(animais))",
    sprintf("valor <- round(base + %s + sin(seq_along(animais)) * 2, 2)", i),
    "dados <- data.frame(animais = animais, bloco_tematico = bloco_tematico, valor = valor)",
    "",
    "cat('=== Bloco temático', bloco_tematico, ':', titulo, '===\\n')",
    "cat('Pergunta:', pergunta, '\\n\\n')",
    "cat('Objetivo do laboratorio:', objetivo_laboratorio, '\\n')",
    "cat('Observe:', observe, '\\n\\n')",
    "cat('Exemplo R mínimo sugerido na matriz:\\n')",
    sprintf("cat(%s, '\\n\\n')", q(r)),
    "cat('Resumo do exemplo simulado:\\n')",
    "print(summary(dados$valor))",
    "",
    sprintf("dir.create(%s, showWarnings = FALSE, recursive = TRUE)", q(dirname(csv_file(i)))),
    sprintf("write.csv(dados, %s, row.names = FALSE)", q(csv_file(i))),
    sprintf("cat('\\nSalvo em %s\\n')", csv_file(i))
  )
}

quiz_obj <- function(i) {
  m <- mods[[i]]
  cinfo <- module_content(i)
  pinfo <- module_practice(i)
  n <- module_num(i)
  if (!is.null(pinfo$quiz_questions) && length(pinfo$quiz_questions) == 5) {
    return(list(
      module = n,
      title = sprintf("Quiz — %s", m$title),
      subtitle = "Item formativo com erro conceitual real, cálculo, interpretação de R e decisão prática.",
      passMark = 4,
      questions = pinfo$quiz_questions
    ))
  }
  list(
    module = n,
    title = sprintf("Quiz — %s", m$title),
    subtitle = "Item de estudo formativo. Use a pergunta, o cálculo manual e o laboratório R para responder.",
    passMark = 4,
    questions = list(
      list(
        text = sprintf("Qual pergunta abre este bloco temático?"),
        options = c(m$feynman_question, "Qual número aparece sem interpretação biológica?", "Como evitar qualquer pressuposto no cálculo?"),
        correct = 0
      ),
      list(
        text = "Qual evidência mínima combina melhor com este bloco?",
        options = c("Copiar a fórmula sem interpretar.", m$completion_evidence, "Mostrar resultado sem conectar com decisão animal."),
        correct = 1
      ),
      list(
        text = "Qual cálculo ou regra manual deve ser conferido antes do laboratório?",
        options = c(m$manual_calculation, "Usar qualquer média sem identificar a variável resposta.", "Comparar grupos sem definir o que cada número representa."),
        correct = 0
      ),
      list(
        text = "Qual interpretação prática deve aparecer depois do laboratório?",
        options = c(cinfo$lab_observe %||% "Comparar a saída antes e depois de alterar um valor.", "Confirmar apenas que o script executou sem erro.", "Relatar tabela sem dizer como muda a decisão."),
        correct = 0
      ),
      list(
        text = sprintf("Qual tarefa prática fecha melhor %s?", m$id),
        options = c(m$task, "Repetir a definição sem cálculo ou exemplo animal.", "Ignorar erro comum e avançar sem evidência."),
        correct = 0
      )
    )
  )
}

module_qmd <- function(i) {
  m <- mods[[i]]
  cinfo <- module_content(i)
  pinfo <- module_practice(i)
  n <- module_num(i)
  label <- module_label(i)
  block <- block_for(label)
  module_title <- course_module_title(block)
  theme <- theme_label(i)
  prev_href <- if (i == 1) "../modules/index.html" else basename(module_html_file(i - 1))
  next_href <- if (i == length(mods)) "../certificado.html" else basename(module_html_file(i + 1))
  prev_text <- if (i == 1) "Índice" else sprintf("Bloco temático %s", theme_label(i - 1))
  next_text <- if (i == length(mods)) "Certificado" else sprintf("Bloco temático %s", theme_label(i + 1))
  current_module_id <- module_id(i)
  phase_start <- if (i %in% c(1, 3, 6, 13, 18)) {
    c(
      '::: {.module-phase-start role="note" aria-label="Início de módulo do curso"}',
      sprintf("**Início do %s**", module_title),
      "",
      block$summary,
      ":::", ""
    )
  } else character()
  topics <- paste(sprintf("- %s", unlist(m$topics)), collapse = "\n")
  glossary_terms <- bullet_lines(cinfo$glossary_terms)
  if (!length(glossary_terms)) glossary_terms <- "- Consulte o glossário rápido para termos centrais."
  reference_note <- paste(unlist(cinfo$reference_sources %||% character()), collapse = ", ")
  return(c(
    "---",
    sprintf('title: "Bloco temático %s — %s"', theme, m$title),
    sprintf('subtitle: "%s"', module_title),
    "page-layout: full",
    "toc: false",
    "sidebar: false",
    "number-sections: false",
    "---",
    "",
    '```{=html}',
    '<section class="study-hero" aria-label="Contexto do estudo">',
    '<div class="study-hero-main">',
    sprintf('<span class="study-kicker">Curso · %s · Bloco %s</span>', html_escape(module_title), html_escape(theme)),
    sprintf('<h1>%s</h1>', html_escape(m$title)),
    sprintf('<p>%s</p>', html_escape(m$objective)),
    '</div>',
    '<div class="study-hero-meta">',
    sprintf('<span>%s</span>', html_escape(m$estimated_time)),
    '<span>5 itens</span>',
    '<span>Laboratório R incluso</span>',
    '</div>',
    '</section>',
    '```',
    "",
    sprintf('<div class="module-orientation" aria-label="Localização na hierarquia do curso"><strong>Curso: Melhoramento genético animal · %s · Bloco temático %s</strong></div>', module_title, theme),
    "",
    '```{=html}',
    sprintf('<section class="module-study-toolbar" data-study-toolbar data-module-id="%s" data-next-href="%s" aria-label="Progresso e continuidade do bloco temático">', current_module_id, next_href),
    '<div class="module-study-toolbar-copy">',
    sprintf('<strong>Bloco temático %s</strong>', theme),
    '<span data-study-current>Próximo: leitura inicial</span>',
    '</div>',
    '<div class="module-study-toolbar-progress" aria-label="Progresso do bloco">',
    '<span data-study-count>0/5 itens</span>',
    '<div class="module-study-toolbar-track"><i data-study-fill style="width:0%"></i></div>',
    '</div>',
    '<div class="module-study-toolbar-actions">',
    '<button class="btn btn-secondary" type="button" data-complete-item>Marcar item atual</button>',
    '<a class="btn btn-primary" href="#item-leitura-pergunta" data-next-study-link>Próximo item</a>',
    '</div>',
    '</section>',
    '```',
    "",
    '<div class="study-shell">',
    '<aside class="study-side-panel" aria-label="Lista lateral de itens deste bloco temático">',
    study_item_lines(i),
    "",
    '<a class="module-glossary-fab" href="#module-glossary" aria-label="Abrir glossário rápido deste bloco">Glossário</a>',
    '<div id="module-glossary" class="module-glossary-support" role="region" aria-label="Consulta rápida ao glossário técnico">',
    '<details class="module-glossary-details">',
    '<summary>Glossário rápido</summary>',
    '<p>Consulte termos essenciais sem sair do bloco temático.</p>',
    '<div data-glossary></div>',
    '</details>',
    '</div>',
    '</aside>',
    '<div class="study-main-content" aria-label="Conteúdo principal do bloco temático">',
    "",
    '::: {.study-step role="region" aria-label="Item de estudo: leitura"}',
    "## Leitura {#item-leitura-pergunta}",
    "",
    "**Pergunta simples**",
    "",
    m$feynman_question,
    "",
    "**Intuição**",
    "",
    sprintf("Pense assim: %s", m$analogy),
    "",
    cinfo$intro %||% "Antes do jargão, observe uma diferença real entre animais e pergunte qual parte ajuda seleção, acasalamento ou manejo.",
    "",
    "**Por que isso importa no melhoramento**",
    "",
    paragraph_lines(cinfo$why_it_matters %||% "Este ponto evita tratar todo número como mérito genético. Em melhoramento animal, a pergunta prática é sempre se a diferença observada ajuda a escolher reprodutores, ajustar manejo ou planejar acasalamentos."),
    "",
    "**Como pensar antes da fórmula**",
    "",
    paragraph_lines(cinfo$intuition_expansion %||% "Comece com uma comparação pequena entre poucos animais. Depois pergunte qual parte da diferença vem de herança, qual parte vem de ambiente e qual parte pode ser erro ou acaso."),
    "",
    "### Conceito técnico {#item-leitura-conceito}",
    "",
    cinfo$core_explanation %||% m$objective,
    "",
    sprintf("**Ponto técnico:** %s", cinfo$technical_note %||% m$objective),
    "",
    "**Passo a passo mental:**",
    "",
    bullet_lines(cinfo$study_steps %||% c("Identifique o dado observado.", "Separe conceito biológico de cálculo.", "Conecte o resultado com decisão de seleção ou acasalamento.")),
    "",
    "Tópicos principais:",
    "",
    topics,
    "",
    "**Termos para consultar no glossário:**",
    "",
    glossary_terms,
    ":::",
    "",
    '::: {.study-step role="region" aria-label="Item de estudo: exercício"}',
    "## Exercício {#item-exercicio}",
    "",
    sprintf("Cálculo manual: **%s**", m$manual_calculation),
    "",
    sprintf("Passo guiado: %s", cinfo$worked_example %||% m$manual_calculation),
    "",
    if (!is.null(pinfo$formula_terms)) c("**Termos da fórmula:**", "", bullet_lines(pinfo$formula_terms), "") else character(),
    if (!is.null(pinfo$manual_walkthrough)) c("**Cálculo comentado:**", "", paragraph_lines(pinfo$manual_walkthrough), "") else character(),
    if (!is.null(pinfo$manual_result)) c(sprintf("**Resultado esperado:** %s", pinfo$manual_result), "") else character(),
    sprintf("Leitura do resultado: %s", cinfo$example_interpretation %||% "O resultado só é útil quando você consegue dizer o que ele muda na comparação entre animais ou grupos."),
    "",
    sprintf("Exemplo animal: %s", m$animal_example),
    "",
    sprintf("Erro comum: %s", cinfo$common_mistake %||% "Decorar a fórmula e esquecer o que cada termo representa biologicamente."),
    "",
    sprintf("Visual sugerido: %s", m$suggested_visual),
    "",
    "Interprete o número como decisão prática, não como conta isolada.",
    ":::",
    "",
    '::: {.study-step role="region" aria-label="Item de estudo: laboratório R"}',
    "## Laboratório R {#item-laboratorio}",
    "",
    '::: {.module-script-lab role="region" aria-label="Item de estudo laboratório R"}',
    sprintf("Objetivo: %s", cinfo$lab_objective %||% sprintf("Rode o script do bloco %s, altere um valor e explique a mudança.", theme)),
    "",
    sprintf("[Script R](../%s){.entry-link aria-label=\"Abrir script R do bloco temático %s\"} · [CSV simulado](../%s){.entry-link aria-label=\"Abrir CSV simulado do bloco temático %s\"}", script_file(i), theme, csv_file(i), theme),
    "",
    sprintf("`%s`", m$r_script),
    "",
    sprintf("**Variação obrigatória:** %s", m$task),
    "",
    sprintf("**Observe:** %s", cinfo$lab_observe %||% "Compare a saída antes e depois de alterar um valor."),
    if (!is.null(pinfo$lab_interpretation)) c("", sprintf("**Interpretação esperada:** %s", pinfo$lab_interpretation)) else character(),
    ":::",
    "",
    "```r",
    pinfo$r_preview %||% m$r_script,
    "```",
    ":::",
    "",
    '::: {.study-step role="region" aria-label="Item de estudo: interpretação e quiz"}',
    "## Interpretação e quiz {#item-quiz}",
    "",
    sprintf("Interpretação prática: %s", cinfo$quiz_focus %||% m$animal_example),
    "",
    if (!is.null(pinfo$decision_prompt)) c(sprintf("**Decisão guiada:** %s", pinfo$decision_prompt), "") else character(),
    sprintf("**Evidência mínima:** %s", m$completion_evidence),
    "",
    sprintf("**Antes do quiz:** %s", m$checkpoint),
    "",
    sprintf('::: {.quiz-container data-module="%s"}', n),
    ":::",
    "",
    sprintf("Depois, avance para %s.", next_text),
    ":::",
    "",
    '<nav class="module-nav" aria-label="Navegação entre blocos temáticos">',
    if (i > 1) sprintf('<a class="btn btn-secondary" href="%s" aria-label="Voltar para %s">%s</a>', prev_href, prev_text, prev_text) else character(),
    '<a class="btn btn-secondary module-nav-index" href="index.html" aria-label="Voltar à página do curso">Curso</a>',
    sprintf('<a class="btn btn-primary" href="%s" aria-label="Avançar para %s">%s</a>', next_href, next_text, next_text),
    "</nav>",
    "</div>",
    "</div>"
  ))
  c(
    "---",
    sprintf('title: "Bloco temático %s — %s"', theme, m$title),
    sprintf('subtitle: "%s"', module_title),
    "page-layout: full",
    "toc: true",
    "number-sections: true",
    "---",
    "",
    sprintf('<div class="module-orientation" aria-label="Localização na hierarquia do curso">'),
    sprintf("<strong>Curso: Melhoramento genético animal · %s · Bloco temático %s</strong>", module_title, theme),
    sprintf("<span>Tempo estimado: %s</span>", m$estimated_time),
    "<span>Status: atual</span>",
    "</div>",
    "",
    '```{=html}',
    sprintf('<section class="module-study-toolbar" data-study-toolbar data-module-id="%s" data-next-href="%s" aria-label="Progresso e continuidade do bloco temático">', current_module_id, next_href),
    '<div class="module-study-toolbar-copy">',
    sprintf('<strong>Bloco temático %s</strong>', theme),
    '<span data-study-current>Próximo: leitura inicial</span>',
    '</div>',
    '<div class="module-study-toolbar-progress" aria-label="Progresso do bloco">',
    '<span data-study-count>0/5 itens</span>',
    '<div class="module-study-toolbar-track"><i data-study-fill style="width:0%"></i></div>',
    '</div>',
    '<div class="module-study-toolbar-actions">',
    '<button class="btn btn-secondary" type="button" data-complete-item>Marcar item atual</button>',
    '<a class="btn btn-primary" href="#item-leitura-pergunta" data-next-study-link>Próximo item</a>',
    '</div>',
    '</section>',
    '```',
    "",
    '::: {.module-reading-rhythm role="note" aria-label="Próximo item de estudo"}',
    "**Próximo item de estudo**",
    "",
    "Siga a lista abaixo: leitura, exercício, laboratório, quiz e interpretação prática.",
    ":::",
    "",
    study_item_lines(i),
    "",
    '<a class="module-glossary-fab" href="#module-glossary" aria-label="Abrir glossário rápido deste bloco">Glossário</a>',
    '<div id="module-glossary" class="module-glossary-support" role="region" aria-label="Consulta rápida ao glossário técnico">',
    '<details class="module-glossary-details">',
    '<summary>Glossário rápido</summary>',
    '<p>Consulte termos essenciais sem sair do bloco temático.</p>',
    '<div data-glossary></div>',
    '</details>',
    '</div>',
    "",
    '::: {.module-session-plan role="region" aria-label="Resumo do bloco temático"}',
    '::: {.module-session-plan-grid role="list" aria-label="Informações do bloco temático"}',
    '::: {.module-session-plan-item role="listitem"}',
    "**Pergunta**",
    "",
    m$feynman_question,
    ":::",
    "",
    '::: {.module-session-plan-item role="listitem"}',
    "**Objetivo**",
    "",
    m$objective,
    ":::",
    "",
    '::: {.module-session-plan-item role="listitem"}',
    "**Pré-requisitos**",
    "",
    m$prerequisites,
    ":::",
    ":::",
    ":::",
    "",
    phase_start,
    "## Leitura: pergunta simples {#item-leitura-pergunta}",
    "",
    m$feynman_question,
    "",
    "## Leitura: explicação intuitiva",
    "",
    sprintf("Pense assim: %s", m$analogy),
    "",
    "Antes do jargão, a ideia é observar uma diferença real entre animais e perguntar qual parte dessa diferença pode orientar uma decisão de seleção, acasalamento ou manejo.",
    "",
    "## Leitura: conceito técnico {#item-leitura-conceito}",
    "",
    m$objective,
    "",
    "Tópicos principais:",
    "",
    topics,
    "",
    '::: {.module-technical-scan role="region" aria-label="Como ler fórmulas, código e tabelas do bloco temático"}',
    '::: {.module-technical-scan-grid role="list" aria-label="Passagens de leitura técnica do bloco temático"}',
    '::: {.module-technical-scan-item role="listitem"}',
    "**Fórmula ou regra**",
    "",
    m$manual_calculation,
    ":::",
    "",
    '::: {.module-technical-scan-item role="listitem"}',
    "**Exemplo animal**",
    "",
    m$animal_example,
    ":::",
    "",
    '::: {.module-technical-scan-item role="listitem"}',
    "**Visual sugerido**",
    "",
    m$suggested_visual,
    ":::",
    ":::",
    ":::",
    "",
    "## Exercício: exemplo numérico pequeno {#item-exercicio}",
    "",
    sprintf("Use este cálculo manual como primeira checagem: **%s**", m$manual_calculation),
    "",
    "A pergunta prática é menos “qual número apareceu?” e mais “esse número muda qual decisão sobre animais?”.",
    "",
    "## Laboratório: script R {#item-laboratorio}",
    "",
    '::: {.module-script-lab role="region" aria-label="Item de estudo laboratório R"}',
    '::: {.module-script-lab-copy}',
    sprintf("Use o script para reproduzir a ideia central do bloco temático %s. A evidência mínima é rodar o exemplo, alterar um valor e explicar a mudança.", theme),
    ":::",
    "",
    '::: {.module-script-lab-grid role="list" aria-label="Como reproduzir o laboratório R"}',
    '::: {.module-script-lab-item role="listitem"}',
    "**Script completo**",
    "",
    sprintf("[Abrir `modulo%s.R`](../%s){.entry-link aria-label=\"Abrir o script R completo do bloco temático %s\"}", n, script_file(i), theme),
    ":::",
    "",
    '::: {.module-script-lab-item role="listitem"}',
    "**Dados simulados**",
    "",
    sprintf("[Ver CSV simulado](../%s){.entry-link aria-label=\"Abrir o CSV simulado do bloco temático %s\"}", csv_file(i), theme),
    ":::",
    "",
    '::: {.module-script-lab-item role="listitem"}',
    "**Comando mínimo**",
    "",
    sprintf("`%s`", m$r_script),
    ":::",
    "",
    '::: {.module-script-lab-item role="listitem"}',
    "**Variação obrigatória**",
    "",
    m$task,
    ":::",
    ":::",
    ":::",
    "",
    "```r",
    m$r_script,
    "```",
    "",
    "## Interpretação biológica",
    "",
    sprintf("No contexto de melhoramento animal, este bloco temático ajuda a interpretar: %s", m$animal_example),
    "",
    '::: {.module-evidence-path role="note" aria-label="Caminho de evidência do bloco temático"}',
    "**Caminho de evidência**",
    "",
    "Conecte pergunta, cálculo, script e decisão. Se uma dessas partes ficar solta, volte antes do quiz.",
    ":::",
    "",
    '::: {.module-practice-contract role="note" aria-label="Contrato prático do bloco temático"}',
    "**Evidência mínima deste bloco temático**",
    "",
    m$completion_evidence,
    ":::",
    "",
    "## Quiz: verificação de conhecimento {#item-quiz}",
    "",
    '::: {.module-study-checkpoint role="note" aria-label="Checkpoint de estudo antes do quiz"}',
    "**Antes do quiz**",
    "",
    m$checkpoint,
    ":::",
    "",
    sprintf('::: {.quiz-container data-module="%s"}', n),
    ":::",
    "",
    '::: {.module-after-quiz role="note" aria-label="Próximo passo depois do quiz"}',
    "**Depois do quiz**",
    "",
    sprintf("Se o resultado estiver consistente, avance para %s. Se não estiver, refaça o cálculo e o script mínimo.", next_text),
    ":::",
    "",
    '::: {.module-takeaways role="note" aria-label="Resumo técnico do bloco temático"}',
    "**Takeaways**",
    "",
    sprintf("- Pergunta central: %s", m$feynman_question),
    sprintf("- Conceito aplicado: %s", m$objective),
    sprintf("- Saída esperada: %s", m$completion_evidence),
    ":::",
    "",
    '::: {.module-close-check role="region" aria-label="Conferência de fechamento do bloco temático"}',
    '::: {.module-close-check-grid role="list" aria-label="Critérios de fechamento do bloco temático"}',
    '::: {.module-close-check-item role="listitem"}',
    "**Pergunta**",
    "",
    "Respondida com suas palavras.",
    ":::",
    "",
    '::: {.module-close-check-item role="listitem"}',
    "**R**",
    "",
    "Script executado ou reproduzido com alteração pequena.",
    ":::",
    "",
    '::: {.module-close-check-item role="listitem"}',
    "**Decisão**",
    "",
    "Interpretação prática registrada.",
    ":::",
    ":::",
    ":::",
    "",
    '::: {.module-return-note role="note" aria-label="Como voltar ao fluxo depois deste bloco temático"}',
    "Use o índice se precisar revisar pré-requisitos ou retomar a sequência por módulo do curso.",
    ":::",
    "",
    '<nav class="module-nav" aria-label="Navegação entre blocos temáticos">',
    if (i > 1) sprintf('<a class="btn btn-secondary" href="%s" aria-label="Voltar para %s">%s</a>', prev_href, prev_text, prev_text) else character(),
    '<a class="btn btn-secondary module-nav-index" href="index.html" aria-label="Voltar à página do curso">Curso</a>',
    sprintf('<a class="btn btn-primary" href="%s" aria-label="Avançar para %s">%s</a>', next_href, next_text, next_text),
    "</nav>"
  )
}

module_items <- lapply(seq_along(mods), function(i) {
  m <- mods[[i]]
  b <- block_for(m$id)
  list(
    id = module_id(i),
    order = i,
    title = m$title,
    card_title = sprintf("Bloco temático %s — %s", theme_label(i), m$title),
    card_summary = m$objective,
    phase_id = b$id,
    phase = course_module_title(b),
    status = "published",
    href = module_file(i),
    script = script_file(i),
    quiz = quiz_file(i),
    previous = if (i == 1) NULL else module_id(i - 1),
    `next` = if (i == length(mods)) "certificate" else module_id(i + 1)
  )
})

phase_items <- lapply(course$blocks, function(b) {
  ids <- vapply(seq_along(mods), function(i) if (mods[[i]]$id %in% b$modules) module_id(i) else NA_character_, character(1))
  ids <- ids[!is.na(ids)]
  list(
    id = b$id,
    order = b$order,
    label = course_module_title(b),
    summary = b$summary,
    index_summary = sprintf("%s organiza %s blocos temáticos para %s", course_module_title(b), length(ids), tolower(b$summary)),
    modules = unname(ids)
  )
})

for (i in seq_along(mods)) {
  writeLines(module_qmd(i), file.path(repo, module_file(i)), useBytes = TRUE)
  writeLines(script_text(i), file.path(repo, script_file(i)), useBytes = TRUE)
  write_json(quiz_obj(i), file.path(repo, quiz_file(i)), auto_unbox = TRUE, pretty = TRUE)
}

for (old in list.files(file.path(repo, "modules"), "^modulo\\d{2}-.*\\.qmd$", full.names = TRUE)) {
  rel <- file.path("modules", basename(old))
  if (!rel %in% vapply(seq_along(mods), module_file, character(1))) unlink(old)
}

manifest_path <- file.path(repo, "data/site-manifest.yml")
manifest <- yaml::read_yaml(manifest_path)
manifest$content_collections$modules$label <- "Blocos temáticos"
manifest$content_collections$modules$item_type <- "thematic-block"
manifest$content_collections$modules$phases <- phase_items
manifest$content_collections$modules$items <- module_items
manifest$navigation$cta$label <- "Começar curso"
manifest$navigation$cta$href <- module_file(1)
for (i in seq_along(manifest$navigation$primary)) {
  if (identical(manifest$navigation$primary[[i]]$id, "modules")) manifest$navigation$primary[[i]]$label <- "Curso"
}
for (i in seq_along(manifest$navigation$footer)) {
  if (identical(manifest$navigation$footer[[i]]$id, "modules")) manifest$navigation$footer[[i]]$label <- "Curso"
}
for (i in seq_along(manifest$content_pages$items)) {
  page <- manifest$content_pages$items[[i]]
  if (identical(page$id, "modules-index")) {
    manifest$content_pages$items[[i]]$title <- "Curso"
    manifest$content_pages$items[[i]]$editable_regions <- c("hero", "course-progress", "course-essentials", "course-module-list", "certificate-route")
  }
  if (identical(page$id, "study-path")) {
    manifest$content_pages$items[[i]]$editable_regions <- c("hero", "route-table-guide")
  }
}
write_yaml(manifest, manifest_path)

quarto_path <- file.path(repo, "_quarto.yml")
quarto <- yaml::read_yaml(quarto_path)
quarto$website$description <- "Curso aberto de melhoramento genético animal para graduação, com 5 módulos, 21 blocos temáticos, itens de estudo e laboratórios R."
quarto$website$`open-graph`$description <- "Melhoramento genético animal para graduação: genética básica, populações, quantitativa, avaliação e genômica com R."
quarto$website$`twitter-card`$description <- quarto$website$`open-graph`$description
for (i in seq_along(quarto$website$navbar$left)) {
  if (identical(quarto$website$navbar$left[[i]]$href, "modules/index.qmd")) quarto$website$navbar$left[[i]]$text <- "Curso"
}
for (i in seq_along(quarto$website$`page-footer`$center)) {
  if (identical(quarto$website$`page-footer`$center[[i]]$href, "modules/index.qmd")) quarto$website$`page-footer`$center[[i]]$text <- "Curso"
}
quarto$website$navbar$right[[1]]$href <- module_file(1)
quarto$website$navbar$right[[1]]$text <- "Começar curso"
quarto$website$sidebar$contents[[1]]$section <- "Curso"
quarto$website$sidebar$contents[[1]]$contents <- c("modules/index.qmd", vapply(seq_along(mods), module_file, character(1)))
write_yaml(quarto, quarto_path)
quarto_text <- readLines(quarto_path, warn = FALSE)
quarto_text <- gsub(": yes$", ": true", quarto_text)
quarto_text <- gsub(": no$", ": false", quarto_text)
writeLines(quarto_text, quarto_path, useBytes = TRUE)

module_index <- c(
  "---",
  'title: "Curso"',
  'subtitle: "Trilha de graduação em melhoramento genético animal"',
  'description: "Curso MGenética organizado em 5 módulos, 21 blocos temáticos e itens de estudo."',
  "page-layout: full",
  "toc: false",
  "sidebar: false",
  "number-sections: false",
  "---",
  "",
  '```{=html}',
  '<section class="modules-landing">',
  '  <div class="modules-landing-copy">',
  '    <span class="module-badge">CURSO</span>',
  '    <h1>Melhoramento genético animal</h1>',
  '    <p>5 módulos, 21 blocos temáticos e itens de estudo com leitura, exercício, laboratório R e quiz.</p>',
  '    <div class="modules-landing-actions" role="navigation" aria-label="Ações principais da página do curso">',
  sprintf('      <a class="btn btn-primary" href="%s" aria-label="Começar curso pelo primeiro bloco temático">Começar curso</a>', basename(module_html_file(1))),
  '      <a class="btn btn-secondary" href="#sequencia-de-estudo" aria-label="Ver sequência de estudo">Ver sequência</a>',
  '      <a class="btn btn-secondary" href="../certificado.html" aria-label="Ver certificado de conclusão">Certificado</a>',
  '    </div>',
  '  </div>',
  '  <div class="modules-landing-panel course-progress-card" role="region" aria-label="Resumo e progresso da trilha" data-course-progress-card>',
  '    <strong>Continue estudo</strong>',
  '    <span data-course-progress-summary>0/21 blocos temáticos concluídos</span>',
  '    <div class="course-progress-track" aria-hidden="true"><i data-course-progress-fill style="width:0%"></i></div>',
  sprintf('    <a class="btn btn-primary" href="%s" data-course-continue aria-label="Continuar estudo pelo próximo bloco temático">Começar curso</a>', basename(module_html_file(1))),
  '    <span class="course-progress-hint">Leitura, exercício, laboratório R e quiz em cada bloco.</span>',
  '  </div>',
  '</section>',
  '```',
  "",
  '::: {.course-nav-tabs role="navigation" aria-label="Seções principais da página do curso"}',
  '[Sobre](#sobre-o-curso){.course-nav-tab}',
  '[Habilidades](#habilidades-que-voce-tera){.course-nav-tab}',
  '[Sequência](#sequencia-de-estudo){.course-nav-tab}',
  '[Módulos](#modulos-do-curso){.course-nav-tab}',
  '[Busca](../busca.qmd){.course-nav-tab aria-label="Abrir busca"}',
  '[Avaliação](../avaliacao.qmd){.course-nav-tab aria-label="Abrir avaliação para certificado"}',
  ':::',
  "",
  "## Sobre o curso",
  "",
  '::: {.course-about role="region" aria-label="Informações principais do curso MGenética"}',
  '::: {.course-about-copy}',
  "Trilha de graduação em melhoramento genético animal. A ordem vai de genética básica a genômica aplicada.",
  "",
  "Use esta página para escolher módulo, abrir um bloco temático e continuar pelo próximo item de estudo.",
  ":::",
  "",
  '::: {.course-about-grid role="list" aria-label="O que você vai aprender no curso"}',
  '::: {.course-about-item role="listitem"}',
  "**Ler variação animal**",
  "",
  "Separar fenótipo, genótipo e ambiente antes de interpretar mérito genético.",
  ":::",
  "",
  '::: {.course-about-item role="listitem"}',
  "**Calcular parâmetros**",
  "",
  "Interpretar frequências, variâncias, herdabilidade, correlações e ganho genético.",
  ":::",
  "",
  '::: {.course-about-item role="listitem"}',
  "**Executar R com propósito**",
  "",
  "Rodar scripts curtos, alterar parâmetros e explicar mudança na saída.",
  ":::",
  "",
  '::: {.course-about-item role="listitem"}',
  "**Fechar decisão técnica**",
  "",
  "Justificar seleção com DEP/EBV, parentesco, BLUP e genômica.",
  ":::",
  ":::",
  ":::",
  "",
  "## Habilidades que você terá",
  "",
  '::: {.course-skills role="region" aria-label="Habilidades desenvolvidas no curso"}',
  '::: {.course-skill-pill}',
  "Genética básica aplicada",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "Genética de populações",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "Genética quantitativa",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "Herdabilidade e repetibilidade",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "Seleção e ganho genético",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "Parentesco e endogamia",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "Cruzamentos e heterose",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "Avaliação genética",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "Modelos mistos e BLUP",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "R para simulação",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "Genômica aplicada",
  ":::",
  "",
  '::: {.course-skill-pill}',
  "Predição genômica",
  ":::",
  ":::",
  "",
  '::: {.course-info-strip role="region" aria-label="Informações rápidas do curso"}',
  '::: {.course-info-item}',
  "**Nível**",
  "",
  "Graduação",
  ":::",
  "",
  '::: {.course-info-item}',
  "**Formato**",
  "",
  "5 módulos, 21 blocos temáticos",
  ":::",
  "",
  '::: {.course-info-item}',
  "**Prática**",
  "",
  "Laboratório R como item de estudo",
  ":::",
  "",
  '::: {.course-info-item}',
  "**Conclusão**",
  "",
  "Quizzes + avaliação final",
  ":::",
  ":::",
  "",
  "## Sequência de estudo",
  "",
  '::: {.course-study-sequence role="list" aria-label="Sequência compacta de estudo por módulo"}'
)
for (p in phase_items) {
  block_modules <- Filter(function(item) item$phase_id == p$id, module_items)
  first_item <- block_modules[[1]]
  last_item <- block_modules[[length(block_modules)]]
  module_range <- if (identical(first_item$id, last_item$id)) {
    sprintf("Bloco temático %s", theme_label(first_item$order))
  } else {
    sprintf("Blocos temáticos %s-%s", theme_label(first_item$order), theme_label(last_item$order))
  }
  module_index <- c(module_index,
    '::: {.course-study-sequence-item role="listitem"}',
    sprintf("**%02d · %s**", p$order, p$label),
    "",
    sprintf("%s · %s", module_range, p$summary),
    "",
    sprintf("[Começar módulo](%s){.entry-link aria-label=\"Começar %s\"}", basename(first_item$href), p$label),
    ":::",
    ""
  )
}
module_index <- c(module_index,
  ":::",
  "",
  "## Módulos do curso"
)
for (p in phase_items) {
  block_modules <- Filter(function(item) item$phase_id == p$id, module_items)
  module_index <- c(module_index,
    "",
    sprintf('::: {.course-block role="region" aria-label="%s"}', p$label),
    '::: {.course-block-header}',
    sprintf("### %s", p$label),
    "",
    p$summary,
    ":::",
    "",
    sprintf('::: {.module-grid role="list" aria-label="Blocos temáticos de %s"}', p$label)
  )
  for (item in block_modules) {
    module_index <- c(module_index,
      '::: {.module-card .thematic-block-card role="listitem"}',
      sprintf("**%s**", sub("^Bloco temático ", "", sub(" —.*$", "", item$card_title))),
      "",
      sprintf("[%s](%s)", item$card_title, basename(item$href)),
      "",
      item$card_summary,
      "",
      study_item_lines(item$order, compact = TRUE),
      ":::",
      ""
    )
  }
  module_index <- c(module_index, ":::", "", ":::")
}
module_index <- c(module_index,
  "",
  '::: {.modules-certificate-route role="region" aria-label="Fechamento da trilha e certificado"}',
  '::: {.modules-certificate-route-copy}',
  "**Conclusão**",
  "",
  "O curso fecha quando os 21 blocos temáticos deixam evidência: leitura feita, cálculo conferido, laboratório rodado, quiz concluído e decisão prática registrada.",
  ":::",
  "",
  '::: {.modules-certificate-route-actions role="navigation" aria-label="Ações para acompanhar conclusão"}',
  "[Abrir certificado](../certificado.qmd){.btn .btn-primary aria-label=\"Abrir a página do certificado\"}",
  "[Revisar sequência](#sequencia-de-estudo){.btn .btn-secondary aria-label=\"Revisar sequência de estudo\"}",
  ":::",
  ":::"
)

module_index <- c(
  "---",
  'title: "Curso"',
  'subtitle: "Trilha de graduação em melhoramento genético animal"',
  'description: "Curso MGenética organizado em 5 módulos, 21 blocos temáticos e itens de estudo."',
  "page-layout: full",
  "toc: false",
  "sidebar: false",
  "number-sections: false",
  "---",
  "",
  '```{=html}',
  '<main class="course-minimal" aria-label="Curso MGenética">',
  '<section class="course-minimal-hero">',
  '<div>',
  '<span class="module-badge">CURSO</span>',
  '<h1>Melhoramento genético animal</h1>',
  '<p>Uma trilha enxuta para estudar melhoramento genético animal: genética, seleção, avaliação genética, R e genômica no mesmo fluxo.</p>',
  '<div class="course-hero-facts" aria-label="Resumo da trilha"><span>5 módulos</span><span>21 blocos</span><span>Laboratório R em cada bloco</span></div>',
  '<div class="course-minimal-actions" role="navigation" aria-label="Ações principais">',
  sprintf('<a class="btn btn-primary" href="%s" aria-label="Começar curso pelo primeiro bloco">Começar curso</a>', basename(module_html_file(1))),
  '<a class="btn btn-secondary" href="#modulos-do-curso" aria-label="Ver módulos do curso">Ver módulos</a>',
  '</div>',
  '</div>',
  '<aside class="course-progress-card course-minimal-progress" role="region" aria-label="Progresso do curso" data-course-progress-card>',
  '<strong>Continuar</strong>',
  '<span data-course-progress-summary>0/21 blocos temáticos concluídos</span>',
  '<div class="course-progress-track" aria-hidden="true"><i data-course-progress-fill style="width:0%"></i></div>',
  sprintf('<a class="btn btn-primary" href="%s" data-course-continue aria-label="Continuar estudo pelo próximo bloco">Começar curso</a>', basename(module_html_file(1))),
  '</aside>',
  '</section>',
  '<section class="course-essentials" aria-label="Sobre e habilidades">',
  '<div><strong>Sobre</strong><p>Progressão de genética básica até genômica aplicada, com pergunta simples, cálculo curto, R e interpretação animal.</p></div>',
  '<div><strong>Habilidades</strong><p>Frequências gênicas, variância, herdabilidade, seleção, parentesco, BLUP, genômica e leitura de resultados em R.</p></div>',
  '</section>',
  '<section id="modulos-do-curso" class="course-module-list" aria-label="Módulos do curso">',
  '<div class="course-module-list-head"><h2>Módulos do curso</h2><p>Abra um módulo, escolha o próximo bloco e continue a sequência.</p></div>'
)
for (p in phase_items) {
  block_modules <- Filter(function(item) item$phase_id == p$id, module_items)
  module_index <- c(module_index,
    sprintf('<details class="course-module" %s>', if (p$order == 1) "open" else ""),
    sprintf('<summary><span>%s</span><small>%s blocos</small></summary>', html_escape(p$label), length(block_modules)),
    sprintf('<p>%s</p>', html_escape(p$summary)),
    '<div class="course-block-list" role="list">'
  )
  for (item in block_modules) {
    module_index <- c(module_index,
      sprintf('<a class="course-block-row" role="listitem" href="%s">', basename(module_html_file(item$order))),
      sprintf('<span class="course-block-index">%s</span>', html_escape(theme_label(item$order))),
      '<span class="course-block-main">',
      sprintf('<strong>%s</strong>', html_escape(item$title)),
      sprintf('<em>%s</em>', html_escape(item$card_summary)),
      '</span>',
      '<span class="course-block-meta"><strong>70 min</strong><em>5 itens</em></span>',
      '<span class="course-block-action">Estudar</span>',
      '</a>'
    )
  }
  module_index <- c(module_index, '</div>', '</details>')
}
module_index <- c(module_index,
  '</section>',
  '<section class="course-final-action" aria-label="Conclusão do curso">',
  '<strong>Fechamento</strong>',
  '<p>Conclua os blocos, faça a avaliação final e emita o certificado.</p>',
  '<a class="btn btn-secondary" href="../avaliacao.html">Avaliação final</a>',
  '</section>',
  '</main>',
  '```'
)
writeLines(module_index, file.path(repo, "modules/index.qmd"), useBytes = TRUE)

route <- c(
  "---",
  'title: "Roteiro incorporado"',
  'subtitle: "A sequência de estudo agora fica na página do curso"',
  "page-layout: full",
  "toc: false",
  "sidebar: false",
  "number-sections: false",
  "---",
  "",
  '::: {.page-hero}',
  '::: {.page-hero-copy}',
  "# Roteiro agora está na página do curso",
  "",
  "Para reduzir repetição, a sequência de estudo foi consolidada na página do curso.",
  ":::",
  "",
  '::: {.page-hero-aside}',
  "**Página mantida**",
  "",
  "Este endereço continua ativo para links antigos.",
  ":::",
  ":::",
  "",
  '::: {.route-table-guide role="region" aria-label="Roteiro consolidado na página do curso"}',
  "**Use a página do curso como roteiro**",
  "",
  "Módulos, blocos temáticos e itens de estudo ficam juntos em um único fluxo. Esta página só preserva links antigos.",
  "",
  sprintf("[Ir para módulos do curso](../modules/index.qmd#modulos-do-curso){.btn .btn-primary aria-label=\"Abrir módulos na página do curso\"}"),
  "[Começar curso](../modules/modulo01-revis-ao-de-gen-etica-b-asica.qmd){.btn .btn-secondary aria-label=\"Começar curso pelo primeiro bloco temático\"}",
  ":::"
)
writeLines(route, file.path(repo, "semanas/index.qmd"), useBytes = TRUE)

progress_path <- file.path(repo, "assets/js/progress.js")
progress <- readLines(progress_path, warn = FALSE)
start <- grep("^  const MODULES = \\[", progress)
end <- start + which(grepl("^  \\];", progress[start:length(progress)]))[1] - 1
new_modules <- c("  const MODULES = [", paste0("    '", vapply(seq_along(mods), module_id, character(1)), "'", collapse = ",\n"), "  ];")
progress <- c(progress[seq_len(start - 1)], new_modules, progress[(end + 1):length(progress)])
progress <- gsub("0/12", sprintf("0/%d", length(mods)), progress, fixed = TRUE)
writeLines(progress, progress_path, useBytes = TRUE)

interactives_path <- file.path(repo, "assets/js/interactives.js")
inter <- readLines(interactives_path, warn = FALSE)
start <- grep("^  var MODULES = \\[", inter)
end <- start + which(grepl("^  \\];", inter[start:length(inter)]))[1] - 1
module_rows <- vapply(seq_along(mods), function(i) {
  sprintf("    ['%02d', %s, %s]", i, q(mods[[i]]$id), q(block_for(mods[[i]]$id)$title))
}, character(1))
inter <- c(inter[seq_len(start - 1)], "  var MODULES = [", paste(module_rows, collapse = ",\n"), "  ];", inter[(end + 1):length(inter)])
start <- grep("^  var MODULE_LINKS = \\[", inter)
end <- start + which(grepl("^  \\];", inter[start:length(inter)]))[1] - 1
link_rows <- vapply(seq_along(mods), function(i) sprintf("    '%s'", basename(module_file(i))), character(1))
inter <- c(inter[seq_len(start - 1)], "  var MODULE_LINKS = [", paste(link_rows, collapse = ",\n"), "  ];", inter[(end + 1):length(inter)])
start <- grep("^    var items = \\[", inter)
if (length(start) == 1) {
  end <- start + which(grepl("^    \\];", inter[start:length(inter)]))[1] - 1
  glossary_rows <- vapply(glossary_items, function(item) {
    sprintf("      [%s, %s]", q(item$term), q(item$definition))
  }, character(1))
  inter <- c(inter[seq_len(start - 1)], "    var items = [", paste(glossary_rows, collapse = ",\n"), "    ];", inter[(end + 1):length(inter)])
}
writeLines(inter, interactives_path, useBytes = TRUE)

cert_path <- file.path(repo, "certificado.qmd")
cert <- readLines(cert_path, warn = FALSE)
cert <- gsub("12 módulos", "21 blocos temáticos", cert, fixed = TRUE)
cert <- gsub("21 módulos", "21 blocos temáticos", cert, fixed = TRUE)
cert <- gsub("todos os 12 módulos", "todos os 21 blocos temáticos", cert, fixed = TRUE)
cert <- gsub("todos os 21 módulos", "todos os 21 blocos temáticos", cert, fixed = TRUE)
cert <- gsub("composto de 12 módulos", "composto de 21 blocos temáticos", cert, fixed = TRUE)
cert <- gsub("composto de 21 módulos", "composto de 21 blocos temáticos", cert, fixed = TRUE)
cert <- gsub("36 horas", "52 horas", cert, fixed = TRUE)
cert <- gsub("modules/modulo01-introducao-ao-melhoramento-animal.html", sub("\\.qmd$", ".html", module_file(1)), cert, fixed = TRUE)
writeLines(cert, cert_path, useBytes = TRUE)

message("undergrad redesign generated")
