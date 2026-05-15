# MGenética — Guia de Identidade Visual

Versão 1.0 · Brand Preview aprovado

---

## Logo

O logo MGenética é composto por três elementos:

1. **Ícone helix** — duas curvas entrelaçadas (helix de DNA estilizada) em navy e cyan sobre fundo navy. Representa dupla-hélice, genômica, melhoramento.
2. **Wordmark** — "MGenética" em Lora 600. O "G" é acentuado em cyan (`--color-cyan`).
3. **Subtítulo** — "Genômica & Melhoramento" em DM Sans 500 uppercase, tracking 0.10em, cor muted.

### Variantes

| Variante | Uso |
|----------|-----|
| Completa (ícone + wordmark + subtítulo) | Materiais principais, hero de página |
| Compacta (ícone + wordmark) | Header/navbar, assinatura de e-mail |
| Ícone isolado | Favicon, avatar de redes sociais |

### Área de proteção

Manter espaço livre equivalente à altura do ícone em todos os lados do logo.

### Uso incorreto

- ❌ Não distorcer proporções
- ❌ Não aplicar em fundos que conflitem com navy ou cyan
- ❌ Não recolorir o ícone
- ❌ Não usar o wordmark sem o ícone em materiais novos

---

## Cores

### Paleta principal

| Nome | Hex | Variável CSS | Uso |
|------|-----|-------------|-----|
| Navy | `#0A1F38` | `--color-navy` | Texto, CTAs, navbar, hero h1 |
| Blue | `#1A4B78` | `--color-blue` | Hover de botões, links intermediários |
| Cyan | `#00A8D6` | `--color-cyan` | Acento primário, ações, links ativos, "G" do logo |
| Cyan Light | `#D6F1F9` | `--color-cyan-lt` | Fundo de badges cyan |

### Paleta de superfícies

| Nome | Hex | Variável CSS | Uso |
|------|-----|-------------|-----|
| White | `#FFFFFF` | `--color-white` | Cards, hero |
| Surface | `#F7F9FC` | `--color-surf` | Background de página |
| Tint | `#EEF3F9` | `--color-tint` | Seções alternadas, badges padrão |

### Cores de texto

| Nome | Hex | Variável CSS | Uso |
|------|-----|-------------|-----|
| Ink | `#0A1F38` | `--color-ink` | Texto corrido (=navy) |
| Muted | `#5A7391` | `--color-muted` | Subtexto, captions, labels |

### Regra de proporção

> Superfícies claras (white / surf / tint) ocupam ~70% da composição.
> Navy e Cyan aparecem como acento — nunca como fundo de seção inteira, exceto no bloco CTA final.

---

## Tipografia

### Famílias

| Família | Fonte | Uso |
|---------|-------|-----|
| Display | Lora (serif) | Títulos de seção, hero h1, captions em itálico |
| Body | DM Sans (sans-serif) | Texto corrido, badges, botões, UI |
| Mono | DM Mono | Código R, hexadecimais, valores numéricos técnicos |

### Escala

| Nível | Tamanho | Família | Peso | Uso |
|-------|---------|---------|------|-----|
| Display | clamp(2.2rem, 4vw, 3.1rem) | Lora | 600 | Hero h1 |
| H2 | clamp(1.5rem, 3vw, 2rem) | Lora | 600 | Section title |
| H3 | 1.30rem | Lora | 600 | Card title |
| Lead | 1.05rem | DM Sans | 400 | Parágrafo de introdução |
| Body | 1.00rem | DM Sans | 400 | Texto corrido |
| Small | 0.875rem | DM Sans | 400 | Card body, chip-role |
| Caption | 0.75rem | Lora | 400 italic | Legenda de figura/tabela |
| Badge | 0.70rem | DM Sans | 500 | Badges, labels uppercase |

---

## Componentes

### Badge

```html
<!-- Padrão -->
<span class="mg-badge">Melhoramento genético</span>

<!-- Cyan (destaque de seção) -->
<span class="mg-badge mg-badge--cyan">Aplicações</span>

<!-- Ghost (sobre fundo navy) -->
<span class="mg-badge mg-badge--ghost">Preview</span>
```

### Botões

```html
<a class="mg-btn mg-btn--primary" href="#">Explorar cursos</a>
<a class="mg-btn mg-btn--outline" href="#">Ver identidade</a>
<a class="mg-btn mg-btn--cyan"    href="#">Falar com a equipe</a>
<a class="mg-btn mg-btn--ghost"   href="#">Saiba mais</a>
```

### Card padrão

```html
<article class="mg-card">
  <div class="mg-card__icon mg-card__icon--cyan"><!-- ícone SVG --></div>
  <span class="mg-badge mg-badge--cyan">Tipo</span>
  <h3>Título do card</h3>
  <p>Descrição curta do serviço ou conteúdo.</p>
  <a class="mg-card__link" href="#">Saiba mais</a>
</article>
```

### Card destaque (navy)

```html
<article class="mg-card mg-card--featured">
  <!-- mesmo interior, cores sobrescritas pelo modificador -->
</article>
```

---

## Tom de voz

- **Direto:** uma frase por ideia. Sem rodeios.
- **Técnico sem ser hermético:** usar termos corretos (herdabilidade, DEP, EBV), mas contextualizar quando necessário.
- **Ativo:** "Organize seus dados", não "Os dados podem ser organizados".
- **Evitar:** jargão de marketing genérico ("soluções inovadoras", "ecossistema"), anglicismos desnecessários.

### Exemplos

| ❌ Evitar | ✓ Preferir |
|-----------|------------|
| Soluções inovadoras em genética | Genética quantitativa aplicada ao rebanho |
| Ecossistema de aprendizado | Curso estruturado com laboratório em R |
| Transforme seu negócio | Melhore a resposta à seleção em três gerações |
