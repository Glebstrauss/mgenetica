# M17 — BLUP e modelo animal
# Objetivo: demonstrar a intuição do encolhimento de EBV.
# Observação: isto é uma analogia didática; BLUP real usa equações de modelo misto e matriz de parentesco.

animais <- data.frame(
  animal = c("A1", "A2", "A3"),
  desvio_fenotipico = c(20, 10, -5),
  registros = c(1, 5, 8)
)
h2 <- 0.30
confianca_relativa <- animais$registros / max(animais$registros)
animais$EBV_simplificado <- h2 * animais$desvio_fenotipico * confianca_relativa

print(animais)
cat("\nINTERPRETACAO: pouca informação reduz estimativas extremas; parentesco ajuda completar evidência.\n")
cat("O cálculo é simplificado para intuição; BLUP real exige modelo misto e matriz de parentesco.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(animais, "data/modulo17_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo17_simulado.csv\n")
