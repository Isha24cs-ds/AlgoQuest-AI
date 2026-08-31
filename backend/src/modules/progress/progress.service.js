import {
  getUserSubmissionsSummary,
  getTotalQuestionsCount,
  getTopicQuestionsCount,
} from "./progress.repository.js";

const TOPICS_LIST = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Graphs"
];

export async function getUserProgress(userId) {
  const submissions = await getUserSubmissionsSummary(userId);
  const totalQuestions = await getTotalQuestionsCount();
  const topicTotalCounts = await getTopicQuestionsCount();

  if (!submissions || submissions.length === 0) {
    const emptyTopics = {};
    TOPICS_LIST.forEach((t) => {
      emptyTopics[t] = 0;
    });

    return {
      overall: 0,
      topics: emptyTopics,
      solved: 0,
      attempted: 0,
      totalQuestions: totalQuestions || 0,
    };
  }

  const attemptedQuestionIds = new Set();
  const solvedQuestionIds = new Set();
  const topicSolvedQuestionIds = {};

  TOPICS_LIST.forEach((t) => {
    topicSolvedQuestionIds[t] = new Set();
  });

  submissions.forEach((sub) => {
    attemptedQuestionIds.add(sub.questionId);
    const topic = sub.topic || sub.question?.topic || "Arrays";

    if (sub.status === "ACCEPTED") {
      solvedQuestionIds.add(sub.questionId);
      if (!topicSolvedQuestionIds[topic]) {
        topicSolvedQuestionIds[topic] = new Set();
      }
      topicSolvedQuestionIds[topic].add(sub.questionId);
    }
  });

  const solvedCount = solvedQuestionIds.size;
  const attemptedCount = attemptedQuestionIds.size;

  const overall = totalQuestions > 0
    ? Math.round((solvedCount / totalQuestions) * 100)
    : Math.round((solvedCount / Math.max(1, attemptedCount)) * 100);

  const topicsProgress = {};
  TOPICS_LIST.forEach((topic) => {
    const solvedInTopic = topicSolvedQuestionIds[topic] ? topicSolvedQuestionIds[topic].size : 0;
    const totalInTopic = topicTotalCounts[topic] || 10;
    topicsProgress[topic] = Math.round((solvedInTopic / Math.max(1, totalInTopic)) * 100);
  });

  return {
    overall,
    topics: topicsProgress,
    solved: solvedCount,
    attempted: attemptedCount,
    totalQuestions,
  };
}
