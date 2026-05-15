# M8 — Componentes de variância
# Objetivo: decompor VP e observar efeito do ambiente.

cenarios <- data.frame(
  cenario = c("base", "ambiente_alto"),
  VA = c(40, 40),
  VD = c(10, 10),
  VI = c(5, 5),
  VE = c(45, 85)
)
cenarios$VP <- rowSums(cenarios[, c("VA", "VD", "VI", "VE")])
cenarios$fracao_aditiva <- cenarios$VA / cenarios$VP

print(cenarios)
cat("\nINTERPRETACAO: aumentar VE eleva VP e reduz fração aditiva observável.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(cenarios, "data/modulo08_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo08_simulado.csv\n")
