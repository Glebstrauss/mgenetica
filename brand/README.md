# Identidade Visual MGenética

Este diretório é a fonte versionável do pacote inicial de identidade visual da MGenética. Como `docs/` é output gerado pelo Quarto, estes arquivos ficam em `brand/` para não alterar páginas publicadas, rotas existentes ou configuração global do site.

## Arquivos

- `01-auditoria-visual.md`: leitura dos materiais em `identidade_visual/`, logo e sistema visual existente do site.
- `02-estrategia-de-marca.md`: posicionamento, públicos, personalidade e tom.
- `03-direcao-visual.md`: conceito estético, paletas, tipografia, iconografia, gráficos e regras de uso.
- `04-design-system.md`: tokens, componentes e regras de responsividade/acessibilidade.
- `05-guia-de-implementacao.md`: como aplicar o pacote no site e em materiais externos.
- `06-aplicacoes-praticas.md`: exemplos HTML implementáveis com as classes CSS do pacote.

## Arquivos técnicos

O projeto atual usa Quarto com SCSS em `styles/`, não uma pasta `src/`. Por isso, os arquivos técnicos foram criados em:

- `styles/brand-tokens.css`
- `styles/brand-system.css`
- `styles/typography.css`
- `styles/components.css`

Para usar em uma página de teste, importe `styles/brand-system.css`. Para integrar ao site público, revisar primeiro `styles/main.scss` e `styles/main-dark.scss`, porque eles já possuem tokens `--mg-*` ativos.
