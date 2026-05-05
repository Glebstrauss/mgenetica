# MGenética Academy — Projeto de Redesign Visual Premium v5

> **Documento de direção criativa.** Evolução do brief v4 com **paleta clara** como estado canônico. Mantém toda a ambição editorial-científica do v4, mas com superfícies brancas/quartzo dominantes, navy como âncora e cyan como acento. Equivalente em qualidade visual a publicações como *Nautilus*, *Quanta Magazine*, *Aeon* — mas no registro diurno/luminoso.

---

## 0 · Sumário executivo

A direção dark/futurista do v4 foi descartada. O que funciona é o registro **editorial luminoso**: branco premium, navy de autoridade, cyan de descoberta. Esta v5 reaproveita **todo o sistema do v4** (tipografia editorial, motivos derivados da logo, microinterações crafted, reading experience) e adapta apenas a paleta — substituindo obsidian e midnight como surfaces dominantes por quartz e mist.

A entrega ainda deve fazer o usuário sentir, em 5 segundos, que está diante de algo *raro* no espaço educacional brasileiro — mas agora com a serenidade de uma publicação científica diurna, não a intensidade de um dashboard noturno.

**Posicionamento desejado**: o MGenética se apresenta como uma **publicação digital sobre genética quantitativa**, não como mais um curso online.

---

## 1 · Princípios fundadores (mantidos da v4)

### 1.1 — Editorial antes de técnico

Sensação ao entrar deve ser de abrir uma revista científica de qualidade, não logar num LMS.

### 1.2 — A logo dita a alma

Três elementos da marca viram **linguagem visual em todo o site**:

- **Glow cyan** (`#6fdcff` → `#008fc5`) — luz, energia, descoberta
- **Três rungs horizontais assimétricos** — referência à dupla hélice; motivo gráfico mais distintivo
- **Tipografia confiante** — Inter 800 do wordmark vira raiz da hierarquia sans

### 1.3 — Profundidade através de camadas

Branco não é "vazio". Construir profundidade com:

- **Sombras navy de baixo contraste** (não cinza neutro)
- **Glassmorphism específico** (navbar e overlays sobre conteúdo)
- **Gradientes radiais sutis** em hero e backgrounds
- **Z-index emocional** — alguns elementos *flutuam*, outros estão *afundados*

### 1.4 — Movimento como design, não enfeite

Cada transição com propósito. Hovers são promessas; scroll é narrativa; cliques têm tato.

### 1.5 — Espaço negativo é luxo

Generosidade espacial = sinal mais barato e poderoso de premium. Onde havia 2rem, vá para 3.5rem.

### 1.6 — Disciplina cromática

Apenas **três famílias** comandam tudo. Verde/vermelho/âmbar só em estados funcionais.

- **Quartz** — branco premium, papel editorial
- **Midnight** — navy de autoridade
- **Photon** — cyan de glow e acento

---

## 2 · Sistema de identidade visual

### 2.1 — Motivo "Sequencing rungs"

Os três traços horizontais do monograma (larguras 120 / 156 / 120) viram o motivo gráfico recorrente:

- **Section dividers** entre seções na home — três linhas curtas assimétricas em cyan, alinhadas centro
- **Hero ornament** — três rungs verticais cyan no canto superior esquerdo da copy
- **Card decorator** — número do módulo flanqueado por três rungs sutis (opacity 0.30)
- **Loading state** — spinner de três barras pulsantes em sequência (não círculo genérico)
- **Footer** — três rungs como assinatura

### 2.2 — Helical glow (no claro)

O glow cyan da marca ressurge como **iluminação ambiente** específica:

- **Body background** — gradiente radial cyan ultra-baixo (~4% opacity) no canto superior direito
- **Hero panel** (mantém dark `#020a0e` apenas neste retângulo) — orbs de glow real circundando o logo
- **Module cards no hover** — borda cyan com halo sutil (`box-shadow: 0 0 0 4px rgba(111,220,255,0.12)`)
- **Botão primário** — leve halo cyan no foco/hover

### 2.3 — Dark mode como cortesia, não canônico

O canonical é **claro**. O dark mode existe apenas como toggle de conforto noturno, não como expressão alternativa da marca.

No dark mode mantém-se a mesma estrutura, apenas com superfícies invertidas — sem virar "site futurista".

