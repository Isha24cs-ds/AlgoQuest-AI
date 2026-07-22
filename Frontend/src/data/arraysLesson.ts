export const arraysLesson = [
  {
    id: 1,
    title: "Introduction",
    icon: "📘",
    description: "Learn what Arrays are.",

    content: [
      {
        heading: "🤔 What is an Array?",
        text:
          "An array is a fundamental linear data structure that stores elements of the same data type in contiguous memory locations. Every element is identified by an index, allowing fast and efficient access.",
      },

      {
        heading: "📌 Key Features",
        bullets: [
          "Stores elements of the same data type.",
          "Elements are stored in contiguous memory.",
          "Each element has an index starting from 0.",
          "Provides O(1) random access.",
          "Widely used in implementing other data structures."
        ]
      },

      {
        heading: "🎯 Advantages",
        bullets: [
          "Fast Random Access (O(1))",
          "Cache Friendly because of contiguous memory",
          "Simple to implement",
          "Used to build Stack, Queue, Graph, Hash Table, etc."
        ]
      },

      {
        heading: "⚠️ Limitations",
        bullets: [
          "Fixed size",
          "Insertion in the middle is expensive",
          "Deletion from the middle is expensive",
          "Searching in an unsorted array takes O(n)"
        ]
      },

      {
        heading: "💻 C++ Example",
        code: `int arr[5] = {10,20,30,40,50};

cout << arr[0];   // 10
cout << arr[2];   // 30`
      },

      {
        heading: "💡 Real Life Example",
        text:
          "Imagine a row of lockers in your school. Every locker has a unique number. You can directly open locker number 3 without opening lockers 1 and 2. Arrays work in exactly the same way using indexes."
      },

      {
        heading: "🤖 Nova Tip",
        text:
          "Arrays are the foundation of Data Structures. Master arrays first because most interview questions are built on top of array concepts."
      }
    ]
  },
{
  id: 2,

  title: "Memory Representation",

  icon: "🧠",

  description: "Learn how arrays are stored inside computer memory.",

  content: [

    {
      heading: "🧠 What is Memory Representation?",

      text:
        "All elements of an array are stored in contiguous (continuous) memory locations. Because every element occupies equal memory, the computer can directly calculate the address of any element using its index."
    },

    {
      heading: "📌 Example",

      text:
        "Suppose an integer array starts from memory address 1000 and every integer occupies 4 bytes."
    },

    {
      heading: "📊 Memory Layout",

      code: `Index      Value      Address

0          10         1000

1          20         1004

2          30         1008

3          40         1012

4          50         1016`
    },

    {
      heading: "📖 Address Formula",

      code: `Address of arr[i]

= Base Address + (Index × Size of Data Type)

Example

Base Address = 1000

arr[3]

1000 + (3 × 4)

= 1012`
    },

    {
      heading: "🚀 Why Contiguous Memory?",

      bullets: [

        "Fast Random Access",

        "Better CPU Cache Performance",

        "Simple Address Calculation",

        "Efficient Traversal"

      ]
    },

    {
      heading: "⚡ Time Complexity",

      bullets: [

        "Access any element → O(1)",

        "Update any element → O(1)",

        "Traverse whole array → O(n)"

      ]
    },

    {
      heading: "💡 Real Life Example",

      text:
        "Imagine a row of adjacent houses numbered 1, 2, 3, 4, and 5. Since all houses are next to each other, you can directly go to House 4 without checking the previous houses. Arrays behave similarly because their elements are stored next to each other in memory."
    },

    {
      heading: "🤖 Nova Tip",

      text:
        "Interviewers often ask why arrays provide O(1) access. The answer is that contiguous memory allows the computer to directly calculate the address of any element using a simple formula instead of searching."
    }

  ]
},
{
  id: 3,

  title: "Declaration of Arrays",

  icon: "💻",

  description: "Learn how arrays are declared in different programming languages.",

  content: [

    {
      heading: "📖 What is Array Declaration?",

      text:
        "Array declaration is the process of creating an array by specifying its data type and size. During declaration, memory is reserved for storing array elements."
    },

    {
      heading: "📝 C++ Declaration",

      code: `// Integer Array
int arr[5];

// Character Array
char letters[10];

// Float Array
float marks[20];`
    },

    {
      heading: "📝 C Declaration",

      code: `// Integer Array
int arr[5];

// Character Array
char letters[10];

// Float Array
float marks[20];`
    },

    {
      heading: "☕ Java Declaration",

      code: `// Integer Array
int arr[];

// Character Array
char letters[];

// Float Array
float marks[];`
    },

    {
      heading: "🐍 Python Declaration",

      code: `# Python uses lists

arr = []`
    },

    {
      heading: "🟨 JavaScript Declaration",

      code: `let arr = [];`
    },

    {
      heading: "🔷 C# Declaration",

      code: `int[] arr;

char[] letters;

float[] marks;`
    },

    {
      heading: "📌 Important Points",

      bullets: [
        "Declaration only creates the array.",
        "Memory is reserved during declaration.",
        "Elements are not initialized unless values are assigned.",
        "Array size is fixed in C and C++."
      ]
    },

    {
      heading: "💡 Real Life Example",

      text:
        "Imagine buying five empty lockers for your classroom. The lockers exist, but nothing is stored inside them yet. Declaring an array is exactly like creating those empty lockers."
    },

    {
      heading: "⚠️ Common Mistakes",

      bullets: [
        "Accessing elements before initialization.",
        "Using an index outside the array size.",
        "Declaring an array with insufficient size."
      ]
    },

    {
      heading: "🎯 Interview Tip",

      text:
        "Declaration creates the array, whereas initialization assigns values to it. Many beginners confuse these two concepts."
    },

    {
      heading: "🤖 Nova Tip",

      text:
        "Always remember: Declaration allocates space, Initialization fills that space with values."
    }

  ]
},
{
  id: 4,

  title: "Initialization of Arrays",

  icon: "⚡",

  description: "Learn how to initialize arrays with values in different programming languages.",

  content: [

    {
      heading: "📖 What is Array Initialization?",

      text:
        "Array initialization is the process of assigning values to an array when it is created or after its declaration. Initialization makes the array ready to store and use data."
    },

    {
      heading: "📝 C++ Initialization",

      code: `// Integer Array
int arr[] = {1, 2, 3, 4, 5};

// Character Array
char letters[] = {'a', 'b', 'c', 'd', 'e'};

// Float Array
float marks[] = {1.4, 2.0, 24.0, 5.0, 0.0};`
    },

    {
      heading: "📝 C Initialization",

      code: `int arr[] = {1, 2, 3, 4, 5};

char letters[] = {'a', 'b', 'c', 'd', 'e'};

float marks[] = {1.4, 2.0, 24.0, 5.0, 0.0};`
    },

    {
      heading: "☕ Java Initialization",

      code: `int arr[] = {1, 2, 3, 4, 5};

char letters[] = {'a', 'b', 'c', 'd', 'e'};

float marks[] = {1.4f, 2.0f, 24f, 5.0f, 0.0f};`
    },

    {
      heading: "🐍 Python Initialization",

      code: `# Integer List
arr = [1, 2, 3, 4, 5]

# Character List
letters = ['a', 'b', 'c', 'd', 'e']

# Float List
marks = [1.4, 2.0, 24.0, 5.0, 0.0]`
    },

    {
      heading: "🟨 JavaScript Initialization",

      code: `let arr = [1, 2, 3, 4, 5];

let letters = ['a', 'b', 'c', 'd', 'e'];

let marks = [1.4, 2.0, 24.0, 5.0, 0.0];`
    },

    {
      heading: "🔷 C# Initialization",

      code: `int[] arr = {1, 2, 3, 4, 5};

char[] letters = {'a', 'b', 'c', 'd', 'e'};

float[] marks = {1.4f, 2.0f, 24f, 5.0f, 0.0f};`
    },

    {
      heading: "📌 Different Ways to Initialize",

      bullets: [
        "Initialize all values during declaration.",
        "Initialize only some values (remaining become default values in many languages).",
        "Initialize values one by one using indexes.",
        "Take input from the user using loops."
      ]
    },

    {
      heading: "💻 Example: Initialize Using Index",

      code: `int arr[5];

arr[0] = 10;
arr[1] = 20;
arr[2] = 30;
arr[3] = 40;
arr[4] = 50;`
    },

    {
      heading: "🎯 Real Life Example",

      text:
        "Imagine buying five empty lockers. During declaration, the lockers are created. During initialization, you place books, bags, and other items into those lockers."
    },

    {
      heading: "⚠️ Common Mistakes",

      bullets: [
        "Initializing more elements than the array size.",
        "Using invalid indexes while assigning values.",
        "Confusing declaration with initialization.",
        "Forgetting that indexes start from 0."
      ]
    },

    {
      heading: "💡 Interview Tip",

      text:
        "Declaration creates the array. Initialization assigns values. In interviews, this difference is asked very frequently."
    },

    {
      heading: "🤖 Nova Tip",

      text:
        "Always initialize your arrays before using them. Uninitialized arrays can contain garbage values in languages like C and C++."
    }

  ]
},
{
  id: 5,

  title: "Why Do We Need Arrays?",

  icon: "❓",

  description: "Understand why arrays are important and when to use them.",

  content: [

    {
      heading: "🤔 Why Do We Need Arrays?",

      text:
        "Suppose a teacher wants to store the marks of 5 students. One way is to create five separate variables. But imagine storing marks for 500 or 50,000 students! Managing so many variables becomes difficult. Arrays solve this problem by storing multiple values under a single variable name."
    },

    {
      heading: "❌ Without Arrays",

      code: `int mark1 = 95;
int mark2 = 88;
int mark3 = 76;
int mark4 = 91;
int mark5 = 84;`
    },

    {
      heading: "✅ With Arrays",

      code: `int marks[5] = {95, 88, 76, 91, 84};

cout << marks[0];
cout << marks[3];`
    },

    {
      heading: "🚀 Advantages of Using Arrays",

      bullets: [
        "Store multiple values using a single variable.",
        "Easy to access elements using indexes.",
        "Simple to traverse using loops.",
        "Less code and easier maintenance.",
        "Efficient memory organization."
      ]
    },

    {
      heading: "📚 Real Life Examples",

      bullets: [
        "Marks of students in a class.",
        "Daily temperatures of a city.",
        "Monthly sales of a company.",
        "Scores of players in a game.",
        "Inventory quantities in a store."
      ]
    },

    {
      heading: "💻 Example: Print All Marks",

      code: `int marks[] = {95, 88, 76, 91, 84};

for(int i = 0; i < 5; i++)
{
    cout << marks[i] << " ";
}`
    },

    {
      heading: "📌 When Should You Use Arrays?",

      bullets: [
        "When all elements have the same data type.",
        "When the number of elements is known or fixed.",
        "When fast random access is required.",
        "When data needs to be processed using loops."
      ]
    },

    {
      heading: "⚠️ When Arrays Are NOT the Best Choice",

      bullets: [
        "Frequent insertion in the middle.",
        "Frequent deletion of elements.",
        "Unknown or continuously changing size.",
        "Complex relationships between data."
      ]
    },

    {
      heading: "🎯 Interview Tip",

      text:
        "Arrays are best when the size is fixed and fast access is required. If the size changes frequently, data structures like vectors, ArrayLists, or linked lists are often better choices."
    },

    {
      heading: "🤖 Nova Tip",

      text:
        "Always ask yourself two questions: 'How much data do I need to store?' and 'Will the size change?' If the size is fixed, arrays are usually an excellent choice."
    }

  ]
},
{
  id: 6,

  title: "Types of Arrays",

  icon: "📦",

  description: "Learn different types of arrays based on size and dimensions.",

  content: [

    {
      heading: "📖 Classification of Arrays",

      text:
        "Arrays can be classified in two ways:\n\n1. Based on Size\n2. Based on Dimensions"
    },

    {
      heading: "1️⃣ Types Based on Size",

      bullets: [
        "Fixed Size Array",
        "Dynamic Size Array"
      ]
    },

    {
      heading: "📌 Fixed Size Array",

      text:
        "A fixed size array has a predefined size that cannot be changed after creation. Memory is allocated once and remains constant throughout the program."
    },

    {
      heading: "💻 C++ Example",

      code: `// Fixed Size Array

int arr[5];

int marks[5] = {10,20,30,40,50};`
    },

    {
      heading: "✅ Advantages of Fixed Arrays",

      bullets: [

        "Simple implementation",

        "Fast random access",

        "Memory allocated only once",

        "Excellent cache performance"

      ]
    },

    {
      heading: "❌ Disadvantages of Fixed Arrays",

      bullets: [

        "Size cannot be changed",

        "May waste memory",

        "Cannot grow when more elements are needed"

      ]
    },

    {
      heading: "🔄 Dynamic Arrays",

      text:
        "Dynamic arrays can increase or decrease their size during program execution. They automatically allocate more memory whenever required."
    },

    {
      heading: "💻 Dynamic Array Examples",

      code: `// C++
vector<int> numbers;

// Java
ArrayList<Integer> list = new ArrayList<>();

// Python
arr = []

// JavaScript
let arr = [];`
    },

    {
      heading: "✅ Advantages of Dynamic Arrays",

      bullets: [

        "Resizable",

        "Easy insertion",

        "Efficient memory usage",

        "No need to predict array size"

      ]
    },

    {
      heading: "❌ Disadvantages of Dynamic Arrays",

      bullets: [

        "Slightly slower than fixed arrays",

        "Extra memory overhead",

        "Occasional resizing cost"

      ]
    },

    {
      heading: "2️⃣ Types Based on Dimensions",

      bullets: [

        "One-Dimensional Array",

        "Two-Dimensional Array",

        "Three-Dimensional Array"

      ]
    },

    {
      heading: "📘 One-Dimensional Array",

      text:
        "A one-dimensional array stores elements in a single row. It is the simplest and most commonly used type of array."
    },

    {
      heading: "💻 Example",

      code: `int arr[5] = {10,20,30,40,50};`
    },

    {
      heading: "📗 Two-Dimensional Array",

      text:
        "A two-dimensional array stores data in rows and columns, making it suitable for representing matrices and tables."
    },

    {
      heading: "💻 Example",

      code: `int matrix[2][3] =
{
    {1,2,3},
    {4,5,6}
};`
    },

    {
      heading: "📙 Three-Dimensional Array",

      text:
        "A three-dimensional array is an array of two-dimensional arrays. It is useful for storing layered or volumetric data."
    },

    {
      heading: "💻 Example",

      code: `int cube[2][2][2] =
{
   {
      {1,2},
      {3,4}
   },

   {
      {5,6},
      {7,8}
   }
};`
    },

    {
      heading: "📊 Comparison",

      bullets: [

        "1D → Single Row",

        "2D → Rows and Columns",

        "3D → Multiple Layers",

        "Dynamic Arrays → Resizable",

        "Fixed Arrays → Constant Size"

      ]
    },

    {
      heading: "🌍 Real Life Examples",

      bullets: [

        "1D → Student Marks",

        "2D → Chess Board",

        "2D → Excel Spreadsheet",

        "3D → Rubik's Cube",

        "3D → Medical CT Scan Images"

      ]
    },

    {
      heading: "🎯 Interview Tip",

      text:
        "Vectors (C++), ArrayLists (Java), and Lists (Python) are dynamic arrays. Fixed arrays have better performance, while dynamic arrays provide greater flexibility."
    },

    {
      heading: "🤖 Nova Tip",

      text:
        "If the number of elements is known beforehand, use a fixed array. If the size changes frequently, prefer dynamic arrays like vector or ArrayList."
    }

  ]
},
{
  id: 7,

  title: "Array Traversal",

  icon: "🔄",

  description: "Learn how to visit every element of an array efficiently.",

  content: [

    {
      heading: "📖 What is Array Traversal?",

      text:
        "Array traversal is the process of visiting each element of an array one by one to perform operations such as printing, searching, updating, or calculating values. It is one of the most fundamental operations on arrays."
    },

    {
      heading: "🎯 Why is Traversal Important?",

      bullets: [

        "Print all elements",

        "Search for an element",

        "Find maximum or minimum",

        "Calculate sum or average",

        "Modify array values",

        "Apply algorithms like sorting and searching"

      ]
    },

    {
      heading: "📝 Example",

      text:
        "Suppose we have the following array:"
    },

    {
      heading: "📦 Array",

      code: `Index :  0   1   2   3   4

Value : 10  20  30  40  50`
    },

    {
      heading: "💻 Traversal using For Loop (C++)",

      code: `#include<iostream>
using namespace std;

int main()
{
    int arr[] = {10,20,30,40,50};

    int n = sizeof(arr)/sizeof(arr[0]);

    for(int i = 0; i < n; i++)
    {
        cout << arr[i] << " ";
    }

    return 0;
}`
    },

    {
      heading: "✅ Output",

      code: `10 20 30 40 50`
    },

    {
      heading: "🔄 Types of Traversal",

      bullets: [

        "Linear Traversal",

        "Reverse Traversal"

      ]
    },

    {
      heading: "➡️ Linear Traversal",

      text:
        "In linear traversal, we visit elements from the first index to the last index."
    },

    {
      heading: "💻 Example",

      code: `for(int i=0;i<n;i++)
{
    cout<<arr[i]<<" ";
}`
    },

    {
      heading: "⬅️ Reverse Traversal",

      text:
        "In reverse traversal, we start from the last element and move towards the first element."
    },

    {
      heading: "💻 Example",

      code: `for(int i=n-1;i>=0;i--)
{
    cout<<arr[i]<<" ";
}`
    },

    {
      heading: "✅ Reverse Output",

      code: `50 40 30 20 10`
    },

    {
      heading: "⚡ Time Complexity",

      bullets: [

        "Traversal visits every element exactly once.",

        "Time Complexity → O(n)",

        "Auxiliary Space → O(1)"

      ]
    },

    {
      heading: "🌍 Real Life Example",

      text:
        "Imagine checking the attendance of every student in a classroom. You call each student's name one by one until everyone has been marked present. Array traversal works exactly the same way."
    },

    {
      heading: "🎯 Applications of Traversal",

      bullets: [

        "Searching",

        "Finding Maximum",

        "Finding Minimum",

        "Calculating Sum",

        "Updating Elements",

        "Sorting Algorithms"

      ]
    },

    {
      heading: "⚠️ Common Mistakes",

      bullets: [

        "Using i <= n instead of i < n.",

        "Starting from the wrong index.",

        "Accessing an index outside array bounds.",

        "Forgetting to update the loop variable."

      ]
    },

    {
      heading: "💡 Interview Tip",

      text:
        "Almost every array interview question begins with traversal. If you master traversal, solving searching, sorting, and many DSA problems becomes much easier."
    },

    {
      heading: "🤖 Nova Tip",

      text:
        "Think of traversal as walking through every room in a house. You don't skip rooms—you visit each one exactly once to inspect or update it."
    }

  ]
},
{
  id: 8,

  title: "Searching in Arrays",

  icon: "🔍",

  description: "Learn how to search for an element in an array using different searching techniques.",

  content: [

    {
      heading: "📖 What is Searching?",

      text:
        "Searching is the process of finding the position of a specific element in an array. If the element exists, its index is returned; otherwise, the search reports that the element is not found."
    },

    {
      heading: "🎯 Why Do We Search?",

      bullets: [

        "Find a student's roll number",

        "Locate a product in inventory",

        "Search for a user's ID",

        "Check whether an item exists",

        "Retrieve data quickly"

      ]
    },

    {
      heading: "📦 Example Array",

      code: `Index :  0   1   2   3   4

Value : 12  25  38  41  59`
    },

    {
      heading: "🔎 Linear Search",

      text:
        "Linear Search checks every element one by one from the beginning until the target element is found or the array ends."
    },

    {
      heading: "💻 C++ Implementation",

      code: `#include<iostream>
using namespace std;

int main()
{
    int arr[] = {12,25,38,41,59};
    int target = 41;

    int n = sizeof(arr)/sizeof(arr[0]);

    for(int i=0;i<n;i++)
    {
        if(arr[i]==target)
        {
            cout<<"Element Found at Index "<<i;
            return 0;
        }
    }

    cout<<"Element Not Found";
}`
    },

    {
      heading: "🧠 Dry Run",

      bullets: [

        "Compare 12 with 41 ❌",

        "Compare 25 with 41 ❌",

        "Compare 38 with 41 ❌",

        "Compare 41 with 41 ✅",

        "Element found at index 3"

      ]
    },

    {
      heading: "✅ Output",

      code: `Element Found at Index 3`
    },

    {
      heading: "⚡ Time Complexity",

      bullets: [

        "Best Case → O(1)",

        "Average Case → O(n)",

        "Worst Case → O(n)",

        "Space Complexity → O(1)"

      ]
    },

    {
      heading: "📌 Advantages",

      bullets: [

        "Very easy to implement",

        "Works on both sorted and unsorted arrays",

        "No preprocessing required",

        "Suitable for small datasets"

      ]
    },

    {
      heading: "❌ Limitations",

      bullets: [

        "Slow for large datasets",

        "Checks elements one by one",

        "Less efficient than Binary Search"

      ]
    },

    {
      heading: "⚡ Binary Search (Preview)",

      text:
        "Binary Search works only on sorted arrays. Instead of checking every element, it repeatedly divides the search space into halves, making it much faster for large datasets."
    },

    {
      heading: "📊 Linear Search vs Binary Search",

      bullets: [

        "Linear Search → Works on unsorted arrays",

        "Binary Search → Requires sorted array",

        "Linear Search Worst Case → O(n)",

        "Binary Search Worst Case → O(log n)",

        "Binary Search is much faster for large sorted arrays"

      ]
    },

    {
      heading: "🌍 Real Life Example",

      text:
        "Imagine looking for a friend in a classroom. If you check every student one by one, you're performing a Linear Search. If the students are standing in roll-number order and you repeatedly check the middle student to narrow down the search, that's Binary Search."
    },

    {
      heading: "⚠️ Common Mistakes",

      bullets: [

        "Using Binary Search on an unsorted array",

        "Not checking every element in Linear Search",

        "Accessing an invalid index",

        "Forgetting to handle the 'not found' case"

      ]
    },

    {
      heading: "🎯 Interview Tip",

      text:
        "Whenever the interviewer says 'sorted array', think about Binary Search. Otherwise, Linear Search is usually the simplest and safest approach."
    },

    {
      heading: "🤖 Nova Tip",

      text:
        "Remember this rule: Linear Search checks every element one by one, while Binary Search keeps cutting the search space in half. Choosing the right search method can dramatically improve performance."
    }

  ]
},
{
  id: 9,

  title: "Modifying Arrays",

  icon: "✏️",

  description: "Learn how to update, insert, and delete elements in an array.",

  content: [

    {
      heading: "📖 What is Array Modification?",

      text:
        "Array modification refers to changing the contents of an existing array. The most common operations are updating an element, inserting a new element, and deleting an existing element."
    },

    {
      heading: "🎯 Types of Modifications",

      bullets: [

        "Update an existing element",

        "Insert a new element",

        "Delete an element",

        "Replace multiple values"

      ]
    },

    {
      heading: "✏️ Updating an Element",

      text:
        "Updating means replacing the value stored at a particular index with a new value."
    },

    {
      heading: "💻 C++ Example: Update",

      code: `int arr[] = {10, 20, 30, 40, 50};

// Change 30 to 35
arr[2] = 35;

for(int i = 0; i < 5; i++)
{
    cout << arr[i] << " ";
}`
    },

    {
      heading: "✅ Output",

      code: `10 20 35 40 50`
    },

    {
      heading: "➕ Inserting an Element",

      text:
        "Arrays have a fixed size. To insert a new element, we shift existing elements to the right to create space."
    },

    {
      heading: "💻 C++ Example: Insert at Index 2",

      code: `int arr[6] = {10,20,30,40,50};
int n = 5;
int pos = 2;
int value = 25;

for(int i = n; i > pos; i--)
{
    arr[i] = arr[i-1];
}

arr[pos] = value;
n++;`
    },

    {
      heading: "✅ Result",

      code: `10 20 25 30 40 50`
    },

    {
      heading: "➖ Deleting an Element",

      text:
        "To delete an element, shift all elements after it one position to the left."
    },

    {
      heading: "💻 C++ Example: Delete Index 2",

      code: `int arr[] = {10,20,30,40,50};
int n = 5;
int pos = 2;

for(int i = pos; i < n-1; i++)
{
    arr[i] = arr[i+1];
}

n--;`
    },

    {
      heading: "✅ Result",

      code: `10 20 40 50`
    },

    {
      heading: "⚡ Time Complexity",

      bullets: [

        "Update → O(1)",

        "Insertion → O(n)",

        "Deletion → O(n)",

        "Extra Space → O(1)"

      ]
    },

    {
      heading: "🌍 Real Life Example",

      text:
        "Imagine a classroom attendance list. If a student's marks change, you simply update the record. If a new student joins, everyone after that position shifts down. If a student leaves, everyone after them moves up to fill the empty space."
    },

    {
      heading: "📌 When Are These Operations Used?",

      bullets: [

        "Updating employee salaries",

        "Adding a new product to inventory",

        "Removing cancelled bookings",

        "Editing student records"

      ]
    },

    {
      heading: "⚠️ Common Mistakes",

      bullets: [

        "Using an invalid index",

        "Forgetting to shift elements during insertion",

        "Not decreasing array size after deletion",

        "Inserting into a full fixed-size array"

      ]
    },

    {
      heading: "🎯 Interview Tip",

      text:
        "Insertion and deletion in arrays are expensive because elements often need to be shifted. Dynamic data structures like linked lists can perform these operations more efficiently."
    },

    {
      heading: "🤖 Nova Tip",

      text:
        "Remember: Updating changes a value, insertion creates space by shifting right, and deletion removes a value by shifting left."
    }

  ]
},
{
  id: 10,

  title: "Arrays Recap & Real World Applications",

  icon: "🏆",

  description: "Congratulations! Let's revise everything you've learned before taking the quiz.",

  content: [

    {
      heading: "🎉 Congratulations!",

      text:
        "You've completed the Arrays learning module! You now understand the fundamentals of one of the most important data structures used in programming."
    },

    {
      heading: "📚 What You've Learned",

      bullets: [
        "✅ What an Array is",
        "✅ Memory Representation",
        "✅ Declaration",
        "✅ Initialization",
        "✅ Why Arrays are Needed",
        "✅ Types of Arrays",
        "✅ Array Traversal",
        "✅ Searching",
        "✅ Modifying Arrays"
      ]
    },

    {
      heading: "🌍 Real World Applications",

      bullets: [
        "Student marks management",
        "Employee salary records",
        "Inventory management systems",
        "Game scoreboards",
        "Weather forecasting data",
        "Image processing (pixels)",
        "Music playlists",
        "Bank transaction history"
      ]
    },

    {
      heading: "⚡ Complexity Cheat Sheet",

      bullets: [
        "Access → O(1)",
        "Traversal → O(n)",
        "Linear Search → O(n)",
        "Binary Search (Sorted) → O(log n)",
        "Update → O(1)",
        "Insertion → O(n)",
        "Deletion → O(n)"
      ]
    },

    {
      heading: "🎯 Interview Cheat Sheet",

      bullets: [
        "Arrays store elements in contiguous memory.",
        "Array indexing starts from 0.",
        "Fixed arrays have constant size.",
        "Random access is O(1).",
        "Insertion and deletion require shifting.",
        "Binary Search only works on sorted arrays."
      ]
    },

    {
      heading: "💡 Nova's Final Advice",

      text:
        "Learning theory is only the first step. The real improvement comes from solving problems. Start with easy questions, understand the logic, and gradually move to harder challenges. Consistency beats intensity."
    },

    {
      heading: "🏅 Achievement Unlocked",

      text:
        "Congratulations! You've unlocked the 'Array Explorer' badge. You're now ready to prove your knowledge in the quiz."
    }

  ]
}
  // Keep your remaining lessons unchanged...
];