# AlgoQuest AI — Machine Learning Recommendation Microservice

This microservice provides a machine learning recommendation engine for **AlgoQuest AI**. It predicts a student's optimal DSA learning target (**Topic**, **Pattern**, **Difficulty**, and **Explainable AI Reason**) based on their real submission telemetry, error patterns, time taken, and hint dependencies.

---

## 📁 Directory Structure

```text
ml_service/
├── main.py                   # FastAPI REST application (routes, lifespan, validation)
├── model.py                  # Scikit-learn multi-head Random Forest recommendation pipeline
├── trainer.py                # Model training, metric evaluation, and joblib serialization
├── feature_engineering.py    # Telemetry feature extractor and schema alignment
├── requirements.txt          # Python dependencies
├── README.md                 # Documentation and API reference
├── data/
│   └── training_data.csv     # Synthetic bootstrap telemetry dataset (replaced/augmented in Phase 2)
└── models/
    └── recommendation_model.joblib  # Trained model artifact bundle
```

> **Note on Bootstrap Dataset**: The `data/training_data.csv` dataset contains diverse synthetic telemetry profiles covering multiple skill levels across all 8 canonical DSA tracks. In Phase 2, this dataset can be augmented and replaced by real historical AlgoQuest submission telemetry.

---

## ⚙️ Setup & Installation

### 1. Create a Python Virtual Environment (Optional but recommended)
```bash
cd ml_service
python -m venv venv

# Windows (Command Prompt / PowerShell)
.\venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 2. Install Requirements
```bash
pip install -r requirements.txt
```

---

## 🧠 Model Training

To train the Random Forest classification heads on the telemetry dataset and generate the serialized model bundle:

```bash
python trainer.py
```

Output:
```text
📊 Loading training data from: .../ml_service/data/training_data.csv
✅ Loaded 38 telemetry samples.

🧠 Training Random Forest Recommendation Pipeline...
📈 Evaluation Metrics (Test Set Size = 8):
   • Topic Accuracy:      100.0%
   • Pattern Accuracy:    87.5%
   • Difficulty Accuracy: 100.0%

💾 Saving model artifact to: .../ml_service/models/recommendation_model.joblib
✅ Model trained and saved successfully!
```

---

## 🚀 Running the FastAPI Service

Start the server using Uvicorn:

```bash
uvicorn main:app --reload --port 8000
```

The service will run at `http://localhost:8000`. Interactive Swagger UI documentation is available at `http://localhost:8000/docs`.

---

## 📡 API Reference & Examples

### 1. Health Check
- **Endpoint**: `GET /health`
- **Response**:
```json
{
  "status": "ok",
  "service": "algoquest-ml"
}
```

---

### 2. Predict Recommendation
- **Endpoint**: `POST /predict-recommendation`
- **Headers**: `Content-Type: application/json`

#### Example A: Passing Raw Prisma Submissions List
```json
{
  "submissions": [
    {
      "topic": "Arrays",
      "pattern": "Two Pointers",
      "difficulty": "Easy",
      "status": "ACCEPTED",
      "timeTaken": 45,
      "hintsUsed": 0,
      "attemptsCount": 1,
      "createdAt": "2026-03-20T10:00:00Z"
    },
    {
      "topic": "Arrays",
      "pattern": "Two Pointers",
      "difficulty": "Easy",
      "status": "ACCEPTED",
      "timeTaken": 60,
      "hintsUsed": 0,
      "attemptsCount": 1,
      "createdAt": "2026-03-20T10:15:00Z"
    }
  ]
}
```

#### Example B: Passing Pre-Aggregated Telemetry Features
```json
{
  "total_submissions": 6,
  "success_rate": 0.33,
  "failure_rate": 0.67,
  "avg_attempts": 2.4,
  "avg_time_taken": 280.0,
  "avg_hints_used": 1.8,
  "recent_success_rate": 0.20,
  "recent_avg_hints": 1.8,
  "recent_avg_attempts": 2.4,
  "recent_topic": "Strings",
  "recent_pattern": "Hashing",
  "recent_difficulty_num": 1.0,
  "struggling_topic_score": 33.0,
  "struggling_pattern_score": 30.0
}
```

#### Example Response
```json
{
  "topic": "Strings",
  "pattern": "Hashing",
  "difficulty": "Easy",
  "reason": "ML detected friction in Hashing (30% accuracy and utilized 1.8 hints per problem). Practicing this Easy target will reinforce edge cases.",
  "confidence": 0.88
}
```

---

### 3. Retrain Model
- **Endpoint**: `POST /retrain`
- **Response**:
```json
{
  "status": "success",
  "message": "Model successfully retrained on 38 telemetry samples.",
  "sample_count": 38,
  "metrics": {
    "accuracy_topic": 1.0,
    "accuracy_pattern": 0.875,
    "accuracy_difficulty": 1.0
  }
}
```
