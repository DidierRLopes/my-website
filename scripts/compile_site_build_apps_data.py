"""Inject build-openbb-apps-collection + aggregate blocks into the site's data blob.

Adds two keys to my-website/src/data/workspaceBench.json:
  AUTH: {overall{passed,total,rate}, mean_score, curve:[{level,rate,passed,total}],
         families:[{family,passed,total,rate}], issues:[{code,count}],
         model:"gpt-4.1-mini",
         board:[{slug,label,passed,total,rate,mean,levels:[t0..t4 rates],
                 families:{fam:rate}}],           # one entry per --auth-run
         family_order:[fams, easiest->hardest across board],
         issues_matrix:{codes:[...], counts:{code:[aligned to board order]}}}
  AGG:  {collections:[{name,tasks}], models:[{slug,label,per:{name:{passed,
         total,rate}|null}, pooled:{passed,total,rate}, pending:[names]}]}

The mini-only fields (overall/curve/families/issues) always come from --gate —
that is the certification story. The board comes from --auth-run entries; with a
single entry the site components keep their mini-only rendering.

Usage:
  uv run python scripts/compile_site_build_apps_data.py \
      --gate runs/comparison/build-gpt-4.1-mini/openai-gpt-4.1-mini.json \
      --auth-run openai-gpt-4.1-mini=runs/comparison/build-gpt-4.1-mini/openai-gpt-4.1-mini.json \
      --auth-run openai-gpt-5.5=runs/comparison/build-gpt-5.5/openai-gpt-5.5.json \
      --collections runs/reports/suites.json \
      --site /Users/didierlopes/Documents/git/my-website/src/data/workspaceBench.json
"""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

LABELS = {
    "openai-gpt-5.5": "GPT-5.5",
    "anthropic-sonnet-5": "Sonnet 5",
    "zai-glm-5.2": "GLM-5.2",
    "openai-gpt-4.1-mini": "gpt-4.1-mini",
    "ollama-gpt-oss-20b": "gpt-oss:20b",
    "ollama-qwen3-8b": "Qwen3 8B",
}
# site MODEL_META keys (InteractiveDashboard.jsx) — provider prefix stripped
SHORT = {
    "openai-gpt-5.5": "gpt-5.5",
    "anthropic-sonnet-5": "sonnet-5",
    "zai-glm-5.2": "glm-5.2",
    "openai-gpt-4.1-mini": "gpt-4.1-mini",
    "ollama-gpt-oss-20b": "gpt-oss-20b",
    "ollama-qwen3-8b": "qwen3-8b",
}
ORDER = [
    "openai-gpt-5.5", "anthropic-sonnet-5", "zai-glm-5.2",
    "openai-gpt-4.1-mini", "ollama-gpt-oss-20b", "ollama-qwen3-8b",
]
LEVELS = ["t0", "t1", "t2", "t3", "t4"]


