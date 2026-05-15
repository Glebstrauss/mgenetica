# MGenética — Identity Project

Projeto de identidade visual para a MGenética, empresa brasileira de educação e consultoria em genética animal aplicada.

## Stack

HTML + CSS + JS vanilla. Sem framework, sem build step, sem node_modules.

## Estrutura

```
mgenetica-identity/
├── src/
│   ├── index.html          ← página principal (referência visual)
│   ├── tokens.css          ← design tokens
│   └── components.css      ← componentes reutilizáveis (.mg-)
├── assets/
│   ├── images/             ← logo, fotos
│   └── icons/              ← ícones SVG isolados
├── docs/
│   └── brand-guide.md      ← guia de identidade
├── tests/
│   └── visual-checks.md    ← checklist de revisão
├── AGENTS.md               ← instruções para o Codex
└── README.md
```

## Como rodar

```bash
python3 -m http.server 8080 --directory src/
# Acessar: http://localhost:8080
```

## Para o Codex

Ver `AGENTS.md` — contém contexto, convenções, tarefas prioritárias e backlog de melhorias.
