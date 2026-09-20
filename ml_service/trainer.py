"""
AlgoQuest ML Recommendation Service — Trainer Script
Trains the multi-target Random Forest classifier on telemetry dataset and saves model artifact.
"""

import os
import sys
import warnings
from typing import Dict, Any
import pandas as pd

warnings.filterwarnings("ignore")

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

from model import DSARecommendationPipeline
from feature_engineering import FEATURE_COLUMNS

DEFAULT_DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "training_data.csv")
DEFAULT_MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "recommendation_model.joblib")


def train_and_save(
    data_path: str = DEFAULT_DATA_PATH,
    model_path: str = DEFAULT_MODEL_PATH,
) -> Dict[str, Any]:
    """
    Loads telemetry dataset, trains the DSA Recommendation Model,
    evaluates classification performance, and persists artifact using joblib.
    """
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Training dataset not found at {data_path}")

    print(f"[INFO] Loading training data from: {data_path}")
    df = pd.read_csv(data_path)
    print(f"[OK] Loaded {len(df)} telemetry samples.")

    # Target columns
    y_topic = df["target_topic"]
    y_pattern = df["target_pattern"]
    y_difficulty = df["target_difficulty"]

    # Features
    X = df[FEATURE_COLUMNS]

    # Split for evaluation (if sample size allows)
    test_size = 0.2 if len(df) >= 20 else 0.1
    X_train, X_test, y_topic_train, y_topic_test, y_pat_train, y_pat_test, y_diff_train, y_diff_test = train_test_split(
        X, y_topic, y_pattern, y_difficulty, test_size=test_size, random_state=42
    )

    print("\n[INFO] Training Random Forest Recommendation Pipeline...")
    pipeline = DSARecommendationPipeline(random_state=42)
    pipeline.fit(X_train, y_topic_train, y_pat_train, y_diff_train)

    # Evaluation
    X_test_trans = pipeline.preprocessor.transform(X_test[FEATURE_COLUMNS])
    pred_topic = pipeline.topic_clf.predict(X_test_trans)
    pred_pat = pipeline.pattern_clf.predict(X_test_trans)
    pred_diff = pipeline.difficulty_clf.predict(X_test_trans)

    acc_topic = round(accuracy_score(y_topic_test, pred_topic), 4)
    acc_pat = round(accuracy_score(y_pat_test, pred_pat), 4)
    acc_diff = round(accuracy_score(y_diff_test, pred_diff), 4)

    print(f"[EVAL] Metrics (Test Set Size = {len(X_test)}):")
    print(f"   * Topic Accuracy:      {acc_topic * 100:.1f}%")
    print(f"   * Pattern Accuracy:    {acc_pat * 100:.1f}%")
    print(f"   * Difficulty Accuracy: {acc_diff * 100:.1f}%")

    # Retrain on full dataset for maximum generalization
    print("\n[INFO] Fitting on full dataset for production artifact...")
    pipeline.fit(X, y_topic, y_pattern, y_difficulty)

    print(f"[SAVE] Saving model artifact to: {model_path}")
    pipeline.save(model_path)
    print("[OK] Model trained and saved successfully!\n")

    return {
        "status": "success",
        "sample_count": len(df),
        "metrics": {
            "accuracy_topic": acc_topic,
            "accuracy_pattern": acc_pat,
            "accuracy_difficulty": acc_diff,
        },
        "model_path": model_path,
    }


if __name__ == "__main__":
    results = train_and_save()
    print("[SUMMARY] Training Results:", results)
