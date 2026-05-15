# M13 — Endogamia e parentesco
# Objetivo: comparar parentesco esperado entre tipos de família.

pares <- data.frame(
  par = c("nao_aparentados", "meio_irmaos", "irmaos_completos", "pai_filho"),
  parentesco_esperado = c(0.00, 0.25, 0.50, 0.50)
)
pares$risco_acasalamento <- ifelse(pares$parentesco_esperado >= 0.50, "alto", ifelse(pares$parentesco_esperado > 0, "moderado", "baixo"))

A_meio_irmaos <- matrix(c(1, 0.25, 0.25, 1), nrow = 2)
rownames(A_meio_irmaos) <- colnames(A_meio_irmaos) <- c("M1", "M2")

print(pares)
print(A_meio_irmaos)
cat("\nINTERPRETACAO: parentesco ajuda avaliação, mas acasalamento entre aparentados aumenta risco de endogamia.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(pares, "data/modulo13_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo13_simulado.csv\n")
