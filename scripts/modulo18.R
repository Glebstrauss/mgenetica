# M18 — Genômica e SNP
# Objetivo: codificar SNPs e calcular frequência alélica.

snp <- c(0, 1, 2, 1, 0)
animais <- paste0("A", 1:5)
dados <- data.frame(animal = animais, SNP1 = snp)
freq_alelo <- mean(dados$SNP1) / 2
resultado <- data.frame(marcador = "SNP1", frequencia_alelo_contado = freq_alelo)

print(dados)
print(resultado)
cat("\nINTERPRETACAO: código 0/1/2 conta cópias; vários SNPs sustentam parentesco genômico.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(dados, "data/modulo18_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo18_simulado.csv\n")
