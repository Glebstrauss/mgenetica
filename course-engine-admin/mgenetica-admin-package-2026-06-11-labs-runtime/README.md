# Pacote Admin local MGenetica

Pacote gerado pelo `course-engine` para revisao e integracao controlada no repositorio MGenetica.

Alvo: `https://mgenetica.github.io/mgenetica/`

## Conteudo

- `source/`: `course.yml`, referencias e documentos de estrutura.
- `texts/md/`: textos revision mais recentes por unidade.
- `texts/docx/`: DOCX correspondentes quando existem.
- `interactive/`: labs HTML exportados.
- `labs/dados/`: fontes YAML estruturadas dos labs.
- `admin/`: plano do Admin local.
- `STATUS.json`: cobertura por unidade.
- `MANIFEST.tsv`: inventario com SHA-256.
- `site-ingest.json`: manifesto pronto-para-ingestao (modulo -> rota module-0x + texto + lab + /labs/...).

## Integracao no site (resumo)

1. Copiar `interactive/*.html` -> `frontend/public/labs/` (servidos em `/labs/<arquivo>`).
2. Para cada modulo do `site-ingest.json`, gravar o campo `lab` (= `lab_public_path`) no
   catalogo, casando por `module_route`.
3. Renderizar com um `<iframe src=lab>` na pagina do modulo.

Passo a passo detalhado: `docs/INTEGRACAO_ARTEFATOS_SITE.md`. Nao publica, nao faz merge, nao altera `main`.

## Cobertura

- Unidades: 21
- Textos Markdown: 21
- DOCX: 21
- Labs HTML: 21
- Labs com dados estruturados: 21
- YAML de dados: 21

## Pendencias conhecidas

Labs sem dados estruturados: nenhum.

## Uso

Use este pacote para abrir branch/PR no MGenetica. Ele nao publica, nao faz merge e nao altera `main`.
