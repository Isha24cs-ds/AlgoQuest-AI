import { askNova } from "./ai.service.js";

export async function chat(req, res) {
  try {
    const answer = await askNova(req.body);

    res.json({
      success: true,
      answer,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}