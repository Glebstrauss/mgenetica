# ADR-001: Template de ciclo de dados para projetos de melhoramento

## Status

Accepted

## Context

Projetos de analise genetica tendem a misturar dados brutos, dados processados, execucao pesada, outputs finais e backups. Isso aumenta custo de disco/nuvem e reduz reprodutibilidade.

## Decision

Criar template parametrizado por `dataset.yml`, com camadas separadas para dados brutos, processados, analises, outputs e work local.

## Rationale

- Configuracao por fonte permite reutilizar fluxo em outros datasets.
- `work_dir` local reduz lixo no Git.
- Manifesto de outputs torna resultado auditavel.
- Template nao carrega dados privados.

## Trade-offs

- Template nao executa BLUPF90 por padrao.
- Cada projeto ainda precisa implementar modulos especificos.
- Validacao inicial usa parser YAML simples, suficiente para chaves planas.

## Consequences

Projetos novos podem herdar estrutura limpa sem herdar 20G+ de historico.
