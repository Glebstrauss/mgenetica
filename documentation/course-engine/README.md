# Course-engine no MGenética

## Status desta branch

Esta branch adiciona o `course-engine` ao MGenética como submodule em `engine/` e documenta o fluxo operacional. Nada foi mesclado na `main`.

Submodule fixado:

- repositório: `https://github.com/Glebstrauss/course-engine.git`
- commit: `3386774`
- commit message: `docs: prepare course engine for multi-agent use`
- PR do engine: `https://github.com/Glebstrauss/course-engine/pull/1`

## Papel do MGenética

O MGenética é o consumidor do engine. Portanto, ficam neste repositório:

- `course.yml`;
- catálogo canônico de referências;
- PDFs, biblioteca DuckDB ou outro índice de fontes;
- perfis de agentes específicos do curso;
- outputs gerados e revisados;
- auditoria de geração.

O `engine/` fornece scripts, schemas, templates, gates e documentação genérica.

## Limites

- Não altera UI.
- Não publica o site.
- Não substitui o conteúdo público atual automaticamente.
- Não depende de M1, M2 ou qualquer módulo específico.
- Não chama API de IA por conta própria.
- Não sobrescreve outputs sem autorização explícita.

## Documentos nesta pasta

- `SETUP.md`: como inicializar submodule e preparar o curso.
- `CONTENT_WORKFLOW.md`: fluxo Writer -> Critic -> Revision -> Gate.
- `REFERENCE_POLICY.md`: regra para bibliografia pública e auditoria interna.
- `REVIEW_CHECKLIST.md`: checklist antes de merge.
