# M14 — Cruzamentos, heterose e complementaridade

## Pergunta simples

Misturar raças ajuda por quê? Imagine dois grupos de cavalos. Um grupo tem boa adaptação, fertilidade e rusticidade. Outro grupo tem melhor desempenho esportivo, tamanho ou conformação para determinada função. Cruzar esses grupos pode produzir uma progênie interessante, mas isso não acontece por mágica. O cruzamento precisa ter objetivo, medida e comparação.

Na M13, vimos que acasalamento entre parentes pode aumentar endogamia. M14 olha o outro lado da decisão: cruzar grupos diferentes pode reduzir a semelhança recente entre pais e explorar diferenças entre raças ou linhagens. O resultado pode envolver heterose, complementaridade, ou as duas coisas ao mesmo tempo.

Heterose é quando a média dos filhos cruzados fica acima da média dos grupos parentais para uma característica. Complementaridade é quando usamos uma raça ou linhagem para uma função e outra raça ou linhagem para outra função. A pergunta correta não é "cruzar sempre melhora?", mas "melhora qual característica, em qual sistema e comparado com qual base?".

## Explicação intuitiva

Pense em combinar ferramentas diferentes para a mesma tarefa. Um martelo não substitui uma chave de boca. Uma chave de boca não substitui um alicate. Juntas, ferramentas diferentes podem resolver uma tarefa melhor que uma ferramenta sozinha, mas só se a tarefa realmente precisar dessa combinação.

No cruzamento, a lógica é parecida. Uma raça materna pode ser valorizada por fertilidade, habilidade materna, temperamento e adaptação. Uma raça paterna pode ser valorizada por crescimento, desempenho, conformação ou aptidão esportiva. Complementaridade acontece quando cada lado entra com uma função planejada.

Heterose é outro ponto. Às vezes, a geração cruzada `F1` supera a média dos parentais em uma característica, como sobrevivência, fertilidade, vigor inicial ou desempenho em determinado índice. Falconer e Mackay (1996) tratam heterose como mudança de média observada em cruzamentos. Porém, heterose não é garantia universal. Ela depende da característica, dos grupos cruzados, do ambiente e do critério de comparação.

## Conceito técnico

Cruzamento é o acasalamento planejado entre animais de grupos genéticos diferentes, como raças, linhagens ou populações. Ele pode ser usado para produzir animais comerciais, testar combinações ou formar populações compostas. Nesta unidade, vamos focar no raciocínio básico, não em sistemas complexos de rotação.

Heterose, ou vigor híbrido, é o desvio da média da geração cruzada em relação à média parental. Se a média dos filhos `F1` é maior que a média dos dois grupos parentais, a heterose é positiva para aquela característica. Se é igual, não há ganho médio em relação à média parental. Se é menor, a heterose é negativa para aquela característica.

Complementaridade é diferente. Ela não exige que o `F1` supere a média parental. Ela exige que os grupos tenham funções diferentes e úteis no sistema. Um exemplo didático: uma linha materna pode ser escolhida por fertilidade e manejo fácil; uma linha paterna pode ser escolhida por desempenho em prova. A progênie pode ser recomendada porque combina funções, mesmo que nem toda característica apresente heterose positiva.

Raça materna é a origem genética usada do lado das fêmeas. Em muitos sistemas, esse lado pesa em fertilidade, parto, cria, temperamento e adaptação. Raça paterna é a origem genética usada do lado dos machos. Em muitos sistemas, esse lado pesa em desempenho, crescimento, conformação ou característica terminal. Essas funções não são leis fixas; são escolhas de planejamento.

## Fórmula

A fórmula didática da heterose em proporção é:

`heterose = (F1 - media_parental) / media_parental`

Para expressar em porcentagem:

`heterose_percentual = heterose * 100`

Onde:

- `F1` é a média da geração cruzada;
- `media_parental` é a média dos dois grupos parentais;
- `heterose` é o desvio proporcional da média `F1` em relação à média parental;
- `heterose_percentual` é o mesmo resultado em porcentagem.

Se `F1` é maior que `media_parental`, a heterose é positiva. Se `F1` é igual à média parental, a heterose é zero. Se `F1` é menor, a heterose é negativa. A unidade do numerador e do denominador precisa ser a mesma: pontos de índice com pontos de índice, quilogramas com quilogramas, taxa com taxa.

A fórmula não prova que o cruzamento é melhor em tudo. Ela responde a uma pergunta restrita: quanto a média `F1` ficou acima ou abaixo da média parental para uma característica específica?

## Exemplo numérico

Considere duas linhagens de cavalos avaliadas por um índice didático de desempenho jovem, medido em pontos. A linhagem `A` tem média `210`. A linhagem `B` tem média `220`. A geração cruzada `F1` tem média `230`.

| Grupo | Média no índice |
|---|---:|
| Linhagem `A` | 210 |
| Linhagem `B` | 220 |
| Média parental | 215 |
| Cruzados `F1` | 230 |

Primeiro, calcule a média parental:

`media_parental = (210 + 220) / 2 = 215`

Depois, calcule a heterose:

`heterose = (230 - 215) / 215`

`heterose = 15 / 215 = 0,0698`

`heterose_percentual = 0,0698 * 100 = 6,98%`

Biologicamente, isso significa que a média `F1` foi cerca de 7% maior que a média dos grupos parentais para esse índice didático. O erro que queremos evitar é dizer "o cruzamento melhorou tudo". O cálculo só avaliou uma característica, em uma comparação específica.

