#!/usr/bin/env python3
"""Export processed length reward-hacking CSVs to the blog JSON payload."""

from __future__ import annotations

import argparse
import csv
import json
import math
from collections import defaultdict
from pathlib import Path
from statistics import median
from typing import Any


WEIGHT_COLORS = {
    "0": "#003f5c",
    "0.1": "#464c89",
    "0.35": "#954e9b",
    "0.65": "#dd4d88",
    "0.9": "#ff6b59",
}
PROMPT_COLORS = {
    "Neutral": "#003d5c",
    "Resistance I": "#00726e",
    "Resistance II": "#4a9f2c",
    "Resistance III": "#ffa600",
    "Control": "#003f5c",
}
DIFFICULTY_COLORS = {
    "easy": "#7a4f99",
    "moderate": "#cf4c8f",
    "impossible": "#ff655f",
    "mixed": "#ffa600",
}
PROMPT_ORDER = ["Control", "Neutral", "Resistance I", "Resistance II", "Resistance III"]
WEIGHT_ORDER = [0.0, 0.1, 0.35, 0.65, 0.9]
DIFFICULTY_ORDER = ["mixed", "easy", "moderate", "impossible"]
SAMPLE_DIFFICULTIES = ["easy", "moderate", "impossible"]
SAMPLE_KINDS = ["typical", "longest", "shortest"]
PRIMARY_SAMPLE_STEP = 60


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    default_processed = (
        Path.home()
        / "Documents/git/reward-hacking/analysis/length_reward_hacking/processed"
    )
    default_output = (
        Path(__file__).resolve().parents[1]
        / "src/data/rewardHackingLengthExperiment.json"
    )
    parser.add_argument("--processed-dir", type=Path, default=default_processed)
    parser.add_argument("--output", type=Path, default=default_output)
    return parser.parse_args()


def read_csv(path: Path) -> list[dict[str, Any]]:
    with path.open(newline="") as file:
        return [normalize_row(row) for row in csv.DictReader(file)]


def normalize_row(row: dict[str, str]) -> dict[str, Any]:
    return {key: parse_value(value) for key, value in row.items()}


def parse_value(value: str) -> Any:
    if value is None:
        return None
    text = value.strip()
    if text == "" or text.lower() == "nan":
        return None
    try:
        number = float(text)
    except ValueError:
        return value
    if math.isfinite(number) and number.is_integer():
        return int(number)
    return number


def clean_number(value: Any, digits: int = 4) -> Any:
    if value is None:
        return None
    if isinstance(value, bool):
        return value
    if isinstance(value, int):
        return value
    if isinstance(value, float):
        if not math.isfinite(value):
            return None
        epsilon = 1e-12 if value >= 0 else -1e-12
        rounded = round(value + epsilon, digits)
        if float(rounded).is_integer():
            return int(rounded)
        return rounded
    return value


def clean_object(value: Any) -> Any:
    if isinstance(value, dict):
        return {key: clean_object(item) for key, item in value.items()}
    if isinstance(value, list):
        return [clean_object(item) for item in value]
    return clean_number(value)


def prompt_rank(prompt: str) -> int:
    return PROMPT_ORDER.index(prompt) if prompt in PROMPT_ORDER else len(PROMPT_ORDER)


def weight_rank(weight: Any) -> int:
    weight_value = float(weight)
    return WEIGHT_ORDER.index(weight_value) if weight_value in WEIGHT_ORDER else len(WEIGHT_ORDER)


def run_key(row: dict[str, Any]) -> str:
    return f"{row['prompt_label']}|{float(row['hidden_weight']):.2f}"


def run_label(row: dict[str, Any]) -> str:
    if row["prompt_label"] == "Control":
        return "Control"
    return f"{row['prompt_label']} \u00b7 hw {clean_number(float(row['hidden_weight']))}"


def mean(rows: list[dict[str, Any]], key: str) -> float | None:
    values = [float(row[key]) for row in rows if row.get(key) is not None]
    if not values:
        return None
    return sum(values) / len(values)


