#!/usr/bin/env python3
"""
Indexa OCR do Falconer & Mackay em DuckDB.

Uso:
  python engine/scripts/index_falconer.py --cache .ocr-cache/ --output referencias/falconer.duckdb
"""

import argparse
import hashlib
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

import duckdb


STOPWORDS = {
    "the", "and", "for", "that", "with", "this", "from", "are", "was", "were",
    "has", "have", "had", "not", "but", "can", "will", "would", "should",
    "between", "into", "than", "then", "there", "their", "these", "those",
    "which", "when", "where", "what", "also", "only", "more", "less", "such",
    "each", "some", "same", "been", "being", "one", "two", "all", "any",
    "chapter", "fig", "table", "equation", "example", "values", "value",
    "frequency", "frequencies", "population", "populations",
}

CHAPTER_HINTS = {
    1: (14, "Genetic constitution of a population"),
    2: (34, "Changes of gene frequency"),
    3: (62, "Small populations: changes of gene frequency"),
    4: (80, "Small populations: less simplified conditions"),
    5: (96, "Small populations: pedigrees and inbreeding"),
    6: (116, "Continuous variation"),
    7: (124, "Values and means"),
    8: (136, "Variance"),
    9: (160, "Resemblance between relatives"),
    10: (174, "Heritability"),
    11: (198, "Selection: response and prediction"),
    12: (220, "Selection: limits"),
    13: (242, "Selection: more complicated conditions"),
    14: (252, "Inbreeding and crossbreeding: changes of mean"),
    15: (276, "Inbreeding and crossbreeding: changes of variance"),
    16: (294, "Inbreeding and crossbreeding: applications"),
    17: (304, "Scale"),
    18: (314, "Threshold characters"),
    19: (326, "Correlated characters"),
    20: (350, "Metric characters under natural selection"),
}


def load_cache(cache_dir: Path) -> dict:
    files = sorted(cache_dir.glob("*.json"), key=lambda p: p.stat().st_mtime, reverse=True)
    for path in files:
        data = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(data, dict) and data.get("pages"):
            return data
    raise SystemExit(f"Erro: cache OCR não encontrado em {cache_dir}")


def words(text: str) -> list[str]:
    return re.findall(r"[A-Za-z][A-Za-z'-]{2,}", text.lower())


def top_terms(text: str, n: int = 5) -> str:
    terms = [w.strip("'") for w in words(text)]
    terms = [w for w in terms if w not in STOPWORDS and len(w) > 3]
    return ", ".join(term for term, _ in Counter(terms).most_common(n))


def classify_chunk(text: str) -> str:
    lower = text.lower()
    if (
        "=" in text
        or re.search(r"\b(vp|va|vd|vi|ve|h2|h\^2|h²|p\^2|2pq|cov|var)\b", lower)
        or re.search(r"[αβγδσμλ]", text)
    ):
        return "formula"
    if any(marker in lower for marker in ("is defined", "é definido", "means that", "refers to")):
        return "definicao"
    if re.search(r"\b\d+(\.\d+)?\b", text) and any(
        marker in lower for marker in ("example", "data", "mice", "cattle", "sheep", "drosophila", "table")
    ):
        return "exemplo"
    return "discussao"


def detect_chapter_on_page(page_number: int, text: str) -> tuple[int | None, str | None]:
    header = "\n".join(text.splitlines()[:6])
    patterns = [
        r"\bCHAPTER\s+(\d+)\b[:\s-]*(.*)",
        r"\bChapter\s+(\d+)\b[:\s-]*(.*)",
        r"^\s*\d+\s+(\d{1,2})\s+([A-Z][^\n]{4,80})",
        r"^\s*(\d{1,2})\s*\n\s*([A-Z][A-Z :,-]{4,120})",
    ]
    for pattern in patterns:
        match = re.search(pattern, header, re.MULTILINE)
        if not match:
            continue
        number = int(match.group(1))
        if number < 1 or number > 30:
            continue
        if number in CHAPTER_HINTS and abs(page_number - CHAPTER_HINTS[number][0]) > 8:
            continue
        name = match.group(2).strip(" :,-") if len(match.groups()) > 1 else ""
        name = normalize_chapter_name(name)
        if name:
            return number, CHAPTER_HINTS.get(number, (None, name))[1]

    for number, (start_page, name) in sorted(CHAPTER_HINTS.items(), reverse=True):
        if page_number >= start_page:
            return number, name
    return None, None


def normalize_chapter_name(name: str) -> str:
    name = re.sub(r"\s+", " ", name).strip()
    name = re.sub(r"^\d+\s+", "", name)
    if len(name) < 4 or name.lower().startswith(("fig", "table", "example")):
        return ""
    return name[:120]


