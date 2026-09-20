import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";
const ML_TIMEOUT_MS = 3000;

/**
 * Sends student submission telemetry to the Python FastAPI ML microservice.
 * Strips all PII (user names, emails, passwords, tokens) and sends only DSA performance metrics.
 *
 * @param {Array<Object>} submissions - User's submission history from Prisma
 * @returns {Promise<Object|null>} - { topic, pattern, difficulty, reason, confidence } or null on fallback
 */
export async function getMLRecommendation(submissions) {
  try {
    const formattedSubmissions = (submissions || []).map((sub) => ({
      topic: sub.topic || sub.question?.topic || "Arrays",
      pattern: sub.pattern || sub.question?.pattern || "General",
      difficulty: sub.difficulty || sub.question?.difficulty || "Easy",
      status: sub.status || "ACCEPTED",
      timeTaken: typeof sub.timeTaken === "number" ? sub.timeTaken : 120,
      hintsUsed: typeof sub.hintsUsed === "number" ? sub.hintsUsed : 0,
      attemptsCount: typeof sub.attemptsCount === "number" ? sub.attemptsCount : 1,
      runtime: typeof sub.runtime === "number" ? sub.runtime : 0,
      memory: typeof sub.memory === "number" ? sub.memory : 0,
      createdAt: sub.createdAt ? new Date(sub.createdAt).toISOString() : new Date().toISOString(),
    }));

    const response = await axios.post(
      `${ML_SERVICE_URL}/predict-recommendation`,
      { submissions: formattedSubmissions },
      {
        headers: { "Content-Type": "application/json" },
        timeout: ML_TIMEOUT_MS,
      }
    );

    if (response.data && response.data.topic && response.data.pattern && response.data.difficulty) {
      return {
        topic: response.data.topic,
        pattern: response.data.pattern,
        difficulty: response.data.difficulty,
        reason: response.data.reason,
        confidence: response.data.confidence ?? 0.8,
      };
    }

    return null;
  } catch (err) {
    // Gracefully handle ML service being offline, timing out, or network errors
    console.log(`[ML Client] Python ML microservice unavailable (${err.code || err.message}). Using rule-based fallback.`);
    return null;
  }
}
