# MGenética — Módulo 09: Pedigree e Parentesco
# Construção da matriz A pelo método tabular

set.seed(109)

# ── Pedigree de 10 animais ────────────────────────────────────
ped <- data.frame(
  animal = 1:10,
  sire   = c( 0, 0, 0, 1, 1, 4, 4, 6, 6, 8),
  dam    = c( 0, 0, 0, 2, 3, 5, 5, 5, 7, 7)
)
cat("=== Pedigree ===\n"); print(ped)

# ── Método tabular para construir A ──────────────────────────
n <- nrow(ped)
A <- matrix(0, n, n)

for (i in 1:n) {
  s <- ped$sire[i]; d <- ped$dam[i]

  # Diagonal: 1 + F_i
  if (s == 0 || d == 0) {
    A[i, i] <- 1          # fundador sem pais conhecidos
  } else {
    A[i, i] <- 1 + 0.5 * A[s, d]   # 1 + F_i
  }

  # Off-diagonais: a_ji para j < i
  if (i > 1) {
    for (j in 1:(i-1)) {
      if (s == 0 && d == 0) {
        A[j, i] <- A[i, j] <- 0
      } else if (s == 0) {
        A[j, i] <- A[i, j] <- 0.5 * A[j, d]
      } else if (d == 0) {
        A[j, i] <- A[i, j] <- 0.5 * A[j, s]
      } else {
        A[j, i] <- A[i, j] <- 0.5 * (A[j, s] + A[j, d])
      }
    }
  }
}

cat("\n=== Matriz A (parentesco numérico) ===\n")
print(round(A, 4))

cat("\n=== Diagonal (1 + F_i): coeficiente de endogamia ===\n")
Fi <- diag(A) - 1
for (i in 1:n)
  cat(sprintf("Animal %2d: F = %.4f\n", i, Fi[i]))

cat("\n=== Coeficientes de parentesco selecionados ===\n")
pares <- list(c(4,5), c(6,7), c(8,9), c(4,6), c(1,4))
for (p in pares)
  cat(sprintf("a[%d,%d] = %.4f\n", p[1], p[2], A[p[1], p[2]]))

cat("\n=== Inversa de A (primeiras 5 linhas/colunas) ===\n")
Ainv <- solve(A)
print(round(Ainv[1:5, 1:5], 4))

dir.create("data", showWarnings = FALSE)
write.csv(as.data.frame(round(A, 4)),
          "data/modulo09_simulado.csv", row.names=FALSE)
cat("\nSalvo em data/modulo09_simulado.csv\n")
