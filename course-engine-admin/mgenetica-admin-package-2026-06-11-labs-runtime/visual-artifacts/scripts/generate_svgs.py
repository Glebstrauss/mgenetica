#!/usr/bin/env python3
"""
generate_svgs.py
Gera os 14 SVGs estáticos do pacote visual MGenética.

Módulos cobertos:
  M01, M02, M05, M06, M07, M08, M11, M12, M13, M14, M16, M17, M18, M19, M20, M21

Paleta de cores (tema escuro, consistente entre todos os SVGs):
  --bg       #0f1117   fundo da página
  --card     #1a1d27   fundo de cards
  --border   #2a2d3a   bordas sutis
  --text     #e2e8f0   texto principal
  --muted    #8892a4   texto secundário
  --A        #6ee7b7   alelo A / aditivo / VA
  --a        #f9a8d4   alelo a / recessivo
  --Aa       #c4b5fd   heterozigoto
  --accent   #818cf8   destaque / azul-violeta
  --yellow   #fcd34d   fórmulas / alertas
  --AA       #059669   homozigoto AA
  --Aa-col   #7c3aed   heterozigoto Aa
  --aa-col   #be185d   homozigoto aa
"""

from pathlib import Path

# ──────────────────────────────────────────────────────────────
# Utilitário de escrita
# ──────────────────────────────────────────────────────────────

def write_file(path: Path, content: str, dry_run: bool = False) -> None:
    if dry_run:
        print(f"  [dry] {path.name}")
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"  ✓ {path.name}")


# ──────────────────────────────────────────────────────────────
# SVG helpers
# ──────────────────────────────────────────────────────────────

SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 {h}" font-family="system-ui,sans-serif">\n'
SVG_BG   = '  <rect width="820" height="{h}" fill="#0f1117"/>\n'

def svg_title(title: str, subtitle: str, h: int = 480) -> str:
    """Retorna SVG completo; conteúdo a ser interpolado antes do fechamento."""
    return (
        SVG_OPEN.format(h=h)
        + SVG_BG.format(h=h)
        + f'  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">{title}</text>\n'
        + f'  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">{subtitle}</text>\n'
    )


# ──────────────────────────────────────────────────────────────
# Conteúdo SVG por módulo
# Cada função retorna a string SVG completa.
# ──────────────────────────────────────────────────────────────

def svg_M01() -> str:
    return r"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M1 — Genótipo e Alelo</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Cada animal diploide carrega duas cópias do locus — uma de cada pai</text>
  <rect x="20" y="75" width="380" height="280" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="210" y="100" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="600" letter-spacing="1">LOCUS — DUAS CÓPIAS</text>
  <text x="50" y="138" fill="#8892a4" font-size="11">Égua AA</text>
  <circle cx="130" cy="160" r="26" fill="#064e3b" stroke="#6ee7b7" stroke-width="2"/>
  <text x="130" y="165" text-anchor="middle" fill="#6ee7b7" font-size="18" font-weight="700">A</text>
  <circle cx="195" cy="160" r="26" fill="#064e3b" stroke="#6ee7b7" stroke-width="2"/>
  <text x="195" y="165" text-anchor="middle" fill="#6ee7b7" font-size="18" font-weight="700">A</text>
  <text x="240" y="165" fill="#6ee7b7" font-size="12" font-weight="600">→ 2 cópias A</text>
  <text x="50" y="215" fill="#8892a4" font-size="11">Égua Aa</text>
  <circle cx="130" cy="237" r="26" fill="#064e3b" stroke="#6ee7b7" stroke-width="2"/>
  <text x="130" y="242" text-anchor="middle" fill="#6ee7b7" font-size="18" font-weight="700">A</text>
  <circle cx="195" cy="237" r="26" fill="#831843" stroke="#f9a8d4" stroke-width="2"/>
  <text x="195" y="242" text-anchor="middle" fill="#f9a8d4" font-size="18" font-weight="700">a</text>
  <text x="240" y="235" fill="#6ee7b7" font-size="12" font-weight="600">→ 1 cópia A</text>
  <text x="240" y="249" fill="#f9a8d4" font-size="12" font-weight="600">→ 1 cópia a</text>
  <text x="50" y="292" fill="#8892a4" font-size="11">Égua aa</text>
  <circle cx="130" cy="314" r="26" fill="#831843" stroke="#f9a8d4" stroke-width="2"/>
  <text x="130" y="319" text-anchor="middle" fill="#f9a8d4" font-size="18" font-weight="700">a</text>
  <circle cx="195" cy="314" r="26" fill="#831843" stroke="#f9a8d4" stroke-width="2"/>
  <text x="195" y="319" text-anchor="middle" fill="#f9a8d4" font-size="18" font-weight="700">a</text>
  <text x="240" y="319" fill="#f9a8d4" font-size="12" font-weight="600">→ 2 cópias a</text>
  <circle cx="50" cy="365" r="9" fill="#064e3b" stroke="#6ee7b7" stroke-width="1.5"/>
  <text x="65" y="370" fill="#6ee7b7" font-size="11">Alelo A (dominante)</text>
  <circle cx="50" cy="385" r="9" fill="#831843" stroke="#f9a8d4" stroke-width="1.5"/>
  <text x="65" y="390" fill="#f9a8d4" font-size="11">Alelo a (recessivo)</text>
  <rect x="420" y="75" width="380" height="280" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="610" y="100" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="600" letter-spacing="1">CRUZAMENTO Aa × Aa</text>
  <text x="610" y="115" text-anchor="middle" fill="#8892a4" font-size="10">Quadrado de Punnett — proporções esperadas</text>
  <text x="545" y="152" text-anchor="middle" fill="#6ee7b7" font-size="16" font-weight="700">A</text>
  <text x="620" y="152" text-anchor="middle" fill="#f9a8d4" font-size="16" font-weight="700">a</text>
  <text x="490" y="195" text-anchor="middle" fill="#6ee7b7" font-size="16" font-weight="700">A</text>
  <text x="490" y="257" text-anchor="middle" fill="#f9a8d4" font-size="16" font-weight="700">a</text>
  <rect x="505" y="160" width="75" height="55" fill="#064e3b" stroke="#2a2d3a"/>
  <text x="542" y="192" text-anchor="middle" fill="#6ee7b7" font-size="15" font-weight="700">AA</text>
  <rect x="580" y="160" width="75" height="55" fill="rgba(124,58,237,0.2)" stroke="#2a2d3a"/>
  <text x="617" y="192" text-anchor="middle" fill="#c4b5fd" font-size="15" font-weight="700">Aa</text>
  <rect x="505" y="215" width="75" height="55" fill="rgba(124,58,237,0.2)" stroke="#2a2d3a"/>
  <text x="542" y="247" text-anchor="middle" fill="#c4b5fd" font-size="15" font-weight="700">aA</text>
  <rect x="580" y="215" width="75" height="55" fill="#831843" stroke="#2a2d3a"/>
  <text x="617" y="247" text-anchor="middle" fill="#f9a8d4" font-size="15" font-weight="700">aa</text>
  <text x="680" y="183" fill="#6ee7b7" font-size="13" font-weight="600">25% AA</text>
  <text x="680" y="230" fill="#c4b5fd" font-size="13" font-weight="600">50% Aa</text>
  <text x="680" y="255" fill="#f9a8d4" font-size="13" font-weight="600">25% aa</text>
  <rect x="430" y="295" width="90" height="22" rx="3" fill="#059669"/>
  <text x="475" y="311" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">1 AA</text>
  <rect x="522" y="295" width="180" height="22" rx="3" fill="#7c3aed"/>
  <text x="612" y="311" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">2 Aa</text>
  <rect x="704" y="295" width="90" height="22" rx="3" fill="#be185d"/>
  <text x="749" y="311" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">1 aa</text>
  <text x="610" y="345" text-anchor="middle" fill="#8892a4" font-size="11">proporção 1 : 2 : 1</text>
  <rect x="20" y="375" width="780" height="46" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="395" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Ponto-chave</text>
  <text x="410" y="413" text-anchor="middle" fill="#e2e8f0" font-size="11">Alelo é uma versão do gene. Genótipo é o par de alelos. Animal ≠ alelo.</text>
  <text x="410" y="460" text-anchor="middle" fill="#3d4252" font-size="10">MGenética · Falconer &amp; Mackay (1996) · Griffiths et al. (2016)</text>
</svg>
"""


def svg_M02() -> str:
    return r"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M2 — Modos de Ação Gênica</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Valor genotípico em função do genótipo: aditivo, dominância e sobredominância</text>
  <rect x="60" y="75" width="490" height="300" rx="8" fill="#1a1d27" stroke="#2a2d3a"/>
  <line x1="60" y1="375" x2="550" y2="375" stroke="#2a2d3a"/>
  <line x1="60" y1="325" x2="550" y2="325" stroke="#2a2d3a" stroke-width="0.5" stroke-dasharray="4,4"/>
  <line x1="60" y1="275" x2="550" y2="275" stroke="#2a2d3a" stroke-width="0.5" stroke-dasharray="4,4"/>
  <line x1="60" y1="225" x2="550" y2="225" stroke="#2a2d3a" stroke-width="0.5" stroke-dasharray="4,4"/>
  <line x1="60" y1="175" x2="550" y2="175" stroke="#2a2d3a" stroke-width="0.5" stroke-dasharray="4,4"/>
  <line x1="60" y1="125" x2="550" y2="125" stroke="#2a2d3a" stroke-width="0.5" stroke-dasharray="4,4"/>
  <text x="50" y="379" text-anchor="end" fill="#8892a4" font-size="10">0</text>
  <text x="50" y="329" text-anchor="end" fill="#8892a4" font-size="10">2</text>
  <text x="50" y="279" text-anchor="end" fill="#8892a4" font-size="10">4</text>
  <text x="50" y="229" text-anchor="end" fill="#8892a4" font-size="10">6</text>
  <text x="50" y="179" text-anchor="end" fill="#8892a4" font-size="10">8</text>
  <text x="50" y="129" text-anchor="end" fill="#8892a4" font-size="10">10</text>
  <text x="20" y="230" text-anchor="middle" fill="#8892a4" font-size="11" transform="rotate(-90,20,230)">Valor genotípico</text>
  <line x1="160" y1="375" x2="160" y2="380" stroke="#8892a4"/>
  <line x1="305" y1="375" x2="305" y2="380" stroke="#8892a4"/>
  <line x1="450" y1="375" x2="450" y2="380" stroke="#8892a4"/>
  <text x="160" y="395" text-anchor="middle" fill="#f9a8d4" font-size="13" font-weight="600">aa</text>
  <text x="305" y="395" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="600">Aa</text>
  <text x="450" y="395" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="600">AA</text>
  <text x="305" y="413" text-anchor="middle" fill="#8892a4" font-size="11">Genótipo</text>
  <line x1="160" y1="325" x2="450" y2="125" stroke="#6ee7b7" stroke-width="2.5"/>
  <circle cx="160" cy="325" r="5" fill="#6ee7b7"/>
  <circle cx="305" cy="225" r="5" fill="#6ee7b7"/>
  <circle cx="450" cy="125" r="5" fill="#6ee7b7"/>
  <polyline points="160,325 305,125 450,125" fill="none" stroke="#fcd34d" stroke-width="2.5" stroke-dasharray="8,4"/>
  <circle cx="160" cy="325" r="5" fill="#fcd34d"/>
  <circle cx="305" cy="125" r="5" fill="#fcd34d"/>
  <circle cx="450" cy="125" r="5" fill="#fcd34d"/>
  <path d="M160,275 Q305,95 450,275" fill="none" stroke="#f9a8d4" stroke-width="2.5" stroke-dasharray="4,4"/>
  <circle cx="160" cy="275" r="5" fill="#f9a8d4"/>
  <circle cx="305" cy="115" r="5" fill="#f9a8d4"/>
  <circle cx="450" cy="275" r="5" fill="#f9a8d4"/>
  <rect x="580" y="100" width="220" height="180" rx="8" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="690" y="125" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600" letter-spacing="1">LEGENDA</text>
  <line x1="598" y1="155" x2="628" y2="155" stroke="#6ee7b7" stroke-width="2.5"/>
  <circle cx="613" cy="155" r="4" fill="#6ee7b7"/>
  <text x="636" y="159" fill="#e2e8f0" font-size="12" font-weight="600">Aditivo</text>
  <text x="636" y="172" fill="#8892a4" font-size="10">d = 0; linha reta</text>
  <line x1="598" y1="200" x2="628" y2="200" stroke="#fcd34d" stroke-width="2.5" stroke-dasharray="6,3"/>
  <circle cx="613" cy="200" r="4" fill="#fcd34d"/>
  <text x="636" y="204" fill="#e2e8f0" font-size="12" font-weight="600">Dominância</text>
  <text x="636" y="217" fill="#8892a4" font-size="10">Aa = AA (d = a)</text>
  <path d="M598,248 Q613,238 628,248" fill="none" stroke="#f9a8d4" stroke-width="2.5" stroke-dasharray="4,3"/>
  <circle cx="613" cy="241" r="4" fill="#f9a8d4"/>
  <text x="636" y="250" fill="#e2e8f0" font-size="12" font-weight="600">Sobredominância</text>
  <text x="636" y="263" fill="#8892a4" font-size="10">Aa &gt; AA (d &gt; a)</text>
  <rect x="60" y="425" width="740" height="40" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="430" y="441" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600">Ponto-chave</text>
  <text x="430" y="457" text-anchor="middle" fill="#e2e8f0" font-size="11">Efeito aditivo (a): diferença entre homozigoto AA e a média dos homozigotos. Dominância (d): desvio do heterozigoto do ponto médio.</text>
  <text x="410" y="475" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Falconer &amp; Mackay (1996)</text>
</svg>
"""


