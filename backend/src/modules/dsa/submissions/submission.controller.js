import { submitSolution, fetchUserSubmissions } from "./submission.service.js";

export async function createSubmissionHandler(req, res) {
  try {
    const userId = req.user?.id || req.body.userId || 1;
    const { questionId, code, language, status, runtime, memory, timeTaken, hintsUsed } = req.body;

    if (!questionId) {
      return res.status(400).json({
        success: false,
        message: "questionId is required",
      });
    }

    const submission = await submitSolution({
      userId,
      questionId,
      code,
      language,
      status: status || "ACCEPTED",
      runtime,
      memory,
      timeTaken,
      hintsUsed,
    });

    res.status(201).json({
      success: true,
      message: "Submission recorded successfully",
      data: submission,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getUserSubmissionsHandler(req, res) {
  try {
    const userId = req.user?.id || req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const submissions = await fetchUserSubmissions(userId);

    res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
