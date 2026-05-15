# M6 — Fenótipo, genótipo e ambiente
# Objetivo: mostrar como ambiente altera ranking fenotípico.

dados <- data.frame(
  animal = c("A", "B", "C"),
  G = c(10, 12, 9),
  E = c(3, -1, 2)
)
dados$P <- dados$G + dados$E
dados$ranking_fenotipo <- rank(-dados$P, ties.method = "first")
dados$ranking_genetico <- rank(-dados$G, ties.method = "first")

print(dados)
cat("\nINTERPRETACAO: comparar animais sem ajustar ambiente pode inverter decisão genética.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(dados, "data/modulo06_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo06_simulado.csv\n")
