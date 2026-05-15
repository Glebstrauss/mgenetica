# Plano para aplicar o brand MGenética aos materiais House Style

## Objetivo

Aplicar o brand aprovado da MGenética aos tipos de material existentes em `identidade_visual/House Style`, sem mexer no site publicado e sem sobrescrever os arquivos originais.

Direção aprovada:

- base clara: `#FFFFFF`, `#F7F9FC`, `#EEF3F9`;
- texto/autoridade: `#0A1F38`;
- apoio: `#1A4B78`;
- acento técnico: `#00A8D6`;
- tipografia editorial: `Lora` para títulos, `DM Sans` para corpo, mono para código/dados;
- logo real: `identidade_visual/logo_Mgenetica.png`;
- tom: rigor científico + clareza aplicada.

## Inventário da pasta House Style

### 1. Marca institucional NEMO

Pasta:

`identidade_visual/House Style/Marca (favor ler o manual)/`

Conteúdo:

- `Manual da Marca - NEMO.pdf`;
- versões SVG;
- versões PNG;
- arquivos abertos `.ai`;
- variações horizontal, vertical, ícone, preto, branco, cinza, verde, português e inglês.

Uso para MGenética:

- criar pacote equivalente de logo;
- não editar NEMO;
- usar estrutura como referência de organização.

### 2. Slides

Pasta:

`identidade_visual/House Style/Slides (modelos)/`

Conteúdo:

- `Slides Nemo 16.9.pptx`;
- `Slides Nemo 4.3.pptx`.

Uso para MGenética:

- criar `Slides MGenetica 16.9.pptx`;
- criar `Slides MGenetica 4.3.pptx`;
- preservar formatos;
- substituir marca, paleta, tipografia, capa, rodapé e layouts mestres.

### 3. Fontes

Pasta:

`identidade_visual/House Style/Fontes (necessário instalar)/`

Conteúdo:

- `Eurostib.TTF`;
- pasta `Eurostile`;
- `UfesSans.zip`;
- `UfesSans/`.

Uso para MGenética:

- preferir `Lora` + `DM Sans` para materiais web/editáveis;
- usar `UfesSans` como alternativa institucional se precisar offline;
- não depender de Eurostile sem confirmar licença e adequação.

### 4. Marcas dos projetos

Pasta:

`identidade_visual/House Style/Marcas dos Projetos/`

Conteúdo:

- IntegraDoce;
- OLED;
- UFO;
- MLT;
- FrameWeb;
- OntoUML.

Uso para MGenética:

- avaliar só como estrutura de sub-brand;
- não reaproveitar visual;
- planejar futuras marcas-filhas: cursos, consultoria, relatórios, genômica.

## Estrutura proposta para saída MGenética

Criar nova pasta, sem tocar originais:

`identidade_visual/MGenetica House Style/`

Estrutura:

```text
MGenetica House Style/
├── 00-brand-source/
│   ├── logo-original/
│   ├── tokens/
│   └── referencias/
├── 01-logo/
│   ├── PNG/
│   ├── SVG/
│   ├── PDF/
│   └── README-logo.md
├── 02-slides/
│   ├── MGenetica Slides 16.9.pptx
│   ├── MGenetica Slides 4.3.pptx
│   └── README-slides.md
├── 03-documentos/
│   ├── relatorio-tecnico.docx
│   ├── certificado.docx
│   ├── artigo-tecnico.docx
│   └── README-documentos.md
├── 04-social/
│   ├── instagram-post.html
│   ├── instagram-carousel.html
│   ├── linkedin-post.html
│   └── README-social.md
├── 05-templates-web/
│   ├── curso.html
│   ├── consultoria.html
│   ├── artigo.html
│   └── tokens.css
├── 06-manual/
│   ├── Manual da Marca MGenetica.md
│   └── Manual da Marca MGenetica.pdf
└── 99-checks/
    └── checklist-visual.md
```

## Fase 1 — Congelar sistema visual

Entregáveis:

- `tokens-mgenetica.css`;
- paleta oficial;
- tipografia oficial;
- regra de logo;
- regra de fundo claro/escuro;
- grid e espaçamento;
- exemplos de uso correto/incorreto.

