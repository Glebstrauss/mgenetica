# Ciclo de dados

## Camadas

| Camada | Regra |
|---|---|
| `raw_dir` | entrada bruta imutavel |
| `processed_dir` | dados derivados por script |
| `analysis_dir` | resultados pesados ou especificos do motor analitico |
| `outputs_dir` | produtos consolidados pequenos |
| `work_dir` | cache/local/scratch, fora do Git |

## Politica

- Nao copiar pasta grande para reorganizar.
- Nao commitar dado privado em template.
- Nao commitar cache.
- Consolidar outputs em manifesto pequeno.
- Separar fluxo reprodutivel de resultado historico pesado.
