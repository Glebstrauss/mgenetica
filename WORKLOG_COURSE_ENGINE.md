# WORKLOG_COURSE_ENGINE.md

## 2026-06-11

### Feito

- Rebase da PR `docs/course-engine-integration` sobre `codex/mgenetica-current-site-consultoria`.
- Resolvido conflito antigo de `AGENTS.md` mantendo `frontend/` como fonte vigente do site e isolando regras do course-engine.
- Alterada base da PR #7 para `codex/mgenetica-current-site-consultoria`, removendo diff duplicado contra `main`.
- Simulado merge da PR #7 com a PR #10 atualizada; sem conflitos nas duas ordens.

### Não feito

- Nenhum merge na `main`.
- Nenhuma publicação do site.
- Nenhuma alteração no pacote de labs.

### Validação local

- `npm ci` em `frontend/` e `backend/`.
- `npm test` em `frontend/`: 6 testes aprovados.
- `npm run build` em `frontend/`: build Vite aprovado.
- `npm test` em `backend/`: 3 testes aprovados.
- Varredura de termos legados do site antigo: sem ocorrências.

## 2026-05-20

### Feito

- Criado branch `docs/course-engine-integration` a partir de `origin/main`.
- Adicionado `course-engine` como submodule em `engine/`.
- Fixado submodule no commit `3386774`.
- Adicionada documentação operacional em `documentation/course-engine/`.
- Atualizado `AGENTS.md` com regras específicas para trabalho de course-engine.
- Criado `NEXT_COURSE_ENGINE.md` para orientar o próximo bloco.
- Criado `course.yml` real do MGenética com 5 módulos e 21 blocos.
- Criado `referencias.yml` canônico.
- Criados perfis `prompts/agents/falconer.md`, `prompts/critics/didactic.md` e `prompts/gates/quality.md`.
- Criados scripts `scripts/read_falconer.py` e `scripts/index_falconer.py`.
- Criada saída piloto M1 em Markdown e DOCX.
- Criados manifestos sanitizados de fontes/auditoria para M1.
- Adicionada política `.gitignore` para não versionar PDFs, DuckDB e prompts com chunks.

### Não feito

- Nenhum merge na `main`.
- Nenhuma publicação do site.
- Nenhuma alteração na UI.
- Nenhum PDF, DuckDB ou chunk recuperado foi versionado.

### Validação local

- `python3 engine/scripts/validate.py --curso .`
- `python3 scripts/read_falconer.py --db referencias/falconer.duckdb --topicos "DNA gene alelo genótipo fenótipo segregação" --max 2 --formato json`
- `python3 engine/scripts/generate.py --curso . --unidade M1 --stage writer`
- `python3 engine/scripts/evaluate_content.py --curso . --unidade M1 --input modulos/M1_revisao_de_genetica_basica.revision.md`
- `python3 engine/scripts/to_docx.py --input modulos/M1_revisao_de_genetica_basica.revision.md`
- `Rscript --vanilla /private/tmp/mgenetica-m1-r-test.R`
