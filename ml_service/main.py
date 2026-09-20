"""
AlgoQuest ML Recommendation Service — FastAPI Application
Provides HTTP endpoints for health monitoring, ML-driven next-problem recommendation,
and on-demand model retraining.
"""

import os
import sys
from typing import List, Dict, Any, Optional
from contextlib import asynccontextmanager

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from model import DSARecommendationPipeline
from feature_engineering import prepare_feature_df, extract_features_from_submissions
from trainer import train_and_save, DEFAULT_MODEL_PATH, DEFAULT_DATA_PATH


# Pydantic Schemas for Request/Response Validation

class HealthResponse(BaseModel):
    status: str = "ok"
    service: str = "algoquest-ml"


class SubmissionItem(BaseModel):
    id: Optional[int] = None
    questionId: Optional[int] = None
    status: Optional[str] = "ACCEPTED"
    runtime: Optional[float] = None
    memory: Optional[float] = None
    topic: Optional[str] = None
    pattern: Optional[str] = None
    difficulty: Optional[str] = None
    attemptsCount: Optional[int] = 1
    timeTaken: Optional[int] = None
    hintsUsed: Optional[int] = 0
    createdAt: Optional[str] = None
    question: Optional[Dict[str, Any]] = None


class RecommendationRequest(BaseModel):
    # Optional raw submission telemetry list
    submissions: Optional[List[Dict[str, Any]]] = None

    # Optional pre-aggregated feature attributes
    total_submissions: Optional[int] = None
    success_rate: Optional[float] = None
    failure_rate: Optional[float] = None
    avg_attempts: Optional[float] = None
    avg_time_taken: Optional[float] = None
    avg_hints_used: Optional[float] = None
    recent_success_rate: Optional[float] = None
    recent_avg_hints: Optional[float] = None
    recent_avg_attempts: Optional[float] = None
    recent_topic: Optional[str] = None
    recent_pattern: Optional[str] = None
    recent_difficulty_num: Optional[float] = None
    struggling_topic_score: Optional[float] = None
    struggling_pattern_score: Optional[float] = None


class RecommendationResponse(BaseModel):
    topic: str = Field(..., description="Target DSA topic recommended by the ML model")
    pattern: str = Field(..., description="Target DSA algorithmic pattern recommended by the ML model")
    difficulty: str = Field(..., description="Recommended difficulty level: Easy, Medium, or Hard")
    reason: str = Field(..., description="Explainable AI rationale grounded in student telemetry")
    confidence: float = Field(..., description="Prediction confidence score between 0.0 and 1.0")


class RetrainResponse(BaseModel):
    status: str
    message: str
    sample_count: int
    metrics: Dict[str, float]


# In-memory model instance
model_pipeline: Optional[DSARecommendationPipeline] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initializes the ML model pipeline on startup."""
    global model_pipeline
    print("[INFO] Initializing AlgoQuest ML Recommendation Service...")

    if not os.path.exists(DEFAULT_MODEL_PATH):
        print("[WARN] No pre-trained model found. Training initial model from dataset...")
        try:
            train_and_save(DEFAULT_DATA_PATH, DEFAULT_MODEL_PATH)
        except Exception as e:
            print(f"[ERROR] Initial training failed: {e}")

    model_pipeline = DSARecommendationPipeline.load(DEFAULT_MODEL_PATH)
    if model_pipeline.is_trained:
        print("[OK] ML Recommendation Pipeline loaded and ready for inference.")
    else:
        print("[WARN] Model pipeline loaded in cold-start fallback mode.")

    yield
    print("[INFO] Shutting down AlgoQuest ML Service...")


app = FastAPI(
    title="AlgoQuest ML Recommendation Service",
    description="Machine Learning personalized DSA recommendation microservice using FastAPI and scikit-learn.",
    version="1.0.0",
    lifespan=lifespan,
)

# Enable CORS for local Node.js backend and frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse, tags=["Monitoring"])
async def health_check():
    """Health check endpoint to verify microservice availability."""
    return HealthResponse(status="ok", service="algoquest-ml")


@app.post(
    "/predict-recommendation",
    response_model=RecommendationResponse,
    status_code=status.HTTP_200_OK,
    tags=["Recommendation"],
)
async def predict_recommendation(request: RecommendationRequest):
    """
    Predicts the optimal personalized DSA learning target (Topic, Pattern, Difficulty)
    and generates an explainable reason based on the student's submission history.
    """
    global model_pipeline
    if model_pipeline is None:
        model_pipeline = DSARecommendationPipeline.load(DEFAULT_MODEL_PATH)

    try:
        # Convert request to dictionary
        req_dict = request.model_dump(exclude_none=True)

        # Prepare aligned DataFrame for scikit-learn pipeline
        feature_df = prepare_feature_df(req_dict)

        # Execute ML prediction
        prediction = model_pipeline.predict(feature_df)

        return RecommendationResponse(**prediction)
    except Exception as e:
        # Graceful fallback in case of unexpected processing error
        print(f"[WARN] Inference error: {e}")
        return RecommendationResponse(
            topic="Arrays",
            pattern="Two Pointers",
            difficulty="Easy",
            reason="Start with foundational Two Pointers pattern in Arrays to build your problem-solving foundation.",
            confidence=0.50,
        )


@app.post("/retrain", response_model=RetrainResponse, tags=["Model Management"])
async def retrain_model():
    """
    Retrains the Random Forest recommendation model on the available telemetry dataset
    and reloads the in-memory inference pipeline.
    """
    global model_pipeline
    try:
        results = train_and_save(DEFAULT_DATA_PATH, DEFAULT_MODEL_PATH)
        model_pipeline = DSARecommendationPipeline.load(DEFAULT_MODEL_PATH)

        return RetrainResponse(
            status="success",
            message=f"Model successfully retrained on {results['sample_count']} telemetry samples.",
            sample_count=results["sample_count"],
            metrics=results["metrics"],
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Retraining failed: {str(e)}",
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
