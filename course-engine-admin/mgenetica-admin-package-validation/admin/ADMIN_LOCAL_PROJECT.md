# Projeto — Admin local MGenética

## Meta

Criar um admin local para editar a estrutura do curso, exemplos estruturados e labs
interativos sem abrir Markdown manualmente. O alvo de produto é preparar conteúdo e
artefatos para publicação em `https://mgenetica.github.io/mgenetica/`.

## Produto esperado

- UI local no `course-engine` com modo Admin.
- Edição por unidade (`M1` a `M21`) de metadados do `course.yml`.
- Edição de `dados:` estruturado por formulário/JSON.
- Edição versionada de textos `.writer.md`/`.revision.md` sem sobrescrever arquivos.
- Regeneração de DOCX a partir da versão textual escolhida.
- Regeneração de labs com `scripts/generate_labs.py`.
- Preview local do lab HTML.
- Validação antes de exportar/preparar integração.
- Exportação de pacote rastreável para branch/PR no repositório MGenética.
- Plano dry-run para aplicar o pacote no checkout MGenética sem publicar.

## Fonte de verdade

| Tipo | Fonte |
|---|---|
| Estrutura, título, objetivos e sequência | `course.yml` |
| Exemplos numéricos de labs com dataset | `labs/dados/<ID>.yml` |
| Fallback de exemplo estruturado | front-matter `dados:` ou `course.yml` |
| Texto final revisado | `modulos/*.revision.md` ou export equivalente |
| Lab HTML | `exports/mgenetica-course-interactive-*/M*.html` |

## Fluxo local

1. Abrir Admin local.
2. Escolher unidade.
3. Editar título, pergunta, objetivo, tópicos e exemplo.
4. Editar `dados:` quando existir.
5. Editar texto revisado quando necessário.
6. Salvar nova versão textual.
7. Gerar DOCX da versão escolhida.
8. Regenerar lab.
9. Validar.
10. Revisar preview.
11. Exportar para branch/PR do MGenética.
12. Gerar plano PR e aplicar somente em branch dedicada.

## Fase atual

Primeiro admin funcional implementado no app local e em validação:

- backend Flask com endpoints `/api/admin/*`;
- frontend React em modo Admin;
- edição de `course.yml`;
- edição versionada dos textos de pipeline;
- editor visual de seções Markdown para ajustar título, explicações e exemplos
  sem abrir o arquivo `.md` diretamente;
- edição de `labs/dados/*.yml` quando existir;
- conversão para DOCX sem sobrescrever artefatos existentes;
- preview e regeneração dos labs já cobertos por `#dados`.
- exportação de pacote Admin com `README.md`, `STATUS.json`, `MANIFEST.tsv` e ZIP.
- plano de aplicação dry-run para o checkout configurado em `.course-engine.local.yml`.
- aplicação controlada do pacote no checkout MGenética por endpoint/UI, recusando
  `main`, worktree sujo e destino existente; não faz commit, push ou publish.
- rascunho de PR por endpoint/UI, com título, corpo e comandos para `git add`,
  `commit`, `push` e `gh pr create --draft`; nada executado automaticamente.
- painel de prontidão global (`/api/admin/status`) com cobertura de textos, DOCX,
  labs e YAML antes de exportar.
- endpoint `/api/config` expõe destino local configurado sem hardcode no frontend.
- `site-ingest.json` validado por `schemas/site-ingest.schema.json`.
- `scripts/doctor.py` audita estado local; `--fix-safe` só gera DOCX faltantes.
- `generate.py --stage writer` injeta `dados:` estruturado no prompt, usando a
  mesma prioridade dos labs: YAML solto, front-matter e `course.yml`.
- `/api/artefatos/bulk` carrega o estado dos artefatos da sidebar em uma única
  chamada, mantendo `/api/artefatos/<id>` como fallback compatível.
- app macOS local instalado por `scripts/install_macos_app.py`, com ícone Dock
  gerado de `assets/app-icon.png`.

Estado dos labs: `M01-M21` já têm `#dados` estruturado e fonte YAML em
`labs/dados/*.yml`. Labs de slider usam `controls.<id>.value`; `M01` usa
`cruzamento.pai` e `cruzamento.mae`.

Validação local de 2026-05-29, após as melhorias de fluxo:

- `pytest`: suíte completa deve passar;
- `validate.py`: 5 módulos e 21 blocos válidos;
- `generate_labs.py check --all`: M01-M21 em sincronia;
- `git diff --check`: sem saída;
- branch de trabalho do engine: `feat/ui-fluxo-simples`;
- nenhuma ação executada em `main`, nenhum merge e nenhum PR aberto.

## Próximas fases

1. Executar manualmente o rascunho de PR quando o pacote for aprovado.

## Critérios de pronto para o MGenética

- Admin edita `course.yml`, `dados:` e textos finais sem abrir Markdown bruto.
- Toda edição salva nova versão; nenhum artefato existente é sobrescrito.
- Todos os 21 labs têm fonte estruturada.
- DOCX e HTML são regeneráveis pela UI local.
- O painel de prontidão mostra cobertura completa antes do pacote.
- Validação passa antes de exportar.
- Export cria pacote rastreável para o repositório MGenética.
- Integração no site ocorre por branch/PR, sem merge/publicação automática.
- Aplicação do pacote no checkout do site é explícita e não publica.
- Admin gera rascunho de PR sem executar commit, push ou merge.

## Aplicação no MGenética

Comando dry-run:

```bash
python scripts/apply_admin_package.py --package exports/<pacote-admin> --target ~/git-it
```

Comando real, somente depois de criar branch no checkout MGenética:

```bash
python scripts/apply_admin_package.py --package exports/<pacote-admin> --target ~/git-it --apply
```

O aplicador copia o pacote para `course-engine-admin/<nome-do-pacote>/`, escreve
`COURSE_ENGINE_ADMIN_IMPORT.md`, recusa `main`, recusa worktree sujo e recusa
sobrescrever arquivos por padrão.

Depois de aplicar, gerar rascunho de PR:

```bash
python scripts/prepare_admin_pr.py --package exports/<pacote-admin> --target ~/git-it
```

Para gravar `PR_BODY.md` no pacote aplicado:

```bash
python scripts/prepare_admin_pr.py --package exports/<pacote-admin> --target ~/git-it --write-body
```
