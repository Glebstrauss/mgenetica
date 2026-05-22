# JP BLUP workflow template

Template funcional minimo para fluxo completo de avaliacao genetica:

```text
dados brutos ficticios
  -> insumos BLUPF90
  -> arquivo de parametros
  -> engine mock ou BLUPF90 real
  -> parsing de resultados
  -> relatorio/manifesto
  -> validacao
```

## Uso rapido

Rodar exemplo testavel sem executaveis BLUPF90:

```bash
Rscript templates/jp-blup-workflow-template/scripts/run_all.R templates/jp-blup-workflow-template/config/example.workflow.yml
```

Rodar teste:

```bash
Rscript templates/jp-blup-workflow-template/tests/test_workflow.R
```

## Engine

`engine: mock` roda fluxo inteiro com dados ficticios e saidas deterministicas. Serve para testar estrutura, parsing, manifestos e relatorio.

`engine: blupf90` tenta rodar executaveis reais:

- `renumf90`
- `airemlf90`
- `blupf90`

Configure caminhos no YAML:

```yaml
engine: blupf90
renumf90_bin: /caminho/renumf90
airemlf90_bin: /caminho/airemlf90
blupf90_bin: /caminho/blupf90
```

## Aviso

Dados do exemplo sao ficticios. Resultado mock nao e resultado cientifico. Serve para provar fluxo end-to-end.
