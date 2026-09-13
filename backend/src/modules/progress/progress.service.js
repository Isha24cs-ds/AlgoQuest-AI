import {
  getUserSubmissionsSummary,
  getTotalQuestionsCount,
  getTopicQuestionsCount,
} from "./progress.repository.js";

export const TOPICS_CONFIG = {
  "Variables": { name: "Programming Fundamentals", total: 39, keys: ["variable", "math", "fundamental", "basic", "type"] },
  "Arrays": { name: "Arrays", total: 25, keys: ["array", "prefix sum", "two pointer", "sliding window", "kadane"] },
  "Strings": { name: "Strings", total: 20, keys: ["string", "palindrome", "anagram"] },
  "Linked List": { name: "Linked Lists", total: 18, keys: ["link", "linked list", "linkedlist"] },
  "Stack": { name: "Stacks", total: 30, keys: ["stack", "monotonic stack"] },
  "Queue": { name: "Queues", total: 20, keys: ["queue", "deque", "buffer"] },
  "Trees": { name: "Trees", total: 30, keys: ["tree", "bst", "trie", "heap"] },
  "Graphs": { name: "Graphs", total: 28, keys: ["graph", "dfs", "bfs", "dijkstra"] },
};

export function normalizeTopic(rawTopic) {
  if (!rawTopic) return "Arrays";
  const str = String(rawTopic).toLowerCase().trim();

  // Direct exact or prefix checks
  if (str === "stack" || str === "stacks" || str.startsWith("stack")) return "Stack";
  if (str === "queue" || str === "queues" || str.startsWith("queue")) return "Queue";
  if (str === "linked list" || str === "linked lists" || str === "linkedlist" || str.startsWith("linked") || str.startsWith("link")) return "Linked List";
  if (str === "tree" || str === "trees" || str.startsWith("tree") || str.startsWith("bst")) return "Trees";
  if (str === "graph" || str === "graphs" || str.startsWith("graph")) return "Graphs";
  if (str === "string" || str === "strings" || str.startsWith("string")) return "Strings";
  if (str === "variable" || str === "variables" || str.startsWith("var") || str.startsWith("fund") || str.startsWith("prog") || str.startsWith("math")) return "Variables";
  if (str === "array" || str === "arrays" || str.startsWith("array")) return "Arrays";

  // Substring checks in specific priority order
  if (str.includes("stack")) return "Stack";
  if (str.includes("queue") || str.includes("deque") || str.includes("buffer")) return "Queue";
  if (str.includes("link")) return "Linked List";
  if (str.includes("tree") || str.includes("bst") || str.includes("trie") || str.includes("heap")) return "Trees";
  if (str.includes("graph") || str.includes("dijkstra")) return "Graphs";
  if (str.includes("string") || str.includes("palindrome") || str.includes("anagram")) return "Strings";
  if (str.includes("math") || str.includes("fundamental") || str.includes("variable")) return "Variables";
  if (str.includes("array") || str.includes("prefix sum") || str.includes("two pointer") || str.includes("sliding window") || str.includes("kadane")) return "Arrays";

  return "Arrays";
}

export async function getUserProgress(userId) {
  const submissions = await getUserSubmissionsSummary(userId);
  const dbTopicCounts = await getTopicQuestionsCount();

  const topicStats = {};
  const topicsPercentMap = {};

  Object.entries(TOPICS_CONFIG).forEach(([canonical, config]) => {
    const totalCount = Math.max(config.total, dbTopicCounts[canonical] || 0);
    topicStats[canonical] = {
      name: config.name,
      solved: 0,
      attempted: 0,
      submitted: 0,
      acceptedSubmissions: 0,
      total: totalCount,
      percentage: 0,
      accuracy: 0,
    };
    topicsPercentMap[canonical] = 0;
  });

  const totalQuestionsSum = Object.values(topicStats).reduce((acc, curr) => acc + curr.total, 0);

  if (!submissions || submissions.length === 0) {
    return {
      overall: 0,
      topics: topicsPercentMap,
      topicStats,
      solved: 0,
      attempted: 0,
      submitted: 0,
      totalQuestions: totalQuestionsSum,
      accuracy: 0,
    };
  }

  const attemptedQuestionIds = new Set();
  const solvedQuestionIds = new Set();

  const topicSolvedSets = {};
  const topicAttemptedSets = {};

  Object.keys(TOPICS_CONFIG).forEach((t) => {
    topicSolvedSets[t] = new Set();
    topicAttemptedSets[t] = new Set();
  });

  let totalAcceptedSubmissions = 0;

  submissions.forEach((sub) => {
    const canonical = normalizeTopic(sub.topic || sub.question?.topic);
    const qId = sub.questionId;

    attemptedQuestionIds.add(qId);
    if (topicAttemptedSets[canonical]) {
      topicAttemptedSets[canonical].add(qId);
    }

    if (topicStats[canonical]) {
      topicStats[canonical].submitted += 1;
    }

    if (sub.status === "ACCEPTED") {
      totalAcceptedSubmissions += 1;
      solvedQuestionIds.add(qId);

      if (topicSolvedSets[canonical]) {
        topicSolvedSets[canonical].add(qId);
      }

      if (topicStats[canonical]) {
        topicStats[canonical].acceptedSubmissions += 1;
      }
    }
  });

  // Calculate percentages and counts per topic
  Object.keys(TOPICS_CONFIG).forEach((topic) => {
    const stat = topicStats[topic];
    stat.solved = topicSolvedSets[topic]?.size || 0;
    stat.attempted = topicAttemptedSets[topic]?.size || 0;
    stat.percentage = Math.min(100, Math.round((stat.solved / Math.max(1, stat.total)) * 100));
    stat.accuracy = stat.submitted > 0 ? Math.round((stat.acceptedSubmissions / stat.submitted) * 100) : 0;
    topicsPercentMap[topic] = stat.percentage;
  });

  const totalSolved = solvedQuestionIds.size;
  const totalAttempted = attemptedQuestionIds.size;
  const totalSubmitted = submissions.length;

  const overall = totalQuestionsSum > 0
    ? Math.min(100, Math.round((totalSolved / totalQuestionsSum) * 100))
    : 0;

  const overallAccuracy = totalSubmitted > 0
    ? Math.round((totalAcceptedSubmissions / totalSubmitted) * 100)
    : 0;

  return {
    overall,
    topics: topicsPercentMap,
    topicStats,
    solved: totalSolved,
    attempted: totalAttempted,
    submitted: totalSubmitted,
    totalQuestions: totalQuestionsSum,
    accuracy: overallAccuracy,
  };
}
