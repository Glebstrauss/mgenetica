# NEXT_COURSE_ENGINE.md

## Estado atual

Branch: `docs/course-engine-integration`.

Esta branch adiciona o `course-engine` como submodule em `engine/` e documenta o fluxo de uso no MGenética em `documentation/course-engine/`. Não há merge na `main` e não há publicação do site.

## Próximo bloco recomendado

Preparar a configuração real do curso no MGenética:

1. Criar `course.yml` do MGenética.
2. Criar `referencias.yml` com referências canônicas.
3. Definir pasta `referencias/` ou Biblioteca DuckDB como fonte primária.
4. Criar perfis em `prompts/agents/`, `prompts/critics/` e `prompts/gates/`.
5. Rodar uma geração piloto em branch usando uma unidade pequena.
6. Validar com `engine/scripts/evaluate_content.py`.

## Limites

- Não alterar UI.
- Não publicar site.
- Não mesclar na `main`.
- Não sobrescrever outputs existentes.
- Não migrar conteúdo público atual sem revisão manual.
