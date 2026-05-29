# Estrutura atual do curso MGenética

**Fonte:** `data/course-structure-redesign.yml`
**ID:** `undergrad-animal-breeding-21`
**Título:** Trilha de graduação em melhoramento genético animal
**Status:** draft
**Política de publicação:** `branch-review-only`

## Público-alvo

- Zootecnia
- Medicina Veterinária
- Agronomia
- Biologia
- áreas afins

## Modelo didático

1. pergunta simples
2. explicação intuitiva
3. conceito técnico
4. fórmula quando houver
5. exemplo numérico
6. script R mínimo
7. interpretação biológica
8. quiz
9. mini tarefa

## Status de conclusão

- não iniciado
- em andamento
- concluído

## Hierarquia

Curso
└── Módulo
    └── Bloco temático
        └── Item de estudo

## Itens padrão por bloco temático

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

## Módulos e blocos temáticos

### Módulo 1 — Fundamentos

**Resumo:** Revisão de base genética antes de entrar em populações e genética quantitativa.

**Blocos temáticos:** M1, M2

#### M1 — Revisão de genética básica

- **Pergunta Feynman:** De onde vem a diferença entre animais?
- **Objetivo:** Revisar gene, alelo, genótipo, fenótipo e segregação.
- **Pré-requisitos:** Nenhum.
- **Tópicos:** DNA, gene, alelo, genótipo, fenótipo, segregação
- **Analogia:** Alelos são versões de uma instrução na receita do animal.
- **Exemplo animal:** Pelagem ou característica simples em bovinos.
- **Cálculo manual:** Cruzamento Aa x Aa com proporção 1:2:1.
- **Script R mínimo:** `table(sample(c("AA", "Aa", "aa"), 20, replace = TRUE))`
- **Visual sugerido:** Quadro de Punnett e tabela de contagem.
- **Checkpoint:** Diferenciar alelo, genótipo e fenótipo.
- **Tarefa:** Resolver um cruzamento simples.
- **Evidência de conclusão:** Tabela genotípica interpretada.
- **Tempo estimado:** 90 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M2 — Modos de ação gênica

- **Pergunta Feynman:** Um gene sempre soma do mesmo jeito?
- **Objetivo:** Entender efeitos aditivos, dominância e epistasia antes da genética quantitativa.
- **Pré-requisitos:** M1.
- **Tópicos:** aditividade, dominância, epistasia, valor genotípico
- **Analogia:** Alguns botões somam volume, outros escondem ou mudam o efeito de outro botão.
- **Exemplo animal:** Diferenças de ganho de peso entre genótipos.
- **Cálculo manual:** Comparar valores AA, Aa e aa com efeito aditivo e dominância.
- **Script R mínimo:** `data.frame(gen = c("AA", "Aa", "aa"), valor = c(10, 8, 4))`
- **Visual sugerido:** Barras por genótipo.
- **Checkpoint:** Dizer quando heterozigoto foge da média dos homozigotos.
- **Tarefa:** Alterar dominância e interpretar o novo valor.
- **Evidência de conclusão:** Frase ligando ação gênica à resposta esperada.
- **Tempo estimado:** 90 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

### Módulo 2 — Genética de populações

**Resumo:** Frequências, equilíbrio e forças que mudam alelos em rebanhos.

**Blocos temáticos:** M3, M4, M5

#### M3 — Genética de populações I: frequências alélicas e genotípicas

- **Pergunta Feynman:** Quantos alelos existem no rebanho?
- **Objetivo:** Calcular frequências alélicas e genotípicas.
- **Pré-requisitos:** M1.
- **Tópicos:** contagem de genótipos, p, q, frequência genotípica
- **Analogia:** Contar cores de fichas em um saco.
- **Exemplo animal:** Frequência de um alelo em lote de matrizes.
- **Cálculo manual:** p = (2AA + Aa) / 2N.
- **Script R mínimo:** `gen <- c("AA","Aa","aa","Aa"); mean(gen == "AA")`
- **Visual sugerido:** Tabela AA, Aa, aa, p e q.
- **Checkpoint:** Calcular p e q sem software.
- **Tarefa:** Estimar frequências em uma população pequena.
- **Evidência de conclusão:** p, q e interpretação do alelo mais comum.
- **Tempo estimado:** 90 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M4 — Hardy-Weinberg, alelos múltiplos e genes ligados ao sexo

