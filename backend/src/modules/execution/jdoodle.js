import axios from "axios";
import "dotenv/config";

const JDOODLE_URL = "https://api.jdoodle.com/v1/execute";

// Map frontend language keys to JDoodle IDs and stable version indices
const LANGUAGE_CONFIGS = {
  cpp: { language: "cpp17", versionIndex: "1" },
  "c++": { language: "cpp17", versionIndex: "1" },
  cpp17: { language: "cpp17", versionIndex: "1" },
  java: { language: "java", versionIndex: "4" },
  python: { language: "python3", versionIndex: "4" },
  python3: { language: "python3", versionIndex: "4" },
  c: { language: "c", versionIndex: "5" },
  javascript: { language: "nodejs", versionIndex: "4" },
  nodejs: { language: "nodejs", versionIndex: "4" },
};

export async function executeCode({
  code,
  language,
  stdin = "",
}) {
  const clientId = process.env.JDOODLE_CLIENT_ID;
  const clientSecret = process.env.JDOODLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "JDoodle Compiler credentials (JDOODLE_CLIENT_ID / JDOODLE_CLIENT_SECRET) are missing in backend/.env. Please configure them and restart the backend server."
    );
  }

  const normLang = (language || "").toLowerCase().trim();
  const config = LANGUAGE_CONFIGS[normLang] || {
    language: normLang || "cpp17",
    versionIndex: "0",
  };

  try {
    const response = await axios.post(
      JDOODLE_URL,
      {
        clientId,
        clientSecret,
        script: code,
        stdin: stdin || "",
        language: config.language,
        versionIndex: config.versionIndex,
        compileOnly: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    return response.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.data?.error === "Unauthorized access") {
      throw new Error(
        "JDoodle Compiler API: Unauthorized access. Please verify your JDOODLE_CLIENT_ID and JDOODLE_CLIENT_SECRET in backend/.env, or check your daily JDoodle credit limits."
      );
    }
    throw error;
  }
}