def svg_M05() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M5 — Forças que Alteram Frequências Alélicas</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Quatro mecanismos que mudam p e q entre gerações</text>
  <rect x="295" y="185" width="230" height="80" rx="12" fill="#1a1d27" stroke="#818cf8" stroke-width="2"/>
  <text x="410" y="220" text-anchor="middle" fill="#818cf8" font-size="15" font-weight="700">Frequência alélica</text>
  <text x="410" y="240" text-anchor="middle" fill="#c7d2fe" font-size="13">p e q na população</text>
  <text x="410" y="256" text-anchor="middle" fill="#8892a4" font-size="11">muda entre gerações</text>
  <rect x="285" y="62" width="250" height="72" rx="10" fill="#064e3b" stroke="#6ee7b7" stroke-width="1.5"/>
  <text x="410" y="88" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="700">Seleção</text>
  <text x="410" y="106" text-anchor="middle" fill="#a7f3d0" font-size="11">Favorece alelos com maior aptidão</text>
  <text x="410" y="121" text-anchor="middle" fill="#6ee7b7" font-size="10">direcional · estabilizadora · disruptiva</text>
  <line x1="410" y1="134" x2="410" y2="183" stroke="#6ee7b7" stroke-width="2"/>
  <polygon points="410,185 404,175 416,175" fill="#6ee7b7"/>
  <rect x="42" y="195" width="218" height="72" rx="10" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="151" y="221" text-anchor="middle" fill="#818cf8" font-size="14" font-weight="700">Migração (fluxo gênico)</text>
  <text x="151" y="239" text-anchor="middle" fill="#a5b4fc" font-size="11">Entrada de alelos externos</text>
  <text x="151" y="254" text-anchor="middle" fill="#818cf8" font-size="10">homogeniza frequências entre grupos</text>
  <line x1="260" y1="231" x2="293" y2="231" stroke="#818cf8" stroke-width="2"/>
  <polygon points="295,231 285,225 285,237" fill="#818cf8"/>
  <rect x="560" y="195" width="218" height="72" rx="10" fill="#1c1917" stroke="#fcd34d" stroke-width="1.5"/>
  <text x="669" y="221" text-anchor="middle" fill="#fcd34d" font-size="14" font-weight="700">Mutação</text>
  <text x="669" y="239" text-anchor="middle" fill="#fde68a" font-size="11">Cria novos alelos; taxa µ baixa</text>
  <text x="669" y="254" text-anchor="middle" fill="#fcd34d" font-size="10">efeito lento, mas cumulativo</text>
  <line x1="558" y1="231" x2="527" y2="231" stroke="#fcd34d" stroke-width="2"/>
  <polygon points="525,231 535,225 535,237" fill="#fcd34d"/>
  <rect x="285" y="320" width="250" height="72" rx="10" fill="#3b0764" stroke="#f9a8d4" stroke-width="1.5"/>
  <text x="410" y="346" text-anchor="middle" fill="#f9a8d4" font-size="14" font-weight="700">Deriva genética</text>
  <text x="410" y="364" text-anchor="middle" fill="#fbcfe8" font-size="11">Flutuação aleatória em pop. pequenas</text>
  <text x="410" y="379" text-anchor="middle" fill="#f9a8d4" font-size="10">Ne pequeno → fixação ou perda de alelos</text>
  <line x1="410" y1="318" x2="410" y2="267" stroke="#f9a8d4" stroke-width="2"/>
  <polygon points="410,265 404,275 416,275" fill="#f9a8d4"/>
  <rect x="42" y="320" width="218" height="56" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="151" y="344" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600">Tamanho efetivo Ne</text>
  <text x="151" y="360" text-anchor="middle" fill="#8892a4" font-size="10">Quanto menor Ne,</text>
  <text x="151" y="373" text-anchor="middle" fill="#8892a4" font-size="10">maior o efeito da deriva</text>
  <rect x="42" y="415" width="736" height="46" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="434" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Ponto-chave</text>
  <text x="410" y="453" text-anchor="middle" fill="#e2e8f0" font-size="11">Em um plantel pequeno de cavalos, deriva e endogamia dominam o cenário. Seleção intencional precisa competir com esse ruído genético.</text>
  <text x="410" y="472" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Falconer &amp; Mackay (1996) · Eler (2017)</text>
</svg>
"""


def svg_M06() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 460" font-family="system-ui,sans-serif">
  <rect width="820" height="460" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M6 — P = G + E</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Fenótipo observado = Valor genotípico + Desvio ambiental</text>
  <rect x="60" y="75" width="700" height="70" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="410" y="105" text-anchor="middle" font-size="28" font-weight="700">
    <tspan fill="#818cf8">P</tspan>
    <tspan fill="#8892a4" font-size="22"> = </tspan>
    <tspan fill="#6ee7b7">G</tspan>
    <tspan fill="#8892a4" font-size="22"> + </tspan>
    <tspan fill="#fcd34d">E</tspan>
  </text>
  <text x="198" y="128" text-anchor="middle" fill="#818cf8" font-size="10">Fenótipo</text>
  <text x="410" y="128" text-anchor="middle" fill="#6ee7b7" font-size="10">Genótipo</text>
  <text x="620" y="128" text-anchor="middle" fill="#fcd34d" font-size="10">Ambiente</text>
  <text x="410" y="170" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600" letter-spacing="1">EXEMPLO — ALTURA À CERNELHA (cm)</text>
  <text x="155" y="200" text-anchor="middle" fill="#8892a4" font-size="11">Égua 1</text>
  <text x="410" y="200" text-anchor="middle" fill="#8892a4" font-size="11">Égua 2</text>
  <text x="665" y="200" text-anchor="middle" fill="#8892a4" font-size="11">Égua 3</text>
  <rect x="105" y="310" width="100" height="96" rx="4" fill="#059669"/>
  <text x="155" y="362" text-anchor="middle" fill="#fff" font-size="11" font-weight="600">G = 148</text>
  <rect x="105" y="206" width="100" height="8" rx="2" fill="#fcd34d"/>
  <text x="155" y="194" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="700">E = +4</text>
  <text x="155" y="180" text-anchor="middle" fill="#818cf8" font-size="12" font-weight="700">P = 152</text>
  <line x1="215" y1="206" x2="225" y2="206" stroke="#818cf8" stroke-width="1"/>
  <line x1="225" y1="206" x2="225" y2="310" stroke="#818cf8" stroke-width="1"/>
  <line x1="215" y1="310" x2="225" y2="310" stroke="#818cf8" stroke-width="1"/>
  <text x="230" y="262" fill="#818cf8" font-size="10">P</text>
  <rect x="360" y="206" width="100" height="100" rx="4" fill="#059669"/>
  <text x="410" y="262" text-anchor="middle" fill="#fff" font-size="11" font-weight="600">G = 152</text>
  <rect x="360" y="306" width="100" height="4" rx="2" fill="#f87171"/>
  <text x="410" y="194" text-anchor="middle" fill="#f87171" font-size="11" font-weight="700">E = −2</text>
  <text x="410" y="180" text-anchor="middle" fill="#818cf8" font-size="12" font-weight="700">P = 150</text>
  <line x1="470" y1="210" x2="480" y2="210" stroke="#818cf8" stroke-width="1"/>
  <line x1="480" y1="210" x2="480" y2="310" stroke="#818cf8" stroke-width="1"/>
  <line x1="470" y1="310" x2="480" y2="310" stroke="#818cf8" stroke-width="1"/>
  <text x="485" y="264" fill="#818cf8" font-size="10">P</text>
  <rect x="615" y="214" width="100" height="96" rx="4" fill="#059669"/>
  <text x="665" y="267" text-anchor="middle" fill="#fff" font-size="11" font-weight="600">G = 148</text>
  <rect x="615" y="200" width="100" height="14" rx="2" fill="#fcd34d"/>
  <text x="665" y="188" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="700">E = +7</text>
  <text x="665" y="174" text-anchor="middle" fill="#818cf8" font-size="12" font-weight="700">P = 155</text>
  <line x1="725" y1="200" x2="735" y2="200" stroke="#818cf8" stroke-width="1"/>
  <line x1="735" y1="200" x2="735" y2="310" stroke="#818cf8" stroke-width="1"/>
  <line x1="725" y1="310" x2="735" y2="310" stroke="#818cf8" stroke-width="1"/>
  <text x="740" y="260" fill="#818cf8" font-size="10">P</text>
  <line x1="80" y1="310" x2="760" y2="310" stroke="#2a2d3a" stroke-width="1.5"/>
  <rect x="80" y="330" width="18" height="12" rx="2" fill="#059669"/>
  <text x="104" y="341" fill="#6ee7b7" font-size="11">G — valor genotípico</text>
  <rect x="240" y="330" width="18" height="12" rx="2" fill="#fcd34d"/>
  <text x="264" y="341" fill="#fcd34d" font-size="11">E positivo (ambiente favorável)</text>
  <rect x="490" y="330" width="18" height="12" rx="2" fill="#f87171"/>
  <text x="514" y="341" fill="#f87171" font-size="11">E negativo (ambiente desfavorável)</text>
  <rect x="60" y="360" width="700" height="46" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="378" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Ponto-chave</text>
  <text x="410" y="396" text-anchor="middle" fill="#e2e8f0" font-size="11">Dois animais com o mesmo genótipo podem ter fenótipos diferentes. O ambiente não muda o genótipo — muda o fenótipo observado.</text>
  <text x="410" y="452" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Falconer &amp; Mackay (1996)</text>
</svg>
"""


def svg_M07() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M7 — Genética Quantitativa</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Muitos loci com efeitos pequenos → distribuição contínua aproximando a normal</text>
  <text x="115" y="90" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">1 locus</text>
  <text x="115" y="104" text-anchor="middle" fill="#8892a4" font-size="10">2 fenótipos</text>
  <text x="310" y="90" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">2 loci</text>
  <text x="310" y="104" text-anchor="middle" fill="#8892a4" font-size="10">3 fenótipos</text>
  <text x="530" y="90" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">5 loci</text>
  <text x="530" y="104" text-anchor="middle" fill="#8892a4" font-size="10">6 fenótipos</text>
  <text x="720" y="90" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Muitos loci</text>
  <text x="720" y="104" text-anchor="middle" fill="#8892a4" font-size="10">distribuição normal</text>
  <rect x="55" y="115" width="120" height="240" rx="6" fill="#1a1d27" stroke="#2a2d3a"/>
  <line x1="55" y1="345" x2="175" y2="345" stroke="#2a2d3a"/>
  <rect x="70" y="245" width="38" height="100" rx="3" fill="#6ee7b7"/>
  <rect x="118" y="245" width="38" height="100" rx="3" fill="#6ee7b7"/>
  <text x="89" y="360" text-anchor="middle" fill="#8892a4" font-size="9">aa</text>
  <text x="137" y="360" text-anchor="middle" fill="#8892a4" font-size="9">AA</text>
  <rect x="250" y="115" width="120" height="240" rx="6" fill="#1a1d27" stroke="#2a2d3a"/>
  <line x1="250" y1="345" x2="370" y2="345" stroke="#2a2d3a"/>
  <rect x="257" y="295" width="28" height="50" rx="3" fill="#818cf8"/>
  <rect x="291" y="245" width="28" height="100" rx="3" fill="#818cf8"/>
  <rect x="325" y="295" width="28" height="50" rx="3" fill="#818cf8"/>
  <text x="271" y="360" text-anchor="middle" fill="#8892a4" font-size="8">0 al A</text>
  <text x="305" y="360" text-anchor="middle" fill="#8892a4" font-size="8">1 al A</text>
  <text x="339" y="360" text-anchor="middle" fill="#8892a4" font-size="8">2 al A</text>
  <rect x="470" y="115" width="120" height="240" rx="6" fill="#1a1d27" stroke="#2a2d3a"/>
  <line x1="470" y1="345" x2="590" y2="345" stroke="#2a2d3a"/>
  <rect x="473" y="336" width="16" height="9"  rx="2" fill="#c4b5fd"/>
  <rect x="491" y="300" width="16" height="45" rx="2" fill="#c4b5fd"/>
  <rect x="509" y="255" width="16" height="90" rx="2" fill="#c4b5fd"/>
  <rect x="527" y="255" width="16" height="90" rx="2" fill="#c4b5fd"/>
  <rect x="545" y="300" width="16" height="45" rx="2" fill="#c4b5fd"/>
  <rect x="563" y="336" width="16" height="9"  rx="2" fill="#c4b5fd"/>
  <rect x="655" y="115" width="140" height="240" rx="6" fill="#1a1d27" stroke="#2a2d3a"/>
  <line x1="655" y1="345" x2="795" y2="345" stroke="#2a2d3a"/>
  <path d="M660,344 C670,344 680,340 690,330 C700,318 705,295 715,270 C720,255 725,240 728,230 C730,222 731,218 733,215 C735,218 736,222 738,230 C741,240 746,255 751,270 C761,295 766,318 776,330 C786,340 790,344 795,344"
        fill="rgba(129,140,248,0.3)" stroke="#818cf8" stroke-width="2.5"/>
  <text x="725" y="210" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="600">Normal</text>
  <line x1="178" y1="230" x2="247" y2="230" stroke="#3d4252" stroke-width="1.5"/>
  <polygon points="248,230 240,226 240,234" fill="#3d4252"/>
  <line x1="373" y1="230" x2="467" y2="230" stroke="#3d4252" stroke-width="1.5"/>
  <polygon points="468,230 460,226 460,234" fill="#3d4252"/>
  <line x1="593" y1="230" x2="652" y2="230" stroke="#3d4252" stroke-width="1.5"/>
  <polygon points="653,230 645,226 645,234" fill="#3d4252"/>
  <text x="213" y="222" text-anchor="middle" fill="#3d4252" font-size="9">+ loci</text>
  <text x="420" y="222" text-anchor="middle" fill="#3d4252" font-size="9">+ loci</text>
  <text x="622" y="222" text-anchor="middle" fill="#3d4252" font-size="9">n → ∞</text>
  <rect x="55" y="385" width="710" height="55" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="405" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Por que a distribuição parece contínua?</text>
  <text x="410" y="421" text-anchor="middle" fill="#e2e8f0" font-size="11">Cada locus adicional dobra o número de classes fenotípicas. Com dezenas ou centenas de loci, as classes ficam</text>
  <text x="410" y="436" text-anchor="middle" fill="#e2e8f0" font-size="11">tão próximas que o olho vê uma curva contínua — e o erro de medição preenche as lacunas.</text>
  <text x="410" y="468" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Falconer &amp; Mackay (1996)</text>
