# M11 — Correlações genéticas, fenotípicas e ambientais
# Objetivo: interpretar associação entre duas características.

dados <- data.frame(
  animal = paste0("A", 1:6),
  peso = c(180, 190, 205, 210, 225, 230),
  gordura = c(3.0, 3.5, 5.0, 5.2, 7.0, 7.4)
)
r_fenotipica <- cor(dados$peso, dados$gordura)
resultado <- data.frame(correlacao_fenotipica = r_fenotipica)

print(dados)
print(resultado)
cat("\nINTERPRETACAO: correlação fenotípica sugere associação, mas não substitui correlação genética.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(dados, "data/modulo11_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo11_simulado.csv\n")
