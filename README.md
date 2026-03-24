# MGenética

Site educacional em **Quarto** para ensino de **Melhoramento Animal**, **Genética Quantitativa** e **Genômica aplicada** com foco em análises com **dados simulados**.

## Objetivo do projeto

O MGenética foi criado para oferecer uma trilha didática, clara e progressiva para estudantes e profissionais que desejam aprender conceitos fundamentais e aplicações práticas em R.

A proposta integra:

1. Fundamentos do melhoramento animal
2. Genética quantitativa aplicada
3. Genômica aplicada
4. Análises práticas com dados simulados

## Estrutura de pastas

```text
mgenetica/
├── _quarto.yml
├── index.qmd
├── README.md
├── modules/
│   ├── modulo01-...qmd
│   ├── ...
│   └── modulo12-...qmd
├── scripts/
│   ├── modulo01.R
│   ├── ...
│   └── modulo12.R
├── data/
│   ├── README.md
│   └── .gitkeep
└── images/
    ├── README.md
    └── .gitkeep
```

## Como editar o site

1. Edite a página inicial em `index.qmd`.
2. Edite os módulos em `modules/`.
3. Ajuste ou adicione análises em R dentro de `scripts/`.
4. Salve conjuntos simulados e materiais auxiliares em `data/`.
5. Coloque figuras, fluxogramas e imagens em `images/`.

## Como gerar e visualizar localmente

Pré-requisito: [Quarto](https://quarto.org/) instalado.

```bash
quarto preview
```

Para renderizar os arquivos finais:

```bash
quarto render
```

A saída está configurada para a pasta `docs/`, facilitando publicação com GitHub Pages.

## Publicação futura no GitHub Pages

1. No GitHub, vá em **Settings > Pages**.
2. Em **Build and deployment**, selecione:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (ou branch desejada)
   - **Folder**: `/docs`
3. Garanta que o site foi renderizado com `quarto render` antes do push final.
4. Atualize em `_quarto.yml`:
   - `site-url`
   - `repo-url`

## Próximos passos sugeridos

- Expandir o conteúdo teórico de cada módulo.
- Adicionar exercícios com diferentes níveis de dificuldade.
- Incluir gráficos e fluxos de análise em `images/`.
- Evoluir dos dados simulados para dados reais em uma etapa futura.
