# MGenética — Módulo 05: Herdabilidade e Repetibilidade

set.seed(105)
n   <- 600
mu  <- 250    # média fenotípica (kg)
va  <- 300    # variância aditiva
vd  <- 80     # dominância
vpe <- 60     # ambiente permanente
ve  <- 500    # residual temporário
vp  <- va + vd + vpe + ve

h2  <- va / vp
rep <- (va + vd + vpe) / vp    # repetibilidade

cat("=== Parâmetros populacionais ===\n")
cat(sprintf("h² (herdabilidade):    %.4f\n", h2))
cat(sprintf("r  (repetibilidade):   %.4f\n", rep))

# Simular pais e filhos para regressão
a_pai   <- rnorm(n, 0, sqrt(va))
p_pai   <- mu + a_pai + rnorm(n, 0, sqrt(ve + vd + vpe))
a_filho <- 0.5 * a_pai + rnorm(n, 0, sqrt(0.75*va + ve + vd + vpe))
p_filho <- mu + a_filho + rnorm(n, 0, sqrt(ve + vd + vpe))

b_obs  <- coef(lm(p_filho ~ p_pai))[2]
h2_reg <- 2 * b_obs

cat("\n=== Estimativa por regressão pai-filho ===\n")
cat(sprintf("b (regressão filho ~ pai):  %.4f\n", b_obs))
cat(sprintf("h² estimado (2b):           %.4f\n", h2_reg))
cat(sprintf("h² teórico (VA/VP):         %.4f\n", h2))

# Repetibilidade: múltiplas medidas por animal
n_anim <- 200; n_med <- 4
a_anim   <- rnorm(n_anim, 0, sqrt(va))
pe_anim  <- rnorm(n_anim, 0, sqrt(vpe))
medidas  <- matrix(NA, n_anim, n_med)
for (m in 1:n_med)
  medidas[, m] <- mu + a_anim + pe_anim + rnorm(n_anim, 0, sqrt(ve))

# Correlação intraclasse (ICC) como estimativa de r
animal_id <- rep(1:n_anim, times=n_med)
y_vec     <- as.vector(medidas)
tab_aov   <- anova(lm(y_vec ~ as.factor(animal_id)))
MS_entre  <- tab_aov["as.factor(animal_id)", "Mean Sq"]
MS_dentro <- tab_aov["Residuals", "Mean Sq"]
r_est     <- (MS_entre - MS_dentro) / (MS_entre + (n_med - 1) * MS_dentro)

cat("\n=== Estimativa de repetibilidade (ICC) ===\n")
cat(sprintf("r estimado (ICC):    %.4f\n", r_est))
cat(sprintf("r teórico:           %.4f\n", rep))

# Número ótimo de medidas (k*) onde r marginal ≈ 0
cat("\n=== Acurácia cumulativa com k medidas ===\n")
for (k in 1:6) {
  acc <- sqrt(k * rep / (1 + (k-1)*rep))
  cat(sprintf("k=%d medidas → r(k) = %.4f\n", k, acc))
}

dir.create("data", showWarnings = FALSE)
write.csv(data.frame(animal=1:n_anim, round(medidas, 2)),
          "data/modulo05_simulado.csv", row.names=FALSE)
cat("\nSalvo em data/modulo05_simulado.csv\n")