---

## 3 · Sistema de cores (paleta clara dominante)

### 3.1 — Tokens primários

```
═══ MARCA ═══
--quartz:          #fafbfc   /* Off-white premium — papel editorial            */
--mist:            #f3f6fa   /* Surface tint sutil                             */
--fog:             #e8edf4   /* Borders quase invisíveis                       */

--midnight:        #0a1f38   /* Navy editorial — autoridade científica         */
--midnight-mid:    #122844   /* Navy hover                                     */

--obsidian:        #020a0e   /* Reservado APENAS para o painel da logo no hero */

--photon:          #00a8d6   /* Cyan accent principal                          */
--photon-bright:   #6fdcff   /* Cyan luminoso para glows                       */
--photon-glow:     rgba(0, 168, 214, 0.14)   /* Halo                          */

═══ TEXTO ═══
--ink:             #0d1825   /* Headings — quase preto com pitada de azul     */
--basalt:          #2a3a4f   /* Body text                                     */
--graphite:        #475569   /* Texto secundário                              */
--silver:          #6b7a8d   /* Muted, captions                               */

═══ FUNCIONAIS ═══
--malachite:       #16a34a   /* Sucesso (acerto, módulo concluído)            */
--copper:          #d97706   /* Aviso                                         */
--vermilion:       #dc2626   /* Erro                                          */
```

### 3.2 — Tokens semânticos

```
--surface-base:        var(--quartz)
--surface-raised:      #ffffff
--surface-tinted:      var(--mist)
--surface-overlay:     rgba(255, 255, 255, 0.78)   /* Glass nav */

--border-hairline:     rgba(13, 24, 37, 0.06)
--border-soft:         var(--fog)
--border-medium:       #cfd8e3
--border-photon:       rgba(0, 168, 214, 0.32)

--text-primary:        var(--ink)
--text-secondary:      var(--basalt)
--text-tertiary:       var(--graphite)
--text-muted:          var(--silver)
--text-accent:         var(--photon)
```

### 3.3 — Gradientes de marca (claros)

```css
/* Quartz gradient — backgrounds principais com profundidade sutil */
--gradient-quartz: linear-gradient(180deg, #ffffff 0%, #fafbfc 50%, #f3f6fa 100%);

/* Aurora claro — ornamentação radial em backgrounds e seções hero */
--gradient-aurora-light:
  radial-gradient(ellipse at 85% -10%, rgba(0, 168, 214, 0.08), transparent 50%),
  radial-gradient(ellipse at 10% 110%, rgba(10, 31, 56, 0.04), transparent 50%);

/* Photon CTA — só no botão primário e badges featured */
--gradient-photon: linear-gradient(180deg, #00a8d6 0%, #0089b3 100%);

/* Logo panel — único uso de obsidian no site */
--gradient-helix-panel: linear-gradient(135deg, #020a0e 0%, #0a1628 100%);
```

---

## 4 · Sistema tipográfico editorial (mantido integralmente da v4)

### 4.1 — Pareamento serif × sans (decisão central)

| Função | Família | Justificativa |
|---|---|---|
| **Display & H1 hero** | **Newsreader** (variável, Google Fonts) | Serif moderno, editorial sem ser arcaico, optical sizing automático |
| **Headings (H2-H4)** | **Inter** (variable) | Sans neutro, autoridade técnica, coerência com wordmark da logo |
| **Body** | **Inter** (variable) | Legibilidade ótima, ritmo coerente |
| **Code** | **JetBrains Mono** | Já adotado, manter |

**Carregamento (atualizar `head-extras.html`):**

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?
  family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600;6..72,700&
  family=Inter:wght@400;500;600;700;800&
  family=JetBrains+Mono:wght@400;500&
  display=swap">
```

### 4.2 — Escala (sem alterações)

```
Display XL    96px   (6rem)      Newsreader 600  -0.04em   1.02
Display L     72px   (4.5rem)    Newsreader 600  -0.035em  1.05
Display M     56px   (3.5rem)    Newsreader 600  -0.03em   1.08
Display S     40px   (2.5rem)    Newsreader 500  -0.025em  1.15

