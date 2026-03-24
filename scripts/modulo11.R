# MGenética - Script do Módulo 11
# Tema: Controle de qualidade de dados genômicos
# Objetivo: gerar dados simulados e produzir uma análise didática inicial.

set.seed(111)

n_animais <- 200
id <- sprintf("A%03d", 1:n_animais)
grupos <- sample(c("Controle", "Selecao"), n_animais, replace = TRUE)

valor_genetico <- rnorm(n_animais, mean = ifelse(grupos == "Selecao", 1.2, 0.8), sd = 0.4)
erro_residual <- rnorm(n_animais, mean = 0, sd = 0.6)
fenotipo <- 10 + valor_genetico + erro_residual

dados_modulo <- data.frame(
  id = id,
  grupo = grupos,
  valor_genetico = valor_genetico,
  fenotipo = fenotipo
)

# Resumo rápido
print(summary(dados_modulo))
print(tapply(dados_modulo$fenotipo, dados_modulo$grupo, mean))

# Salvar versão simulada (opcional)
outfile <- file.path("data", "modulo11_simulado.csv")
write.csv(dados_modulo, outfile, row.names = FALSE)
cat("Arquivo salvo em:", outfile, "\n")
