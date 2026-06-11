# M9 — Herdabilidade e repetibilidade

## Pergunta simples

O dado de hoje prevê filhos ou repetição? Imagine um cavalo avaliado hoje para desempenho ou andamento. Ele foi bem na pista. Essa informação pode servir para duas perguntas diferentes. A primeira pergunta é: esse desempenho ajuda a prever como serão os filhos desse animal? A segunda pergunta é: esse mesmo animal tende a repetir desempenho parecido em outra avaliação?

Essas duas perguntas parecem próximas, mas não são iguais. A herdabilidade, indicada por `h2`, fala da parte aditiva da variação fenotípica e ajuda a pensar na previsão entre gerações. A repetibilidade, indicada aqui por `r`, fala da consistência de medidas repetidas do mesmo animal. Uma medida pode ser pouco útil para prever filhos, mas ainda assim razoável para prever nova medida do próprio animal. No caso didático desta unidade, para a mesma característica e um desenho usual de medidas repetidas, `r` tende a ser igual ou maior que `h2`, porque inclui a parte aditiva e também diferenças permanentes entre animais.

Na M8, calculamos `h2 = VA / VP` como fração aditiva da variância fenotípica. Agora vamos separar a pergunta "prever progênie" da pergunta "prever nova observação". A analogia é foto única versus filme do mesmo animal. Uma foto mostra um momento. Um filme mostra se aquele padrão se repete.

## Explicação intuitiva

Uma única nota de desempenho é como uma foto. Ela mostra o animal naquele dia, naquele ambiente, com aquele avaliador e naquela condição física. Se o cavalo teve dor, pista ruim ou treino atípico, a foto pode enganar. Uma segunda, terceira ou quarta avaliação funcionam como um filme curto. O filme mostra se o animal costuma ficar acima, perto ou abaixo da média.

Herdabilidade pergunta quanto da variação observada entre animais está ligada à parte genética aditiva. Essa é a parte que entra de modo mais direto na previsão do que pode ser transmitido aos filhos. Repetibilidade pergunta quanto da variação observada está ligada a diferenças permanentes entre animais. Essas diferenças permanentes podem incluir genética e ambiente permanente, como efeito de formação, manejo de base ou condição duradoura que faz o animal manter certo padrão.

O erro que queremos evitar é usar a mesma resposta para duas decisões. Se quero escolher reprodutores, a pergunta central é sobre filhos; por isso `h2` importa. Se quero decidir se preciso medir o mesmo animal de novo antes de classificar seu desempenho individual, a pergunta central é sobre repetição; por isso `r` importa.

## Conceito técnico

`h2` é herdabilidade no sentido restrito usado nesta unidade. Ela é a razão entre variância genética aditiva e variância fenotípica:

`h2 = VA / VP`

`VA` é a variância genética aditiva, e `VP` é a variância fenotípica total. Se `VA = 40` e `VP = 100`, então `h2 = 0,40`. Isso significa que 40% da variação fenotípica do exemplo está associada à parte aditiva do modelo. Não significa que 40% do desempenho de um cavalo individual seja genético. A conta fala da variação entre animais naquela população, característica e ambiente.

Repetibilidade, indicada por `r`, mede a semelhança esperada entre medidas repetidas do mesmo animal. Ela responde à pergunta: se um cavalo foi acima da média hoje, qual a chance de continuar acima da média em outra medida da mesma característica? Nesta aula, vamos tratar repetibilidade como a fração da variação fenotípica ligada a diferenças permanentes entre animais. Essas diferenças permanentes podem incluir a parte genética e efeitos ambientais permanentes.

Acurácia é a confiança na informação usada para decisão. Nesta unidade, vamos usar acurácia em sentido didático: mais informação relevante tende a reduzir incerteza. Se a pergunta é repetir desempenho do próprio animal, medidas repetidas ajudam quando `r` não é alta. Se a pergunta é prever filhos, informação genética/aditiva é mais importante do que repetir a mesma medida sem critério. Portanto, acurácia aumenta quando a informação acrescentada conversa com a pergunta que será respondida.

## Fórmula

A fórmula de herdabilidade da unidade é:

`h2 = VA / VP`

Onde:

- `h2` é a herdabilidade no sentido restrito;
- `VA` é a variância genética aditiva;
- `VP` é a variância fenotípica total.

A escala de `h2` vai de 0 a 1 no exercício. Se `h2 = 0,10`, a fração aditiva da variação fenotípica é baixa. Se `h2 = 0,60`, a fração aditiva é alta. Esses valores são didáticos e dependem da população, ambiente, característica e forma de estimação.

