# MGenética — Módulo 03: Estatística Descritiva e Exploração de Dados no R

set.seed(103)
n <- 400

# Simula dados de pesagem com grupos (raça e fazenda)
raca    <- sample(c("Nelore","Angus","Cruzado"), n, replace=TRUE, prob=c(.45,.25,.30))
fazenda <- sample(paste0("F", 1:5), n, replace=TRUE)
idade   <- round(runif(n, 180, 730))  # dias

# Fenótipo: peso ao sobreano (kg) com efeito de raça
mu_raca <- c(Nelore=280, Angus=320, Cruzado=300)
g_anim  <- rnorm(n, 0, sqrt(120))
e_anim  <- rnorm(n, 0, sqrt(400))
peso    <- mu_raca[raca] + 0.08 * (idade - 450) + g_anim + e_anim
peso    <- pmax(peso, 150)  # evita valores negativos

dados <- data.frame(id=sprintf("A%04d", 1:n), raca=raca,
                    fazenda=fazenda, idade_dias=idade,
                    peso_kg=round(peso, 1))

cat("=== Resumo geral ===\n")
print(summary(dados$peso_kg))

cat("\n=== Estatísticas descritivas por raça ===\n")
for (r in c("Nelore","Angus","Cruzado")) {
  x <- dados$peso_kg[dados$raca == r]
  cat(sprintf("%-8s  n=%3d  média=%.1f  dp=%.1f  CV=%.1f%%  min=%.1f  max=%.1f\n",
              r, length(x), mean(x), sd(x), 100*sd(x)/mean(x), min(x), max(x)))
}

cat("\n=== Correlação peso × idade ===\n")
cat("r(peso, idade):", round(cor(dados$peso_kg, dados$idade_dias), 4), "\n")

cat("\n=== Identificação de outliers (>3 DP da média) ===\n")
z <- scale(dados$peso_kg)
outliers <- dados[abs(z) > 3, ]
cat("Animais suspeitos:", nrow(outliers), "\n")
if (nrow(outliers) > 0) print(outliers[, c("id","raca","peso_kg")])

dir.create("data", showWarnings = FALSE)
write.csv(dados, "data/modulo03_simulado.csv", row.names = FALSE)
cat("\nSalvo em data/modulo03_simulado.csv\n")
