# Pacote de textos do curso MGenética — 2026-05-21

## Conteúdo

Este pacote reúne os textos finais gerados para o curso local MGenética no `course-engine`.

Origem:

```text
examples/mgenetica-course-content/modulos/
```

Arquivos incluídos:

- `md/`: 21 arquivos `*.revision.md`, um por unidade M1-M21.
- `docx/`: 21 arquivos `*.revision.docx`, um por unidade M1-M21.
- `MANIFEST.tsv`: inventário com caminho relativo, tamanho em bytes e SHA-256.

Arquivos não incluídos:

- prompts do pipeline;
- arquivos `writer`, `critic`, `gate`;
- `sources.json`;
- `audit.md`;
- PDFs e bancos DuckDB.

## Estrutura do curso

Curso: Trilha de graduação em melhoramento genético animal.

Total: 21 unidades.

Unidades incluídas:

| Unidade | Arquivo-base |
|---|---|
| M1 | `M1_revisao_de_genetica_basica` |
| M2 | `M2_modos_de_acao_genica` |
| M3 | `M3_genetica_de_populacoes_i_frequencias_alelicas_e_genotipicas` |
| M4 | `M4_hardy_weinberg_alelos_multiplos_e_genes_ligados_ao_sexo` |
| M5 | `M5_fatores_que_alteram_frequencias_genicas` |
| M6 | `M6_valores_e_medias_fenotipo_genotipo_e_ambiente` |
| M7 | `M7_nocoes_de_genetica_quantitativa` |
| M8 | `M8_componentes_de_variancia` |
| M9 | `M9_herdabilidade_e_repetibilidade` |
| M10 | `M10_selecao_e_ganho_genetico` |
| M11 | `M11_correlacoes_geneticas_fenotipicas_e_ambientais` |
| M12 | `M12_caracteristicas_de_limiar` |
| M13 | `M13_endogamia_e_parentesco` |
| M14 | `M14_cruzamentos_heterose_e_complementaridade` |
| M15 | `M15_avaliacao_genetica_dep_ebv_e_ranking_de_animais` |
| M16 | `M16_modelos_lineares_e_modelos_mistos` |
| M17 | `M17_blup_e_modelo_animal` |
| M18 | `M18_genomica_marcadores_snp_e_dados_moleculares` |
| M19 | `M19_controle_de_qualidade_de_dados_genomicos` |
| M20 | `M20_matrizes_genomicas_gwas_e_predicao_genomica` |
| M21 | `M21_projeto_final_pipeline_completo_de_selecao` |

## Validação registrada

Estado documentado no projeto:

- `docs/MGENETICA_STATUS.md`
- `docs/MGENETICA_COURSE_COMPLETION_2026-05-21.md`

Validações executadas no fechamento:

- testes automatizados: `30 passed`;
- `course.yml` válido: 5 módulos, 21 blocos;
- gate estático aprovado para M1 e M21;
- YAML de referências válido;
- banco DuckDB local com 8 documentos e 235 chunks;
- script R da M21 executado;
- `git diff --check` sem saída.

## Uso recomendado

Use `md/` para revisão textual, edição controlada e integração em site.

Use `docx/` para leitura, comentários e distribuição a revisores.

Antes de publicar, faça revisão humana dos 21 textos finais. Este pacote não publica site, não muda `main` e não altera a política Git do projeto.
