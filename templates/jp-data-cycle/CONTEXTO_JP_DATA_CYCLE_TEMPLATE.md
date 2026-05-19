# Contexto do jp-data-cycle-template

Data: 2026-05-19

## Resumo

`jp-data-cycle-template` e um modelo reutilizavel para organizar o ciclo de dados de projetos de melhoramento animal, especialmente projetos parecidos com o fluxo JP/Jumento Pega.

Ele nao e parte do site publico MGenetica. Ele vive no repositorio MGenetica como material tecnico auxiliar/template, para servir de base a projetos futuros sem copiar dados privados, sem carregar historico pesado e sem misturar dados brutos, analises, caches e outputs finais.

Commit que introduziu o template:

```text
f241c62 Add JP data cycle template
```

Problema daquele commit: mensagem curta demais, sem corpo explicando por que o template existe, qual problema resolve e como deve ser usado. Este arquivo adiciona esse contexto sem alterar `NEXT_SITE.md` nem `WORKLOG_SITE.md`.

## Problema que o template resolve

Projetos de analise genetica podem crescer rapido e virar mistura de:

- dados brutos recebidos de fonte externa;
- dados limpos ou processados por scripts;
- arquivos intermediarios pesados;
- resultados finais pequenos;
- logs;
- caches;
- backups;
- exportacoes de softwares analiticos;
- tentativas antigas;
- relatorios e manuscritos.

Quando tudo fica junto, o projeto perde rastreabilidade. Fica dificil saber:

- qual arquivo e dado bruto;
- qual arquivo pode ser regenerado;
- qual arquivo entrou em resultado final;
- qual saida pode ir para Git;
- qual saida deve ficar fora de Git;
- qual pasta e cache local;
- qual dado e privado;
- qual etapa precisa de revisao manual.

O template cria uma estrutura minima para separar essas camadas desde o inicio.

## Objetivo

O objetivo do `jp-data-cycle-template` e oferecer ponto de partida conservador para novos projetos de dados, com regras claras:

- dado bruto entra uma vez e nao e editado manualmente;
- dado processado nasce de script;
- analise pesada fica separada de output final;
- cache local fica fora do Git;
- output consolidado pequeno pode ser versionado;
- cada fonte de dados deve ter configuracao explicita;
- manifestos tornam resultado auditavel;
- dados privados reais nao entram neste template.

## Nao objetivo

Este template nao tenta resolver tudo.

Ele nao:

- executa BLUPF90;
- executa modelos geneticos;
- define metodologia estatistica final;
- decide qual arquivo real e definitivo;
- copia dados reais do projeto JP;
- publica nada no site;
- substitui revisao manual;
- substitui projeto analitico completo;
- organiza acervos grandes como a Biblioteca iCloud;
- cria dashboard;
- cria banco PostgreSQL.

Ele e base estrutural. Projetos reais devem adicionar modulos especificos.

## Estrutura criada

```text
templates/jp-data-cycle/
  .gitignore
  README.md
  CONTEXTO_JP_DATA_CYCLE_TEMPLATE.md
  config/
    dataset.schema.yml
    example.dataset.yml
  R/
    paths.R
    validate_dataset.R
    consolidate_outputs.R
  scripts/
    run_validate.R
    run_consolidate.R
  docs/
    ciclo_dados.md
    adr/
      ADR-001-data-cycle-template.md
  examples/
    raw/
    processed/
    outputs/
```

## Camadas de dados

### `raw_dir`

Entrada bruta.

Regra: imutavel. Arquivos aqui representam o que foi recebido ou exportado da fonte original.

Uso esperado:

- planilhas recebidas;
- dados originais;
- dumps brutos;
- arquivos ainda nao tratados.

Nao fazer:

- editar arquivo direto;
- sobrescrever arquivo;
- limpar manualmente sem gerar derivado em outra camada.

### `processed_dir`

Dados derivados.

Regra: gerados por script a partir de `raw_dir`.

