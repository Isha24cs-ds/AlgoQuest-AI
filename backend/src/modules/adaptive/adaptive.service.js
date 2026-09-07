import { getUserSubmissionsWithQuestions, getAllAvailableQuestions } from "./adaptive.repository.js";
import { normalizeTopic } from "../progress/progress.service.js";

export const DEFAULT_TOPICS = [
  "Variables",
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Graphs"
];

export const TOPIC_CANONICAL_NAMES = {
  "Variables": "Programming Fundamentals",
  "Arrays": "Arrays",
  "Strings": "Strings",
  "Linked List": "Linked Lists",
  "Stack": "Stacks",
  "Queue": "Queues",
  "Trees": "Trees",
  "Graphs": "Graphs"
};

export const TOPIC_PRIMARY_PATTERNS = {
  "Variables": ["Basic Operations", "Conditionals", "Loops", "Math"],
  "Arrays": ["Two Pointers", "Hashing", "Sliding Window", "Array Traversal", "Array Manipulation", "Prefix Sum", "Binary Search", "Kadane's Algorithm"],
  "Strings": ["Two Pointers", "Hashing", "Sliding Window", "String Manipulation"],
  "Linked List": ["Fast and Slow Pointers", "Pointer Manipulation", "Reversal", "Two Pointers"],
  "Stack": ["Monotonic Stack", "Expression Evaluation", "Stack Operations"],
  "Queue": ["BFS", "Sliding Window", "Queue Operations"],
  "Trees": ["DFS", "BFS", "Recursion", "Tree Traversal"],
  "Graphs": ["BFS", "DFS", "Shortest Path", "Graph Traversal"]
};

/**
 * Infer authentic DSA pattern from question attributes
 */
export function inferPattern(question) {
  if (!question) return "Two Pointers";

  const rawPattern = question.pattern;
  if (rawPattern && rawPattern !== "General" && rawPattern.trim() !== "") {
    return rawPattern.trim();
  }

  const text = `${question.title || ""} ${question.statement || ""} ${JSON.stringify(question.hints || "")} ${question.slug || ""}`.toLowerCase();
  const rawTopic = question.topic || "";
  const topic = normalizeTopic(rawTopic);

  if (text.includes("sliding window")) return "Sliding Window";
  if (text.includes("two pointer") || text.includes("two pointers") || text.includes("opposite ends") || text.includes("left and right")) return "Two Pointers";
  if (text.includes("slow") && text.includes("fast")) return "Fast and Slow Pointers";
  if (text.includes("hash") || text.includes("unordered_map") || text.includes("map") || text.includes("set") || text.includes("frequency") || text.includes("two sum") || text.includes("missing number")) return "Hashing";
  if (text.includes("prefix sum") || text.includes("cumulative") || text.includes("running sum")) return "Prefix Sum";
  if (text.includes("kadane") || text.includes("maximum subarray")) return "Kadane's Algorithm";
  if (text.includes("binary search") || text.includes("log n") || text.includes("mid =")) return "Binary Search";
  if (text.includes("monotonic")) return "Monotonic Stack";
  if (text.includes("parenthes") || text.includes("bracket") || text.includes("reverse polish") || text.includes("expression")) return "Expression Evaluation";
  if (text.includes("level order") || text.includes("shortest path") || (text.includes("bfs") && !text.includes("dfs"))) return "BFS";
  if (text.includes("dfs") || text.includes("depth first") || text.includes("inorder") || text.includes("preorder") || text.includes("postorder")) return "DFS";
  if (text.includes("revers") || text.includes("invert")) return "Reversal";
  if (text.includes("xor") || text.includes("bit")) return "Bit Manipulation";
  if (text.includes("linear search") || text.includes("search")) return "Searching";
  if (text.includes("rotate") || text.includes("shift")) return "Array Manipulation";
  if (text.includes("sort") || text.includes("travers") || text.includes("largest") || text.includes("smallest")) return "Array Traversal";

  switch (topic) {
    case "Variables":
      return "Basic Operations";
    case "Strings":
      return "Two Pointers";
    case "Linked List":
      return "Pointer Manipulation";
    case "Stack":
      return "Monotonic Stack";
    case "Queue":
      return "BFS";
    case "Trees":
      return "Tree Traversal";
    case "Graphs":
      return "BFS";
    case "Arrays":
    default:
      return "Two Pointers";
  }
}

