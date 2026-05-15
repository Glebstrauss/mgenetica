# M12 — Características de limiar
# Objetivo: relacionar escala contínua e resposta binária.

suscetibilidade <- c(-1, 0, 0.5, 1.2, 1.8)
limiar <- 1
categoria <- ifelse(suscetibilidade > limiar, "afetado", "nao_afetado")
dados <- data.frame(animal = paste0("A", 1:5), suscetibilidade, categoria)
prevalencia <- mean(categoria == "afetado")

print(dados)
cat("Prevalencia:", prevalencia, "\n")
cat("\nINTERPRETACAO: dado binário pode vir de risco contínuo não observado diretamente.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(dados, "data/modulo12_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo12_simulado.csv\n")
