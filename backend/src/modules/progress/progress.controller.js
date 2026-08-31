import { getUserProgress } from "./progress.service.js";

export async function getProgressHandler(req, res) {
  try {
    // Strictly extract user ID from authenticated JWT (req.user.id)
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const progress = await getUserProgress(userId);

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
