# M1 — Revisão de genética básica

## Pergunta simples

Dois potros podem nascer dos mesmos pais e ainda assim não serem iguais. Um pode mostrar uma característica de pelagem que o outro não mostra. Um pode receber uma versão de uma instrução biológica do pai e outra versão da mãe. A primeira pergunta desta aula é direta: de onde vem essa diferença?

Nesta unidade, a resposta fica no nível mais básico: DNA, gene, alelo, genótipo, fenótipo e segregação. Ainda não vamos explicar seleção, ganho genético ou caracteres complexos. O objetivo é montar a linguagem mínima para que esses temas façam sentido depois.

## Explicação intuitiva

Imagine que o animal tem uma receita biológica. O DNA é o material onde a receita está escrita. Um gene é uma instrução específica dentro dessa receita. Um alelo é uma versão dessa instrução.

Se a instrução fosse "tipo de característica visível na pelagem", um animal poderia receber uma versão `A` do pai e uma versão `a` da mãe. O par recebido forma o genótipo naquele ponto: `AA`, `Aa` ou `aa`. O que observamos no animal, como presença ou ausência da característica, é o fenótipo.

O cuidado didático aqui é não trocar as palavras:

- `A` ou `a` são alelos.
- `AA`, `Aa` e `aa` são genótipos.
- A característica observada é fenótipo.

Essa separação evita um erro comum: olhar o animal e achar que já conhece exatamente o par de alelos que ele carrega. O fenótipo pode ajudar a levantar uma hipótese, mas ele não substitui a leitura do genótipo.

## Conceito técnico

Um gene é uma região herdável associada a uma informação biológica. Um alelo é uma variante desse gene. Como cavalos são organismos diploides, em um locus autossômico simples cada animal carrega duas cópias: uma herdada do pai e outra herdada da mãe.

O genótipo é a combinação dessas duas cópias. O fenótipo é a característica observável. Em uma característica didática simples, podemos usar:

| Genótipo | Leitura do par de alelos | Fenótipo didático, por regra assumida |
|---|---|---|
| `AA` | duas versões `A` | característica presente |
| `Aa` | uma versão `A` e uma `a` | característica presente no exemplo |
| `aa` | duas versões `a` | característica ausente |

Essa tabela é um modelo de treino, não uma regra geral para pelagem de cavalos. Ela serve para praticar a diferença entre alelo, genótipo e fenótipo sem misturar vários genes ao mesmo tempo.

Ponto crítico: nesse exemplo, observar a característica presente não separa `AA` de `Aa`. Os dois genótipos aparecem com o mesmo fenótipo didático. A razão técnica de isso acontecer será tratada na próxima unidade; aqui, basta reconhecer que fenótipo observado e genótipo escrito não são a mesma coisa.

## Fórmula

No cruzamento `Aa x Aa`, cada genitor pode formar dois tipos de gameta:

- genitor `Aa`: gametas `A` ou `a`;
- cada gameta tem probabilidade `1/2`;
- a progênie recebe um gameta do pai e um gameta da mãe.

As probabilidades genotípicas esperadas são:

`P(AA) = 1/2 x 1/2 = 1/4`

`P(Aa) = 1/2 x 1/2 + 1/2 x 1/2 = 1/2`

`P(aa) = 1/2 x 1/2 = 1/4`

Aqui `P` significa probabilidade, em escala de 0 a 1. O valor `1/4` significa que, em muitas crias simuladas ou observadas sob esse modelo, cerca de uma em cada quatro seria `AA`. O valor `1/2` significa cerca de duas em cada quatro seriam `Aa`.

Em forma de proporção:

`AA : Aa : aa = 1 : 2 : 1`

Biologicamente, isso diz que a diferença entre os potros pode surgir antes mesmo de qualquer comparação de desempenho: ela começa na separação dos alelos nos gametas e na combinação desses gametas na fecundação.

## Exemplo numérico

Considere um cruzamento didático entre dois cavalos `Aa`.

Quadro de Punnett:

