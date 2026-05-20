#!/usr/bin/env python3
"""
Consulta trechos relevantes do Falconer & Mackay indexados em DuckDB.

Uso:
  python engine/scripts/read_falconer.py --db referencias/falconer.duckdb \
    --topicos "heritability additive variance selection response" --max 4
"""

import argparse
import json
import math
import re
import unicodedata
from pathlib import Path

import duckdb


STOPWORDS = {
    "a", "an", "the", "and", "or", "of", "to", "in", "on", "for", "with",
    "by", "as", "is", "are", "was", "were", "be", "been", "being", "that",
    "this", "these", "those", "um", "uma", "de", "da", "do", "das", "dos",
    "e", "ou", "em", "para", "com", "por", "como", "que", "o", "a", "os", "as",
}

TERM_EXPANSIONS = {
    "herdabilidad": ["heritability"],
    "varianc": ["variance"],
    "genetic": ["genetic"],
    "aditiv": ["additive"],
    "aditividade": ["additive", "additivity"],
    "dominanc": ["dominance", "dominant"],
    "dominancia": ["dominance", "dominant"],
    "epistasi": ["epistasis", "epistatic"],
    "selecao": ["selection"],
    "seleca": ["selection"],
    "respost": ["response"],
    "mutacao": ["mutation", "mutant"],
    "mutaca": ["mutation", "mutant"],
    "migracao": ["migration", "migrant"],
    "migraca": ["migration", "migrant"],
    "deriva": ["drift"],
    "tamanho": ["size"],
    "efetivo": ["effective"],
    "frequenc": ["frequency"],
    "frequencia": ["frequency"],
    "alel": ["allele", "gene"],
    "endogami": ["inbreeding"],
    "parentesc": ["relationship"],
    "cruzament": ["crossbreeding", "crossing"],
    "sobredominanc": ["overdominance", "heterozygote"],
    "fenotip": ["phenotypic"],
    "genotip": ["genotypic", "genotype"],
}


def normalize(text: str) -> str:
    lowered = text.lower()
    return "".join(
        ch for ch in unicodedata.normalize("NFKD", lowered)
        if not unicodedata.combining(ch)
    )


def stem(term: str) -> str:
    term = normalize(term)
    term = re.sub(r"[^a-z0-9]+", "", term)
    for suffix in ("mente", "idades", "idade", "acoes", "ções", "tion", "ions", "ing", "ed", "es", "s"):
        if len(term) > len(suffix) + 3 and term.endswith(suffix):
            return term[:-len(suffix)]
    return term


def search_terms(topicos: str) -> list[str]:
    raw = re.findall(r"[A-Za-zÀ-ÿ0-9]+", normalize(topicos))
    terms = []
    seen = set()
    for item in raw:
        item = stem(item)
        if not item or item in STOPWORDS or len(item) <= 2:
            continue
        candidates = [item]
        candidates.extend(TERM_EXPANSIONS.get(item, []))
        for candidate in candidates:
            key = stem(candidate)
            if key and key not in seen:
                terms.append(key)
                seen.add(key)
    if len(terms) > 4:
        terms = [term for term in terms if term not in {"genetica", "genetic"}]
    return terms


def score_chunk(text: str, tipo: str, terms: list[str]) -> float:
    normalized = normalize(text)
    words = re.findall(r"[a-z0-9]+", normalized)
    if not words:
        return 0.0
    hits = 0
    for term in terms:
        hits += sum(1 for word in words if word.startswith(term))
    score = hits / math.sqrt(len(words))
    if tipo in {"formula", "definicao"}:
        score += 0.5
    return score


def query(db_path: Path, topicos: str, limit: int) -> list[dict]:
    terms = search_terms(topicos)
    if not terms:
        return []

    con = duckdb.connect(str(db_path), read_only=True)
    rows = con.execute(
        """
        SELECT pagina, capitulo, capitulo_nome, tipo, trecho
        FROM chunks
        """
    ).fetchall()
    con.close()

    scored = []
    for pagina, capitulo, capitulo_nome, tipo, trecho in rows:
        lower = normalize(trecho)
        if pagina < 14 or pagina >= 370:
            continue
        if lower.startswith(("contents", "index", "solutions")):
            continue
        score = score_chunk(trecho, tipo, terms)
        if score > 0.5:
            scored.append({
                "pagina": pagina,
                "capitulo": capitulo,
                "capitulo_nome": capitulo_nome,
                "tipo": tipo,
                "trecho": trecho[:900],
                "score": round(score, 3),
                "referencia_curta": "Falconer & Mackay (1996)",
            })

    scored.sort(key=lambda item: item["score"], reverse=True)
    selected = []
    used_pages = set()
    for item in scored:
        page = item["pagina"]
        if page in used_pages or page - 1 in used_pages or page + 1 in used_pages:
            continue
        selected.append(item)
        used_pages.add(page)
        if len(selected) >= limit:
            break
    return selected


def format_text(rows: list[dict]) -> str:
    blocks = []
    for i, row in enumerate(rows, 1):
        blocks.append(
            f"[{i}] Falconer & Mackay (1996), p.{row['pagina']} — "
            f"Capítulo {row['capitulo']}: {row['capitulo_nome']}"
        )
        blocks.append(row["trecho"])
        blocks.append("")
    return "\n".join(blocks).strip()


def main() -> None:
    parser = argparse.ArgumentParser(description="Consulta índice Falconer")
    parser.add_argument("--db", required=True, help="Banco DuckDB Falconer")
    parser.add_argument("--topicos", required=True, help="Tópicos de busca")
    parser.add_argument("--max", type=int, default=4, help="Máximo de trechos")
    parser.add_argument("--formato", choices=["texto", "json"], default="texto")
    args = parser.parse_args()

    rows = query(Path(args.db), args.topicos, args.max)
    if args.formato == "json":
        print(json.dumps(rows, ensure_ascii=False, indent=2))
    else:
        print(format_text(rows))


if __name__ == "__main__":
    main()