Uso esperado:

- tabelas limpas;
- tabelas padronizadas;
- joins;
- filtros documentados;
- dados prontos para analise.

Nao fazer:

- tratar como fonte original;
- editar manualmente sem registrar script;
- misturar com resultados finais.

### `analysis_dir`

Resultados de analise.

Regra: area para saidas especificas de motores analiticos e processos pesados.

Uso esperado:

- outputs de modelos;
- arquivos intermediarios de software externo;
- relatorios longos de execucao;
- produtos grandes demais para Git;
- resultados que precisam ser consolidados antes de virar produto final.

Nao fazer:

- commitar lixo pesado;
- tratar como relatorio final;
- misturar caches com arquivos finais.

### `outputs_dir`

Produtos consolidados.

Regra: guardar saidas pequenas, finais ou quase finais, que podem ser auditadas.

Uso esperado:

- tabelas finais em TSV/CSV;
- figuras finais;
- manifestos;
- resumos;
- produtos que entram em relatorio/manuscrito/site.

O script `consolidate_outputs.R` cria manifesto em:

```text
outputs_dir/_manifest/output_manifest.tsv
```

Esse manifesto registra:

- caminho;
- caminho relativo;
- extensao;
- tamanho em bytes.

### `work_dir`

Area local/scratch.

Regra: fora do Git.

Uso esperado:

- cache;
- arquivos temporarios;
- execucao pesada;
- downloads temporarios;
- artefatos regeneraveis.

Nao fazer:

- tratar como fonte de verdade;
- usar como unica copia de resultado importante;
- commitar.

## Configuracao por dataset

Template usa arquivo `dataset.yml`.

Exemplo atual:

```text
templates/jp-data-cycle/config/example.dataset.yml
```

Chaves obrigatorias:

```yaml
project_id: example-animal-breeding-project
raw_dir: templates/jp-data-cycle/examples/raw
processed_dir: templates/jp-data-cycle/examples/processed
analysis_dir: templates/jp-data-cycle/examples/analysis
outputs_dir: templates/jp-data-cycle/examples/outputs
work_dir: templates/jp-data-cycle/examples/work
```

Chaves recomendadas:

```yaml
metadata_dir: templates/jp-data-cycle/examples/metadata
reports_dir: templates/jp-data-cycle/examples/reports
lifecycle_policy: raw_immutable_work_local_outputs_consolidated
```

## Scripts

### `R/paths.R`

Funcoes basicas de suporte:

- `read_simple_config(path)`: le config simples `chave: valor`;
- `project_path(config, key, ...)`: monta caminho a partir de chave do config;
- `ensure_dir(path)`: cria diretorio se necessario.

Limite conhecido: parser YAML e simples. Funciona para chaves planas. Nao e parser YAML completo.

### `R/validate_dataset.R`

Valida configuracao minima.

Verifica:

- `project_id`;
- `raw_dir`;
- `processed_dir`;
- `analysis_dir`;
- `outputs_dir`;
- `work_dir`;
- existencia de `raw_dir`;
- existencia de `processed_dir`;
- existencia de `outputs_dir`.

Retorna:

- `project_id`;
- chaves obrigatorias ausentes;
- tabela de status de diretorios;
- `ok`.

### `R/consolidate_outputs.R`

Lê `outputs_dir`, lista arquivos existentes e gera manifesto pequeno.

Saida:

```text
outputs_dir/_manifest/output_manifest.tsv
```

Esse manifesto ajuda revisão posterior sem precisar abrir todos os outputs.

### `scripts/run_validate.R`

Wrapper executavel para validar dataset.

Uso:

```bash
Rscript templates/jp-data-cycle/scripts/run_validate.R templates/jp-data-cycle/config/example.dataset.yml
```

Saida esperada quando OK:

```text
validate_dataset_ok=TRUE
project_id=example-animal-breeding-project
missing_required=
dirs_checked=3
```

