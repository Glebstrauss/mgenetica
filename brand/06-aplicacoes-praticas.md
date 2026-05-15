# Aplicações práticas

Os exemplos abaixo usam `styles/brand-system.css` e classes `.mg-brand-*`. São trechos implementáveis, não alterações já aplicadas nas páginas principais.

Esta revisão usa a direção clara com as cores atuais do site: base em branco, cinza muito claro e azul-tint; acentos em navy, azul institucional e cyan da logo. Fundos escuros são pontuais.

## 1. Hero section

```html
<section class="mg-brand mg-brand-hero">
  <div class="mg-brand-hero-copy">
    <span class="mg-brand-badge">Melhoramento genético animal</span>
    <h1>Genética quantitativa, genômica e decisão aplicada.</h1>
    <p>Curso, consultoria e divulgação científica com leitura clara, rigor técnico e aplicação prática.</p>
    <div class="mg-brand-actions">
      <a class="mg-brand-button mg-brand-button-primary" href="modules/">Começar curso</a>
      <a class="mg-brand-button mg-brand-button-secondary" href="perfil.html">Conhecer MGenética</a>
    </div>
  </div>
  <figure class="mg-brand-logo-panel" aria-label="Logo em painel claro institucional">
    <img src="images/mgenetica-logo-correct.png" alt="Logo MGenética">
  </figure>
</section>
```

## 2. Card de curso

```html
<article class="mg-brand mg-brand-card mg-brand-course-card">
  <span class="mg-brand-badge">Curso online</span>
  <h3>Melhoramento genético animal</h3>
  <p>Da genética básica à predição genômica, com exemplos, scripts R e interpretação biológica em linguagem acessível.</p>
  <a href="modules/" aria-label="Abrir curso de melhoramento genético animal">Ver trilha</a>
</article>
```

## 3. Card de consultoria

```html
<article class="mg-brand mg-brand-card mg-brand-service-card">
  <span class="mg-brand-badge mg-brand-badge-field">Consultoria</span>
  <h3>Diagnóstico genético do rebanho</h3>
  <p>Organização de dados, parâmetros, critério de seleção e plano de uso dos resultados.</p>
</article>
```

## 4. Sobre a MGenética

```html
<section class="mg-brand mg-brand-about">
  <div>
    <span class="mg-brand-badge">Sobre</span>
    <h2>Ciência aplicada, explicada com clareza.</h2>
  </div>
  <p>A MGenética conecta ensino, consultoria e comunicação científica em melhoramento genético animal com estética clara, institucional e confiável.</p>
</section>
```

## 5. Bloco de chamada para cursos online

```html
<section class="mg-brand mg-brand-cta-band">
  <div>
    <span class="mg-brand-badge">Cursos</span>
    <h2>Aprenda o caminho completo: conceito, cálculo, R e interpretação.</h2>
  </div>
  <a class="mg-brand-button mg-brand-button-primary" href="modules/">Ir para o curso</a>
</section>
```

## 6. Bloco de chamada para consultoria

```html
<section class="mg-brand mg-brand-cta-band mg-brand-cta-field">
  <div>
    <span class="mg-brand-badge mg-brand-badge-field">Consultoria</span>
    <h2>Transforme dados de rebanho em critério técnico de seleção.</h2>
  </div>
  <a class="mg-brand-button mg-brand-button-secondary" href="perfil.html">Ver abordagem</a>
</section>
```

## 7. Destaque para artigo científico

```html
<article class="mg-brand mg-brand-article-feature">
  <span class="mg-brand-badge">Artigo técnico</span>
  <h3>Como interpretar herdabilidade em programas de seleção</h3>
  <p>Leitura guiada sobre variância genética, ambiente e resposta esperada à seleção.</p>
  <div class="mg-brand-method-row">
    <span>h2</span><span>variância</span><span>seleção</span>
  </div>
</article>
```

## 8. Modelo visual para certificados

```html
<article class="mg-brand mg-brand-certificate">
  <div class="mg-brand-certificate-header">
    <img src="images/mgenetica-logo-correct.png" alt="MGenética">
    <span>Certificado</span>
  </div>
  <h2>Conclusão de curso</h2>
  <p>Melhoramento genético animal: fundamentos, parâmetros, avaliação e genômica.</p>
  <div class="mg-brand-signature-line">Assinatura técnica</div>
</article>
```

## 9. Layout base para página de curso

```html
<main class="mg-brand mg-brand-course-layout">
  <header>
    <span class="mg-brand-badge">Módulo 01</span>
    <h1>Revisão de genética básica</h1>
    <p>Objetivo, pré-requisitos e evidência mínima antes do quiz.</p>
  </header>
  <section class="mg-brand-step-list" aria-label="Etapas do estudo">
    <span>Conceito</span>
    <span>Exemplo</span>
    <span>Laboratório R</span>
    <span>Interpretação</span>
  </section>
  <article class="mg-brand-lab-note">
    <h2>Laboratório R</h2>
    <p>Rode o script, altere um parâmetro e explique a mudança biológica.</p>
  </article>
</main>
```

## 11. Regra de uso de fundo escuro

```html
<section class="mg-brand mg-brand-cta-band">
  <div>
    <span class="mg-brand-badge">Uso claro</span>
    <h2>Fundo claro é o padrão da MGenética.</h2>
    <p>Use fundo escuro apenas para logo, rodapé, selo, capa ou contraste institucional curto.</p>
  </div>
</section>
```

## 10. Layout base para landing page institucional

```html
<main class="mg-brand mg-brand-landing-layout">
  <section class="mg-brand-hero">...</section>
  <section class="mg-brand-grid">
    <article class="mg-brand-card">Cursos</article>
    <article class="mg-brand-card">Consultoria</article>
    <article class="mg-brand-card">Divulgação científica</article>
  </section>
  <section class="mg-brand-cta-band">...</section>
</main>
```
