# Checklist antes de merge

## Submodule

- `engine/` aponta para commit aprovado do `course-engine`.
- `.gitmodules` usa `https://github.com/Glebstrauss/course-engine.git`.
- `git submodule update --init --recursive` funciona em clone limpo.

## Curso

- `course.yml` existe e valida contra `engine/schemas/course.schema.yml`.
- Todas as unidades esperadas aparecem na estrutura do curso.
- O fluxo funciona para qualquer unidade, não só M1 ou M2.

## Referências

- `referencias.yml` existe.
- Todas as referências finais vêm do catálogo.
- `.sources.json` e `.audit.md` ficam como controle interno.
- Lista final não contém placeholders ou nomes de arquivos.

## Conteúdo

- Texto segue o modelo didático do curso.
- Pré-requisitos e termos proibidos por unidade são respeitados.
- Exemplos numéricos são plausíveis para o curso.
- Scripts R têm no máximo 20 linhas.
- Quiz/tarefa existem quando o modelo pedir.

## Git

- Branch revisada.
- PR aberto.
- Nenhum merge automático na `main`.
- Nenhuma publicação automática do site.