def summarize(rows: list[dict]) -> dict:
    levels: dict[str, list[int]] = defaultdict(lambda: [0, 0])
    families: dict[str, list[int]] = defaultdict(lambda: [0, 0])
    issues: Counter = Counter()
    passed = 0
    score_sum = 0.0
    for row in rows:
        match = re.match(r"auth_(t\d)_([a-z0-9]+)_", row["id"])
        ok = bool(row["passed"])
        passed += ok
        score_sum += float(row.get("score") or 0.0)
        levels[match.group(1)][1] += 1
        levels[match.group(1)][0] += ok
        families[match.group(2)][1] += 1
        families[match.group(2)][0] += ok
        if not ok:
            for issue in row.get("issues") or []:
                if isinstance(issue, dict):
                    issues[issue.get("code", "?")] += 1
    return {
        "passed": passed,
        "total": len(rows),
        "mean": round(100 * score_sum / len(rows), 1),
        "levels": levels,
        "families": families,
        "issues": issues,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--gate", required=True)
    parser.add_argument(
        "--auth-run", action="append", default=[], metavar="SLUG=RESULT_JSON",
        help="per-model building result json for the board (repeatable)",
    )
    parser.add_argument("--collections", required=True)
    parser.add_argument("--site", required=True)
    parser.add_argument(
        "--staircase", default=None,
        help="proxy acceptance-run result json (the staircase that froze the pack)",
    )
    parser.add_argument(
        "--pack-dir", default=None,
        help="task directory; when set, AUTH.tx gains per-task prompt + rubric",
    )
    args = parser.parse_args()

    gate = json.loads(Path(args.gate).read_text())
    g = summarize(gate["results"])
    auth = {
        "model": "gpt-4.1-mini",
        "overall": {"passed": g["passed"], "total": g["total"],
                    "rate": round(100 * g["passed"] / g["total"], 1)},
        "mean_score": g["mean"],
        "curve": [
            {"level": level, "passed": p, "total": t, "rate": round(100 * p / t, 1)}
            for level, (p, t) in sorted(g["levels"].items())
        ],
        "families": sorted(
            (
                {"family": fam, "passed": p, "total": t,
                 "rate": round(100 * p / t, 1)}
                for fam, (p, t) in g["families"].items()
            ),
            key=lambda item: -item["rate"],
        ),
        "issues": [
            {"code": code, "count": count}
            for code, count in g["issues"].most_common(8)
        ],
    }

    # ---- the acceptance staircase (free proxy run that froze the pack)
    if args.staircase:
        stair = json.loads(Path(args.staircase).read_text())
        st = summarize(stair["results"])
        auth["staircase"] = {
            "model": "gpt-oss:20b (local proxy)",
            "curve": [
                {"level": level, "passed": p, "total": t,
                 "rate": round(100 * p / t, 1)}
                for level, (p, t) in sorted(st["levels"].items())
            ],
        }

    # ---- multi-model board (ORDER-aligned; single entry = mini-only site view)
    runs: dict[str, dict] = {}
    for spec in args.auth_run:
        slug, _, path = spec.partition("=")
        payload = json.loads(Path(path).read_text())
        runs[slug] = summarize(payload["results"])
    board = []
    for slug in ORDER:
        if slug not in runs:
            continue
        s = runs[slug]
        board.append({
            "slug": SHORT.get(slug, slug),
            "label": LABELS.get(slug, slug),
            "passed": s["passed"],
            "total": s["total"],
            "rate": round(100 * s["passed"] / s["total"], 1),
            "mean": s["mean"],
            "levels": [
                round(100 * s["levels"][t][0] / s["levels"][t][1], 1)
                for t in LEVELS
            ],
            "families": {
                fam: round(100 * p / t, 1)
                for fam, (p, t) in s["families"].items()
            },
        })
    if board:
        fams = sorted(
            {fam for entry in board for fam in entry["families"]},
            key=lambda fam: -sum(e["families"].get(fam, 0) for e in board),
        )
        auth["family_order"] = fams
        totals: Counter = Counter()
        for slug in runs:
            totals.update(runs[slug]["issues"])
        codes = [code for code, _ in totals.most_common(6)]
        ordered = [slug for slug in ORDER if slug in runs]
        auth["board"] = board
        auth["issues_matrix"] = {
            "codes": codes,
            "counts": {
                code: [runs[slug]["issues"].get(code, 0) for slug in ordered]
                for code in codes
            },
        }

    # ---- clickable task explorer: per-task verdicts + prompt + rubric
    if args.pack_dir and board:
        ordered = [slug for slug in ORDER if slug in runs]
        raw_runs = {}
        for spec in args.auth_run:
            slug, _, path = spec.partition("=")
            raw_runs[slug] = {
                r["id"]: r for r in json.loads(Path(path).read_text())["results"]
            }
        tasks = []
        for f in sorted(Path(args.pack_dir).glob("auth_*.json")):
            sc = json.loads(f.read_text())
            match = re.match(r"auth_(t\d)_([a-z0-9]+)_", sc["id"])
            entry = {
                "id": sc["id"],
                "f": match.group(2),
                "t": match.group(1),
                "d": sc.get("difficulty", ""),
                "title": sc.get("title", ""),
                "prompt": sc["prompt"],
                "rubric": sc["success"],
                "turns": sc.get("limits", {}).get("max_turns"),
                "p": [], "s": [], "i": [],
            }
            for slug in ordered:
                r = raw_runs[slug].get(sc["id"])
                entry["p"].append(1 if r and r["passed"] else 0)
                entry["s"].append(round(100 * (r["score"] if r else 0)))
                first = (r or {}).get("issues") or []
                entry["i"].append(first[0]["code"] if (r and not r["passed"] and first) else "")
            tasks.append(entry)
        tasks.sort(key=lambda e: (e["t"], e["f"], e["id"]))
        auth["tx"] = {
            "labels": [LABELS.get(s2, s2) for s2 in ordered],
            "short": [SHORT.get(s2, s2) for s2 in ordered],
            "tasks": tasks,
        }

    report = json.loads(Path(args.collections).read_text())
    suite_names = list(report["suites"])
    agg_models = []
    for slug in ORDER:
        if slug not in report["aggregate"]:
            continue
        agg = report["aggregate"][slug]
        per = {}
        for name in suite_names:
            summary = report["suites"][name]["models"].get(slug)
            per[name] = (
                {"passed": summary["passed"], "total": summary["total"],
                 "rate": round(100 * summary["strict_pass_rate"], 1)}
                if summary else None
            )
        agg_models.append({
            "slug": slug,
            "label": LABELS.get(slug, slug),
            "per": per,
            "pooled": {"passed": agg["passed"], "total": agg["total"],
                       "rate": round(100 * agg["strict_pass_rate"], 1)},
            "pending": agg["suites_pending"],
        })
    agg_block = {
        "suites": [
            {"name": name, "tasks": report["suites"][name]["tasks"]}
            for name in suite_names
        ],
        "models": agg_models,
    }

    site_path = Path(args.site)
    site = json.loads(site_path.read_text())
    site["AUTH"] = auth
    site["AGG"] = agg_block
    # building grader codes — only fill gaps, never overwrite part-1 meanings
    building_meanings = {
        "missing_custom_backend": "the built backend never landed — manage_backends add/refresh missing or rejected",
        "missing_widget_def": "a required widget definition is absent from the served widgets.json",
        "widget_def_mismatch": "a widget definition field differs from the brief (endpoint, params, columns, grid…)",
        "missing_app_def": "a required app definition is absent from the served apps.json",
        "app_def_mismatch": "an app definition field differs from the brief (tabs, groups, placement…)",
        "app_layout_ref_invalid": "an app tab layout references a widget id the backend does not serve",
        "app_layout_overlap": "two widgets in a built app tab occupy overlapping grid cells",
    }
    meanings = site.setdefault("issueMeaning", {})
    for code, meaning in building_meanings.items():
        meanings.setdefault(code, meaning)
    site_path.write_text(json.dumps(site, separators=(",", ":")))
    print(f"Injected AUTH + AGG into {site_path}")
    print("AUTH overall:", auth["overall"], "| curve:",
          [(c["level"], c["rate"]) for c in auth["curve"]])
    if board:
        print("AUTH board:",
              [(b["slug"], f"{b['rate']}%") for b in auth["board"]])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
