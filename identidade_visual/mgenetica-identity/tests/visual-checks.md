# Visual Checks — MGenética Identity

Rodar este checklist manualmente antes de qualquer entrega ou merge.

---

## 1. Rendering

- [ ] Abre sem erros no console (Chrome DevTools)
- [ ] Abre sem erros no Firefox
- [ ] Nenhuma imagem quebrada (ícone 404, logo ausente)
- [ ] Fontes carregam corretamente (Lora + DM Sans visíveis)
- [ ] Fallback de fonte funciona sem internet (testar em modo offline)

## 2. Layout

- [ ] Sem overflow horizontal em 375px (iPhone SE)
- [ ] Sem overflow horizontal em 768px (tablet)
- [ ] Grid de cards colapsa corretamente em mobile
- [ ] Hero oculta o logo-panel em mobile (não empilha de forma estranha)
- [ ] Seção de paleta: chips visíveis e não cortados em 375px

## 3. Tipografia

- [ ] Hero h1 usa Lora 600 (não DM Sans)
- [ ] Captions estão em Lora italic
- [ ] Nenhum texto abaixo de 11px
- [ ] Badges em uppercase com letter-spacing visível
- [ ] Nenhuma fonte em hard-code fora das variáveis `--font-*`

## 4. Cores

- [ ] Nenhuma cor em hard-code fora de `tokens.css` (exceto SVG inline)
- [ ] Texto sobre fundo navy é white ou rgba(255,255,255,...)
- [ ] Cyan não aparece como fundo de seção inteira (exceto CTA — permitido)
- [ ] Badges cyan têm texto `#005f7a`, não preto

## 5. Acessibilidade básica

- [ ] Todos os `<img>` têm `alt` descritivo
- [ ] Todos os `<a>` têm texto visível ou `aria-label`
- [ ] SVGs decorativos têm `aria-hidden="true"`
- [ ] SVGs informativos têm `role="img"` + `<title>`
- [ ] Contraste Navy (#0A1F38) sobre White (#FFFFFF): passa WCAG AA (ratio ~15:1) ✓
- [ ] Contraste Cyan (#00A8D6) sobre Navy (#0A1F38): verificar (ratio ~3.5:1 — borderline AA para texto grande)
- [ ] Contraste Muted (#5A7391) sobre White: verificar (ratio ~4.6:1 — passa AA)

## 6. Links e navegação

- [ ] Links com `href="#"` são placeholders — sinalizar no código com comentário `<!-- TODO -->`
- [ ] Âncoras internas (`#servicos`, `#paleta`) funcionam
- [ ] `scroll-behavior: smooth` ativo

## 7. Tokens

- [ ] `tokens.css` importado antes de `components.css` em toda nova página
- [ ] Nenhuma variável `--mg-*` duplicada entre arquivos
- [ ] Novos componentes usam prefixo `.mg-` e padrão BEM

---

## Resultado

| Data | Versão | Responsável | Resultado |
|------|--------|-------------|-----------|
| | 1.0 — brand preview | | |