H1            36px   (2.25rem)   Inter 800       -0.025em  1.18
H2            28px   (1.75rem)   Inter 700       -0.02em   1.22
H3            22px   (1.375rem)  Inter 700       -0.015em  1.30
H4            18px   (1.125rem)  Inter 700       -0.01em   1.35

Lead          20px   (1.25rem)   Inter 400       -0.005em  1.55
Body L        17px   (1.0625rem) Inter 400        0        1.72
Body          16px   (1rem)      Inter 400        0        1.7
Body S        14px   (0.875rem)  Inter 500        0        1.55

Caption       13px   (0.8125rem) Inter 600       +0.01em   1.45
Eyebrow       12px   (0.75rem)   Inter 700       +0.10em   1   (uppercase)
Micro         11px   (0.6875rem) Inter 700       +0.08em   1   (uppercase)
```

### 4.3 — Hierarquia em uso

**Hero da home:**
- Eyebrow `Curso aberto · 12 módulos` em photon, tracking +0.1em
- **Título Display L em Newsreader 600** — cor: ink — *"Genética quantitativa, da teoria ao código"*
- Lead em Inter 400 — *"Uma trilha aberta..."* — cor: basalt

**Headings de módulo:**
- Eyebrow `MÓDULO 03` em photon
- Display M em Newsreader 600 — título do módulo, cor: ink
- Lead em Inter — bullet de objetivos

**Module cards:**
- Número em Newsreader 600, 64px, cor: midnight com opacity 0.18
- Título em Inter 700, 18px, cor: ink
- Descrição em Inter 400, 14px, cor: graphite

### 4.4 — Detalhes de craftsmanship

```css
font-optical-sizing: auto;
font-feature-settings: "ss01", "ss02", "calt", "liga";
font-variant-numeric: tabular-nums;
hyphens: auto;
hyphenate-limit-chars: 8 4 4;
text-rendering: optimizeLegibility;

/* Drop cap opcional no primeiro parágrafo de módulos */
.module-content > p:first-of-type::first-letter {
  font-family: 'Newsreader', serif;
  font-size: 4.5em;
  font-weight: 600;
  line-height: 0.85;
  float: left;
  margin: 0.05em 0.1em 0 -0.04em;
  color: var(--midnight);
}
```

---

## 5 · Sistema de espaçamento e grid (mantido)

### 5.1 — Escala (base 4)

```
0      0
1      4px
2      8px
3      12px
4      16px
5      20px
6      24px
8      32px
10     40px
12     48px
14     56px
16     64px
20     80px
24     96px
32     128px
40     160px
48     192px   (vertical rhythm entre seções principais)
56     224px
```

### 5.2 — Container

```
Container max-width:    1280px
Reading max-width:      720px   (módulos, artigos)
Hero max-width:         1440px

Grid:                   12 colunas
Gutter desktop:         32px
Gutter mobile:          16px
```

### 5.3 — Vertical rhythm

- Entre seções principais: `clamp(96px, 12vh, 160px)`
- Entre subseções: `clamp(48px, 6vh, 80px)`

---

## 6 · Hero — direção criativa (adaptada para luminoso)

### 6.1 — Concept: "The Editorial Specimen"

A hero permanece como um **espécime editorial**: copy editorial à esquerda em superfície branca premium; logo em seu **único contexto dark legítimo do site** à direita — como uma vitrine museal iluminada.

A atmosfera é serena, científica, diurna. A intensidade da v4 dark vira **claridade contemplativa**.

### 6.2 — Estrutura

```
┌─────────────────────────────────────────────────────────────────────┐
│  [navbar glass branco]                                              │
│                                                                     │
│  ┌────────────────────────────────┬──────────────────────────────┐  │
│  │                                │                              │  │
│  │  ▌▎▍   3 rungs verticais cyan  │      [aurora glow cyan]      │  │
│  │                                │                              │  │
│  │  CURSO ABERTO · 12 MÓDULOS    │                              │  │
│  │  (eyebrow photon, +0.1em)      │      [logo MGenética em      │  │
│  │                                │       contexto obsidian      │  │
│  │  Genética quantitativa,        │       com glow real]         │  │
│  │  da teoria ao código.          │                              │  │
│  │  ↑ Newsreader Display L        │                              │  │
│  │                                │      [aurora glow cyan]      │  │
│  │  Uma trilha aberta para        │                              │  │
│  │  aprender melhoramento...      │                              │  │
│  │                                │                              │  │
│  │  [Começar →]  [Trilha]         │                              │  │
│  │                                │                              │  │
│  └────────────────────────────────┴──────────────────────────────┘  │
│   light: quartz com aurora-light    obsidian: ÚNICO uso no site     │
│                                                                     │
│  ··· three sequencing rungs centrais ···                            │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 — Especificações

