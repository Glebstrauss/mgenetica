# M16 — Modelos lineares e mistos
# Objetivo: ajustar efeito de fazenda e sexo em exemplo pequeno.
# Observação: este é um modelo linear didático; modelo misto completo entra no próximo módulo.

dados <- data.frame(
  animal = paste0("A", 1:8),
  peso = c(200, 208, 212, 220, 230, 238, 242, 250),
  fazenda = rep(c("F1", "F2"), each = 4),
  sexo = rep(c("F", "M"), 4)
)
ajuste <- lm(peso ~ fazenda + sexo, data = dados)
resultado <- data.frame(termo = names(coef(ajuste)), estimativa = as.numeric(coef(ajuste)))

print(dados)
print(resultado)
cat("\nINTERPRETACAO: modelo separa efeitos sistemáticos antes de comparar animais.\n")
cat("Este laboratório usa lm() como ponte didática; avaliação genética completa exige efeitos aleatórios e parentesco.\n")

dir.create("data", showWarnings = FALSE, recursive = TRUE)
write.csv(resultado, "data/modulo16_simulado.csv", row.names = FALSE)
cat("Salvo em data/modulo16_simulado.csv\n")
