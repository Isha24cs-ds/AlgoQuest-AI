import { askOpenRouter } from "./openrouter.js";
import { calculateMastery, identifyWeakAreas } from "../adaptive/adaptive.service.js";

export async function askNova({
  userId,
  question,
  code,
  language,
  userMessage,
}) {
  let adaptiveContext = "";

  if (userId) {
    try {
      const mastery = await calculateMastery(userId);
      const weakArea = await identifyWeakAreas(userId);

      adaptiveContext = `
Student Performance Context (Real Data from Database):
- Overall Mastery: ${mastery.overallMastery}%
- Weakest Pattern: ${weakArea.weakestPattern}
- Weakest Topic: ${weakArea.weakestTopic}
- Current Mastery Score for Weakest Pattern: ${weakArea.currentMasteryScore}%
- Recommendation Context: ${weakArea.reason}
`;
    } catch (e) {
      // Ignore error if performance context unavailable
    }
  }

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
- When asked why a question was recommended, what pattern to practice, or what topic is weak, explain using the student's actual performance data provided below without claiming to store personal private data.
${adaptiveContext}
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