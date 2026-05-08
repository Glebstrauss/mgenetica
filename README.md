# MGenética

Site público e editorial da MGenética para ensino de melhoramento animal, genética quantitativa e genômica aplicada com R, Quarto e dados simulados.

Este repositório é focado no site. Não use este projeto para alterar o app de produtividade ou criar funcionalidades de gerenciamento interno.

## Stack

- **Quarto website** para páginas `.qmd` e publicação estática.
- **R** com dependências gerenciadas por `renv`.
- **SCSS** para os temas claro e escuro.
- **JavaScript estático** para busca, progresso, quizzes e interações.
- **GitHub Pages** via GitHub Actions para publicação.

Não há `package.json`; Node.js é usado apenas para checagens de sintaxe JavaScript e para Pagefind no workflow de publicação.

## Pré-requisitos

- [Quarto](https://quarto.org/) instalado para preview/build local.
- [R](https://www.r-project.org/) instalado.
- Node.js opcional, recomendado para `node --check`.

Neste ambiente local atual, `quarto` pode não estar no `PATH`. O workflow do GitHub Pages instala Quarto e executa o render completo no CI.

## Instalar dependências

As dependências R são restauradas pelo `renv`:

```bash
Rscript -e 'renv::restore()'
```

O arquivo `.Rprofile` ativa `renv/activate.R` automaticamente ao iniciar uma sessão R na raiz do projeto.

## Rodar localmente

Para abrir o preview local do site:

```bash
quarto preview
```

## Build

Para renderizar o site estático:

```bash
quarto render
```

A saída é gerada em `docs/`, que é usada pelo fluxo de publicação do GitHub Pages.

## Validação

Validação completa antes de publicar:

```bash
Rscript scripts/prepublish_site_check.R
```

Checks úteis durante desenvolvimento:

```bash
Rscript scripts/validate_site_manifest.R
Rscript scripts/run_all_modules.R
node --check assets/js/progress.js
node --check assets/js/darkmode.js
node --check assets/js/interactives.js
node --check assets/js/quiz.js
node --check assets/js/teacher-mode.js
git diff --check
```

O script `scripts/prepublish_site_check.R` executa validação de manifesto, YAML, SCSS, JavaScript, scripts R dos módulos e whitespace. Ele roda `quarto render` quando Quarto está disponível no `PATH`; caso contrário, registra o skip local.

## Estrutura principal

```text
mgenetica/
├── _quarto.yml                  # Configuração do site Quarto
├── index.qmd                    # Homepage pública
├── busca.qmd                    # Busca Pagefind
├── glossario.qmd                # Glossário técnico
├── perfil.qmd                   # Página Sobre
├── semanas/                     # Roteiro de estudo
├── modules/                     # 12 módulos do curso
├── scripts/                     # Simulações, validações e prepublish
├── data/                        # Manifesto do site e dados simulados gerados
├── assets/                      # JS e includes HTML
├── styles/                      # SCSS principal e dark mode
├── images/                      # Logo, favicon e imagens públicas
├── quizzes/                     # Dados dos quizzes
├── docs/                        # Saída renderizada do Quarto
├── renv/ e renv.lock            # Ambiente R reproduzível
└── .github/workflows/           # Publicação no GitHub Pages
```

## Desenvolvimento com VS Code

Abra a raiz do repositório no VS Code:

```bash
code .
```

Extensões recomendadas ficam em `.vscode/extensions.json`.

Configurações locais compartilhadas ficam em `.vscode/settings.json`. Elas evitam formatação automática global e reduzem ruído de busca/watch em pastas geradas ou pesadas.

## Escopo para Codex/IA

Ao trabalhar com Codex ou outra IA:

- Trabalhe apenas no site público da MGenética.
- Não altere o app de produtividade neste repositório.
- Não misture evolução do site com gerenciamento interno.
- Não redesenhe, refatore ou crie funcionalidades sem solicitação explícita.
- Antes de publicar, rode `Rscript scripts/prepublish_site_check.R`.
- Preserve mudanças locais existentes; não reverta arquivos sem pedido explícito.

## Publicação

O workflow `.github/workflows/quarto-publish.yml` publica no GitHub Pages em push para `main`.

O fluxo do CI:

1. Instala R.
2. Instala Quarto.
3. Configura Node.js.
4. Roda `Rscript scripts/prepublish_site_check.R` com `SKIP_QUARTO_RENDER=1`.
5. Renderiza o site com Quarto.
6. Indexa com Pagefind.
7. Publica no GitHub Pages.