def detect_chapters(pages: list[dict]) -> dict[int, dict]:
    detected = {}
    for page in pages:
        number, name = detect_chapter_on_page(page["pagina"], page["texto"])
        if not number:
            continue
        current = detected.get(number)
        if current is None or page["pagina"] < current["pagina_inicial"]:
            detected[number] = {
                "capitulo": number,
                "capitulo_nome": name or CHAPTER_HINTS.get(number, (None, f"Chapter {number}"))[1],
                "pagina_inicial": page["pagina"],
            }

    for number, (start_page, name) in CHAPTER_HINTS.items():
        detected.setdefault(number, {
            "capitulo": number,
            "capitulo_nome": name,
            "pagina_inicial": start_page,
        })
    return dict(sorted(detected.items()))


def chapter_for_page(page_number: int, chapters: dict[int, dict]) -> tuple[int, str]:
    selected = None
    for chapter in chapters.values():
        if page_number >= chapter["pagina_inicial"]:
            selected = chapter
    if not selected:
        selected = next(iter(chapters.values()))
    return selected["capitulo"], selected["capitulo_nome"]


def chunk_page(text: str, chunk_size: int = 300, overlap: int = 50) -> list[str]:
    tokens = text.split()
    if len(tokens) < 50:
        return []
    chunks = []
    step = max(1, chunk_size - overlap)
    for start in range(0, len(tokens), step):
        chunk = " ".join(tokens[start:start + chunk_size]).strip()
        if len(chunk.split()) >= 50:
            chunks.append(chunk)
    return chunks


def build_chapter_theme_map(rows: list[dict], chapters: dict[int, dict]) -> dict:
    text_by_chapter = defaultdict(list)
    for row in rows:
        text_by_chapter[row["capitulo"]].append(row["trecho"])

    output = {}
    for number, chapter in chapters.items():
        text = " ".join(text_by_chapter.get(number, []))
        tema = top_terms(text, 5)
        output[str(number)] = {
            "capitulo": number,
            "capitulo_nome": chapter["capitulo_nome"],
            "pagina_inicial": chapter["pagina_inicial"],
            "tema": tema,
        }
    return output


def main() -> None:
    parser = argparse.ArgumentParser(description="Indexa OCR Falconer em DuckDB")
    parser.add_argument("--cache", required=True, help="Diretório .ocr-cache/")
    parser.add_argument("--output", required=True, help="Arquivo DuckDB de saída")
    args = parser.parse_args()

    cache_dir = Path(args.cache)
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)

    data = load_cache(cache_dir)
    pages = sorted(data["pages"], key=lambda p: p["pagina"])
    chapters = detect_chapters(pages)

    rows = []
    row_id = 1
    seen = set()
    for page in pages:
        capitulo, capitulo_nome = chapter_for_page(page["pagina"], chapters)
        for chunk in chunk_page(page["texto"]):
            digest = hashlib.sha256(chunk.encode("utf-8")).hexdigest()
            if digest in seen:
                continue
            seen.add(digest)
            rows.append({
                "id": row_id,
                "pagina": page["pagina"],
                "capitulo": capitulo,
                "capitulo_nome": capitulo_nome,
                "tema": top_terms(chunk, 5),
                "tipo": classify_chunk(chunk),
                "trecho": chunk,
                "sha256": digest,
            })
            row_id += 1

    con = duckdb.connect(str(output))
    con.execute("DROP TABLE IF EXISTS chunks")
    con.execute(
        """
        CREATE TABLE chunks (
            id INTEGER PRIMARY KEY,
            pagina INTEGER,
            capitulo INTEGER,
            capitulo_nome TEXT,
            tema TEXT,
            tipo TEXT,
            trecho TEXT,
            sha256 TEXT
        )
        """
    )
    con.executemany(
        """
        INSERT INTO chunks
        (id, pagina, capitulo, capitulo_nome, tema, tipo, trecho, sha256)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        [
            (
                row["id"], row["pagina"], row["capitulo"], row["capitulo_nome"],
                row["tema"], row["tipo"], row["trecho"], row["sha256"]
            )
            for row in rows
        ],
    )
    con.close()

    chapter_map = build_chapter_theme_map(rows, chapters)
    (output.parent / "capitulos.json").write_text(
        json.dumps(chapter_map, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"Chunks indexados: {len(rows)}")
    print("Capítulos detectados:")
    for chapter in chapters.values():
        print(
            f"- Capítulo {chapter['capitulo']}: {chapter['capitulo_nome']} "
            f"(p. {chapter['pagina_inicial']})"
        )


if __name__ == "__main__":
    main()
