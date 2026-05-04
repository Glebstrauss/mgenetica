# MGenética — Módulo 10: Genômica e Marcadores SNP

set.seed(110)

n_anim  <- 200
n_snp   <- 500
chr_len <- rep(c(50, 60, 40, 55, 45), length.out=n_snp)  # comprimento cromossômico (cM)

# Simular frequências alélicas (Beta(2,2) → MAF razoável)
p_alelo <- rbeta(n_snp, 2, 2)
p_alelo <- pmax(0.02, pmin(0.98, p_alelo))  # limita para não ter MAF < 0.02

# Simular matriz de genótipos (codificação 0/1/2)
G_mat <- matrix(NA, n_anim, n_snp)
for (j in 1:n_snp) {
  allele1 <- rbinom(n_anim, 1, p_alelo[j])
  allele2 <- rbinom(n_anim, 1, p_alelo[j])
  G_mat[, j] <- allele1 + allele2
}

# Frequências observadas
p_obs <- colMeans(G_mat) / 2
maf   <- pmin(p_obs, 1 - p_obs)

cat("=== Resumo dos marcadores SNP ===\n")
cat(sprintf("Animais:          %d\n", n_anim))
cat(sprintf("SNPs total:       %d\n", n_snp))
cat(sprintf("MAF mediana:      %.4f\n", median(maf)))
cat(sprintf("MAF média:        %.4f\n", mean(maf)))
cat(sprintf("SNPs com MAF<0.05:%d\n", sum(maf < 0.05)))

cat("\n=== Distribuição das frequências genotípicas (SNP 1) ===\n")
freq_geno <- table(G_mat[, 1]) / n_anim
p1 <- p_obs[1]; q1 <- 1 - p1
cat(sprintf("Observado:  AA=%.3f  Aa=%.3f  aa=%.3f\n",
            freq_geno["0"], freq_geno["1"], freq_geno["2"]))
cat(sprintf("HWE esperado: AA=%.3f  Aa=%.3f  aa=%.3f\n",
            p1^2, 2*p1*q1, q1^2))

# Desequilíbrio de ligação (LD) entre SNPs adjacentes
r2_adj <- numeric(n_snp - 1)
for (j in 1:(n_snp-1)) {
  x <- G_mat[, j]; y <- G_mat[, j+1]
  r2_adj[j] <- cor(x, y)^2
}
cat(sprintf("\n=== Desequilíbrio de ligação (SNPs adjacentes) ===\n"))
cat(sprintf("r² médio:   %.4f\n", mean(r2_adj)))
cat(sprintf("r² mediano: %.4f\n", median(r2_adj)))
cat(sprintf("r² máximo:  %.4f\n", max(r2_adj)))

dir.create("data", showWarnings = FALSE)
write.csv(data.frame(snp=1:n_snp, p_obs=round(p_obs,4), maf=round(maf,4)),
          "data/modulo10_simulado.csv", row.names=FALSE)
cat("\nSalvo em data/modulo10_simulado.csv\n")
