# MGenetica - Projeto de Redesign Visual Premium

> Documento de direcao criativa e especificacao visual. Este arquivo descreve o redesign desejado para o site MGenetica, sem executar alteracoes de codigo. O objetivo e corrigir os problemas esteticos do design atual e estabelecer uma experiencia digital premium, clara, cientifica e institucional.

---

## 1. Diagnostico do design atual

O design atual parte de boas intencoes, mas nao atinge o nivel premium esperado. O resultado ainda parece uma camada visual aplicada sobre uma estrutura de curso, em vez de uma identidade digital madura. Os principais problemas sao:

- **Hero com composicao fraca**: o logo aparece como elemento decorativo isolado e nao como eixo da identidade. A relacao entre texto, marca e espaco negativo ainda parece artificial.
- **Excesso de efeitos pouco editoriais**: sombras, grids, halos e texturas competem com o conteudo. O visual passa mais sensacao de template "tech" do que de marca cientifica refinada.
- **Hierarquia instavel**: titulos, cards, metricas e secoes nao criam uma leitura natural. A pagina nao conduz o usuario com ritmo editorial.
- **Cards genericos**: os cards de modulos e recursos parecem componentes padrao de dashboard. Falta personalidade derivada da logo e falta acabamento de produto premium.
- **Pouca tensao visual**: ha branco, azul e espaco, mas a composicao nao tem momentos memoraveis. Tudo tem peso semelhante.
- **Identidade da logo subutilizada**: a marca tem geometria, contraste, monograma e sensacao de precisao, mas isso nao se transforma em linguagem consistente.
- **Tipografia ainda pouco proprietaria**: a combinacao atual nao cria assinatura suficiente. O uso editorial precisa ser mais controlado e menos decorativo.
- **Responsividade funcional, nao desenhada**: o mobile precisa parecer uma experiencia pensada, nao uma versao empilhada do desktop.

Conclusao: o redesign nao deve adicionar mais efeitos. Deve remover ruido, controlar melhor a composicao e transformar a logo em um sistema visual sobrio, memoravel e rigoroso.

---

## 2. Objetivo do redesign

Transformar o MGenetica em uma plataforma educacional cientifica com percepcao de marca premium.

O site deve parecer:

- serio, confiavel e institucional;
- moderno, mas nao futurista;
- cientifico, mas nao frio;
- premium, mas nao luxuoso em excesso;
- educacional, mas nunca escolar ou infantil;
- tecnologico, mas sem estetica de dashboard generico;
- autoral, com identidade claramente ligada a logo.

O usuario deve sentir nos primeiros segundos:

> "Este e um projeto cientifico bem cuidado, com autoridade e acabamento profissional."

---

## 3. Direcao criativa

### 3.1 Conceito central

**Precisao luminosa.**

O MGenetica deve ser apresentado como uma publicacao digital aplicada a genetica quantitativa. A linguagem visual deve combinar a clareza de um artigo cientifico bem diagramado com o acabamento de um produto digital premium.

Nao e uma landing page de marketing. Nao e um LMS. Nao e um blog academico. E uma experiencia de estudo estruturada, elegante e confiavel.

### 3.2 Principios visuais

1. **Menos elementos, mais decisao**
   Cada elemento precisa ter funcao visual clara. Remover decoracoes que nao reforcem marca, hierarquia ou orientacao.

2. **Logo como sistema, nao como imagem**
   A logo deve orientar proporcao, geometria, contraste, ritmo e acento cromatico. Ela nao deve aparecer apenas como um arquivo no hero.

3. **Branco com profundidade controlada**
   O tema claro deve dominar. Profundidade deve vir de bordas finas, contraste tipografico, espacamento e camadas sutis, nao de sombras pesadas.

4. **Azul como autoridade**
   O azul escuro deve estruturar navegacao, titulos, CTAs e estados de enfase. O cyan deve ser usado com extrema parcimonia.

