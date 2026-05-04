# MGenética — Módulo 01: Introdução ao Melhoramento Animal
# Demonstra a equação do melhorista: ΔG = h² × S = i × h × σA / L

set.seed(101)

n     <- 1000
media <- 300      # média fenotípica (kg)
h2    <- 0.35
vp    <- 900      # σP = 30 kg
va    <- h2 * vp
ve    <- vp - va

# Geração 0
g0 <- rnorm(n, 0, sqrt(va))
e0 <- rnorm(n, 0, sqrt(ve))
p0 <- media + g0 + e0

# Seleção: top 20%
prop_sel <- 0.20
limiar   <- quantile(p0, 1 - prop_sel)
sel      <- p0 >= limiar
S        <- mean(p0[sel]) - mean(p0)
dG       <- h2 * S

cat("=== Módulo 01: Resposta à Seleção ===\n")
cat("Média inicial (G0):              ", round(mean(p0), 2), "kg\n")
cat("Média dos selecionados:          ", round(mean(p0[sel]), 2), "kg\n")
cat("Diferencial de seleção (S):      ", round(S, 2), "kg\n")
cat("Ganho genético predito (ΔG):     ", round(dG, 2), "kg\n")
cat("Ganho genético relativo (ΔG/μ):  ", round(100 * dG / media, 2), "%\n\n")

# Efeito da herdabilidade
h2_vals <- c(0.10, 0.20, 0.35, 0.50, 0.70)
cat("=== Efeito da herdabilidade no ganho genético ===\n")
print(data.frame(
  herdabilidade    = h2_vals,
  ganho_genetico   = round(h2_vals * S, 2),
  ganho_percentual = round(100 * h2_vals * S / media, 2)
))

# 5 gerações de seleção
n_ger      <- 5
media_ger  <- numeric(n_ger + 1)
media_ger[1] <- mean(p0)
for (g in seq_len(n_ger)) {
  p_nova <- (media_ger[1] + dG * g) + rnorm(n, 0, sqrt(va)) + rnorm(n, 0, sqrt(ve))
  media_ger[g + 1] <- mean(p_nova)
}
resultado <- data.frame(
  geracao          = 0:n_ger,
  media_fenotipica = round(media_ger, 2),
  ganho_acumulado  = round(media_ger - media_ger[1], 2)
)
cat("\n=== Progressão por geração ===\n")
print(resultado)

# Efeito do intervalo de gerações
cat("\n=== Ganho anual vs. intervalo de gerações ===\n")
L_vals <- c(2, 3, 4, 5, 6)
print(data.frame(
  L_anos               = L_vals,
  ganho_genetico_anual = round(1.40 * sqrt(h2) * sqrt(va) / L_vals, 2)
))

dir.create("data", showWarnings = FALSE)
write.csv(resultado, "data/modulo01_simulado.csv", row.names = FALSE)
cat("\nSalvo em data/modulo01_simulado.csv\n")