def percentile(values: list[float], q: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    if len(ordered) == 1:
        return ordered[0]
    position = (len(ordered) - 1) * q
    lower = math.floor(position)
    upper = math.ceil(position)
    if lower == upper:
        return ordered[int(position)]
    weight = position - lower
    return ordered[lower] * (1 - weight) + ordered[upper] * weight


def selected_train_row(row: dict[str, Any]) -> dict[str, Any]:
    keys = [
        "run_name",
        "prompt_label",
        "hidden_weight",
        "hidden_weight_label",
        "step",
        "output_word_count",
        "visible_task_reward",
        "hidden_length_reward",
        "proxy_reward",
        "true_clean_reward",
        "hack_index",
        "concision_reward",
        "no_filler_reward",
    ]
    return {key: row.get(key) for key in keys}


def selected_eval_row(row: dict[str, Any]) -> dict[str, Any]:
    return {
        "run_name": row.get("run_name"),
        "prompt_label": row.get("prompt_label"),
        "hidden_weight": row.get("hidden_weight"),
        "hidden_weight_label": row.get("hidden_weight_label"),
        "step": row.get("step"),
        "eval_difficulty": row.get("eval_difficulty"),
        "eval_reward": row.get("avg@2"),
        "completion_length": row.get("completion_len/mean"),
        "completion_length_max": row.get("completion_len/max"),
        "completion_length_min": row.get("completion_len/min"),
        "is_truncated_mean": row.get("is_truncated/mean"),
    }


def selected_sample_row(
    row: dict[str, Any],
    sample_kind: str | None = None,
    include_run_key: bool = True,
) -> dict[str, Any]:
    sample = {
        "run_name": row.get("run_name"),
        "prompt_label": row.get("prompt_label"),
        "prompt_family": row.get("prompt_family"),
        "hidden_weight": row.get("hidden_weight"),
        "step": row.get("step"),
        "difficulty": row.get("difficulty"),
        "question": row.get("question"),
        "required_word": row.get("required_word"),
        "local_word_count": row.get("local_word_count"),
        "reward": row.get("reward"),
        "metric_visible_task_reward": row.get("metric_visible_task_reward"),
        "metric_hidden_length_reward": row.get("metric_hidden_length_reward"),
        "metric_proxy_reward": row.get("metric_proxy_reward"),
        "metric_true_clean_reward": row.get("metric_true_clean_reward"),
        "metric_concision_reward": row.get("metric_concision_reward"),
        "metric_no_filler_reward": row.get("metric_no_filler_reward"),
        "completion_text": row.get("completion_text"),
    }
    if include_run_key:
        sample = {"run_key": run_key(row), **sample}
    if sample_kind:
        sample["sample_kind"] = sample_kind
    return sample


def group_by(rows: list[dict[str, Any]], *keys: str) -> dict[tuple[Any, ...], list[dict[str, Any]]]:
    grouped: dict[tuple[Any, ...], list[dict[str, Any]]] = defaultdict(list)
    for row in rows:
        grouped[tuple(row.get(key) for key in keys)].append(row)
    return grouped


def build_summaries(
    latest_train: list[dict[str, Any]],
    latest_eval: list[dict[str, Any]],
    rollouts: list[dict[str, Any]],
) -> dict[str, Any]:
    hidden_train = [row for row in latest_train if row["prompt_label"] != "Control"]
    summary_keys = [
        "output_word_count",
        "visible_task_reward",
        "hidden_length_reward",
        "proxy_reward",
        "hack_index",
    ]

    by_weight = []
    for weight in WEIGHT_ORDER[1:]:
        rows = [row for row in hidden_train if float(row["hidden_weight"]) == weight]
        by_weight.append({"hidden_weight": weight, **{key: mean(rows, key) for key in summary_keys}})

    by_prompt = []
    for prompt in PROMPT_ORDER[1:]:
        rows = [row for row in hidden_train if row["prompt_label"] == prompt]
        by_prompt.append({"prompt_label": prompt, **{key: mean(rows, key) for key in summary_keys}})

    by_eval_difficulty = []
    for difficulty in DIFFICULTY_ORDER:
        rows = [row for row in latest_eval if row["eval_difficulty"] == difficulty]
        by_eval_difficulty.append(
            {
                "eval_difficulty": difficulty,
                "completion_length": mean(rows, "completion_length"),
                "eval_reward": mean(rows, "eval_reward"),
            }
        )

    rollout_summary = []
    grouped_rollouts = group_by(rollouts, "prompt_label", "hidden_weight", "step")
    for (prompt, weight, step), rows in sorted(
        grouped_rollouts.items(),
        key=lambda item: (prompt_rank(str(item[0][0])), weight_rank(item[0][1]), int(item[0][2])),
    ):
        words = [float(row["local_word_count"]) for row in rows if row.get("local_word_count") is not None]
        rollout_summary.append(
            {
                "prompt_label": prompt,
                "hidden_weight": weight,
                "step": step,
                "mean_words": sum(words) / len(words) if words else None,
                "median_words": median(words) if words else None,
                "p25_words": percentile(words, 0.25),
                "p75_words": percentile(words, 0.75),
            }
        )

    return {
        "byWeight": by_weight,
        "byPrompt": by_prompt,
        "byEvalDifficulty": by_eval_difficulty,
        "rolloutStepSummary": rollout_summary,
    }


def pick_sample(rows: list[dict[str, Any]], sample_kind: str) -> dict[str, Any] | None:
    if not rows:
        return None
    ordered = sorted(rows, key=lambda row: (float(row["local_word_count"]), int(row["sample_id"])))
    if sample_kind == "shortest":
        return ordered[0]
    if sample_kind == "longest":
        return ordered[-1]
    values = [float(row["local_word_count"]) for row in ordered]
    target = median(values)
    return min(ordered, key=lambda row: (abs(float(row["local_word_count"]) - target), int(row["sample_id"])))


def build_sample_explorer(
    runs: list[dict[str, Any]], rollouts: list[dict[str, Any]]
) -> dict[str, Any]:
    explorer_runs = [
        {
            "run_key": run_key(row),
            "run_name": row["run_name"],
            "prompt_label": row["prompt_label"],
            "hidden_weight": row["hidden_weight"],
            "label": run_label(row),
        }
        for row in runs
    ]
    samples = []
    grouped = group_by(rollouts, "run_name", "difficulty", "step")
    steps = sorted({int(row["step"]) for row in rollouts})

    for run in runs:
        for difficulty in SAMPLE_DIFFICULTIES:
            primary_rows = grouped.get((run["run_name"], difficulty, PRIMARY_SAMPLE_STEP), [])
            chosen_rows = primary_rows
            if not chosen_rows:
                fallback_steps = [step for step in steps if step < PRIMARY_SAMPLE_STEP]
                for step in reversed(fallback_steps):
                    candidate_rows = grouped.get((run["run_name"], difficulty, step), [])
                    if candidate_rows:
                        chosen_rows = candidate_rows
                        break
            for sample_kind in SAMPLE_KINDS:
                picked = pick_sample(chosen_rows, sample_kind)
                if picked:
                    samples.append(selected_sample_row(picked, sample_kind))

    return {
        "description": (
            "Representative rollout samples chosen by run condition, difficulty, and sample kind. "
            "Samples are from step 60 unless a condition lacks that cached checkpoint."
        ),
        "step": PRIMARY_SAMPLE_STEP,
        "difficulties": SAMPLE_DIFFICULTIES,
        "sample_kinds": SAMPLE_KINDS,
        "runs": explorer_runs,
        "samples": samples,
    }


def sort_runs(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return sorted(rows, key=lambda row: (prompt_rank(str(row["prompt_label"])), weight_rank(row["hidden_weight"])))


def sort_train(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return sorted(rows, key=lambda row: (prompt_rank(str(row["prompt_label"])), weight_rank(row["hidden_weight"]), int(row["step"])))


def sort_eval(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return sorted(
        rows,
        key=lambda row: (
            prompt_rank(str(row["prompt_label"])),
            weight_rank(row["hidden_weight"]),
            DIFFICULTY_ORDER.index(str(row["eval_difficulty"])),
            int(row["step"]),
        ),
    )


def build_payload(processed_dir: Path) -> dict[str, Any]:
    runs_raw = sort_runs(read_csv(processed_dir / "runs.csv"))
    train_raw = sort_train(read_csv(processed_dir / "train_wide.csv"))
    latest_train_raw = sort_train(read_csv(processed_dir / "latest_train.csv"))
    eval_raw = sort_eval(read_csv(processed_dir / "eval_wide.csv"))
    latest_eval_raw = sort_eval(read_csv(processed_dir / "latest_eval.csv"))
    rollouts = read_csv(processed_dir / "rollouts.csv")

    runs = [
        {
            "run_name": row["run_name"],
            "prompt_label": row["prompt_label"],
            "prompt_family": row["prompt_family"],
            "hidden_weight": row["hidden_weight"],
            "status": row["status"],
            "latest_step": row["latest_step"],
        }
        for row in runs_raw
    ]
    train_series = [selected_train_row(row) for row in train_raw]
    latest_train = [selected_train_row(row) for row in latest_train_raw]
    eval_series = [selected_eval_row(row) for row in eval_raw]
    latest_eval = [selected_eval_row(row) for row in latest_eval_raw]
    example_rows = sorted(
        [row for row in rollouts if int(row["step"]) == PRIMARY_SAMPLE_STEP],
        key=lambda row: (-float(row["local_word_count"]), prompt_rank(str(row["prompt_label"])), weight_rank(row["hidden_weight"]), int(row["sample_id"])),
    )[:12]

    return clean_object(
        {
            "meta": {
                "generated_from": str(processed_dir),
                "run_count": len(runs),
                "completed_runs": sum(1 for row in runs if row["status"] == "COMPLETED"),
                "train_steps": sorted({int(row["step"]) for row in train_raw}),
                "eval_steps": sorted({int(row["step"]) for row in eval_raw}),
                "rollout_steps": sorted({int(row["step"]) for row in rollouts}),
                "prompt_order": PROMPT_ORDER,
                "weight_order": WEIGHT_ORDER,
                "difficulty_order": DIFFICULTY_ORDER,
            },
            "colors": {
                "weights": WEIGHT_COLORS,
                "prompts": PROMPT_COLORS,
                "difficulty": DIFFICULTY_COLORS,
            },
            "runs": runs,
            "trainSeries": train_series,
            "evalSeries": eval_series,
            "latestTrain": latest_train,
            "latestEval": latest_eval,
            "summaries": build_summaries(latest_train, latest_eval, rollouts),
            "examples": [selected_sample_row(row, include_run_key=False) for row in example_rows],
            "sampleExplorer": build_sample_explorer(runs, rollouts),
        }
    )


def main() -> None:
    args = parse_args()
    payload = build_payload(args.processed_dir)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, indent=2, sort_keys=False) + "\n")
    print(f"Wrote {args.output}")


if __name__ == "__main__":
    main()