### `scripts/run_consolidate.R`

Wrapper executavel para consolidar outputs.

Uso:

```bash
Rscript templates/jp-data-cycle/scripts/run_consolidate.R templates/jp-data-cycle/config/example.dataset.yml
```

Saida esperada:

```text
consolidate_outputs_ok
manifest=...
rows=...
total_bytes=...
```

## Politica de Git

Template deve versionar:

- scripts pequenos;
- configs exemplo;
- documentacao;
- manifestos pequenos;
- estrutura vazia com `.gitkeep`, quando necessario.

Template nao deve versionar:

- dados privados reais;
- arquivos brutos sensiveis;
- caches;
- work local;
- outputs pesados;
- dumps de software;
- backups grandes.

`.gitignore` do template reforca essa regra.

## Relacao com MGenetica

Este template esta no repo MGenetica por conveniencia tecnica e continuidade do trabalho. Ele nao altera conteudo publico do site.

Ele nao muda:

- pagina inicial;
- curso;
- manifestos do site;
- publicacao GitHub Pages;
- identidade visual;
- `NEXT_SITE.md`;
- `WORKLOG_SITE.md`.

Uso correto dentro do repo:

- tratar como template auxiliar;
- revisar em branch isolada;
- nao publicar como conteudo didatico sem decisao explicita;
- nao misturar com tarefas publicas do site.

## Relacao com projeto JP

O template nasceu de necessidade observada no ecossistema JP: reduzir complexidade de projetos de analise, separar historico pesado de fluxo ativo e evitar reorganizacoes irreversiveis.

Ele preserva principios ja usados nos projetos JP:

- nao alterar dados brutos;
- nao deletar arquivos;
- nao decidir arquivos definitivos sem revisao;
- gerar manifestos;
- separar incerto de confirmado;
- deixar fluxo novo reutilizavel para proximo artigo.

Mas o template nao contem dados reais do JP.

## Como adaptar para novo projeto

Passo recomendado:

1. Copiar `templates/jp-data-cycle/` para novo projeto ou usar como referencia.
2. Criar novo arquivo `config/<projeto>.dataset.yml`.
3. Apontar `raw_dir`, `processed_dir`, `analysis_dir`, `outputs_dir`, `work_dir`.
4. Criar pastas declaradas no config.
5. Rodar `run_validate.R`.
6. Adicionar scripts especificos do projeto fora do template base.
7. Gerar outputs pequenos em `outputs_dir`.
8. Rodar `run_consolidate.R`.
9. Revisar manifesto antes de publicar/commitar resultados.

## Fluxo operacional minimo

```bash
Rscript templates/jp-data-cycle/scripts/run_validate.R templates/jp-data-cycle/config/example.dataset.yml
Rscript templates/jp-data-cycle/scripts/run_consolidate.R templates/jp-data-cycle/config/example.dataset.yml
```

## Criterios de pronto

Template esta pronto para uso quando:

- config exemplo valida;
- scripts rodam sem erro;
- README explica uso rapido;
- ADR explica decisao;
- contexto explica finalidade e limites;
- nenhum dado privado entra no repo;
- nenhum arquivo de site e alterado por engano.

## Pendencias futuras possiveis

Melhorias futuras, se necessario:

- trocar parser simples por YAML real;
- adicionar hashes aos manifestos;
- adicionar manifestos para `raw_dir` e `processed_dir`;
- adicionar validacao de colunas esperadas;
- adicionar relatorio Markdown automatico;
- adicionar opcao DuckDB local;
- adicionar integracao com Biblioteca iCloud;
- adicionar testes R automatizados.

Essas melhorias nao sao obrigatorias para o estado atual.

## Frase curta para handoff

`jp-data-cycle-template` e base conservadora para novos projetos de dados: separa bruto, processado, analise pesada, output consolidado e work local; evita dados privados no Git; cria validacao e manifesto pequeno; serve como ponto de partida, nao como pipeline analitico final.
