import { calculateMastery, identifyWeakAreas, getNextRecommendedQuestion } from "./adaptive.service.js";

export async function getMasteryScores(req, res) {
  try {
    const userId = req.user?.id || req.query.userId || 1;
    const masteryData = await calculateMastery(userId);

    res.status(200).json({
      success: true,
      data: masteryData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getWeakAreasHandler(req, res) {
  try {
    const userId = req.user?.id || req.query.userId || 1;
    const weakAreas = await identifyWeakAreas(userId);

    res.status(200).json({
      success: true,
      data: weakAreas,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getNextQuestionHandler(req, res) {
  try {
    const userId = req.user?.id || req.query.userId || 1;
    const result = await getNextRecommendedQuestion(userId);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