</svg>
"""


def svg_M08() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M8 — Componentes de Variância</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">VP = VA + VD + VI + VE · Apenas VA responde à seleção massal de forma previsível</text>
  <text x="175" y="88" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Alta VA</text>
  <text x="175" y="102" text-anchor="middle" fill="#8892a4" font-size="10">h² alto → seleção eficaz</text>
  <text x="410" y="88" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Alta VD</text>
  <text x="410" y="102" text-anchor="middle" fill="#8892a4" font-size="10">heterose relevante</text>
  <text x="645" y="88" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Alta VE</text>
  <text x="645" y="102" text-anchor="middle" fill="#8892a4" font-size="10">ambiente domina</text>
  <rect x="115" y="204" width="120" height="156" rx="0" fill="#059669"/>
  <rect x="115" y="165" width="120" height="39"  rx="0" fill="#7c3aed"/>
  <rect x="115" y="152" width="120" height="13"  rx="0" fill="#ea580c"/>
  <rect x="115" y="100" width="120" height="52"  rx="4" fill="#475569"/>
  <rect x="115" y="100" width="120" height="260" rx="4" fill="none" stroke="#2a2d3a" stroke-width="1"/>
  <text x="175" y="288" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">VA = 60</text>
  <text x="175" y="188" text-anchor="middle" fill="#fff" font-size="11">VD = 15</text>
  <text x="175" y="132" text-anchor="middle" fill="#fff" font-size="10">VE = 20</text>
  <rect x="115" y="364" width="120" height="28" rx="4" fill="#064e3b" stroke="#6ee7b7"/>
  <text x="175" y="382" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">h² = 0,60</text>
  <rect x="350" y="308" width="120" height="52"  rx="0" fill="#059669"/>
  <rect x="350" y="178" width="120" height="130" rx="0" fill="#7c3aed"/>
  <rect x="350" y="152" width="120" height="26"  rx="0" fill="#ea580c"/>
  <rect x="350" y="100" width="120" height="52"  rx="4" fill="#475569"/>
  <rect x="350" y="100" width="120" height="260" rx="4" fill="none" stroke="#2a2d3a" stroke-width="1"/>
  <text x="410" y="338" text-anchor="middle" fill="#fff" font-size="11">VA = 20</text>
  <text x="410" y="246" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">VD = 50</text>
  <text x="410" y="132" text-anchor="middle" fill="#fff" font-size="10">VE = 20</text>
  <rect x="350" y="364" width="120" height="28" rx="4" fill="#1e1b4b" stroke="#818cf8"/>
  <text x="410" y="382" text-anchor="middle" fill="#818cf8" font-size="12" font-weight="700">h² = 0,20</text>
  <rect x="585" y="321" width="120" height="39"  rx="0" fill="#059669"/>
  <rect x="585" y="295" width="120" height="26"  rx="0" fill="#7c3aed"/>
  <rect x="585" y="282" width="120" height="13"  rx="0" fill="#ea580c"/>
  <rect x="585" y="100" width="120" height="182" rx="4" fill="#475569"/>
  <rect x="585" y="100" width="120" height="260" rx="4" fill="none" stroke="#2a2d3a" stroke-width="1"/>
  <text x="645" y="340" text-anchor="middle" fill="#fff" font-size="11">VA = 15</text>
  <text x="645" y="200" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">VE = 70</text>
  <rect x="585" y="364" width="120" height="28" rx="4" fill="#1c1917" stroke="#fcd34d"/>
  <text x="645" y="382" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="700">h² = 0,15</text>
  <text x="175" y="96" text-anchor="middle" fill="#8892a4" font-size="10">VP = 100</text>
  <text x="410" y="96" text-anchor="middle" fill="#8892a4" font-size="10">VP = 100</text>
  <text x="645" y="96" text-anchor="middle" fill="#8892a4" font-size="10">VP = 100</text>
  <rect x="60" y="400" width="18" height="12" rx="2" fill="#059669"/>
  <text x="84" y="411" fill="#6ee7b7" font-size="11">VA — aditiva (h²)</text>
  <rect x="220" y="400" width="18" height="12" rx="2" fill="#7c3aed"/>
  <text x="244" y="411" fill="#c4b5fd" font-size="11">VD — dominância</text>
  <rect x="380" y="400" width="18" height="12" rx="2" fill="#ea580c"/>
  <text x="404" y="411" fill="#fdba74" font-size="11">VI — epistasia</text>
  <rect x="520" y="400" width="18" height="12" rx="2" fill="#475569"/>
  <text x="544" y="411" fill="#94a3b8" font-size="11">VE — ambiental</text>
  <rect x="60" y="420" width="700" height="36" rx="6" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="436" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600">Ponto-chave: h² = VA / VP</text>
  <text x="410" y="450" text-anchor="middle" fill="#e2e8f0" font-size="11">Quanto maior VA e menor VD + VE, mais a seleção massal move a média da progênie na direção desejada.</text>
  <text x="410" y="470" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Falconer &amp; Mackay (1996)</text>
</svg>
"""


def svg_M11() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M11 — Correlações Genéticas, Fenotípicas e Ambientais</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">rP = rA·hT1·hT2 + rE·eT1·eT2 · A correlação genética (rA) determina a resposta correlacionada</text>
  <rect x="30" y="72" width="460" height="310" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="260" y="96" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600" letter-spacing="1">DOIS CARACTERES — TRÊS CORRELAÇÕES</text>
  <circle cx="130" cy="220" r="55" fill="#064e3b" stroke="#6ee7b7" stroke-width="2"/>
  <text x="130" y="215" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="700">Caráter 1</text>
  <text x="130" y="231" text-anchor="middle" fill="#a7f3d0" font-size="10">ex: altura</text>
  <circle cx="390" cy="220" r="55" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
  <text x="390" y="215" text-anchor="middle" fill="#818cf8" font-size="13" font-weight="700">Caráter 2</text>
  <text x="390" y="231" text-anchor="middle" fill="#a5b4fc" font-size="10">ex: peso</text>
  <line x1="185" y1="220" x2="335" y2="220" stroke="#e2e8f0" stroke-width="2"/>
  <polygon points="335,220 325,215 325,225" fill="#e2e8f0"/>
  <polygon points="185,220 195,215 195,225" fill="#e2e8f0"/>
  <rect x="228" y="206" width="64" height="20" rx="4" fill="#0f1117"/>
  <text x="260" y="220" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="700">rP</text>
  <text x="260" y="234" text-anchor="middle" fill="#8892a4" font-size="9">fenotípica</text>
  <path d="M155,170 Q260,120 365,170" fill="none" stroke="#6ee7b7" stroke-width="2" stroke-dasharray="6,3"/>
  <polygon points="365,170 355,162 358,172" fill="#6ee7b7"/>
  <polygon points="155,170 165,162 162,172" fill="#6ee7b7"/>
  <text x="260" y="128" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="700">rA</text>
  <text x="260" y="142" text-anchor="middle" fill="#a7f3d0" font-size="9">genética aditiva</text>
  <path d="M155,270 Q260,318 365,270" fill="none" stroke="#fcd34d" stroke-width="2" stroke-dasharray="4,4"/>
  <polygon points="365,270 355,268 358,278" fill="#fcd34d"/>
  <polygon points="155,270 165,268 162,278" fill="#fcd34d"/>
  <text x="260" y="312" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="700">rE</text>
  <text x="260" y="326" text-anchor="middle" fill="#fde68a" font-size="9">ambiental</text>
  <rect x="510" y="72" width="280" height="310" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="650" y="96" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600" letter-spacing="1">RESPOSTA CORRELACIONADA</text>
  <rect x="524" y="108" width="252" height="52" rx="6" fill="#12141e"/>
  <text x="650" y="128" text-anchor="middle" fill="#e2e8f0" font-size="13" font-family="monospace">CR = rA × h₁ × h₂ × σP₁</text>
  <text x="650" y="148" text-anchor="middle" fill="#8892a4" font-size="10">resposta no caráter 2 ao selecionar caráter 1</text>
  <text x="524" y="186" fill="#8892a4" font-size="11">Exemplo numérico:</text>
  <rect x="524" y="196" width="252" height="100" rx="6" fill="#12141e"/>
  <text x="536" y="216" fill="#8892a4" font-size="10">rA (alt × peso)</text>
  <text x="762" y="216" text-anchor="end" fill="#6ee7b7" font-size="11" font-weight="600">= 0,60</text>
  <text x="536" y="234" fill="#8892a4" font-size="10">h₁ (altura)</text>
  <text x="762" y="234" text-anchor="end" fill="#e2e8f0" font-size="11">= 0,50</text>
  <text x="536" y="252" fill="#8892a4" font-size="10">h₂ (peso)</text>
  <text x="762" y="252" text-anchor="end" fill="#e2e8f0" font-size="11">= 0,40</text>
  <text x="536" y="270" fill="#8892a4" font-size="10">σP₁ (desvio altura)</text>
  <text x="762" y="270" text-anchor="end" fill="#e2e8f0" font-size="11">= 5 cm</text>
  <line x1="524" y1="276" x2="776" y2="276" stroke="#2a2d3a"/>
  <text x="536" y="293" fill="#fcd34d" font-size="11" font-weight="600">CR peso</text>
  <text x="762" y="293" text-anchor="end" fill="#6ee7b7" font-size="13" font-weight="700">= 0,60 kg</text>
  <text x="650" y="325" text-anchor="middle" fill="#8892a4" font-size="10">Ao selecionar para altura, o peso</text>
  <text x="650" y="339" text-anchor="middle" fill="#8892a4" font-size="10">aumenta 0,60 kg por geração.</text>
  <text x="650" y="358" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="600">rA positivo = melhora correlacionada</text>
  <text x="650" y="372" text-anchor="middle" fill="#f9a8d4" font-size="10" font-weight="600">rA negativo = conflito entre caracteres</text>
  <rect x="30" y="400" width="760" height="46" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="418" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Ponto-chave</text>
  <text x="410" y="436" text-anchor="middle" fill="#e2e8f0" font-size="11">rP pode ser positivo e rA negativo — a correlação fenotípica observada pode mascarar conflito genético. Decisões de seleção dependem de rA, não de rP.</text>
  <text x="410" y="460" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Falconer &amp; Mackay (1996)</text>
