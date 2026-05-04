# MGenética — Módulo 08: BLUP e Avaliação Genética
# Implementa as MME de Henderson em base R (sem lme4)

set.seed(108)

# ── Pedigree simplificado e dados ─────────────────────────────
# 5 touros fundadores + 15 animais com pais conhecidos
n_fnd  <- 5
n_aval <- 15
n_tot  <- n_fnd + n_aval

pedigree <- data.frame(
  animal = 1:n_tot,
  sire   = c(rep(0, n_fnd), sample(1:n_fnd, n_aval, replace=TRUE)),
  dam    = c(rep(0, n_fnd), sample(1:n_fnd, n_aval, replace=TRUE))
)

# A matrix simplificada (diagonal = 1; off-diag = 0.25 para meios irmãos)
A <- diag(n_tot)
for (i in (n_fnd+1):n_tot) {
  s <- pedigree$sire[i]; d <- pedigree$dam[i]
  if (s > 0 && d > 0) {
    A[i, i] <- 1
    A[s, i] <- A[i, s] <- 0.25
    A[d, i] <- A[i, d] <- 0.25
  }
}
Ainv <- solve(A + 0.001 * diag(n_tot))

# Simular fenótipos (apenas n_aval animais observados)
va  <- 400; ve <- 600
h2  <- va / (va + ve)
lam <- ve / va

a_true <- rnorm(n_tot, 0, sqrt(va))
obs_id <- (n_fnd+1):n_tot
e_obs  <- rnorm(n_aval, 0, sqrt(ve))
y      <- 300 + a_true[obs_id] + e_obs

# ── Monta MME Henderson ───────────────────────────────────────
# Efeito fixo: média geral (intercepto)
# y = 1μ + Za + e  →  MME = [X'X  X'Z; Z'X  Z'Z + A⁻¹λ][μ; a] = [X'y; Z'y]
nf  <- 1
Z   <- matrix(0, n_aval, n_tot)
for (i in seq_along(obs_id)) Z[i, obs_id[i]] <- 1
X   <- matrix(1, n_aval, 1)

LHS <- rbind(
  cbind(t(X)%*%X,          t(X)%*%Z),
  cbind(t(Z)%*%X, t(Z)%*%Z + Ainv * lam)
)
RHS <- c(t(X)%*%y, t(Z)%*%y)

sol <- solve(LHS + 1e-8*diag(nrow(LHS)), RHS)
mu_hat <- sol[1]
a_hat  <- sol[-1]

ebv_df <- data.frame(
  animal       = 1:n_tot,
  EBV          = round(a_hat, 3),
  a_verdadeiro = round(a_true, 3)
)[obs_id, ]

cat("=== Avaliação BLUP — Top 5 animais ===\n")
print(head(ebv_df[order(-ebv_df$EBV), ], 5))
cat(sprintf("\nCorrelação EBV × a_verdadeiro: %.4f\n", cor(a_hat[obs_id], a_true[obs_id])))
cat(sprintf("h²: %.4f  |  λ: %.4f\n", h2, lam))

dir.create("data", showWarnings = FALSE)
write.csv(ebv_df, "data/modulo08_simulado.csv", row.names=FALSE)
cat("\nSalvo em data/modulo08_simulado.csv\n")
