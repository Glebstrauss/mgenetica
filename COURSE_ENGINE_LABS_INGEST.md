# Integração course-engine labs

## Estado da branch

Branch: `codex/course-engine-labs-ingest`.

Esta branch integra o pacote validado do `course-engine` sem publicar, sem merge em `main` e
sem substituir o conteúdo textual atual do app.

## Pacote aplicado

Destino:

```text
course-engine-admin/mgenetica-admin-package-2026-06-11-labs-runtime/
```

Contrato usado:

```text
course-engine-admin/mgenetica-admin-package-2026-06-11-labs-runtime/site-ingest.json
```

O pacote vigente de 2026-06-11 declara 21 módulos, 21 textos Markdown, 21 DOCX,
21 labs HTML e 21 arquivos YAML de dados estruturados. O contrato `site-ingest.json`
declara `module-01` a `module-21`, cada um com `lab_public_path` em `/labs/*.html`.

## Runtime do frontend

- Labs HTML copiados para `frontend/public/labs/`.
- `frontend/src/components/LabEmbed.jsx` renderiza o iframe com `loading="lazy"` e
  `sandbox="allow-scripts"`, resolvendo `/labs/*.html` com `import.meta.env.BASE_URL`.
- `frontend/src/CoursePage.jsx` embute o lab depois do texto do módulo.
- `frontend/src/App.jsx` deixou de fazer request de detalhe não usado ao abrir um módulo.
- `frontend/vite.config.mjs` substitui a config ESM antiga em `.js`, corrigindo o build com
  Vite 7.

## Aplicação incremental dos metadados

Use:

```bash
ruby scripts/apply_course_engine_labs.rb --package course-engine-admin/mgenetica-admin-package-2026-06-11-labs-runtime
```

O script lê `site-ingest.json`, valida 21 labs, copia os HTML para `frontend/public/labs/`
e adiciona somente `lab` e `labFile` nos JSONs atuais:

- `frontend/src/data/legacy-curriculum.generated.json`
- `appwrite/functions/courses/legacy-curriculum.generated.json`
- `appwrite/functions/courses/catalog.generated.json`

Não use o importador legado para regenerar textos só para incluir labs; isso pode reduzir o
conteúdo atual.

## Validação executada

```bash
cd frontend
npm ci
npm test
npm run build
cd ../backend
npm ci
npm test
```

Observações:

- Validação atual executada com Node `24.16.0`.
- A branch fica empilhada sobre `codex/mgenetica-current-site-consultoria`; revise/merge essa
  PR antes desta para evitar duplicação visual no diff.
- PR #10 substitui o pacote `mgenetica-admin-package-validation` pelo export vigente
  `mgenetica-admin-package-2026-06-11-labs-runtime`.