Para repetibilidade, vamos usar uma forma conceitual:

`r = variancia_permanente / VP`

Aqui, `variancia_permanente` representa diferenças que fazem o mesmo animal tender a manter posição semelhante em medidas repetidas. Essa parte pode incluir efeitos genéticos e ambiente permanente. O ambiente temporário, como uma prova ruim em um dia específico, fica fora da parte permanente e reduz a semelhança entre medidas.

Interpretação curta:

- `h2` pergunta sobre filhos;
- `r` pergunta sobre nova medida do mesmo animal;
- acurácia pergunta quanta confiança a informação dá para decidir.

## Exemplo numérico

Considere uma característica de andamento em cavalos, avaliada em pontos. Os valores abaixo são didáticos. Primeiro, use os componentes da M8 para calcular herdabilidade:

| Item | Valor |
|---|---:|
| `VA` | 40 |
| `VP` | 100 |
| `h2 = VA / VP` | 0,40 |

O cálculo é:

`h2 = 40 / 100 = 0,40`

Biologicamente, isso significa que 40% da variação fenotípica no exemplo está associada à variância genética aditiva. Esse número ajuda a pensar na pergunta sobre filhos, porque `VA` é a parte ligada aos efeitos aditivos transmitidos entre gerações.

Agora considere repetibilidade. Suponha que a variância permanente entre animais seja 60 pontos e que `VP = 100`:

| Item | Valor |
|---|---:|
| `variancia_permanente` | 60 |
| `VP` | 100 |
| `r` | 0,60 |

O cálculo conceitual é:

`r = 60 / 100 = 0,60`

Esse valor significa que 60% da variação fenotípica do exemplo está ligada a diferenças persistentes entre animais. Se um cavalo ficou acima da média na primeira avaliação, há uma tendência moderada a alta de ele continuar acima em nova avaliação, desde que a característica, o ambiente e o protocolo sejam comparáveis.

Agora compare as perguntas:

| Situação | Pergunta | Número mais direto |
|---|---|---|
| Escolher reprodutor para filhos | O desempenho prevê progênie? | `h2 = 0,40` |
| Decidir se precisa medir de novo | O animal repetirá padrão semelhante? | `r = 0,60` |
| Julgar confiança da informação | A decisão está bem sustentada? | acurácia |

Com `h2 = 0,40` e `r = 0,60`, uma medida repetida pode ser útil para confirmar o padrão do próprio animal. Mas a previsão sobre filhos continua limitada pela fração aditiva. Repetibilidade maior que herdabilidade não transforma ambiente permanente em herança aditiva.

## Foto única versus filme

Uma foto única é a primeira medida. Ela pode ser suficiente quando a repetibilidade é alta e a decisão é apenas classificar o próprio animal. Se a repetibilidade for baixa, uma foto única é frágil: o resultado pode mudar bastante na próxima avaliação.

O filme é o conjunto de medidas repetidas. Três avaliações de andamento, em datas diferentes e com protocolo semelhante, mostram se o animal mantém padrão. Se as notas são 78, 80 e 79, o filme é consistente. Se as notas são 65, 82 e 70, o filme é instável. Essa instabilidade pede cautela antes de decidir.

Herdabilidade não é filme do mesmo animal. Herdabilidade não pergunta se o cavalo repetirá a própria nota. Ela pergunta sobre a fração aditiva da variação entre animais. Repetibilidade não é previsão direta de filhos. Ela pergunta se o próprio animal tende a repetir desempenho.

## Script R mínimo

```r
VA <- 40
VP <- 100
h2 <- VA / VP
var_perm <- 60
r <- var_perm / VP
data.frame(medida = c("h2", "r"),
           valor = c(h2, r),
           pergunta = c("prever filhos", "prever repeticao"))
```

O script calcula `h2` usando `VA / VP`, como pedido no cálculo manual da unidade. Depois calcula `r` usando a fração permanente didática. A tabela final coloca os dois números lado a lado e associa cada um à pergunta correta.

Se o estudante trocar `VA` para 10 mantendo `VP = 100`, `h2` cai para 0,10. Isso torna a previsão sobre filhos mais fraca no exemplo. Se `r` continuar 0,60, a medida ainda pode ser razoavelmente útil para prever nova medida do mesmo animal. Essa comparação mostra por que `h2` e repetibilidade não são sinônimos.

## Interpretação biológica