- **Pergunta Feynman:** Quando uma população fica previsível?
- **Objetivo:** Usar Hardy-Weinberg como expectativa, não como dogma.
- **Pré-requisitos:** M3.
- **Tópicos:** p2, 2pq, q2, equilíbrio, alelos múltiplos, ligação ao sexo
- **Analogia:** Baralho bem embaralhado gera proporções esperadas.
- **Exemplo animal:** Frequência esperada de genótipos em rebanho grande.
- **Cálculo manual:** Para p = 0,7, calcular p2, 2pq e q2.
- **Script R mínimo:** `p <- .7; c(AA = p^2, Aa = 2*p*(1-p), aa = (1-p)^2)`
- **Visual sugerido:** Barras observado versus esperado.
- **Checkpoint:** Explicar diferença entre observado e esperado.
- **Tarefa:** Testar se uma contagem pequena parece em equilíbrio.
- **Evidência de conclusão:** Tabela esperado/observado interpretada.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M5 — Fatores que alteram frequências gênicas

- **Pergunta Feynman:** Por que alelos mudam com o tempo?
- **Objetivo:** Comparar seleção, migração, mutação e deriva.
- **Pré-requisitos:** M4.
- **Tópicos:** seleção, migração, mutação, deriva genética, tamanho efetivo
- **Analogia:** Correnteza muda direção de folhas no rio.
- **Exemplo animal:** Aumento de alelo favorável por seleção artificial.
- **Cálculo manual:** Mudança simples de p após seleção contra aa.
- **Script R mínimo:** `p <- .4; for(i in 1:5) p <- p + .05; p`
- **Visual sugerido:** Linha de frequência por geração.
- **Checkpoint:** Separar mudança dirigida de mudança aleatória.
- **Tarefa:** Simular população pequena e grande.
- **Evidência de conclusão:** Comparação entre seleção e deriva.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

### Módulo 3 — Genética quantitativa

**Resumo:** Variação contínua, parâmetros, seleção e consequências entre características.

**Blocos temáticos:** M6, M7, M8, M9, M10, M11, M12

#### M6 — Valores e médias: fenótipo, genótipo e ambiente

- **Pergunta Feynman:** Animal bom é gene bom ou ambiente bom?
- **Objetivo:** Separar P, G e E em exemplos pequenos.
- **Pré-requisitos:** M2, M5.
- **Tópicos:** P = G + E, média, desvio, ambiente
- **Analogia:** Nota final mistura preparo, condição do dia e ruído.
- **Exemplo animal:** Peso à desmama em fazendas diferentes.
- **Cálculo manual:** P = G + E para três animais.
- **Script R mínimo:** `G <- c(10, 12, 8); E <- c(1, -2, 3); G + E`
- **Visual sugerido:** Tabela P, G, E.
- **Checkpoint:** Interpretar animal com P alto e G moderado.
- **Tarefa:** Alterar ambiente e comparar ranking.
- **Evidência de conclusão:** Ranking antes/depois do ajuste.
- **Tempo estimado:** 90 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M7 — Noções de genética quantitativa

- **Pergunta Feynman:** Por que peso não parece ervilha de Mendel?
- **Objetivo:** Entender muitos genes pequenos mais ambiente.
- **Pré-requisitos:** M6.
- **Tópicos:** poligenia, distribuição contínua, média, variação
- **Analogia:** Muitos botões pequenos regulam o mesmo resultado.
- **Exemplo animal:** Produção de leite.
- **Cálculo manual:** Somar efeitos de três loci.
- **Script R mínimo:** `rowSums(matrix(sample(0:2, 30, TRUE), ncol = 3))`
- **Visual sugerido:** Histograma de valores.
- **Checkpoint:** Explicar por que distribuição fica contínua.
- **Tarefa:** Mudar número de loci simulados.
- **Evidência de conclusão:** Histograma interpretado.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M8 — Componentes de variância

