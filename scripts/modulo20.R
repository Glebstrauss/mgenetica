# M20 — Matriz G, GWAS e predição genômica
# Objetivo: construir uma matriz genômica pequena para entender a lógica.
# Observação: avaliações reais usam muitos SNPs, controle de qualidade e validação externa.

M <- matrix(c(
  0, 1, 2,
  1, 1, 0,
  2, 1, 0,
  0, 0, 1
), nrow = 4, byrow = TRUE)
rownames(M) <- paste0("A", 1:4)
colnames(M) <- paste0("SNP", 1:3)
M_pad <- scale(M)
G <- tcrossprod(M_pad) / ncol(M)

print(M)
print(round(G, 3))
cat("\nINTERPRETACAO: matriz G resume semelhança genômica; GWAS e predição usam SNPs para perguntas distintas.\n")
cat("Este exemplo é pedagógico; em dados reais, QC, escala dos SNPs e validação são obrigatórios.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(round(G, 3), "data/modulo20_simulado.csv")
cat("Salvo em data/modulo20_simulado.csv\n")
