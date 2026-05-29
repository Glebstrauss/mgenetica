# M19 — Controle de qualidade de dados genômicos

## Pergunta simples

Todo SNP serve? Imagine que um laboratório entregou uma matriz genômica de cavalos com muitos marcadores. Alguns SNPs aparecem em quase todos os animais. Outros têm muitos valores faltantes. Alguns quase não variam: todos os cavalos têm o mesmo genótipo. Outros mostram uma distribuição estranha demais para ser aceita sem checagem. Se o aluno usar tudo sem filtrar, pode levar erro técnico para a análise seguinte.

Na M18, vimos que uma matriz de marcadores transforma genótipos moleculares em números `0`, `1` e `2`. Também vimos que a `MAF` mede a frequência do alelo menos frequente. A M19 pergunta se esses dados estão bons o suficiente para seguir. O foco agora é controle de qualidade: call rate, missing, MAF, HWE e filtro por animal.

Controle de qualidade não é jogar dado fora por hábito. É limpar a balança antes de pesar. Uma balança suja pode medir um animal errado. Uma matriz genômica com muito dado faltante ou marcador quase invariável pode distorcer a leitura. O objetivo desta unidade é aplicar filtros simples e justificar cada filtro sem exagero.

## Explicação intuitiva

A analogia é limpar a balança antes de pesar um cavalo. Se a balança falha em uma pesagem, a medida daquele animal fica suspeita. Se falha em muitas pesagens, talvez a balança inteira precise ser revista. Em dados genômicos, a lógica é parecida: se um SNP falha em muitos animais, esse marcador fica suspeito. Se um animal tem muitos SNPs faltantes, a amostra daquele animal também fica suspeita.

Call rate é a proporção de genótipos observados. Missing é a proporção de genótipos faltantes. Eles são complementares. Se em quatro animais um SNP tem três genótipos observados e um faltante, o missing é `1/4 = 0,25` e o call rate é `3/4 = 0,75`.

MAF entra porque marcador sem variação quase não ajuda a separar animais. Se quase todos os cavalos têm o mesmo genótipo, aquele SNP carrega pouca informação naquele conjunto. HWE, ou equilíbrio de Hardy-Weinberg, entra como checagem de distribuição genotípica. Um desvio muito forte pode indicar erro de genotipagem, estrutura populacional, seleção, endogamia ou outro processo. Por isso, HWE deve ser usado como alerta, não como sentença automática.

## Conceito técnico

Missing rate é a proporção de dados ausentes em uma linha, coluna ou conjunto. Para um SNP, missing rate mede quantos animais não tiveram genótipo lido naquele marcador. Para um animal, mede quantos SNPs ficaram sem chamada naquela amostra.

Call rate é:

`call_rate = 1 - missing_rate`

Se um SNP tem missing rate de `0,25`, seu call rate é `0,75`. Isso significa que `75%` dos genótipos esperados foram observados. Lourenco et al. (2020) descrevem controle de qualidade em dados genômicos incluindo remoção de SNPs com baixo call rate, SNPs que se desviam de Hardy-Weinberg e animais com baixo call rate.

MAF é a frequência do alelo menos frequente. Como visto na M18, se um SNP codificado como `0/1/2` tem frequência do alelo contado igual a `0,05`, a outra frequência é `0,95`, então `MAF = 0,05`. Em uma análise didática, SNPs com `MAF` muito baixa podem ser removidos porque quase não diferenciam os animais.

HWE compara contagens observadas de genótipos com contagens esperadas sob equilíbrio de Hardy-Weinberg. Para um marcador bialélico, se as frequências alélicas são `p` e `q`, as proporções esperadas são:

`AA = p^2`

`AB = 2pq`

`BB = q^2`

Essa fórmula não prova que um SNP é correto ou errado. Ela oferece uma checagem. Desvio forte pode vir de erro técnico, mas também pode vir de biologia, parentesco, estrutura de população ou seleção. Por isso, o checkpoint da unidade pede justificar filtro sem exagero.

## Fórmula

O cálculo manual central da unidade é a proporção de genótipos faltantes:

`missing_rate = numero_de_NA / numero_total_de_genotipos`

No R, para um vetor simples:

`mean(is.na(c(0, 1, NA, 2)))`

