from __future__ import annotations

from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
import html
import shutil


ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "01-logo" / "PNG" / "mgenetica-logo-principal.png"
OUT = ROOT / "02-slides"


NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
}


def content_types(n: int) -> str:
    overrides = "\n".join(
        f'<Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>'
        for i in range(1, n + 1)
    )
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  {overrides}
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>'''


def root_rels() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>'''


def presentation(n: int, cx: int, cy: int) -> str:
    slides = "\n".join(
        f'<p:sldId id="{255 + i}" r:id="rId{i}"/>' for i in range(1, n + 1)
    )
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="{NS["a"]}" xmlns:r="{NS["r"]}" xmlns:p="{NS["p"]}">
  <p:sldIdLst>{slides}</p:sldIdLst>
  <p:sldSz cx="{cx}" cy="{cy}" type="screen4x3"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>'''


def presentation_rels(n: int) -> str:
    rels = "\n".join(
        f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{i}.xml"/>'
        for i in range(1, n + 1)
    )
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{rels}</Relationships>'''


def slide_rels() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/logo.png"/>
</Relationships>'''


def solid_rect(color: str, cx: int, cy: int) -> str:
    return f'''<p:sp>
  <p:nvSpPr><p:cNvPr id="2" name="Background"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
  <p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="{color}"/></a:solidFill><a:ln><a:noFill/></a:ln></p:spPr>
</p:sp>'''


def text_box(idx: int, text: str, x: int, y: int, w: int, h: int, size: int, color: str, bold: bool = False) -> str:
    escaped = html.escape(text)
    b = "<a:b/>" if bold else ""
    return f'''<p:sp>
  <p:nvSpPr><p:cNvPr id="{idx}" name="Text {idx}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
  <p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr>
  <p:txBody><a:bodyPr wrap="square"/><a:lstStyle/><a:p><a:r><a:rPr lang="pt-BR" sz="{size}" dirty="0">{b}<a:solidFill><a:srgbClr val="{color}"/></a:solidFill><a:latin typeface="DM Sans"/></a:rPr><a:t>{escaped}</a:t></a:r></a:p></p:txBody>
</p:sp>'''


def picture(idx: int, x: int, y: int, w: int, h: int) -> str:
    return f'''<p:pic>
  <p:nvPicPr><p:cNvPr id="{idx}" name="Logo MGenética"/><p:cNvPicPr/><p:nvPr/></p:nvPicPr>
  <p:blipFill><a:blip r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
  <p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:ln><a:noFill/></a:ln></p:spPr>
</p:pic>'''


def slide_xml(title: str, subtitle: str, dark: bool, cx: int, cy: int) -> str:
    bg = "0A1F38" if dark else "FFFFFF"
    title_color = "FFFFFF" if dark else "0A1F38"
    sub_color = "D6F1F9" if dark else "5A7391"
    accent = "00A8D6"
    shapes = [
        solid_rect(bg, cx, cy),
        text_box(3, "MGenética", 650000, 520000, 2200000, 350000, 1300, accent, True),
        text_box(4, title, 650000, 1450000, int(cx * 0.60), 1400000, 3100, title_color, True),
        text_box(5, subtitle, 650000, 3050000, int(cx * 0.58), 850000, 1450, sub_color, False),
        picture(6, int(cx * 0.70), int(cy * 0.20), int(cx * 0.18), int(cx * 0.18)),
    ]
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="{NS["a"]}" xmlns:r="{NS["r"]}" xmlns:p="{NS["p"]}">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/><p:spPr/>
    {"".join(shapes)}
  </p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>'''


def app_props() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>MGenética House Style</Application></Properties>'''


def core_props() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>MGenética Slides</dc:title><dc:creator>MGenética</dc:creator></cp:coreProperties>'''


def build(name: str, cx: int, cy: int) -> None:
    slides = [
        ("Ciência aplicada ao rebanho.", "Curso, consultoria e comunicação técnica.", True),
        ("Componentes de variância", "Separar efeito genético e ambiente muda a decisão de seleção.", False),
        ("Da herdabilidade ao ganho genético", "Interprete parâmetro, incerteza e consequência prática antes de recomendar.", False),
    ]
    out = OUT / name
    with ZipFile(out, "w", ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types(len(slides)))
        z.writestr("_rels/.rels", root_rels())
        z.writestr("ppt/presentation.xml", presentation(len(slides), cx, cy))
        z.writestr("ppt/_rels/presentation.xml.rels", presentation_rels(len(slides)))
        z.writestr("docProps/app.xml", app_props())
        z.writestr("docProps/core.xml", core_props())
        z.write(LOGO, "ppt/media/logo.png")
        for i, (title, subtitle, dark) in enumerate(slides, start=1):
            z.writestr(f"ppt/slides/slide{i}.xml", slide_xml(title, subtitle, dark, cx, cy))
            z.writestr(f"ppt/slides/_rels/slide{i}.xml.rels", slide_rels())


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    build("MGenetica Slides 16.9.pptx", 12192000, 6858000)
    build("MGenetica Slides 4.3.pptx", 9144000, 6858000)


if __name__ == "__main__":
    main()
