# M14 — Cruzamentos, heterose e complementaridade
# Objetivo: calcular heterose absoluta e percentual.

desempenho <- data.frame(grupo = c("Raca_A", "Raca_B", "F1"), peso = c(210, 220, 230))
media_parental <- mean(desempenho$peso[desempenho$grupo %in% c("Raca_A", "Raca_B")])
f1 <- desempenho$peso[desempenho$grupo == "F1"]
heterose_abs <- f1 - media_parental
heterose_pct <- heterose_abs / media_parental * 100
resultado <- data.frame(media_parental, f1, heterose_abs, heterose_pct)

print(desempenho)
print(resultado)
cat("\nINTERPRETACAO: heterose complementa seleção; não substitui planejamento de cruzamento.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(resultado, "data/modulo14_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo14_simulado.csv\n")
