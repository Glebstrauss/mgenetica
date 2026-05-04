# MGenética — Módulo 06: Correlações Genéticas e Fenotípicas

set.seed(106)
n <- 800

# Parâmetros bivariados
mu1 <- 300; mu2 <- 25       # médias (peso kg, espessura de gordura mm)
va1 <- 400; va2 <- 8        # variâncias aditivas
rA  <- -0.35                # correlação genética (negativa)
rE  <- -0.10                # correlação ambiental
ve1 <- 600; ve2 <- 12       # variâncias residuais

# Cholesky para simular valores aditivos correlacionados
covA <- rA * sqrt(va1) * sqrt(va2)
SA   <- matrix(c(va1, covA, covA, va2), 2, 2)
LA   <- chol(SA)
z    <- matrix(rnorm(n * 2), n, 2)
A    <- z %*% LA

covE <- rE * sqrt(ve1) * sqrt(ve2)
SE   <- matrix(c(ve1, covE, covE, ve2), 2, 2)
LE   <- chol(SE)
E    <- matrix(rnorm(n * 2), n, 2) %*% LE

P <- sweep(A + E, 2, c(mu1, mu2), "+")
colnames(P) <- c("peso_kg", "gordura_mm")
colnames(A) <- c("a_peso", "a_gordura")

# Estimativas observadas
rA_obs <- cor(A)[1, 2]
rP_obs <- cor(P)[1, 2]
h1_obs <- sqrt(var(A[,1]) / var(P[,1]))
h2_obs <- sqrt(var(A[,2]) / var(P[,2]))

cat("=== Correlações e herdabilidades ===\n")
cat(sprintf("rA observada:  %6.4f  (teórica: %6.4f)\n", rA_obs, rA))
cat(sprintf("rP observada:  %6.4f  (teórica: %6.4f)\n", rP_obs, rP_obs))
cat(sprintf("h1 (peso):     %6.4f\n", h1_obs))
cat(sprintf("h2 (gordura):  %6.4f\n", h2_obs))

# Resposta correlacionada ao selecionar por peso (top 20%)
i_sel  <- 1.40
limiar <- quantile(P[,1], 0.80)
sel    <- P[,1] >= limiar
S_peso <- mean(P[sel, 1]) - mean(P[, 1])
RC_gord <- i_sel * rA * h2_obs * sqrt(va2)
cat("\n=== Resposta correlacionada ===\n")
cat(sprintf("Selecionando top 20%% em peso:\n"))
cat(sprintf("  S (peso):                   %6.2f kg\n", S_peso))
cat(sprintf("  RC gordura (teoria):        %6.2f mm\n", RC_gord))
cat(sprintf("  Variação obs. em gordura:   %6.2f mm\n", mean(P[sel,2]) - mean(P[,2])))

dir.create("data", showWarnings = FALSE)
write.csv(cbind(data.frame(animal=1:n), round(P,3), round(A,3)),
          "data/modulo06_simulado.csv", row.names=FALSE)
cat("\nSalvo em data/modulo06_simulado.csv\n")