</svg>
"""


def svg_M12() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M12 — Modelo de Limiar</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Responsabilidade (liability) contínua · fenótipo binário ao cruzar o limiar T</text>
  <rect x="30" y="72" width="360" height="290" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="210" y="95" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">POPULAÇÃO BASE — prevalência baixa</text>
  <path d="M50,320 C60,320 70,318 80,312 C95,302 105,280 115,255 C125,228 132,205 140,192 C145,185 148,182 150,181 C152,182 155,185 160,192 C168,205 175,228 185,255 C195,280 205,302 220,312 C230,318 240,320 250,320 Z"
        fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <line x1="220" y1="120" x2="220" y2="325" stroke="#f9a8d4" stroke-width="2.5" stroke-dasharray="6,3"/>
  <path d="M220,302 C230,298 240,320 250,320 Z" fill="rgba(249,168,212,0.5)"/>
  <text x="235" y="310" fill="#f9a8d4" font-size="10" font-weight="600">~5%</text>
  <text x="220" y="115" text-anchor="middle" fill="#f9a8d4" font-size="11" font-weight="700">T (limiar)</text>
  <text x="140" y="340" text-anchor="middle" fill="#818cf8" font-size="10">responsabilidade</text>
  <text x="280" y="340" fill="#f9a8d4" font-size="10">→ afetados</text>
  <text x="80" y="340" fill="#6ee7b7" font-size="10">não afetados ←</text>
  <line x1="45" y1="325" x2="365" y2="325" stroke="#2a2d3a" stroke-width="1"/>
  <line x1="45" y1="325" x2="45" y2="125" stroke="#2a2d3a" stroke-width="1"/>
  <rect x="420" y="72" width="370" height="290" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="605" y="95" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">FAMÍLIA DE ALTO RISCO — média deslocada</text>
  <path d="M440,320 C450,320 460,318 470,312 C485,302 495,280 505,255 C515,228 522,205 530,192 C535,185 538,182 540,181 C542,182 545,185 550,192 C558,205 565,228 575,255 C585,280 595,302 610,312 C620,318 630,320 640,320 Z"
        fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.5"/>
  <path d="M480,320 C490,320 500,318 510,312 C525,302 535,280 545,255 C555,228 562,205 570,192 C575,185 578,182 580,181 C582,182 585,185 590,192 C598,205 605,228 615,255 C625,280 635,302 650,312 C660,318 670,320 680,320 Z"
        fill="rgba(129,140,248,0.25)" stroke="#6ee7b7" stroke-width="2"/>
  <line x1="610" y1="120" x2="610" y2="325" stroke="#f9a8d4" stroke-width="2.5" stroke-dasharray="6,3"/>
  <path d="M610,255 C620,265 630,290 640,308 C650,316 660,320 680,320 L680,320 L610,320 Z"
        fill="rgba(249,168,212,0.5)"/>
  <text x="650" y="305" fill="#f9a8d4" font-size="10" font-weight="600">~25%</text>
  <text x="610" y="115" text-anchor="middle" fill="#f9a8d4" font-size="11" font-weight="700">T (mesmo limiar)</text>
  <text x="520" y="175" fill="#818cf8" font-size="9" opacity="0.7">μ pop</text>
  <text x="568" y="175" fill="#6ee7b7" font-size="9">μ família</text>
  <line x1="435" y1="325" x2="780" y2="325" stroke="#2a2d3a" stroke-width="1"/>
  <line x1="435" y1="325" x2="435" y2="125" stroke="#2a2d3a" stroke-width="1"/>
  <line x1="540" y1="215" x2="580" y2="215" stroke="#fcd34d" stroke-width="1.5"/>
  <polygon points="580,215 573,211 573,219" fill="#fcd34d"/>
  <text x="560" y="208" text-anchor="middle" fill="#fcd34d" font-size="9">μ mais alto</text>
  <rect x="30" y="385" width="760" height="58" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="403" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Ponto-chave do modelo de limiar</text>
  <text x="410" y="420" text-anchor="middle" fill="#e2e8f0" font-size="11">Mesmo sem observar a responsabilidade, a seleção funciona porque ela tem base genética. Famílias</text>
  <text x="410" y="436" text-anchor="middle" fill="#e2e8f0" font-size="11">de alto risco têm média de responsabilidade acima do limiar — mais animais o cruzam e expressam o caráter.</text>
  <text x="410" y="460" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Falconer &amp; Mackay (1996)</text>
</svg>
"""


def svg_M13() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M13 — Endogamia e Parentesco</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Pedigree de meio-irmãos · F = coeficiente de endogamia · a = coancestria</text>
  <rect x="30" y="72" width="440" height="340" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="250" y="96" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">PEDIGREE — ACASALAMENTO ENTRE MEIO-IRMÃOS</text>
  <text x="45" y="140" fill="#8892a4" font-size="10">Geração 1</text>
  <text x="45" y="240" fill="#8892a4" font-size="10">Geração 2</text>
  <text x="45" y="360" fill="#8892a4" font-size="10">Geração 3</text>
  <rect x="210" y="115" width="50" height="42" rx="6" fill="#064e3b" stroke="#6ee7b7" stroke-width="2"/>
  <text x="235" y="132" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="700">A</text>
  <text x="235" y="147" text-anchor="middle" fill="#a7f3d0" font-size="9">pai comum</text>
  <circle cx="130" cy="230" r="22" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="130" y="235" text-anchor="middle" fill="#818cf8" font-size="13" font-weight="700">B</text>
  <circle cx="340" cy="230" r="22" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="340" y="235" text-anchor="middle" fill="#818cf8" font-size="13" font-weight="700">C</text>
  <line x1="235" y1="157" x2="235" y2="190" stroke="#2a2d3a" stroke-width="1.5"/>
  <line x1="235" y1="190" x2="130" y2="190" stroke="#2a2d3a" stroke-width="1.5"/>
  <line x1="130" y1="190" x2="130" y2="208" stroke="#2a2d3a" stroke-width="1.5"/>
  <line x1="235" y1="157" x2="235" y2="175" stroke="#2a2d3a" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="235" y1="175" x2="340" y2="175" stroke="#2a2d3a" stroke-width="1.5"/>
  <line x1="340" y1="175" x2="340" y2="208" stroke="#2a2d3a" stroke-width="1.5"/>
  <rect x="100" y="268" width="48" height="40" rx="6" fill="#3b0764" stroke="#c4b5fd" stroke-width="1.5"/>
  <text x="124" y="284" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="700">D</text>
  <text x="124" y="298" text-anchor="middle" fill="#a78bfa" font-size="8">filho de A×B</text>
  <circle cx="316" cy="288" r="22" fill="#3b0764" stroke="#c4b5fd" stroke-width="1.5"/>
  <text x="316" y="293" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="700">E</text>
  <text x="316" y="323" text-anchor="middle" fill="#a78bfa" font-size="8">filha de A×C</text>
  <line x1="130" y1="252" x2="130" y2="260" stroke="#818cf8" stroke-width="1.5"/>
  <line x1="130" y1="260" x2="124" y2="268" stroke="#818cf8" stroke-width="1.5"/>
  <line x1="340" y1="252" x2="340" y2="266" stroke="#818cf8" stroke-width="1.5"/>
  <line x1="340" y1="266" x2="316" y2="266" stroke="#818cf8" stroke-width="1.5"/>
  <line x1="148" y1="288" x2="200" y2="340" stroke="#fcd34d" stroke-width="1.5"/>
  <line x1="294" y1="288" x2="245" y2="340" stroke="#fcd34d" stroke-width="1.5"/>
  <rect x="196" y="340" width="52" height="46" rx="8" fill="#7c2d12" stroke="#fcd34d" stroke-width="2.5"/>
  <text x="222" y="360" text-anchor="middle" fill="#fcd34d" font-size="14" font-weight="700">F</text>
  <text x="222" y="376" text-anchor="middle" fill="#fde68a" font-size="9">F = 1/8</text>
  <line x1="250" y1="363" x2="310" y2="363" stroke="#fcd34d" stroke-width="1.5"/>
  <polygon points="310,363 302,359 302,367" fill="#fcd34d"/>
  <text x="315" y="355" fill="#fcd34d" font-size="10" font-weight="600">F = 1/8 = 0,125</text>
  <text x="315" y="370" fill="#fde68a" font-size="9">prob. IBD nas duas cópias</text>
  <text x="315" y="383" fill="#8892a4" font-size="9">via pai comum A</text>
  <rect x="490" y="72" width="300" height="340" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="640" y="96" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">CONCEITOS-CHAVE</text>
  <rect x="504" y="108" width="272" height="70" rx="6" fill="#12141e"/>
  <text x="640" y="126" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="700">Coeficiente de endogamia F</text>
  <text x="514" y="144" fill="#8892a4" font-size="10">Probabilidade de que as duas cópias</text>
  <text x="514" y="158" fill="#8892a4" font-size="10">do locus sejam idênticas por descendência</text>
  <text x="514" y="170" fill="#c4b5fd" font-size="10" font-weight="600">(IBD = Identical By Descent)</text>
  <rect x="504" y="190" width="272" height="70" rx="6" fill="#12141e"/>
  <text x="640" y="208" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">Coancestria (aXY)</text>
  <text x="514" y="226" fill="#8892a4" font-size="10">Prob. de que um alelo de X e um</text>
  <text x="514" y="240" fill="#8892a4" font-size="10">alelo de Y sejam IBD</text>
  <text x="514" y="253" fill="#6ee7b7" font-size="10" font-weight="600">F do filho = coancestria dos pais</text>
  <rect x="504" y="272" width="272" height="80" rx="6" fill="#12141e"/>
  <text x="640" y="290" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="700">Matriz A</text>
  <text x="514" y="308" fill="#8892a4" font-size="10">Aij = 2 × coancestria(i, j) para i ≠ j</text>
  <text x="514" y="323" fill="#8892a4" font-size="10">Aii = 1 + Fi</text>
  <text x="514" y="338" fill="#fcd34d" font-size="10" font-weight="600">Usada no BLUP para</text>
  <text x="514" y="350" fill="#fcd34d" font-size="10" font-weight="600">avaliar animais aparentados</text>
  <rect x="30" y="430" width="760" height="32" rx="6" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="444" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600">Ponto-chave</text>
  <text x="410" y="458" text-anchor="middle" fill="#e2e8f0" font-size="11">Endogamia aumenta homozigose — pode expor recessivos deletérios e reduzir a variabilidade genética disponível para seleção.</text>
</svg>
"""


def svg_M14() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M14 — Cruzamentos, Heterose e Complementaridade</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Heterose = excesso do F1 sobre a média parental · H% = (F1 − MP) / MP × 100</text>
  <rect x="60" y="75" width="560" height="310" rx="8" fill="#1a1d27" stroke="#2a2d3a"/>
  <line x1="60" y1="385" x2="620" y2="385" stroke="#2a2d3a" stroke-width="1"/>
  <line x1="60" y1="318" x2="620" y2="318" stroke="#2a2d3a" stroke-width="0.5" stroke-dasharray="4,4"/>
  <line x1="60" y1="255" x2="620" y2="255" stroke="#2a2d3a" stroke-width="0.5" stroke-dasharray="4,4"/>
  <line x1="60" y1="189" x2="620" y2="189" stroke="#2a2d3a" stroke-width="0.5" stroke-dasharray="4,4"/>
  <line x1="60" y1="124" x2="620" y2="124" stroke="#2a2d3a" stroke-width="0.5" stroke-dasharray="4,4"/>
  <text x="52" y="388" text-anchor="end" fill="#8892a4" font-size="10">0</text>
  <text x="52" y="322" text-anchor="end" fill="#8892a4" font-size="10">26</text>
  <text x="52" y="259" text-anchor="end" fill="#8892a4" font-size="10">50</text>
  <text x="52" y="193" text-anchor="end" fill="#8892a4" font-size="10">75</text>
  <text x="52" y="128" text-anchor="end" fill="#8892a4" font-size="10">100</text>
  <text x="30" y="240" text-anchor="middle" fill="#8892a4" font-size="11" transform="rotate(-90,30,240)">Índice (pontos)</text>
  <rect x="90" y="179" width="90" height="206" rx="4" fill="#059669"/>
  <text x="135" y="280" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">80</text>
  <text x="135" y="400" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="600">Raça P1</text>
  <rect x="210" y="204" width="90" height="181" rx="4" fill="#7c3aed"/>
  <text x="255" y="300" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">70</text>
  <text x="255" y="400" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600">Raça P2</text>
  <line x1="85" y1="191" x2="540" y2="191" stroke="#fcd34d" stroke-width="1.5" stroke-dasharray="8,4"/>
  <text x="548" y="195" fill="#fcd34d" font-size="10" font-weight="600">MP = 75</text>
  <rect x="330" y="191" width="90" height="194" rx="4" fill="none" stroke="#fcd34d" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="375" y="293" text-anchor="middle" fill="#fcd34d" font-size="14" font-weight="700">75</text>
  <text x="375" y="400" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Média parental</text>
  <rect x="450" y="140" width="90" height="245" rx="4" fill="#be185d"/>
  <rect x="450" y="140" width="90" height="51" rx="4" fill="#f9a8d4"/>
  <text x="495" y="270" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">95</text>
  <text x="495" y="400" text-anchor="middle" fill="#f9a8d4" font-size="12" font-weight="600">F1 (cruzamento)</text>
  <line x1="548" y1="140" x2="558" y2="140" stroke="#f9a8d4" stroke-width="1.5"/>
  <line x1="558" y1="140" x2="558" y2="191" stroke="#f9a8d4" stroke-width="1.5"/>
  <line x1="548" y1="191" x2="558" y2="191" stroke="#f9a8d4" stroke-width="1.5"/>
  <text x="562" y="162" fill="#f9a8d4" font-size="11" font-weight="700">H = 20</text>
  <text x="562" y="175" fill="#f9a8d4" font-size="10">H% = 26,7%</text>
  <text x="495" y="165" text-anchor="middle" fill="#fff" font-size="10" font-weight="600">heterose</text>
  <rect x="640" y="75" width="160" height="310" rx="8" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="720" y="98" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600">FÓRMULAS</text>
  <rect x="652" y="110" width="136" height="60" rx="6" fill="#12141e"/>
  <text x="720" y="128" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="monospace">H = F1 − MP</text>
  <text x="720" y="146" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="700" font-family="monospace">= 95 − 75 = 20</text>
  <text x="720" y="162" text-anchor="middle" fill="#8892a4" font-size="10">pontos</text>
  <rect x="652" y="182" width="136" height="60" rx="6" fill="#12141e"/>
  <text x="720" y="200" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="monospace">H% = H/MP×100</text>
  <text x="720" y="218" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="700" font-family="monospace">= 26,7%</text>
  <text x="720" y="234" text-anchor="middle" fill="#8892a4" font-size="10">heterose relativa</text>
  <rect x="652" y="254" width="136" height="50" rx="6" fill="#12141e"/>
  <text x="720" y="270" text-anchor="middle" fill="#e2e8f0" font-size="10">MP = (P1+P2)/2</text>
  <text x="720" y="285" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="700">= (80+70)/2 = 75</text>
  <rect x="30" y="420" width="760" height="46" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="438" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Complementaridade ≠ Heterose</text>
  <text x="410" y="456" text-anchor="middle" fill="#e2e8f0" font-size="11">Heterose: F1 acima da média parental para o mesmo caráter. Complementaridade: raças diferentes contribuem com funções diferentes em sistemas de cruzamento multietapa.</text>
  <text x="410" y="473" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Falconer &amp; Mackay (1996)</text>
</svg>
"""