5. **Ritmo editorial**
   A pagina precisa ter respiro, secoes bem compostas e variacao de densidade. A leitura deve parecer desenhada, nao empilhada.

6. **Mobile como experiencia primaria**
   No mobile, a pagina deve preservar hierarquia, impacto da marca e clareza. Nao basta colapsar grids.

---

## 4. Identidade visual derivada da logo

### 4.1 Elementos da logo a preservar

- Monograma geometrico.
- Linhas limpas e angulares.
- Contraste entre fundo escuro e luz cyan.
- Sensacao de tecnologia e precisao.
- Movimento implícito de dupla helice.
- Presenca institucional forte.

### 4.2 Traducoes para o design

| Elemento da logo | Traducao no site |
|---|---|
| Monograma geometrico | Grid composicional com alinhamentos precisos e cortes retos |
| Dupla helice | Linhas paralelas e sequenciais, nunca icones literais de DNA |
| Cyan luminoso | Acento para foco, progresso, links ativos e detalhes de assinatura |
| Fundo escuro da marca | Uso restrito em momentos de alta presenca: hero, footer ou bloco de assinatura |
| Wordmark forte | Titulos sans-serif firmes, com peso alto e pouco adorno |

### 4.3 Motivo grafico proprietario

Criar um motivo chamado **sequencia M**:

- tres linhas horizontais curtas;
- larguras assimetricas;
- alinhamento preciso;
- uso em divisores, estados ativos, numero de modulo e assinatura do footer;
- sempre pequeno e contido;
- nunca usado como padrao repetitivo decorativo.

Esse motivo deve substituir enfeites genericos como blobs, cards flutuantes exagerados, particulas, icones de laboratorio e ilustracoes infantilizadas.

---

## 5. Paleta visual

### 5.1 Paleta principal

```css
--mg-white:        #ffffff;
--mg-paper:        #f8fafc;
--mg-porcelain:    #f1f5f9;
--mg-line:         #dbe4ee;

--mg-ink:          #0b1726;
--mg-navy:         #0a1f38;
--mg-navy-soft:    #16365f;

--mg-blue:         #1e5799;
--mg-cyan:         #00a8d6;
--mg-cyan-soft:    #dff7ff;

--mg-muted:        #64748b;
--mg-text:         #26384f;
```

### 5.2 Regras cromaticas

- Branco e off-white devem ocupar pelo menos 75% da interface.
- Navy deve ser a cor de autoridade, nao apenas cor de texto.
- Cyan deve aparecer em pequenos pontos de energia visual.
- Evitar grandes gradientes azuis.
- Evitar interfaces monocromaticas em tons de azul.
- Verde, vermelho e amarelo ficam restritos a feedback funcional.
- O fundo escuro da logo deve ser usado como contraste pontual, nao como tema dominante.

---

## 6. Tipografia

### 6.1 Direcao recomendada

Usar um sistema tipografico mais institucional do que editorial-decorativo.

Recomendacao principal:

- **Display e headings**: Inter, Satoshi, Manrope ou IBM Plex Sans.
- **Texto longo**: Inter ou Source Sans 3.
- **Codigo**: JetBrains Mono.

Opcao com serif editorial apenas se for muito controlada:

- **Display pontual**: Newsreader ou Libre Baskerville.
- Usar somente no hero ou em chamadas especiais.
- Nunca usar serif em excesso nos cards.

### 6.2 Escala sugerida

```text
Hero display desktop: 64-76px / line-height 0.98-1.06 / weight 700-800
Hero display mobile: 38-46px / line-height 1.04
H1 paginas internas: 38-48px / weight 750-800
H2 secoes: 26-32px / weight 750
H3 cards: 17-20px / weight 700
Body: 16-17px / line-height 1.65-1.75
Caption: 13-14px / weight 500-600
Eyebrow: 11-12px / uppercase / tracking 0.08em
```

### 6.3 Regras tipograficas

