# MGenética — Módulo 11: Controle de Qualidade de Dados Genômicos

set.seed(111)
n_anim <- 300; n_snp <- 1000

# Simular dados genômicos com alguns problemas propositais
p_alelo <- rbeta(n_snp, 2, 2)
p_alelo <- pmax(0.01, pmin(0.99, p_alelo))
# Introduzir SNPs raros
p_alelo[1:80] <- runif(80, 0.01, 0.04)

G_mat <- matrix(NA, n_anim, n_snp)
for (j in 1:n_snp) {
  a1 <- rbinom(n_anim, 1, p_alelo[j])
  a2 <- rbinom(n_anim, 1, p_alelo[j])
  G_mat[, j] <- a1 + a2
}

# Introduzir missings: ~8% em alguns SNPs, ~12% em alguns animais
snp_ruim <- sample(1:n_snp, 60)
for (j in snp_ruim) G_mat[sample(n_anim, 80), j] <- NA
anim_ruim <- sample(1:n_anim, 15)
G_mat[anim_ruim, sample(n_snp, 120)] <- NA

# ── Filtros de qualidade ──────────────────────────────────────
cat("=== ANTES do controle de qualidade ===\n")
cat(sprintf("Animais: %d  |  SNPs: %d\n", n_anim, n_snp))

# 1. Call rate por SNP
snp_cr <- 1 - colMeans(is.na(G_mat))
cat(sprintf("SNPs com call rate < 0.95: %d\n", sum(snp_cr < 0.95)))

# 2. MAF
p_obs <- colMeans(G_mat, na.rm=TRUE) / 2
maf   <- pmin(p_obs, 1 - p_obs)
cat(sprintf("SNPs com MAF < 0.05:       %d\n", sum(maf < 0.05, na.rm=TRUE)))

# 3. HWE (qui-quadrado por SNP)
hwe_p <- numeric(n_snp)
for (j in 1:n_snp) {
  g <- G_mat[!is.na(G_mat[,j]), j]
  if (length(g) < 10) { hwe_p[j] <- 0; next }
  p_j <- mean(g) / 2; q_j <- 1 - p_j
  exp_cnt <- c(p_j^2, 2*p_j*q_j, q_j^2) * length(g)
  obs_cnt <- table(factor(g, levels=0:2))
  chi_sq  <- sum((obs_cnt - exp_cnt)^2 / (exp_cnt + 1e-9))
  hwe_p[j] <- pchisq(chi_sq, df=1, lower.tail=FALSE)
}
cat(sprintf("SNPs fora de HWE (p<1e-6): %d\n", sum(hwe_p < 1e-6, na.rm=TRUE)))

# 4. Call rate por animal
anim_cr <- 1 - rowMeans(is.na(G_mat))
cat(sprintf("Animais com call rate < 0.90: %d\n", sum(anim_cr < 0.90)))

# Aplicar filtros
keep_snp  <- snp_cr >= 0.95 & maf >= 0.05 & hwe_p >= 1e-6
keep_anim <- anim_cr >= 0.90

G_qc <- G_mat[keep_anim, keep_snp]

cat("\n=== APÓS controle de qualidade ===\n")
cat(sprintf("Animais retidos: %d / %d (%.1f%%)\n",
            sum(keep_anim), n_anim, 100*mean(keep_anim)))
cat(sprintf("SNPs retidos:    %d / %d (%.1f%%)\n",
            sum(keep_snp), n_snp, 100*mean(keep_snp)))

dir.create("data", showWarnings = FALSE)
write.csv(data.frame(snp=which(keep_snp), maf=round(maf[keep_snp],4),
                     call_rate=round(snp_cr[keep_snp],4)),
          "data/modulo11_simulado.csv", row.names=FALSE)
cat("\nSalvo em data/modulo11_simulado.csv\n")
