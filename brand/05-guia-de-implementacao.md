# Guia de implementação

## Arquivos criados

Fonte versionável:

- `brand/README.md`
- `brand/01-auditoria-visual.md`
- `brand/02-estrategia-de-marca.md`
- `brand/03-direcao-visual.md`
- `brand/04-design-system.md`
- `brand/05-guia-de-implementacao.md`
- `brand/06-aplicacoes-praticas.md`

CSS:

- `styles/brand-tokens.css`
- `styles/brand-system.css`
- `styles/typography.css`
- `styles/components.css`

Decisão de arquitetura: não foi criada pasta `src/styles/`, porque este repositório é um site Quarto e já usa `styles/` como fonte de tema. O pacote ficou isolado para não quebrar o SCSS atual.

## Como usar os tokens

Para prototipar uma página isolada:

```html
<link rel="stylesheet" href="styles/brand-system.css">
```

Para usar apenas tokens:

```css
@import url("brand-tokens.css");

.meu-bloco {
  color: var(--color-text-primary);
  background: var(--color-surface);
  border: var(--border-hairline);
}
```

Os tokens novos usam nomes semânticos (`--color-brand-primary`) e mantêm compatibilidade com os tokens existentes do site (`--mg-navy`, `--mg-blue`, `--mg-cyan`) por fallback.

## Como aplicar no site

Aplicação recomendada em etapas:

1. Revisar visualmente os exemplos em `brand/06-aplicacoes-praticas.md` e o preview isolado em `brand/preview.html`.
2. Escolher uma página piloto: homepage ou `modules/index.qmd`.
3. Importar tokens em `styles/main.scss` ou adicionar `styles/brand-system.css` ao tema Quarto depois de teste.
4. Migrar um componente por vez para classes `.mg-brand-*`.
5. Validar claro/escuro, mobile, foco de teclado e render Quarto.

Não integrar tudo de uma vez. O SCSS atual é grande e tem muitas camadas históricas; a migração deve ser gradual.

## Consistência entre canais

Site:

- Fundo claro como padrão.
- Logo em painel escuro.
- CTA principal escuro.
- Cyan como sinal técnico.

Cursos:

- Estrutura conceito -> exemplo -> código -> interpretação.
- Cards leves, poucos, com hierarquia clara.
- Blocos de laboratório com monospace e notas de interpretação.

Consultoria:

- Azul petróleo e terracota discreta como apoio.
- Mostrar processo, dados necessários e decisão final.
- Evitar promessa vaga de ganho.

Posts de Instagram:

- Usar uma capa simples: título forte, barra cyan, selo MGenética e uma figura técnica.
- Evitar banco de imagens genérico.
- Preferir mini-gráficos e exemplos reais simplificados.

Certificados:

- Fundo branco com faixa navy.
- Acento cobre para marco/conclusão.
- Logo em painel escuro ou assinatura positiva futura.
- Área de verificação com QR/code quando existir.

Apresentações:

- Uma ideia por slide.
- Título curto.
- Gráfico limpo.
- Rodapé com módulo/tema.
- Evitar templates ornamentais.

Documentos técnicos:

- Tipografia legível.
- Tabelas limpas.
- Destaques em cyan/cobre apenas para orientar.
- Figuras com legenda interpretativa.

## Próximas etapas recomendadas

1. Criar variantes vetoriais oficiais da logo MGenética: símbolo, horizontal, positivo, negativo e monocromático.
2. Fazer página piloto de identidade no Quarto, sem publicar.
3. Migrar parte dos tokens de `styles/main.scss` para nomes semânticos, mantendo aliases.
4. Revisar contraste real no navegador em claro/escuro.
5. Criar templates de certificado, capa de aula e post quadrado.
6. Criar biblioteca Figma/Canva com os mesmos tokens e componentes.

## O que depende de ferramenta externa

- Vetorização e variantes oficiais da logo.
- Templates editáveis de Canva/Figma.
- Exportação de certificados em PDF com composição final.
- Banco próprio de imagens de campo, animais, laboratórios e aulas.
- Mockups de Instagram e apresentações.
