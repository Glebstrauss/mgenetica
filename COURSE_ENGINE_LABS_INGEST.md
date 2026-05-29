# Integração course-engine labs

## Estado da branch

Branch: `codex/course-engine-labs-ingest`.

Esta branch integra o pacote validado do `course-engine` sem publicar, sem merge em `main` e
sem substituir o conteúdo textual atual do app.

## Pacote aplicado

Destino:

```text
course-engine-admin/mgenetica-admin-package-validation/
```

Contrato usado:

```text
course-engine-admin/mgenetica-admin-package-validation/site-ingest.json
```

O manifesto declara 21 módulos, `module-01` a `module-21`, cada um com `lab_public_path`
em `/labs/*.html`.

## Runtime do frontend

- Labs HTML copiados para `frontend/public/labs/`.
- `frontend/src/components/LabEmbed.jsx` renderiza o iframe com `loading="lazy"` e
  `sandbox="allow-scripts"`.
- `frontend/src/CoursePage.jsx` embute o lab depois do texto do módulo.
- `frontend/src/App.jsx` deixou de fazer request de detalhe não usado ao abrir um módulo.
- `frontend/vite.config.mjs` substitui a config ESM antiga em `.js`, corrigindo o build com
  Vite 7.

## Aplicação incremental dos metadados

Use:

```bash
ruby scripts/apply_course_engine_labs.rb
```

O script lê `site-ingest.json`, valida `/labs/*.html`, confere arquivos públicos e adiciona
somente `lab`, `labFile`, `labSourcePath` e `courseEngineModuleId` nos JSONs atuais:

- `frontend/src/data/legacy-curriculum.generated.json`
- `appwrite/functions/courses/legacy-curriculum.generated.json`
- `appwrite/functions/courses/catalog.generated.json`

Não use o importador legado para regenerar textos só para incluir labs; isso pode reduzir o
conteúdo atual.

## Validação executada

```bash
npm test
npm run build
Rscript scripts/prepublish_site_check.R
python scripts/validate_mgenetica_integration.py --target /Users/glebstrauss/git-it --package /Users/glebstrauss/git-it/course-engine-admin/mgenetica-admin-package-validation
```

Observações:

- `npm run build` passa, mas o Node local é `22.3.0`; Vite 7 recomenda `20.19+` ou `22.12+`.
- `prepublish_site_check.R` passou. O render Quarto foi pulado porque `quarto` não está no
  `PATH` local.
