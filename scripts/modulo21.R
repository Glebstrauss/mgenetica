# M21 — Projeto final: pipeline completo de seleção
# Objetivo: montar ranking com DEP, acurácia e penalidade por parentesco.

touros <- data.frame(
  touro = c("T1", "T2", "T3", "T4", "T5"),
  DEP_peso = c(18, 15, 12, 20, 16),
  acuracia = c(0.70, 0.85, 0.60, 0.50, 0.78),
  parentesco_medio = c(0.20, 0.05, 0.02, 0.35, 0.10)
)

touros$score <- touros$DEP_peso - 10 * touros$parentesco_medio + 2 * touros$acuracia
touros$decisao <- ifelse(touros$parentesco_medio > 0.30, "evitar neste lote", "candidato")
ranking <- touros[order(touros$score, decreasing = TRUE), ]

print(ranking)
escolhidos <- subset(ranking, decisao == "candidato")[1:2, ]
print(escolhidos)
cat("\nINTERPRETACAO: decisão final combina mérito, confiança e risco de endogamia.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(ranking, "data/modulo21_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo21_simulado.csv\n")