- **Pergunta Feynman:** Qual parte da variação ajuda seleção?
- **Objetivo:** Entender VA, VD, VI, VE e VP.
- **Pré-requisitos:** M7.
- **Tópicos:** variância aditiva, dominância, epistasia, ambiente, VP
- **Analogia:** Dividir uma conta em fontes de gasto.
- **Exemplo animal:** Ganho médio diário.
- **Cálculo manual:** VP = VA + VD + VI + VE.
- **Script R mínimo:** `parts <- c(VA=40, VD=10, VI=5, VE=45); sum(parts)`
- **Visual sugerido:** Tabela ou barras empilhadas.
- **Checkpoint:** Identificar por que VA é central para seleção.
- **Tarefa:** Dobrar VE e interpretar h2.
- **Evidência de conclusão:** VP e fração aditiva calculadas.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M9 — Herdabilidade e repetibilidade

- **Pergunta Feynman:** O dado de hoje prevê filhos ou repetição?
- **Objetivo:** Diferenciar h2 e repetibilidade.
- **Pré-requisitos:** M8.
- **Tópicos:** h2, repetibilidade, medida repetida, acurácia
- **Analogia:** Foto única versus filme do mesmo animal.
- **Exemplo animal:** Produção de leite em lactações.
- **Cálculo manual:** h2 = VA / VP.
- **Script R mínimo:** `VA <- 40; VP <- 100; VA / VP`
- **Visual sugerido:** Quadro comparando h2 e r.
- **Checkpoint:** Decidir quando medir de novo.
- **Tarefa:** Comparar h2 baixa e alta.
- **Evidência de conclusão:** Decisão sobre medir mais animais ou mais vezes.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M10 — Seleção e ganho genético

- **Pergunta Feynman:** Escolher os melhores muda a próxima geração quanto?
- **Objetivo:** Calcular diferencial, resposta e ganho por geração.
- **Pré-requisitos:** M9.
- **Tópicos:** seleção, S, R, intensidade, intervalo de geração
- **Analogia:** Peneira mais fina deixa passar menos animais.
- **Exemplo animal:** Seleção dos 20% melhores touros.
- **Cálculo manual:** R = h2 * S.
- **Script R mínimo:** `h2 <- .3; S <- 20; h2 * S`
- **Visual sugerido:** Linha de ganho por geração.
- **Checkpoint:** Relacionar intensidade e risco.
- **Tarefa:** Mudar proporção selecionada.
- **Evidência de conclusão:** Ganho esperado interpretado.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M11 — Correlações genéticas, fenotípicas e ambientais

- **Pergunta Feynman:** Melhorar peso pode piorar outra característica?
- **Objetivo:** Interpretar rA, rP e rE.
- **Pré-requisitos:** M10.
- **Tópicos:** covariância, correlação, resposta correlacionada, trade-off
- **Analogia:** Dois termômetros ligados por cabos diferentes.
- **Exemplo animal:** Peso e espessura de gordura.
- **Cálculo manual:** correlação = covxy / sqrt(vx * vy).
- **Script R mínimo:** `cor(c(1,2,3), c(1,3,5))`
- **Visual sugerido:** Heatmap de correlações.
- **Checkpoint:** Separar correlação genética de fenotípica.
- **Tarefa:** Interpretar resposta correlacionada.
- **Evidência de conclusão:** Trade-off descrito.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M12 — Características de limiar

- **Pergunta Feynman:** Como genética muda uma resposta sim/não?
- **Objetivo:** Entender escala subjacente para características categóricas.
- **Pré-requisitos:** M9.
- **Tópicos:** limiar, suscetibilidade, prevalência, escala subjacente
- **Analogia:** Nota invisível define aprovado ou reprovado.
- **Exemplo animal:** Prenhez, sobrevivência ou doença.
- **Cálculo manual:** Contar proporção acima de um limiar.
- **Script R mínimo:** `x <- rnorm(100); mean(x > 1)`
- **Visual sugerido:** Curva normal com limiar.
- **Checkpoint:** Explicar por que sim/não ainda pode ter base quantitativa.
- **Tarefa:** Mudar limiar e observar prevalência.
- **Evidência de conclusão:** Prevalência interpretada.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

### Módulo 4 — Parentesco, cruzamentos e avaliação genética

**Resumo:** Pedigree, endogamia, cruzamentos, ranking, modelos mistos e BLUP.

**Blocos temáticos:** M13, M14, M15, M16, M17

#### M13 — Endogamia e parentesco

