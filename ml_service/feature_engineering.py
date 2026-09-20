"""
AlgoQuest ML Recommendation Service — Feature Engineering Pipeline
Extracts, normalizes, and aggregates student telemetry features from raw problem submissions
or pre-aggregated telemetry profiles.
"""

from typing import List, Dict, Any, Optional
import pandas as pd
import numpy as np

# Canonical DSA tracks matching AlgoQuest AI
CANONICAL_TOPICS = [
    "Variables",
    "Arrays",
    "Strings",
    "Linked List",
    "Stack",
    "Queue",
    "Trees",
    "Graphs",
]

# Topic canonical display names
TOPIC_CANONICAL_NAMES = {
    "Variables": "Programming Fundamentals",
    "Arrays": "Arrays",
    "Strings": "Strings",
    "Linked List": "Linked Lists",
    "Stack": "Stacks",
    "Queue": "Queues",
    "Trees": "Trees",
    "Graphs": "Graphs",
}

# Primary DSA patterns per topic
TOPIC_PRIMARY_PATTERNS = {
    "Variables": ["Basic Operations", "Conditionals", "Loops", "Math"],
    "Arrays": ["Two Pointers", "Hashing", "Sliding Window", "Array Traversal", "Array Manipulation", "Prefix Sum", "Binary Search", "Kadane's Algorithm"],
    "Strings": ["Two Pointers", "Hashing", "Sliding Window", "String Manipulation"],
    "Linked List": ["Fast and Slow Pointers", "Pointer Manipulation", "Reversal", "Two Pointers"],
    "Stack": ["Monotonic Stack", "Expression Evaluation", "Stack Operations"],
    "Queue": ["BFS", "Sliding Window", "Queue Operations"],
    "Trees": ["DFS", "BFS", "Recursion", "Tree Traversal"],
    "Graphs": ["BFS", "DFS", "Shortest Path", "Graph Traversal"],
}

# Ordered list of tabular feature columns used by the scikit-learn model
FEATURE_COLUMNS = [
    "total_submissions",
    "success_rate",
    "failure_rate",
    "avg_attempts",
    "avg_time_taken",
    "avg_hints_used",
    "recent_success_rate",
    "recent_avg_hints",
    "recent_avg_attempts",
    "struggling_topic_score",
    "struggling_pattern_score",
    "recent_difficulty_num",
    "recent_topic",
    "recent_pattern",
    "acc_Variables",
    "acc_Arrays",
    "acc_Strings",
    "acc_LinkedList",
    "acc_Stack",
    "acc_Queue",
    "acc_Trees",
    "acc_Graphs",
    "attempts_Variables",
    "attempts_Arrays",
    "attempts_Strings",
    "attempts_LinkedList",
    "attempts_Stack",
    "attempts_Queue",
    "attempts_Trees",
    "attempts_Graphs",
]

DIFFICULTY_NUM_MAP = {"Easy": 1.0, "Medium": 2.0, "Hard": 3.0}


def normalize_topic(raw_topic: Optional[str]) -> str:
    """Normalizes raw topic strings into one of the 8 canonical AlgoQuest tracks."""
    if not raw_topic:
        return "Arrays"
    t = str(raw_topic).strip().lower()
    if "stack" in t:
        return "Stack"
    if "queue" in t or "deque" in t or "buffer" in t:
        return "Queue"
    if "link" in t:
        return "Linked List"
    if "tree" in t or "bst" in t or "heap" in t:
        return "Trees"
    if "graph" in t or "dijkstra" in t:
        return "Graphs"
    if "string" in t or "palindrome" in t or "anagram" in t:
        return "Strings"
    if "variable" in t or "math" in t or "fundamental" in t:
        return "Variables"
    if "array" in t or "prefix sum" in t or "two pointer" in t:
        return "Arrays"
    return "Arrays"


