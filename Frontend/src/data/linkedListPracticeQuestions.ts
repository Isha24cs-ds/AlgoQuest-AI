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

export const linkedListPracticeQuestions: QuestionItem[] = [
  // ================= 🟢 EASY (10 Problems) =================
  {
    id: 1,
    title: "Implement Linked List",
    slug: "implement-linked-list",
    topic: "Linked Lists",
    difficulty: "Easy",
    statement: "Implement a basic Singly Linked List class with Node constructor and head initialization.",
    example: {
      input: "new Node(10), head->next = new Node(20)",
      output: "10 -> 20 -> NULL",
      explanation: "Creates two nodes and links head to second node."
    },
    constraints: ["1 <= Node.val <= 10^4"],
    hints: ["Define struct Node with int val and Node* next."],
    starterCode: `struct Node {
    int val;
    Node* next;
    Node(int x) : val(x), next(nullptr) {}
};

class LinkedList {
    Node* head = nullptr;
public:
    LinkedList() {}
};`
  },
  {
    id: 2,
    title: "Insert a Node at the Beginning",
    slug: "insert-node-at-beginning",
    topic: "Linked Lists",
    difficulty: "Easy",
    statement: "Insert a new node with value x at the beginning of the linked list in O(1) time.",
    example: {
      input: "list: 20 -> 30, insert(10)",
      output: "10 -> 20 -> 30",
      explanation: "New node becomes new head."
    },
    constraints: ["0 <= N <= 1000"],
    hints: ["newNode->next = head; return newNode;"],
    starterCode: `Node* insertAtBeginning(Node* head, int x) {
    Node* newNode = new Node(x);
    newNode->next = head;
    return newNode;
}`
  },
  {
    id: 3,
    title: "Insert a Node at the End",
    slug: "insert-node-at-end",
    topic: "Linked Lists",
    difficulty: "Easy",
    statement: "Insert a new node with value x at the end (tail) of the linked list.",
    example: {
      input: "list: 10 -> 20, insert(30)",
      output: "10 -> 20 -> 30",
      explanation: "Traverse to last node and set next pointer to new node."
    },
    constraints: ["0 <= N <= 1000"],
    hints: ["If head is null, return new node as head."],
    starterCode: `Node* insertAtEnd(Node* head, int x) {
    Node* newNode = new Node(x);
    if (!head) return newNode;
    Node* temp = head;
    while (temp->next) temp = temp->next;
    temp->next = newNode;
    return head;
}`
  },
  {
    id: 4,
    title: "Delete a Node from Linked List",
    slug: "delete-node-from-linked-list",
    topic: "Linked Lists",
    difficulty: "Easy",
    statement: "Delete the first node with a given target value from the linked list.",
    example: {
      input: "list: 10 -> 20 -> 30, delete(20)",
      output: "10 -> 30",
      explanation: "20 is unlinked and deallocated."
    },
    constraints: ["1 <= N <= 1000"],
    hints: ["Handle head deletion separately."],
    starterCode: `Node* deleteNode(Node* head, int key) {
    // Your code here
    return head;
}`
  },
  {
    id: 5,
    title: "Search in a Linked List",
    slug: "search-in-a-linked-list",
    topic: "Linked Lists",
    difficulty: "Easy",
    statement: "Determine whether a target value key is present in the linked list.",
    example: {
      input: "list: 1 -> 3 -> 5 -> 7, key = 5",
      output: "true",
      explanation: "5 exists at index 2."
    },
    constraints: ["1 <= N <= 10^4"],
    hints: ["Traverse list while current != null."],
    starterCode: `bool search(Node* head, int key) {
    // Your code here
    return false;
}`
  },
  {
    id: 6,
    title: "Find Length of Linked List",
    slug: "find-length-of-linked-list",
    topic: "Linked Lists",
    difficulty: "Easy",
    statement: "Count and return the total number of nodes in a singly linked list.",
    example: {
      input: "list: 10 -> 20 -> 30 -> 40",
      output: "4",
      explanation: "Contains 4 nodes."
    },
    constraints: ["0 <= N <= 10^5"],
    hints: ["Increment counter in traversal loop."],
    starterCode: `int getCount(Node* head) {
    int count = 0;
    while (head) {
        count++;
        head = head->next;
    }
    return count;
}`
  },
  {
    id: 7,
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    topic: "Linked Lists",
    difficulty: "Easy",
    statement: "Reverse a singly linked list iteratively and return the new head pointer.",
    example: {
      input: "head = [1,2,3,4,5]",
      output: "[5,4,3,2,1]",
      explanation: "Pointers flipped in direction."
    },
    constraints: ["0 <= N <= 5000"],
    hints: ["Maintain prev, curr, and next pointers."],
    starterCode: `Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    while (curr) {
        Node* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`
  },
  {
    id: 8,
    title: "Middle of the Linked List",
    slug: "middle-of-the-linked-list",
    topic: "Linked Lists",
    difficulty: "Easy",
    statement: "Return the middle node of the linked list. If there are two middle nodes, return the second middle node.",
    example: {
      input: "head = [1,2,3,4,5,6]",
      output: "node with value 4",
      explanation: "Middle nodes are 3 and 4, returns second middle (4)."
    },
    constraints: ["1 <= N <= 100"],
    hints: ["Use slow and fast pointer approach."],
    starterCode: `Node* middleNode(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`
  },
  {
    id: 9,
    title: "Merge Two Sorted Linked Lists",
    slug: "merge-two-sorted-linked-lists",
    topic: "Linked Lists",
    difficulty: "Easy",
    statement: "Merge two sorted linked lists l1 and l2 into one sorted list.",
    example: {
      input: "l1 = [1,2,4], l2 = [1,3,4]",
      output: "[1,1,2,3,4,4]",
      explanation: "Merged sequentially by smaller value."
    },
    constraints: ["0 <= N <= 50"],
    hints: ["Use dummy node."],
    starterCode: `Node* mergeTwoLists(Node* l1, Node* l2) {
    Node dummy(0);
    Node* tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { tail->next = l1; l1 = l1->next; }
        else { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}`
  },
  {
    id: 10,
    title: "Remove Duplicates from Sorted Linked List",
    slug: "remove-duplicates-from-sorted-linked-list",
    topic: "Linked Lists",
    difficulty: "Easy",
    statement: "Given a sorted linked list, delete all duplicates such that each element appears only once.",
    example: {
      input: "head = [1,1,2,3,3]",
      output: "[1,2,3]",
      explanation: "Duplicate 1 and 3 are removed."
    },
    constraints: ["0 <= N <= 3000"],
    hints: ["If curr->val == curr->next->val, bypass curr->next."],
    starterCode: `Node* deleteDuplicates(Node* head) {
    Node* curr = head;
    while (curr && curr->next) {
        if (curr->val == curr->next->val) {
            curr->next = curr->next->next;
        } else {
            curr = curr->next;
        }
    }
    return head;
}`
  },

  // ================= 🟡 MEDIUM (10 Problems) =================
  {
    id: 11,
    title: "Remove Nth Node From End of List",
    slug: "remove-nth-node-from-end-of-list",
    topic: "Two Pointers",
    difficulty: "Medium",
    statement: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    example: {
      input: "head = [1,2,3,4,5], n = 2",
      output: "[1,2,3,5]",
      explanation: "Second node from end (4) is removed."
    },
    constraints: ["1 <= N <= 30", "1 <= n <= N"],
    hints: ["Use fast pointer n steps ahead of slow pointer."],
    starterCode: `Node* removeNthFromEnd(Node* head, int n) {
    // Your code here
    return head;
}`
  },
  {
    id: 12,
    title: "Linked List Cycle",
    slug: "linked-list-cycle",
    topic: "Fast & Slow Pointers",
    difficulty: "Medium",
    statement: "Determine if the linked list has a cycle in it using Floyd's algorithm.",
    example: {
      input: "head = [3,2,0,-4], pos = 1",
      output: "true",
      explanation: "Cycle exists where tail connects to 1st node."
    },
    constraints: ["0 <= N <= 10^4"],
    hints: ["Slow moves 1 step, Fast moves 2 steps."],
    starterCode: `bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`
  },
  {
    id: 13,
    title: "Intersection of Two Linked Lists",
    slug: "intersection-of-two-linked-lists",
    topic: "Two Pointers",
    difficulty: "Medium",
    statement: "Given the heads of two singly linked lists headA and headB, return the node at which the two lists intersect.",
    example: {
      input: "intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]",
      output: "Reference to node with value 8",
      explanation: "Intersect at node 8."
    },
    constraints: ["1 <= N, M <= 3 * 10^4"],
    hints: ["Pointer A moves to headB upon reaching end, pointer B moves to headA."],
    starterCode: `Node* getIntersectionNode(Node* headA, Node* headB) {
    if (!headA || !headB) return nullptr;
    Node* pA = headA;
    Node* pB = headB;
    while (pA != pB) {
        pA = pA ? pA->next : headB;
        pB = pB ? pB->next : headA;
    }
    return pA;
}`
  },
  {
    id: 14,
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    topic: "Linked Lists & Math",
    difficulty: "Medium",
    statement: "You are given two non-empty linked lists representing two non-negative integers in reverse order. Add the two numbers and return the sum as a linked list.",
    example: {
      input: "l1 = [2,4,3], l2 = [5,6,4]",
      output: "[7,0,8]",
      explanation: "342 + 465 = 807."
    },
    constraints: ["1 <= N, M <= 100"],
    hints: ["Maintain carry digit across node sums."],
    starterCode: `Node* addTwoNumbers(Node* l1, Node* l2) {
    // Your code here
    return nullptr;
}`
  },
  {
    id: 15,
    title: "Palindrome Linked List",
    slug: "palindrome-linked-list",
    topic: "Two Pointers",
    difficulty: "Medium",
    statement: "Given the head of a singly linked list, return true if it is a palindrome.",
    example: {
      input: "head = [1,2,2,1]",
      output: "true",
      explanation: "Reads same forward and backward."
    },
    constraints: ["1 <= N <= 10^5"],
    hints: ["Find middle, reverse second half, compare both halves."],
    starterCode: `bool isPalindrome(Node* head) {
    // Your code here
    return true;
}`
  },
  {
    id: 16,
    title: "Odd Even Linked List",
    slug: "odd-even-linked-list",
    topic: "Linked Lists",
    difficulty: "Medium",
    statement: "Group all the nodes with odd indices together followed by the nodes with even indices.",
    example: {
      input: "head = [1,2,3,4,5]",
      output: "[1,3,5,2,4]",
      explanation: "Odd index nodes (1,3,5) grouped first, then even (2,4)."
    },
    constraints: ["0 <= N <= 10^4"],
    hints: ["Maintain odd and even pointers, connect odd tail to even head."],
    starterCode: `Node* oddEvenList(Node* head) {
    if (!head) return nullptr;
    Node* odd = head;
    Node* even = head->next;
    Node* evenHead = even;
    while (even && even->next) {
        odd->next = even->next;
        odd = odd->next;
        even->next = odd->next;
        even = even->next;
    }
    odd->next = evenHead;
    return head;
}`
  },
  {
    id: 17,
    title: "Sort List",
    slug: "sort-list",
    topic: "Merge Sort & Linked Lists",
    difficulty: "Medium",
    statement: "Given the head of a linked list, return the list after sorting it in O(n log n) time and O(1) memory.",
    example: {
      input: "head = [4,2,1,3]",
      output: "[1,2,3,4]",
      explanation: "Sorted in ascending order."
    },
    constraints: ["0 <= N <= 5 * 10^4"],
    hints: ["Apply Merge Sort recursively by finding middle node."],
    starterCode: `Node* sortList(Node* head) {
    // Your code here
    return head;
}`
  },
  {
    id: 18,
    title: "Partition List",
    slug: "partition-list",
    topic: "Linked Lists",
    difficulty: "Medium",
    statement: "Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.",
    example: {
      input: "head = [1,4,3,2,5,2], x = 3",
      output: "[1,2,2,4,3,5]",
      explanation: "Nodes < 3 (1,2,2) placed before nodes >= 3 (4,3,5)."
    },
    constraints: ["0 <= N <= 200"],
    hints: ["Maintain less and greater dummy head chains."],
    starterCode: `Node* partition(Node* head, int x) {
    // Your code here
    return head;
}`
  },
  {
    id: 19,
    title: "Rotate List",
    slug: "rotate-list",
    topic: "Linked Lists",
    difficulty: "Medium",
    statement: "Given the head of a linked list, rotate the list to the right by k places.",
    example: {
      input: "head = [1,2,3,4,5], k = 2",
      output: "[4,5,1,2,3]",
      explanation: "Rotated right by 2 positions."
    },
    constraints: ["0 <= N <= 500", "0 <= k <= 2 * 10^9"],
    hints: ["Form a circular loop then break at N - (k % N)."],
    starterCode: `Node* rotateRight(Node* head, int k) {
    // Your code here
    return head;
}`
  },
  {
    id: 20,
    title: "Swap Nodes in Pairs",
    slug: "swap-nodes-in-pairs",
    topic: "Linked Lists",
    difficulty: "Medium",
    statement: "Given a linked list, swap every two adjacent nodes and return its head.",
    example: {
      input: "head = [1,2,3,4]",
      output: "[2,1,4,3]",
      explanation: "(1,2) swapped to (2,1), (3,4) swapped to (4,3)."
    },
    constraints: ["0 <= N <= 100"],
    hints: ["Use dummy node and swap pointers iteratively."],
    starterCode: `Node* swapPairs(Node* head) {
    Node dummy(0);
    dummy.next = head;
    Node* prev = &dummy;
    while (prev->next && prev->next->next) {
        Node* first = prev->next;
        Node* second = prev->next->next;
        first->next = second->next;
        second->next = first;
        prev->next = second;
        prev = first;
    }
    return dummy.next;
}`
  },

  // ================= 🔴 HARD (10 Problems) =================
  {
    id: 21,
    title: "Reverse Nodes in k-Group",
    slug: "reverse-nodes-in-k-group-ll",
    topic: "Linked Lists",
    difficulty: "Hard",
    statement: "Reverse nodes of a linked list k at a time and return its modified list.",
    example: {
      input: "head = [1,2,3,4,5], k = 3",
      output: "[3,2,1,4,5]",
      explanation: "First 3 nodes reversed, remaining 2 left unchanged."
    },
    constraints: ["1 <= k <= N <= 5000"],
    hints: ["Check if remaining node count >= k before reversing."],
    starterCode: `Node* reverseKGroup(Node* head, int k) {
    // Your code here
    return head;
}`
  },
  {
    id: 22,
    title: "Merge k Sorted Lists",
    slug: "merge-k-sorted-lists",
    topic: "Heap & Linked Lists",
    difficulty: "Hard",
    statement: "You are given an array of k linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted list.",
    example: {
      input: "lists = [[1,4,5],[1,3,4],[2,6]]",
      output: "[1,1,2,3,4,4,5,6]",
      explanation: "All k lists merged in order."
    },
    constraints: ["0 <= k <= 10^4", "total nodes <= 10^4"],
    hints: ["Use Min-Heap priority queue storing current heads."],
    starterCode: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    Node* mergeKLists(vector<Node*>& lists) {
        // Your code here
        return nullptr;
    }
};`
  },
  {
    id: 23,
    title: "Copy List with Random Pointer",
    slug: "copy-list-with-random-pointer",
    topic: "Linked Lists & Hash Map",
    difficulty: "Hard",
    statement: "Construct a deep copy of a linked list where each node contains an additional random pointer.",
    example: {
      input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
      output: "Deep copied structure",
      explanation: "Brand new nodes with exact copy of random pointer links."
    },
    constraints: ["0 <= N <= 1000"],
    hints: ["Interleave copied nodes next to original nodes or use unordered_map."],
    starterCode: `struct RandomNode {
    int val;
    RandomNode* next;
    RandomNode* random;
    RandomNode(int x) : val(x), next(nullptr), random(nullptr) {}
};

RandomNode* copyRandomList(RandomNode* head) {
    // Your code here
    return nullptr;
}`
  },
  {
    id: 24,
    title: "LRU Cache",
    slug: "lru-cache",
    topic: "Doubly Linked List & Hash Map",
    difficulty: "Hard",
    statement: "Design a data structure that follows Least Recently Used (LRU) cache policy.",
    example: {
      input: "put(1,1), put(2,2), get(1), put(3,3), get(2)",
      output: "get(1): 1, get(2): -1 (evicted)",
      explanation: "Key 2 evicted because key 1 was accessed."
    },
    constraints: ["1 <= capacity <= 3000"],
    hints: ["Combine Doubly Linked List with Hash Map for O(1) access and removal."],
    starterCode: `#include <unordered_map>
using namespace std;

class LRUCache {
public:
    LRUCache(int capacity) {}
    int get(int key) { return -1; }
    void put(int key, int value) {}
};`
  },
  {
    id: 25,
    title: "Reverse Linked List II",
    slug: "reverse-linked-list-ii",
    topic: "Linked Lists",
    difficulty: "Hard",
    statement: "Given the head of a linked list and left and right positions, reverse the nodes from position left to position right.",
    example: {
      input: "head = [1,2,3,4,5], left = 2, right = 4",
      output: "[1,4,3,2,5]",
      explanation: "Subsegment from index 2 to 4 reversed."
    },
    constraints: ["1 <= left <= right <= N <= 500"],
    hints: ["Traverse to left-1 position, reverse segment of length (right - left + 1)."],
    starterCode: `Node* reverseBetween(Node* head, int left, int right) {
    // Your code here
    return head;
}`
  },
  {
    id: 26,
    title: "Reorder List",
    slug: "reorder-list",
    topic: "Linked Lists",
    difficulty: "Hard",
    statement: "Reorder list to be: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …",
    example: {
      input: "head = [1,2,3,4,5]",
      output: "[1,5,2,4,3]",
      explanation: "Interleaved start and end nodes."
    },
    constraints: ["1 <= N <= 5 * 10^4"],
    hints: ["Find middle, reverse second half, merge alternatively."],
    starterCode: `void reorderList(Node* head) {
    // Your code here
}`
  },
  {
    id: 27,
    title: "Flatten a Multilevel Doubly Linked List",
    slug: "flatten-multilevel-doubly-linked-list",
    topic: "Doubly Linked List",
    difficulty: "Hard",
    statement: "Flatten a multilevel doubly linked list where nodes may have child lists into a single-level doubly linked list.",
    example: {
      input: "head = [1,2,3,4,5,6,null,null,null,7,8,9,10]",
      output: "[1,2,3,7,8,9,10,4,5,6]",
      explanation: "Children inserted directly after parent node."
    },
    constraints: ["0 <= N <= 1000"],
    hints: ["Use stack to remember next nodes when diving into child lists."],
    starterCode: `struct MultiNode {
    int val;
    MultiNode *prev, *next, *child;
};

MultiNode* flatten(MultiNode* head) {
    // Your code here
    return head;
}`
  },
  {
    id: 28,
    title: "Design Linked List",
    slug: "design-linked-list",
    topic: "Linked Lists Design",
    difficulty: "Hard",
    statement: "Design your implementation of the linked list (get, addAtHead, addAtTail, addAtIndex, deleteAtIndex).",
    example: {
      input: "addAtHead(1), addAtTail(3), addAtIndex(1,2), get(1), deleteAtIndex(1), get(1)",
      output: "get(1): 2, get(1): 3",
      explanation: "Complete custom linked list implementation."
    },
    constraints: ["0 <= index <= 2000"],
    hints: ["Maintain size counter and sentinel dummy head."],
    starterCode: `class MyLinkedList {
public:
    MyLinkedList() {}
    int get(int index) { return -1; }
    void addAtHead(int val) {}
    void addAtTail(int val) {}
    void addAtIndex(int index, int val) {}
    void deleteAtIndex(int index) {}
};`
  },
  {
    id: 29,
    title: "Insertion Sort List",
    slug: "insertion-sort-list",
    topic: "Linked Lists & Sorting",
    difficulty: "Hard",
    statement: "Sort a linked list using insertion sort.",
    example: {
      input: "head = [4,2,1,3]",
      output: "[1,2,3,4]",
      explanation: "Iteratively inserts each node into sorted output list."
    },
    constraints: ["1 <= N <= 5000"],
    hints: ["Maintain dummy head for sorted output list."],
    starterCode: `Node* insertionSortList(Node* head) {
    Node dummy(0);
    Node* curr = head;
    while (curr) {
        Node* next = curr->next;
        Node* prev = &dummy;
        while (prev->next && prev->next->val < curr->val) {
            prev = prev->next;
        }
        curr->next = prev->next;
        prev->next = curr;
        curr = next;
    }
    return dummy.next;
}`
  },
  {
    id: 30,
    title: "Split Linked List in Parts",
    slug: "split-linked-list-in-parts",
    topic: "Linked Lists",
    difficulty: "Hard",
    statement: "Given the head of a singly linked list and an integer k, split the linked list into k consecutive parts.",
    example: {
      input: "head = [1,2,3], k = 5",
      output: "[[1],[2],[3],[],[]]",
      explanation: "Split into 5 parts, empty parts represented by null."
    },
    constraints: ["0 <= N <= 1000", "1 <= k <= 50"],
    hints: ["Calculate length N, part size N/k, and extra remainder N%k."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<Node*> splitListToParts(Node* head, int k) {
        // Your code here
        return {};
    }
};`
  }
];
