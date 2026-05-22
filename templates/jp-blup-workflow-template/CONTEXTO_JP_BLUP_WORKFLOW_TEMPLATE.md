# Contexto do JP BLUP workflow template

Data: 2026-05-19

## Objetivo

Este template existe para entregar o que o `jp-data-cycle-template` nao entregava: um fluxo funcional completo, com exemplo pequeno, scripts executaveis, validacao e saidas rastreaveis.

Ele resolve a confusao entre:

- esqueleto de organizacao de dados;
- pipeline analitico executavel.

`jp-data-cycle-template` fica como esqueleto. `jp-blup-workflow-template` e exemplo end-to-end.

## O que este template faz

Fluxo completo:

1. Le dados brutos ficticios.
2. Valida colunas obrigatorias.
3. Cria `datafile.txt` e `pedigree.txt` para BLUPF90.
4. Escreve arquivo de parametros `renumf90.par`.
5. Executa engine.
6. Gera logs.
7. Faz parsing de resultados.
8. Cria tabelas finais.
9. Cria manifesto.
10. Cria relatorio.
11. Valida saidas.

## Por que existe engine mock

Ambiente atual nao tem `renumf90`, `airemlf90` ou `blupf90` no `PATH`.

Para manter template testavel no Git e em qualquer maquina, o padrao e:

```yaml
engine: mock
```

Mock gera saidas deterministicas pequenas:

- `variance_components.tsv`;
- `breeding_values.tsv`;
- logs simulando etapas `renumf90`, `airemlf90`, `blupf90`.

Isso testa contrato do fluxo sem fingir resultado cientifico.

## Como usar BLUPF90 real

Quando executaveis existirem, mudar config:

```yaml
engine: blupf90
renumf90_bin: /caminho/renumf90
airemlf90_bin: /caminho/airemlf90
blupf90_bin: /caminho/blupf90
```

O script roda em pasta isolada `work/run/`, com logs:

- `log_renumf90.txt`;
- `log_airemlf90.txt`;
- `log_blupf90.txt`.

Se executavel faltar, fluxo falha com erro claro.

## Limites

Este template nao define metodologia final de artigo.

Ele nao substitui:

- revisao de modelo animal;
- revisao de pedigree real;
- revisao de efeitos fixos;
- conferencias de convergencia;
- decisao sobre herdabilidade final;
- criterio de publicacao.

Ele prova infraestrutura de fluxo.

## Politica de seguranca

- Dados exemplo sao ficticios.
- Outputs gerados ficam ignorados pelo Git.
- `work/` fica ignorado pelo Git.
- Nenhum dado real JP entra aqui.
- Nenhum arquivo de site MGenetica e alterado.
- `NEXT_SITE.md` e `WORKLOG_SITE.md` nao fazem parte deste template.

## Criterio de pronto

Template pronto quando:

- `scripts/run_all.R` roda com `engine: mock`;
- `tests/test_workflow.R` passa;
- saidas obrigatorias existem;
- manifesto existe;
- relatorio existe;
- `git diff --check` limpo.
