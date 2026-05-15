# M5 — Fatores que alteram frequências gênicas
# Objetivo: comparar seleção direcional e deriva.

set.seed(105)
geracoes <- 0:5
p_selecao <- 0.40 + 0.05 * geracoes
deriva_pequena <- numeric(length(geracoes))
deriva_pequena[1] <- 0.40
Ne <- 20
for (g in 2:length(geracoes)) {
  copias_A <- rbinom(1, size = 2 * Ne, prob = deriva_pequena[g - 1])
  deriva_pequena[g] <- copias_A / (2 * Ne)
}
resultado <- data.frame(
  geracao = geracoes,
  selecao_direcional = round(p_selecao, 3),
  deriva_pop_pequena = round(deriva_pequena, 3)
)

print(resultado)
cat("\nINTERPRETACAO: seleção impõe direção; deriva pode deslocar frequência por acaso em população pequena.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(resultado, "data/modulo05_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo05_simulado.csv\n")
