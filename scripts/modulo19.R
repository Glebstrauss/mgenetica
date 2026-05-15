# M19 — Controle de qualidade genômica
# Objetivo: calcular missing rate, call rate e MAF em matriz pequena.

geno <- matrix(c(0, 1, NA, 2, 0, 0, 1, 1, 2, NA, 2, 2), nrow = 4, byrow = TRUE)
colnames(geno) <- c("SNP1", "SNP2", "SNP3")
missing_rate <- colMeans(is.na(geno))
call_rate <- 1 - missing_rate
maf <- apply(geno, 2, function(x) {
  p <- mean(x, na.rm = TRUE) / 2
  min(p, 1 - p)
})
resultado <- data.frame(SNP = colnames(geno), missing_rate, call_rate, MAF = maf)

print(geno)
print(resultado)
cat("\nINTERPRETACAO: filtros devem remover erro sem descartar informação útil em excesso.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(resultado, "data/modulo19_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo19_simulado.csv\n")
