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

export const queueLesson: LessonItem[] = [
  {
    id: 1,
    title: "Introduction to Queues",
    description: "Understand the First-In, First-Out (FIFO) queue principle.",
    icon: "⏳",
    content: [
      {
        heading: "What is a Queue?",
        text: "A Queue is a linear data structure following the First-In, First-Out (FIFO) rule. Elements are added at the rear (enqueue) and removed from the front (dequeue).",
        bullets: [
          "FIFO ordering discipline",
          "Enqueue adds to the back, Dequeue removes from the front",
          "Common in print jobs, task schedulers, and breadth-first search"
        ],
        code: `// Conceptual Queue Operations
std::queue<int> q;
q.push(10); // Front: 10
q.push(20); // Front: 10, Rear: 20
q.pop();    // Removes 10, Front: 20`
      }
    ]
  },
  {
    id: 2,
    title: "Queue Operations & Implementation",
    description: "Build enqueue, dequeue, front, and rear operations.",
    icon: "⚙️",
    content: [
      {
        heading: "Array & Linked List Queue Mechanics",
        text: "Using linked lists allows constant O(1) enqueue and dequeue operations without memory movement.",
        code: `class Queue {
    Node *front = nullptr, *rear = nullptr;
public:
    void enqueue(int x) {
        Node* temp = new Node(x);
        if (!rear) { front = rear = temp; return; }
        rear->next = temp;
        rear = temp;
    }
    void dequeue() {
        if (!front) return;
        Node* temp = front;
        front = front->next;
        if (!front) rear = nullptr;
        delete temp;
    }
};`
      }
    ]
  },
  {
    id: 3,
    title: "Circular Queue Architecture",
    description: "Optimize array memory usage with modulo index wrapping.",
    icon: "🔄",
    content: [
      {
        heading: "Modulo Index Wrapping",
        text: "In a fixed-size array queue, wrap rear and front pointers using (index + 1) % CAPACITY to reuse dequeued memory space.",
        code: `class CircularQueue {
    int arr[5];
    int front = -1, rear = -1, size = 5;
public:
    bool enqueue(int value) {
        if ((rear + 1) % size == front) return false; // Full
        if (front == -1) front = 0;
        rear = (rear + 1) % size;
        arr[rear] = value;
        return true;
    }
};`
      }
    ]
  },
  {
    id: 4,
    title: "Implement Queue using Stacks",
    description: "Simulate FIFO queue behavior using two LIFO stacks.",
    icon: "🔀",
    content: [
      {
        heading: "Two-Stack Transfer Pattern",
        text: "Use an input stack for enqueue and an output stack for dequeue. Transfer elements only when output stack is empty.",
        code: `class MyQueue {
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
};`
      }
    ]
  },
  {
    id: 5,
    title: "Double-Ended Queue (Deque)",
    description: "Perform insertion and deletion at both front and rear ends.",
    icon: "↔️",
    content: [
      {
        heading: "Deque Operations",
        text: "A Deque (Double-Ended Queue) allows O(1) push_front, push_back, pop_front, and pop_back operations.",
        code: `std::deque<int> dq;
dq.push_front(1);
dq.push_back(2);
dq.pop_front();
dq.pop_back();`
      }
    ]
  },
  {
    id: 6,
    title: "Sliding Window Maximum (Monotonic Deque)",
    description: "Solve sliding window max problems in linear O(N) time.",
    icon: "🪟",
    content: [
      {
        heading: "Monotonic Decreasing Deque",
        text: "Store indices in a deque in decreasing order of values to find maximums in sliding windows.",
        code: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> res;
    for (int i = 0; i < nums.size(); i++) {
        if (!dq.empty() && dq.front() == i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    return res;
}`
      }
    ]
  },
  {
    id: 7,
    title: "Breadth-First Search (BFS) Traversal",
    description: "Use queues for level-order graph and tree traversals.",
    icon: "🌐",
    content: [
      {
        heading: "Level-Order Queue Pattern",
        text: "Push starting root node to queue. Process front node, pop, and push all unvisited neighbors.",
        code: `void bfs(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* curr = q.front(); q.pop();
        cout << curr->val << " ";
        if (curr->left) q.push(curr->left);
        if (curr->right) q.push(curr->right);
    }
}`
      }
    ]
  },
  {
    id: 8,
    title: "Priority Queue & Max Heap Intro",
    description: "Order elements by priority ranking rather than insertion order.",
    icon: "👑",
    content: [
      {
        heading: "Priority Queue Interface",
        text: "Priority queues automatically maintain highest priority element at the top using a binary heap.",
        code: `std::priority_queue<int> maxHeap;
maxHeap.push(10);
maxHeap.push(30);
maxHeap.push(20);
// Top is 30`
      }
    ]
  },
  {
    id: 9,
    title: "Task Scheduler & Round Robin",
    description: "Simulate operating system process CPU time slicing.",
    icon: "⏱️",
    content: [
      {
        heading: "CPU Scheduling Queue",
        text: "Round Robin schedulers place processes in a circular queue, giving each process a fixed CPU time quantum.",
        bullets: [
          "Ensures fair process CPU allocation",
          "Simulated using FIFO queue and cooling interval timers"
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Rate Limiters & Message Queues",
    description: "Understand production messaging systems like RabbitMQ and Kafka.",
    icon: "🚀",
    content: [
      {
        heading: "Distributed Queue Systems",
        text: "Message queues decouple producers and consumers, enabling asynchronous background processing and load leveling.",
        bullets: [
          "Producer pushes events to queue",
          "Consumer pops events at controlled processing rate"
        ]
      }
    ]
  }
];
