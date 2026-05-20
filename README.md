# MGenética

MGenética tem dois fronts neste repositório:

- **Site público:** conteúdo editorial/institucional em Quarto, mantido como fonte e publicação manual.
- **Learner app:** experiência autenticada em `frontend/`, construída com Vite + React e Appwrite, publicada no GitHub Pages live root.

Não misture esses fronts. O site não deve virar painel/app administrativo. Hoje o GitHub Pages raiz serve o learner app, enquanto o conteúdo Quarto permanece como fonte editorial/manual.

## Stack

- **Public site source:** Quarto + R + SCSS + JavaScript estático
- **Live app/runtime:** Vite + React + Appwrite + GitHub Pages

Há um `frontend/package.json` para o learner app. O site Quarto na raiz continua sem toolchain Node própria além das checagens e do uso de Pagefind no CI.

## Pré-requisitos

- [Quarto](https://quarto.org/) instalado para preview/build local.
- [R](https://www.r-project.org/) instalado.
- Node.js opcional para o site e necessário para o learner app.

Neste ambiente local atual, `quarto` pode não estar no `PATH`. O workflow do GitHub Pages instala Quarto e executa o render completo no CI.

## Instalar dependências

As dependências R são restauradas pelo `renv`:

```bash
Rscript -e 'renv::restore()'
```

O learner app instala dependências próprias em `frontend/`:

```bash
cd frontend
npm ci
```

## Rodar localmente

Para abrir o preview local do site:

```bash
quarto preview
```

Para rodar o learner app localmente:

```bash
cd frontend
npm run dev
```

## Build

Para renderizar o site estático:

```bash
quarto render
```

A saída Quarto continua sendo gerada em `docs/`, mas o live root atual do GitHub Pages está ocupado pelo learner app empacotado.

Build do learner app:

```bash
cd frontend
npm run build
```

## Validação

Validação completa antes de publicar o site:

```bash
Rscript scripts/prepublish_site_check.R
```

Checks úteis durante desenvolvimento do site:

```bash
Rscript scripts/validate_site_manifest.R
Rscript scripts/run_all_modules.R
node --check assets/js/progress.js
node --check assets/js/i18n.js
node --check assets/js/darkmode.js
node --check assets/js/interactives.js
node --check assets/js/quiz.js
node --check assets/js/teacher-mode.js
git diff --check
```

## Estrutura principal

```text
mgenetica/
├── _quarto.yml                  # Configuração do site Quarto
├── index.qmd                    # Homepage pública
├── plataforma.qmd               # Handoff público para learner app separado
├── modules/                     # 12 módulos do curso
├── semanas/                     # Roteiro de estudo
├── assets/                      # JS e includes HTML
├── styles/                      # SCSS principal e dark mode
├── data/                        # Manifesto do site e dados simulados
├── docs/                        # Saída renderizada do Quarto para revisão/editorial
├── frontend/                    # Learner app React + Appwrite
└── .github/workflows/           # Publicação Pages, Quarto manual e Appwrite
```

## Estado operacional atual

- A URL live `https://mgenetica.github.io/mgenetica/` serve hoje o learner app React publicado na raiz do GitHub Pages.
- O conteúdo Quarto continua como fonte editorial e fluxo manual, sem disputar automaticamente a mesma raiz publicada.
- O backend produtivo continua em Appwrite.
- O painel administrativo depende de:
  - `ADMIN_EMAILS` na função `mgenetica_admin_fn`
  - `APPWRITE_ADMIN_API_KEY` na função `mgenetica_admin_fn` (`APPWRITE_API_KEY` é aceito como fallback)

## Documentação operacional local

Arquivos Markdown de planejamento, tracking e status de operação na raiz do repositório agora são tratados como notas locais e ficam no `.gitignore`. A documentação versionada que continua sendo referência para colaboradores é:

- este `README.md`
- `frontend/README.md`
- `frontend/README-APPWRITE.md`
- `appwrite/README.md`
- READMEs pontuais de subpastas

## Escopo para agentes

- Trabalhe no front correto: site público ou learner app.
- Não trate Quarto e learner app como o mesmo artefato publicado.
- Antes de publicar o site, rode `Rscript scripts/prepublish_site_check.R`.
- Preserve mudanças locais existentes; não reverta arquivos sem pedido explícito.

## Publicação

### Site público

O workflow `.github/workflows/quarto-publish.yml` ficou manual. Ele não deve mais disputar automaticamente a raiz do GitHub Pages com o learner app.

Fluxo:
1. Instalar R
2. Instalar Quarto
3. Configurar Node.js
4. Rodar `Rscript scripts/prepublish_site_check.R` com `SKIP_QUARTO_RENDER=1`
5. Renderizar com Quarto
6. Indexar com Pagefind
7. Gerar artefato Quarto para revisão/publicação manual

### Learner app

O learner app live é publicado hoje no GitHub Pages root e fala com o Appwrite em produção.

Checklist operacional atual:
- manter `APPWRITE_API_KEY` e `APPWRITE_PROJECT_ID` para deploy das funções
- registrar `https://mgenetica.github.io/mgenetica/` em Appwrite Web Platforms
- configurar `ADMIN_EMAILS` e `APPWRITE_ADMIN_API_KEY` na função `mgenetica_admin_fn` para habilitar resumo administrativo real