- **Pergunta Feynman:** Parentes aumentam semelhança ou risco?
- **Objetivo:** Calcular parentesco simples e interpretar F.
- **Pré-requisitos:** M8.
- **Tópicos:** pedigree, matriz A, parentesco, endogamia
- **Analogia:** Receber a mesma carta pelos dois lados da família.
- **Exemplo animal:** Acasalamento entre aparentados.
- **Cálculo manual:** Parentesco esperado entre meio-irmãos.
- **Script R mínimo:** `matrix(c(1,.25,.25,1), 2)`
- **Visual sugerido:** Pedigree pequeno e matriz.
- **Checkpoint:** Identificar diagonal 1 + F.
- **Tarefa:** Comparar pares aparentados e não aparentados.
- **Evidência de conclusão:** Parentesco e risco de endogamia descritos.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M14 — Cruzamentos, heterose e complementaridade

- **Pergunta Feynman:** Misturar raças ajuda por quê?
- **Objetivo:** Entender heterose e complementaridade sem vender milagre.
- **Pré-requisitos:** M13.
- **Tópicos:** cruzamento, heterose, complementaridade, raça materna, raça paterna
- **Analogia:** Combinar ferramentas diferentes para mesma tarefa.
- **Exemplo animal:** Cruzamento industrial em bovinos de corte.
- **Cálculo manual:** heterose percentual = (F1 - média parental) / média parental.
- **Script R mínimo:** `f1 <- 230; pais <- mean(c(210, 220)); (f1 - pais) / pais`
- **Visual sugerido:** Tabela parental versus F1.
- **Checkpoint:** Separar heterose de complementaridade.
- **Tarefa:** Comparar duas estratégias de cruzamento.
- **Evidência de conclusão:** Recomendação de cruzamento com justificativa.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M15 — Avaliação genética: DEP/EBV e ranking de animais

- **Pergunta Feynman:** Ranking por fenótipo basta?
- **Objetivo:** Entender EBV, DEP e acurácia como decisão corrigida.
- **Pré-requisitos:** M10, M13.
- **Tópicos:** EBV, DEP, acurácia, ranking, fenótipo corrigido
- **Analogia:** Boletim corrigido por dificuldade da prova.
- **Exemplo animal:** Comparar touros por DEP.
- **Cálculo manual:** DEP = EBV / 2.
- **Script R mínimo:** `ebv <- c(20, 8, -4); ebv / 2`
- **Visual sugerido:** Tabela de ranking.
- **Checkpoint:** Explicar por que maior fenótipo não basta.
- **Tarefa:** Escolher animal com EBV, DEP e acurácia.
- **Evidência de conclusão:** Ranking defendido.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M16 — Modelos lineares e modelos mistos

- **Pergunta Feynman:** Como tirar efeito da fazenda?
- **Objetivo:** Separar efeitos fixos, aleatórios e resíduo.
- **Pré-requisitos:** M15.
- **Tópicos:** y = Xb + Zu + e, efeito fixo, efeito aleatório, resíduo
- **Analogia:** Ajustar uma régua torta antes de comparar animais.
- **Exemplo animal:** Peso corrigido por fazenda e sexo.
- **Cálculo manual:** Fenótipo ajustado = observado - efeito fixo.
- **Script R mínimo:** `lm(peso ~ fazenda + sexo, data = dados)`
- **Visual sugerido:** Resíduos por grupo.
- **Checkpoint:** Dizer o que é fixo e o que é aleatório.
- **Tarefa:** Comparar ranking bruto e ajustado.
- **Evidência de conclusão:** Mudança de ranking explicada.
- **Tempo estimado:** 120 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M17 — BLUP e modelo animal

- **Pergunta Feynman:** Como parentes ajudam predizer animal?
- **Objetivo:** Entender BLUP, encolhimento, matriz A e modelo animal.
- **Pré-requisitos:** M16.
- **Tópicos:** BLUP, MME, matriz A, lambda, acurácia
- **Analogia:** Testemunhas familiares ajudam quando prova individual é fraca.
- **Exemplo animal:** Jovem touro com parentes avaliados.
- **Cálculo manual:** Predição encolhida com h2 simples.
- **Script R mínimo:** `y <- 20; h2 <- .3; h2 * y`
- **Visual sugerido:** Matriz A e ranking EBV.
- **Checkpoint:** Explicar encolhimento para média.
- **Tarefa:** Mudar h2 e observar EBV.
- **Evidência de conclusão:** EBV interpretado com parentesco.
- **Tempo estimado:** 120 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