- Sem letter-spacing negativo.
- Titulos grandes devem quebrar em linhas intencionais.
- Evitar paragrafos largos demais no hero.
- Cards devem ter titulos fortes e descricoes discretas.
- Numeros de modulo podem ser grandes, mas devem funcionar como elemento de navegacao, nao decoracao pesada.

---

## 7. Layout e composicao

### 7.1 Estrutura da home

A home deve seguir esta narrativa:

1. **Hero institucional**
   Apresenta marca, proposta e CTA principal.

2. **Prova de estrutura**
   Mostra 12 modulos, scripts em R e dados simulados de forma compacta.

3. **Metodo de aprendizagem**
   Explica conceito, pratica e interpretacao com composicao mais editorial.

4. **Trilha de modulos**
   Lista os 12 modulos com clareza, progressao e densidade controlada.

5. **Recursos praticos**
   Scripts, dados, execucao completa e publicacao.

6. **Referencias**
   Bloco discreto, academico, sem competir com a trilha.

### 7.2 Hero desejado

O hero deve ser o momento mais memoravel do site.

Direcao:

- fundo predominantemente branco;
- logo presente como objeto de identidade, nao como card lateral pesado;
- composicao assimetrica com texto forte a esquerda e marca integrada ao ambiente;
- CTA primario navy;
- CTAs secundarios discretos;
- uso de um unico detalhe cyan proprietario;
- altura suficiente para parecer premium, mas com indicio da proxima secao visivel.

Evitar:

- card escuro grande apenas para abrigar a logo;
- hero com split rigido 50/50;
- fundo cheio de grids ou efeitos;
- gradientes chamativos;
- excesso de sombra;
- logo pequena demais ou decorativa demais.

### 7.3 Grid de modulos

O grid de modulos deve parecer uma matriz curricular premium.

Direcao:

- desktop: 3 colunas, nao 4, para dar mais area aos titulos;
- cards com altura consistente;
- bordas finas;
- fundo branco;
- hover sutil com borda cyan ou elevacao minima;
- numero do modulo como marcador claro;
- titulo com alto contraste;
- descricao curta e legivel.

Evitar:

- cards apertados;
- quatro colunas no desktop se os titulos ficarem comprimidos;
- numeros gigantes decorativos sem funcao;
- sombras fortes;
- cantos arredondados demais.

### 7.4 Paginas internas

As paginas dos modulos devem ter a mesma qualidade da home.

Elementos esperados:

- cabecalho de modulo com numero, titulo, resumo e objetivos;
- callouts com hierarquia visual clara;
- blocos de codigo integrados ao design;
- tabelas com visual tecnico premium;
- navegacao anterior/proximo com contexto;
- progresso visivel, mas discreto.

---

## 8. Componentes

### 8.1 Navbar

- Altura entre 64 e 72px.
- Fundo branco levemente translúcido apenas se o resultado for limpo.
- Logo com tamanho suficiente para reconhecimento.
- Links com estados hover discretos.
- Ativo com sublinhado ou pequeno marcador cyan, nao preenchimento pesado.

### 8.2 Botoes

Primario:

- fundo navy;
- texto branco;
- raio de 8px;
- sem gradiente;
- hover com leve deslocamento ou borda cyan sutil.

Secundario:

- fundo branco;
- borda fina;
- texto navy;
- hover com fundo porcelain.

### 8.3 Cards

- raio de 8px;
- borda fina;
- sombra minima ou nenhuma;
- padding generoso;
- hierarquia interna clara;
- hover quase imperceptivel.

### 8.4 Callouts

Tipos recomendados:

- Conceito;
- Interpretacao;
- Pratica em R;
- Atencao;
- Exercicio.

Cada tipo deve ter cor funcional moderada e icone discreto, nunca ilustracao grande.

### 8.5 Footer

O footer pode ser o segundo momento escuro do site, usando navy profundo ou quase preto da logo.