/**
 * Calculate user mastery scores based strictly on real submission telemetry
 */
export async function calculateMastery(userId) {
  const submissions = await getUserSubmissionsWithQuestions(userId);

  const topicStats = {};
  DEFAULT_TOPICS.forEach((t) => {
    topicStats[t] = {
      name: TOPIC_CANONICAL_NAMES[t] || t,
      score: 0,
      attempts: 0,
      accepted: 0,
      failed: 0,
      accuracy: 0,
      attempted: false,
    };
  });

  const patternStats = {};

  if (!submissions || submissions.length === 0) {
    return {
      overallMastery: 0,
      topics: topicStats,
      patterns: {},
      attemptedPatterns: [],
      hasEnoughData: false,
    };
  }

  // Iterate over submissions in chronological order (oldest to newest)
  const sortedSubmissions = [...submissions].reverse();

  sortedSubmissions.forEach((sub) => {
    const rawTopic = sub.topic || sub.question?.topic;
    const topic = normalizeTopic(rawTopic);
    const pattern = inferPattern(sub.question || { pattern: sub.pattern, topic: rawTopic });

    const status = sub.status;
    const isAccepted = status === "ACCEPTED";
    const hints = sub.hintsUsed || 0;
    const attempts = sub.attemptsCount || 1;

    // Update topic stats
    if (topicStats[topic]) {
      const ts = topicStats[topic];
      if (!ts.attempted) {
        ts.attempted = true;
        ts.score = 50; // Starting baseline for an attempted topic
      }
      ts.attempts += 1;
      if (isAccepted) {
        ts.accepted += 1;
        ts.score = Math.min(100, ts.score + (attempts === 1 ? 12 : 6) - (hints * 2));
      } else {
        ts.failed += 1;
        ts.score = Math.max(10, ts.score - 6);
      }
    }

    // Update pattern stats
    if (!patternStats[pattern]) {
      patternStats[pattern] = {
        topic,
        score: 50,
        attempts: 0,
        accepted: 0,
        failed: 0,
        accuracy: 0,
        attempted: true,
        lastStatus: status,
        lastQuestionTitle: sub.question?.title || "Practice Question",
        lastDifficulty: sub.difficulty || sub.question?.difficulty || "Easy",
      };
    }

    const ps = patternStats[pattern];
    ps.attempts += 1;
    ps.lastStatus = status;
    ps.lastQuestionTitle = sub.question?.title || ps.lastQuestionTitle;
    ps.lastDifficulty = sub.difficulty || sub.question?.difficulty || ps.lastDifficulty;

    if (isAccepted) {
      ps.accepted += 1;
      ps.score = Math.min(100, ps.score + (attempts === 1 ? 15 : 8) - (hints * 2));
    } else {
      ps.failed += 1;
      ps.score = Math.max(10, ps.score - 8);
    }
  });

  // Compute final accuracies
  Object.values(topicStats).forEach((ts) => {
    if (ts.attempts > 0) {
      ts.accuracy = Math.round((ts.accepted / ts.attempts) * 100);
    }
  });

  Object.values(patternStats).forEach((ps) => {
    if (ps.attempts > 0) {
      ps.accuracy = Math.round((ps.accepted / ps.attempts) * 100);
    }
  });

  const attemptedTopicsList = Object.values(topicStats).filter((t) => t.attempted);
  const overallMastery = attemptedTopicsList.length > 0
    ? Math.round(attemptedTopicsList.reduce((acc, curr) => acc + curr.score, 0) / attemptedTopicsList.length)
    : 0;

  return {
    overallMastery,
    topics: topicStats,
    patterns: patternStats,
    attemptedPatterns: Object.entries(patternStats).map(([name, data]) => ({ name, ...data })),
    hasEnoughData: submissions.length >= 1,
  };
}