**Container:**
- `border-radius: 20px` (não 24 — mais sóbrio)
- `min-height: 600px`
- Borda interna sutil: `1px solid rgba(13, 24, 37, 0.08)`
- `box-shadow: 0 32px 80px -20px rgba(13, 24, 37, 0.12), 0 8px 24px -8px rgba(13, 24, 37, 0.08)`
- `overflow: hidden`

**Lado esquerdo (light, dominante):**
- Background: `var(--quartz)` com `--gradient-aurora-light` sobreposto
- Padding: `clamp(3rem, 7vw, 6rem)`
- Três rungs verticais cyan no canto superior esquerdo (assinatura visual permanente)

**Lado direito (obsidian — único uso no site):**
- Background: `--gradient-helix-panel`
- **Dois orbs de glow cyan**:
  - Grande no quadrante superior direito (`opacity: 0.22, blur(80px)`)
  - Menor no quadrante inferior esquerdo (`opacity: 0.14, blur(60px)`)
- Logo SVG com `filter: drop-shadow(0 0 60px rgba(111, 220, 255, 0.35))`
- Animação `helix-pulse 6s ease-in-out infinite`

### 6.4 — Animações

```css
@keyframes helix-pulse {
  0%, 100% { filter: drop-shadow(0 0 60px rgba(111, 220, 255, 0.35)); }
  50%      { filter: drop-shadow(0 0 80px rgba(111, 220, 255, 0.50)); }
}

@keyframes editorial-reveal {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-eyebrow  { animation: editorial-reveal 600ms  ease-out 100ms backwards; }
.hero-title    { animation: editorial-reveal 800ms  ease-out 200ms backwards; }
.hero-lead     { animation: editorial-reveal 800ms  ease-out 350ms backwards; }
.hero-actions  { animation: editorial-reveal 800ms  ease-out 500ms backwards; }
.hero-panel    { animation: editorial-reveal 1000ms ease-out 400ms backwards; }
```

### 6.5 — Mobile (< 900px)

- Single-column, painel obsidian no topo (logo é primeira impressão)
- `min-height: 320px` no painel
- Display L → Display S
- Logo `max-width: 240px`

---

## 7 · Componentes principais

### 7.1 — Navbar

Navbar **branca glass**, não dark:

```
Padrão:
  altura:    72px
  bg:        rgba(255, 255, 255, 0.82)
  backdrop:  saturate(180%) blur(24px)
  border-b:  1px solid rgba(13, 24, 37, 0.06)
  shadow:    0 1px 0 rgba(13, 24, 37, 0.04),
             0 12px 32px -16px rgba(13, 24, 37, 0.08)

Scrolled (após 80px):
  bg:        rgba(255, 255, 255, 0.94)
  shadow intensifica
  altura:    64px
  transição: 300ms

Brand:
  - Logomark 36×36 (mantém glow nativo do filter da SVG)
  - Nome "MGenética" Inter 800, 16px, ink
  - Subtitle "ACADEMY" Inter 700, 9px, photon, +0.18em

Nav links:
  - Inter 600, 13px
  - hover: bg var(--mist)
  - active: bg var(--mist), color photon, bottom-rule cyan 2px
```

### 7.2 — Buttons

