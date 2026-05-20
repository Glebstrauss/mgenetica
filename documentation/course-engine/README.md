# Course-engine no MGenética

## Status desta branch

Esta branch adiciona o `course-engine` ao MGenética como submodule em `engine/`, inclui a configuração real mínima do curso e documenta o fluxo operacional. Nada foi mesclado na `main`.

Submodule fixado:

- repositório: `https://github.com/Glebstrauss/course-engine.git`
- commit: `3386774`
- commit message: `docs: prepare course engine for multi-agent use`
- PR do engine: `https://github.com/Glebstrauss/course-engine/pull/1`

## Papel do MGenética

O MGenética é o consumidor do engine. Portanto, ficam neste repositório:

- `course.yml`;
- `referencias.yml`;
- `prompts/agents/falconer.md`;
- `prompts/critics/didactic.md`;
- `prompts/gates/quality.md`;
- scripts de retrieval específicos em `scripts/read_falconer.py` e `scripts/index_falconer.py`;
- saída piloto revisada em `modulos/M1_revisao_de_genetica_basica.revision.md`;
- DOCX piloto em `modulos/M1_revisao_de_genetica_basica.revision.docx`;
- auditoria sanitizada em `modulos/M1_revisao_de_genetica_basica.audit.md`.

O `engine/` fornece scripts, schemas, templates, gates e documentação genérica.

## Limites

- Não altera UI.
- Não publica o site.
- Não substitui o conteúdo público atual automaticamente.
- Não depende de M1, M2 ou qualquer módulo específico.
- Não chama API de IA por conta própria.
- Não sobrescreve outputs sem autorização explícita.
- Não versiona PDFs, DuckDB ou prompts com chunks recuperados.

## Documentos nesta pasta

- `SETUP.md`: como inicializar submodule e preparar o curso.
- `CONTENT_WORKFLOW.md`: fluxo Writer -> Critic -> Revision -> Gate.
- `REFERENCE_POLICY.md`: regra para bibliografia pública e auditoria interna.
- `REVIEW_CHECKLIST.md`: checklist antes de merge.
- `VALIDATION_REPORT.md`: teste executado nesta branch.
