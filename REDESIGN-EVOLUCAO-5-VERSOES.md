# MGenetica - Evolucao do Redesign em 5 Versoes

> Registro de direcao e avaliacao critica usado para evoluir o redesign ate a versao publicada.

---

## Problema observado na captura

A capa publicada antes desta iteracao falhava por quatro motivos principais:

- a home carregava sidebar e TOC, comprimindo a area util;
- o hero tinha duas colunas grandes demais para o espaco real disponivel;
- o titulo ultrapassava a coluna e era cortado;
- a logo original nao estava sendo usada como peca principal da capa.

O problema nao era apenas estetico. Era estrutural: a pagina inicial estava se comportando como pagina de modulo.

---

## Versao 1 - Correcao estrutural

Objetivo: impedir que sidebar e TOC destruam a capa.

Decisoes:

- desativar `toc` na home;
- desativar `sidebar` na home;
- tratar a pagina inicial como landing editorial, nao como conteudo de modulo.

Resultado esperado:

- capa com largura real;
- sem competicao visual com listas laterais;
- primeira dobra mais controlada.

Status: aprovada como base, mas insuficiente sozinha.

---

## Versao 2 - Capa com logo original

Objetivo: recuperar a identidade da MGenetica.

Decisoes:

- usar `images/mgenetica-logo-correct.png` na capa;
- abandonar o logo SVG simplificado como principal;
- preservar o fundo escuro original da marca apenas dentro da peca visual.

Resultado esperado:

- identidade mais reconhecivel;
- presenca visual mais forte;
- menos sensacao de template.

Status: aprovada.

---

## Versao 3 - Hero sem gigantismo

Objetivo: resolver o excesso tipografico e o corte do titulo.

Decisoes:

- reduzir o display hero para uma escala maxima controlada;
- limitar largura de texto;
- usar `clamp()` com teto menor;
- manter quebras de linha intencionais;
- equilibrar texto e marca dentro de uma composicao editorial.

Resultado esperado:

- titulo legivel;
- primeira dobra respirando;
- hierarquia forte sem esmagar o layout.

Status: aprovada.

---

## Versao 4 - Sistema visual mais autoral

Objetivo: sair do visual generico de cards e grid.

Decisoes:

- criar faixa superior institucional;
- usar motivo grafico discreto derivado da logo;
- simplificar cards;
- manter bordas finas e sombras moderadas;
- usar navy como autoridade e cyan como acento pontual.

Resultado esperado:

- mais marca;
- menos ruído;
- melhor ritmo entre secoes.

Status: aprovada com ajustes.

---

## Versao 5 - Plataforma cientifica premium

Objetivo: publicar a versao final desta rodada.

Decisoes finais:

- home sem sidebar e sem TOC;
- capa em duas colunas equilibradas;
- logo original na capa;
- fundo claro com um bloco visual escuro controlado;
- tipografia forte, mas sem overflow;
- modulos em grid de 3 colunas no desktop;
- secoes com mais respiro;
- mobile desenhado em uma coluna, com CTA em largura total;
- reducao de efeitos decorativos pesados.

Analise critica:

Esta versao resolve o problema mais grave da captura: a primeira dobra deixa de ser comprimida por elementos laterais e passa a funcionar como capa. A logo volta a ser a referencia visual principal. O hero perde o gigantismo que cortava o texto e ganha proporcao mais institucional. Ainda ha margem para uma etapa futura com direcao visual mais customizada por pagina interna, mas a home passa a ter uma base muito mais solida e publicavel.

Status: publicada.

