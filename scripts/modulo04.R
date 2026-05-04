# MGenética — Módulo 04: Médias, Variâncias e Componentes de Variância

set.seed(104)

# Parâmetros populacionais
n_touro <- 20     # reprodutores (sires)
n_filhos <- 25    # filhos por touro (half-sibs)
n <- n_touro * n_filhos

va <- 400; ve_perm <- 50; ve_temp <- 800
vp <- va + ve_perm + ve_temp

cat("=== Componentes de variância populacionais ===\n")
cat(sprintf("VA (aditiva):        %6.1f  (%4.1f%%)\n", va, 100*va/vp))
cat(sprintf("VE_perm (amb. perm): %6.1f  (%4.1f%%)\n", ve_perm, 100*ve_perm/vp))
cat(sprintf("VE_temp (residual):  %6.1f  (%4.1f%%)\n", ve_temp, 100*ve_temp/vp))
cat(sprintf("VP (fenotípica):     %6.1f  (100%%)\n", vp))
cat(sprintf("h² = VA/VP:          %6.4f\n", va/vp))

# Simular estrutura de meio-irmãos paternos
touro_id   <- rep(1:n_touro, each=n_filhos)
a_touro    <- rnorm(n_touro, 0, sqrt(va/2))    # metade da VA transmitida pelo pai
a_residual <- rnorm(n, 0, sqrt(va/2))          # metade da VA aleatória da mãe
e_perm     <- rnorm(n, 0, sqrt(ve_perm))
e_temp     <- rnorm(n, 0, sqrt(ve_temp))
fenotipo   <- 500 + a_touro[touro_id] + a_residual + e_perm + e_temp

# Estimação por ANOVA (método de Sire)
modelo     <- lm(fenotipo ~ as.factor(touro_id))
tab_anova  <- anova(modelo)
CMS_entre  <- tab_anova["as.factor(touro_id)", "Mean Sq"]
CMS_dentro <- tab_anova["Residuals", "Mean Sq"]
VA_est     <- 4 * (CMS_entre - CMS_dentro) / n_filhos
VP_est     <- var(fenotipo)
h2_est     <- VA_est / VP_est

cat("\n=== Estimação por ANOVA (método Sire) ===\n")
cat(sprintf("CMS entre grupos (sires): %8.2f\n", CMS_entre))
cat(sprintf("CMS dentro grupos:        %8.2f\n", CMS_dentro))
cat(sprintf("VA estimada:              %8.2f\n", VA_est))
cat(sprintf("VP estimada:              %8.2f\n", VP_est))
cat(sprintf("h² estimado:              %8.4f\n", h2_est))
cat(sprintf("h² teórico (VA/VP):       %8.4f\n", va/vp))

dir.create("data", showWarnings = FALSE)
dados <- data.frame(touro=touro_id, fenotipo=round(fenotipo, 2))
write.csv(dados, "data/modulo04_simulado.csv", row.names = FALSE)
cat("\nSalvo em data/modulo04_simulado.csv\n")
