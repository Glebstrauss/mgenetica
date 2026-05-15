# M9 — Herdabilidade e repetibilidade
# Objetivo: comparar herdabilidade sob ambientes com diferente variância.

cenarios <- data.frame(
  cenario = c("ambiente_controlado", "ambiente_heterogeneo"),
  VA = c(40, 40),
  VE = c(60, 120)
)
cenarios$VP <- cenarios$VA + cenarios$VE
cenarios$h2 <- cenarios$VA / cenarios$VP

print(cenarios)
cat("\nINTERPRETACAO: mesma VA gera h2 menor quando VE aumenta.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(cenarios, "data/modulo09_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo09_simulado.csv\n")