```
Primary (CTA principal):
  bg:         var(--midnight)
  color:      white
  shadow:     0 4px 14px rgba(10, 31, 56, 0.18),
              0 12px 28px -8px rgba(10, 31, 56, 0.16),
              inset 0 1px 0 rgba(255, 255, 255, 0.12)
  border:     1px solid var(--midnight)
  font:       Inter 700, 14px
  height:     46px
  radius:     10px

  hover:
    bg:        var(--midnight-mid)
    transform: translateY(-2px)
    shadow:    intensifica + halo cyan sutil

  active:
    transform: translateY(0)

Primary-photon (variante para CTAs especiais — certificate, "Comece agora"):
  bg:         var(--gradient-photon)
  color:      white
  shadow:     0 4px 14px rgba(0, 168, 214, 0.28),
              0 12px 28px -8px rgba(0, 168, 214, 0.22)

Secondary (Outline premium):
  bg:         rgba(255, 255, 255, 0.86)
  backdrop:   blur(8px)
  color:      ink
  border:     1px solid rgba(13, 24, 37, 0.14)
  shadow:     0 1px 2px rgba(13, 24, 37, 0.04),
              0 8px 20px -4px rgba(13, 24, 37, 0.08)

  hover:
    bg:        white
    border:    rgba(13, 24, 37, 0.24)
    transform: translateY(-1px)

Ghost:
  bg:         transparent
  color:      basalt
  hover:      bg rgba(13, 24, 37, 0.04), color ink
```

### 7.3 — Module cards "Specimen"

```
Estrutura:
  ┌────────────────────────────────┐
  │  ┌──┐                          │
  │  │01│  ▌▎▍                     │  ← Número Newsreader 600 64px
  │  └──┘                          │     midnight opacity 0.18
  │                                │     + 3 rungs cyan ao lado
  │  FUNDAMENTOS                   │  ← Eyebrow photon
  │                                │
  │  Introdução ao                 │  ← Título Inter 700 18px
  │  Melhoramento Animal           │
  │                                │
  │  Objetivos, resposta à         │  ← Descrição Inter 400 14px
  │  seleção e organização...      │
  │                                │
  │  ━━━━━━━━━━━━━━━━━━━━━━━       │  ← divider sutil
  │                                │
  │  5 lições · Quiz          →    │  ← meta + arrow
  └────────────────────────────────┘

Dimensões:
  min-height: 280px
  padding:    32px 28px
  bg:         white
  border:     1px solid rgba(13, 24, 37, 0.06)
  radius:     18px
  shadow:     0 1px 2px rgba(13, 24, 37, 0.04),
              0 12px 32px -8px rgba(13, 24, 37, 0.08)

Hover (transformacional):
  transform:    translateY(-6px) rotate(-0.4deg)
  shadow:       0 24px 60px -12px rgba(13, 24, 37, 0.18)
  border-color: rgba(0, 168, 214, 0.32)

  /* Glow cyan sutil emerge */
  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: var(--gradient-photon);
    opacity: 0.10;
    z-index: -1;
    filter: blur(12px);
  }

  /* Número escurece */
  .module-card-number {
    color: var(--midnight);
    opacity: 0.42;
  }

  /* Arrow desliza */
  .module-card-arrow { transform: translateX(4px); }

Quando concluído:
  ::before {
    content: "✓";
    position: absolute;
    top: 24px; right: 24px;
    width: 28px; height: 28px;
    background: var(--malachite);
    color: white;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 800;
  }
```

### 7.4 — Module page (reading experience)

Concept: long-read editorial estilo *The Atlantic*.

```
Layout:
  ┌──────────┬─────────────────────────┬────────────┐
  │ Sidebar  │   Reading column        │  TOC       │
  │ (módulos)│   (max-width 720px)     │  (sticky)  │
  └──────────┴─────────────────────────┴────────────┘

Header:
  - Eyebrow photon: "MÓDULO 03 · 5 LIÇÕES · 25 MIN"
  - Display M serif: título
  - Lead deck em Inter
  - Linha divisória editorial (3 rungs)
  - Box "Objetivos" com bg mist, border-left cyan

Reading:
  width:     720px
  font:      Inter 400, 17px, line-height 1.78
  color:     basalt
  paragraph: 1.5em spacing
  drop cap:  primeiro parágrafo (opcional)

  pull quotes: Newsreader 500 italic 26px, com 3 rungs cyan laterais
  figures:     bordered, captioned em Inter 600 13px italic
  code blocks: bg #0d1825 (apenas blocos de código — não a página inteira)
               color #ecf2fa, JetBrains Mono 14px
               radius: 12px
               shadow: 0 8px 24px rgba(13, 24, 37, 0.08)

TOC sticky:
  bg:        rgba(255, 255, 255, 0.82)
  backdrop:  blur(12px)
  border:    1px solid rgba(13, 24, 37, 0.06)
  radius:    12px
  width:     220px
  position:  sticky top: 96px

  Itens:
    - eyebrow micro "NESTA AULA"
    - lista de seções
    - active: cyan rule à esquerda + bold ink
    - hover: bg mist
    - barra de progresso vertical de leitura à esquerda
```

