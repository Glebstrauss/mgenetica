# Setup do course-engine no MGenética

## Inicializar submodule

Depois de clonar esta branch ou PR:

```bash
git submodule update --init --recursive
```

Verificar commit do engine:

```bash
git -C engine log --oneline -1
```

Nesta branch, o esperado é:

```text
3386774 docs: prepare course engine for multi-agent use
```

## Estrutura esperada do curso

O MGenética deve evoluir para esta estrutura:

```text
mgenetica/
├── engine/
├── course.yml
├── referencias.yml
├── referencias/
├── prompts/
│   ├── agents/
│   ├── critics/
│   └── gates/
├── modulos/
└── documentation/course-engine/
```

Nesta branch, essa estrutura mínima já existe. PDFs e bancos DuckDB ficam fora do Git por segurança.

## Comandos oficiais

Executar sempre a partir da raiz do MGenética.

Se `python` não existir no ambiente, use `python3`.

Gerar prompt de escrita:

```bash
python engine/scripts/generate.py --curso . --unidade M1 --stage writer
```

Gerar pipeline completo:

```bash
python engine/scripts/generate.py --curso . --unidade M1 --stage all
```

Validar saída final:

```bash
python engine/scripts/evaluate_content.py --curso . --unidade M1 --input modulos/M1_nome.revision.md
```

Converter para DOCX:

```bash
python engine/scripts/to_docx.py --input modulos/M1_nome.revision.md
```

Teste local validado nesta branch:

```bash
python3 engine/scripts/validate.py --curso .
python3 engine/scripts/generate.py --curso . --unidade M1 --stage writer
python3 engine/scripts/evaluate_content.py --curso . --unidade M1 --input modulos/M1_revisao_de_genetica_basica.revision.md
python3 engine/scripts/to_docx.py --input modulos/M1_revisao_de_genetica_basica.revision.md
```

## Atualizar o submodule futuramente

Depois que o PR do `course-engine` for aprovado e mesclado:

```bash
git -C engine fetch origin
git -C engine switch main
git -C engine pull
git add engine
git commit -m "chore: update course-engine submodule"
git push
```

Não executar `git merge main` nem `gh pr merge` sem autorização humana.