def svg_M16() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 460" font-family="system-ui,sans-serif">
  <rect width="820" height="460" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M16 — Modelo Linear Misto</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">y = Xb + Zu + e · Separar efeitos fixos de efeitos aleatórios</text>
  <rect x="60" y="88" width="70" height="70" rx="10" fill="#1a1d27" stroke="#818cf8" stroke-width="2"/>
  <text x="95" y="123" text-anchor="middle" fill="#818cf8" font-size="32" font-weight="700">y</text>
  <text x="95" y="145" text-anchor="middle" fill="#8892a4" font-size="10">observações</text>
  <text x="148" y="130" text-anchor="middle" fill="#8892a4" font-size="26">=</text>
  <rect x="170" y="88" width="120" height="70" rx="10" fill="#064e3b" stroke="#6ee7b7" stroke-width="2"/>
  <text x="230" y="123" text-anchor="middle" fill="#6ee7b7" font-size="30" font-weight="700">Xb</text>
  <text x="230" y="145" text-anchor="middle" fill="#a7f3d0" font-size="10">efeitos fixos</text>
  <text x="308" y="130" text-anchor="middle" fill="#8892a4" font-size="26">+</text>
  <rect x="328" y="88" width="120" height="70" rx="10" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
  <text x="388" y="123" text-anchor="middle" fill="#818cf8" font-size="30" font-weight="700">Zu</text>
  <text x="388" y="145" text-anchor="middle" fill="#a5b4fc" font-size="10">efeitos aleatórios</text>
  <text x="466" y="130" text-anchor="middle" fill="#8892a4" font-size="26">+</text>
  <rect x="486" y="88" width="70" height="70" rx="10" fill="#7c2d12" stroke="#fcd34d" stroke-width="2"/>
  <text x="521" y="123" text-anchor="middle" fill="#fcd34d" font-size="32" font-weight="700">e</text>
  <text x="521" y="145" text-anchor="middle" fill="#fde68a" font-size="10">resíduo</text>
  <line x1="95" y1="160" x2="95" y2="196" stroke="#818cf8" stroke-width="1.5"/>
  <rect x="36" y="196" width="118" height="56" rx="6" fill="#12141e" stroke="#818cf8" stroke-width="1"/>
  <text x="95" y="214" text-anchor="middle" fill="#818cf8" font-size="11" font-weight="600">Vetor de fenótipos</text>
  <text x="95" y="229" text-anchor="middle" fill="#8892a4" font-size="10">n × 1 observações</text>
  <text x="95" y="243" text-anchor="middle" fill="#8892a4" font-size="10">ex: alturas das éguas</text>
  <line x1="230" y1="160" x2="230" y2="196" stroke="#6ee7b7" stroke-width="1.5"/>
  <rect x="168" y="196" width="124" height="86" rx="6" fill="#12141e" stroke="#6ee7b7" stroke-width="1"/>
  <text x="230" y="214" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Efeitos fixos</text>
  <text x="230" y="229" text-anchor="middle" fill="#8892a4" font-size="10">X = matriz de incidência</text>
  <text x="230" y="244" text-anchor="middle" fill="#8892a4" font-size="10">b = efeitos estimados</text>
  <text x="230" y="259" text-anchor="middle" fill="#a7f3d0" font-size="10">ex: sexo, ano, criador</text>
  <text x="230" y="273" text-anchor="middle" fill="#a7f3d0" font-size="10">Corrige o fenótipo</text>
  <line x1="388" y1="160" x2="388" y2="196" stroke="#818cf8" stroke-width="1.5"/>
  <rect x="326" y="196" width="124" height="86" rx="6" fill="#12141e" stroke="#818cf8" stroke-width="1"/>
  <text x="388" y="214" text-anchor="middle" fill="#818cf8" font-size="11" font-weight="600">Efeitos aleatórios</text>
  <text x="388" y="229" text-anchor="middle" fill="#8892a4" font-size="10">Z = matriz de incidência</text>
  <text x="388" y="244" text-anchor="middle" fill="#8892a4" font-size="10">u = efeitos do animal</text>
  <text x="388" y="259" text-anchor="middle" fill="#a5b4fc" font-size="10">u ~ N(0, Aσ²a)</text>
  <text x="388" y="273" text-anchor="middle" fill="#a5b4fc" font-size="10">relaciona ao EBV</text>
  <line x1="521" y1="160" x2="521" y2="196" stroke="#fcd34d" stroke-width="1.5"/>
  <rect x="459" y="196" width="124" height="86" rx="6" fill="#12141e" stroke="#fcd34d" stroke-width="1"/>
  <text x="521" y="214" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600">Resíduo</text>
  <text x="521" y="229" text-anchor="middle" fill="#8892a4" font-size="10">variação não explicada</text>
  <text x="521" y="244" text-anchor="middle" fill="#8892a4" font-size="10">por b e u</text>
  <text x="521" y="259" text-anchor="middle" fill="#fde68a" font-size="10">e ~ N(0, Iσ²e)</text>
  <text x="521" y="273" text-anchor="middle" fill="#fde68a" font-size="10">ambiente temporário</text>
  <rect x="620" y="88" width="180" height="280" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="710" y="112" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">EXEMPLO</text>
  <text x="710" y="126" text-anchor="middle" fill="#8892a4" font-size="10">altura à cernelha (cm)</text>
  <rect x="632" y="136" width="156" height="118" rx="6" fill="#12141e"/>
  <text x="632" y="153" fill="#6ee7b7" font-size="10">Efeitos fixos (b):</text>
  <text x="640" y="167" fill="#8892a4" font-size="10">μ geral = 148 cm</text>
  <text x="640" y="181" fill="#8892a4" font-size="10">sexo fêmea = −2 cm</text>
  <text x="640" y="195" fill="#8892a4" font-size="10">ano 2022 = +3 cm</text>
  <text x="632" y="213" fill="#818cf8" font-size="10">Efeito animal (u):</text>
  <text x="640" y="227" fill="#8892a4" font-size="10">égua A = +5 cm</text>
  <text x="640" y="241" fill="#8892a4" font-size="10">égua B = −3 cm</text>
  <text x="632" y="258" fill="#fcd34d" font-size="10">Resíduo (e):</text>
  <text x="640" y="272" fill="#8892a4" font-size="10">égua A = −1 cm</text>
  <rect x="632" y="280" width="156" height="50" rx="6" fill="#064e3b" stroke="#6ee7b7"/>
  <text x="710" y="298" text-anchor="middle" fill="#a7f3d0" font-size="10">P = 148−2+3+5−1</text>
  <text x="710" y="314" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">= 153 cm</text>
  <rect x="30" y="310" width="570" height="46" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="315" y="328" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Ponto-chave</text>
  <text x="315" y="346" text-anchor="middle" fill="#e2e8f0" font-size="11">O modelo linear isola o sinal genético (u) do ruído ambiental (Xb + e). Sem essa separação, animais em ambientes melhores parecem geneticamente superiores.</text>
  <text x="410" y="378" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Falconer &amp; Mackay (1996) · Henderson (1973)</text>
</svg>
"""


def svg_M17() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 460" font-family="system-ui,sans-serif">
  <rect width="820" height="460" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M17 — BLUP e Modelo Animal</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Best Linear Unbiased Prediction · combina fenótipo + pedigree em EBV</text>
  <rect x="30" y="88" width="155" height="76" rx="10" fill="#064e3b" stroke="#6ee7b7" stroke-width="1.5"/>
  <text x="108" y="113" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">Dados fenotípicos</text>
  <text x="108" y="129" text-anchor="middle" fill="#a7f3d0" font-size="10">y = medidas dos animais</text>
  <text x="108" y="143" text-anchor="middle" fill="#a7f3d0" font-size="10">e efeitos de ambiente</text>
  <rect x="30" y="200" width="155" height="76" rx="10" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="108" y="225" text-anchor="middle" fill="#818cf8" font-size="12" font-weight="700">Pedigree → Matriz A</text>
  <text x="108" y="241" text-anchor="middle" fill="#a5b4fc" font-size="10">parentesco entre animais</text>
  <text x="108" y="255" text-anchor="middle" fill="#a5b4fc" font-size="10">coancestria e endogamia</text>
  <text x="108" y="269" text-anchor="middle" fill="#8892a4" font-size="9">Aij = 2 × f(i,j)</text>
  <line x1="185" y1="126" x2="265" y2="178" stroke="#6ee7b7" stroke-width="1.5"/>
  <line x1="185" y1="238" x2="265" y2="192" stroke="#818cf8" stroke-width="1.5"/>
  <polygon points="265,180 257,172 267,170" fill="#6ee7b7"/>
  <polygon points="265,190 257,196 267,200" fill="#818cf8"/>
  <rect x="268" y="148" width="165" height="90" rx="10" fill="#3b0764" stroke="#c4b5fd" stroke-width="2"/>
  <text x="350" y="173" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="700">Equações de Modelo</text>
  <text x="350" y="188" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="700">Misto (MME)</text>
  <text x="350" y="206" text-anchor="middle" fill="#a78bfa" font-size="10">X'X  X'Z   b    X'y</text>
  <text x="350" y="220" text-anchor="middle" fill="#a78bfa" font-size="10">Z'X  Z'Z+λA⁻¹ u = Z'y</text>
  <text x="350" y="232" text-anchor="middle" fill="#8892a4" font-size="9">λ = σ²e / σ²a = (1−h²)/h²</text>
  <line x1="433" y1="193" x2="488" y2="193" stroke="#c4b5fd" stroke-width="2"/>
  <polygon points="488,193 480,188 480,198" fill="#c4b5fd"/>
  <rect x="490" y="148" width="140" height="90" rx="10" fill="#064e3b" stroke="#6ee7b7" stroke-width="2"/>
  <text x="560" y="172" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">Solução BLUP</text>
  <text x="560" y="190" text-anchor="middle" fill="#a7f3d0" font-size="10">b̂ = efeitos fixos ajustados</text>
  <text x="560" y="205" text-anchor="middle" fill="#a7f3d0" font-size="10">û = EBV dos animais</text>
  <text x="560" y="220" text-anchor="middle" fill="#8892a4" font-size="9">Best = mínima variância</text>
  <line x1="630" y1="193" x2="683" y2="193" stroke="#6ee7b7" stroke-width="2"/>
  <polygon points="683,193 675,188 675,198" fill="#6ee7b7"/>
  <rect x="685" y="148" width="115" height="90" rx="10" fill="#7c2d12" stroke="#fcd34d" stroke-width="2"/>
  <text x="742" y="172" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="700">Ranking</text>
  <text x="742" y="189" text-anchor="middle" fill="#fde68a" font-size="10">DEP = EBV / 2</text>
  <text x="742" y="205" text-anchor="middle" fill="#fde68a" font-size="10">Acurácia</text>
  <text x="742" y="220" text-anchor="middle" fill="#fde68a" font-size="10">Seleção dos melhores</text>
  <rect x="30" y="310" width="370" height="110" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="215" y="333" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">BLUP vs. Ranking por fenótipo</text>
  <line x1="30" y1="344" x2="400" y2="344" stroke="#2a2d3a" stroke-width="1"/>
  <text x="130" y="360" text-anchor="middle" fill="#8892a4" font-size="10" font-weight="600">Sem BLUP</text>
  <text x="300" y="360" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="600">Com BLUP</text>
  <line x1="215" y1="344" x2="215" y2="420" stroke="#2a2d3a" stroke-width="1"/>
  <text x="130" y="376" text-anchor="middle" fill="#8892a4" font-size="10">Confunde G e E</text>
  <text x="300" y="376" text-anchor="middle" fill="#a7f3d0" font-size="10">Separa G de E</text>
  <text x="130" y="392" text-anchor="middle" fill="#8892a4" font-size="10">Ignora parentesco</text>
  <text x="300" y="392" text-anchor="middle" fill="#a7f3d0" font-size="10">Usa matriz A</text>
  <text x="130" y="408" text-anchor="middle" fill="#8892a4" font-size="10">Viés por grupos</text>
  <text x="300" y="408" text-anchor="middle" fill="#a7f3d0" font-size="10">Comparação justa</text>
  <rect x="420" y="310" width="370" height="110" rx="10" fill="#12141e" stroke="#2a2d3a"/>
  <text x="605" y="333" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Ponto-chave: λ = (1−h²)/h²</text>
  <text x="605" y="353" text-anchor="middle" fill="#8892a4" font-size="10">λ define o peso dado ao pedigree em relação ao fenótipo.</text>
  <text x="605" y="368" text-anchor="middle" fill="#8892a4" font-size="10">h² baixo → λ alto → mais peso ao pedigree (família importa mais).</text>
  <text x="605" y="383" text-anchor="middle" fill="#8892a4" font-size="10">h² alto → λ baixo → mais peso ao próprio fenótipo do animal.</text>
  <text x="605" y="403" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="600">Ex: h²=0,30 → λ = 0,70/0,30 = 2,33</text>
  <text x="410" y="440" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Henderson (1973) · Falconer &amp; Mackay (1996) · Eler (2017)</text>
</svg>
"""


