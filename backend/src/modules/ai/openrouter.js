import axios from "axios";
import "dotenv/config";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function askOpenRouter(messages) {
  const response = await axios.post(
    OPENROUTER_URL,
    {
      model: "deepseek/deepseek-chat-v3",
      messages,
      temperature: 0.3
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AlgoQuest AI"
      }
    }
  );

  return response.data.choices[0].message.content;
}