### 7.5 — Quiz

```
Container:
  bg:        white
  radius:    20px
  padding:   40px
  border:    1px solid var(--fog)
  shadow:    0 1px 2px rgba(13, 24, 37, 0.04),
             0 24px 48px -16px rgba(13, 24, 37, 0.10)

Header:
  - Eyebrow photon "VERIFICAÇÃO · 5 QUESTÕES"
  - H3 "Teste seu entendimento"
  - meta: "Acerte 4 de 5 para concluir o módulo"

Questions:
  - numbered "01." em Newsreader 600 italic
  - spacing 48px entre questões

Options:
  - radius 12px
  - padding 16px 20px
  - border 1.5px transparent
  - hover: border photon, bg mist
  - selected: border ink, bg quartz, número em photon
  - correct: border malachite, bg malachite/4%, ícone check
  - incorrect: border vermilion, bg vermilion/4%, explicação revelada

Submit: primary CTA full-width 52px

Result:
  - score em Display S (Newsreader 600), color ink
  - barra de progresso animada (gradient photon)
  - mensagem editorial baseada no resultado
  - se passar: confete sutil + "Módulo concluído ✓"
  - se falhar: "Reveja a aula 3 antes de tentar novamente"
```

### 7.6 — Certificate

Diploma editorial, não certificate.io genérico.

- Hero com eyebrow + Display L "Certificado de conclusão"
- Preview em mockup 3D ligeiro do PDF
- Form para nome
- CTA gerar PDF

PDF:
- A4 paisagem
- Top: 3 rungs cyan como assinatura visual
- Display L Newsreader: nome do aluno
- Lead Inter: certificação textual
- Bottom: data + assinatura visual + QR code de verificação
- Watermark sutil: monograma da logo
- Tinta cyan apenas em detalhes

---

## 8 · Páginas-tipo

### 8.1 — Home (`index.qmd`)

```
1. Hero (split editorial light + obsidian panel — section 6)
2. Section divider (3 rungs cyan)
3. Lead manifesto: 1 parágrafo em Newsreader 500 italic, 24px, color basalt
4. Strip de métricas (12 módulos · scripts R · dados simulados)
5. Section divider
6. "Como usar o curso" (3 features com numeração editorial)
7. Section divider
8. "Trilha de aprendizado" — module cards grid Specimen
9. Section divider
10. "Recursos práticos" — sidebar editorial em mist
11. "Referências de base" — bibliography style
12. Footer com 3 rungs como assinatura
```

### 8.2 — Module page

Section 7.4.

### 8.3 — Glossário

Editorial dictionary:
- Letras-índice grandes (Display M serif) como divisões
- Termos em Inter 700
- Definições em Inter 400, 16px
- Cross-references em photon
- Search bar premium no topo

### 8.4 — Perfil

Hero editorial mais íntimo:
- Avatar tratado como retrato editorial
- Nome em Display L
- Tagline em Newsreader italic
- Cards de credenciais

---

## 9 · Microinterações e movimento (mantidos da v4)

### 9.1 — Filosofia

| Velocidade | Curva | Uso |
|---|---|---|
| 150ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Hovers padrão |
| 250ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Cor/border |
| 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals |
| 600-1000ms | mesma | Narrativos |

### 9.2 — Movimentos canônicos

**Scroll reveals (Intersection Observer):**
- Seções fade + translateY(20px → 0)
- Stagger 80ms entre cards de uma grid

**Hovers:**
- Sempre transform + sombra (nunca apenas cor)

**Click feedback:**
- Botões: scale(0.97) durante 100ms
- Cards: ripple sutil

**Magnetic effect** (apenas no CTA primário):

```js
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width/2;
  const y = e.clientY - rect.top  - rect.height/2;
  btn.style.transform = `translate(${x*0.15}px, ${y*0.15}px)`;
});
btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0, 0)'; });
```

**Cursor glow** (página inteira, só desktop):