def infer_pattern(question_data: Dict[str, Any]) -> str:
    """Infers the DSA algorithmic pattern from problem attributes."""
    raw_pattern = question_data.get("pattern")
    if raw_pattern and raw_pattern != "General" and str(raw_pattern).strip():
        return str(raw_pattern).strip()

    text = f"{question_data.get('title', '')} {question_data.get('statement', '')} {str(question_data.get('hints', ''))} {question_data.get('slug', '')}".lower()
    topic = normalize_topic(question_data.get("topic"))

    if "sliding window" in text:
        return "Sliding Window"
    if "two pointer" in text or "two pointers" in text or "opposite ends" in text or "left and right" in text:
        return "Two Pointers"
    if "slow" in text and "fast" in text:
        return "Fast and Slow Pointers"
    if "hash" in text or "map" in text or "frequency" in text or "two sum" in text or "missing number" in text:
        return "Hashing"
    if "prefix sum" in text or "cumulative" in text:
        return "Prefix Sum"
    if "kadane" in text or "maximum subarray" in text:
        return "Kadane's Algorithm"
    if "binary search" in text or "log n" in text or "mid =" in text:
        return "Binary Search"
    if "monotonic" in text:
        return "Monotonic Stack"
    if "parenthes" in text or "bracket" in text or "expression" in text:
        return "Expression Evaluation"
    if "level order" in text or "shortest path" in text or ("bfs" in text and "dfs" not in text):
        return "BFS"
    if "dfs" in text or "depth first" in text or "inorder" in text or "preorder" in text or "postorder" in text:
        return "DFS"
    if "revers" in text or "invert" in text:
        return "Reversal"
    if "sort" in text or "travers" in text:
        return "Array Traversal"

    default_patterns = {
        "Variables": "Basic Operations",
        "Strings": "Two Pointers",
        "Linked List": "Pointer Manipulation",
        "Stack": "Monotonic Stack",
        "Queue": "BFS",
        "Trees": "Tree Traversal",
        "Graphs": "BFS",
        "Arrays": "Two Pointers",
    }
    return default_patterns.get(topic, "Two Pointers")


