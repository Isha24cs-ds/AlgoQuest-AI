"""
AlgoQuest ML Recommendation Service — Model Architecture
Defines the multi-target Random Forest classification pipeline for DSA recommendation.
"""

import os
import sys
from typing import Dict, Any, Tuple
import numpy as np
import pandas as pd
import joblib

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

from feature_engineering import FEATURE_COLUMNS, TOPIC_CANONICAL_NAMES, TOPIC_PRIMARY_PATTERNS


class DSARecommendationPipeline:
    """
    Multi-head scikit-learn recommendation engine for AlgoQuest AI.
    Predicts optimal (Topic, Pattern, Difficulty) learning targets and synthesizes
    explainable AI reasons based on student telemetry.
    """

    def __init__(self, random_state: int = 42):
        self.random_state = random_state
        self.is_trained = False

        # Identify numerical vs categorical column subsets
        self.cat_cols = ["recent_topic", "recent_pattern"]
        self.num_cols = [c for c in FEATURE_COLUMNS if c not in self.cat_cols]

        # Feature Preprocessing Pipeline
        self.preprocessor = ColumnTransformer(
            transformers=[
                (
                    "num",
                    Pipeline([
                        ("imputer", SimpleImputer(strategy="median")),
                        ("scaler", StandardScaler()),
                    ]),
                    self.num_cols,
                ),
                (
                    "cat",
                    OneHotEncoder(handle_unknown="ignore", sparse_output=False),
                    self.cat_cols,
                ),
            ]
        )

        # Three dedicated RandomForest heads for Topic, Pattern, and Difficulty
        self.topic_clf = RandomForestClassifier(
            n_estimators=100, max_depth=12, random_state=self.random_state
        )
        self.pattern_clf = RandomForestClassifier(
            n_estimators=100, max_depth=15, random_state=self.random_state
        )
        self.difficulty_clf = RandomForestClassifier(
            n_estimators=100, max_depth=8, random_state=self.random_state
        )

    def fit(
        self,
        X: pd.DataFrame,
        y_topic: pd.Series,
        y_pattern: pd.Series,
        y_difficulty: pd.Series,
    ) -> "DSARecommendationPipeline":
        """Trains the preprocessor and all 3 classification heads on telemetry data."""
        # Align features
        X_aligned = X[FEATURE_COLUMNS]
        X_trans = self.preprocessor.fit_transform(X_aligned)

        self.topic_clf.fit(X_trans, y_topic)
        self.pattern_clf.fit(X_trans, y_pattern)
        self.difficulty_clf.fit(X_trans, y_difficulty)

        self.is_trained = True
        return self

    def predict(self, X_df: pd.DataFrame) -> Dict[str, Any]:
        """
        Executes inference on a single-row DataFrame and returns recommendation target
        along with confidence score and personalized AI rationale.
        """
        if not self.is_trained:
            # Fallback for untrained state
            return {
                "topic": "Arrays",
                "pattern": "Two Pointers",
                "difficulty": "Easy",
                "reason": "Cold-start recommendation: begin with foundational Two Pointers in Arrays.",
                "confidence": 0.50,
            }

        X_aligned = X_df[FEATURE_COLUMNS]
        X_trans = self.preprocessor.transform(X_aligned)

        # Predictions
        pred_topic = self.topic_clf.predict(X_trans)[0]
        pred_pattern = self.pattern_clf.predict(X_trans)[0]
        pred_diff = self.difficulty_clf.predict(X_trans)[0]

        # Probabilities for confidence estimation
        topic_prob = np.max(self.topic_clf.predict_proba(X_trans)[0])
        diff_prob = np.max(self.difficulty_clf.predict_proba(X_trans)[0])
        overall_confidence = round(float((topic_prob * 0.6) + (diff_prob * 0.4)), 2)

        # Generate explainable AI rationale from student features
        feature_dict = X_df.iloc[0].to_dict()
        reason = self._generate_reason(
            pred_topic=pred_topic,
            pred_pattern=pred_pattern,
            pred_diff=pred_diff,
            features=feature_dict,
        )

        return {
            "topic": str(pred_topic),
            "pattern": str(pred_pattern),
            "difficulty": str(pred_diff),
            "reason": reason,
            "confidence": min(1.0, max(0.1, overall_confidence)),
        }

    def _generate_reason(
        self, pred_topic: str, pred_pattern: str, pred_diff: str, features: Dict[str, Any]
    ) -> str:
        """Synthesizes human-friendly, telemetry-grounded explanation for the student."""
        succ_rate = float(features.get("success_rate", 0.5))
        fail_rate = float(features.get("failure_rate", 0.5))
        recent_hints = float(features.get("recent_avg_hints", 0.0))
        recent_attempts = float(features.get("recent_avg_attempts", 1.0))
        struggle_score = float(features.get("struggling_pattern_score", 50.0))
        total_subs = int(features.get("total_submissions", 0))

        canonical_name = TOPIC_CANONICAL_NAMES.get(pred_topic, pred_topic)

        # 1. New student cold-start
        if total_subs < 2:
            return f"ML model initiated your learning curriculum in {canonical_name} ({pred_pattern}, {pred_diff}). Build foundational problem-solving intuition."

        # 2. Struggling pattern or low accuracy
        if struggle_score < 60 or fail_rate > 0.4:
            acc_pct = int(round(struggle_score if struggle_score > 0 else (succ_rate * 100)))
            hint_msg = f" and utilized {round(recent_hints, 1)} hints per problem" if recent_hints >= 1.0 else ""
            return f"ML detected friction in {pred_pattern} ({acc_pct}% accuracy{hint_msg}). Practicing this {pred_diff} target will reinforce edge cases."

        # 3. Step up in difficulty
        if pred_diff in ["Medium", "Hard"] and succ_rate >= 0.75:
            acc_pct = int(round(succ_rate * 100))
            return f"Demonstrated high accuracy ({acc_pct}%) with fast execution! ML recommends stepping up to {pred_diff} {pred_pattern} to tackle interview constraints."

        # 4. Curriculum topic expansion
        return f"Achieved solid progress in prior modules ({int(round(succ_rate * 100))}% success rate). Expanding your DSA skill tree into {canonical_name} with {pred_pattern} ({pred_diff})."

    def save(self, filepath: str) -> None:
        """Persists the full model pipeline to disk."""
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        joblib.dump(
            {
                "preprocessor": self.preprocessor,
                "topic_clf": self.topic_clf,
                "pattern_clf": self.pattern_clf,
                "difficulty_clf": self.difficulty_clf,
                "is_trained": self.is_trained,
            },
            filepath,
        )

    @classmethod
    def load(cls, filepath: str) -> "DSARecommendationPipeline":
        """Loads a persisted model pipeline from disk."""
        instance = cls()
        if not os.path.exists(filepath):
            instance.is_trained = False
            return instance

        data = joblib.load(filepath)
        instance.preprocessor = data["preprocessor"]
        instance.topic_clf = data["topic_clf"]
        instance.pattern_clf = data["pattern_clf"]
        instance.difficulty_clf = data["difficulty_clf"]
        instance.is_trained = data.get("is_trained", True)
        return instance