def svg_M18() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 460" font-family="system-ui,sans-serif">
  <rect width="820" height="460" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M18 — Genômica e Marcadores SNP</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Codificação de genótipos em valores 0/1/2 · Matriz Z de animais × marcadores</text>
  <rect x="30" y="75" width="360" height="290" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="210" y="100" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600" letter-spacing="1">CODIFICAÇÃO DO GENÓTIPO</text>
  <text x="210" y="115" text-anchor="middle" fill="#8892a4" font-size="10">contagem do alelo alternativo (ou de referência, por convenção)</text>
  <rect x="45" y="124" width="330" height="30" rx="4" fill="#12141e"/>
  <text x="120" y="144" text-anchor="middle" fill="#8892a4" font-size="11" font-weight="600">Genótipo</text>
  <text x="230" y="144" text-anchor="middle" fill="#8892a4" font-size="11" font-weight="600">Código</text>
  <text x="330" y="144" text-anchor="middle" fill="#8892a4" font-size="11" font-weight="600">Descrição</text>
  <rect x="45" y="155" width="330" height="45" rx="4" fill="#064e3b"/>
  <text x="120" y="183" text-anchor="middle" fill="#6ee7b7" font-size="22" font-weight="700" font-family="monospace">AA</text>
  <text x="230" y="183" text-anchor="middle" fill="#6ee7b7" font-size="28" font-weight="700" font-family="monospace">0</text>
  <text x="330" y="178" text-anchor="middle" fill="#a7f3d0" font-size="10">homozigoto de</text>
  <text x="330" y="191" text-anchor="middle" fill="#a7f3d0" font-size="10">referência</text>
  <rect x="45" y="202" width="330" height="45" rx="4" fill="rgba(124,58,237,0.2)"/>
  <text x="120" y="230" text-anchor="middle" fill="#c4b5fd" font-size="22" font-weight="700" font-family="monospace">Aa</text>
  <text x="230" y="230" text-anchor="middle" fill="#c4b5fd" font-size="28" font-weight="700" font-family="monospace">1</text>
  <text x="330" y="225" text-anchor="middle" fill="#c4b5fd" font-size="10">heterozigoto</text>
  <text x="330" y="238" text-anchor="middle" fill="#c4b5fd" font-size="10">1 cópia alt.</text>
  <rect x="45" y="249" width="330" height="45" rx="4" fill="#831843"/>
  <text x="120" y="277" text-anchor="middle" fill="#f9a8d4" font-size="22" font-weight="700" font-family="monospace">aa</text>
  <text x="230" y="277" text-anchor="middle" fill="#f9a8d4" font-size="28" font-weight="700" font-family="monospace">2</text>
  <text x="330" y="272" text-anchor="middle" fill="#fbcfe8" font-size="10">homozigoto</text>
  <text x="330" y="285" text-anchor="middle" fill="#fbcfe8" font-size="10">alternativo</text>
  <rect x="45" y="306" width="330" height="46" rx="6" fill="#12141e" stroke="#2a2d3a"/>
  <text x="210" y="322" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600">Frequência do alelo alt. em um SNP</text>
  <text x="210" y="338" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="monospace">p = (2·n_aa + n_Aa) / (2N)</text>
  <text x="210" y="352" text-anchor="middle" fill="#8892a4" font-size="10">MAF = min(p, 1−p)</text>
  <rect x="410" y="75" width="390" height="290" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="605" y="100" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600" letter-spacing="1">MATRIZ Z — ANIMAIS × MARCADORES</text>
  <text x="605" y="115" text-anchor="middle" fill="#8892a4" font-size="10">cada linha = animal; cada coluna = SNP</text>
  <text x="520" y="140" text-anchor="middle" fill="#8892a4" font-size="10">SNP1</text>
  <text x="565" y="140" text-anchor="middle" fill="#8892a4" font-size="10">SNP2</text>
  <text x="610" y="140" text-anchor="middle" fill="#8892a4" font-size="10">SNP3</text>
  <text x="655" y="140" text-anchor="middle" fill="#8892a4" font-size="10">SNP4</text>
  <text x="700" y="140" text-anchor="middle" fill="#8892a4" font-size="10">SNP5</text>
  <text x="455" y="165" text-anchor="end" fill="#8892a4" font-size="10">Égua 1</text>
  <rect x="497" y="148" width="40" height="25" rx="3" fill="#064e3b"/>
  <text x="520" y="165" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="700">0</text>
  <rect x="542" y="148" width="40" height="25" rx="3" fill="rgba(124,58,237,.2)"/>
  <text x="565" y="165" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="700">1</text>
  <rect x="587" y="148" width="40" height="25" rx="3" fill="#831843"/>
  <text x="610" y="165" text-anchor="middle" fill="#f9a8d4" font-size="14" font-weight="700">2</text>
  <rect x="632" y="148" width="40" height="25" rx="3" fill="#064e3b"/>
  <text x="655" y="165" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="700">0</text>
  <rect x="677" y="148" width="40" height="25" rx="3" fill="rgba(124,58,237,.2)"/>
  <text x="700" y="165" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="700">1</text>
  <text x="455" y="208" text-anchor="end" fill="#8892a4" font-size="10">Égua 2</text>
  <rect x="497" y="191" width="40" height="25" rx="3" fill="rgba(124,58,237,.2)"/>
  <text x="520" y="208" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="700">1</text>
  <rect x="542" y="191" width="40" height="25" rx="3" fill="#064e3b"/>
  <text x="565" y="208" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="700">0</text>
  <rect x="587" y="191" width="40" height="25" rx="3" fill="rgba(124,58,237,.2)"/>
  <text x="610" y="208" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="700">1</text>
  <rect x="632" y="191" width="40" height="25" rx="3" fill="#831843"/>
  <text x="655" y="208" text-anchor="middle" fill="#f9a8d4" font-size="14" font-weight="700">2</text>
  <rect x="677" y="191" width="40" height="25" rx="3" fill="#064e3b"/>
  <text x="700" y="208" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="700">0</text>
  <text x="455" y="251" text-anchor="end" fill="#8892a4" font-size="10">Égua 3</text>
  <rect x="497" y="234" width="40" height="25" rx="3" fill="#831843"/>
  <text x="520" y="251" text-anchor="middle" fill="#f9a8d4" font-size="14" font-weight="700">2</text>
  <rect x="542" y="234" width="40" height="25" rx="3" fill="rgba(124,58,237,.2)"/>
  <text x="565" y="251" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="700">1</text>
  <rect x="587" y="234" width="40" height="25" rx="3" fill="#064e3b"/>
  <text x="610" y="251" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="700">0</text>
  <rect x="632" y="234" width="40" height="25" rx="3" fill="rgba(124,58,237,.2)"/>
  <text x="655" y="251" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="700">1</text>
  <rect x="677" y="234" width="40" height="25" rx="3" fill="#831843"/>
  <text x="700" y="251" text-anchor="middle" fill="#f9a8d4" font-size="14" font-weight="700">2</text>
  <text x="605" y="300" text-anchor="middle" fill="#8892a4" font-size="10">n animais × p SNPs (ex: 500 × 50.000)</text>
  <text x="605" y="316" text-anchor="middle" fill="#8892a4" font-size="10">G = ZZ' / 2Σp(1−p) — matriz genômica</text>
  <text x="605" y="332" text-anchor="middle" fill="#818cf8" font-size="10" font-weight="600">G substitui A no G-BLUP</text>
  <rect x="30" y="383" width="760" height="46" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="401" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Ponto-chave</text>
  <text x="410" y="419" text-anchor="middle" fill="#e2e8f0" font-size="11">A codificação 0/1/2 transforma genótipo em número, permitindo álgebra linear. A matriz Z é a ponte entre genômica e modelos mistos.</text>
  <text x="410" y="444" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · VanRaden (2008)</text>
</svg>
"""


def svg_M19() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M19 — Controle de Qualidade Genômico</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Pipeline de filtros: dados brutos → dados limpos prontos para análise</text>
  <rect x="295" y="75" width="230" height="52" rx="10" fill="#1a1d27" stroke="#818cf8" stroke-width="2"/>
  <text x="410" y="97" text-anchor="middle" fill="#818cf8" font-size="13" font-weight="700">Dados brutos (chip SNP)</text>
  <text x="410" y="114" text-anchor="middle" fill="#8892a4" font-size="10">n animais × p marcadores · com erros e falhas</text>
  <line x1="410" y1="127" x2="410" y2="147" stroke="#2a2d3a" stroke-width="2"/>
  <polygon points="410,148 405,140 415,140" fill="#2a2d3a"/>
  <rect x="245" y="148" width="330" height="58" rx="8" fill="#064e3b" stroke="#6ee7b7" stroke-width="1.5"/>
  <text x="410" y="170" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">Filtro 1 — Call rate de animais</text>
  <text x="410" y="184" text-anchor="middle" fill="#a7f3d0" font-size="10">Remover animais com &gt; 10–20% de genótipos ausentes</text>
  <text x="410" y="197" text-anchor="middle" fill="#8892a4" font-size="9">threshold usual: call rate &lt; 0,90 → excluir animal</text>
  <line x1="245" y1="175" x2="195" y2="175" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="105" y="160" width="88" height="28" rx="6" fill="#7f1d1d" stroke="#f87171" stroke-width="1"/>
  <text x="149" y="177" text-anchor="middle" fill="#f87171" font-size="10">animais excluídos</text>
  <line x1="410" y1="206" x2="410" y2="224" stroke="#2a2d3a" stroke-width="2"/>
  <polygon points="410,225 405,217 415,217" fill="#2a2d3a"/>
  <rect x="245" y="225" width="330" height="58" rx="8" fill="#064e3b" stroke="#6ee7b7" stroke-width="1.5"/>
  <text x="410" y="247" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">Filtro 2 — Call rate de marcadores</text>
  <text x="410" y="261" text-anchor="middle" fill="#a7f3d0" font-size="10">Remover SNPs com alta taxa de genótipos ausentes</text>
  <text x="410" y="274" text-anchor="middle" fill="#8892a4" font-size="9">threshold usual: call rate &lt; 0,95 → excluir SNP</text>
  <line x1="245" y1="252" x2="195" y2="252" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="105" y="238" width="88" height="28" rx="6" fill="#7f1d1d" stroke="#f87171" stroke-width="1"/>
  <text x="149" y="255" text-anchor="middle" fill="#f87171" font-size="10">SNPs excluídos</text>
  <line x1="410" y1="283" x2="410" y2="301" stroke="#2a2d3a" stroke-width="2"/>
  <polygon points="410,302 405,294 415,294" fill="#2a2d3a"/>
  <rect x="245" y="302" width="330" height="58" rx="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="410" y="324" text-anchor="middle" fill="#818cf8" font-size="12" font-weight="700">Filtro 3 — MAF (Minor Allele Frequency)</text>
  <text x="410" y="338" text-anchor="middle" fill="#a5b4fc" font-size="10">Remover SNPs monomórficos ou quase-monomórficos</text>
  <text x="410" y="351" text-anchor="middle" fill="#8892a4" font-size="9">threshold usual: MAF &lt; 0,01 a 0,05 → excluir SNP</text>
  <line x1="245" y1="329" x2="195" y2="329" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="105" y="315" width="88" height="28" rx="6" fill="#7f1d1d" stroke="#f87171" stroke-width="1"/>
  <text x="149" y="332" text-anchor="middle" fill="#f87171" font-size="10">SNPs raros excluídos</text>
  <line x1="410" y1="360" x2="410" y2="378" stroke="#2a2d3a" stroke-width="2"/>
  <polygon points="410,379 405,371 415,371" fill="#2a2d3a"/>
  <rect x="245" y="379" width="330" height="50" rx="8" fill="#3b0764" stroke="#c4b5fd" stroke-width="1.5"/>
  <text x="410" y="399" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="700">Filtro 4 — Equilíbrio Hardy-Weinberg (HWE)</text>
  <text x="410" y="413" text-anchor="middle" fill="#a78bfa" font-size="10">Detectar erros de genotipagem por desvio extremo do HWE</text>
  <text x="410" y="425" text-anchor="middle" fill="#8892a4" font-size="9">p-valor HWE &lt; 10⁻⁶ (pop. estruturada) → inspecionar / excluir</text>
  <line x1="245" y1="404" x2="195" y2="404" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="105" y="390" width="88" height="28" rx="6" fill="#7f1d1d" stroke="#f87171" stroke-width="1"/>
  <text x="149" y="407" text-anchor="middle" fill="#f87171" font-size="10">SNPs com erro</text>
  <line x1="410" y1="429" x2="410" y2="447" stroke="#6ee7b7" stroke-width="2"/>
  <polygon points="410,448 405,440 415,440" fill="#6ee7b7"/>
  <rect x="295" y="448" width="230" height="26" rx="8" fill="#059669" stroke="#6ee7b7" stroke-width="2"/>
  <text x="410" y="465" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">Dados limpos → análise</text>
  <rect x="595" y="148" width="200" height="281" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="695" y="172" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600">THRESHOLDS TÍPICOS</text>
  <line x1="595" y1="180" x2="795" y2="180" stroke="#2a2d3a"/>
  <text x="605" y="198" fill="#8892a4" font-size="10" font-weight="600">Animais</text>
  <text x="605" y="213" fill="#6ee7b7" font-size="10">Call rate ≥ 0,90</text>
  <text x="605" y="253" fill="#8892a4" font-size="10" font-weight="600">Marcadores</text>
  <text x="605" y="268" fill="#6ee7b7" font-size="10">Call rate ≥ 0,95</text>
  <text x="605" y="283" fill="#818cf8" font-size="10">MAF ≥ 0,01–0,05</text>
  <text x="605" y="298" fill="#c4b5fd" font-size="10">HWE p &gt; 10⁻⁶</text>
  <text x="605" y="327" fill="#8892a4" font-size="10" font-weight="600">Resultado típico</text>
  <text x="605" y="342" fill="#a7f3d0" font-size="10">80–95% dos SNPs</text>
  <text x="605" y="357" fill="#a7f3d0" font-size="10">passam pelos filtros</text>
  <text x="605" y="376" fill="#fcd34d" font-size="10" font-weight="600">Ordem importa:</text>
  <text x="605" y="391" fill="#8892a4" font-size="10">filtrar animais primeiro,</text>
  <text x="605" y="406" fill="#8892a4" font-size="10">depois marcadores</text>
</svg>
"""


