#!/usr/bin/env python3
"""
generate_meta.py
Gera README.md, manifest.json e todos os 21 arquivos notes.md.

Uso direto:
    python scripts/generate_meta.py
"""

import json
from pathlib import Path

# ──────────────────────────────────────────────────────────────
# Dados do manifesto (fonte de verdade para notes + manifest.json)
# ──────────────────────────────────────────────────────────────

MODULOS = [
    {
        "modulo": "M1", "pasta": "M01_revisao_genetica_basica",
        "titulo": "Revisão de genética básica",
        "texto_fonte": "M1_revisao_de_genetica_basica.revision.md",
        "artefatos": [
            {
                "arquivo": "M01_revisao_genetica_basica/genotipo-alelo.svg",
                "tipo": "svg-estatico",
                "conceito": "Hierarquia DNA → gene → alelo → genótipo e segregação mendeliana",
                "uso_no_site": "Imagem de abertura da página M1; embutir com <img>",
            }
        ],
        "notes": (
            "# M1 — Revisão de genética básica\n\n"
            "## Artefato: `genotipo-alelo.svg`\n\n"
            "**Conceito visualizado:** Hierarquia DNA → gene → alelo → genótipo; "
            "segregação mendeliana de Aa × Aa.\n\n"
            "**Por que este artefato:** O erro central de M1 é confundir alelo com genótipo. "
            "O SVG mostra lado a lado: (a) um locus com duas cópias; "
            "(b) os três genótipos possíveis; (c) quadrado de Punnett para Aa × Aa.\n\n"
            "**Sugestão de uso no site:** Imagem de abertura de M1, antes da seção 'Pergunta simples'.\n"
            "Usar `<img src='genotipo-alelo.svg' alt='Diagrama de genótipo e alelo' style='max-width:100%'>`.\n"
        ),
    },
    {
        "modulo": "M2", "pasta": "M02_modos_de_acao_genica",
        "titulo": "Modos de ação gênica",
        "texto_fonte": "M2_modos_de_acao_genica.revision.md",
        "artefatos": [
            {
                "arquivo": "M02_modos_de_acao_genica/modos-de-acao.svg",
                "tipo": "svg-estatico",
                "conceito": "Gráfico valor genotípico × genótipo: aditivo, dominância, sobredominância",
                "uso_no_site": "Infográfico na seção 'Conceito técnico' de M2",
            }
        ],
        "notes": (
            "# M2 — Modos de ação gênica\n\n"
            "## Artefato: `modos-de-acao.svg`\n\n"
            "**Conceito visualizado:** Comparação dos três modos de ação gênica — aditivo, "
            "dominância e sobredominância — em um gráfico de valor genotípico × genótipo.\n\n"
            "**Por que este artefato:** M2 exige enxergar a diferença entre efeitos no espaço "
            "genotipo→fenótipo. O gráfico torna imediato ver quando a linha é reta (aditivo), "
            "curva (dominância) ou tem pico no heterozigoto (sobredominância).\n\n"
            "**Sugestão de uso no site:** Embutir na seção 'Conceito técnico' de M2 com `<img>`.\n"
        ),
    },
    {
        "modulo": "M3", "pasta": "M03_frequencias_alelicas_e_genotipicas",
        "titulo": "Frequências alélicas e genotípicas",
        "texto_fonte": "M3_genetica_de_populacoes_i_frequencias_alelicas_e_genotipicas.revision.md",
        "artefatos": [
            {
                "arquivo": "M03_frequencias_alelicas_e_genotipicas/calculator.html",
                "tipo": "html-interativo",
                "conceito": "Calculadora de p, q, f_AA, f_Aa, f_aa com sacola de fichas e gauge p+q",
                "uso_no_site": "Embed em iframe na página da unidade M3; largura mínima 600px",
            }
        ],
        "notes": (
            "# M3 — Frequências alélicas e genotípicas\n\n"
            "## Artefato: `calculator.html`\n\n"
            "**Conceito visualizado:** Calculadora interativa de p, q, f_AA, f_Aa, f_aa "
            "a partir de n_AA, n_Aa, n_aa digitados pelo usuário.\n\n"
            "**Elementos incluídos:** Cards explicando contribuição alélica de cada genótipo · "
            "fórmulas com destaque por cor · exemplo das 10 éguas · calculadora em tempo real · "
            "sacola de fichas · éguas coloridas por genótipo · checkpoint das 8 éguas.\n\n"
            "**Sugestão de uso no site:** `<iframe src='calculator.html' width='100%' height='900'>`.\n"
        ),
    },
    {
        "modulo": "M4", "pasta": "M04_hardy_weinberg",
        "titulo": "Hardy-Weinberg, alelos múltiplos e genes ligados ao sexo",
        "texto_fonte": "M4_hardy_weinberg_alelos_multiplos_e_genes_ligados_ao_sexo.revision.md",
        "artefatos": [
            {
                "arquivo": "M04_hardy_weinberg/hwe-calculator.html",
                "tipo": "html-interativo",
                "conceito": "Calculadora HWE: p² 2pq q² esperados vs. observado; genes ligados ao sexo",
                "uso_no_site": "Embed em iframe na página da unidade M4",
            }
        ],
        "notes": (
            "# M4 — Hardy-Weinberg, alelos múltiplos e genes ligados ao sexo\n\n"
            "## Artefato: `hwe-calculator.html`\n\n"
            "**Conceito visualizado:** Calculadora HWE com slider para p, frequências esperadas "
            "p², 2pq, q² em tempo real, comparação observado vs. esperado e tabela de genes "
            "ligados ao sexo (XX vs. XY).\n\n"
            "**Sugestão de uso no site:** Embed via `<iframe>` na página M4.\n"
        ),
    },
    {
        "modulo": "M5", "pasta": "M05_fatores_frequencias_genicas",
        "titulo": "Fatores que alteram frequências gênicas",
        "texto_fonte": "M5_fatores_que_alteram_frequencias_genicas.revision.md",
        "artefatos": [
            {
                "arquivo": "M05_fatores_frequencias_genicas/quatro-forcas.svg",
                "tipo": "svg-estatico",
                "conceito": "Diagrama das 4 forças evolutivas: seleção, migração, mutação, deriva",
                "uso_no_site": "Abertura de M5; embutir com <img>",
            }
        ],
        "notes": (
            "# M5 — Fatores que alteram frequências gênicas\n\n"
            "## Artefato: `quatro-forcas.svg`\n\n"
            "**Conceito visualizado:** Diagrama das 4 forças evolutivas apontando para "
            "'frequência alélica' no centro, com frase-chave por força.\n\n"
            "**Sugestão de uso no site:** Abertura de M5, antes do conceito técnico.\n"
        ),
    },
    {
        "modulo": "M6", "pasta": "M06_valores_e_medias",
        "titulo": "Valores e médias: fenótipo, genótipo e ambiente",
        "texto_fonte": "M6_valores_e_medias_fenotipo_genotipo_e_ambiente.revision.md",
        "artefatos": [
            {
                "arquivo": "M06_valores_e_medias/pge-decomposicao.svg",
                "tipo": "svg-estatico",
                "conceito": "Decomposição P = G + E em barras sobrepostas com exemplo numérico",
                "uso_no_site": "Embutir após a fórmula na página M6",
            }
        ],
        "notes": (
            "# M6 — Valores e médias: fenótipo, genótipo e ambiente\n\n"
            "## Artefato: `pge-decomposicao.svg`\n\n"
            "**Conceito visualizado:** Decomposição P = G + E em barras empilhadas com "
            "três éguas de exemplo com componentes ambientais positivo, negativo e zero.\n\n"
            "**Sugestão de uso no site:** Embutir após a fórmula na página M6.\n"
        ),
    },
    {
        "modulo": "M7", "pasta": "M07_genetica_quantitativa",
        "titulo": "Noções de genética quantitativa",
        "texto_fonte": "M7_nocoes_de_genetica_quantitativa.revision.md",
        "artefatos": [
            {
                "arquivo": "M07_genetica_quantitativa/poligeico-normal.svg",
                "tipo": "svg-estatico",
                "conceito": "1→2→5→muitos loci convergindo para distribuição normal",
                "uso_no_site": "Embutir na seção 'Explicação intuitiva' de M7",
            }
        ],
        "notes": (
            "# M7 — Noções de genética quantitativa\n\n"
            "## Artefato: `poligeico-normal.svg`\n\n"
            "**Conceito visualizado:** Progressão de 1 locus (2 fenótipos discretos) para "
            "muitos loci (curva normal contínua).\n\n"
            "**Sugestão de uso no site:** Embutir na seção 'Explicação intuitiva' de M7.\n"
        ),
    },
    {
        "modulo": "M8", "pasta": "M08_componentes_de_variancia",
        "titulo": "Componentes de variância",
        "texto_fonte": "M8_componentes_de_variancia.revision.md",
        "artefatos": [
            {
                "arquivo": "M08_componentes_de_variancia/particao-variancia.svg",
                "tipo": "svg-estatico",
                "conceito": "Partição VP = VA+VD+VI+VE em barras empilhadas; três cenários de h²",
                "uso_no_site": "Embutir na seção 'Conceito técnico' de M8",
            }
        ],
        "notes": (
            "# M8 — Componentes de variância\n\n"
            "## Artefato: `particao-variancia.svg`\n\n"
            "**Conceito visualizado:** Partição de VP em VA, VD, VI e VE com barras empilhadas "
            "comparando três cenários (alta VA, alta VD, alta VE) e seus h² correspondentes.\n\n"
            "**Sugestão de uso no site:** Embutir na seção 'Conceito técnico' de M8 com `<img>`.\n"
        ),
    },
    {
        "modulo": "M9", "pasta": "M09_herdabilidade_e_repetibilidade",
        "titulo": "Herdabilidade e repetibilidade",
        "texto_fonte": "M9_herdabilidade_e_repetibilidade.revision.md",
        "artefatos": [
            {
                "arquivo": "M09_herdabilidade_e_repetibilidade/h2-calculator.html",
                "tipo": "html-interativo",
                "conceito": "Calculadora h² = VA/VP e r = Vperm/VP com sliders e interpretação",
                "uso_no_site": "Embed via iframe na página M9 após as fórmulas",
            }
        ],
        "notes": (
            "# M9 — Herdabilidade e repetibilidade\n\n"
            "## Artefato: `h2-calculator.html`\n\n"
            "**Conceito visualizado:** Calculadora interativa de h² (VA/VP) e repetibilidade "
            "(Vperm/VP), com sliders para os componentes de variância.\n\n"
            "**Sugestão de uso no site:** Embed via `<iframe>` na página M9 após as fórmulas.\n"
        ),
    },
    {
        "modulo": "M10", "pasta": "M10_selecao_e_ganho_genetico",
        "titulo": "Seleção e ganho genético",
        "texto_fonte": "M10_selecao_e_ganho_genetico.revision.md",
        "artefatos": [
            {
                "arquivo": "M10_selecao_e_ganho_genetico/selecao-calculator.html",
                "tipo": "html-interativo",
                "conceito": "Calculadora R = h²×S com diagrama de peneira e ganho anualizado",
                "uso_no_site": "Embed via iframe na página M10",
            }
        ],
        "notes": (
            "# M10 — Seleção e ganho genético\n\n"
            "## Artefato: `selecao-calculator.html`\n\n"
            "**Conceito visualizado:** Calculadora R = h²×S com inputs para média da população, "
            "média dos selecionados, h² e intervalo de geração L.\n\n"
            "**Sugestão de uso no site:** Embed via `<iframe>` na página M10.\n"
        ),
    },
    {
        "modulo": "M11", "pasta": "M11_correlacoes",
        "titulo": "Correlações genéticas, fenotípicas e ambientais",
        "texto_fonte": "M11_correlacoes_geneticas_fenotipicas_e_ambientais.revision.md",
        "artefatos": [
            {
                "arquivo": "M11_correlacoes/correlacoes-triangulo.svg",
                "tipo": "svg-estatico",
                "conceito": "Diagrama rP/rA/rE entre dois caracteres e resposta correlacionada",
                "uso_no_site": "Embutir na seção 'Conceito técnico' de M11",
            }
        ],
        "notes": (
            "# M11 — Correlações genéticas, fenotípicas e ambientais\n\n"
            "## Artefato: `correlacoes-triangulo.svg`\n\n"
            "**Conceito visualizado:** Os três tipos de correlação (rP, rA, rE) entre dois "
            "caracteres, e exemplo numérico de resposta correlacionada.\n\n"
            "**Sugestão de uso no site:** Embutir na seção 'Conceito técnico' de M11 com `<img>`.\n"
        ),
    },
    {
        "modulo": "M12", "pasta": "M12_caracteristicas_de_limiar",
        "titulo": "Características de limiar",
        "texto_fonte": "M12_caracteristicas_de_limiar.revision.md",
        "artefatos": [
            {
                "arquivo": "M12_caracteristicas_de_limiar/curva-limiar.svg",
                "tipo": "svg-estatico",
                "conceito": "Curva de responsabilidade contínua com limiar e área de probabilidade",
                "uso_no_site": "Ilustração central de M12; embutir com <img>",
            }
        ],
        "notes": (
            "# M12 — Características de limiar\n\n"
            "## Artefato: `curva-limiar.svg`\n\n"
            "**Conceito visualizado:** Modelo de limiar: curva de responsabilidade (liability) "
            "com linha de limiar T. Dois painéis: população base vs. família de alto risco.\n\n"
            "**Sugestão de uso no site:** Embutir como ilustração central de M12.\n"
        ),
    },
    {
        "modulo": "M13", "pasta": "M13_endogamia_e_parentesco",
        "titulo": "Endogamia e parentesco",
        "texto_fonte": "M13_endogamia_e_parentesco.revision.md",
        "artefatos": [
            {
                "arquivo": "M13_endogamia_e_parentesco/pedigree-endogamia.svg",
                "tipo": "svg-estatico",
                "conceito": "Pedigree de meio-irmãos com F = 1/8, coancestria e matriz A",
                "uso_no_site": "Embutir na seção 'Conceito técnico' de M13",
            }
        ],
        "notes": (
            "# M13 — Endogamia e parentesco\n\n"
            "## Artefato: `pedigree-endogamia.svg`\n\n"
            "**Conceito visualizado:** Pedigree de acasalamento entre meio-irmãos mostrando "
            "coancestria e F = 1/8. Painel de conceitos: coeficiente F, coancestria, matriz A.\n\n"
            "**Sugestão de uso no site:** Embutir na seção 'Conceito técnico' de M13 com `<img>`.\n"
        ),
    },
    {
        "modulo": "M14", "pasta": "M14_cruzamentos_e_heterose",
        "titulo": "Cruzamentos, heterose e complementaridade",
        "texto_fonte": "M14_cruzamentos_heterose_e_complementaridade.revision.md",
        "artefatos": [
            {
                "arquivo": "M14_cruzamentos_e_heterose/heterose-grafico.svg",
                "tipo": "svg-estatico",
                "conceito": "Barras P1/P2/MP/F1 com heterose destacada; H% = 26,7%",
                "uso_no_site": "Embutir no exemplo numérico de M14 com <img>",
            }
        ],
        "notes": (
            "# M14 — Cruzamentos, heterose e complementaridade\n\n"
            "## Artefato: `heterose-grafico.svg`\n\n"
            "**Conceito visualizado:** Gráfico de barras com P1=80, P2=70, MP=75 (tracejado), "
            "F1=95. Heterose H=20 pontos (26,7%) destacada em rosa.\n\n"
            "**Sugestão de uso no site:** Embutir no exemplo numérico de M14 com `<img>`.\n"
        ),
    },
    {
        "modulo": "M15", "pasta": "M15_avaliacao_genetica_dep_ebv",
        "titulo": "Avaliação genética: DEP/EBV e ranking de animais",
        "texto_fonte": "M15_avaliacao_genetica_dep_ebv_e_ranking_de_animais.revision.md",
        "artefatos": [
            {
                "arquivo": "M15_avaliacao_genetica_dep_ebv/dep-ebv-ranking.html",
                "tipo": "html-interativo",
                "conceito": "Ranking interativo por fenótipo/corrigido/EBV/DEP/acurácia",
                "uso_no_site": "Embed em iframe na página M15; largura mínima 640px",
            }
        ],
        "notes": (
            "# M15 — Avaliação genética: DEP/EBV e ranking de animais\n\n"
            "## Artefato: `dep-ebv-ranking.html`\n\n"
            "**Conceito visualizado:** Tabela de ranking interativo com três garanhões. "
            "Botões para ordenar por fenótipo observado, corrigido, EBV, DEP ou acurácia.\n\n"
            "**Sugestão de uso no site:** Embed via `<iframe>` na página M15.\n"
        ),
    },
    {
        "modulo": "M16", "pasta": "M16_modelos_lineares",
        "titulo": "Modelos lineares e modelos mistos",
        "texto_fonte": "M16_modelos_lineares_e_modelos_mistos.revision.md",
        "artefatos": [
            {
                "arquivo": "M16_modelos_lineares/modelo-linear.svg",
                "tipo": "svg-estatico",
                "conceito": "y = Xb + Zu + e com blocos coloridos e anotações por componente",
                "uso_no_site": "Embutir logo após a fórmula na seção 'Fórmula' de M16",
            }
        ],
        "notes": (
            "# M16 — Modelos lineares e modelos mistos\n\n"
            "## Artefato: `modelo-linear.svg`\n\n"
            "**Conceito visualizado:** Equação y = Xb + Zu + e decomposta em blocos coloridos. "
            "Cada componente tem anotação explicando seu papel e exemplo numérico.\n\n"
            "**Sugestão de uso no site:** Embutir logo após a fórmula em M16 com `<img>`.\n"
        ),
    },
    {
        "modulo": "M17", "pasta": "M17_blup_modelo_animal",
        "titulo": "BLUP e modelo animal",
        "texto_fonte": "M17_blup_e_modelo_animal.revision.md",
        "artefatos": [
            {
                "arquivo": "M17_blup_modelo_animal/blup-fluxo.svg",
                "tipo": "svg-estatico",
                "conceito": "Fluxo dados+pedigree → MME → BLUP → ranking; λ = (1−h²)/h²",
                "uso_no_site": "Embutir na seção 'Conceito técnico' de M17",
            }
        ],
        "notes": (
            "# M17 — BLUP e modelo animal\n\n"
            "## Artefato: `blup-fluxo.svg`\n\n"
            "**Conceito visualizado:** Fluxograma BLUP: dados fenotípicos + pedigree (matriz A) "
            "→ MME → solução → EBV/ranking. Comparação BLUP vs. ranking por fenótipo.\n\n"
            "**Sugestão de uso no site:** Embutir na seção 'Conceito técnico' de M17 com `<img>`.\n"
        ),
    },
    {
        "modulo": "M18", "pasta": "M18_genomica_snp",
        "titulo": "Genômica, marcadores SNP e dados moleculares",
        "texto_fonte": "M18_genomica_marcadores_snp_e_dados_moleculares.revision.md",
        "artefatos": [
            {
                "arquivo": "M18_genomica_snp/snp-codificacao.svg",
                "tipo": "svg-estatico",
                "conceito": "Codificação AA/Aa/aa → 0/1/2 e matriz Z (animais × SNPs)",
                "uso_no_site": "Embutir na seção 'Conceito técnico' de M18",
            }
        ],
        "notes": (
            "# M18 — Genômica, marcadores SNP e dados moleculares\n\n"
            "## Artefato: `snp-codificacao.svg`\n\n"
            "**Conceito visualizado:** Tabela de codificação AA→0, Aa→1, aa→2 e exemplo de "
            "matriz Z 3×5. Fórmula de MAF e relação G = ZZ'/2Σp(1−p).\n\n"
            "**Sugestão de uso no site:** Embutir na seção 'Conceito técnico' de M18 com `<img>`.\n"
        ),
    },
    {
        "modulo": "M19", "pasta": "M19_controle_qualidade_genomico",
        "titulo": "Controle de qualidade de dados genômicos",
        "texto_fonte": "M19_controle_de_qualidade_de_dados_genomicos.revision.md",
        "artefatos": [
            {
                "arquivo": "M19_controle_qualidade_genomico/qc-fluxo.svg",
                "tipo": "svg-estatico",
                "conceito": "Pipeline QC: call rate animais → call rate SNPs → MAF → HWE → dados limpos",
                "uso_no_site": "Embutir na seção 'Conceito técnico' de M19",
            }
        ],
        "notes": (
            "# M19 — Controle de qualidade de dados genômicos\n\n"
            "## Artefato: `qc-fluxo.svg`\n\n"
            "**Conceito visualizado:** Fluxograma de 4 filtros QC sequenciais com thresholds "
            "típicos e itens descartados em cada etapa.\n\n"
            "**Sugestão de uso no site:** Embutir na seção 'Conceito técnico' de M19 com `<img>`.\n"
        ),
    },
    {
        "modulo": "M20", "pasta": "M20_gwas_predicao_genomica",
        "titulo": "Matrizes genômicas, GWAS e predição genômica",
        "texto_fonte": "M20_matrizes_genomicas_gwas_e_predicao_genomica.revision.md",
        "artefatos": [
            {
                "arquivo": "M20_gwas_predicao_genomica/gwas-manhattan.svg",
                "tipo": "svg-estatico",
                "conceito": "Manhattan plot conceitual + diagrama BLUP vs. G-BLUP",
                "uso_no_site": "Ilustração central de M20; embutir com <img>",
            }
        ],
        "notes": (
            "# M20 — Matrizes genômicas, GWAS e predição genômica\n\n"
            "## Artefato: `gwas-manhattan.svg`\n\n"
            "**Conceito visualizado:** Manhattan plot conceitual com dois QTLs destacados e "
            "linhas de significância. Diagrama comparativo BLUP (A) vs. G-BLUP (G).\n\n"
            "**Sugestão de uso no site:** Embutir como ilustração central de M20 com `<img>`.\n"
        ),
    },
    {
        "modulo": "M21", "pasta": "M21_projeto_final",
        "titulo": "Projeto final: pipeline completo de seleção",
        "texto_fonte": "M21_projeto_final_pipeline_completo_de_selecao.revision.md",
        "artefatos": [
            {
                "arquivo": "M21_projeto_final/pipeline-selecao.svg",
                "tipo": "svg-estatico",
                "conceito": "Pipeline completo: coleta → validação → QC → modelo → BLUP → índice",
                "uso_no_site": "Infográfico de síntese em M21 e na página inicial do site",
            }
        ],
        "notes": (
            "# M21 — Projeto final: pipeline completo de seleção\n\n"
            "## Artefato: `pipeline-selecao.svg`\n\n"
            "**Conceito visualizado:** Pipeline de 6 etapas de seleção genômica com referências "
            "cruzadas a todos os módulos do curso organizados por categoria.\n\n"
            "**Sugestão de uso no site:** Ideal como infográfico na página inicial do site "
            "e como figura de abertura de M21.\n"
        ),
    },
]

