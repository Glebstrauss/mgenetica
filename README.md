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

Pré-requisitos:

- [Quarto](https://quarto.org/) instalado.
- [R](https://www.r-project.org/) instalado para executar os scripts práticos.

```bash
quarto preview
```

Para renderizar os arquivos finais:

```bash
quarto render
```

A saída está configurada para a pasta `docs/`, facilitando publicação com GitHub Pages.

## Como validar os scripts em R

Para executar todos os scripts dos módulos a partir da raiz do projeto:

```bash
Rscript scripts/run_all_modules.R
```

Os arquivos `data/modulo*_simulado.csv` são saídas geradas automaticamente pelos scripts e não precisam ser versionados.

## Publicação no GitHub Pages

O repositório já inclui o workflow `.github/workflows/quarto-publish.yml`, que renderiza o site e publica no GitHub Pages quando há push na branch `main`.

No GitHub, vá em **Settings > Pages** e selecione:

- **Source**: GitHub Actions

Os links públicos do site e do repositório ficam configurados em `_quarto.yml`.

## Próximos passos sugeridos

- Expandir o conteúdo teórico de cada módulo.
- Adicionar exercícios com diferentes níveis de dificuldade.
- Incluir gráficos e fluxos de análise em `images/`.
- Evoluir dos dados simulados para dados reais em uma etapa futura.
