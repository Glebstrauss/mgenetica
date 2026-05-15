# AGENTS.md — MGenética Identity Project

Instruções para o Claude Codex trabalhar neste projeto de identidade visual.

---

## Contexto do projeto

MGenética é uma empresa brasileira de educação e consultoria em genética animal aplicada (melhoramento genético, genômica, parâmetros populacionais). A identidade visual deve transmitir **rigor científico + clareza aplicada** — sem ser fria ou inacessível.

O público principal são zootecnistas, veterinários, pesquisadores e produtores de médio/grande porte no Brasil.

---

## Estrutura do projeto

```
mgenetica-identity/
├── src/
│   ├── index.html        ← página principal (fonte da verdade visual)
│   ├── tokens.css        ← design tokens (cores, tipografia, espaçamento)
│   └── components.css    ← classes reutilizáveis (prefixo .mg-)
├── assets/
│   ├── images/           ← logo real, fotos (.png, .jpg, .webp)
│   └── icons/            ← ícones SVG isolados (helix, DNA, etc.)
├── docs/
│   └── brand-guide.md    ← guia de uso da identidade (a gerar)
├── tests/
│   └── visual-checks.md  ← checklist de revisão visual (a gerar)
└── AGENTS.md             ← este arquivo
```

---

## Fonte da verdade

- **`src/tokens.css`** é a fonte da verdade para todos os valores de design (cores, fontes, espaçamento). Nenhuma cor ou tamanho deve ser escrito em hard-code em outro arquivo — sempre referenciar variáveis CSS.
- **`src/index.html`** é a referência visual completa. Qualquer nova página ou componente deve ser consistente com ela.
- **`src/components.css`** contém as classes reutilizáveis com prefixo `.mg-`. Ao criar novos componentes, seguir o mesmo padrão de nomenclatura (`mg-[bloco]__[elemento]--[modificador]`).

---

## Convenções de código

### HTML
- `lang="pt-BR"` em todo documento
- Fontes carregadas via Google Fonts: `Lora` (display) + `DM Sans` (corpo)
- Sempre importar `tokens.css` antes de `components.css` antes de estilos de página
- Semântica: `<section>`, `<article>`, `<nav>`, `<footer>` — não `<div>` genérico para blocos de conteúdo
- Imagens: sempre com `alt` descritivo; fallback SVG inline para logo

### CSS
- Prefixo `.mg-` em todas as classes de componentes
- Nunca escrever cores em hard-code — usar variáveis de `tokens.css`
- Nomenclatura BEM: `.mg-card`, `.mg-card__icon`, `.mg-card--featured`
- Mobile-first: estilos base para ≤768px, overrides com `@media (min-width: 769px)`
- Sem `!important`

### Tipografia
| Uso | Família | Peso |
|-----|---------|------|
| Hero h1, títulos de seção | Lora | 600 |
| Subtítulos, captions | Lora | 400 italic |
| Body, UI, badges | DM Sans | 400 / 500 |
| Hexes, código R | DM Mono | 400 |

---

## Paleta de cores

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-navy` | `#0A1F38` | Texto principal, CTAs escuros, navbar |
| `--color-blue` | `#1A4B78` | Hover de links e botões |
| `--color-cyan` | `#00A8D6` | Acento primário, ações, links ativos |
| `--color-cyan-lt` | `#D6F1F9` | Fundo de badges cyan, hovers suaves |
| `--color-white` | `#FFFFFF` | Cards, hero background |
| `--color-surf` | `#F7F9FC` | Background de página |
| `--color-tint` | `#EEF3F9` | Seções alternadas, badges padrão |
| `--color-muted` | `#5A7391` | Subtexto, labels, captions |

**Regra 70/30:** superfícies claras (white/surf/tint) ocupam ~70% da composição. Navy e Cyan entram como acento — nunca como fundo de seção inteira, exceto no bloco CTA final.

---

## Tarefas prioritárias para o Codex

