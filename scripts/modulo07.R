# MGenética — Módulo 07: Modelos Lineares e Modelos Mistos

set.seed(107)

# Estrutura: n animais, 3 fazendas, 2 sexos, efeito genético aditivo
n_farm   <- 3; n_sex <- 2; n_anim <- 300
farm_ef  <- c(10, -5, 0)       # efeitos de fazenda (fixos)
sex_ef   <- c(15, 0)           # efeitos de sexo (fixos)
mu_geral <- 250                # média geral
va       <- 400
ve       <- 900

farm  <- sample(1:n_farm, n_anim, replace=TRUE)
sex   <- sample(1:n_sex,  n_anim, replace=TRUE)
a     <- rnorm(n_anim, 0, sqrt(va))   # valor genético verdadeiro
e     <- rnorm(n_anim, 0, sqrt(ve))
y     <- mu_geral + farm_ef[farm] + sex_ef[sex] + a + e

dados <- data.frame(y=y, fazenda=as.factor(farm), sexo=as.factor(sex))

cat("=== Modelo fixo: y ~ fazenda + sexo ===\n")
mod_fixo <- lm(y ~ fazenda + sexo, data=dados)
cat(sprintf("Intercepto (μ): %.2f\n", coef(mod_fixo)[1]))
cat(sprintf("Fazenda 2:      %.2f  (verdadeiro: %.2f)\n", coef(mod_fixo)[2], farm_ef[2]-farm_ef[1]))
cat(sprintf("Fazenda 3:      %.2f  (verdadeiro: %.2f)\n", coef(mod_fixo)[3], farm_ef[3]-farm_ef[1]))
cat(sprintf("Sexo 2:         %.2f  (verdadeiro: %.2f)\n", coef(mod_fixo)[4], sex_ef[2]-sex_ef[1]))
cat(sprintf("R²:             %.4f\n", summary(mod_fixo)$r.squared))

# Resíduos do modelo fixo ≈ a + e (contém efeito genético)
res_fixo <- resid(mod_fixo)
cat("\n=== Correlação resíduo fixo × valor genético verdadeiro ===\n")
cat(sprintf("cor(resíduo, a_verdadeiro): %.4f\n", cor(res_fixo, a)))
cat("(Esperado > 0: resíduo captura parte do efeito genético)\n")

# Conceito de modelo misto: u ~ N(0, Iσ²a)
lambda <- ve / va
cat(sprintf("\n=== Parâmetros do modelo misto ===\n"))
cat(sprintf("σ²a: %.1f  |  σ²e: %.1f  |  λ = σ²e/σ²a: %.4f\n", va, ve, lambda))
cat("(λ controla o 'shrinkage' dos EBVs em direção à média)\n")

# BLUP simplificado (sem pedigree): u_hat = Z'y / (Z'Z + λI) × ... 
# Aqui demonstramos via efeito aleatório no contexto de regressão
cat("\n=== Predição simplificada de u (BLUP sem pedigree) ===\n")
# Usando a solução analítica para um caso simples
y_adj <- res_fixo   # fenótipo ajustado para efeitos fixos
u_hat <- y_adj * (va / (va + ve))   # BLUP de um animal isolado
cat(sprintf("Correlação u_hat × a verdadeiro: %.4f\n", cor(u_hat, a)))

dir.create("data", showWarnings = FALSE)
write.csv(data.frame(animal=1:n_anim, fazenda=farm, sexo=sex,
                     fenotipo=round(y,2), a_verdadeiro=round(a,3)),
          "data/modulo07_simulado.csv", row.names=FALSE)
cat("\nSalvo em data/modulo07_simulado.csv\n")
