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

export const stackPracticeQuestions: QuestionItem[] = [
  // ================= 🟢 EASY (10 Problems) =================
  {
    id: 1,
    title: "Implement Stack Using Arrays",
    slug: "implement-stack-using-arrays",
    topic: "Stacks & Arrays",
    difficulty: "Easy",
    statement: "Design a stack data structure using a fixed-size array supporting push, pop, top, and isEmpty operations.",
    example: {
      input: "push(1), push(2), top(), pop(), isEmpty()",
      output: "top: 2, pop: 2, isEmpty: false",
      explanation: "Elements are placed sequentially into the array. Top points to index of latest element."
    },
    constraints: ["1 <= Capacity <= 1000", "-10^4 <= val <= 10^4"],
    hints: ["Maintain a top index variable initialized to -1.", "Increment top on push, decrement on pop."],
    starterCode: `class ArrayStack {
    int arr[1000];
    int topIdx = -1;
public:
    void push(int x) { arr[++topIdx] = x; }
    void pop() { if (topIdx >= 0) topIdx--; }
    int top() { return (topIdx >= 0) ? arr[topIdx] : -1; }
    bool isEmpty() { return topIdx == -1; }
};`
  },
  {
    id: 2,
    title: "Implement Stack Using Linked List",
    slug: "implement-stack-using-linked-list",
    topic: "Stacks & Linked Lists",
    difficulty: "Easy",
    statement: "Implement LIFO stack operations using a singly linked list where push and pop operate at the head.",
    example: {
      input: "push(10), push(20), pop(), top()",
      output: "pop: 20, top: 10",
      explanation: "Head node acts as top of stack for O(1) time complexity."
    },
    constraints: ["0 <= number of operations <= 10^4"],
    hints: ["New nodes should be attached at head during push.", "Pop moves head to head->next."],
    starterCode: `struct Node {
    int val;
    Node* next;
    Node(int x) : val(x), next(nullptr) {}
};

class LinkedListStack {
    Node* head = nullptr;
public:
    void push(int x) {
        Node* temp = new Node(x);
        temp->next = head;
        head = temp;
    }
    int pop() {
        if (!head) return -1;
        int val = head->val;
        Node* temp = head;
        head = head->next;
        delete temp;
        return val;
    }
};`
  },
  {
    id: 3,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    topic: "Stacks & Strings",
    difficulty: "Easy",
    statement: "Given a string s containing '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    example: {
      input: "s = \"()[]{}\"",
      output: "true",
      explanation: "Every open bracket is closed by the corresponding type of bracket in correct order."
    },
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Use a stack to store open brackets.", "When seeing a close bracket, verify it matches top of stack."],
    starterCode: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top(); st.pop();
                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;
            }
        }
        return st.empty();
    }
};`
  },
  {
    id: 4,
    title: "Min Stack",
    slug: "min-stack",
    topic: "Stacks",
    difficulty: "Easy",
    statement: "Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) constant time.",
    example: {
      input: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",
      output: "getMin: -3, top: 0, getMin: -2",
      explanation: "Auxiliary min stack keeps track of current running minimum."
    },
    constraints: ["-2^31 <= val <= 2^31 - 1"],
    hints: ["Maintain two stacks: one for values, one for current minimums."],
    starterCode: `#include <stack>
using namespace std;

class MinStack {
    stack<int> st, minSt;
public:
    void push(int val) {
        st.push(val);
        if (minSt.empty() || val <= minSt.top()) minSt.push(val);
    }
    void pop() {
        if (st.top() == minSt.top()) minSt.pop();
        st.pop();
    }
    int top() { return st.top(); }
    int getMin() { return minSt.top(); }
};`
  },
  {
    id: 5,
    title: "Evaluate Reverse Polish Notation (Easy)",
    slug: "eval-rpn-easy",
    topic: "Stacks",
    difficulty: "Easy",
    statement: "Evaluate the value of an arithmetic expression in Reverse Polish Notation given tokens like [\"2\", \"1\", \"+\", \"3\", \"*\"].",
    example: {
      input: "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
      output: "9",
      explanation: "((2 + 1) * 3) = 9"
    },
    constraints: ["1 <= tokens.length <= 10^4"],
    hints: ["Push operands to stack. On operator, pop two operands and compute."],
    starterCode: `#include <vector>
