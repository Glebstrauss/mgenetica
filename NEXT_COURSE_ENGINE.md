# NEXT_COURSE_ENGINE.md

## Estado atual

Branch: `docs/course-engine-integration`.

Esta branch adiciona o `course-engine` como submodule em `engine/`, inclui a configuração mínima real do MGenética e documenta o fluxo de uso em `documentation/course-engine/`. Não há merge na `main` e não há publicação do site.

## Próximo bloco recomendado

Revisar PR #7 antes de qualquer merge:

1. Conferir `course.yml` com os 5 módulos e 21 blocos.
2. Conferir `referencias.yml` e completar catálogo canônico se necessário.
3. Colocar PDFs/DuckDB reais localmente em `referencias/`, sem versionar.
4. Rodar M2 com o mesmo fluxo de M1.
5. Revisar manualmente o texto antes de mover para o site público.
6. Só mesclar após aprovação humana.

## Limites

- Não alterar UI.
- Não publicar site.
- Não mesclar na `main`.
- Não sobrescrever outputs existentes.
- Não migrar conteúdo público atual sem revisão manual.
