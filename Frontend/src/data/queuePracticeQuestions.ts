export interface QuestionItem {
  id: number;
  title: string;
  slug: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  statement: string;
  example: {
    input: string;
    output: string;
    explanation: string;
  };
  constraints: string[];
  hints: string[];
  starterCode: string;
}

export const queuePracticeQuestions: QuestionItem[] = [
  // ================= 🟢 EASY (10 Problems) =================
  {
    id: 1,
    title: "Implement Queue Using Array",
    slug: "implement-queue-using-array",
    topic: "Queues & Arrays",
    difficulty: "Easy",
    statement: "Implement a FIFO queue data structure using a fixed-size array supporting enqueue, dequeue, front, and isEmpty.",
    example: {
      input: "enqueue(10), enqueue(20), front(), dequeue(), isEmpty()",
      output: "front: 10, dequeue: 10, isEmpty: false",
      explanation: "Elements are processed in First-In First-Out order."
    },
    constraints: ["1 <= Capacity <= 1000"],
    hints: ["Maintain front and rear indices."],
    starterCode: `class ArrayQueue {
    int arr[1000];
    int frontIdx = 0, rearIdx = 0;
public:
    void enqueue(int x) { arr[rearIdx++] = x; }
    void dequeue() { if (frontIdx < rearIdx) frontIdx++; }
    int front() { return arr[frontIdx]; }
    bool isEmpty() { return frontIdx == rearIdx; }
};`
  },
  {
    id: 2,
    title: "Implement Queue Using Linked List",
    slug: "implement-queue-using-linked-list",
    topic: "Queues & Linked Lists",
    difficulty: "Easy",
    statement: "Implement FIFO queue operations using a singly linked list with front and rear node pointers.",
    example: {
      input: "enqueue(5), enqueue(15), dequeue(), front()",
      output: "dequeue: 5, front: 15",
      explanation: "Front is removed, rear is where new items attach."
    },
    constraints: ["0 <= N <= 10^4"],
    hints: ["Maintain front and rear node pointers."],
    starterCode: `struct Node {
    int val;
    Node* next;
    Node(int x) : val(x), next(nullptr) {}
};

class LinkedListQueue {
    Node *frontPtr = nullptr, *rearPtr = nullptr;
public:
    void enqueue(int x) {
        // Your code here
    }
    void dequeue() {
        // Your code here
    }
};`
  },
  {
    id: 3,
    title: "Implement Circular Queue",
    slug: "implement-circular-queue-easy",
    topic: "Queues & Circular Buffers",
    difficulty: "Easy",
    statement: "Implement a circular queue using an array to reuse deallocated memory slots.",
    example: {
      input: "enqueue(1), enqueue(2), dequeue(), enqueue(3)",
      output: "queue state: [3, 2]",
      explanation: "Slot vacated by 1 is reused when wrapping around."
    },
    constraints: ["1 <= Capacity <= 1000"],
    hints: ["Use modulo arithmetic (idx + 1) % capacity."],
    starterCode: `class CircularQueueEasy {
    int arr[100];
    int front = -1, rear = -1, cap = 100;
public:
    bool enqueue(int x) {
        // Your code here
        return true;
    }
};`
  },
  {
    id: 4,
    title: "Implement Queue Using Stacks",
    slug: "implement-queue-using-stacks",
    topic: "Queues & Stacks",
    difficulty: "Easy",
    statement: "Implement a First-In, First-Out (FIFO) queue using only two LIFO stacks.",
    example: {
      input: "push(1), push(2), peek(), pop(), empty()",
      output: "peek: 1, pop: 1, empty: false",
      explanation: "Transfer elements between stacks when output stack is empty."
    },
    constraints: ["1 <= x <= 9", "At most 100 calls"],
    hints: ["Use inStack for push, outStack for pop/peek."],
    starterCode: `#include <stack>
using namespace std;

class MyQueue {
    stack<int> inSt, outSt;
public:
    void push(int x) { inSt.push(x); }
    int pop() {
        peek();
        int val = outSt.top(); outSt.pop();
        return val;
    }
    int peek() {
        if (outSt.empty()) {
            while (!inSt.empty()) {
                outSt.push(inSt.top());
                inSt.pop();
            }
        }
        return outSt.top();
    }
    bool empty() { return inSt.empty() && outSt.empty(); }
};`
  },
  {
    id: 5,
    title: "Implement Stack Using Queues",
    slug: "implement-stack-using-queues",
    topic: "Queues & Stacks",
    difficulty: "Easy",
    statement: "Implement a Last-In, First-Out (LIFO) stack using only standard FIFO queues.",
    example: {
      input: "push(1), push(2), top(), pop(), empty()",
      output: "top: 2, pop: 2, empty: false",
      explanation: "Rotate elements inside queue during push to keep newest element at front."
    },
    constraints: ["1 <= x <= 9"],
    hints: ["Rotate queue elements size-1 times upon push."],
    starterCode: `#include <queue>
using namespace std;

class MyStack {
    queue<int> q;
public:
    void push(int x) {
        q.push(x);
        for (int i = 0; i < (int)q.size() - 1; i++) {
            q.push(q.front());
            q.pop();
        }
    }
    int pop() { int val = q.front(); q.pop(); return val; }
    int top() { return q.front(); }
    bool empty() { return q.empty(); }
};`
  },
  {
    id: 6,
    title: "Number of Recent Calls",
    slug: "number-of-recent-calls",
    topic: "Queues",
    difficulty: "Easy",
    statement: "Design a RecentCounter class that counts the number of recent requests within the past 3000 milliseconds.",
    example: {
      input: "ping(1), ping(100), ping(3001), ping(3002)",
      output: "[1, 2, 3, 3]",
      explanation: "ping(3002) considers range [2, 3002], excluding 1."
    },
    constraints: ["1 <= t <= 10^9", "Strictly increasing ping calls."],
    hints: ["Store timestamps in a queue, pop timestamps < t - 3000."],
    starterCode: `#include <queue>
using namespace std;

class RecentCounter {
    queue<int> q;
public:
    RecentCounter() {}
    
    int ping(int t) {
        q.push(t);
        while (q.front() < t - 3000) q.pop();
        return q.size();
    }
};`
  },
  {
    id: 7,
    title: "First Unique Character in a String",
    slug: "first-unique-character-in-a-string",
    topic: "Queues & Hash Map",
    difficulty: "Easy",
    statement: "Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.",
    example: {
      input: "s = \"leetcode\"",
      output: "0",
      explanation: "'l' is the first unique character."
    },
    constraints: ["1 <= s.length <= 10^5"],
    hints: ["Use a frequency array or queue to track indices."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int firstUniqChar(string s) {
        // Your code here
        return -1;
    }
};`
  },
  {
    id: 8,
    title: "Generate Binary Numbers from 1 to N",
    slug: "generate-binary-numbers-1-to-n",
    topic: "Queues & BFS",
    difficulty: "Easy",
    statement: "Generate and return binary numbers from 1 to N using a Queue data structure.",
    example: {
      input: "N = 5",
      output: "[\"1\", \"10\", \"11\", \"100\", \"101\"]",
      explanation: "Queue appends '0' and '1' to previous binary strings."
    },
    constraints: ["1 <= N <= 10^4"],
    hints: ["Enqueue \"1\". For each popped string s, append s+\"0\" and s+\"1\"."],
    starterCode: `#include <vector>
#include <string>
#include <queue>
using namespace std;

class Solution {
public:
    vector<string> generateBinary(int n) {
        // Your code here
        return {};
    }
};`
  },
  {
    id: 9,
    title: "Time Needed to Buy Tickets",
    slug: "time-needed-to-buy-tickets",
    topic: "Queues & Simulation",
    difficulty: "Easy",
    statement: "Calculate total time needed for the person at index k to finish buying all their tickets.",
    example: {
      input: "tickets = [2,3,2], k = 2",
      output: "6",
      explanation: "Each pass takes 1 second per ticket."
    },
    constraints: ["1 <= tickets.length <= 100"],
    hints: ["Simulate queue passes or calculate min(tickets[i], tickets[k])."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int timeRequiredToBuy(vector<int>& tickets, int k) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 10,
    title: "Number of Students Unable to Eat Lunch",
    slug: "number-of-students-unable-to-eat-lunch",
    topic: "Queues & Simulation",
    difficulty: "Easy",
    statement: "Calculate how many students are unable to eat lunch given circular/square sandwich preferences.",
    example: {
      input: "students = [1,1,0,0], sandwiches = [0,1,0,1]",
      output: "0",
      explanation: "All students eventually get their preferred sandwich."
    },
    constraints: ["1 <= students.length <= 100"],
    hints: ["Track counts of student preferences for circular (0) and square (1)."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int countStudents(vector<int>& students, vector<int>& sandwiches) {
        // Your code here
        return 0;
    }
};`
  },

  // ================= 🟡 MEDIUM (10 Problems) =================
  {
    id: 11,
    title: "Design Circular Queue",
    slug: "design-circular-queue",
    topic: "Queues & Buffer Design",
    difficulty: "Medium",
    statement: "Design your implementation of the circular queue supporting enQueue, deQueue, Front, Rear, isEmpty, and isFull.",
    example: {
      input: "MyCircularQueue(3), enQueue(1), enQueue(2), enQueue(3), deQueue(), enQueue(4)",
      output: "enQueue(4): true, Rear(): 4",
      explanation: "Reuses index 0 after deQueue."
    },
    constraints: ["1 <= k <= 1000"],
    hints: ["Maintain count of current elements alongside front and rear pointers."],
    starterCode: `class MyCircularQueue {
public:
    MyCircularQueue(int k) {}
    bool enQueue(int value) { return false; }
    bool deQueue() { return false; }
    int Front() { return -1; }
    int Rear() { return -1; }
    bool isEmpty() { return true; }
    bool isFull() { return false; }
};`
  },
  {
    id: 12,
    title: "Sliding Window Maximum",
    slug: "sliding-window-maximum-medium",
    topic: "Monotonic Deque",
    difficulty: "Medium",
    statement: "Given an integer array nums and window size k, return the maximum element in each sliding window.",
    example: {
      input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
      output: "[3,3,5,5,6,7]",
      explanation: "Window [1,3,-1] max is 3, [3,-1,-3] max is 3, etc."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Use monotonic decreasing deque storing indices."],
    starterCode: `#include <vector>
#include <deque>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        // Your code here
        return {};
    }
};`
  },
  {
    id: 13,
    title: "Rotting Oranges",
    slug: "rotting-oranges",
    topic: "BFS & Queues",
    difficulty: "Medium",
    statement: "Return the minimum number of minutes that must elapse until no cell has a fresh orange using multi-source BFS.",
    example: {
      input: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
      output: "4",
      explanation: "Rot spreads to adjacent cells minute by minute."
    },
    constraints: ["1 <= m, n <= 10"],
    hints: ["Enqueue all initial rotten oranges (2) and run BFS."],
    starterCode: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 14,
    title: "Perfect Squares",
    slug: "perfect-squares",
    topic: "BFS Shortest Path",
    difficulty: "Medium",
    statement: "Given an integer n, return the least number of perfect square numbers that sum to n.",
    example: {
      input: "n = 12",
      output: "3",
      explanation: "12 = 4 + 4 + 4."
    },
    constraints: ["1 <= n <= 10^4"],
    hints: ["Model as unweighted graph shortest path problem using BFS."],
    starterCode: `#include <queue>
using namespace std;

class Solution {
public:
    int numSquares(int n) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 15,
    title: "Open the Lock",
    slug: "open-the-lock",
    topic: "BFS & Queues",
    difficulty: "Medium",
    statement: "Find minimum number of wheel turns required to reach target combination without hitting deadends.",
    example: {
      input: "deadends = [\"0201\",\"0101\",\"0102\",\"1212\",\"2002\"], target = \"0202\"",
      output: "6",
      explanation: "Sequence of 6 turns avoids deadends."
    },
    constraints: ["target length == 4"],
    hints: ["BFS level-order exploration of 4-digit lock state graph."],
    starterCode: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        // Your code here
        return -1;
    }
};`
  },
  {
    id: 16,
    title: "Number of Islands",
    slug: "number-of-islands",
    topic: "BFS / DFS Grid",
    difficulty: "Medium",
    statement: "Given an m x n 2D binary grid, return the total number of islands formed by connected 1s.",
    example: {
      input: "grid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]",
      output: "2",
      explanation: "Two distinct connected components of 1s."
    },
    constraints: ["1 <= m, n <= 300"],
    hints: ["When finding '1', run BFS to mark all connected land as visited."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 17,
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    topic: "Tree BFS & Queues",
    difficulty: "Medium",
    statement: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    example: {
      input: "root = [3,9,20,null,null,15,7]",
      output: "[[3],[9,20],[15,7]]",
      explanation: "Grouped by tree depth levels."
    },
    constraints: ["0 <= N <= 2000"],
    hints: ["Process queue.size() elements at each level."],
    starterCode: `struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Your code here
        return {};
    }
};`
  },
  {
    id: 18,
    title: "First Negative Integer in Every Window",
    slug: "first-negative-integer-in-every-window",
    topic: "Sliding Window & Queues",
    difficulty: "Medium",
    statement: "Given an array and window size K, find the first negative integer in every window of size K.",
    example: {
      input: "arr = [-8, 2, 3, -6, 10], K = 2",
      output: "[-8, 0, -6, -6]",
      explanation: "First negative in each window of size 2."
    },
    constraints: ["1 <= N <= 10^5"],
    hints: ["Use queue to store indices of negative numbers."],
    starterCode: `#include <vector>
#include <queue>
using namespace std;

vector<int> printFirstNegativeInteger(vector<int>& arr, int k) {
    // Your code here
    return {};
}`
  },
  {
    id: 19,
    title: "Task Scheduler",
    slug: "task-scheduler",
    topic: "Priority Queue & Greedy",
    difficulty: "Medium",
    statement: "Find minimum CPU intervals needed to finish all tasks considering cooling interval n.",
    example: {
      input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
      output: "8",
      explanation: "A -> B -> idle -> A -> B -> idle -> A -> B."
    },
    constraints: ["1 <= tasks.length <= 10^4", "0 <= n <= 100"],
    hints: ["Use Max-Heap priority queue to schedule most frequent tasks first."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 20,
    title: "Dota2 Senate",
    slug: "dota2-senate",
    topic: "Queues Simulation",
    difficulty: "Medium",
    statement: "Predict which party (Radiant vs Dire) will announce victory in the Dota2 Senate.",
    example: {
      input: "senate = \"RD\"",
      output: "\"Radiant\"",
      explanation: "Radiant bans Dire's right to vote."
    },
    constraints: ["1 <= senate.length <= 10^4"],
    hints: ["Maintain two queues for Radiant and Dire senator index positions."],
    starterCode: `#include <string>
#include <queue>
using namespace std;

class Solution {
public:
    string predictPartyVictory(string senate) {
        // Your code here
        return "";
    }
};`
  },

  // ================= 🔴 HARD (10 Problems) =================
  {
    id: 21,
    title: "Sliding Window Maximum (Hard)",
    slug: "sliding-window-maximum-hard",
    topic: "Monotonic Deque",
    difficulty: "Hard",
    statement: "Return maximum elements in sliding window of size k with optimal O(N) runtime and space.",
    example: {
      input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
      output: "[3,3,5,5,6,7]",
      explanation: "Optimal monotonic double-ended queue implementation."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Pop elements smaller than current element from rear of deque."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        // Your code here
        return {};
    }
};`
  },
  {
    id: 22,
    title: "Shortest Subarray with Sum at Least K",
    slug: "shortest-subarray-with-sum-at-least-k",
    topic: "Monotonic Deque & Prefix Sum",
    difficulty: "Hard",
    statement: "Return the length of the shortest non-empty subarray with sum at least K.",
    example: {
      input: "nums = [2,-1,2], k = 3",
      output: "3",
      explanation: "Subarray [2,-1,2] has sum 3."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Maintain monotonic increasing deque of prefix sums."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int shortestSubarray(vector<int>& nums, int k) {
        // Your code here
        return -1;
    }
};`
  },
  {
    id: 23,
    title: "Jump Game VI",
    slug: "jump-game-vi",
    topic: "DP & Monotonic Deque",
    difficulty: "Hard",
    statement: "Find maximum score achievable jumping at most k steps forward.",
    example: {
      input: "nums = [1,-1,-2,4,-7,3], k = 2",
      output: "7",
      explanation: "Jump path: 1 -> -1 -> 4 -> 3 = 7."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Optimize DP transitions using monotonic deque."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int maxResult(vector<int>& nums, int k) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 24,
    title: "Constrained Subsequence Sum",
    slug: "constrained-subsequence-sum",
    topic: "DP & Monotonic Deque",
    difficulty: "Hard",
    statement: "Return maximum sum of non-empty subsequence such that for every two consecutive elements, difference in original indices is <= k.",
    example: {
      input: "nums = [10,2,-10,5,20], k = 2",
      output: "37",
      explanation: "Subsequence [10, 2, 5, 20] yields sum 37."
    },
    constraints: ["1 <= k <= nums.length <= 10^5"],
    hints: ["Maintain max DP value in sliding window using deque."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int constrainedSubsetSum(vector<int>& nums, int k) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 25,
    title: "Word Ladder",
    slug: "word-ladder",
    topic: "BFS Shortest Path",
    difficulty: "Hard",
    statement: "Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence.",
    example: {
      input: "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
      output: "5",
      explanation: "\"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\" = 5 words."
    },
    constraints: ["1 <= beginWord.length <= 10"],
    hints: ["Word graph shortest path using BFS."],
    starterCode: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 26,
    title: "Minimum Number of Refueling Stops",
    slug: "minimum-number-of-refueling-stops",
    topic: "Priority Queue & Greedy",
    difficulty: "Hard",
    statement: "Return the minimum number of refueling stops required to reach the target location.",
    example: {
      input: "target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]",
      output: "2",
      explanation: "Refuel at station 10 (+60) and 60 (+40)."
    },
    constraints: ["1 <= target <= 10^9"],
    hints: ["Max-Heap stores available gas station capacities passed."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {
        // Your code here
        return -1;
    }
};`
  },
  {
    id: 27,
    title: "Cut Off Trees for Golf Event",
    slug: "cut-off-trees-for-golf-event",
    topic: "BFS Grid Shortest Path",
    difficulty: "Hard",
    statement: "Return the minimum steps needed to cut off all trees in order of their height.",
    example: {
      input: "forest = [[1,2,3],[0,0,4],[7,6,5]]",
      output: "6",
      explanation: "Cut trees in height order: 2, 3, 4, 5, 6, 7."
    },
    constraints: ["m, n <= 50"],
    hints: ["Sort trees by height, run BFS between consecutive tree locations."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int cutOffTree(vector<vector<int>>& forest) {
        // Your code here
        return -1;
    }
};`
  },
  {
    id: 28,
    title: "Bus Routes",
    slug: "bus-routes",
    topic: "BFS & Queues",
    difficulty: "Hard",
    statement: "Return the least number of buses you must take to travel from source stop to target stop.",
    example: {
      input: "routes = [[1,2,7],[3,6,7]], source = 1, target = 6",
      output: "2",
      explanation: "Take bus 1 from stop 1 to 7, then bus 2 from stop 7 to 6."
    },
    constraints: ["1 <= routes.length <= 500"],
    hints: ["BFS where graph nodes are buses/routes."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int numBusesToDestination(vector<vector<int>>& routes, int source, int target) {
        // Your code here
        return -1;
    }
};`
  },
  {
    id: 29,
    title: "Shortest Path in a Grid with Obstacles Elimination",
    slug: "shortest-path-in-a-grid-with-obstacles-elimination",
    topic: "BFS 3D State",
    difficulty: "Hard",
    statement: "Find shortest path from (0,0) to (m-1, n-1) eliminating at most k obstacles.",
    example: {
      input: "grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1",
      output: "6",
      explanation: "Eliminate obstacle at (1,0) to achieve 6-step path."
    },
    constraints: ["m, n <= 40", "k <= m * n"],
    hints: ["BFS state: (row, col, remaining_k)."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int shortestPath(vector<vector<int>>& grid, int k) {
        // Your code here
        return -1;
    }
};`
  },
  {
    id: 30,
    title: "Design a Hit Counter",
    slug: "design-a-hit-counter",
    topic: "Queues & Data Structures Design",
    difficulty: "Hard",
    statement: "Design a hit counter which counts the number of hits received in the past 5 minutes (300 seconds).",
    example: {
      input: "hit(1), hit(2), hit(3), getHits(300), hit(301), getHits(301)",
      output: "getHits(300): 3, getHits(301): 3",
      explanation: "At timestamp 301, hit(1) expires."
    },
    constraints: ["1 <= timestamp <= 2 * 10^9"],
    hints: ["Use queue or circular array of 300 elements with timestamp and count."],
    starterCode: `#include <queue>
using namespace std;

class HitCounter {
    queue<int> q;
public:
    HitCounter() {}
    void hit(int timestamp) { q.push(timestamp); }
    int getHits(int timestamp) {
        while (!q.empty() && q.front() <= timestamp - 300) q.pop();
        return q.size();
    }
};`
  }
];