def extract_features_from_submissions(submissions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Transforms a raw list of Prisma/API submission objects into model feature dictionary.
    Safe with empty or partial submission telemetry.
    """
    topic_acc: Dict[str, Dict[str, int]] = {
        t: {"total": 0, "accepted": 0, "failed": 0} for t in CANONICAL_TOPICS
    }
    pattern_acc: Dict[str, Dict[str, int]] = {}

    if not submissions:
        # Default cold-start baseline feature vector
        features = {
            "total_submissions": 0,
            "success_rate": 0.5,
            "failure_rate": 0.5,
            "avg_attempts": 1.0,
            "avg_time_taken": 120.0,
            "avg_hints_used": 0.0,
            "recent_success_rate": 0.5,
            "recent_avg_hints": 0.0,
            "recent_avg_attempts": 1.0,
            "struggling_topic_score": 50.0,
            "struggling_pattern_score": 50.0,
            "recent_difficulty_num": 1.0,
            "recent_topic": "Arrays",
            "recent_pattern": "Two Pointers",
        }
        for t in CANONICAL_TOPICS:
            key_suffix = t.replace(" ", "")
            features[f"acc_{key_suffix}"] = 0.5
            features[f"attempts_{key_suffix}"] = 0
        return features

    # Sort chronological (oldest to newest)
    sorted_subs = sorted(submissions, key=lambda s: str(s.get("createdAt", "")))

    total_subs = len(sorted_subs)
    total_accepted = 0
    total_hints = 0
    total_attempts = 0
    total_time = 0

    for sub in sorted_subs:
        topic = normalize_topic(sub.get("topic") or (sub.get("question") or {}).get("topic"))
        pattern = sub.get("pattern") or infer_pattern(sub.get("question") or {"pattern": sub.get("pattern"), "topic": topic})
        status = str(sub.get("status", "ACCEPTED")).upper()
        is_acc = status == "ACCEPTED"
        hints = int(sub.get("hintsUsed", 0) or 0)
        attempts = int(sub.get("attemptsCount", 1) or 1)
        time_taken = float(sub.get("timeTaken", 120) or 120)

        total_accepted += 1 if is_acc else 0
        total_hints += hints
        total_attempts += attempts
        total_time += time_taken

        if topic in topic_acc:
            topic_acc[topic]["total"] += 1
            if is_acc:
                topic_acc[topic]["accepted"] += 1
            else:
                topic_acc[topic]["failed"] += 1

        if pattern not in pattern_acc:
            pattern_acc[pattern] = {"total": 0, "accepted": 0, "failed": 0, "topic": topic}
        pattern_acc[pattern]["total"] += 1
        if is_acc:
            pattern_acc[pattern]["accepted"] += 1
        else:
            pattern_acc[pattern]["failed"] += 1

    # Recent submissions window (last 5)
    recent_window = sorted_subs[-5:]
    recent_acc_count = sum(1 for s in recent_window if str(s.get("status", "")).upper() == "ACCEPTED")
    recent_hints_count = sum(int(s.get("hintsUsed", 0) or 0) for s in recent_window)
    recent_attempts_count = sum(int(s.get("attemptsCount", 1) or 1) for s in recent_window)

    last_sub = sorted_subs[-1]
    last_topic = normalize_topic(last_sub.get("topic") or (last_sub.get("question") or {}).get("topic"))
    last_pattern = last_sub.get("pattern") or infer_pattern(last_sub.get("question") or {"pattern": last_sub.get("pattern"), "topic": last_topic})
    last_diff = str(last_sub.get("difficulty") or (last_sub.get("question") or {}).get("difficulty") or "Easy")

    success_rate = total_accepted / max(1, total_subs)
    failure_rate = 1.0 - success_rate

    # Calculate min accuracy for attempted topics/patterns
    attempted_topic_accs = [
        (data["accepted"] / data["total"]) * 100
        for data in topic_acc.values()
        if data["total"] > 0
    ]
    struggling_topic_score = min(attempted_topic_accs) if attempted_topic_accs else 50.0

    attempted_pattern_accs = [
        (data["accepted"] / data["total"]) * 100
        for data in pattern_acc.values()
        if data["total"] > 0
    ]
    struggling_pattern_score = min(attempted_pattern_accs) if attempted_pattern_accs else 50.0

    features = {
        "total_submissions": total_subs,
        "success_rate": round(success_rate, 4),
        "failure_rate": round(failure_rate, 4),
        "avg_attempts": round(total_attempts / max(1, total_subs), 2),
        "avg_time_taken": round(total_time / max(1, total_subs), 2),
        "avg_hints_used": round(total_hints / max(1, total_subs), 2),
        "recent_success_rate": round(recent_acc_count / max(1, len(recent_window)), 4),
        "recent_avg_hints": round(recent_hints_count / max(1, len(recent_window)), 2),
        "recent_avg_attempts": round(recent_attempts_count / max(1, len(recent_window)), 2),
        "struggling_topic_score": round(struggling_topic_score, 2),
        "struggling_pattern_score": round(struggling_pattern_score, 2),
        "recent_difficulty_num": DIFFICULTY_NUM_MAP.get(last_diff, 1.0),
        "recent_topic": last_topic,
        "recent_pattern": last_pattern,
    }

    for t in CANONICAL_TOPICS:
        key_suffix = t.replace(" ", "")
        data = topic_acc[t]
        acc = (data["accepted"] / data["total"]) if data["total"] > 0 else 0.5
        features[f"acc_{key_suffix}"] = round(acc, 4)
        features[f"attempts_{key_suffix}"] = data["total"]

    return features


def prepare_feature_df(data: Dict[str, Any]) -> pd.DataFrame:
    """
    Accepts a dictionary of features or direct metrics, validates missing values,
    and returns an aligned single-row pandas DataFrame ready for scikit-learn.
    """
    # If a list of submissions is passed under 'submissions', extract features first
    if "submissions" in data and isinstance(data["submissions"], list):
        data = {**extract_features_from_submissions(data["submissions"]), **data}

    row = {}
    for col in FEATURE_COLUMNS:
        if col in data:
            row[col] = data[col]
        else:
            # Safe defaults
            if col.startswith("acc_"):
                row[col] = 0.5
            elif col.startswith("attempts_"):
                row[col] = 0
            elif col == "recent_topic":
                row[col] = "Arrays"
            elif col == "recent_pattern":
                row[col] = "Two Pointers"
            elif col == "recent_difficulty_num":
                row[col] = 1.0
            elif "rate" in col:
                row[col] = 0.5
            elif "score" in col:
                row[col] = 50.0
            elif "attempts" in col:
                row[col] = 1.0
            elif "time" in col:
                row[col] = 120.0
            elif "hints" in col:
                row[col] = 0.0
            else:
                row[col] = 0.0

    return pd.DataFrame([row], columns=FEATURE_COLUMNS)