/**
 * Identify genuine weak areas and curriculum next steps from real telemetry
 */
export async function identifyWeakAreas(userId) {
  const mastery = await calculateMastery(userId);

  if (!mastery.hasEnoughData || mastery.attemptedPatterns.length === 0) {
    return {
      weakestTopic: "Arrays",
      weakestPattern: "Two Pointers",
      targetDifficulty: "Easy",
      currentMasteryScore: 50,
      reason: "Start your coding journey with core Two Pointers pattern in Arrays to build your problem-solving foundation.",
      isDefaultRecommendation: true,
    };
  }

  const attempted = mastery.attemptedPatterns;

  // 1. Check for genuine struggle in attempted patterns (failed submissions or low accuracy < 75%)
  const strugglingPatterns = attempted.filter((p) => p.failed > 0 || p.accuracy < 75);

  if (strugglingPatterns.length > 0) {
    // Rank by impact: recent failures first, then lowest accuracy, then failure count
    strugglingPatterns.sort((a, b) => {
      const aRecentFail = a.lastStatus !== "ACCEPTED" ? 1 : 0;
      const bRecentFail = b.lastStatus !== "ACCEPTED" ? 1 : 0;
      if (bRecentFail !== aRecentFail) return bRecentFail - aRecentFail;
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return b.failed - a.failed;
    });

    const worst = strugglingPatterns[0];
    let targetDifficulty = worst.lastDifficulty || "Easy";
    if (worst.accuracy === 0 && targetDifficulty === "Hard") targetDifficulty = "Medium";

    let reason = "";
    if (worst.lastStatus !== "ACCEPTED") {
      reason = `You recently encountered an error in ${worst.name} (${worst.accuracy}% accuracy). Master this target problem to solidify your logic.`;
    } else if (worst.accuracy < 50) {
      reason = `Your accuracy in ${worst.name} is ${worst.accuracy}% (${worst.accepted}/${worst.attempts} accepted). Practicing this will reinforce key pattern mechanics.`;
    } else {
      reason = `Your accuracy in ${worst.name} is ${worst.accuracy}%. Solving this recommended problem will help eliminate edge-case errors.`;
    }

    return {
      weakestTopic: worst.topic,
      weakestPattern: worst.name,
      targetDifficulty,
      currentMasteryScore: worst.score,
      reason,
      isDefaultRecommendation: false,
    };
  }

  // 2. If all attempted patterns have high accuracy (>= 75%), check if user has only solved Easy questions and should step up
  const hasOnlyEasy = attempted.every((p) => p.lastDifficulty === "Easy");
  if (hasOnlyEasy) {
    const topPattern = attempted[0];
    return {
      weakestTopic: topPattern.topic,
      weakestPattern: topPattern.name,
      targetDifficulty: "Medium",
      currentMasteryScore: topPattern.score,
      reason: `You've demonstrated solid accuracy (${topPattern.accuracy}%) in Easy ${topPattern.name}! Step up to Medium difficulty to tackle more advanced constraints.`,
      isDefaultRecommendation: false,
    };
  }

  // 3. If user has mastered current topic(s), recommend exploring the next unattempted topic in the curriculum
  const attemptedTopicNames = new Set(Object.keys(mastery.topics).filter((t) => mastery.topics[t].attempted));
  const unattemptedTopic = DEFAULT_TOPICS.find((t) => !attemptedTopicNames.has(t));

  if (unattemptedTopic) {
    const primaryPattern = TOPIC_PRIMARY_PATTERNS[unattemptedTopic]?.[0] || "Fundamentals";
    const lastAttemptedTopicName = Array.from(attemptedTopicNames)[0] || "Arrays";

    return {
      weakestTopic: unattemptedTopic,
      weakestPattern: primaryPattern,
      targetDifficulty: "Easy",
      currentMasteryScore: 60,
      reason: `You've achieved ${mastery.overallMastery}% mastery in ${lastAttemptedTopicName}! Expand your problem-solving breadth by taking on ${unattemptedTopic}.`,
      isDefaultRecommendation: false,
    };
  }

  // 4. All topics attempted with high accuracy: Recommend Hard problems
  const lowestOverall = [...attempted].sort((a, b) => a.score - b.score)[0];
  return {
    weakestTopic: lowestOverall.topic,
    weakestPattern: lowestOverall.name,
    targetDifficulty: "Hard",
    currentMasteryScore: lowestOverall.score,
    reason: `Outstanding ${mastery.overallMastery}% overall mastery! Challenge yourself with advanced Hard problems to prepare for top-tier technical interviews.`,
    isDefaultRecommendation: false,
  };
}