### Módulo 5 — Genômica aplicada ao melhoramento

**Resumo:** Marcadores SNP, controle de qualidade, matriz G, GWAS, predição e projeto final.

**Blocos temáticos:** M18, M19, M20, M21

#### M18 — Genômica, marcadores SNP e dados moleculares

- **Pergunta Feynman:** DNA melhora o pedigree?
- **Objetivo:** Entender SNP, genótipo 0/1/2 e frequência alélica.
- **Pré-requisitos:** M5, M17.
- **Tópicos:** SNP, genótipo molecular, MAF, matriz de marcadores
- **Analogia:** Código de barras genético.
- **Exemplo animal:** Chip SNP bovino.
- **Cálculo manual:** MAF de um marcador 0/1/2.
- **Script R mínimo:** `snp <- c(0,1,2,1,0); mean(snp) / 2`
- **Visual sugerido:** Histograma de MAF.
- **Checkpoint:** Interpretar 0, 1 e 2 como cópias alélicas.
- **Tarefa:** Calcular MAF em três SNPs.
- **Evidência de conclusão:** SNP informativo identificado.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M19 — Controle de qualidade de dados genômicos

- **Pergunta Feynman:** Todo SNP serve?
- **Objetivo:** Aplicar filtros de call rate, MAF e HWE.
- **Pré-requisitos:** M18.
- **Tópicos:** call rate, missing, MAF, HWE, filtro por animal
- **Analogia:** Limpar balança antes de pesar.
- **Exemplo animal:** Remover marcadores ruins antes de GWAS.
- **Cálculo manual:** Proporção de genótipos faltantes.
- **Script R mínimo:** `mean(is.na(c(0, 1, NA, 2)))`
- **Visual sugerido:** Tabela antes/depois dos filtros.
- **Checkpoint:** Justificar filtro sem exagero.
- **Tarefa:** Definir thresholds e observar retenção.
- **Evidência de conclusão:** Conjunto limpo descrito.
- **Tempo estimado:** 100 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M20 — Matrizes genômicas, GWAS e predição genômica

- **Pergunta Feynman:** DNA aponta parentesco, região ou valor futuro?
- **Objetivo:** Diferenciar matriz G, GWAS e predição.
- **Pré-requisitos:** M19.
- **Tópicos:** matriz G, GWAS, GBLUP, validação, predição
- **Analogia:** DNA como mapa de parentesco e pistas de regiões importantes.
- **Exemplo animal:** Mérito genômico para seleção precoce.
- **Cálculo manual:** Parentesco genômico simplificado por marcadores centrados.
- **Script R mínimo:** `scale(matrix(sample(0:2, 20, TRUE), nrow = 5)) |> tcrossprod()`
- **Visual sugerido:** Heatmap G e Manhattan plot.
- **Checkpoint:** Separar pergunta de parentesco, associação e predição.
- **Tarefa:** Interpretar pico e acurácia de predição.
- **Evidência de conclusão:** Decisão sobre uso de informação genômica.
- **Tempo estimado:** 130 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

#### M21 — Projeto final: pipeline completo de seleção

- **Pergunta Feynman:** Quem seleciono e por quê?
- **Objetivo:** Integrar fenótipo, pedigree, genômica, QC, EBV/DEP e decisão.
- **Pré-requisitos:** M1-M20.
- **Tópicos:** pipeline, controle de dados, ranking, decisão, relatório
- **Analogia:** Comitê técnico junta evidências antes de comprar ou descartar animal.
- **Exemplo animal:** Seleção de reprodutores em rebanho simulado.
- **Cálculo manual:** Índice simples ponderando DEP e penalidade de endogamia.
- **Script R mínimo:** `score <- dep - 10 * parentesco; order(score, decreasing = TRUE)`
- **Visual sugerido:** Tabela final com ranking e justificativa.
- **Checkpoint:** Defender seleção com evidência, não preferência.
- **Tarefa:** Entregar relatório curto e script reprodutível.
- **Evidência de conclusão:** Pipeline final executado e decisão defendida.
- **Tempo estimado:** 180 min
- **Status esperado:** não iniciado

**Itens de estudo:**

1. Leitura: pergunta simples
2. Conceito: conceito técnico e analogia
3. Exercício: cálculo manual pequeno
4. Laboratório R: script R mínimo
5. Quiz: verificação de conhecimento

