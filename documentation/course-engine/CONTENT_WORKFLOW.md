# Fluxo de geração de conteúdo

## Contrato

Pipeline padrão:

```text
Writer -> Critic -> Revision -> Gate
```

Cada etapa gera um artefato separado. Isso mantém revisão, auditoria e repetição do fluxo.

## Configuração no curso

O `course.yml` do MGenética deve declarar:

```yaml
agentes:
  writer:
    profile: prompts/agents/<id>.md
    retrieval: biblioteca
  critic:
    profile: prompts/critics/didactic.md
  gate:
    profile: prompts/gates/quality.md

pipeline_didatico:
  pattern: writer_critic_gate
  target: aula_completa
  max_revision_loops: 1
```

## Etapas

`writer`: produz aula completa usando `course.yml`, modelo didático, referências recuperadas e perfil do agente.

`critic`: aponta falhas didáticas, técnicas, de sequência, referência, R e interpretação biológica.

`revision`: reescreve com base na crítica, preservando escopo, pré-requisitos e referências canônicas.

`gate`: aprova ou reprova por critérios objetivos.

## Regras de saída

- Todo output vai para `modulos/`.
- Nome de arquivo segue `{ID}_{slug}.{stage}.md`.
- Cada geração registra fontes em `.sources.json`.
- Auditoria humana legível fica em `.audit.md`.
- O texto final não mostra hashes, score, caminhos locais ou chunks.
- Script R deve ter no máximo 20 linhas.
- Referências finais devem vir do catálogo canônico do curso.

## Regra de branch

Todo conteúdo novo deve nascer em branch e PR. A `main` fica estável.
