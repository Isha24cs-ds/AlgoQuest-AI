import { getUserSubmissionsWithQuestions, getAllAvailableQuestions } from "./adaptive.repository.js";

const DEFAULT_TOPICS = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Graphs"
];

const DEFAULT_PATTERNS = {
  Arrays: ["Hashing", "Two Pointers", "Sliding Window", "Prefix Sum", "Kadane's Algorithm", "Binary Search"],
  Strings: ["Two Pointers", "Sliding Window", "Hashing", "String Manipulation"],
  "Linked List": ["Fast and Slow Pointers", "Reversal", "Two Pointers"],
  Stack: ["Monotonic Stack", "Expression Evaluation"],
  Queue: ["BFS", "Sliding Window"],
  Trees: ["DFS", "BFS", "Recursion"],
  Graphs: ["BFS", "DFS", "Shortest Path"]
};

export async function calculateMastery(userId) {
  const submissions = await getUserSubmissionsWithQuestions(userId);

  const topicStats = {};
  DEFAULT_TOPICS.forEach((t) => {
    topicStats[t] = { score: 0, attempts: 0, accepted: 0 };
  });

  const patternStats = {};
  Object.entries(DEFAULT_PATTERNS).forEach(([topic, patterns]) => {
    patterns.forEach((p) => {
      patternStats[p] = { topic, score: 0, attempts: 0, accepted: 0 };
    });
  });

  if (!submissions || submissions.length === 0) {
    return {
      overallMastery: 0,
      topics: topicStats,
      patterns: patternStats,
      hasEnoughData: false,
    };
  }

  // Set baseline score of 50 for topics/patterns that have at least 1 attempt
  submissions.forEach((sub) => {
    const topic = sub.topic || sub.question?.topic;
    const pattern = sub.pattern || sub.question?.pattern;

    if (topic && topicStats[topic] && topicStats[topic].attempts === 0) {
      topicStats[topic].score = 50;
    }
    if (pattern && patternStats[pattern] && patternStats[pattern].attempts === 0) {
      patternStats[pattern].score = 50;
    }

    const status = sub.status;
    const hints = sub.hintsUsed || 0;
    const attempts = sub.attemptsCount || 1;

    let delta = 0;
    if (status === "ACCEPTED") {
      delta += attempts === 1 ? 15 : 8;
    } else {
      delta -= 5;
    }
    delta -= hints * 2;

    if (topic && topicStats[topic]) {
      topicStats[topic].score = Math.min(100, Math.max(10, topicStats[topic].score + delta));
      topicStats[topic].attempts += 1;
      if (status === "ACCEPTED") topicStats[topic].accepted += 1;
    }

    if (pattern && patternStats[pattern]) {
      patternStats[pattern].score = Math.min(100, Math.max(10, patternStats[pattern].score + delta));
      patternStats[pattern].attempts += 1;
      if (status === "ACCEPTED") patternStats[pattern].accepted += 1;
    }
  });

  const attemptedTopics = Object.values(topicStats).filter((t) => t.attempts > 0);
  const overallMastery = attemptedTopics.length > 0
    ? Math.round(attemptedTopics.reduce((acc, curr) => acc + curr.score, 0) / attemptedTopics.length)
    : 0;

  return {
    overallMastery,
    topics: topicStats,
    patterns: patternStats,
    hasEnoughData: submissions.length >= 1,
  };
}


export async function identifyWeakAreas(userId) {
  const mastery = await calculateMastery(userId);

  if (!mastery.hasEnoughData) {
    return {
      weakestTopic: "Arrays",
      weakestPattern: "Hashing",
      currentMasteryScore: 50,
      reason: "As a new student, start with the core Array Hashing pattern fundamentals.",
      isDefaultRecommendation: true,
    };
  }

  // Find pattern with lowest score among attempted or standard patterns
  let minScore = 101;
  let weakestPattern = "Hashing";
  let weakestTopic = "Arrays";

  Object.entries(mastery.patterns).forEach(([pattern, data]) => {
    if (data.score < minScore) {
      minScore = data.score;
      weakestPattern = pattern;
      weakestTopic = data.topic;
    }
  });

  return {
    weakestTopic,
    weakestPattern,
    currentMasteryScore: minScore,
    reason: `Your recent performance in ${weakestPattern} (${minScore}%) is below your overall average (${mastery.overallMastery}%).`,
    isDefaultRecommendation: false,
  };
}

export async function getNextRecommendedQuestion(userId) {
  const weakArea = await identifyWeakAreas(userId);
  const allQuestions = await getAllAvailableQuestions();
  const userSubmissions = await getUserSubmissionsWithQuestions(userId);

  const solvedQuestionIds = new Set(
    userSubmissions
      .filter((s) => s.status === "ACCEPTED")
      .map((s) => s.questionId)
  );

  // Target difficulty based on current pattern score
  let targetDifficulty = "Easy";
  if (weakArea.currentMasteryScore > 75) {
    targetDifficulty = "Hard";
  } else if (weakArea.currentMasteryScore > 45) {
    targetDifficulty = "Medium";
  }

  // Candidate pool prioritizing weakest pattern & topic
  let candidates = allQuestions.filter(
    (q) => !solvedQuestionIds.has(q.id) && q.pattern === weakArea.weakestPattern
  );

  if (candidates.length === 0) {
    candidates = allQuestions.filter(
      (q) => !solvedQuestionIds.has(q.id) && q.topic === weakArea.weakestTopic
    );
  }

  if (candidates.length === 0) {
    candidates = allQuestions.filter((q) => !solvedQuestionIds.has(q.id));
  }

  if (candidates.length === 0) {
    // If all solved, fall back to all questions
    candidates = allQuestions;
  }

  // Pick matching target difficulty candidate if available
  let selected = candidates.find((q) => q.difficulty === targetDifficulty);
  if (!selected) {
    selected = candidates[0];
  }

  return {
    success: true,
    recommendation: {
      topic: selected.topic,
      pattern: selected.pattern || weakArea.weakestPattern,
      difficulty: selected.difficulty,
      reason: weakArea.reason,
    },
    question: {
      id: selected.id,
      title: selected.title,
      slug: selected.slug,
      statement: selected.statement,
    },
  };
}