O vetor tem quatro posições. Uma posição está faltante (`NA`). Logo:

`missing_rate = 1 / 4 = 0,25`

O call rate é:

`call_rate = 1 - 0,25 = 0,75`

Biologicamente, isso significa que aquele SNP, animal ou subconjunto teve `25%` de informação ausente. Se o threshold didático exigir call rate mínimo de `0,80`, esse item falha. Se o threshold for `0,70`, ele passa. O número não decide sozinho; ele precisa ser comparado com o critério declarado antes da filtragem.

Para MAF, reaproveitamos a lógica da M18:

`freq_alelo = mean(snp, na.rm = TRUE) / 2`

`MAF = min(freq_alelo, 1 - freq_alelo)`

O argumento `na.rm = TRUE` remove genótipos faltantes do cálculo. Isso evita que `NA` quebre a média. Mas essa remoção não apaga o problema: o missing rate ainda deve ser avaliado separadamente.

## Exemplo numérico

Considere quatro cavalos e quatro SNPs. Os valores `0`, `1` e `2` indicam cópias do alelo contado. `NA` indica genótipo faltante.

| Animal | `SNP1` | `SNP2` | `SNP3` | `SNP4` |
|---|---:|---:|---:|---:|
| `Cavalo_1` | 0 | 0 | 0 | 0 |
| `Cavalo_2` | 1 | NA | 0 | 0 |
| `Cavalo_3` | 2 | NA | 0 | 1 |
| `Cavalo_4` | 1 | 2 | 0 | NA |

Use thresholds didáticos:

| Critério | Threshold didático | Interpretação |
|---|---:|---|
| Call rate por SNP | `>= 0,75` | SNP precisa ter pelo menos 75% dos genótipos observados |
| MAF | `>= 0,10` | SNP precisa mostrar alguma variação alélica |
| Call rate por animal | `>= 0,75` | animal precisa ter pelo menos 75% dos SNPs observados |
| HWE | alerta qualitativo | desvio forte exige revisão, não sentença automática |

Para `SNP2`, os genótipos são:

`c(0, NA, NA, 2)`

Há dois genótipos faltantes em quatro:

`missing_rate = 2 / 4 = 0,50`

`call_rate = 1 - 0,50 = 0,50`

Com threshold de `0,75`, `SNP2` falha por baixo call rate. O erro evitado é usar um marcador com metade da informação ausente como se tivesse a mesma confiabilidade dos demais.

Para `SNP3`, os genótipos são:

`c(0, 0, 0, 0)`

Não há missing, então call rate é `1,00`. Mas a frequência do alelo contado é:

`mean(c(0, 0, 0, 0)) / 2 = 0`

Logo, `MAF = 0`. `SNP3` falha por falta de variação. O erro evitado é manter um marcador que não diferencia os animais desse conjunto.

Para `SNP1`, os genótipos são:

`c(0, 1, 2, 1)`

Não há missing, call rate é `1,00`. A frequência do alelo contado é:

`mean(c(0, 1, 2, 1)) / 2 = 0,50`

Logo, `MAF = 0,50`. Esse SNP passa nos filtros didáticos de call rate e MAF.

## HWE em escala didática

Use o próprio `SNP1` para visualizar HWE. Os genótipos são `0`, `1`, `2`, `1`. Se `0 = AA`, `1 = AB` e `2 = BB`, as contagens observadas são:

| Genótipo | Contagem observada |
|---|---:|
| `AA` | 1 |
| `AB` | 2 |
| `BB` | 1 |

A frequência do alelo `B` é:

`q = mean(c(0, 1, 2, 1)) / 2 = 0,50`

Logo:

`p = 1 - q = 0,50`

As proporções esperadas sob HWE são:

`AA = p^2 = 0,25`

`AB = 2pq = 0,50`

`BB = q^2 = 0,25`

Como há quatro animais, as contagens esperadas são:

| Genótipo | Contagem esperada |
|---|---:|
| `AA` | 1 |
| `AB` | 2 |
| `BB` | 1 |

Neste exemplo pequeno, observado e esperado coincidem. Portanto, não há alerta didático de HWE para `SNP1`. Em dados reais, a avaliação de HWE usa teste estatístico e amostra maior. Aqui, a conta serve só para mostrar a lógica.