Quando `h2` é baixa, a diferença fenotípica entre animais tem pouca fração aditiva no exemplo. Para seleção entre reprodutores, isso sugere que uma única medida individual pode ser pouco informativa sobre o que será transmitido aos filhos. Uma decisão melhor pode exigir mais animais avaliados, parentes, progênie ou informações complementares. A resposta exata depende do desenho de avaliação, mas a lógica é que baixa fração aditiva reduz a confiança na previsão genética feita a partir do fenótipo simples.

Quando `h2` é alta, a variação fenotípica está mais conectada à parte aditiva. Isso não torna a seleção automática nem perfeita, mas aumenta a utilidade do fenótipo para prever diferenças genéticas aditivas. Ainda assim, ambiente, escala e protocolo continuam importantes.

Quando repetibilidade é baixa, medir de novo o mesmo animal tende a ser útil, porque uma única medida tem muito ruído temporário. Quando repetibilidade é alta, uma medida pode representar melhor o padrão individual, e medidas adicionais tendem a acrescentar menos informação sobre a posição do próprio animal. Portanto, a decisão "medir mais animais ou medir mais vezes" depende da pergunta.

Acurácia deve ser pensada junto com essa pergunta. Se a dúvida é repetir desempenho, o aumento de acurácia vem de medidas repetidas comparáveis, feitas com protocolo consistente. Se a dúvida é prever filhos, repetir muitas vezes a mesma avaliação do mesmo animal pode ajudar pouco se não houver informação genética útil. Nesse caso, mais animais avaliados, dados de parentes ou progênie podem sustentar melhor a decisão genética.

Se a pergunta é melhorar previsão sobre filhos em característica com `h2` baixa, medir mais animais e buscar informação familiar pode ser mais útil do que repetir muitas vezes o mesmo animal. Se a pergunta é classificar o desempenho individual em característica com baixa repetibilidade, medir o mesmo animal mais vezes pode ser necessário. Essa é a diferença prática entre `h2` e `r`.

## Checkpoint

Você atingiu o checkpoint se consegue decidir quando medir de novo. Se a pergunta é "este cavalo repetirá este desempenho?", olhe repetibilidade. Se `r` é baixa, medir de novo ajuda. Se `r` é alta, uma medida pode ser mais representativa do padrão do animal.

Se a pergunta é "este cavalo terá filhos superiores?", olhe herdabilidade e informação genética disponível. `h2` ajuda a interpretar a ligação entre fenótipo e parte aditiva, mas não é garantia individual. A resposta correta separa previsão de filhos de previsão de repetição.

## Quiz

1. O que `h2 = VA / VP` mede nesta unidade?
2. O que repetibilidade mede?
3. Uma repetibilidade alta significa automaticamente alta herdabilidade?
4. Se `VA = 20` e `VP = 100`, qual é `h2`?
5. Quando é mais útil medir o mesmo animal de novo?

Gabarito:

1. Mede a fração da variância fenotípica associada à variância genética aditiva.
2. Mede a semelhança esperada entre medidas repetidas do mesmo animal.
3. Não. Repetibilidade pode incluir ambiente permanente, além de efeitos genéticos.
4. `h2 = 0,20`.
5. Quando a repetibilidade é baixa ou quando uma única medida pode estar dominada por ruído temporário.

## Mini tarefa

Compare dois cenários didáticos para andamento:

| Cenário | `VA` | `VP` | `h2` | `r` |
|---|---:|---:|---:|---:|
| A | 10 | 100 | 0,10 | 0,60 |
| B | 60 | 100 | 0,60 | 0,60 |

No cenário A, `h2` é baixa e `r` é moderada a alta. A medida pode ajudar a prever nova medida do mesmo animal, mas é fraca para prever filhos a partir do fenótipo simples. No cenário B, `h2` é alta e `r` é igual; o fenótipo tem maior ligação com a parte aditiva.

Evidência de conclusão: escreva uma decisão. Por exemplo: "no cenário A, eu mediria mais animais ou buscaria informação familiar para melhorar previsão genética; repetiria medida do mesmo animal se a pergunta fosse confirmar desempenho individual. No cenário B, a medida individual tem maior valor para seleção, mas ainda precisa de protocolo uniforme".

## Referências

ELER, Joanir Pereira. Teorias e métodos em melhoramento genético animal: seleção. Pirassununga: Faculdade de Zootecnia e Engenharia de Alimentos da Universidade de São Paulo, 2017. DOI: 10.11606/9788566404135.
