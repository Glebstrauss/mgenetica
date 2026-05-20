# Relatório de validação

Data local: 2026-05-20.

Branch: `docs/course-engine-integration`.

## Arquivos executáveis adicionados

- `course.yml`
- `referencias.yml`
- `prompts/agents/falconer.md`
- `prompts/critics/didactic.md`
- `prompts/gates/quality.md`
- `scripts/read_falconer.py`
- `scripts/index_falconer.py`
- `modulos/M1_revisao_de_genetica_basica.revision.md`
- `modulos/M1_revisao_de_genetica_basica.revision.docx`

## Validações executadas

```bash
python3 engine/scripts/validate.py --curso .
```

Resultado:

```text
✓ course.yml válido — 5 módulo(s), 21 bloco(s)
```

```bash
python3 scripts/read_falconer.py --db referencias/falconer.duckdb --topicos "DNA gene alelo genótipo fenótipo segregação" --max 2 --formato json
```

Resultado: consulta DuckDB executada e retornou trechos Falconer.

```bash
python3 engine/scripts/generate.py --curso . --unidade M1 --stage writer
```

Resultado:

```text
Prompt: modulos/M1_revisao_de_genetica_basica.writer.prompt.md
Concluído. Scripts Python não chamaram API de IA.
```

O prompt gerado ficou ignorado pelo Git porque pode conter chunks recuperados.

```bash
python3 engine/scripts/evaluate_content.py --curso . --unidade M1 --input modulos/M1_revisao_de_genetica_basica.revision.md
```

Resultado:

```text
✓ Conteúdo aprovado pelo gate estático
```

```bash
python3 engine/scripts/to_docx.py --input modulos/M1_revisao_de_genetica_basica.revision.md
```

Resultado:

```text
Salvo: modulos/M1_revisao_de_genetica_basica.revision.docx
```

```bash
Rscript --vanilla /private/tmp/mgenetica-m1-r-test.R
```

Resultado:

```text
  genotipo n proporcao
1       aa 5      0.25
2       Aa 9      0.45
3       AA 6      0.30
```

## Observações

- `referencias/falconer.duckdb` foi usado localmente e fica ignorado pelo Git.
- PDFs, DuckDB e prompts com chunks recuperados não foram versionados.
- Nenhum merge na `main`.
- Nenhuma publicação do site.
- Nenhuma alteração de UI.