def svg_M20() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 480" font-family="system-ui,sans-serif">
  <rect width="820" height="480" fill="#0f1117"/>
  <text x="410" y="38" text-anchor="middle" fill="#818cf8" font-size="18" font-weight="700">M20 — GWAS e Predição Genômica</text>
  <text x="410" y="58" text-anchor="middle" fill="#8892a4" font-size="12">Manhattan plot · Associação SNP-fenótipo · GBLUP = BLUP com G no lugar de A</text>
  <rect x="30" y="72" width="480" height="260" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="270" y="96" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">GWAS — MANHATTAN PLOT (conceitual)</text>
  <line x1="60" y1="112" x2="60" y2="308" stroke="#2a2d3a" stroke-width="1"/>
  <text x="52" y="116" text-anchor="end" fill="#8892a4" font-size="9">10</text>
  <text x="52" y="196" text-anchor="end" fill="#8892a4" font-size="9">6</text>
  <text x="52" y="308" text-anchor="end" fill="#8892a4" font-size="9">0</text>
  <text x="38" y="220" text-anchor="middle" fill="#8892a4" font-size="9" transform="rotate(-90,38,220)">−log₁₀(p)</text>
  <line x1="60" y1="308" x2="490" y2="308" stroke="#2a2d3a" stroke-width="1"/>
  <line x1="60" y1="148" x2="490" y2="148" stroke="#f87171" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="493" y="152" fill="#f87171" font-size="9">p=5×10⁻⁸</text>
  <line x1="60" y1="188" x2="490" y2="188" stroke="#fcd34d" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="493" y="192" fill="#fcd34d" font-size="9">p=10⁻⁵</text>
  <g fill="#059669" opacity="0.7">
    <circle cx="68" cy="300" r="2.5"/><circle cx="72" cy="296" r="2.5"/><circle cx="76" cy="302" r="2.5"/>
    <circle cx="80" cy="294" r="2.5"/><circle cx="85" cy="298" r="2.5"/><circle cx="90" cy="290" r="2.5"/>
    <circle cx="95" cy="285" r="2.5"/><circle cx="100" cy="292" r="2.5"/><circle cx="105" cy="278" r="2.5"/>
    <circle cx="110" cy="295" r="2.5"/><circle cx="115" cy="302" r="2.5"/><circle cx="120" cy="296" r="2.5"/>
    <circle cx="125" cy="288" r="2.5"/><circle cx="128" cy="300" r="2.5"/>
  </g>
  <circle cx="105" cy="140" r="4" fill="#6ee7b7"/>
  <line x1="105" y1="278" x2="105" y2="144" stroke="#6ee7b7" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
  <g fill="#7c3aed" opacity="0.7">
    <circle cx="138" cy="299" r="2.5"/><circle cx="143" cy="293" r="2.5"/><circle cx="148" cy="305" r="2.5"/>
    <circle cx="153" cy="291" r="2.5"/><circle cx="158" cy="296" r="2.5"/><circle cx="163" cy="302" r="2.5"/>
    <circle cx="168" cy="287" r="2.5"/><circle cx="173" cy="294" r="2.5"/><circle cx="178" cy="299" r="2.5"/>
    <circle cx="183" cy="285" r="2.5"/><circle cx="188" cy="292" r="2.5"/>
  </g>
  <g fill="#0891b2" opacity="0.7">
    <circle cx="203" cy="298" r="2.5"/><circle cx="208" cy="293" r="2.5"/><circle cx="213" cy="302" r="2.5"/>
    <circle cx="218" cy="288" r="2.5"/><circle cx="223" cy="295" r="2.5"/><circle cx="228" cy="301" r="2.5"/>
    <circle cx="233" cy="284" r="2.5"/><circle cx="238" cy="290" r="2.5"/><circle cx="243" cy="296" r="2.5"/>
    <circle cx="248" cy="278" r="2.5"/>
  </g>
  <circle cx="248" cy="131" r="4" fill="#22d3ee"/>
  <line x1="248" y1="278" x2="248" y2="135" stroke="#22d3ee" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
  <g fill="#059669" opacity="0.7">
    <circle cx="263" cy="301" r="2.5"/><circle cx="268" cy="295" r="2.5"/><circle cx="273" cy="298" r="2.5"/>
    <circle cx="278" cy="290" r="2.5"/><circle cx="283" cy="304" r="2.5"/><circle cx="288" cy="293" r="2.5"/>
    <circle cx="293" cy="286" r="2.5"/><circle cx="298" cy="299" r="2.5"/><circle cx="303" cy="292" r="2.5"/>
  </g>
  <g fill="#7c3aed" opacity="0.7">
    <circle cx="318" cy="300" r="2.5"/><circle cx="323" cy="293" r="2.5"/><circle cx="328" cy="297" r="2.5"/>
    <circle cx="333" cy="288" r="2.5"/><circle cx="338" cy="302" r="2.5"/><circle cx="343" cy="295" r="2.5"/>
    <circle cx="348" cy="291" r="2.5"/><circle cx="353" cy="304" r="2.5"/><circle cx="358" cy="298" r="2.5"/>
    <circle cx="363" cy="285" r="2.5"/>
  </g>
  <g fill="#0891b2" opacity="0.7">
    <circle cx="373" cy="299" r="2.5"/><circle cx="378" cy="292" r="2.5"/><circle cx="383" cy="286" r="2.5"/>
    <circle cx="388" cy="300" r="2.5"/><circle cx="393" cy="294" r="2.5"/><circle cx="398" cy="302" r="2.5"/>
    <circle cx="403" cy="288" r="2.5"/><circle cx="408" cy="296" r="2.5"/>
  </g>
  <g fill="#059669" opacity="0.7">
    <circle cx="423" cy="300" r="2.5"/><circle cx="428" cy="294" r="2.5"/><circle cx="433" cy="287" r="2.5"/>
    <circle cx="438" cy="299" r="2.5"/><circle cx="443" cy="292" r="2.5"/><circle cx="448" cy="305" r="2.5"/>
    <circle cx="453" cy="296" r="2.5"/><circle cx="458" cy="289" r="2.5"/><circle cx="463" cy="303" r="2.5"/>
    <circle cx="468" cy="282" r="2.5"/><circle cx="473" cy="297" r="2.5"/>
  </g>
  <text x="97"  y="320" text-anchor="middle" fill="#8892a4" font-size="8">1</text>
  <text x="163" y="320" text-anchor="middle" fill="#8892a4" font-size="8">2</text>
  <text x="225" y="320" text-anchor="middle" fill="#8892a4" font-size="8">3</text>
  <text x="283" y="320" text-anchor="middle" fill="#8892a4" font-size="8">4</text>
  <text x="340" y="320" text-anchor="middle" fill="#8892a4" font-size="8">5</text>
  <text x="390" y="320" text-anchor="middle" fill="#8892a4" font-size="8">6</text>
  <text x="450" y="320" text-anchor="middle" fill="#8892a4" font-size="8">7 …</text>
  <text x="270" y="332" text-anchor="middle" fill="#8892a4" font-size="9">Posição cromossômica (bp)</text>
  <text x="105" y="133" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="600">QTL</text>
  <text x="248" y="124" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="600">QTL</text>
  <rect x="530" y="72" width="260" height="260" rx="10" fill="#1a1d27" stroke="#2a2d3a"/>
  <text x="660" y="96" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">BLUP vs. GBLUP</text>
  <rect x="544" y="110" width="230" height="80" rx="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="659" y="132" text-anchor="middle" fill="#818cf8" font-size="12" font-weight="700">BLUP</text>
  <text x="659" y="150" text-anchor="middle" fill="#a5b4fc" font-size="10">Matriz A (pedigree)</text>
  <text x="659" y="165" text-anchor="middle" fill="#8892a4" font-size="10">parentesco esperado</text>
  <text x="659" y="180" text-anchor="middle" fill="#8892a4" font-size="10">baseado em genealogia</text>
  <text x="659" y="208" text-anchor="middle" fill="#fcd34d" font-size="18">↓</text>
  <text x="659" y="220" text-anchor="middle" fill="#8892a4" font-size="10">trocar A por G</text>
  <rect x="544" y="228" width="230" height="80" rx="8" fill="#064e3b" stroke="#6ee7b7" stroke-width="1.5"/>
  <text x="659" y="250" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">G-BLUP</text>
  <text x="659" y="268" text-anchor="middle" fill="#a7f3d0" font-size="10">Matriz G (genômica)</text>
  <text x="659" y="283" text-anchor="middle" fill="#8892a4" font-size="10">parentesco realizado</text>
  <text x="659" y="298" text-anchor="middle" fill="#8892a4" font-size="10">baseado em 50k+ SNPs</text>
  <rect x="30" y="352" width="760" height="98" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="372" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Dois usos da genômica: descoberta vs. predição</text>
  <text x="410" y="392" text-anchor="middle" fill="#e2e8f0" font-size="11">GWAS busca SNPs associados a caracteres para entender a arquitetura genética e identificar QTLs.</text>
  <text x="410" y="410" text-anchor="middle" fill="#e2e8f0" font-size="11">G-BLUP usa todos os SNPs juntos para predição — não precisa identificar QTLs individuais.</text>
  <text x="410" y="428" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Vantagem do G-BLUP: encurta o intervalo de geração ao genotipar animais jovens antes da primeira medida.</text>
  <text x="410" y="446" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · VanRaden (2008) · Meuwissen et al. (2001)</text>