README_CONTENT = """\
# MGenética — Artefatos Visuais

**Gerado em:** 2026-05-25
**Fonte:** `exports/mgenetica-course-texts-2026-05-21/md/`
**Propósito:** Recursos visuais derivados dos textos do curso para uso no site da MGenética.

## Conteúdo

| Pasta | Módulo | Artefatos |
|-------|--------|-----------|
| M01_revisao_genetica_basica | M1 — Revisão de genética básica | SVG |
| M02_modos_de_acao_genica | M2 — Modos de ação gênica | SVG |
| M03_frequencias_alelicas_e_genotipicas | M3 — Genética de populações I | HTML interativo |
| M04_hardy_weinberg | M4 — Hardy-Weinberg | HTML interativo |
| M05_fatores_frequencias_genicas | M5 — Fatores que alteram frequências | SVG |
| M06_valores_e_medias | M6 — Valores e médias (P = G + E) | SVG |
| M07_genetica_quantitativa | M7 — Noções de genética quantitativa | SVG |
| M08_componentes_de_variancia | M8 — Componentes de variância | SVG |
| M09_herdabilidade_e_repetibilidade | M9 — Herdabilidade e repetibilidade | HTML interativo |
| M10_selecao_e_ganho_genetico | M10 — Seleção e ganho genético | HTML interativo |
| M11_correlacoes | M11 — Correlações genéticas, fenotípicas e ambientais | SVG |
| M12_caracteristicas_de_limiar | M12 — Características de limiar | SVG |
| M13_endogamia_e_parentesco | M13 — Endogamia e parentesco | SVG |
| M14_cruzamentos_e_heterose | M14 — Cruzamentos, heterose e complementaridade | SVG |
| M15_avaliacao_genetica_dep_ebv | M15 — Avaliação genética: DEP/EBV | HTML interativo |
| M16_modelos_lineares | M16 — Modelos lineares e mistos | SVG |
| M17_blup_modelo_animal | M17 — BLUP e modelo animal | SVG |
| M18_genomica_snp | M18 — Genômica, marcadores SNP | SVG |
| M19_controle_qualidade_genomico | M19 — Controle de qualidade genômico | SVG |
| M20_gwas_predicao_genomica | M20 — GWAS e predição genômica | SVG |
| M21_projeto_final | M21 — Projeto final: pipeline completo | SVG |

## Formatos

- **SVG** — diagramas estáticos, embutíveis via `<img>` ou `<object>`
- **HTML** — calculadoras interativas, embutíveis via `<iframe>`

## Regras de uso no site

- SVGs: copiar para `/assets/visuals/` e referenciar com `<img src="...svg">`
- HTMLs: hospedar em `/interativos/` e embutir com `<iframe src="..." loading="lazy">`
- Todos os arquivos são auto-contidos (sem dependências externas)

## O que não está aqui

- Nenhum arquivo do projeto original foi modificado
- Esta pasta é adição pura; pode ser removida sem afetar o restante do projeto
"""

