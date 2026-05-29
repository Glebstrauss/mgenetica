#!/usr/bin/env python3
"""
generate_all.py
Orquestrador: executa todos os geradores de artefatos visuais do curso MGenética.

Uso:
    python scripts/generate_all.py [--dry-run]

Flags:
    --dry-run   Lista os arquivos que seriam gerados sem escrevê-los.
"""

import sys
import argparse
from pathlib import Path

# O diretório raiz do pacote de artefatos (pai de scripts/)
BASE_DIR = Path(__file__).resolve().parent.parent


def parse_args():
    p = argparse.ArgumentParser(description="Gera artefatos visuais do curso MGenética")
    p.add_argument("--dry-run", action="store_true", help="Lista arquivos sem escrever")
    p.add_argument("--only", choices=["svgs", "html", "meta"], help="Rodar apenas um gerador")
    return p.parse_args()


def run_generator(module_name: str, dry_run: bool):
    """Importa e executa um módulo gerador."""
    scripts_dir = Path(__file__).resolve().parent
    sys.path.insert(0, str(scripts_dir))
    mod = __import__(module_name)
    mod.main(base_dir=BASE_DIR, dry_run=dry_run)


def main():
    args = parse_args()
    dry = args.dry_run
    label = " [DRY RUN]" if dry else ""

    generators = {
        "svgs": "generate_svgs",
        "html": "generate_html",
        "meta": "generate_meta",
    }

    targets = [args.only] if args.only else list(generators.keys())

    for key in targets:
        print(f"\n{'─'*50}")
        print(f"  {generators[key]}.py{label}")
        print(f"{'─'*50}")
        run_generator(generators[key], dry_run=dry)

    if not dry:
        print(f"\n✓ Concluído — artefatos em: {BASE_DIR}")
    else:
        print(f"\n[DRY RUN] Nenhum arquivo foi escrito.")


if __name__ == "__main__":
    main()