</svg>
"""


def svg_M21() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 500" font-family="system-ui,sans-serif">
  <rect width="820" height="500" fill="#0f1117"/>
  <text x="410" y="36" text-anchor="middle" fill="#818cf8" font-size="17" font-weight="700">M21 — Pipeline Completo de Seleção Genômica</text>
  <text x="410" y="54" text-anchor="middle" fill="#8892a4" font-size="11">Da genotipagem à decisão de acasalamento — cada etapa conecta a um módulo do curso</text>
  <rect x="28"  y="80" width="118" height="70" rx="8" fill="#064e3b" stroke="#6ee7b7" stroke-width="1.5"/>
  <text x="87"  y="102" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="700">1. Coleta de dados</text>
  <text x="87"  y="117" text-anchor="middle" fill="#a7f3d0" font-size="9">fenótipos + pedigree</text>
  <text x="87"  y="130" text-anchor="middle" fill="#a7f3d0" font-size="9">+ chip SNP</text>
  <text x="87"  y="143" text-anchor="middle" fill="#3d4252" font-size="8">→ M1, M18</text>
  <line x1="146" y1="115" x2="162" y2="115" stroke="#2a2d3a" stroke-width="1.5"/>
  <polygon points="162,115 155,111 155,119" fill="#2a2d3a"/>
  <rect x="163" y="80" width="118" height="70" rx="8" fill="#064e3b" stroke="#6ee7b7" stroke-width="1.5"/>
  <text x="222" y="102" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="700">2. Validação</text>
  <text x="222" y="117" text-anchor="middle" fill="#a7f3d0" font-size="9">consistência pedigree</text>
  <text x="222" y="130" text-anchor="middle" fill="#a7f3d0" font-size="9">outliers fenotípicos</text>
  <text x="222" y="143" text-anchor="middle" fill="#3d4252" font-size="8">→ M6, M16</text>
  <line x1="281" y1="115" x2="297" y2="115" stroke="#2a2d3a" stroke-width="1.5"/>
  <polygon points="297,115 290,111 290,119" fill="#2a2d3a"/>
  <rect x="298" y="80" width="118" height="70" rx="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
  <text x="357" y="102" text-anchor="middle" fill="#818cf8" font-size="11" font-weight="700">3. QC Genômico</text>
  <text x="357" y="117" text-anchor="middle" fill="#a5b4fc" font-size="9">call rate · MAF</text>
  <text x="357" y="130" text-anchor="middle" fill="#a5b4fc" font-size="9">HWE · parentesco</text>
  <text x="357" y="143" text-anchor="middle" fill="#3d4252" font-size="8">→ M19</text>
  <line x1="416" y1="115" x2="432" y2="115" stroke="#2a2d3a" stroke-width="1.5"/>
  <polygon points="432,115 425,111 425,119" fill="#2a2d3a"/>
  <rect x="433" y="80" width="118" height="70" rx="8" fill="#3b0764" stroke="#c4b5fd" stroke-width="1.5"/>
  <text x="492" y="102" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="700">4. Modelo linear</text>
  <text x="492" y="117" text-anchor="middle" fill="#a78bfa" font-size="9">ajuste efeitos fixos</text>
  <text x="492" y="130" text-anchor="middle" fill="#a78bfa" font-size="9">Xb: sexo · ano · criador</text>
  <text x="492" y="143" text-anchor="middle" fill="#3d4252" font-size="8">→ M16</text>
  <line x1="551" y1="115" x2="567" y2="115" stroke="#2a2d3a" stroke-width="1.5"/>
  <polygon points="567,115 560,111 560,119" fill="#2a2d3a"/>
  <rect x="568" y="80" width="118" height="70" rx="8" fill="#064e3b" stroke="#fcd34d" stroke-width="1.5"/>
  <text x="627" y="102" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="700">5. G-BLUP / BLUP</text>
  <text x="627" y="117" text-anchor="middle" fill="#fde68a" font-size="9">EBV / GEBV</text>
  <text x="627" y="130" text-anchor="middle" fill="#fde68a" font-size="9">matriz G ou A</text>
  <text x="627" y="143" text-anchor="middle" fill="#3d4252" font-size="8">→ M17, M20</text>
  <line x1="686" y1="115" x2="702" y2="115" stroke="#2a2d3a" stroke-width="1.5"/>
  <polygon points="702,115 695,111 695,119" fill="#2a2d3a"/>
  <rect x="703" y="80" width="94" height="70" rx="8" fill="#7c2d12" stroke="#fcd34d" stroke-width="2"/>
  <text x="750" y="102" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="700">6. Índice</text>
  <text x="750" y="117" text-anchor="middle" fill="#fde68a" font-size="9">DEP + acurácia</text>
  <text x="750" y="130" text-anchor="middle" fill="#fde68a" font-size="9">penalidade F</text>
  <text x="750" y="143" text-anchor="middle" fill="#3d4252" font-size="8">→ M15, M13</text>
  <rect x="28" y="186" width="253" height="58" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="155" y="208" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="600">Contexto populacional</text>
  <text x="155" y="222" text-anchor="middle" fill="#8892a4" font-size="9">frequências alélicas (M3, M4) · forças evolutivas (M5)</text>
  <text x="155" y="236" text-anchor="middle" fill="#8892a4" font-size="9">endogamia e Ne (M13) · modos de cruzamento (M14)</text>
  <rect x="298" y="186" width="253" height="58" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="424" y="208" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="600">Base quantitativa</text>
  <text x="424" y="222" text-anchor="middle" fill="#8892a4" font-size="9">P=G+E (M6) · componentes de variância (M8)</text>
  <text x="424" y="236" text-anchor="middle" fill="#8892a4" font-size="9">herdabilidade (M9) · correlações (M11) · limiar (M12)</text>
  <rect x="568" y="186" width="229" height="58" rx="8" fill="#12141e" stroke="#2a2d3a"/>
  <text x="682" y="208" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="600">Ferramentas genômicas</text>
  <text x="682" y="222" text-anchor="middle" fill="#8892a4" font-size="9">SNP coding · QC (M18, M19)</text>
  <text x="682" y="236" text-anchor="middle" fill="#8892a4" font-size="9">GWAS · matriz G (M20)</text>
  <rect x="28" y="270" width="760" height="52" rx="10" fill="#1a1d27" stroke="#818cf8" stroke-width="1.5"/>
  <text x="410" y="292" text-anchor="middle" fill="#818cf8" font-size="12" font-weight="700">Decisão de acasalamento · R = h² × S · ganho anualizado = R / L</text>
  <text x="410" y="308" text-anchor="middle" fill="#8892a4" font-size="10">selecionados → acasalamento controlado → próxima geração → novo ciclo</text>
  <path d="M788,270 Q808,220 788,150" fill="none" stroke="#6ee7b7" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="788,152 783,162 793,162" fill="#6ee7b7"/>
  <rect x="28" y="342" width="760" height="130" rx="10" fill="#12141e" stroke="#2a2d3a"/>
  <text x="410" y="364" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Módulos do curso por categoria</text>
  <line x1="28" y1="372" x2="788" y2="372" stroke="#2a2d3a"/>
  <rect x="36" y="380" width="170" height="80" rx="6" fill="#064e3b" stroke="#6ee7b7" stroke-width="1"/>
  <text x="121" y="398" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="700">Genética básica</text>
  <text x="121" y="412" text-anchor="middle" fill="#8892a4" font-size="9">M1, M2, M3, M4, M5</text>
  <text x="121" y="424" text-anchor="middle" fill="#8892a4" font-size="9">M13, M14 — endog./cruz.</text>
  <rect x="214" y="380" width="170" height="80" rx="6" fill="#3b0764" stroke="#c4b5fd" stroke-width="1"/>
  <text x="299" y="398" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="700">Genética quantitativa</text>
  <text x="299" y="412" text-anchor="middle" fill="#8892a4" font-size="9">M6, M7, M8 — variância</text>
  <text x="299" y="424" text-anchor="middle" fill="#8892a4" font-size="9">M9, M10, M11, M12</text>
  <rect x="392" y="380" width="170" height="80" rx="6" fill="#1e1b4b" stroke="#818cf8" stroke-width="1"/>
  <text x="477" y="398" text-anchor="middle" fill="#818cf8" font-size="10" font-weight="700">Avaliação genética</text>
  <text x="477" y="412" text-anchor="middle" fill="#8892a4" font-size="9">M15 — EBV / DEP</text>
  <text x="477" y="424" text-anchor="middle" fill="#8892a4" font-size="9">M16, M17 — BLUP</text>
  <rect x="570" y="380" width="210" height="80" rx="6" fill="#064e3b" stroke="#fcd34d" stroke-width="1"/>
  <text x="675" y="398" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="700">Genômica</text>
  <text x="675" y="412" text-anchor="middle" fill="#8892a4" font-size="9">M18 — SNPs, codificação</text>
  <text x="675" y="424" text-anchor="middle" fill="#8892a4" font-size="9">M19, M20, M21</text>
  <text x="410" y="492" text-anchor="middle" fill="#3d4252" font-size="9">MGenética · Falconer &amp; Mackay (1996) · Eler (2017) · VanRaden (2008) · Henderson (1973)</text>
</svg>
"""


def _svg_stub(module: str, title: str, subtitle: str) -> str:
    """Placeholder para módulos cujo SVG lê do arquivo já gerado."""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 60" '
        f'font-family="system-ui,sans-serif">\n'
        f'  <rect width="820" height="60" fill="#0f1117"/>\n'
        f'  <text x="410" y="35" text-anchor="middle" fill="#818cf8" font-size="14" '
        f'font-weight="700">{module} — {title}</text>\n'
        f'  <text x="410" y="52" text-anchor="middle" fill="#8892a4" font-size="11">{subtitle}</text>\n'
        f'</svg>\n'
    )


# ──────────────────────────────────────────────────────────────
# Mapa módulo → (pasta, nome do arquivo, função geradora)
# Módulos que têm SVG completo embedded aqui; os demais
# leem do arquivo já existente (não sobrescrevem).
# ──────────────────────────────────────────────────────────────

SVG_REGISTRY: dict[str, tuple[str, str, callable]] = {
    "M01": ("M01_revisao_genetica_basica",        "genotipo-alelo.svg",        svg_M01),
    "M02": ("M02_modos_de_acao_genica",            "modos-de-acao.svg",         svg_M02),
    "M05": ("M05_fatores_frequencias_genicas",     "quatro-forcas.svg",         svg_M05),
    "M06": ("M06_valores_e_medias",                "pge-decomposicao.svg",      svg_M06),
    "M07": ("M07_genetica_quantitativa",           "poligeico-normal.svg",      svg_M07),
    "M08": ("M08_componentes_de_variancia",        "particao-variancia.svg",    svg_M08),
    "M11": ("M11_correlacoes",                     "correlacoes-triangulo.svg", svg_M11),
    "M12": ("M12_caracteristicas_de_limiar",       "curva-limiar.svg",          svg_M12),
    "M13": ("M13_endogamia_e_parentesco",          "pedigree-endogamia.svg",    svg_M13),
    "M14": ("M14_cruzamentos_e_heterose",          "heterose-grafico.svg",      svg_M14),
    "M16": ("M16_modelos_lineares",                "modelo-linear.svg",         svg_M16),
    "M17": ("M17_blup_modelo_animal",              "blup-fluxo.svg",            svg_M17),
    "M18": ("M18_genomica_snp",                    "snp-codificacao.svg",       svg_M18),
    "M19": ("M19_controle_qualidade_genomico",     "qc-fluxo.svg",              svg_M19),
    "M20": ("M20_gwas_predicao_genomica",          "gwas-manhattan.svg",        svg_M20),
    "M21": ("M21_projeto_final",                   "pipeline-selecao.svg",      svg_M21),
}


def _read_existing(base_dir: Path, pasta: str, filename: str) -> str | None:
    """Lê o conteúdo do SVG já gerado (não modifica, apenas verifica existência)."""
    path = base_dir / pasta / filename
    if path.exists():
        return path.read_text(encoding="utf-8")
    return None


# ──────────────────────────────────────────────────────────────
# Registro completo (pasta, arquivo) para todos os 14 SVGs
# ──────────────────────────────────────────────────────────────

ALL_SVGS = [
    ("M01_revisao_genetica_basica",       "genotipo-alelo.svg"),
    ("M02_modos_de_acao_genica",           "modos-de-acao.svg"),
    ("M05_fatores_frequencias_genicas",    "quatro-forcas.svg"),
    ("M06_valores_e_medias",               "pge-decomposicao.svg"),
    ("M07_genetica_quantitativa",          "poligeico-normal.svg"),
    ("M08_componentes_de_variancia",       "particao-variancia.svg"),
    ("M11_correlacoes",                    "correlacoes-triangulo.svg"),
    ("M12_caracteristicas_de_limiar",      "curva-limiar.svg"),
    ("M13_endogamia_e_parentesco",         "pedigree-endogamia.svg"),
    ("M14_cruzamentos_e_heterose",         "heterose-grafico.svg"),
    ("M16_modelos_lineares",               "modelo-linear.svg"),
    ("M17_blup_modelo_animal",             "blup-fluxo.svg"),
    ("M18_genomica_snp",                   "snp-codificacao.svg"),
    ("M19_controle_qualidade_genomico",    "qc-fluxo.svg"),
    ("M20_gwas_predicao_genomica",         "gwas-manhattan.svg"),
    ("M21_projeto_final",                  "pipeline-selecao.svg"),
]


def main(base_dir: Path = None, dry_run: bool = False) -> None:
    if base_dir is None:
        base_dir = Path(__file__).resolve().parent.parent

    generated = 0
    for key, (pasta, filename, fn) in SVG_REGISTRY.items():
        path = base_dir / pasta / filename
        write_file(path, fn(), dry_run)
        generated += 1

    print(f"  → {generated} SVGs gerados")


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()
    main(dry_run=args.dry_run)
