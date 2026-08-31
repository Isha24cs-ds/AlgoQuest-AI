export interface LessonSection {
  heading: string;
  text?: string;
  bullets?: string[];
  code?: string;
}

export interface LessonItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  content?: LessonSection[];
}

export const stackLesson: LessonItem[] = [
  {
    id: 1,
    title: "Introduction to Stacks",
    description: "Understand the Last-In, First-Out (LIFO) stack principle.",
    icon: "📚",
    content: [
      {
        heading: "What is a Stack?",
        text: "A Stack is a linear data structure that follows the Last-In, First-Out (LIFO) principle. The last element added to the stack is the first one to be removed.",
        bullets: [
          "LIFO ordering behavior",
          "All operations occur strictly at the top of the stack",
          "Used in function call stacks, undo/redo mechanisms, and expression evaluations"
        ],
        code: `// Conceptual Stack Operations
std::stack<int> s;
s.push(10); // Top: 10
s.push(20); // Top: 20 -> 10
s.pop();    // Removes 20, Top: 10`
      }
    ]
  },
  {
    id: 2,
    title: "Stack Operations: Push, Pop & Peek",
    description: "Master constant O(1) time complexity stack methods.",
    icon: "⚡",
    content: [
      {
        heading: "Core Stack Interface",
        text: "All primary stack operations — Push, Pop, Peek (Top), and isEmpty — run in O(1) time.",
        code: `class Stack {
    int arr[1000];
    int topIndex = -1;

public:
    void push(int x) { arr[++topIndex] = x; }
    void pop() { if (topIndex >= 0) topIndex--; }
    int top() { return arr[topIndex]; }
    bool empty() { return topIndex == -1; }
};`
      }
    ]
  },
  {
    id: 3,
    title: "Valid Parentheses Matching",
    description: "Solve the classic string bracket matching problem using stacks.",
    icon: "🧩",
    content: [
      {
        heading: "Bracket Matching Algorithm",
        text: "Push opening brackets onto the stack. When encountering a closing bracket, verify that the top matches.",
        code: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}`
      }
    ]
  },
  {
    id: 4,
    title: "Min Stack Design",
    description: "Retrieve the minimum element in O(1) constant time.",
    icon: "💎",
    content: [
      {
        heading: "Auxiliary Min Stack Pattern",
        text: "Maintain a secondary stack alongside the main stack to track cumulative minimum values.",
        code: `class MinStack {
    stack<int> st;
    stack<int> minSt;
public:
    void push(int val) {
        st.push(val);
        if (minSt.empty() || val <= minSt.top()) {
            minSt.push(val);
        }
    }
    void pop() {
        if (st.top() == minSt.top()) minSt.pop();
        st.pop();
    }
    int getMin() { return minSt.top(); }
};`
      }
    ]
  },
  {
    id: 5,
    title: "Evaluate Reverse Polish Notation (Postfix)",
    description: "Evaluate arithmetic expressions formatted in postfix notation.",
    icon: "🧮",
    content: [
      {
        heading: "Postfix Evaluation Strategy",
        text: "Push operands onto the stack. When an operator is encountered, pop the top two operands, compute the result, and push it back.",
        code: `int evalRPN(vector<string>& tokens) {
    stack<int> st;
    for (string& t : tokens) {
        if (t == "+" || t == "-" || t == "*" || t == "/") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            if (t == "+") st.push(a + b);
            else if (t == "-") st.push(a - b);
            else if (t == "*") st.push(a * b);
            else if (t == "/") st.push(a / b);
        } else {
            st.push(stoi(t));
        }
    }
    return st.top();
}`
      }
    ]
  },
  {
    id: 6,
    title: "Monotonic Stack Pattern",
    description: "Find next greater or smaller elements efficiently in O(N) time.",
    icon: "📈",
    content: [
      {
        heading: "Next Greater Element Pattern",
        text: "Maintain elements in strictly increasing or decreasing order inside the stack to find the next greater element in linear time.",
        code: `vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, -1);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            res[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return res;
}`
      }
    ]
  },
  {
    id: 7,
    title: "Daily Temperatures Problem",
    description: "Apply monotonic stacks to calculate days until warmer weather.",
    icon: "🌡️",
    content: [
      {
        heading: "Index Distance Tracking",
        text: "Store indices on the stack. Calculate difference in indices when a higher temperature is reached.",
        code: `vector<int> dailyTemperatures(vector<int>& T) {
    int n = T.size();
    vector<int> res(n, 0);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && T[i] > T[st.top()]) {
            int idx = st.top(); st.pop();
            res[idx] = i - idx;
        }
        st.push(i);
    }
    return res;
}`
      }
    ]
  },
  {
    id: 8,
    title: "Infix to Postfix Conversion",
    description: "Use operator precedence stack logic to parse expressions.",
    icon: "🔀",
    content: [
      {
        heading: "Shunting-Yard Algorithm Concept",
        text: "Process tokens sequentially, pushing operators based on precedence rules to generate postfix output.",
        bullets: [
          "Operands go directly to output stream",
          "Operators placed on stack based on higher/lower precedence",
          "Parentheses define precedence override boundaries"
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Largest Rectangle in Histogram",
    description: "Advanced monotonic stack application for computing max area.",
    icon: "📊",
    content: [
      {
        heading: "Histogram Boundary Calculation",
        text: "Use monotonic stack to determine left and right boundaries for each bar height.",
        bullets: [
          "Maintains strictly increasing bar indices",
          "Computes maximum area in single O(N) pass"
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Function Call Stack & Recursion",
    description: "Understand how compilers use call stacks for function execution.",
    icon: "💻",
    content: [
      {
        heading: "Execution Context Stack",
        text: "Every function call pushes a new stack frame containing local variables and return addresses. Stack overflow occurs when frames exceed limit.",
        bullets: [
          "Base cases prevent infinite stack frame allocation",
          "Tail-call optimization reduces frame overhead"
        ]
      }
    ]
  }
];
