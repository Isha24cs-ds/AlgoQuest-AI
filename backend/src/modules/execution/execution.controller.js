import { runCode as executeCode } from "./execution.service.js";

export async function run(req, res) {
  try {
    const { code, language, stdin = "" } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "Code and language are required",
      });
    }

    const result = await executeCode({
      code,
      language,
      stdin,
    });

    res.json({
      success: true,
      output: result.output || "",
      error: result.error || "",
      statusCode: result.statusCode,
      memory: result.memory,
      cpuTime: result.cpuTime,
      compilationStatus: result.compilationStatus,
    });
  } catch (err) {
    console.error(
      "Execution error:",
      err.response?.data || err.message
    );

    const errorDetail =
      err.response?.data?.error ||
      err.response?.data?.message ||
      err.message ||
      "Code execution failed";

    res.status(500).json({
      success: false,
      message: errorDetail,
      error: errorDetail,
    });
  }
}