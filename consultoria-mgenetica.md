# Projeto Consultoria MGenetica

## Goal

Transformar a consultoria da MGenetica em uma frente B2B clara no site publico, com triagem, pacotes, treinamento institucional e criterios de aceite.

## Tasks

- [x] Criar branch dedicada `codex/mgenetica-consultoria-site` -> Verify: `git status --short --branch` mostra branch nova, sem `main`.
- [x] Criar `consultoria.qmd` com proposta, pacotes, processo, triagem e limites tecnicos -> Verify: pagina tem `consulting-hero`, `consulting-packages`, `consulting-triage`.
- [x] Criar `treinamentos.qmd` com formatos, temas, entregaveis e proposta sob demanda -> Verify: pagina tem `training-hero`, `training-formats`, `training-proposal`.
- [x] Integrar navegacao em `_quarto.yml` e `data/site-manifest.yml` -> Verify: validator compara navbar/footer com manifest sem erro.
- [x] Adicionar faixa de entrada na home para separar aprender vs aplicar -> Verify: `index.qmd` contem `home-application-path`.
- [x] Documentar componentes e regras em `PUBLIC_SITE_COMPONENTS.md`, `WORKLOG_SITE.md` e `NEXT_SITE.md` -> Verify: arquivos citam consultoria, treinamento, sem publicar.
- [x] Adicionar estilos responsivos e dark mode -> Verify: `styles/main.scss` e `styles/main-dark.scss` contem classes novas.
- [x] Validar site sem commit -> Verify: manifest, render/prepublish e `git diff --check` passam.

## Done When

- [x] Site tem rotas publicas para consultoria e treinamentos.
- [x] Home mostra caminho `Aprender` e caminho `Aplicar`.
- [x] Consultoria usa diagnostico pago/triagem antes de projeto maior.
- [x] Treinamento institucional fica separado da consultoria tecnica.
- [x] Projeto fica pronto para commit/PR, sem commit, sem merge e sem publicacao.