/**
 * Fetch the best next recommended question matching real telemetry
 */
export async function getNextRecommendedQuestion(userId) {
  const weakArea = await identifyWeakAreas(userId);
  const allQuestions = await getAllAvailableQuestions();
  const userSubmissions = await getUserSubmissionsWithQuestions(userId);

  const solvedQuestionIds = new Set(
    userSubmissions
      .filter((s) => s.status === "ACCEPTED")
      .map((s) => s.questionId)
  );

  // Normalize questions with inferred patterns
  const normalizedQuestions = allQuestions.map((q) => ({
    ...q,
    canonicalTopic: normalizeTopic(q.topic),
    inferredPattern: inferPattern(q),
  }));

  const targetTopic = weakArea.weakestTopic;
  const targetPattern = weakArea.weakestPattern;
  const targetDiff = weakArea.targetDifficulty || "Easy";

  // 1. Unsolved question matching topic + pattern + difficulty
  let candidate = normalizedQuestions.find(
    (q) =>
      !solvedQuestionIds.has(q.id) &&
      q.canonicalTopic === targetTopic &&
      q.inferredPattern === targetPattern &&
      q.difficulty === targetDiff
  );

  // 2. Unsolved question matching topic + pattern
  if (!candidate) {
    candidate = normalizedQuestions.find(
      (q) =>
        !solvedQuestionIds.has(q.id) &&
        q.canonicalTopic === targetTopic &&
        q.inferredPattern === targetPattern
    );
  }

  // 3. Unsolved question matching topic + difficulty
  if (!candidate) {
    candidate = normalizedQuestions.find(
      (q) =>
        !solvedQuestionIds.has(q.id) &&
        q.canonicalTopic === targetTopic &&
        q.difficulty === targetDiff
    );
  }

  // 4. Any unsolved question in topic
  if (!candidate) {
    candidate = normalizedQuestions.find(
      (q) => !solvedQuestionIds.has(q.id) && q.canonicalTopic === targetTopic
    );
  }

  // 5. Any unsolved question matching target difficulty
  if (!candidate) {
    candidate = normalizedQuestions.find(
      (q) => !solvedQuestionIds.has(q.id) && q.difficulty === targetDiff
    );
  }

  // 6. Any unsolved question across all
  if (!candidate) {
    candidate = normalizedQuestions.find((q) => !solvedQuestionIds.has(q.id));
  }

  // 7. Fallback to first available question if all are solved
  if (!candidate) {
    candidate = normalizedQuestions[0] || {
      id: 1,
      title: "Largest Element in Array",
      slug: "largest-element-in-array",
      topic: "Arrays",
      canonicalTopic: "Arrays",
      pattern: "Two Pointers",
      inferredPattern: "Two Pointers",
      difficulty: "Easy",
      statement: "Given an array of integers nums, return the largest element present in the array.",
    };
  }

  const finalTopic = candidate.canonicalTopic || candidate.topic || weakArea.weakestTopic;
  const finalPattern = candidate.inferredPattern || candidate.pattern || weakArea.weakestPattern;
  const finalDiff = candidate.difficulty || weakArea.targetDifficulty || "Easy";

  return {
    success: true,
    recommendation: {
      topic: finalTopic,
      pattern: finalPattern,
      difficulty: finalDiff,
      reason: weakArea.reason,
    },
    question: {
      id: candidate.id,
      title: candidate.title,
      slug: candidate.slug,
      statement: candidate.statement,
    },
  };
}
