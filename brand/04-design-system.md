# Design system

## Tokens de cor

| Token CSS | Valor base | Papel |
|---|---|---|
| `--color-background` | `#FFFFFF` | Fundo principal claro e leitura longa. |
| `--color-surface` | `#F7F9FC` | Seções, blocos editoriais e respiro. |
| `--color-surface-tint` | `#EEF3F9` | Blocos técnicos leves e áreas de apoio. |
| `--color-brand-primary` | `#0A1F38` | Marca, estrutura e contraste institucional. |
| `--color-brand-primary-strong` | `#122844` | Rodapé, capas e blocos escuros curtos. |
| `--color-brand-primary-soft` | `#EEF3F9` | Fundos técnicos sutis. |
| `--color-brand-secondary` | `#1E5799` | Links, navegação, CTA e gráficos. |
| `--color-brand-accent` | `#00A8D6` | Foco, filetes, progresso e destaque técnico. |
| `--color-brand-accent-soft` | `#E0F2FE` | Badges e blocos informativos leves. |
| `--color-brand-field` | `#1E5799` | Consultoria e decisão técnica sem criar nova paleta. |
| `--color-brand-field-soft` | `#E8F0F8` | Fundos de consultoria e áreas didáticas. |
| `--color-brand-copper` | `#D97706` | Certificados, alertas e acento premium. |
| `--color-brand-copper-soft` | `#FFF7ED` | Notas e detalhes quentes. |
| `--color-text-primary` | `#0D1B2A` | Texto principal. |
| `--color-text-secondary` | `#2C4058` | Corpo de texto. |
| `--color-text-muted` | `#6B7A8D` | Metadados e legendas. |
| `--color-border` | `#DDE4ED` | Bordas leves. |
| `--color-border-strong` | `#C4CDD8` | Separadores e estados ativos. |

## Tokens de tipografia

| Token CSS | Valor |
|---|---|
| `--font-heading` | Inter, system sans |
| `--font-body` | Inter, system sans |
| `--font-mono` | JetBrains Mono, Fira Code, ui-monospace |
| `--text-display` | 39 px |
| `--text-h1` | 33 px |
| `--text-h2` | 23 px |
| `--text-h3` | 16 px |
| `--text-body` | 16 px |
| `--text-small` | 14 px |
| `--line-body` | 1.6 |

## Tokens de espaçamento

Base 4 px: `--space-2xs` 4 px, `--space-xs` 8 px, `--space-sm` 12 px, `--space-md` 16 px, `--space-lg` 18 px, `--space-xl` 22 px, `--space-2xl` 32 px, `--space-3xl` 44 px.

Cards comuns devem usar `--space-md`. Blocos institucionais podem usar `--space-lg` ou `--space-xl`.

## Tokens de borda

- `--border-hairline`: 1 px solid `--color-border`.
- `--border-strong`: 1 px solid `--color-border-strong`.
- `--border-accent`: 1 px solid `--color-brand-accent`.

Bordas são preferidas a sombras pesadas.

## Tokens de sombra

- `--shadow-soft`: sombra quase imperceptível.
- `--shadow-card`: sombra leve para cards interativos.
- `--shadow-panel`: sombra moderada para painéis especiais.

Sombras não devem inflar cards nem criar atmosfera dramática.

## Tokens de radius

- `--radius-sm`: 4 px.
- `--radius-md`: 8 px.
- `--radius-lg`: 12 px para painéis grandes.
- `--radius-pill`: 999 px para badges.

Cards repetidos ficam em 8 px ou menos.

## Componentes básicos

- `mg-brand-button`: CTA primário/secundário compacto.
- `mg-brand-card`: card editorial claro e denso.
- `mg-brand-badge`: marcador de categoria menor.
- `mg-brand-section`: bloco de página.
- `mg-brand-grid`: grid responsivo.
- `mg-brand-stat`: métrica curta.

## Componentes para cursos

- `mg-brand-hero`: abertura clara com promessa didática.
- `mg-brand-course-card`: card compacto de curso com filete azul.
- `mg-brand-course-layout`: base de página de curso.
- `mg-brand-step-list`: progresso conceito -> exemplo -> R -> interpretação.
- `mg-brand-lab-note`: bloco de laboratório R em fundo claro.

## Componentes para consultoria

- `mg-brand-service-card`: card de consultoria com acento terracota.
- `mg-brand-process`: etapas diagnóstico -> dados -> modelo -> decisão.
- `mg-brand-proof`: evidência técnica, resultado ou critério.

Consultoria deve parecer prática e confiável, usando azul institucional e bordas leves em vez de blocos grandes e quentes.

## Componentes para artigos científicos

- `mg-brand-article-feature`: destaque de artigo.
- `mg-brand-method-chip`: marcador de método.
- `mg-brand-chart-frame`: moldura para gráfico.
- `mg-brand-reference-note`: nota de leitura/referência.

Artigos devem preservar densidade e legibilidade.

## Componentes para certificados

- `mg-brand-certificate`: preview/base visual em papel claro.
- `mg-brand-certificate-seal`: selo ou área de verificação.
- `mg-brand-signature-line`: linha de assinatura.

Certificados usam terracota e azul-escuro de forma pontual.

## Componentes para landing pages

- `mg-brand-hero`.
- `mg-brand-about`.
- `mg-brand-cta-band`.
- `mg-brand-proof-grid`.
- `mg-brand-landing-layout`.

Landing page deve parecer institucional e educacional, não página escura de SaaS.

## Regras de responsividade

- Mobile first.
- Grids colapsam para uma coluna abaixo de 760 px.
- Botões mantêm área mínima de toque de 44 x 44 px.
- Cards repetidos usam altura flexível.
- Tabelas e código rolam horizontalmente quando necessário.
- Não usar tamanho de fonte proporcional à largura da tela.

## Regras de acessibilidade

- Contraste mínimo AA para texto de interface.
- Foco visível em links, botões, cards clicáveis e campos.
- Links com texto curto precisam de `aria-label`.
- Não depender apenas de cor para comunicar estado.
- Respeitar `prefers-reduced-motion`.
- Componentes interativos devem funcionar por teclado.

## Regra de densidade

Cards de preview devem ser eficientes:

- padding comum: 16 px;
- gap interno: 8 a 12 px;
- badges pequenos;
- filetes entre 2 e 4 px;
- texto de card com 2 a 4 linhas;
- sem blocos gigantes quando o conteúdo é simples.