```css
body::before {
  content: "";
  position: fixed;
  pointer-events: none;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mx, 50%) var(--my, 50%),
    rgba(0, 168, 214, 0.04),
    transparent 40%
  );
  z-index: 1;
}
```

```js
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});
```

### 9.3 — Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10 · Estados (focus, loading, empty, error)

### 10.1 — Focus visible

```css
*:focus-visible {
  outline: 2px solid var(--photon);
  outline-offset: 3px;
  border-radius: 6px;
  box-shadow: 0 0 0 6px var(--photon-glow);
  transition: outline-offset 100ms;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--photon);
  box-shadow: 0 0 0 4px var(--photon-glow);
}
```

### 10.2 — Loading

Spinner custom de 3 rungs em sequência (não círculo genérico).
Cada rung: delay 0ms, 200ms, 400ms. Pulse opacity 0.3 → 1 → 0.3, 1.4s linear infinite.

### 10.3 — Empty / Error

Ilustrações geradas com motivo de rungs em diferentes layouts.
- Display S: "Nada ainda."
- Body: descrição
- CTA: ação primária

---

## 11 · Performance & acessibilidade

### 11.1 — Budget

```
LCP:                  < 1.5s
FID:                  < 100ms
CLS:                  < 0.05
Total page weight:    < 800KB no first load
Fonts:                woff2 com display=swap
JS:                   < 100KB minificado
```

### 11.2 — Otimizações

- **Critical CSS** inline no head (above the fold)
- **Preload** de Newsreader 600 e Inter 700
- **Lazy loading** de imagens abaixo da fold
- **Subset** das fontes (latin-extended)

### 11.3 — Acessibilidade WCAG AA+

- Contraste 4.5:1 mínimo
- Focus sempre visível
- Navegação por teclado completa
- Skip link no topo
- Heading hierarchy correta
- Alt text descritivo

---

## 12 · Roadmap em fases

### Fase A — Fundação tipográfica (semana 1, 2-4h)

- [ ] Adicionar Newsreader ao `head-extras.html`
- [ ] Atualizar tokens de cor para nomenclatura premium (quartz, midnight, photon)
- [ ] Aplicar Newsreader 600 em `.hero-title` e `h1.title`
- [ ] Validar legibilidade

**Aceite:** hero "sente-se" editorial no primeiro olhar.

### Fase B — Hero "Editorial Specimen" (semana 1-2, 4-6h)

- [ ] Painel obsidian apenas no `.hero-panel` (mantido — único uso de dark)
- [ ] Aurora gradient cyan no lado claro
- [ ] Drop-shadow cyan no logo SVG
- [ ] `@keyframes helix-pulse` infinito
- [ ] Três rungs verticais no `.hero-copy`
- [ ] Section divider de 3 rungs após hero
- [ ] Reveals com stagger

**Aceite:** hero comunica "publicação científica premium" em < 2s.

### Fase C — Module cards Specimen (semana 2, 3-4h)

- [ ] Atualizar markup (wrapper para número editorial)
- [ ] Número Newsreader 600 64px opacity 0.18
- [ ] 3 rungs decorativos ao lado
- [ ] Hover com `translateY(-6px) rotate(-0.4deg)` + glow cyan
- [ ] Estado `.completed` com badge ✓ malachite
- [ ] Arrow icon que desliza no hover

**Aceite:** hover faz cards "ganharem vida", não translação genérica.

### Fase D — Reading experience (semana 2-3, 6-8h)

- [ ] Reading column max-width 720px
- [ ] Body para 17px line-height 1.78
- [ ] Drop cap opcional no primeiro parágrafo
- [ ] Pull quotes com 3 rungs laterais
- [ ] Code blocks dark (apenas neles, contraste editorial)
- [ ] TOC sticky com progress bar de leitura
- [ ] Smooth scroll para âncoras

**Aceite:** sensação de "long-read magazine" em todo módulo.

### Fase E — Microinterações (semana 3, 4-6h)

- [ ] Cursor spotlight cyan
- [ ] Magnetic effect no CTA primário
- [ ] Scroll reveals com Intersection Observer
- [ ] Loading spinner de 3 rungs
- [ ] Focus rings premium
- [ ] Reduced motion

**Aceite:** site responde a todas interações principais.