Deve conter:

- assinatura MGenetica;
- motivo sequencia M;
- links essenciais;
- descricao curta;
- contraste elegante.

---

## 9. Movimento e microinteracoes

Movimento deve ser sutil e util.

Permitido:

- transicoes de 120-180ms;
- hover com leve elevacao de 1-2px;
- foco com outline acessivel;
- scroll suave;
- progress bar discreta.

Evitar:

- animacoes de entrada em massa;
- objetos flutuantes;
- brilho pulsante;
- transformacoes exageradas;
- efeitos que chamem mais atencao que o conteudo.

---

## 10. Responsividade

### 10.1 Desktop

- largura maxima entre 1120 e 1240px;
- colunas com respiro;
- hero com composicao ampla;
- cards de modulo em 3 colunas.

### 10.2 Tablet

- hero reduzido sem perder impacto;
- grids em 2 colunas quando houver largura real;
- navbar sem quebrar visualmente.

### 10.3 Mobile

- hero em uma coluna;
- titulo com quebra manual ou largura controlada;
- CTA principal em largura total;
- cards em uma coluna;
- espacamento vertical generoso;
- sem elementos decorativos que ocupem area util;
- logo ainda reconhecivel.

---

## 11. Acessibilidade e legibilidade

Requisitos:

- contraste minimo WCAG AA;
- foco visivel em links e botoes;
- texto nunca abaixo de 14px em conteudo real;
- links distinguiveis por cor e estado;
- cards clicaveis com alvo claro;
- imagens com alt text significativo;
- layout funcional sem animacoes.

---

## 12. Criterios de aprovacao visual

O redesign so deve ser considerado aprovado se:

- a primeira dobra parecer autoral e institucional;
- a logo orientar a linguagem sem ser repetida em excesso;
- os cards nao parecerem Bootstrap padrao;
- o site parecer de uma marca cientifica seria;
- o mobile parecer desenhado, nao apenas responsivo;
- nao houver excesso de brilho, grid, sombra ou decoracao;
- a tipografia tiver hierarquia limpa;
- a home conduzir naturalmente para a trilha;
- cada secao tiver papel claro;
- o conjunto parecer mais proximo de um produto premium do que de um template educacional.

---

## 13. Anti-referencias

Evitar explicitamente:

- estetica Apple copiada;
- hero split generico com texto de um lado e card do outro;
- gradientes roxo/azul dominantes;
- cards empilhados sem direcao;
- icones clichês de DNA, microscopio ou laboratorio;
- ilustracoes infantis;
- bokeh, bolhas, blobs e decoracoes abstratas gratuitas;
- excesso de glassmorphism;
- shadows pesadas;
- fontes serifadas usadas como truque visual;
- dashboard SaaS generico.

---

## 14. Referencias de qualidade visual

Usar como nivel de criterio, nao como copia:

- Linear: disciplina, espacamento, hierarquia e sobriedade.
- Vercel: limpeza, contraste e precisao tecnica.
- Stripe: sistemas de componentes e narrativa clara.
- Notion: legibilidade e organizacao de conteudo.
- Arc: personalidade controlada.
- Quanta Magazine: autoridade editorial cientifica.
- Relume: estrutura de landing pages bem resolvida.

---

## 15. Direcao final recomendada

O proximo redesign deve ser menos "visual effect" e mais **direcao de arte aplicada**.

A melhor rota e:

1. reconstruir a home com uma composicao mais limpa;
2. reduzir decoracoes ao motivo proprietario da logo;
3. usar 3 colunas para modulos;
4. fortalecer navbar, hero e footer;
5. aplicar o mesmo sistema aos modulos internos;
6. testar mobile antes de considerar pronto;
7. revisar removendo qualquer elemento que pareca template.

O MGenetica deve parecer uma plataforma cientifica premium porque e preciso, claro e bem composto, nao porque tem muitos efeitos.