# ──────────────────────────────────────────────────────────────
# Funções de escrita
# ──────────────────────────────────────────────────────────────

def write_file(path: Path, content: str, dry_run: bool = False) -> None:
    if dry_run:
        print(f"  [dry] {path.relative_to(path.parent.parent.parent)}")
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"  ✓ {path.name}")


def main(base_dir: Path = None, dry_run: bool = False) -> None:
    if base_dir is None:
        base_dir = Path(__file__).resolve().parent.parent

    # README.md
    write_file(base_dir / "README.md", README_CONTENT, dry_run)

    # manifest.json
    manifest = {
        "gerado_em": "2026-05-25",
        "fonte": "exports/mgenetica-course-texts-2026-05-21/md/",
        "modulos": [
            {
                "modulo": m["modulo"],
                "titulo": m["titulo"],
                "texto_fonte": m["texto_fonte"],
                "artefatos": m["artefatos"],
            }
            for m in MODULOS
        ],
    }
    write_file(
        base_dir / "manifest.json",
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        dry_run,
    )

    # notes.md por módulo
    for m in MODULOS:
        pasta = base_dir / m["pasta"]
        write_file(pasta / "notes.md", m["notes"], dry_run)

    print(f"  → {len(MODULOS)*1 + 2} arquivos de metadados")


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()
    main(dry_run=args.dry_run)
