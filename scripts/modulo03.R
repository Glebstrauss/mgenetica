# M3 — Frequências alélicas e genotípicas
# Objetivo: calcular p, q e frequências genotípicas em rebanho pequeno.

gen <- c(rep("AA", 10), rep("Aa", 5), rep("aa", 5))
n <- length(gen)

freq_genotipica <- prop.table(table(factor(gen, levels = c("AA", "Aa", "aa"))))
p <- (2 * sum(gen == "AA") + sum(gen == "Aa")) / (2 * n)
q <- 1 - p

resultado <- data.frame(
  medida = c("freq_AA", "freq_Aa", "freq_aa", "p_A", "q_a"),
  valor = c(as.numeric(freq_genotipica), p, q)
)

print(resultado)
cat("\nINTERPRETACAO: p e q mostram composição alélica; decisão de seleção exige efeito do alelo.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(resultado, "data/modulo03_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo03_simulado.csv\n")
