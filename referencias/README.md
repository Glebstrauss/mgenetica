# Referências do course-engine

Esta pasta guarda fontes locais usadas pelo `course-engine`.

Arquivos brutos como PDFs e bancos DuckDB ficam fora do Git por padrão:

- `*.pdf`
- `*.duckdb`
- `*.db`
- `*.sqlite`

Motivo: PDFs e índices podem conter material protegido por direito autoral ou dados grandes. O Git versiona o catálogo bibliográfico canônico em `referencias.yml`; os arquivos brutos ficam no ambiente local de geração.

Para reproduzir o teste Falconer local:

1. Copie ou gere `referencias/falconer.duckdb`.
2. Rode:

```bash
python engine/scripts/generate.py --curso . --unidade M1 --stage writer
```

O prompt gerado fica em `modulos/` e não deve ser publicado sem revisão, pois pode conter trechos recuperados.