### Fase F — Quizzes e certificado (semana 3-4, 4-6h)

- [ ] Quiz redesenhado (numeração serif italic, options refinadas)
- [ ] Result page com confetti sutil + score serif
- [ ] Certificate hero com mockup 3D do PDF
- [ ] PDF com Newsreader embedded

**Aceite:** quiz e certificate fazem parte do mesmo produto premium.

### Fase G — Polimento final (semana 4, 4-6h)

- [ ] Custom scrollbar slim cyan
- [ ] Selection color (cyan + ink)
- [ ] 404 editorial
- [ ] Footer com 3 rungs assinatura
- [ ] Theme toggle suave
- [ ] OG cards atualizados
- [ ] Manifest PWA atualizado

**Aceite:** nenhum canto parece "default Quarto".

### Fase H — QA & validação (semana 4, 2-3h)

- [ ] Lighthouse > 95 em todas categorias
- [ ] WCAG AA validation
- [ ] Cross-browser test
- [ ] Mobile real device test
- [ ] User test informal com 3-5 pessoas

**Total estimado:** 30-40h distribuídas em ~4 semanas.

---

## 13 · Referências visuais

### Para emular

- **nautil.us** — editorial científico, serif display
- **quantamagazine.org** — pareamento serif+sans
- **anthropic.com** — restrição cromática, espaço negativo
- **vercel.com** — gradientes sutis, sombras precisas
- **stripe.com** — produto técnico apresentado editorialmente
- **brilliant.org** — educacional sem ser infantil

### Para evitar

- Templates Bootstrap default
- Cursos online genéricos (Udemy, Domestika light)
- Landing pages SaaS com gradient roxo-azul
- Designs dependentes de ilustração estoque
- Visual "futurista" / cyberpunk / dashboard noturno

---

## 14 · O que NÃO fazer

- ❌ Tornar o site inteiro escuro (apenas o painel da logo no hero)
- ❌ Tons pastéis ou "soft"
- ❌ Roxo, magenta, qualquer cor fora da paleta
- ❌ Ilustrações cartoon ou flat genéricas
- ❌ Mais de 3 fontes carregadas
- ❌ Animações decorativas sem propósito
- ❌ Glassmorphism em todo lugar (só onde justifica)
- ❌ Bordas arredondadas exageradas (>24px é raro)
- ❌ Drop shadows borrachudas (`0 4px 6px gray`)
- ❌ Hover states que apenas mudam cor
- ❌ Botões sem altura mínima 44px
- ❌ Texto cinza claro sobre fundo branco
- ❌ "Get started for free" copy patterns SaaS
- ❌ Stats vazios ("100%", "12+" sem contexto)

---

## 15 · Métricas de sucesso

### Quantitativas

- **Lighthouse Performance:** > 95
- **Lighthouse Accessibility:** 100
- **Lighthouse Best Practices:** 100
- **Lighthouse SEO:** 100
- **LCP:** < 1.5s
- **CLS:** < 0.05

### Qualitativas

- 3+ pessoas dizem "isso parece de outra liga" no primeiro contato
- Screenshots compartilháveis sem editing
- Site é referenciado por outros como "exemplo de como deveria ser feito"
- Aprovação imediata em comparação com referências (Quanta, Nautilus)

---

## 16 · Observações finais

Esta v5 é **a v4 sem o desvio dark**. O patamar pretendido continua o mesmo: reposicionar a MGenética como **autoridade científico-editorial digital no Brasil**.

A execução exige:

1. **Disciplina** — cada decisão visual passa pelo crivo "isso ressoa com a logo?"
2. **Generosidade** — espaço, tempo, atenção a cada detalhe
3. **Coragem** — tomar partido (serif display, painel obsidian apenas no hero, paleta restrita)
4. **Polimento** — os últimos 10% são 90% da percepção de qualidade

Resultado almejado: o usuário deve esquecer que está num site Quarto sobre GitHub Pages e sentir que entrou em uma **publicação digital de referência sobre genética quantitativa**, em registro luminoso e contemplativo.

---

**Documento:** PROJETO-REDESIGN-V5.md
**Versão:** 1.0 (light edition)
**Status:** pronto para implementação faseada
**Próxima ação sugerida:** aprovar direção e iniciar Fase A (fundação tipográfica)
