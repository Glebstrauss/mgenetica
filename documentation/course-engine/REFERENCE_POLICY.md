# Política de referências

## Regra central

Referência pública não é chunk recuperado.

O texto final deve usar formato científico padrão definido pelo curso, com ABNT como padrão. Detalhe de origem do trecho fica em arquivo de auditoria.

## Arquivos

`referencias.yml`: catálogo canônico. Define como cada obra aparece no texto final.

`.sources.json`: controle técnico de recuperação. Pode guardar arquivo, página, hash, score e trecho.

`.audit.md`: revisão humana. Mostra quais trechos sustentaram cada geração.

Texto final: contém apenas citações no corpo e lista bibliográfica limpa.

## Proibido na lista final de referências

- nome de arquivo como título;
- `Livro1`;
- `[S. l.]`;
- `[s. n.]`;
- `[s. d.]`;
- caminho local;
- hash;
- score;
- página de chunk como se fosse referência bibliográfica;
- trecho bruto recuperado.

## Exemplo de referência final aceitável

```text
FALCONER, D. S.; MACKAY, T. F. C. Introduction to quantitative genetics. 4. ed. Harlow: Longman, 1996.
```

## Gate obrigatório

Quando `referencias.yml` existir, o gate deve reprovar qualquer referência final que não corresponda ao catálogo canônico.
