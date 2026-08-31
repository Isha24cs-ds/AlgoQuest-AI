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

export const linkedListLesson: LessonItem[] = [
  {
    id: 1,
    title: "Introduction to Linked Lists",
    description: "Understand node structures, pointers, and memory comparison with arrays.",
    icon: "🔗",
    content: [
      {
        heading: "What is a Linked List?",
        text: "A Linked List is a linear data structure where elements (called nodes) are not stored in contiguous memory locations. Each node contains data and a reference (or pointer) to the next node in the sequence.",
        bullets: [
          "Dynamic size allocation at runtime without pre-declaring memory boundaries",
          "Efficient insertion and deletion operations (O(1) time at head)",
          "Sequential access only — requires O(N) traversal to reach index i"
        ],
        code: `// Node definition in C++
struct Node {
    int data;
    Node* next;

    Node(int val) : data(val), next(nullptr) {}
};`
      }
    ]
  },
  {
    id: 2,
    title: "Singly Linked List Construction",
    description: "Learn how to build, instantiate, and link nodes together.",
    icon: "🏗️",
    content: [
      {
        heading: "Creating & Linking Nodes",
        text: "In a Singly Linked List, each node holds data and a single pointer pointing to the successor node. The last node's next pointer points to NULL.",
        bullets: [
          "Head pointer tracks the starting entry point of the list",
          "Null pointer designates the terminal end of the list"
        ],
        code: `// Creating a 3-node list: 10 -> 20 -> 30
Node* head = new Node(10);
head->next = new Node(20);
head->next->next = new Node(30);`
      }
    ]
  },
  {
    id: 3,
    title: "Traversing a Linked List",
    description: "Iterate through nodes sequentially from head to null.",
    icon: "🚶",
    content: [
      {
        heading: "Pointer Traversal Pattern",
        text: "To visit each node, initialize a temporary pointer to head and advance it until reaching nullptr.",
        bullets: [
          "Never move the head pointer directly during traversal to avoid losing the list reference",
          "Time Complexity: O(N), Space Complexity: O(1)"
        ],
        code: `void printList(Node* head) {
    Node* current = head;
    while (current != nullptr) {
        std::cout << current->data << " -> ";
        current = current->next;
    }
    std::cout << "NULL\\n";
}`
      }
    ]
  },
  {
    id: 4,
    title: "Insertion at Head & Tail",
    description: "Insert new nodes at the start or end of a linked list.",
    icon: "➕",
    content: [
      {
        heading: "O(1) Head Insertion vs O(N) Tail Insertion",
        text: "Inserting at the head takes constant O(1) time by re-pointing the new node's next to head. Inserting at the tail requires traversing to the last node.",
        code: `// Insert at Head (O(1))
Node* insertAtHead(Node* head, int val) {
    Node* newNode = new Node(val);
    newNode->next = head;
    return newNode; // New head
}`
      }
    ]
  },
  {
    id: 5,
    title: "Deletion Operations",
    description: "Remove nodes from head, tail, or specific target values.",
    icon: "🗑️",
    content: [
      {
        heading: "Deleting Head & Internal Nodes",
        text: "When deleting a node, update predecessor pointer to bypass the target node and free allocated memory.",
        code: `Node* deleteHead(Node* head) {
    if (!head) return nullptr;
    Node* temp = head;
    head = head->next;
    delete temp;
    return head;
}`
      }
    ]
  },
  {
    id: 6,
    title: "Reversing a Linked List",
    description: "Master the classic 3-pointer iterative reverse algorithm.",
    icon: "🔄",
    content: [
      {
        heading: "Iterative Reverse with Prev, Curr, Next",
        text: "Maintain three pointers (prev, current, next) to flip node directions in a single O(N) pass with O(1) extra space.",
        code: `Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* current = head;
    while (current != nullptr) {
        Node* nextNode = current->next;
        current->next = prev;
        prev = current;
        current = nextNode;
    }
    return prev; // New head
}`
      }
    ]
  },
  {
    id: 7,
    title: "Fast & Slow Pointers (Floyd's Cycle Detection)",
    description: "Detect cycles in linked lists using Floyd's Tortoise and Hare algorithm.",
    icon: "🐢",
    content: [
      {
        heading: "Cycle Detection Principle",
        text: "Move slow pointer 1 step and fast pointer 2 steps. If a loop exists, fast and slow will eventually meet.",
        code: `bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`
      }
    ]
  },
  {
    id: 8,
    title: "Finding Middle of Linked List",
    description: "Find the middle node in a single traversal.",
    icon: "🎯",
    content: [
      {
        heading: "Two Pointer Middle Finder",
        text: "When fast pointer reaches the end of the list, slow pointer rests precisely at the middle node.",
        code: `Node* findMiddle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`
      }
    ]
  },
  {
    id: 9,
    title: "Merge Two Sorted Linked Lists",
    description: "Combine two ordered linked lists into a single sorted list.",
    icon: "🔀",
    content: [
      {
        heading: "Dummy Node Merge Pattern",
        text: "Use a dummy head node to simplify pointer manipulation when picking smaller nodes from list1 and list2.",
        code: `Node* mergeTwoLists(Node* l1, Node* l2) {
    Node dummy(0);
    Node* tail = &dummy;
    while (l1 && l2) {
        if (l1->data <= l2->data) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}`
      }
    ]
  },
  {
    id: 10,
    title: "Doubly & Circular Linked Lists",
    description: "Explore two-way pointers and circular connection architectures.",
    icon: "🔁",
    content: [
      {
        heading: "Doubly Linked List Structure",
        text: "Each node contains two pointers: prev and next. Allows bi-directional traversal and O(1) node deletion when pointer is known.",
        code: `struct DLLNode {
    int data;
    DLLNode* prev;
    DLLNode* next;
    DLLNode(int val) : data(val), prev(nullptr), next(nullptr) {}
};`
      }
    ]
  }
];