Critério:

- tudo derivado do preview aprovado;
- sem NEMO verde;
- sem recriar logo artificial;
- sem misturar paleta antiga.

## Fase 2 — Pacote de logo

Criar versões:

- logo principal PNG;
- logo para fundo claro;
- logo para fundo escuro;
- versão quadrada/avatar;
- versão horizontal, se possível;
- versão monocromática navy;
- versão branca para fundo escuro;
- favicon/app icon.

Observação:

O arquivo atual é bitmap escuro. Para pacote profissional completo, melhor vetorizar ou redesenhar SVG fiel depois.

Critério:

- área de proteção definida;
- tamanho mínimo definido;
- exemplos de uso proibido;
- exportações testadas em fundo claro e escuro.

## Fase 3 — Slides

Converter os modelos:

- `Slides Nemo 16.9.pptx` -> `MGenetica Slides 16.9.pptx`;
- `Slides Nemo 4.3.pptx` -> `MGenetica Slides 4.3.pptx`.

Layouts mínimos:

- capa;
- seção;
- conteúdo com imagem;
- conteúdo com gráfico;
- comparação;
- aula com fórmula/dado técnico;
- encerramento/contato;
- slide escuro de impacto pontual.

Critério:

- master atualizado;
- rodapé MGenética;
- logo real;
- cores MGenética;
- fontes compatíveis;
- sem sobras NEMO.

## Fase 4 — Documentos técnicos

Criar templates:

- relatório técnico;
- parecer/diagnóstico;
- certificado;
- folha de rosto;
- resumo científico;
- handout de aula;
- ficha de exercício.

Regras:

- títulos em Lora ou UfesSans;
- corpo em DM Sans ou UfesSans;
- dados técnicos em mono;
- tabelas leves;
- gráficos em fundo branco;
- filetes cyan moderados.

## Fase 5 — Materiais sociais

Criar templates:

- post quadrado Instagram;
- carrossel Instagram;
- post LinkedIn;
- capa de aula;
- chamada de curso;
- card de artigo científico;
- card de consultoria.

Regra:

- texto curto;
- logo discreta;
- muito branco;
- cyan só como acento;
- não usar DNA como enfeite genérico.

## Fase 6 — Manual da marca MGenética

Criar manual próprio:

- conceito;
- logo;
- paleta;
- tipografia;
- componentes;
- slides;
- documentos;
- social;
- gráficos científicos;
- usos proibidos;
- checklist final.

Não copiar manual NEMO. Usar apenas como referência de cobertura.

## Fase 7 — QA visual

Checklist:

- todos os materiais abrem;
- nenhum arquivo original NEMO foi sobrescrito;
- nenhum template contém nome/logo NEMO;
- contraste AA onde há texto;
- logo legível em tamanho mínimo;
- mobile/social sem texto pequeno demais;
- slides 16:9 e 4:3 renderizam;
- PDF exportado sem fonte quebrada;
- arquivos prontos para edição futura.

## Ordem recomendada de execução

1. Criar pasta `MGenetica House Style`.
2. Copiar apenas referências necessárias, sem alterar originais.
3. Definir tokens oficiais.
4. Criar pacote de logo.
5. Criar manual inicial.
6. Criar slides 16:9.
7. Criar slides 4:3.
8. Criar documentos técnicos.
9. Criar social templates.
10. Rodar checklist visual.

## Riscos

- Logo atual é bitmap e pode perder qualidade em impressos grandes.
- Fontes Google podem falhar offline; precisa fallback.
- Arquivos `.ai` exigem Illustrator ou fluxo alternativo.
- PPTX pode manter resíduos NEMO se só trocar imagens; precisa revisar master/layouts.
- Diretório House Style tem marcas de outros projetos; não misturar.

## Decisão antes de implementar

Recomendado começar por:

**Fase 1 + Fase 2 + slide 16:9 mínimo.**

Motivo:

Tokens e logo estabilizam tudo. Slide 16:9 testa rapidamente se a identidade funciona em material real.