Agora pense em complementaridade. Suponha que a linhagem `A` seja mais adaptada ao manejo local e tenha melhor fertilidade. A linhagem `B` tenha melhor desempenho esportivo. O cruzamento pode ser planejado para produzir animais com boa adaptação e bom desempenho. Essa justificativa é complementaridade. Ela não é a mesma coisa que heterose.

## Tabela parental versus F1

A tabela abaixo separa as duas perguntas:

| Pergunta | Comparação | Resposta |
|---|---|---|
| Houve heterose? | `F1` contra média parental | Sim, `F1 = 230` contra média parental `215` |
| Quanto foi a heterose? | `(230 - 215) / 215 * 100` | `6,98%` |
| Houve complementaridade? | função da raça materna e paterna | Depende do objetivo do sistema |
| O cruzamento é milagre? | todas as características | Não; precisa medir característica por característica |

Essa separação é o centro da unidade. Heterose é um cálculo de desvio da média. Complementaridade é uma decisão de função. Cruzamento planejado precisa das duas leituras.

## Script R mínimo

```r
f1 <- 230
pais <- mean(c(210, 220))
heterose <- (f1 - pais) / pais
heterose_percentual <- heterose * 100
data.frame(F1 = f1, media_parental = pais,
           heterose = heterose,
           heterose_percentual = heterose_percentual)
```

O script calcula a heterose do exemplo. `pais` é a média parental. `heterose` é a proporção. `heterose_percentual` transforma a proporção em porcentagem. O resultado esperado é aproximadamente `0,0698`, ou `6,98%`.

O script não decide sozinho se o cruzamento deve ser usado. Ele só responde se a média `F1` ficou acima da média parental para o índice escolhido. A decisão final precisa considerar objetivo, ambiente, manejo, raça materna, raça paterna e outras características.

## Interpretação biológica

Heterose positiva indica que o cruzado superou a média parental para uma característica. Isso pode ser útil em características ligadas a vigor, fertilidade, sobrevivência ou desempenho, mas precisa ser observado no sistema real. Heterose medida em uma característica não autoriza concluir ganho em todas. Uma característica pode ter heterose positiva, outra pode ser neutra, e outra pode piorar.

Complementaridade aparece quando o cruzamento combina funções. Se a raça materna contribui adaptação, fertilidade e temperamento, e a raça paterna contribui desempenho e conformação, o cruzamento pode fazer sentido mesmo que algumas características não mostrem heterose alta. O foco é o encaixe entre objetivo e função de cada grupo.

O risco didático é vender cruzamento como solução automática. Cruzar animais diferentes pode trazer heterose, mas também pode trazer variabilidade, perda de uniformidade, problemas de manejo, incompatibilidade com registro racial ou resultado ruim para características não medidas. Por isso cruzamento é ferramenta, não atalho.

Também é erro confundir cruzamento com abandono de seleção. Dentro de cada raça ou linhagem, ainda é preciso escolher bons reprodutores. Um cruzamento entre animais ruins não vira bom por causa da palavra "heterose". A base continua sendo avaliação, objetivo e comparação.

## Checkpoint

Você atingiu o checkpoint se consegue separar heterose de complementaridade. Heterose responde: o `F1` superou a média parental? Complementaridade responde: as raças ou linhagens têm funções diferentes que se combinam no sistema?

Uma resposta incompleta seria dizer "misturar raças melhora". A resposta correta precisa dizer qual característica melhorou, qual foi a média parental, qual foi a média `F1`, e qual função cada grupo cumpre no plano de cruzamento.

## Quiz

1. O que é heterose nesta unidade?
2. Qual é a fórmula da heterose proporcional?
3. Se `F1 = 230` e a média parental é `215`, qual é a heterose percentual aproximada?
4. O que é complementaridade?
5. Por que cruzamento não deve ser vendido como milagre?

Gabarito:

1. É o desvio da média `F1` em relação à média dos grupos parentais para uma característica.
2. `heterose = (F1 - media_parental) / media_parental`.
3. `(230 - 215) / 215 = 0,0698`; `0,0698 * 100 = 6,98%`.
4. É o uso planejado de raças ou linhagens com funções diferentes, como uma raça materna adaptada e uma raça paterna de desempenho.
5. Porque o resultado depende da característica, dos grupos cruzados, do ambiente, do manejo e da qualidade dos reprodutores.

## Mini tarefa

Compare duas estratégias de cruzamento:

| Estratégia | Dados | Cálculo | Leitura |
|---|---|---|---|
| `A x B` | `A = 210`, `B = 220`, `F1 = 230` | `(230 - 215) / 215 * 100` | heterose positiva de 6,98% |
| `A x C` | `A = 210`, `C = 240`, `F1 = 225` | `(225 - 225) / 225 * 100` | heterose zero |

Agora escreva uma recomendação com justificativa. Exemplo: "para aumentar o índice didático, `A x B` mostra heterose positiva; para complementaridade, eu só recomendaria se `A` trouxer função materna útil e `B` trouxer função paterna alinhada ao objetivo. Sem essa função clara, o cruzamento não deve ser vendido como solução automática".

## Referências

FALCONER, D. S.; MACKAY, T. F. C. Introduction to quantitative genetics. 4. ed. Harlow: Longman, 1996.
