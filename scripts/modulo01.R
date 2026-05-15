# M1 — Revisão de genética básica
# Objetivo: comparar expectativa mendeliana e amostra real pequena.

set.seed(101)

gametas_pai <- c("A", "a")
gametas_mae <- c("A", "a")
quadro <- expand.grid(pai = gametas_pai, mae = gametas_mae)
quadro$genotipo <- ifelse(
  quadro$pai == quadro$mae,
  paste0(quadro$pai, quadro$mae),
  "Aa"
)

esperado <- prop.table(table(quadro$genotipo))
n <- 20
amostra <- sample(names(esperado), n, replace = TRUE, prob = as.numeric(esperado))
observado <- table(factor(amostra, levels = names(esperado)))

resultado <- data.frame(
  genotipo = names(esperado),
  proporcao_esperada = as.numeric(esperado),
  contagem_esperada = as.numeric(esperado) * n,
  contagem_observada = as.numeric(observado)
)

print(resultado)
cat("\nINTERPRETACAO: expectativa mendeliana orienta previsão; amostra pequena pode oscilar.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(resultado, "data/modulo01_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo01_simulado.csv\n")