Agora imagine um SNP didático com quatro animais e genótipos `1`, `1`, `1`, `1`. A frequência do alelo contado ainda é `0,50`, então o esperado sob HWE seria `1` `AA`, `2` `AB` e `1` `BB`. O observado seria `0` `AA`, `4` `AB` e `0` `BB`. Isso não prova erro, mas cria alerta: há excesso de heterozigotos em amostra pequena e o marcador merece revisão antes de seguir.

## Tabela antes e depois dos filtros

A tabela abaixo resume a limpeza. Ela mostra por que o filtro precisa ter motivo declarado.

| SNP | Missing rate | Call rate | MAF | HWE didático | Decisão |
|---|---:|---:|---:|---|---|
| `SNP1` | 0,00 | 1,00 | 0,50 | observado = esperado | manter |
| `SNP2` | 0,50 | 0,50 | 0,50 | não avaliar com pouco dado | remover por baixo call rate |
| `SNP3` | 0,00 | 1,00 | 0,00 | sem variação | remover por MAF baixa |
| `SNP4` | 0,25 | 0,75 | 0,17 | não concluir: n pequeno | manter com ressalva didática |

Antes dos filtros, havia quatro SNPs. Depois dos filtros didáticos, ficam dois: `SNP1` e `SNP4`. A retenção é:

`2 / 4 = 0,50`

Isso significa que `50%` dos marcadores foram mantidos no exemplo. Esse número não é bom nem ruim sozinho. Ele descreve o efeito dos thresholds escolhidos. Se o threshold ficar rígido demais, pode remover informação útil. Se ficar frouxo demais, pode deixar erro técnico seguir para a análise.

Agora olhe os animais. Cada animal tem quatro SNPs:

| Animal | Missing rate | Call rate | Decisão didática |
|---|---:|---:|---|
| `Cavalo_1` | 0,00 | 1,00 | manter |
| `Cavalo_2` | 0,25 | 0,75 | manter |
| `Cavalo_3` | 0,25 | 0,75 | manter |
| `Cavalo_4` | 0,25 | 0,75 | manter |

Com threshold de call rate por animal `>= 0,75`, todos os animais passam. Se o threshold fosse `0,90`, três animais falhariam. Essa comparação mostra por que threshold precisa ser justificado antes de aplicar o filtro.

## Script R mínimo

```r
mean(is.na(c(0, 1, NA, 2)))
geno <- data.frame(
  SNP1 = c(0, 1, 2, 1),
  SNP2 = c(0, NA, NA, 2),
  SNP3 = c(0, 0, 0, 0),
  SNP4 = c(0, 0, 1, NA)
)
miss_snp <- colMeans(is.na(geno))
call_snp <- 1 - miss_snp
freq <- colMeans(geno, na.rm = TRUE) / 2
maf <- pmin(freq, 1 - freq)
data.frame(SNP = names(geno), call_snp, maf)
miss_animal <- rowMeans(is.na(geno))
1 - miss_animal
hwe <- c(0, 1, 2, 1)
obs <- table(factor(hwe, levels = 0:2))
q <- mean(hwe) / 2
p <- 1 - q
exp <- c(p^2, 2 * p * q, q^2) * length(hwe)
obs; exp
```

O script começa com o cálculo-base da unidade: `mean(is.na(c(0, 1, NA, 2)))`, que retorna `0,25`. Depois, calcula missing e call rate por SNP, MAF por SNP e call rate por animal. As últimas linhas mostram HWE em escala mínima: contam genótipos observados, calculam `p` e `q`, e geram contagens esperadas para comparar com o observado. O script não faz GWAS. Ele só prepara uma matriz mínima para decidir o que fica e o que sai.

## Interpretação biológica

Controle de qualidade protege a análise de conclusões falsas. Um SNP com muito missing pode parecer diferente entre animais apenas porque faltou leitura. Um SNP com MAF muito baixa quase não separa indivíduos naquele conjunto. Um desvio forte de HWE pode indicar problema técnico, mas também pode refletir estrutura de população, parentesco, endogamia ou seleção. Por isso, filtro deve ser explicado, não aplicado como ritual.