| | Gameta A | Gameta a |
|---|---:|---:|
| Gameta A | `AA` | `Aa` |
| Gameta a | `Aa` | `aa` |

Em 20 potros esperados, a proporção `1:2:1` sugere aproximadamente:

| Genótipo | Proporção esperada | Número esperado em 20 |
|---|---:|---:|
| `AA` | 1/4 | 5 |
| `Aa` | 2/4 | 10 |
| `aa` | 1/4 | 5 |

O número esperado não é promessa de resultado exato em um grupo pequeno. Em 20 nascimentos reais, pode aparecer 4, 11 e 5; ou 7, 8 e 5. A proporção é uma expectativa do modelo, não uma garantia para cada família pequena.

## Script R mínimo

```r
set.seed(1)
genotipos <- c("AA", "Aa", "aa")
probabilidades <- c(0.25, 0.50, 0.25)

potros <- sample(genotipos, size = 20, replace = TRUE, prob = probabilidades)
contagem <- table(potros)
proporcao <- prop.table(contagem)

data.frame(
  genotipo = names(contagem),
  n = as.integer(contagem),
  proporcao = round(as.numeric(proporcao), 2)
)
```

O script simula 20 potros de um cruzamento `Aa x Aa`. A linha `set.seed(1)` fixa a simulação para que outra pessoa consiga reproduzir a mesma contagem. A opção `prob = c(0.25, 0.50, 0.25)` representa a expectativa `1:2:1`.

Se a contagem não sair exatamente `5, 10, 5`, isso não é erro: é variação de amostragem em uma família pequena. O resultado deve ser interpretado como uma amostra possível em torno da proporção esperada.

## Interpretação biológica

A segregação explica por que um animal não recebe todos os alelos do pai nem todos os alelos da mãe. Ele recebe uma cópia em cada locus de cada genitor. Quando o genitor é `Aa`, ele pode transmitir `A` ou `a`.

O que se observa no animal é o fenótipo. O que ele carrega no par de alelos é o genótipo. A aula fica correta quando essas duas camadas não são confundidas.

Erro que esta unidade deve evitar: escrever "o animal é `A`". Animal não é alelo. Animal tem genótipo, por exemplo `Aa`, e pode apresentar um fenótipo, por exemplo característica presente.

## Checkpoint

Complete a tabela:

| Situação | Palavra correta |
|---|---|
| `A` | alelo |
| `Aa` | genótipo |
| característica observada na pelagem | fenótipo |
| separação de `A` e `a` nos gametas | segregação |

Se você consegue preencher essa tabela sem consultar o texto, já tem a linguagem mínima da unidade. A evidência de conclusão é uma tabela genotípica interpretada: ela deve mostrar os genótipos esperados e uma frase dizendo o que a proporção significa biologicamente.

## Quiz

1. Em um cruzamento `Aa x Aa`, quais genótipos podem aparecer nos descendentes?
2. Qual é a proporção genotípica esperada?
3. Em `Aa`, quantos alelos estão sendo representados?
4. Uma característica visível na pelagem é alelo, genótipo ou fenótipo?
5. Por que 20 potros simulados podem não sair exatamente como `5 AA`, `10 Aa` e `5 aa`?

Gabarito:

1. `AA`, `Aa` e `aa`.
2. `1:2:1`.
3. Dois alelos, um `A` e um `a`.
4. Fenótipo.
5. Porque a proporção é uma expectativa; em amostras pequenas há flutuação.

## Mini tarefa

Resolva o cruzamento `Aa x aa`.

1. Escreva os gametas possíveis de cada genitor.
2. Monte o quadro de Punnett.
3. Conte os genótipos esperados.
4. Escreva uma frase interpretando o resultado.

Evidência de conclusão: uma tabela genotípica interpretada, separando claramente alelo, genótipo e fenótipo.

## Referências

FALCONER, D. S.; MACKAY, T. F. C. Introduction to quantitative genetics. 4. ed. Harlow: Longman, 1996.

GRIFFITHS, Anthony J. F. et al. Introdução à genética. 11. ed. Rio de Janeiro: Guanabara Koogan, 2016.
