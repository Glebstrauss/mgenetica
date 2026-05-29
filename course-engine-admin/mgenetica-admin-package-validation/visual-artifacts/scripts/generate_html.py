#!/usr/bin/env python3
"""
generate_html.py
Gera os 7 HTMLs interativos do pacote visual MGenética.

Módulos cobertos:
  M03 — Calculadora de frequências alélicas e genotípicas
  M04 — Calculadora Hardy-Weinberg
  M09 — Calculadora h² e repetibilidade
  M10 — Calculadora R = h² × S (seleção e ganho genético)
  M15 — Ranking interativo DEP/EBV

Todos os HTMLs são auto-contidos (sem CDN, sem dependências externas).
Compatíveis com embed via <iframe> em qualquer site estático.

Estrutura de cada HTML:
  1. <head>  — meta + CSS com variáveis CSS (tema escuro)
  2. <body>  — markup semântico por seção
  3. <script>— lógica pura em vanilla JS (< 100 linhas por módulo)
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
# CSS compartilhado (injetado no <head> de cada HTML)
# ──────────────────────────────────────────────────────────────

SHARED_CSS = """
  :root {
    --bg:#0f1117; --card:#1a1d27; --border:#2a2d3a;
    --text:#e2e8f0; --muted:#8892a4;
    --A:#6ee7b7; --a:#f9a8d4; --Aa:#c4b5fd;
    --yellow:#fcd34d; --accent:#818cf8; --pink:#f9a8d4;
    --AA:#059669; --Aa-col:#7c3aed; --aa-col:#be185d;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  body {
    font-family: system-ui, sans-serif;
    background: var(--bg); color: var(--text);
    padding: 1.5rem 1rem; line-height: 1.5;
  }
  .page { max-width: 800px; margin: 0 auto; }
  h1 { font-size:1.4rem; font-weight:700; color:var(--accent); margin-bottom:.3rem; }
  .sub { color:var(--muted); font-size:.88rem; margin-bottom:1.6rem; }
  h2 {
    font-size:.9rem; font-weight:600; color:var(--yellow);
    text-transform:uppercase; letter-spacing:.05em; margin-bottom:.8rem;
  }
  .card {
    background:var(--card); border:1px solid var(--border);
    border-radius:12px; padding:1.3rem; margin-bottom:1.1rem;
  }
  .bar-track { background:#12141e; border-radius:5px; height:16px; overflow:hidden; margin-bottom:.6rem; }
  .bar-fill  { height:100%; border-radius:5px; transition:width .4s cubic-bezier(.4,0,.2,1); }
  .bar-label { display:flex; justify-content:space-between; font-size:.82rem; margin-bottom:3px; }
  .tag { display:inline-block; padding:2px 7px; border-radius:4px; font-family:monospace; font-size:.82rem; font-weight:700; }
  .tag-AA { background:rgba(5,150,105,.2); color:var(--A);  border:1px solid var(--AA); }
  .tag-Aa { background:rgba(124,58,237,.2); color:var(--Aa); border:1px solid var(--Aa-col); }
  .tag-aa { background:rgba(190,24,93,.2);  color:var(--a);  border:1px solid var(--aa-col); }
  .note-box {
    border-left:3px solid var(--accent);
    background:rgba(129,140,248,.06);
    padding:.7rem .9rem; border-radius:0 6px 6px 0;
    font-size:.84rem; color:#a5b4fc; margin-top:.8rem;
  }
  .warn-box {
    border-left:3px solid var(--yellow);
    background:rgba(252,211,77,.05);
    padding:.6rem .8rem; border-radius:0 6px 6px 0;
    font-size:.82rem; color:#fde68a; margin-top:.6rem;
  }
  input[type=range] { width:100%; accent-color:var(--accent); }
  input[type=number] {
    background:#12141e; border:1px solid var(--border);
    color:var(--text); border-radius:6px;
    padding:.45rem .7rem; font-size:.95rem; font-family:monospace; outline:none;
  }
  input[type=number]:focus { border-color:var(--accent); }
"""


# ──────────────────────────────────────────────────────────────
# HTML por módulo
# ──────────────────────────────────────────────────────────────

def html_head(title: str, extra_css: str = "") -> str:
    return (
        f'<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n'
        f'<meta charset="UTF-8">\n'
        f'<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        f'<title>{title}</title>\n'
        f'<style>{SHARED_CSS}{extra_css}</style>\n'
        f'</head>\n<body>\n<div class="page">\n'
    )

HTML_FOOT = '\n</div>\n</body>\n</html>\n'


# ── M03 ──────────────────────────────────────────────────────

def html_M03() -> str:
    """
    Calculadora de frequências alélicas e genotípicas.
    Inputs: n_AA, n_Aa, n_aa
    Outputs: f_AA, f_Aa, f_aa, p, q
    Visualizações: barras de frequência, gauge p+q, sacola de fichas, éguas por genótipo.
    """
    extra_css = """
      .chips-grid { display:flex; flex-wrap:wrap; gap:5px; margin:.8rem 0;
                    padding:.8rem; background:#12141e; border-radius:8px; min-height:60px; }
      .chip { width:28px; height:28px; border-radius:50%; display:flex; align-items:center;
              justify-content:center; font-size:.7rem; font-weight:700; cursor:default; }
      .chip-A { background:var(--A);  color:#064e3b; }
      .chip-a { background:var(--a);  color:#831843; }
      .calc-inputs { display:grid; grid-template-columns:1fr 1fr 1fr; gap:1rem; margin-bottom:1rem; }
      .input-group label { display:block; font-size:.8rem; color:var(--muted); margin-bottom:4px; }
      .results-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:.7rem; }
      .res-card { background:#12141e; border:1px solid var(--border); border-radius:8px;
                  padding:.7rem; text-align:center; }
      .res-label { font-size:.72rem; color:var(--muted); margin-bottom:3px; }
      .res-value { font-size:1.2rem; font-weight:700; font-family:monospace; }
      .pq-track  { height:20px; border-radius:7px; overflow:hidden; }
      .pq-p-fill { height:100%; border-radius:7px 0 0 7px; display:flex; align-items:center;
                   justify-content:center; font-size:.72rem; font-weight:700; color:#064e3b; }
      .mare-grid { display:grid; grid-template-columns:repeat(auto-fill,50px); gap:6px; margin:.8rem 0; }
      .mare { width:50px; height:50px; border-radius:7px; display:flex; align-items:center;
              justify-content:center; font-size:.72rem; font-weight:700; font-family:monospace; border:2px solid; }
      .mare-AA { background:rgba(5,150,105,.2);  border-color:var(--AA);     color:var(--A); }
      .mare-Aa { background:rgba(124,58,237,.2); border-color:var(--Aa-col); color:var(--Aa); }
      .mare-aa { background:rgba(190,24,93,.2);  border-color:var(--aa-col); color:var(--a); }
    """
    head = html_head("M3 — Frequências Alélicas e Genotípicas", extra_css)
    body = """
  <h1>M3 — Frequências Alélicas e Genotípicas</h1>
  <p class="sub">Calculadora p, q, f_AA, f_Aa, f_aa · animal ≠ cópia alélica</p>

  <!-- Conceito central -->
  <div class="card">
    <h2>Animal vs. Cópia Alélica</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.8rem;">
      <div style="text-align:center;padding:.8rem;background:#12141e;border-radius:8px;">
        <span class="tag tag-AA" style="font-size:1rem">AA</span>
        <div style="font-size:.8rem;color:var(--muted);margin-top:.4rem">contribui</div>
        <div style="font-size:1.3rem;font-weight:700;color:var(--A)">2×A</div>
      </div>
      <div style="text-align:center;padding:.8rem;background:#12141e;border-radius:8px;">
        <span class="tag tag-Aa" style="font-size:1rem">Aa</span>
        <div style="font-size:.8rem;color:var(--muted);margin-top:.4rem">contribui</div>
        <div style="font-size:1.3rem;font-weight:700;color:var(--A)">1×A</div>
        <div style="font-size:.8rem;color:var(--a);font-weight:700">1×a</div>
      </div>
      <div style="text-align:center;padding:.8rem;background:#12141e;border-radius:8px;">
        <span class="tag tag-aa" style="font-size:1rem">aa</span>
        <div style="font-size:.8rem;color:var(--muted);margin-top:.4rem">contribui</div>
        <div style="font-size:1.3rem;font-weight:700;color:var(--a)">2×a</div>
      </div>
    </div>
  </div>

  <!-- Calculadora -->
  <div class="card">
    <h2>Calculadora</h2>
    <div class="calc-inputs">
      <div class="input-group">
        <label>n<sub>AA</sub></label>
        <input type="number" id="nAA" value="3" min="0">
      </div>
      <div class="input-group">
        <label>n<sub>Aa</sub></label>
        <input type="number" id="nAa" value="4" min="0">
      </div>
      <div class="input-group">
        <label>n<sub>aa</sub></label>
        <input type="number" id="naa" value="3" min="0">
      </div>
    </div>
    <div class="results-grid">
      <div class="res-card"><div class="res-label">f<sub>AA</sub></div><div class="res-value" style="color:var(--A)" id="r-fAA">0,300</div></div>
      <div class="res-card"><div class="res-label">f<sub>Aa</sub></div><div class="res-value" style="color:var(--Aa)" id="r-fAa">0,400</div></div>
      <div class="res-card"><div class="res-label">f<sub>aa</sub></div><div class="res-value" style="color:var(--a)" id="r-faa">0,300</div></div>
      <div class="res-card"><div class="res-label">p (A)</div><div class="res-value" style="color:var(--A)" id="r-p">0,500</div></div>
      <div class="res-card"><div class="res-label">q (a)</div><div class="res-value" style="color:var(--a)" id="r-q">0,500</div></div>
    </div>
    <div style="margin-top:1rem;">
      <div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:4px;">
        <span id="lbl-p" style="color:var(--A)">p = 0,500</span>
        <span id="lbl-q" style="color:var(--a)">q = 0,500</span>
      </div>
      <div class="pq-track" style="background:var(--a)">
        <div class="pq-p-fill" id="pq-fill" style="width:50%;background:var(--A)">p</div>
      </div>
      <div style="text-align:center;font-size:.78rem;color:var(--muted);margin-top:4px;">
        p + q = <span id="pq-sum" style="color:var(--yellow);font-weight:700">1,000</span>
      </div>
    </div>
    <h2 style="margin-top:1.2rem;">Éguas</h2>
    <div class="mare-grid" id="mare-grid"></div>
    <h2>Sacola de alelos</h2>
    <div class="chips-grid" id="chips-calc"></div>
    <div style="display:flex;gap:1.2rem;font-size:.82rem;color:var(--muted);margin-top:.5rem;">
      <span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--A);margin-right:4px"></span>Alelo A (<span id="count-A">10</span>)</span>
      <span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--a);margin-right:4px"></span>Alelo a (<span id="count-a">10</span>)</span>
    </div>
  </div>
"""
    script = """
<script>
  function fmt(v){return v.toFixed(3).replace('.',',');}
  function calcular(){
    const nAA=Math.max(0,parseInt(document.getElementById('nAA').value)||0);
    const nAa=Math.max(0,parseInt(document.getElementById('nAa').value)||0);
    const naa=Math.max(0,parseInt(document.getElementById('naa').value)||0);
    const N=nAA+nAa+naa; if(!N) return;
    const fAA=nAA/N, fAa=nAa/N, faa=naa/N;
    const totA=2*nAA+nAa, tota=2*naa+nAa;
    const p=totA/(2*N), q=tota/(2*N);
    document.getElementById('r-fAA').textContent=fmt(fAA);
    document.getElementById('r-fAa').textContent=fmt(fAa);
    document.getElementById('r-faa').textContent=fmt(faa);
    document.getElementById('r-p').textContent=fmt(p);
    document.getElementById('r-q').textContent=fmt(q);
    document.getElementById('lbl-p').textContent='p = '+fmt(p);
    document.getElementById('lbl-q').textContent='q = '+fmt(q);
    document.getElementById('pq-sum').textContent=fmt(p+q);
    document.getElementById('count-A').textContent=totA;
    document.getElementById('count-a').textContent=tota;
    const fill=document.getElementById('pq-fill');
    fill.style.width=(p*100).toFixed(1)+'%';
    fill.textContent=p>0.1?'p':'';
    // éguas
    const mg=document.getElementById('mare-grid'); mg.innerHTML='';
    [['AA',nAA],['Aa',nAa],['aa',naa]].forEach(([gt,n])=>{
      for(let i=0;i<n;i++){
        const d=document.createElement('div');
        d.className='mare mare-'+gt; d.textContent=gt; mg.appendChild(d);
      }
    });
    // chips
    const cc=document.getElementById('chips-calc'); cc.innerHTML='';
    const chips=[...Array(totA).fill('A'),...Array(tota).fill('a')];
    chips.sort(()=>Math.random()-.5);
    chips.forEach(c=>{
      const d=document.createElement('div');
      d.className='chip chip-'+c; d.textContent=c; cc.appendChild(d);
    });
  }
  ['nAA','nAa','naa'].forEach(id=>document.getElementById(id).addEventListener('input',calcular));
  calcular();
</script>
"""
    return head + body + script + HTML_FOOT


# ── M04 ──────────────────────────────────────────────────────

def html_M04() -> str:
    """
    Calculadora Hardy-Weinberg.
    Input: p via slider
    Output: q = 1-p, f_AA = p², f_Aa = 2pq, f_aa = q²
    Plus: tabela observado vs esperado, seção de genes ligados ao sexo.
    """
    head = html_head("M4 — Hardy-Weinberg")
    body = """
  <h1>M4 — Hardy-Weinberg</h1>
  <p class="sub">Frequências genotípicas esperadas · p² + 2pq + q² = 1</p>

  <div class="card">
    <h2>1. Frequências Esperadas</h2>
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem;">
      <label style="color:var(--muted);font-size:.84rem;min-width:120px">Frequência <span style="color:var(--A)">p (A)</span></label>
      <input type="range" id="pSlider" min="0" max="1" step="0.01" value="0.7">
      <span style="font-family:monospace;font-size:1.3rem;font-weight:700;color:var(--A);min-width:50px" id="pVal">0,70</span>
    </div>
    <div style="font-size:.85rem;margin-bottom:1rem;">
      q = 1 − p = <span style="font-family:monospace;font-size:1.1rem;font-weight:700;color:var(--a)" id="qVal">0,30</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.7rem;margin-bottom:1rem;">
      <div style="background:#12141e;border-radius:8px;padding:.7rem;text-align:center;">
        <div style="font-size:.75rem;color:var(--muted)">f<sub>AA</sub> = p²</div>
        <div style="font-size:1.2rem;font-weight:700;font-family:monospace;color:var(--A)" id="fAA">0,490</div>
      </div>
      <div style="background:#12141e;border-radius:8px;padding:.7rem;text-align:center;">
        <div style="font-size:.75rem;color:var(--muted)">f<sub>Aa</sub> = 2pq</div>
        <div style="font-size:1.2rem;font-weight:700;font-family:monospace;color:var(--Aa)" id="fAa">0,420</div>
      </div>
      <div style="background:#12141e;border-radius:8px;padding:.7rem;text-align:center;">
        <div style="font-size:.75rem;color:var(--muted)">f<sub>aa</sub> = q²</div>
        <div style="font-size:1.2rem;font-weight:700;font-family:monospace;color:var(--a)" id="faa">0,090</div>
      </div>
    </div>
    <div class="bar-label"><span><span class="tag tag-AA">AA</span></span><span id="lAA" style="color:var(--A)">0,490</span></div>
    <div class="bar-track"><div class="bar-fill" id="bAA" style="background:var(--AA)"></div></div>
    <div class="bar-label"><span><span class="tag tag-Aa">Aa</span></span><span id="lAa" style="color:var(--Aa)">0,420</span></div>
    <div class="bar-track"><div class="bar-fill" id="bAa" style="background:var(--Aa-col)"></div></div>
    <div class="bar-label"><span><span class="tag tag-aa">aa</span></span><span id="laa" style="color:var(--a)">0,090</span></div>
    <div class="bar-track"><div class="bar-fill" id="baa" style="background:var(--aa-col)"></div></div>
  </div>

  <div class="card">
    <h2>2. Observado vs. Esperado</h2>
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem;">
      <label style="font-size:.82rem;color:var(--muted)">N (animais)</label>
      <input type="number" id="nTotal" value="100" min="1" style="width:90px">
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:.88rem;">
      <thead><tr style="background:#12141e;">
        <th style="padding:.5rem .7rem;text-align:left;color:var(--muted);font-size:.78rem;text-transform:uppercase">Genótipo</th>
        <th style="padding:.5rem .7rem;color:var(--muted);font-size:.78rem;text-transform:uppercase">Observado</th>
        <th style="padding:.5rem .7rem;color:var(--muted);font-size:.78rem;text-transform:uppercase">Esperado</th>
        <th style="padding:.5rem .7rem;color:var(--muted);font-size:.78rem;text-transform:uppercase">Diferença</th>
      </tr></thead>
      <tbody>
        <tr style="border-bottom:1px solid var(--border)">
          <td style="padding:.5rem .7rem"><span class="tag tag-AA">AA</span></td>
          <td style="padding:.5rem"><input type="number" id="obsAA" value="49" min="0" style="width:70px;color:var(--A)"></td>
          <td style="padding:.5rem .7rem;font-family:monospace;color:var(--A)" id="expAA">49,0</td>
          <td style="padding:.5rem .7rem;font-family:monospace;font-weight:600" id="dAA">0,0</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border)">
          <td style="padding:.5rem .7rem"><span class="tag tag-Aa">Aa</span></td>
          <td style="padding:.5rem"><input type="number" id="obsAa" value="42" min="0" style="width:70px;color:var(--Aa)"></td>
          <td style="padding:.5rem .7rem;font-family:monospace;color:var(--Aa)" id="expAa">42,0</td>
          <td style="padding:.5rem .7rem;font-family:monospace;font-weight:600" id="dAa">0,0</td>
        </tr>
        <tr>
          <td style="padding:.5rem .7rem"><span class="tag tag-aa">aa</span></td>
          <td style="padding:.5rem"><input type="number" id="obsaa" value="9" min="0" style="width:70px;color:var(--a)"></td>
          <td style="padding:.5rem .7rem;font-family:monospace;color:var(--a)" id="expaa">9,0</td>
          <td style="padding:.5rem .7rem;font-family:monospace;font-weight:600" id="daa">0,0</td>
        </tr>
      </tbody>
    </table>
    <div class="note-box" id="hwe-note">Contagem compatível com a expectativa de HWE.</div>
  </div>

  <div class="card">
    <h2>3. Genes Ligados ao Sexo (XX/XY)</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
      <div style="background:#12141e;border-radius:8px;padding:.8rem;">
        <div style="font-size:.8rem;color:var(--muted);text-transform:uppercase;margin-bottom:.5rem">Fêmeas XX</div>
        <div style="font-family:monospace;font-size:.9rem;line-height:1.9;">
          <span style="color:var(--Aa)">X<sup>A</sup>X<sup>A</sup></span> — homozigota<br>
          <span style="color:var(--Aa)">X<sup>A</sup>X<sup>a</sup></span> — heterozigota<br>
          <span style="color:var(--Aa)">X<sup>a</sup>X<sup>a</sup></span> — homozigota rec.
        </div>
      </div>
      <div style="background:#12141e;border-radius:8px;padding:.8rem;">
        <div style="font-size:.8rem;color:var(--muted);text-transform:uppercase;margin-bottom:.5rem">Machos XY (hemizigoto)</div>
        <div style="font-family:monospace;font-size:.9rem;line-height:1.9;">
          <span style="color:var(--Aa)">X<sup>A</sup>Y</span> — expressa A<br>
          <span style="color:var(--Aa)">X<sup>a</sup>Y</span> — expressa a<br>
          <span style="color:var(--muted)">— não há heterozigose</span>
        </div>
      </div>
    </div>
  </div>
"""
    script = """
<script>
  function fmt(v,d=3){return v.toFixed(d).replace('.',',');}
  function update(){
    const p=parseFloat(document.getElementById('pSlider').value), q=1-p;
    document.getElementById('pVal').textContent=fmt(p,2);
    document.getElementById('qVal').textContent=fmt(q,2);
    const fAA=p*p, fAa=2*p*q, faa=q*q;
    ['AA','Aa','aa'].forEach((k,i)=>{
      const f=[fAA,fAa,faa][i];
      document.getElementById('f'+k).textContent=fmt(f);
      document.getElementById('l'+k).textContent=fmt(f);
      document.getElementById('b'+k).style.width=(f*100).toFixed(1)+'%';
    });
    updateTable(p,q,fAA,fAa,faa);
  }
  function updateTable(p,q,fAA,fAa,faa){
    const N=Math.max(1,parseInt(document.getElementById('nTotal').value)||100);
    const [eAA,eAa,eaa]=[fAA*N,fAa*N,faa*N];
    document.getElementById('expAA').textContent=eAA.toFixed(1);
    document.getElementById('expAa').textContent=eAa.toFixed(1);
    document.getElementById('expaa').textContent=eaa.toFixed(1);
    const o=[+document.getElementById('obsAA').value,+document.getElementById('obsAa').value,+document.getElementById('obsaa').value];
    const e=[eAA,eAa,eaa]; const ids=['dAA','dAa','daa'];
    let big=false;
    ids.forEach((id,i)=>{
      const d=o[i]-e[i]; const el=document.getElementById(id);
      el.textContent=(d>=0?'+':'')+d.toFixed(1);
      const warn=Math.abs(d)>N*0.1;
      el.style.color=warn?'var(--yellow)':'var(--A)';
      if(warn) big=true;
    });
    const note=document.getElementById('hwe-note');
    if(big){note.textContent='Diferença grande — possíveis causas: seleção, endogamia ou estrutura de acasalamento.';note.style.borderColor='var(--yellow)';}
    else{note.textContent='Contagem compatível com a expectativa de HWE.';note.style.borderColor='var(--accent)';}
  }
  document.getElementById('pSlider').addEventListener('input',update);
  ['nTotal','obsAA','obsAa','obsaa'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{
    const p=parseFloat(document.getElementById('pSlider').value),q=1-p;
    updateTable(p,q,p*p,2*p*q,q*q);
  }));
  update();
