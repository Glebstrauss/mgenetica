# MGenética

MGenética tem dois fronts neste repositório:

- **Site público:** camada editorial/institucional em Quarto, publicada no GitHub Pages.
- **Learner app:** experiência autenticada em `frontend/`, construída com Vite + React e Appwrite, publicada separadamente.

Não misture esses fronts. O site não deve virar painel/app administrativo. O learner app não é servido pelo GitHub Pages raiz.

## Stack

- **Public site:** Quarto + R + SCSS + JavaScript estático + GitHub Pages
- **Learner app:** Vite + React + Appwrite + Vercel

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

A saída do site é gerada em `docs/`, usada pelo fluxo de publicação do GitHub Pages.

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
├── docs/                        # Saída renderizada do Quarto
├── frontend/                    # Learner app React + Appwrite
└── .github/workflows/           # Publicação Pages, Vercel e Appwrite
```

## Escopo para agentes

- Trabalhe no front correto: site público ou learner app.
- Não trate GitHub Pages como deploy do learner app.
- Antes de publicar o site, rode `Rscript scripts/prepublish_site_check.R`.
- Preserve mudanças locais existentes; não reverta arquivos sem pedido explícito.

## Publicação

### Site público

O workflow `.github/workflows/quarto-publish.yml` publica no GitHub Pages em push para `main`.

Fluxo:
1. Instalar R
2. Instalar Quarto
3. Configurar Node.js
4. Rodar `Rscript scripts/prepublish_site_check.R` com `SKIP_QUARTO_RENDER=1`
5. Renderizar com Quarto
6. Indexar com Pagefind
7. Publicar no GitHub Pages

### Learner app

O workflow `.github/workflows/deploy-frontend.yml` publica o learner app no Vercel, mas exige:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Sem esses secrets, o learner app não deve ser tratado como live.

Depois do deploy, o host publicado deve ser registrado em Appwrite Web Platforms para login, sessão e execução de funções no navegador.
