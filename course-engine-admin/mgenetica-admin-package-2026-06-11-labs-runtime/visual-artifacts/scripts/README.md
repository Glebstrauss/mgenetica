# Scripts de geração — MGenética Visual Artifacts

## Contexto

Os artefatos deste pacote foram gerados por um LLM (Claude, Anthropic) em 2026-05-25,
com base nos textos de `mgenetica-course-texts-2026-05-21/md/`.

Não há pipeline algorítmico que transforma markdown em SVG/HTML automaticamente —
a geração envolveu leitura dos textos, extração de conceitos e composição visual manual.
Os scripts abaixo embeddám esse output e permitem recriar ou modificar os artefatos
sem depender de LLM.

## Arquivos

| Script | Função |
|--------|--------|
| `generate_all.py` | Orquestrador — chama todos os geradores |
| `generate_svgs.py` | Gera os 14 SVGs estáticos (M01–M21) |
| `generate_html.py` | Gera os 7 HTMLs interativos (M03, M04, M09, M10, M15) |
| `generate_meta.py` | Gera README.md, manifest.json e todos os notes.md |

## Uso

```bash
# Recriar todos os artefatos
python scripts/generate_all.py

# Recriar apenas SVGs
python scripts/generate_svgs.py

# Recriar apenas HTMLs interativos
python scripts/generate_html.py

# Recriar apenas metadados (README, manifest, notes)
python scripts/generate_meta.py
```

## Requisitos

Python ≥ 3.9 · sem dependências externas (só stdlib).

## Modificar um artefato

1. Abrir o script correspondente (`generate_svgs.py` ou `generate_html.py`)
2. Localizar a função `generate_M##_nome()`
3. Editar o conteúdo da variável `content`
4. Rodar `python scripts/generate_all.py` para aplicar

## Estrutura esperada ao rodar

```
mgenetica-course-visual-artifacts-2026-05-25/
├── scripts/          ← esta pasta
├── README.md         ← gerado por generate_meta.py
├── manifest.json     ← gerado por generate_meta.py
└── M01_*/
    ├── notes.md      ← gerado por generate_meta.py
    └── *.svg         ← gerado por generate_svgs.py
```
