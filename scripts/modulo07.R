# M7 — Noções de genética quantitativa
# Objetivo: simular muitos loci pequenos e observar distribuição contínua.

set.seed(107)
n_animais <- 80
n_loci <- 10

genotipos <- matrix(sample(0:2, n_animais * n_loci, replace = TRUE), nrow = n_animais)
valor_genetico <- rowSums(genotipos)
ambiente <- rnorm(n_animais, mean = 0, sd = 2)
fenotipo <- valor_genetico + ambiente

dados <- data.frame(
  animal = paste0("A", sprintf("%02d", 1:n_animais)),
  valor_genetico = valor_genetico,
  ambiente = round(ambiente, 2),
  fenotipo = round(fenotipo, 2)
)

print(summary(dados[, c("valor_genetico", "fenotipo")]))
cat("\nINTERPRETACAO: muitos loci criam escala contínua; ambiente aumenta sobreposição entre animais.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(dados, "data/modulo07_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo07_simulado.csv\n")