#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        for (string& t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                int b = st.top(); st.pop();
                int a = st.top(); st.pop();
                if (t == "+") st.push(a + b);
                else if (t == "-") st.push(a - b);
                else if (t == "*") st.push(a * b);
                else if (t == "/") st.push(a / b);
            } else st.push(stoi(t));
        }
        return st.top();
    }
};`
  },
  {
    id: 6,
    title: "Remove Outermost Parentheses",
    slug: "remove-outermost-parentheses",
    topic: "Stacks & Strings",
    difficulty: "Easy",
    statement: "Return s after removing the outermost parentheses of every primitive valid parenthesis string in s.",
    example: {
      input: "s = \"(()())(())\"",
      output: "\"()()()\"",
      explanation: "Primitive strings are \"(()())\" and \"(())\". Outer parens removed."
    },
    constraints: ["1 <= s.length <= 10^5"],
    hints: ["Track depth counter."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    string removeOuterParentheses(string s) {
        string res;
        int depth = 0;
        for (char c : s) {
            if (c == '(') {
                if (depth > 0) res += c;
                depth++;
            } else {
                depth--;
                if (depth > 0) res += c;
            }
        }
        return res;
    }
};`
  },
  {
    id: 7,
    title: "Backspace String Compare",
    slug: "backspace-string-compare",
    topic: "Stacks & Strings",
    difficulty: "Easy",
    statement: "Given two strings s and t, return true if they are equal when both are typed into empty text editors ('#' means backspace).",
    example: {
      input: "s = \"ab#c\", t = \"ad#c\"",
      output: "true",
      explanation: "Both s and t become \"ac\" after applying backspaces."
    },
    constraints: ["1 <= s.length, t.length <= 200"],
    hints: ["Simulate typing using stack for each string."],
    starterCode: `#include <string>
#include <stack>
using namespace std;

class Solution {
    string process(string str) {
        string res;
        for (char c : str) {
            if (c == '#') { if (!res.empty()) res.pop_back(); }
            else res.push_back(c);
        }
        return res;
    }
public:
    bool backspaceCompare(string s, string t) {
        return process(s) == process(t);
    }
};`
  },
  {
    id: 8,
    title: "Make The String Great",
    slug: "make-the-string-great",
    topic: "Stacks & Strings",
    difficulty: "Easy",
    statement: "A good string does not contain two adjacent characters where one is lowercase and the other is uppercase of the same letter.",
    example: {
      input: "s = \"leEeetcode\"",
      output: "\"leetcode\"",
      explanation: "'e' and 'E' trigger removal, leaving \"leetcode\"."
    },
    constraints: ["1 <= s.length <= 100"],
    hints: ["Use stack to compare incoming character with top of stack."],
    starterCode: `#include <string>
#include <cmath>
using namespace std;

class Solution {
public:
    string makeGood(string s) {
        string res;
        for (char c : s) {
            if (!res.empty() && abs(res.back() - c) == 32) res.pop_back();
            else res.push_back(c);
        }
        return res;
    }
};`
  },
  {
    id: 9,
    title: "Baseball Game",
    slug: "baseball-game",
    topic: "Stacks",
    difficulty: "Easy",
    statement: "Keep score of a baseball game with operations '+' (sum of last 2), 'D' (double last), 'C' (cancel last score), or integer.",
    example: {
      input: "ops = [\"5\",\"2\",\"C\",\"D\",\"+\"]",
      output: "30",
      explanation: "Scores sum up to 30."
    },
    constraints: ["1 <= ops.length <= 1000"],
    hints: ["Use vector/stack to record scores."],
    starterCode: `#include <vector>
#include <string>
#include <numeric>
using namespace std;

class Solution {
public:
    int calPoints(vector<string>& ops) {
        vector<int> st;
        for (string& op : ops) {
            if (op == "+") st.push_back(st.back() + st[st.size() - 2]);
            else if (op == "D") st.push_back(2 * st.back());
            else if (op == "C") st.pop_back();
            else st.push_back(stoi(op));
        }
        int sum = 0;
        for (int x : st) sum += x;
        return sum;
    }
};`
  },
  {
    id: 10,
    title: "Next Greater Element I",
    slug: "next-greater-element-i",
    topic: "Monotonic Stack",
    difficulty: "Easy",
    statement: "Find the next greater element for each value of nums1 in nums2.",
    example: {
      input: "nums1 = [4,1,2], nums2 = [1,3,4,2]",
      output: "[-1,3,-1]",
      explanation: "Next greater for 4 is -1, for 1 is 3, for 2 is -1."
    },
    constraints: ["1 <= nums1.length <= nums2.length <= 1000"],
    hints: ["Use monotonic stack + unordered_map on nums2."],
    starterCode: `#include <vector>
#include <unordered_map>
#include <stack>
using namespace std;

class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> mp;
        stack<int> st;
        for (int x : nums2) {
            while (!st.empty() && st.top() < x) {
                mp[st.top()] = x;
                st.pop();
            }
            st.push(x);
        }
        vector<int> res;
        for (int x : nums1) res.push_back(mp.count(x) ? mp[x] : -1);
        return res;
    }
};`
  },

  // ================= 🟡 MEDIUM (10 Problems) =================
  {
    id: 11,
    title: "Daily Temperatures",
    slug: "daily-temperatures",
    topic: "Monotonic Stack",
    difficulty: "Medium",
    statement: "Given an array of temperatures, return an array answer such that answer[i] is the number of days you have to wait after the i-th day to get a warmer temperature.",
    example: {
      input: "temperatures = [73,74,75,71,69,72,76,73]",
      output: "[1,1,4,2,1,1,0,0]",
      explanation: "73 -> 74 (1 day), 75 -> 76 (4 days), etc."
    },
    constraints: ["1 <= temperatures.length <= 10^5"],
    hints: ["Use a monotonic decreasing stack storing indices."],
    starterCode: `#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        stack<int> st;
        for (int i = 0; i < n; i++) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int idx = st.top(); st.pop();
                res[idx] = i - idx;
            }
            st.push(i);
        }
        return res;
    }
};`
  },
  {
    id: 12,
    title: "Next Greater Element II",
    slug: "next-greater-element-ii",
    topic: "Monotonic Stack",
    difficulty: "Medium",
    statement: "Given a circular integer array nums, return the next greater number for every element in nums.",
    example: {
      input: "nums = [1,2,1]",
      output: "[2,-1,2]",
      explanation: "First 1 -> 2, 2 -> -1 (no greater), second 1 -> 2 (circular)."
    },
    constraints: ["1 <= nums.length <= 10^4"],
    hints: ["Simulate circular array by iterating 2 * N times with modulo i % N."],
    starterCode: `#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, -1);
        stack<int> st;
        for (int i = 0; i < 2 * n; i++) {
            while (!st.empty() && nums[i % n] > nums[st.top()]) {
                res[st.top()] = nums[i % n];
                st.pop();
            }
            if (i < n) st.push(i);
        }
        return res;
    }
};`
  },
  {
    id: 13,
    title: "Asteroid Collision",
    slug: "asteroid-collision",
    topic: "Stacks",
    difficulty: "Medium",
    statement: "Find out the state of asteroids after all collisions (positive right, negative left).",
    example: {
      input: "asteroids = [5,10,-5]",
      output: "[5,10]",
      explanation: "10 and -5 collide, 10 wins. Final state [5,10]."
    },
    constraints: ["2 <= asteroids.length <= 10^4"],
    hints: ["Use stack to resolve moving right vs moving left collisions."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> st;
        for (int a : asteroids) {
            bool destroyed = false;
            while (!st.empty() && st.back() > 0 && a < 0) {
                if (st.back() < -a) { st.pop_back(); continue; }
                else if (st.back() == -a) { st.pop_back(); }
                destroyed = true;
                break;
            }
            if (!destroyed) st.push_back(a);
        }
        return st;
    }
};`
  },
  {
    id: 14,
    title: "Decode String",
    slug: "decode-string",
    topic: "Stacks & Strings",
    difficulty: "Medium",
    statement: "Given an encoded string k[encoded_string], return its decoded string.",
    example: {
      input: "s = \"3[a]2[bc]\"",
      output: "\"aaabcbc\"",
      explanation: "Expand 3[a] to aaa and 2[bc] to bcbc."
    },
    constraints: ["1 <= s.length <= 30"],
    hints: ["Use count stack and string stack to handle nested brackets."],
    starterCode: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    string decodeString(string s) {
        stack<int> countSt;
        stack<string> stringSt;
        string curr = "";
        int k = 0;
        for (char c : s) {
            if (isdigit(c)) k = k * 10 + (c - '0');
            else if (c == '[') {
                countSt.push(k);
                stringSt.push(curr);
                k = 0; curr = "";
            } else if (c == ']') {
                string temp = curr;
                curr = stringSt.top(); stringSt.pop();
                int repeat = countSt.top(); countSt.pop();
                while (repeat--) curr += temp;
            } else curr += c;
        }
        return curr;
    }
};`
  },
  {
    id: 15,
    title: "Simplify Path",
    slug: "simplify-path",
    topic: "Stacks & Strings",
    difficulty: "Medium",
    statement: "Given an absolute Unix file path, convert it to the simplified canonical path.",
    example: {
      input: "path = \"/home//foo/\"",
      output: "\"/home/foo\"",
      explanation: "Multiple slashes are replaced by single slash, trailing slash removed."
    },
    constraints: ["1 <= path.length <= 3000"],
    hints: ["Split by '/' and use stack for directory traversal ('..' pops)."],
    starterCode: `#include <string>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    string simplifyPath(string path) {
        vector<string> st;
        stringstream ss(path);
        string dir;
        while (getline(ss, dir, '/')) {
            if (dir == "" || dir == ".") continue;
            if (dir == "..") { if (!st.empty()) st.pop_back(); }
            else st.push_back(dir);
        }
        string res = "";
        for (string s : st) res += "/" + s;
        return res.empty() ? "/" : res;
    }
};`
  },
  {
    id: 16,
    title: "Evaluate Reverse Polish Notation",
    slug: "evaluate-reverse-polish-notation",
    topic: "Stacks",
    difficulty: "Medium",
    statement: "Evaluate the value of an arithmetic expression in Reverse Polish Notation with division truncating towards zero.",
    example: {
      input: "tokens = [\"4\",\"13\",\"5\",\"/\",\"+\"]",
      output: "6",
      explanation: "4 + (13 / 5) = 4 + 2 = 6."
    },
    constraints: ["1 <= tokens.length <= 10^4"],
    hints: ["Stack holds operands, handle integer division truncation."],
    starterCode: `#include <vector>
#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        for (string& t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                int b = st.top(); st.pop();
                int a = st.top(); st.pop();
                if (t == "+") st.push(a + b);
                else if (t == "-") st.push(a - b);
                else if (t == "*") st.push(a * b);
                else if (t == "/") st.push(a / b);
            } else st.push(stoi(t));
        }
        return st.top();
    }
};`
  },
  {
    id: 17,
    title: "Online Stock Span",
    slug: "online-stock-span",
    topic: "Monotonic Stack",
    difficulty: "Medium",
    statement: "Design an algorithm that collects daily price quotes and returns the span of that day's price.",
    example: {
      input: "next(100), next(80), next(60), next(70), next(60), next(75)",
      output: "[1, 1, 1, 2, 1, 4]",
      explanation: "Span of 75 is 4 because 75 >= 60, 70, 60."
    },
    constraints: ["1 <= price <= 10^5"],
    hints: ["Use stack storing pair<price, span>."],
    starterCode: `#include <stack>
using namespace std;

class StockSpanner {
    stack<pair<int, int>> st;
public:
    StockSpanner() {}
    
    int next(int price) {
        int span = 1;
        while (!st.empty() && st.top().first <= price) {
            span += st.top().second;
            st.pop();
        }
        st.push({price, span});
        return span;
    }
};`
  },
  {
    id: 18,
    title: "Remove K Digits",
    slug: "remove-k-digits",
    topic: "Monotonic Stack & Greedy",
    difficulty: "Medium",
    statement: "Given string num representing a non-negative integer and an integer k, return the smallest possible integer after removing k digits.",
    example: {
      input: "num = \"1432219\", k = 3",
      output: "\"1219\"",
      explanation: "Remove 4, 3, 2 to get smallest number 1219."
    },
    constraints: ["1 <= k <= num.length <= 10^5"],
    hints: ["Use monotonic increasing stack to drop larger digits."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    string removeKdigits(string num, int k) {
        string st = "";
        for (char c : num) {
            while (!st.empty() && k > 0 && st.back() > c) {
                st.pop_back();
                k--;
            }
            st.push_back(c);
        }
        while (k > 0 && !st.empty()) { st.pop_back(); k--; }
        int idx = 0;
        while (idx < (int)st.size() && st[idx] == '0') idx++;
        string res = st.substr(idx);
        return res.empty() ? "0" : res;
    }
};`
  },
  {
    id: 19,
    title: "Car Fleet",
    slug: "car-fleet",
    topic: "Stacks & Sorting",
    difficulty: "Medium",
    statement: "Calculate how many car fleets will arrive at the target destination.",
    example: {
      input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
      output: "3",
      explanation: "Cars form 3 fleets reaching target."
    },
    constraints: ["N <= 10^5, target <= 10^6"],
    hints: ["Sort cars by position descending, compute time to target."],
    starterCode: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = position.size();
        vector<pair<int, double>> cars(n);
        for (int i = 0; i < n; i++) {
            cars[i] = {position[i], (double)(target - position[i]) / speed[i]};
        }
        sort(cars.rbegin(), cars.rend());
        int fleets = 0;
        double maxTime = 0;
        for (auto& car : cars) {
            if (car.second > maxTime) {
                fleets++;
                maxTime = car.second;
            }
        }
        return fleets;
    }
};`
  },
  {
    id: 20,
    title: "132 Pattern",
    slug: "132-pattern",
    topic: "Monotonic Stack",
    difficulty: "Medium",
    statement: "Given an array of n integers nums, return true if there is a 132 pattern (i < j < k and nums[i] < nums[k] < nums[j]).",
    example: {
      input: "nums = [3,1,4,2]",
      output: "true",
      explanation: "Pattern [1, 4, 2] satisfies 1 < 2 < 4."
    },
    constraints: ["n == nums.length <= 2 * 10^5"],
    hints: ["Traverse right to left with monotonic stack tracking 3rd element."],
    starterCode: `#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        int s3 = -2e9;
        stack<int> st;
        for (int i = nums.size() - 1; i >= 0; i--) {
            if (nums[i] < s3) return true;
            while (!st.empty() && nums[i] > st.top()) {
                s3 = st.top(); st.pop();
            }
            st.push(nums[i]);
        }
        return false;
    }
};`
  },

  // ================= 🔴 HARD (10 Problems) =================
  {
    id: 21,
    title: "Largest Rectangle in Histogram",
    slug: "largest-rectangle-in-histogram-stack",
    topic: "Monotonic Stack",
    difficulty: "Hard",
    statement: "Given an array of integers heights representing the histogram's bar height, return the area of the largest rectangle.",
    example: {
      input: "heights = [2,1,5,6,2,3]",
      output: "10",
      explanation: "Rectangle of height 5 and width 2 (bars 5 and 6) has area = 10."
    },
    constraints: ["1 <= heights.length <= 10^5"],
    hints: ["Maintain monotonic increasing stack of index positions."],
    starterCode: `#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0);
        stack<int> st;
        int maxArea = 0;
        for (int i = 0; i < (int)heights.size(); i++) {
            while (!st.empty() && heights[i] < heights[st.top()]) {
                int h = heights[st.top()]; st.pop();
                int w = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, h * w);
            }
            st.push(i);
        }
        return maxArea;
    }
};`
  },
  {
    id: 22,
    title: "Maximal Rectangle",
    slug: "maximal-rectangle",
    topic: "Monotonic Stack & DP",
    difficulty: "Hard",
    statement: "Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.",
    example: {
      input: "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"]]",
      output: "6",
      explanation: "Maximal 1s rectangle has area 6."
    },
    constraints: ["rows == matrix.length <= 200"],
    hints: ["Apply Largest Rectangle in Histogram row by row."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 23,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water-stack",
    topic: "Monotonic Stack & Two Pointers",
    difficulty: "Hard",
    statement: "Given n non-negative integers representing an elevation map where width of each bar is 1, compute how much water it can trap after raining.",
    example: {
      input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
      output: "6",
      explanation: "Trapped water volume is 6 units."
    },
    constraints: ["n == height.length <= 2 * 10^4"],
    hints: ["Use stack to record bounded height troughs."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 24,
    title: "Basic Calculator",
    slug: "basic-calculator",
    topic: "Stacks & Math",
    difficulty: "Hard",
    statement: "Given a string s representing a valid expression with '+', '-', '(', ')' and non-negative integers, evaluate it.",
    example: {
      input: "s = \"(1+(4+5+2)-3)+(6+8)\"",
      output: "23",
      explanation: "Evaluates to 23."
    },
    constraints: ["1 <= s.length <= 3 * 10^5"],
    hints: ["Use stack to save current result and sign when entering parentheses."],
    starterCode: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    int calculate(string s) {
        stack<int> st;
        int res = 0, sign = 1, val = 0;
        for (char c : s) {
            if (isdigit(c)) val = val * 10 + (c - '0');
            else if (c == '+') { res += sign * val; val = 0; sign = 1; }
            else if (c == '-') { res += sign * val; val = 0; sign = -1; }
            else if (c == '(') { st.push(res); st.push(sign); res = 0; sign = 1; }
            else if (c == ')') {
                res += sign * val; val = 0;
                res *= st.top(); st.pop();
                res += st.top(); st.pop();
            }
        }
        return res + sign * val;
    }
};`
  },
  {
    id: 25,
    title: "Basic Calculator II",
    slug: "basic-calculator-ii",
    topic: "Stacks & Expression Parsing",
    difficulty: "Hard",
    statement: "Given a string s representing an expression with '+', '-', '*', '/', evaluate it considering operator precedence.",
    example: {
      input: "s = \" 3+5 / 2 \"",
      output: "5",
      explanation: "5 / 2 = 2, 3 + 2 = 5."
    },
    constraints: ["1 <= s.length <= 3 * 10^5"],
    hints: ["Process multiplication and division immediately using stack."],
    starterCode: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    int calculate(string s) {
        stack<int> st;
        char op = '+';
        int val = 0;
        for (size_t i = 0; i < s.length(); i++) {
            if (isdigit(s[i])) val = val * 10 + (s[i] - '0');
            if ((!isdigit(s[i]) && s[i] != ' ') || i == s.length() - 1) {
                if (op == '+') st.push(val);
                else if (op == '-') st.push(-val);
                else if (op == '*') { int top = st.top(); st.pop(); st.push(top * val); }
                else if (op == '/') { int top = st.top(); st.pop(); st.push(top / val); }
                op = s[i]; val = 0;
            }
        }
        int res = 0;
        while (!st.empty()) { res += st.top(); st.pop(); }
        return res;
    }
};`
  },
  {
    id: 26,
    title: "Longest Valid Parentheses",
    slug: "longest-valid-parentheses",
    topic: "Stacks & DP",
    difficulty: "Hard",
    statement: "Given a string containing just '(' and ')', return the length of the longest valid parentheses substring.",
    example: {
      input: "s = \")()())\"",
      output: "4",
      explanation: "Longest valid substring is \"()()\"."
    },
    constraints: ["0 <= s.length <= 3 * 10^4"],
    hints: ["Store indices of unmatched parentheses in stack."],
    starterCode: `#include <string>
#include <stack>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestValidParentheses(string s) {
        stack<int> st;
        st.push(-1);
        int maxLen = 0;
        for (int i = 0; i < (int)s.length(); i++) {
            if (s[i] == '(') st.push(i);
            else {
                st.pop();
                if (st.empty()) st.push(i);
                else maxLen = max(maxLen, i - st.top());
            }
        }
        return maxLen;
    }
};`
  },
  {
    id: 27,
    title: "Reverse Nodes in k-Group",
    slug: "reverse-nodes-in-k-group-stack",
    topic: "Linked Lists & Stacks",
    difficulty: "Hard",
    statement: "Given the head of a linked list, reverse the nodes of the list k at a time, and return its modified list.",
    example: {
      input: "head = [1,2,3,4,5], k = 2",
      output: "[2,1,4,3,5]",
      explanation: "Groups of 2 are reversed."
    },
    constraints: ["1 <= k <= n <= 5000"],
    hints: ["Use stack to push k node pointers before reversing links."],
    starterCode: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        // Your code here
        return head;
    }
};`
  },
  {
    id: 28,
    title: "Sum of Subarray Minimums",
    slug: "sum-of-subarray-minimums",
    topic: "Monotonic Stack",
    difficulty: "Hard",
    statement: "Given an array of integers arr, find the sum of min(b), where b ranges over every contiguous subarray of arr (modulo 10^9 + 7).",
    example: {
      input: "arr = [3,1,2,4]",
      output: "17",
      explanation: "Subarrays min sum = 17."
    },
    constraints: ["1 <= arr.length <= 3 * 10^4"],
    hints: ["Find Next Smaller Element & Previous Smaller Element for each index."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 29,
    title: "Maximum Frequency Stack",
    slug: "maximum-frequency-stack",
    topic: "Stacks & Hash Maps",
    difficulty: "Hard",
    statement: "Design a stack-like data structure to push elements and pop the most frequent element. If tie, pop most recent.",
    example: {
      input: "push(5), push(7), push(5), push(7), push(4), push(5), pop(), pop(), pop(), pop()",
      output: "pops: 5, 7, 5, 4",
      explanation: "5 has frequency 3, popped first."
    },
    constraints: ["At most 2 * 10^4 calls to push and pop."],
    hints: ["Map frequency to stack of elements with that frequency."],
    starterCode: `#include <unordered_map>
#include <stack>
using namespace std;

class FreqStack {
    unordered_map<int, int> freq;
    unordered_map<int, stack<int>> group;
    int maxFreq = 0;
public:
    void push(int val) {
        int f = ++freq[val];
        if (f > maxFreq) maxFreq = f;
        group[f].push(val);
    }
    int pop() {
        int val = group[maxFreq].top();
        group[maxFreq].pop();
        freq[val]--;
        if (group[maxFreq].empty()) maxFreq--;
        return val;
    }
};`
  },
  {
    id: 30,
    title: "Expression Add Operators",
    slug: "expression-add-operators-stack",
    topic: "Backtracking & Expression Stack",
    difficulty: "Hard",
    statement: "Given string num and target integer, return all possibilities to insert binary operators '+', '-', or '*' between digits to evaluate to target.",
    example: {
      input: "num = \"123\", target = 6",
      output: "[\"1*2*3\", \"1+2+3\"]",
      explanation: "Both expressions yield 6."
    },
    constraints: ["1 <= num.length <= 10"],
    hints: ["Backtrack tracking prev value to handle operator precedence."],
    starterCode: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<string> addOperators(string num, int target) {
        // Your code here
        return {};
    }
};`
  }
];
