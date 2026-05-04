# MGenética — Módulo 02: Bases da Genética Quantitativa
# P = G + E e decomposição da variância

set.seed(102)
n  <- 500
va <- 200; vd <- 60; vi <- 20; ve <- 320; vp <- va + vd + vi + ve

cat("=== Componentes de variância fenotípica ===\n")
print(data.frame(
  componente = c("VA (aditiva)","VD (dominância)","VI (epistasia)","VE (ambiental)","VP (fenotípica)"),
  variancia  = c(va, vd, vi, ve, vp),
  percentual = round(100 * c(va, vd, vi, ve, vp) / vp, 1)
))

a_sim <- rnorm(n, 0, sqrt(va))
d_sim <- rnorm(n, 0, sqrt(vd))
i_sim <- rnorm(n, 0, sqrt(vi))
e_sim <- rnorm(n, 0, sqrt(ve))
g_sim <- a_sim + d_sim + i_sim
p_sim <- 100 + g_sim + e_sim

cat("\n=== Variâncias observadas ===\n")
cat("Var(P):       ", round(var(p_sim), 2), "\n")
cat("Var(G):       ", round(var(g_sim), 2), "\n")
cat("Cor(P, A):    ", round(cor(p_sim, a_sim), 4), "\n")
cat("h² obs (cor²):", round(cor(p_sim, a_sim)^2, 4), "\n")
cat("h² teórico:   ", round(va / vp, 4), "\n")

# Regressão pai-filho → estima h²/2
a_pai   <- rnorm(n, 0, sqrt(va))
p_pai   <- 100 + a_pai + rnorm(n, 0, sqrt(ve))
a_filho <- 0.5 * a_pai + rnorm(n, 0, sqrt(0.75 * va + ve))
p_filho <- 100 + a_filho + rnorm(n, 0, sqrt(ve))
b       <- coef(lm(p_filho ~ p_pai))[2]
cat("\n=== Regressão filho ~ pai (b ≈ h²/2) ===\n")
cat("b observado:  ", round(b, 4), "\n")
cat("2b (h² estim):", round(2 * b, 4), "\n")
cat("h² teórico:   ", round(va / vp, 4), "\n")

dir.create("data", showWarnings = FALSE)
write.csv(data.frame(animal=1:n, A=round(a_sim,3), G=round(g_sim,3), P=round(p_sim,3)),
          "data/modulo02_simulado.csv", row.names = FALSE)
cat("\nSalvo em data/modulo02_simulado.csv\n")
