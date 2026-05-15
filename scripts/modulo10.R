# M10 — Seleção e ganho genético
# Objetivo: calcular S, R e ganho por ano com dados pequenos.

peso <- c(180, 190, 195, 200, 205, 210, 215, 220, 225, 230)
animais <- paste0("T", sprintf("%02d", seq_along(peso)))
dados <- data.frame(animal = animais, peso = peso)

h2 <- 0.30
intervalo_geracao <- 3
n_selecionados <- 3

selecionados <- dados[order(dados$peso, decreasing = TRUE), ][1:n_selecionados, ]
media_pop <- mean(dados$peso)
media_sel <- mean(selecionados$peso)
S <- media_sel - media_pop
R <- h2 * S
ganho_ano <- R / intervalo_geracao

resultado <- data.frame(
  media_populacao = media_pop,
  media_selecionados = media_sel,
  diferencial_S = S,
  h2 = h2,
  resposta_R = R,
  intervalo_geracao = intervalo_geracao,
  ganho_por_ano = ganho_ano
)

print(dados)
print(selecionados)
print(resultado)
cat("\nINTERPRETACAO: maior intensidade aumenta S, mas deve ser equilibrada com número de pais e endogamia.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(resultado, "data/modulo10_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo10_simulado.csv\n")
