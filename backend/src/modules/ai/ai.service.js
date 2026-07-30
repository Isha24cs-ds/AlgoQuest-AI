import { askOpenRouter } from "./openrouter.js";

export async function askNova({
  question,
  code,
  language,
  userMessage,
}) {
  const messages = [
    {
      role: "system",
      content: `
You are Nova, the AI mentor inside AlgoQuest AI.

Rules:

- Never reveal the full solution unless the student explicitly asks.
- Give hints before answers.
- Explain in beginner-friendly language.
- Help debug code.
- Suggest optimizations.
- Mention time complexity whenever appropriate.
- Be encouraging.
`
    },

    {
      role: "user",
      content: `
Question:

${question}

Programming Language:

${language}

Student Code:

${code}

Student asks:

${userMessage}
`
    }
  ];

  return await askOpenRouter(messages);
}