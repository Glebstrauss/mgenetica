# JP data cycle template

Template para reproduzir fluxo de dados de projetos de melhoramento animal sem carregar dados privados.

Objetivo:

```text
dados brutos
  -> dados processados
  -> analises
  -> outputs consolidados
  -> relatorio/publicacao
```

## Principios

- Uma copia por dado bruto.
- Dados brutos nunca editados.
- Cache e execucao pesada fora do Git.
- Resultados consolidados pequenos em TSV/CSV.
- Scripts parametrizados por arquivo de configuracao.
- Dados reais do projeto JP nao entram neste repositorio.

## Estrutura

```text
templates/jp-data-cycle/
├── config/
│   ├── dataset.schema.yml
│   └── example.dataset.yml
├── R/
│   ├── paths.R
│   ├── validate_dataset.R
│   └── consolidate_outputs.R
├── scripts/
│   ├── run_validate.R
│   └── run_consolidate.R
├── docs/
│   ├── ciclo_dados.md
│   └── adr/
└── examples/
    ├── raw/
    ├── processed/
    └── outputs/
```

## Uso

Validar configuracao:

```bash
Rscript templates/jp-data-cycle/scripts/run_validate.R templates/jp-data-cycle/config/example.dataset.yml
```

Consolidar outputs existentes:

```bash
Rscript templates/jp-data-cycle/scripts/run_consolidate.R templates/jp-data-cycle/config/example.dataset.yml
```

## Adaptacao para novo projeto

1. Copiar `config/example.dataset.yml`.
2. Ajustar caminhos de `raw_dir`, `processed_dir`, `analysis_dir`, `outputs_dir`.
3. Criar scripts especificos do projeto fora deste template.
4. Manter outputs consolidados pequenos e rastreaveis.