</script>
"""
    return head + body + script + HTML_FOOT


# ── M09 ──────────────────────────────────────────────────────

def html_M09() -> str:
    """Calculadora h² e repetibilidade. VP fixo = 100."""
    css = """
  .slider-group{margin-bottom:.9rem;}
  .slider-group label{display:flex;justify-content:space-between;font-size:.84rem;margin-bottom:4px;}
  .slider-group label span{font-family:monospace;font-weight:600;}
  .results-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1.2rem;}
  .res-card{background:#12141e;border:1px solid var(--border);border-radius:10px;padding:1rem;text-align:center;}
  .res-label{font-size:.78rem;color:var(--muted);margin-bottom:4px;}
  .res-value{font-size:1.6rem;font-weight:700;font-family:monospace;}
  .rv-h2{color:var(--A);}
  .rv-r{color:var(--Aa);}
  .res-interp{font-size:.78rem;margin-top:.4rem;color:var(--muted);}
  .comparison{margin-top:1rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
  .comp-box{background:#12141e;border-radius:8px;padding:.8rem;font-size:.85rem;border:1px solid var(--border);}
  .comp-box strong{display:block;margin-bottom:.4rem;}
  .ok-box{border-left:3px solid var(--A);background:rgba(110,231,183,.06);padding:.6rem .8rem;border-radius:0 6px 6px 0;font-size:.84rem;color:var(--A);margin-top:.8rem;}
  .vp-note{font-size:.78rem;color:var(--muted);text-align:right;margin-top:.3rem;}
"""
    head = html_head("M9 — Herdabilidade e Repetibilidade", css)
    body = """
  <h1>M9 — Herdabilidade e Repetibilidade</h1>
  <p class="sub">h² pergunta sobre filhos · r pergunta sobre repetição do mesmo animal</p>
  <div class="card">
    <h2>1. Componentes de variância (VP = 100)</h2>
    <p style="font-size:.82rem;color:var(--muted);margin-bottom:1rem;">Ajuste os componentes. A soma VA + VD deve ser ≤ 100. Vperm está contida em VA + VD.</p>
    <div class="slider-group">
      <label><span style="color:var(--A)">VA — Variância genética aditiva</span> <span id="va-val" style="color:var(--A)">40</span></label>
      <input type="range" id="sl-va" min="0" max="100" step="1" value="40">
    </div>
    <div class="slider-group">
      <label><span style="color:var(--Aa)">VD — Variância de dominância</span> <span id="vd-val" style="color:var(--Aa)">20</span></label>
      <input type="range" id="sl-vd" min="0" max="100" step="1" value="20">
    </div>
    <div class="slider-group">
      <label><span style="color:var(--muted)">VE — Variância ambiental (calculado)</span> <span id="ve-val">40</span></label>
      <input type="range" id="sl-ve" min="0" max="100" step="1" value="40" disabled style="opacity:.4">
    </div>
    <div class="slider-group">
      <label><span style="color:var(--Aa)">Vperm — Variância permanente (≤ VA+VD)</span> <span id="vp-val" style="color:var(--Aa)">60</span></label>
      <input type="range" id="sl-vp" min="0" max="100" step="1" value="60">
    </div>
    <p class="vp-note">VP total fixo = 100 · VE = 100 − VA − VD</p>
  </div>
  <div class="card">
    <h2>2. Resultados</h2>
    <div class="results-row">
      <div class="res-card">
        <div class="res-label">h² = VA / VP</div>
        <div class="res-value rv-h2" id="h2-val">0,400</div>
        <div class="res-interp" id="h2-interp">Fração aditiva moderada — seleção eficaz</div>
      </div>
      <div class="res-card">
        <div class="res-label">r = Vperm / VP</div>
        <div class="res-value rv-r" id="r-val">0,600</div>
        <div class="res-interp" id="r-interp">Repetibilidade alta — 1–2 medidas suficientes</div>
      </div>
    </div>
    <div style="margin-top:1rem;">
      <div class="bar-label"><span style="color:var(--A)">h²</span><span id="lh2" style="color:var(--A)">0,400</span></div>
      <div class="bar-track"><div class="bar-fill" id="bh2" style="background:#059669;width:40%"></div></div>
      <div class="bar-label"><span style="color:var(--Aa)">r</span><span id="lr" style="color:var(--Aa)">0,600</span></div>
      <div class="bar-track"><div class="bar-fill" id="br" style="background:#7c3aed;width:60%"></div></div>
    </div>
  </div>
  <div class="card">
    <h2>3. Interpretação prática</h2>
    <div class="comparison">
      <div class="comp-box" style="border-color:var(--A)">
        <strong style="color:var(--A)">h² — pergunta sobre filhos</strong>
        Quanto da variação fenotípica se deve a efeitos aditivos transmissíveis?<br>
        <span style="color:var(--muted);font-size:.78rem;">Quanto maior h², mais a seleção massal move a média da progênie.</span>
      </div>
      <div class="comp-box" style="border-color:var(--Aa)">
        <strong style="color:var(--Aa)">r — pergunta sobre nova medida</strong>
        Quão parecidas são as medidas repetidas do mesmo animal?<br>
        <span style="color:var(--muted);font-size:.78rem;">Quanto maior r, menos medidas extras agregam informação.</span>
      </div>
    </div>
    <div class="ok-box" id="interp-box">
      r ≥ h² porque Vperm inclui VA e diferenças permanentes de ambiente.
    </div>
    <div class="warn-box" id="n-medidas-box">
      Com r = 0,60, uma segunda medida reduz incerteza, mas uma terceira acrescenta pouco.
    </div>
  </div>
"""
    script = """
<script>
  function fmt(v){return v.toFixed(3).replace('.',',');}
  function interp_h2(h){
    if(h<0.1) return 'h² muito baixo — seleção massal pouco eficaz';
    if(h<0.3) return 'h² baixo — progresso lento por seleção massal';
    if(h<0.5) return 'h² moderado — seleção eficaz com boa avaliação';
    return 'h² alto — seleção massal move rapidamente a média';
  }
  function interp_r(r){
    if(r<0.3) return 'Repetibilidade baixa — múltiplas medidas necessárias';
    if(r<0.5) return 'Repetibilidade moderada — 2-3 medidas recomendadas';
    if(r<0.7) return 'Repetibilidade alta — 1-2 medidas suficientes';
    return 'Repetibilidade muito alta — 1 medida bem feita é confiável';
  }
  function update(){
    const va=parseInt(document.getElementById('sl-va').value);
    const vd=parseInt(document.getElementById('sl-vd').value);
    const vperm=parseInt(document.getElementById('sl-vp').value);
    const ve=Math.max(0,100-va-vd);
    document.getElementById('ve-val').textContent=ve;
    document.getElementById('va-val').textContent=va;
    document.getElementById('vd-val').textContent=vd;
    const vpermCapped=Math.min(vperm,va+vd);
    document.getElementById('vp-val').textContent=vpermCapped;
    const h2=va/100, r=vpermCapped/100;
    document.getElementById('h2-val').textContent=fmt(h2);
    document.getElementById('r-val').textContent=fmt(r);
    document.getElementById('h2-interp').textContent=interp_h2(h2);
    document.getElementById('r-interp').textContent=interp_r(r);
    document.getElementById('lh2').textContent=fmt(h2);
    document.getElementById('lr').textContent=fmt(r);
    document.getElementById('bh2').style.width=(h2*100)+'%';
    document.getElementById('br').style.width=(r*100)+'%';
    const n=Math.round(1+(1-Math.max(0.01,r))/Math.max(0.01,r)*2);
    document.getElementById('n-medidas-box').textContent=
      'Com r = '+fmt(r)+', número ótimo de medidas ≈ '+Math.max(1,n)+' para boa acurácia individual.';
    const box=document.getElementById('interp-box');
    if(r<h2){
      box.textContent='Atenção: r < h² — verifique se Vperm está compatível com VA+VD.';
      box.style.borderColor='var(--yellow)';box.style.color='#fde68a';
    }else{
      box.textContent='r ('+fmt(r)+') ≥ h² ('+fmt(h2)+') — consistente. Vperm inclui a parte aditiva mais diferenças permanentes de ambiente.';
      box.style.borderColor='var(--A)';box.style.color='var(--A)';
    }
  }
  ['sl-va','sl-vd','sl-vp'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  update();
</script>
"""
    return head + body + script + HTML_FOOT


# ── M10 ──────────────────────────────────────────────────────

def html_M10() -> str:
    """Calculadora R = h² × S, seleção e ganho genético."""
    css = """
  .inputs-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;}
  .input-group label{display:block;font-size:.82rem;color:var(--muted);margin-bottom:4px;}
  .input-group input{width:100%;background:#12141e;border:1px solid var(--border);color:var(--text);
    border-radius:6px;padding:.45rem .7rem;font-size:.95rem;font-family:monospace;outline:none;}
  .input-group input:focus{border-color:var(--accent);}
  .slider-group{margin-bottom:.9rem;}
  .slider-group label{display:flex;justify-content:space-between;font-size:.84rem;margin-bottom:4px;}
  .results-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.8rem;margin-top:1rem;}
  .res-card{background:#12141e;border:1px solid var(--border);border-radius:8px;padding:.8rem;text-align:center;}
  .res-label{font-size:.75rem;color:var(--muted);margin-bottom:3px;}
  .res-value{font-size:1.25rem;font-weight:700;font-family:monospace;}
  .rv-S{color:var(--yellow);}
  .rv-R{color:var(--A);}
  .rv-yr{color:var(--pink);}
  .pop-bars{display:flex;align-items:flex-end;gap:3px;height:80px;padding:0 .5rem;}
  .pop-bar{flex:1;border-radius:2px 2px 0 0;}
  .pop-bar.selected{opacity:1;}
  .pop-bar.unselected{opacity:.3;}
  .sieve-labels{display:flex;justify-content:space-between;font-size:.76rem;color:var(--muted);margin-top:4px;}
  .resp-diagram{position:relative;height:90px;margin-top:1rem;background:#12141e;border-radius:8px;overflow:hidden;}
  .resp-baseline{position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--border);}
  .resp-mu-line{position:absolute;width:2px;background:var(--muted);top:0;bottom:0;}
  .resp-sel-line{position:absolute;width:2px;background:var(--yellow);top:0;bottom:0;}
  .resp-prog-line{position:absolute;width:2px;background:var(--A);top:0;bottom:0;}
  .resp-S-brace{position:absolute;height:3px;background:var(--yellow);top:20px;}
  .resp-R-brace{position:absolute;height:3px;background:var(--A);top:40px;}
  .resp-label{position:absolute;font-size:.7rem;font-weight:600;}
"""
    head = html_head("M10 — Seleção e Ganho Genético", css)
    body = """
  <h1>M10 — Seleção e Ganho Genético</h1>
  <p class="sub">R = h² × S · Diferencial de seleção × herdabilidade = resposta por geração</p>
  <div class="card">
    <h2>1. Parâmetros da seleção</h2>
    <div class="inputs-grid">
      <div class="input-group">
        <label>Média da população (todos os candidatos)</label>
        <input type="number" id="muPop" value="100">
      </div>
      <div class="input-group">
        <label>Média dos selecionados</label>
        <input type="number" id="muSel" value="120">
      </div>
    </div>
    <div class="slider-group">
      <label>
        <span>Herdabilidade h²</span>
        <span style="color:var(--A);font-family:monospace;font-weight:700" id="h2-lbl">0,30</span>
      </label>
      <input type="range" id="sl-h2" min="0" max="1" step="0.01" value="0.30">
    </div>
    <div class="slider-group">
      <label>
        <span>Intervalo de geração L (anos)</span>
        <span style="color:var(--pink);font-family:monospace;font-weight:700" id="L-lbl">8</span>
      </label>
      <input type="range" id="sl-L" min="1" max="20" step="0.5" value="8">
    </div>
  </div>
  <div class="card">
    <h2>2. Resultados</h2>
    <div class="results-grid">
      <div class="res-card">
        <div class="res-label">S — Diferencial de seleção</div>
        <div class="res-value rv-S" id="r-S">20,0</div>
        <div style="font-size:.72rem;color:var(--muted);margin-top:3px;">média_sel − média_pop</div>
      </div>
      <div class="res-card">
        <div class="res-label">R — Resposta por geração</div>
        <div class="res-value rv-R" id="r-R">6,0</div>
        <div style="font-size:.72rem;color:var(--muted);margin-top:3px;">h² × S</div>
      </div>
      <div class="res-card">
        <div class="res-label">Ganho por ano</div>
        <div class="res-value rv-yr" id="r-yr">0,75</div>
        <div style="font-size:.72rem;color:var(--muted);margin-top:3px;">R ÷ L</div>
      </div>
    </div>
    <div style="margin-top:1rem;">
      <div style="font-size:.78rem;color:var(--muted);margin-bottom:.4rem;">Distribuição dos candidatos — barras selecionadas em destaque</div>
      <div class="pop-bars" id="pop-bars"></div>
      <div class="sieve-labels"><span>← piores</span><span style="color:var(--yellow)">selecionados (top 20%)</span><span>melhores →</span></div>
    </div>
    <div class="resp-diagram" id="resp-diagram">
      <div class="resp-baseline"></div>
      <div class="resp-mu-line" id="mu-line" style="left:40%"></div>
      <div class="resp-sel-line" id="sel-line" style="left:65%"></div>
      <div class="resp-prog-line" id="prog-line" style="left:49%"></div>
      <div class="resp-S-brace" id="S-brace" style="left:40%;width:25%"></div>
      <div class="resp-R-brace" id="R-brace" style="left:40%;width:9%"></div>
      <span class="resp-label" id="lbl-mu" style="bottom:5px;color:var(--muted)">μ pop</span>
      <span class="resp-label" id="lbl-sel" style="bottom:5px;color:var(--yellow)">μ sel</span>
      <span class="resp-label" id="lbl-prog" style="bottom:5px;color:var(--A)">μ prog</span>
      <span class="resp-label" style="top:12px;color:var(--yellow)" id="lbl-S">S</span>
      <span class="resp-label" style="top:32px;color:var(--A)" id="lbl-R">R</span>
    </div>
  </div>
  <div class="card">
    <h2>3. Interpretação</h2>
    <div class="note-box" id="interp-note">
      Com h² = 0,30 e S = 20, a próxima geração é esperada 6 pontos acima da média original.
    </div>
  </div>
"""
    script = """
<script>
  function fmt(v,d=2){return v.toFixed(d).replace('.',',');}
  function buildBars(){
    const el=document.getElementById('pop-bars'); el.innerHTML='';
    for(let i=0;i<30;i++){
      const d=document.createElement('div');
      d.className='pop-bar '+(i>=24?'selected':'unselected');
      const h=20+Math.round(80*Math.pow(i/30,0.4));
      d.style.height=h+'px';
      d.style.background=i>=24?'#6ee7b7':'#2a2d3a';
      el.appendChild(d);
    }
  }
  function update(){
    const muPop=parseFloat(document.getElementById('muPop').value)||100;
    const muSel=parseFloat(document.getElementById('muSel').value)||100;
    const h2=parseFloat(document.getElementById('sl-h2').value);
    const L=parseFloat(document.getElementById('sl-L').value);
    document.getElementById('h2-lbl').textContent=fmt(h2);
    document.getElementById('L-lbl').textContent=fmt(L,1);
    const S=muSel-muPop, R=h2*S, yr=R/L;
    document.getElementById('r-S').textContent=fmt(S,1);
    document.getElementById('r-R').textContent=fmt(R,1);
    document.getElementById('r-yr').textContent=fmt(yr,2);
    const diag=document.getElementById('resp-diagram');
    const W=diag.offsetWidth||700;
    const range=Math.max(Math.abs(S)*2.5,30);
    const toX=v=>((v-(muPop-range/2))/range)*W;
    const muX=toX(muPop), selX=toX(muSel), progX=toX(muPop+R);
    document.getElementById('mu-line').style.left=Math.max(0,Math.min(W-2,muX))+'px';
    document.getElementById('sel-line').style.left=Math.max(0,Math.min(W-2,selX))+'px';
    document.getElementById('prog-line').style.left=Math.max(0,Math.min(W-2,progX))+'px';
    document.getElementById('S-brace').style.left=Math.min(muX,selX)+'px';
    document.getElementById('S-brace').style.width=Math.abs(selX-muX)+'px';
    document.getElementById('R-brace').style.left=Math.min(muX,progX)+'px';
    document.getElementById('R-brace').style.width=Math.abs(progX-muX)+'px';
    document.getElementById('lbl-mu').style.left=Math.max(0,muX-18)+'px';
    document.getElementById('lbl-sel').style.left=Math.max(0,selX-18)+'px';
    document.getElementById('lbl-prog').style.left=Math.max(0,progX-20)+'px';
    document.getElementById('lbl-S').style.left=Math.max(0,(Math.min(muX,selX)+Math.abs(selX-muX)/2)-6)+'px';
    document.getElementById('lbl-R').style.left=Math.max(0,(Math.min(muX,progX)+Math.abs(progX-muX)/2)-6)+'px';
    document.getElementById('interp-note').textContent=
      'Com h² = '+fmt(h2)+' e S = '+fmt(S,1)+', a próxima geração é esperada '+fmt(R,1)+
      (R>=0?' acima':' abaixo')+' da média original. Ganho por ano = '+fmt(yr,2)+' (geração de '+fmt(L,1)+' anos).';
  }
  buildBars();
  ['muPop','muSel'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  ['sl-h2','sl-L'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  update();
</script>
"""
    return head + body + script + HTML_FOOT


# ── M15 ──────────────────────────────────────────────────────

def html_M15() -> str:
    """Ranking interativo DEP/EBV com 3 garanhões."""
    css = """
  .btn-row{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.2rem;}
  .btn{padding:.45rem 1rem;border-radius:20px;border:1px solid var(--border);background:#12141e;
    color:var(--muted);font-size:.82rem;cursor:pointer;transition:all .2s;}
  .btn:hover{border-color:var(--accent);color:var(--text);}
  .btn.active{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600;}
  .rank-table{width:100%;border-collapse:collapse;font-size:.88rem;}
  .rank-table th{background:#12141e;color:var(--muted);font-size:.76rem;text-transform:uppercase;
    letter-spacing:.05em;padding:.5rem .7rem;text-align:left;cursor:pointer;user-select:none;}
  .rank-table th:hover{color:var(--text);}
  .rank-table th.sort-active{color:var(--yellow);}
  .rank-table td{padding:.55rem .7rem;border-bottom:1px solid var(--border);}
  .rank-table tr.winner td{background:rgba(110,231,183,.07);}
  .rank-table tr.second td{background:rgba(129,140,248,.05);}
  .rank-badge{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;font-size:.78rem;font-weight:700;}
  .badge-1{background:var(--yellow);color:#000;}
  .badge-2{background:#6b7280;color:#fff;}
  .badge-3{background:#374151;color:#9ca3af;}
  .acc-bar{display:flex;align-items:center;gap:.4rem;}
  .acc-track{flex:1;height:8px;background:#12141e;border-radius:4px;overflow:hidden;}
  .acc-fill{height:100%;border-radius:4px;}
  .acc-val{font-family:monospace;font-size:.82rem;min-width:38px;text-align:right;}
  .crit-explain{background:#12141e;border:1px solid var(--border);border-radius:8px;padding:.8rem;
    margin-bottom:1rem;font-size:.84rem;min-height:46px;}
"""
    head = html_head("M15 — DEP/EBV e Ranking", css)
    body = """
  <h1>M15 — Avaliação Genética: DEP/EBV e Ranking</h1>
  <p class="sub">Escolha o critério de ordenação — a posição dos garanhões muda conforme a pergunta</p>
  <div class="card">
    <h2>Critério de ranking</h2>
    <div class="btn-row">
      <button class="btn" onclick="sortBy('obs')">Fenótipo observado</button>
      <button class="btn" onclick="sortBy('cor')">Fenótipo corrigido</button>
      <button class="btn active" onclick="sortBy('ebv')">EBV</button>
      <button class="btn" onclick="sortBy('dep')">DEP</button>
      <button class="btn" onclick="sortBy('acc')">Acurácia</button>
    </div>
    <div class="crit-explain" id="crit-explain">
      <strong style="color:var(--yellow)">EBV</strong> — Valor genético estimado. Estima o mérito genético aditivo do garanhão para transmissão à progênie.
    </div>
    <table class="rank-table" id="rank-table">
      <thead><tr>
        <th>#</th>
        <th>Garanhão</th>
        <th id="th-obs">Fenótipo obs.</th>
        <th>Ef. ambiente</th>
        <th id="th-cor">Fen. corrigido</th>
        <th id="th-ebv" class="sort-active">EBV</th>
        <th id="th-dep">DEP</th>
        <th>Acurácia</th>
      </tr></thead>
      <tbody id="rank-body"></tbody>
    </table>
  </div>
  <div class="card">
    <h2>Interpretação do ranking atual</h2>
    <div class="note-box" id="interp-main">
      Ordenando por EBV: o garanhão A lidera em mérito estimado, mas com acurácia moderada (0,55). O garanhão B tem EBV menor, mas informação mais firme (acurácia 0,85).
    </div>
    <div class="warn-box" id="interp-warn">
      Fenótipo observado não corrige por ambiente. O garanhão A parece melhor apenas pelo boletim bruto — mas parte da vantagem é ambiental (+8 pontos).
    </div>
  </div>
  <div class="card">
    <h2>Fórmulas</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
      <div style="background:#12141e;border-radius:8px;padding:.8rem;">
        <div style="font-family:monospace;font-size:.92rem;color:var(--A);margin-bottom:.3rem;">DEP = EBV / 2</div>
        <div style="font-size:.78rem;color:var(--muted);">O pai transmite metade de seus alelos. DEP = expectativa média na progênie.</div>
      </div>
      <div style="background:#12141e;border-radius:8px;padding:.8rem;">
        <div style="font-family:monospace;font-size:.92rem;color:var(--yellow);margin-bottom:.3rem;">P_cor = P_obs − E_amb</div>
        <div style="font-size:.78rem;color:var(--muted);">Fenótipo corrigido remove vantagem ambiental para comparação mais justa.</div>
      </div>
    </div>
  </div>
"""
    script = """
<script>
  const data=[
    {name:'A',obs:112,env:8, cor:104,ebv:20, dep:10, acc:0.55},
    {name:'B',obs:106,env:-2,cor:108,ebv:8,  dep:4,  acc:0.85},
    {name:'C',obs:100,env:0, cor:100,ebv:-4, dep:-2, acc:0.70},
  ];
  const explains={
    obs:'<strong style="color:var(--yellow)">Fenótipo observado</strong> — nota bruta sem ajustes. Inclui efeito de ambiente.',
    cor:'<strong style="color:var(--yellow)">Fenótipo corrigido</strong> — remove o efeito ambiental conhecido. Mais justo que o bruto.',
    ebv:'<strong style="color:var(--yellow)">EBV</strong> — Valor genético estimado. Estima o mérito genético aditivo do garanhão para transmissão à progênie.',
    dep:'<strong style="color:var(--yellow)">DEP</strong> — Diferença esperada na progênie (EBV/2). Indica quanto os filhos devem estar acima da base, em média.',
    acc:'<strong style="color:var(--yellow)">Acurácia</strong> — Confiança na estimativa. Acurácia alta não significa animal bom; significa que o EBV é mais estável.',
  };
  const interpMain={
    obs:'Ordenando por fenótipo observado: A lidera (112), mas 8 pontos vêm do ambiente. Este ranking favorece animais criados em melhores condições.',
    cor:'Ordenando por fenótipo corrigido: B passa para o 1º lugar (108 vs 104). A correção ambiental revelou que B era o melhor animal.',
    ebv:'Ordenando por EBV: o garanhão A lidera em mérito estimado, mas com acurácia moderada (0,55). O garanhão B tem EBV menor, mas informação mais firme (acurácia 0,85).',
    dep:'Ordenando por DEP: a ordem é idêntica ao EBV, pois DEP = EBV/2. DEP = 10 significa que os filhos de A devem ser, em média, 10 pontos acima da base.',
    acc:'Ordenando por acurácia: B tem a estimativa mais confiável (0,85). Acurácia alta não garante que B seja o melhor — apenas que sabemos mais sobre ele.',
  };
  let currentSort='ebv', sortDir=-1;
  function sortBy(key){
    if(currentSort===key) sortDir*=-1; else{currentSort=key;sortDir=-1;}
    document.querySelectorAll('.btn').forEach(b=>b.classList.remove('active'));
    const btn=[...document.querySelectorAll('.btn')].find(b=>b.getAttribute('onclick')&&b.getAttribute('onclick').includes("'"+key+"'"));
    if(btn) btn.classList.add('active');
    ['obs','cor','ebv','dep'].forEach(k=>{const th=document.getElementById('th-'+k);if(th)th.classList.toggle('sort-active',k===key);});
    if(explains[key]) document.getElementById('crit-explain').innerHTML=explains[key];
    if(interpMain[key]) document.getElementById('interp-main').textContent=interpMain[key];
    render();
  }
  function accColor(a){return a>=0.8?'#6ee7b7':a>=0.6?'#fcd34d':'#f9a8d4';}
  function render(){
    const sorted=[...data].sort((a,b)=>{
      if(currentSort==='name') return sortDir*(a.name<b.name?-1:1);
      return sortDir*(b[currentSort]-a[currentSort]);
    });
    const tbody=document.getElementById('rank-body'); tbody.innerHTML='';
    const badges=['<span class="rank-badge badge-1">1</span>','<span class="rank-badge badge-2">2</span>','<span class="rank-badge badge-3">3</span>'];
    sorted.forEach((row,i)=>{
      const tr=document.createElement('tr');
      if(i===0) tr.className='winner'; if(i===1) tr.className='second';
      const envStr=row.env===0?'0':(row.env>0?'+'+row.env:row.env);
      const envCol=row.env>0?'#6ee7b7':(row.env<0?'#f9a8d4':'#8892a4');
      const ebvCol=row.ebv>0?'#6ee7b7':(row.ebv<0?'#f9a8d4':'#8892a4');
      tr.innerHTML=badges[i]+'</td><td style="font-weight:700;font-size:1rem">'+row.name+'</td><td style="font-family:monospace">'+row.obs+'</td><td style="font-family:monospace;color:'+envCol+'">'+envStr+'</td><td style="font-family:monospace;font-weight:600">'+row.cor+'</td><td style="font-family:monospace;font-weight:700;color:'+ebvCol+';font-size:1rem">'+(row.ebv>0?'+'+row.ebv:row.ebv)+'</td><td style="font-family:monospace;color:'+ebvCol+'">'+(row.dep>0?'+'+row.dep:row.dep)+'</td><td><div class="acc-bar"><div class="acc-track"><div class="acc-fill" style="width:'+row.acc*100+'%;background:'+accColor(row.acc)+'"></div></div><span class="acc-val" style="color:'+accColor(row.acc)+'">'+row.acc.toFixed(2)+'</span></div></td>';
      tr.innerHTML='<td>'+tr.innerHTML;
      tbody.appendChild(tr);
    });
  }
  render();
</script>
"""
    return head + body + script + HTML_FOOT


# ──────────────────────────────────────────────────────────────
# Registro completo dos HTMLs
# ──────────────────────────────────────────────────────────────

ALL_HTMLS = [
    ("M03_frequencias_alelicas_e_genotipicas", "calculator.html",         html_M03),
    ("M04_hardy_weinberg",                     "hwe-calculator.html",     html_M04),
    ("M09_herdabilidade_e_repetibilidade",     "h2-calculator.html",      html_M09),
    ("M10_selecao_e_ganho_genetico",           "selecao-calculator.html", html_M10),
    ("M15_avaliacao_genetica_dep_ebv",         "dep-ebv-ranking.html",    html_M15),
]


def main(base_dir: Path = None, dry_run: bool = False) -> None:
    if base_dir is None:
        base_dir = Path(__file__).resolve().parent.parent

    generated = 0
    for pasta, filename, fn in ALL_HTMLS:
        path = base_dir / pasta / filename
        write_file(path, fn(), dry_run)
        generated += 1

    print(f"  → {generated} HTMLs gerados")


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()
    main(dry_run=args.dry_run)
