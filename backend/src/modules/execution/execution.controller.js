import { runCode } from "./execution.service.js";

export async function execute(req, res) {
  try {
    const result = await runCode(req.body);

    res.status(200).json(result);

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}