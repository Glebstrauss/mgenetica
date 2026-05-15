# M15 — Avaliação genética: DEP/EBV
# Objetivo: comparar ranking por EBV, DEP e acurácia.

animais <- data.frame(
  animal = c("T1", "T2", "T3", "T4"),
  EBV = c(20, 8, -4, 16),
  acuracia = c(0.55, 0.80, 0.70, 0.75)
)
animais$DEP <- animais$EBV / 2
ranking <- animais[order(animais$DEP, decreasing = TRUE), ]

print(ranking)
cat("\nINTERPRETACAO: DEP traduz mérito esperado na progênie; acurácia informa confiança.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(ranking, "data/modulo15_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo15_simulado.csv\n")