Call rate por SNP responde: este marcador foi lido em animais suficientes? Call rate por animal responde: esta amostra tem genótipos suficientes para ser confiável? MAF responde: este marcador varia o bastante para informar alguma diferença? HWE responde: a distribuição dos genótipos parece compatível com expectativa simples ou merece revisão?

O erro que a M19 evita é usar matriz genômica suja como se fosse dado final. Em melhoramento animal, o problema não é apenas estatístico. Se um animal é removido por baixa qualidade de genotipagem, ele perde informação na etapa seguinte. Se um SNP ruim fica na matriz, pode criar ruído. A decisão precisa equilibrar limpeza e preservação de informação.

Lourenco et al. (2020) descrevem controles de qualidade que incluem SNPs com baixo call rate, desvios de Hardy-Weinberg e animais com baixo call rate. Nesta aula, transformamos essa ideia em escala manual para que o aluno entenda o motivo de cada filtro antes de usar ferramentas automáticas. Falconer e Mackay (1996) dão a base populacional para pensar frequências alélicas; aqui, essa base aparece na conta de `p`, `q`, `MAF` e HWE.

## Checkpoint

Você atingiu o checkpoint se consegue justificar filtro sem exagero. Resposta curta: removo `SNP2` porque call rate é `0,50`, abaixo do threshold didático de `0,75`; removo `SNP3` porque MAF é `0`, então não separa os animais; mantenho `SNP1` porque call rate é `1,00`, MAF é `0,50` e não há alerta didático de HWE.

Uma resposta completa deve dizer que thresholds são escolhas do estudo. Threshold rígido remove mais dados. Threshold frouxo deixa mais ruído. HWE deve ser tratado como alerta de qualidade e contexto populacional, não como prova automática de erro.

Uma resposta incompleta seria dizer "removi porque está ruim". O correto é nomear o critério, mostrar o número, comparar com o threshold e explicar o erro que o filtro evita.

## Quiz

1. O que é missing rate?
2. O que é call rate?
3. Se `mean(is.na(c(0, 1, NA, 2))) = 0,25`, qual é o call rate?
4. Por que SNP com MAF muito baixa pode ser removido?
5. O que HWE avalia de forma geral?
6. Por que desvio de HWE não deve ser tratado como prova automática de erro?
7. Qual é a diferença entre filtro por SNP e filtro por animal?

Gabarito:

1. É a proporção de genótipos faltantes.
2. É a proporção de genótipos observados.
3. `0,75`.
4. Porque quase não diferencia animais naquele conjunto.
5. Se as contagens genotípicas se aproximam da expectativa baseada nas frequências alélicas.
6. Porque o desvio também pode vir de estrutura populacional, parentesco, endogamia ou seleção.
7. Filtro por SNP remove marcadores ruins; filtro por animal remove amostras com muitos genótipos faltantes.

## Mini tarefa

Use a matriz didática:

| Animal | `SNP1` | `SNP2` | `SNP3` | `SNP4` |
|---|---:|---:|---:|---:|
| `Cavalo_1` | 0 | 0 | 0 | 0 |
| `Cavalo_2` | 1 | NA | 0 | 0 |
| `Cavalo_3` | 2 | NA | 0 | 1 |
| `Cavalo_4` | 1 | 2 | 0 | NA |

Defina thresholds didáticos: call rate por SNP `>= 0,75`, MAF `>= 0,10` e call rate por animal `>= 0,75`. Depois responda:

1. Quais SNPs ficam?
2. Quais SNPs saem?
3. Algum animal sai?
4. Qual é a retenção de SNPs?

Resposta esperada: ficam `SNP1` e `SNP4`; saem `SNP2` por baixo call rate e `SNP3` por MAF baixa; nenhum animal sai; retenção de SNPs é `2/4 = 0,50`. Evidência de conclusão: "conjunto limpo descrito, com critérios declarados e sem dizer que todo SNP removido era biologicamente errado".

## Referências

FALCONER, D. S.; MACKAY, T. F. C. Introduction to quantitative genetics. 4. ed. Harlow: Longman, 1996.

LOURENCO, Daniela et al. Single-Step Genomic Evaluations from Theory to Practice: Using SNP Chips and Sequence Data in BLUPF90. Genes, v. 11, n. 7, article 790, 2020. DOI: 10.3390/genes11070790.
