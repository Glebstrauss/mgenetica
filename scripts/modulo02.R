# M2 — Modos de ação gênica
# Objetivo: comparar aditividade e dominância em valores genotípicos.

valores <- data.frame(
  genotipo = c("AA", "Aa", "aa"),
  valor = c(10, 8, 4)
)
ponto_medio <- mean(valores$valor[valores$genotipo %in% c("AA", "aa")])
valores$desvio_do_ponto_medio <- valores$valor - ponto_medio
dominancia_Aa <- valores$desvio_do_ponto_medio[valores$genotipo == "Aa"]

print(valores)
cat("\nPonto medio dos homozigotos:", ponto_medio, "\n")
cat("Desvio de dominancia em Aa:", dominancia_Aa, "\n")
cat("\nINTERPRETACAO: dominância altera heterozigoto; seleção acumulada depende sobretudo de efeito aditivo.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(valores, "data/modulo02_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo02_simulado.csv\n")
