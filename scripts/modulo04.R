# M4 — Hardy-Weinberg
# Objetivo: comparar contagens observadas e esperadas.

p <- 0.70
q <- 1 - p
n <- 100
esperado <- c(AA = p^2, Aa = 2 * p * q, aa = q^2) * n
observado <- c(AA = 45, Aa = 46, aa = 9)
comparacao <- data.frame(
  genotipo = names(esperado),
  esperado = as.numeric(esperado),
  observado = as.numeric(observado),
  diferenca = as.numeric(observado - esperado)
)

print(comparacao)
cat("\nINTERPRETACAO: Hardy-Weinberg é régua de comparação, não prova automática de causa.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(comparacao, "data/modulo04_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo04_simulado.csv\n")