### 1. Extrair CSS inline do `index.html` → `components.css`
O `index.html` atual tem todos os estilos em `<style>` inline. A tarefa é:
- Mover cada bloco de CSS para `components.css` usando as classes `.mg-` já definidas
- Substituir os seletores locais pelas classes `.mg-` no HTML
- Verificar que a página renderiza identicamente após a migração

### 2. Criar `docs/brand-guide.md`
Documento de guia de uso da identidade com:
- Uso correto e incorreto do logo
- Combinações de cores permitidas
- Exemplos de aplicação tipográfica
- Exemplos de badges, botões e cards

### 3. Criar `assets/icons/helix.svg`
Extrair o SVG inline da helix do `index.html` como arquivo standalone. O SVG deve:
- Ter `viewBox="0 0 28 28"`
- Ser usável via `<img src="assets/icons/helix.svg">` e `<use>`
- Ter `role="img"` e `<title>Ícone helix MGenética</title>`

### 4. Criar página `src/components-demo.html`
Página de demonstração de todos os componentes isolados:
- Todos os botões (variantes)
- Todos os badges (variantes)
- Card padrão, card destaque
- Color chips da paleta
- Specimens tipográficos (display, heading, subheading, body, caption)
- `.mg-note` (nota de rodapé)

### 5. Criar `src/apresentacao.html` — slide deck HTML
Página de apresentação institucional para uso em reuniões e eventos:
- Navegação por teclado (← →) entre slides
- 6–8 slides: capa, problema, solução, serviços, cases/números, contato
- Mesma identidade visual do `index.html`
- Funciona offline (sem dependências externas além do Google Fonts)

### 6. Criar `tests/visual-checks.md`
Checklist de revisão visual a rodar manualmente antes de qualquer deploy:
- Contraste de cores (WCAG AA mínimo)
- Legibilidade em mobile (≤375px)
- Rendering sem Google Fonts (fallback)
- Links com href vazio ou `#` sinalizados

---

## O que NÃO fazer

- Não usar frameworks CSS externos (Tailwind, Bootstrap, Bulma)
- Não usar JavaScript frameworks (React, Vue) — o projeto é HTML/CSS/JS vanilla
- Não introduzir novas fontes além de Lora e DM Sans (+ DM Mono para código)
- Não usar cores fora da paleta sem criar um novo token em `tokens.css`
- Não usar `px` para tamanhos de fonte — usar `rem` ou as variáveis `--text-*`
- Não criar arquivos CSS sem prefixo `.mg-` nas classes
- Não referenciar imagens que não existam em `assets/` — usar fallback SVG inline

---

## Sugestões de melhoria (backlog)

Itens identificados como melhorias futuras — implementar após as tarefas prioritárias:

| # | Melhoria | Impacto | Esforço |
|---|----------|---------|---------|
| A | Modo escuro (`prefers-color-scheme: dark`) com tokens separados | Alto | Médio |
| B | Navbar fixa com logo + âncoras de seção | Médio | Baixo |
| C | Animação scroll-triggered (IntersectionObserver) nas seções | Médio | Baixo |
| D | Formulário de contato estilizado (nome, e-mail, mensagem) | Alto | Médio |
| E | Versão do logo em SVG puro (sem bitmap) para uso em qualquer escala | Alto | Alto |
| F | Página `src/curso.html` — template de landing page de curso | Alto | Alto |
| G | Print stylesheet (`@media print`) para material impresso | Baixo | Baixo |

---

## Como rodar o projeto

```bash
# Sem build step — abrir diretamente no browser
open src/index.html

# Ou com servidor local simples
python3 -m http.server 8080 --directory src/
# Acessar: http://localhost:8080
```

Não há build, bundler ou node_modules. O projeto é HTML/CSS/JS puro intencional — simplicidade de manutenção é uma feature.

---

## Critério de "pronto"

Uma tarefa está completa quando:
1. O HTML renderiza sem erros no browser (Chrome + Firefox)
2. Nenhuma cor ou tamanho está em hard-code — tudo usa variáveis de `tokens.css`
3. Mobile (375px) não tem overflow horizontal
4. Todos os `<img>` têm `alt`, todos os `<a>` têm texto descritivo
5. O código passou pelo checklist em `tests/visual-checks.md`
