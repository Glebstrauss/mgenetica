# MGenética — Módulo 12: Matrizes Genômicas, GWAS e Predição Genômica

set.seed(112)
n_anim <- 200; n_snp  <- 300

# Simular genótipos
p_alelo <- rbeta(n_snp, 2, 2)
p_alelo <- pmax(0.05, pmin(0.95, p_alelo))
Z_raw <- matrix(NA, n_anim, n_snp)
for (j in 1:n_snp) {
  a1 <- rbinom(n_anim, 1, p_alelo[j])
  a2 <- rbinom(n_anim, 1, p_alelo[j])
  Z_raw[, j] <- a1 + a2
}

# Centralizar (método VanRaden, 2008)
p2 <- colMeans(Z_raw) / 2
Z  <- sweep(Z_raw, 2, 2 * p2, "-")
denom <- 2 * sum(p2 * (1 - p2))

# ── Matriz G ──────────────────────────────────────────────────
G <- (Z %*% t(Z)) / denom
cat("=== Matriz G (10×10 primeiras entradas) ===\n")
print(round(G[1:5, 1:5], 4))
cat(sprintf("\nDiagonal G — média: %.4f  min: %.4f  max: %.4f\n",
            mean(diag(G)), min(diag(G)), max(diag(G))))

# ── Simular fenótipos com QTLs ────────────────────────────────
n_qtl  <- 10
qtl_id <- sample(1:n_snp, n_qtl)
betas  <- rnorm(n_qtl, 0, sqrt(30))   # efeitos dos QTLs
a_true <- Z_raw[, qtl_id] %*% betas
e_obs  <- rnorm(n_anim, 0, sqrt(var(a_true) * 1.5))
y      <- 300 + a_true + e_obs

# ── GWAS simplificado ─────────────────────────────────────────
y_adj <- scale(y)  # padroniza fenótipo
pvals <- numeric(n_snp)
for (j in 1:n_snp) {
  x <- Z_raw[, j]
  if (var(x) < 1e-6) { pvals[j] <- 1; next }
  fit <- lm(y_adj ~ x)
  pvals[j] <- summary(fit)$coefficients[2, 4]
}

cat("\n=== GWAS: Top 5 SNPs ===\n")
gwas_res <- data.frame(snp=1:n_snp, pvalue=pvals, logp=-log10(pvals))
print(head(gwas_res[order(gwas_res$pvalue), ], 5))
cat(sprintf("SNPs QTL verdadeiros: %s\n", paste(qtl_id[1:5], collapse=", ")))

# ── GBLUP simplificado ────────────────────────────────────────
# Usa metade como treinamento e metade como validação
train_id <- 1:(n_anim/2); val_id <- (n_anim/2+1):n_anim
h2_est   <- 0.40; lam <- (1 - h2_est) / h2_est
G_train  <- G[train_id, train_id]
sol_u    <- solve(G_train + diag(n_anim/2) * lam) %*% (y[train_id] - mean(y[train_id]))
G_cross  <- G[val_id, train_id]
u_pred   <- G_cross %*% sol_u
r_val    <- cor(u_pred, y[val_id] - mean(y[val_id]))
cat(sprintf("\n=== GBLUP: acurácia na validação ===\n"))
cat(sprintf("r(pred, obs) = %.4f  (n_val = %d)\n", r_val, length(val_id)))

dir.create("data", showWarnings = FALSE)
write.csv(gwas_res, "data/modulo12_simulado.csv", row.names=FALSE)
cat("\nSalvo em data/modulo12_simulado.csv\n")
