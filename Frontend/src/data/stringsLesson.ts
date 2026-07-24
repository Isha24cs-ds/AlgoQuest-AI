export const stringsLesson = [
  {
    id: 1,
    title: "Introduction to Strings",
    icon: "🌲",
    description:
      "Learn what strings are, why they are important, and where they are used.",

    content: [
      {
        heading: "🌟 What is a String?",
        text:
          "A string is a sequence of characters used to represent text. It can contain letters, numbers, spaces, and special symbols. Strings are one of the most frequently used data types because almost every software application processes text in some form.",
      },

      {
        heading: "📌 Examples of Strings",
        bullets: [
          '"Hello"',
          '"AlgoQuest AI"',
          '"Computer Science"',
          '"12345"',
          '"user@gmail.com"',
          '"Welcome to Coding"',
          '"@OpenAI"',
        ],
      },

      {
        heading: "💡 Why Do We Need Strings?",
        text:
          "Strings help us store and manipulate textual information. They are used in chat applications, websites, search engines, games, mobile apps, and almost every software system that works with text.",
      },

      {
        heading: "🌍 Real-World Applications",
        bullets: [
          "WhatsApp Messages",
          "Google Search",
          "Email IDs",
          "Passwords",
          "File Names",
          "URLs",
          "AI Chatbots like ChatGPT",
          "Social Media Posts",
        ],
      },

      {
        heading: "✨ Characteristics of Strings",
        bullets: [
          "A string is an ordered sequence of characters.",
          "Each character has an index starting from 0.",
          "Strings can contain letters, digits, spaces, and symbols.",
          "Most modern programming languages treat strings as immutable.",
          "Small character sets like ASCII make many string algorithms efficient.",
        ],
      },

      {
        heading: "💻 Creating Strings in Different Languages",
        code: `// C++
string name = "AlgoQuest";

// Java
String name = "AlgoQuest";

// Python
name = "AlgoQuest"

// JavaScript
let name = "AlgoQuest";

// C#
string name = "AlgoQuest";`,
      },

      {
        heading: "📚 Fun Facts",
        bullets: [
          "ASCII contains 256 different characters.",
          "Unicode supports more than 140,000 characters.",
          "Python and JavaScript treat even a single character as a string.",
          "Many coding interview questions are based on strings.",
        ],
      },

      {
        heading: "⚠ Common Mistakes",
        bullets: [
          "Confusing a character with a string.",
          "Ignoring spaces while counting characters.",
          "Trying to modify immutable strings directly.",
          "Forgetting that indexing starts from 0.",
        ],
      },

      {
        heading: "🎯 Interview Tip",
        text:
          "Before solving a string problem, identify whether it involves searching, palindrome checking, substring matching, frequency counting, or string manipulation. Choosing the right approach becomes much easier.",
      },

      {
        heading: "🤖 Nova Tip",
        text:
          "Imagine a string as a train. Every coach represents one character and every coach has its own seat number called the index. Learning indexing is the key to mastering strings.",
      },

      {
        heading: "🧩 Mini Challenge",
        text:
          "How many characters are present in the string 'AlgoQuest AI'? Remember that the blank space is also counted as a character.",
      },
    ],
  },

{
  id: 2,
  title: "String Declaration & Initialization",
  icon: "🔤",
  description:
    "Learn how to declare and initialize strings in different programming languages.",

  content: [
    {
      heading: "📖 What is String Declaration?",
      text:
        "Declaration means creating a string variable that can store textual data. Initialization means assigning a value to that string. Some languages combine declaration and initialization in a single statement.",
    },

    {
      heading: "🌟 Declaration vs Initialization",
      bullets: [
        "Declaration creates a string variable.",
        "Initialization assigns a value to the variable.",
        "A string can be declared first and initialized later.",
        "Most languages allow declaration and initialization together.",
      ],
    },

    {
      heading: "💻 C++ Example",
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {

    // Declaration
    string name;

    // Initialization
    name = "AlgoQuest";

    cout << name;

    return 0;
}`,
    },

    {
      heading: "☕ Java Example",
      code: `public class Main {

    public static void main(String[] args) {

        // Declaration
        String name;

        // Initialization
        name = "AlgoQuest";

        System.out.println(name);
    }
}`,
    },

    {
      heading: "🐍 Python Example",
      code: `# Declaration + Initialization
name = "AlgoQuest"

print(name)`,
    },

    {
      heading: "🟨 JavaScript Example",
      code: `let name = "AlgoQuest";

console.log(name);`,
    },

    {
      heading: "⚡ Different Ways to Initialize Strings",
      bullets: [
        'Using double quotes: "Hello"',
        "Using single quotes (Python & JavaScript)",
        "Using triple quotes in Python for multiline strings",
        "Using constructors like new String() in Java and C++",
      ],
    },

    {
      heading: "📚 Empty Strings",
      text:
        "Sometimes we need an empty string before storing user input or building a new string during program execution.",

      code: `// C++
string str = "";

// Java
String str = "";

// Python
str = ""

// JavaScript
let str = "";`,
    },

    {
      heading: "🌍 Real-Life Example",
      text:
        "When a user signs up for a website, the username field is initially an empty string. As the user types, characters are stored inside that string.",
    },

    {
      heading: "📌 Important Points",
      bullets: [
        "Strings can contain letters, digits, spaces, and symbols.",
        "Most modern languages automatically manage string memory.",
        "Languages like Java, Python, JavaScript, and C# treat strings as immutable.",
        "C uses character arrays ending with the null character (\\0).",
        "C++ supports both character arrays and the std::string class.",
      ],
    },

    {
      heading: "⚠ Common Mistakes",
      bullets: [
        "Forgetting quotation marks around string values.",
        "Using single quotes for strings in C++ instead of double quotes.",
        "Confusing characters ('A') with strings (\"A\").",
        "Using uninitialized string variables.",
      ],
    },

    {
      heading: "🎯 Interview Tip",
      text:
        "Interviewers often ask the difference between character arrays and strings, mutable vs immutable strings, and why std::string is preferred over character arrays in modern C++.",
    },

    {
      heading: "🤖 Nova Tip",
      text:
        "Think of declaration as buying an empty notebook and initialization as writing the first sentence inside it.",
    },

    {
      heading: "🧩 Mini Challenge",
      text:
        "Declare a string variable called city and initialize it with your city name. Then print it using your favorite programming language.",
    },
  ],
},

 {
  id: 3,
  title: "String Length",
  icon: "📏",
  description:
    "Learn different ways to find the length of a string.",

  content: [
    {
      heading: "📖 What is String Length?",
      text:
        "The length of a string is the total number of characters it contains. Every letter, digit, symbol, and even spaces are counted as characters.",
    },

    {
      heading: "🌟 Why is String Length Important?",
      bullets: [
        "Helps validate user input.",
        "Used to traverse a string.",
        "Required in searching and sorting algorithms.",
        "Useful while checking passwords and usernames.",
        "Frequently used in coding interviews.",
      ],
    },

    {
      heading: "💻 C++ Example",
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {

    string str = "AlgoQuest AI";

    cout << "Length = " << str.length();

    return 0;
}`,
    },

    {
      heading: "☕ Java Example",
      code: `public class Main {

    public static void main(String[] args) {

        String str = "AlgoQuest AI";

        System.out.println(str.length());

    }
}`,
    },

    {
      heading: "🐍 Python Example",
      code: `text = "AlgoQuest AI"

print(len(text))`,
    },

    {
      heading: "🟨 JavaScript Example",
      code: `let text = "AlgoQuest AI";

console.log(text.length);`,
    },

    {
      heading: "📌 Example Calculation",
      text:
        "Consider the string:",
      code: `"AlgoQuest AI"`,
    },

    {
      heading: "🔍 Counting Characters",
      bullets: [
        "A → 1",
        "l → 2",
        "g → 3",
        "o → 4",
        "Q → 5",
        "u → 6",
        "e → 7",
        "s → 8",
        "t → 9",
        "␣ (space) → 10",
        "A → 11",
        "I → 12",
      ],
    },

    {
      heading: "⚡ Important Points",
      bullets: [
        "Spaces are counted as characters.",
        "Special symbols are also counted.",
        "Numbers inside a string are characters too.",
        "Length starts from 1, but indexing starts from 0.",
        "The last character is at index length - 1.",
      ],
    },

    {
      heading: "🌍 Real-Life Applications",
      bullets: [
        "Password validation",
        "Username validation",
        "Checking maximum tweet length",
        "Limiting text in forms",
        "Displaying remaining characters while typing",
      ],
    },

    {
      heading: "⚠ Common Mistakes",
      bullets: [
        "Thinking spaces are ignored.",
        "Confusing length with index.",
        "Using index = length instead of length - 1.",
        "Assuming only letters are counted.",
      ],
    },

    {
      heading: "🎯 Interview Tip",
      text:
        "Many interview problems become easier if you store the string length once instead of calling the length function repeatedly inside loops.",
    },

    {
      heading: "🤖 Nova Tip",
      text:
        "Imagine every character wearing a jersey numbered from 0 to n-1. The total number of players is the string length, while their jersey numbers are the indices.",
    },

    {
      heading: "🧩 Mini Challenge",
      text:
        "Find the length of the following strings:\n\n1. \"OpenAI\"\n2. \"Data Science\"\n3. \"12345\"\n\nRemember to count spaces as characters.",
    },
  ],
},

{
  id: 4,
  title: "Accessing Characters",
  icon: "🎯",
  description:
    "Understand indexing and how to access individual characters.",

  content: [
    {
      heading: "📖 What is Character Access?",
      text:
        "Every character in a string has a unique position called an index. By using the index, we can access any character directly without traversing the entire string.",
    },

    {
      heading: "🌟 Understanding Indexing",
      text:
        "Indexing starts from 0 in almost every programming language. The first character is at index 0, the second at index 1, and so on.",

      code: `"AlgoQuest"

Character :  A   l   g   o   Q   u   e   s   t
Index     :  0   1   2   3   4   5   6   7   8`,
    },

    {
      heading: "💻 Accessing Characters in C++",
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {

    string str = "AlgoQuest";

    cout << str[0] << endl;
    cout << str[4] << endl;

    return 0;
}`,
    },

    {
      heading: "☕ Accessing Characters in Java",
      code: `public class Main {

    public static void main(String[] args) {

        String str = "AlgoQuest";

        System.out.println(str.charAt(0));
        System.out.println(str.charAt(4));

    }
}`,
    },

    {
      heading: "🐍 Accessing Characters in Python",
      code: `text = "AlgoQuest"

print(text[0])
print(text[4])`,
    },

    {
      heading: "🟨 Accessing Characters in JavaScript",
      code: `let text = "AlgoQuest";

console.log(text[0]);
console.log(text[4]);`,
    },

    {
      heading: "🔄 Traversing a String",
      text:
        "Traversal means visiting every character in the string one by one. It is one of the most common operations performed on strings.",

      code: `string str = "AlgoQuest";

for(char ch : str){
    cout << ch << " ";
}`,
    },

    {
      heading: "📌 Important Points",
      bullets: [
        "Indexing starts from 0.",
        "The last character is at index length - 1.",
        "Accessing a valid index takes O(1) time.",
        "Negative indexing is available in Python.",
        "Trying to access an invalid index causes an error in many languages.",
      ],
    },

    {
      heading: "🌍 Real-Life Example",
      text:
        "Suppose a website stores the username 'Isha24'. If you want to display only the first letter as an avatar, you simply access username[0], which gives 'I'.",
    },

    {
      heading: "⚡ Time Complexity",
      bullets: [
        "Accessing one character → O(1)",
        "Traversing the entire string → O(n)",
      ],
    },

    {
      heading: "⚠ Common Mistakes",
      bullets: [
        "Using index equal to the string length.",
        "Forgetting indexing starts from 0.",
        "Accessing an empty string.",
        "Ignoring out-of-range exceptions.",
      ],
    },

    {
      heading: "🎯 Interview Tip",
      text:
        "Many interview problems begin by traversing a string. Master indexing and traversal before learning advanced topics like sliding window or pattern matching.",
    },

    {
      heading: "🤖 Nova Tip",
      text:
        "Imagine each character living in its own house. The house number is the index. Once you know the address (index), you can immediately visit that character.",
    },

    {
      heading: "🧩 Mini Challenge",
      text:
        "Given the string 'Programming', answer:\n\n1. What is the character at index 0?\n2. What is the character at index 5?\n3. What is the last character?\n4. How many characters are present in the string?",
    },
  ],
},

{
  id: 5,
  title: "Common String Operations",
  icon: "🔄",
  description:
    "Learn concatenation, comparison, substring, reverse and more.",

  content: [
    {
      heading: "📖 What are String Operations?",
      text:
        "String operations are common tasks performed on strings to process, modify, or analyze text. They are used in almost every software application, from search engines to messaging apps.",
    },

    {
      heading: "🌟 Most Common String Operations",
      bullets: [
        "Find the length of a string",
        "Access individual characters",
        "Concatenate (join) strings",
        "Compare two strings",
        "Extract a substring",
        "Search for a character or word",
        "Replace characters or words",
        "Reverse a string",
        "Convert case (Uppercase / Lowercase)",
      ],
    },

    {
      heading: "➕ String Concatenation",
      text:
        "Concatenation means joining two or more strings together to create a new string.",

      code: `// C++
string first = "Algo";
string second = "Quest";

string result = first + second;

cout << result;

// Output
AlgoQuest`,
    },

    {
      heading: "⚖ String Comparison",
      text:
        "Comparison checks whether two strings are equal or determines their alphabetical order.",

      code: `string a = "Apple";
string b = "Apple";

if(a == b)
    cout << "Equal";
else
    cout << "Not Equal";`,
    },

    {
      heading: "✂ Extracting a Substring",
      text:
        "A substring is a smaller continuous part of a string.",

      code: `string text = "Programming";

cout << text.substr(0,7);

// Output
Program`,
    },

    {
      heading: "🔍 Searching Inside a String",
      text:
        "Searching means finding the position of a character or another string.",

      code: `string text = "AlgoQuest";

cout << text.find("Quest");

// Output
4`,
    },

    {
      heading: "🔁 Reversing a String",
      text:
        "Reversing changes the order of characters from last to first.",

      code: `string s = "Algo";

reverse(s.begin(), s.end());

cout << s;

// Output
oglA`,
    },

    {
      heading: "🔤 Changing Letter Case",
      bullets: [
        "Convert to Uppercase",
        "Convert to Lowercase",
        "Toggle Case",
        "Capitalize the First Letter",
      ],
    },

    {
      heading: "🌍 Real-Life Applications",
      bullets: [
        "Joining first name and last name",
        "Checking login passwords",
        "Searching messages",
        "Filtering products on shopping websites",
        "Autocomplete suggestions",
        "Email validation",
        "Text editors",
      ],
    },

    {
      heading: "⚡ Time Complexity",
      bullets: [
        "Access Character → O(1)",
        "Concatenation → O(n)",
        "Comparison → O(n)",
        "Substring → O(n)",
        "Search → O(n)",
        "Reverse → O(n)",
      ],
    },

    {
      heading: "📌 Important Points",
      bullets: [
        "Most string operations create a new string in immutable languages.",
        "Strings are immutable in Java, Python, JavaScript, and C#.",
        "C++ std::string allows modification.",
        "Searching and comparison are among the most common interview topics.",
      ],
    },

    {
      heading: "⚠ Common Mistakes",
      bullets: [
        "Using == incorrectly in some languages.",
        "Confusing substring with subsequence.",
        "Ignoring case sensitivity.",
        "Forgetting spaces are part of strings.",
        "Accessing invalid substring indices.",
      ],
    },

    {
      heading: "🎯 Interview Tip",
      text:
        "Many interview questions combine multiple string operations. For example, you may need to reverse a string and then compare it with the original to check whether it is a palindrome.",
    },

    {
      heading: "🤖 Nova Tip",
      text:
        "Think of string operations as tools in a toolbox. Every programming problem uses one or more of these tools—join, search, compare, split, or reverse.",
    },

    {
      heading: "🧩 Mini Challenge",
      text:
        "Given the string 'AlgoQuest AI':\n\n1. Find its length.\n2. Extract the substring 'Quest'.\n3. Reverse the entire string.\n4. Join it with ' Platform'.\n5. Check whether it is equal to 'AlgoQuest AI'.",
    },
  ],
},

 {
  id: 6,
  title: "Searching in Strings",
  icon: "🔍",
  description:
    "Find characters and words using different searching techniques.",

  content: [
    {
      heading: "📖 What is String Searching?",
      text:
        "String searching means finding the position of a character or a word inside a string. It is one of the most common operations performed on strings and is widely used in search engines, text editors, and coding interviews.",
    },

    {
      heading: "🌟 Why is Searching Important?",
      bullets: [
        "Find a specific character.",
        "Locate a word inside a sentence.",
        "Check whether a substring exists.",
        "Validate user input.",
        "Used in search engines and text processing.",
      ],
    },

    {
      heading: "🔎 Searching a Character in C++",
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {

    string text = "AlgoQuest";

    size_t pos = text.find('Q');

    if(pos != string::npos)
        cout << "Found at index " << pos;
    else
        cout << "Character not found";

    return 0;
}`,
    },

    {
      heading: "☕ Searching in Java",
      code: `String text = "AlgoQuest";

int index = text.indexOf('Q');

System.out.println(index);

// Output
4`,
    },

    {
      heading: "🐍 Searching in Python",
      code: `text = "AlgoQuest"

print(text.find("Quest"))

# Output
4`,
    },

    {
      heading: "🟨 Searching in JavaScript",
      code: `let text = "AlgoQuest";

console.log(text.indexOf("Quest"));

// Output
4`,
    },

    {
      heading: "📌 Searching for a Substring",
      text:
        "A substring is a continuous sequence of characters inside a string. We can search for an entire word instead of a single character.",

      code: `string text = "Learn DSA with AlgoQuest";

if(text.find("DSA") != string::npos)
    cout << "Substring Found";
else
    cout << "Not Found";`,
    },

    {
      heading: "🔄 Linear Search in Strings",
      text:
        "The simplest searching technique is Linear Search. We compare every character one by one until we find the required character or reach the end of the string.",

      code: `string text = "AlgoQuest";

char target = 'Q';

for(int i = 0; i < text.length(); i++){

    if(text[i] == target){

        cout << "Found at index " << i;

        break;
    }
}`,
    },

    {
      heading: "⚡ Time Complexity",
      bullets: [
        "Access Character → O(1)",
        "Linear Search → O(n)",
        "Built-in find() → O(n) in most cases",
        "Advanced algorithms like KMP improve searching efficiency for multiple searches.",
      ],
    },

    {
      heading: "🌍 Real-World Applications",
      bullets: [
        "Google Search",
        "Finding contacts in a phone",
        "Searching messages in WhatsApp",
        "Finding words in Microsoft Word",
        "Browser Find (Ctrl + F)",
        "Searching products on Amazon",
      ],
    },

    {
      heading: "📚 Advanced Searching Algorithms",
      bullets: [
        "Naive Pattern Matching",
        "Knuth-Morris-Pratt (KMP)",
        "Rabin-Karp",
        "Z Algorithm",
        "Boyer-Moore",
      ],
    },

    {
      heading: "⚠ Common Mistakes",
      bullets: [
        "Ignoring case sensitivity.",
        "Searching beyond the string length.",
        "Confusing substring search with character search.",
        "Not checking whether find() returns npos.",
      ],
    },

    {
      heading: "🎯 Interview Tip",
      text:
        "Most interview questions are based on substring searching, repeated characters, sliding window, frequency counting, and pattern matching. Master simple searching before moving to advanced algorithms like KMP.",
    },

    {
      heading: "🤖 Nova Tip",
      text:
        "Imagine searching for your friend's name in your phone contacts. You keep checking names one by one until you find the correct one. That's exactly how Linear Search works on strings.",
    },

    {
      heading: "🧩 Mini Challenge",
      text:
        "Given the string 'Programming in C++':\n\n1. Find the index of 'C'.\n2. Check whether 'gram' exists.\n3. Search for the character 'z'.\n4. Find the index of the first 'm'.",
    },
  ],
},
 {
  id: 7,
  title: "String Manipulation",
  icon: "✂️",
  description:
    "Insert, delete, replace and modify strings efficiently.",

  content: [
    {
      heading: "📖 What is String Manipulation?",
      text:
        "String manipulation means modifying the contents of a string by inserting, deleting, replacing, or updating characters and words. These operations are widely used in text editors, search engines, and real-world software applications.",
    },

    {
      heading: "🌟 Common String Manipulation Operations",
      bullets: [
        "Insert Characters",
        "Delete Characters",
        "Replace Characters",
        "Append Strings",
        "Erase Part of a String",
        "Trim Spaces",
        "Update Characters",
      ],
    },

    {
      heading: "➕ Inserting Characters (C++)",
      text:
        "Insertion adds one or more characters at a specific position in the string.",

      code: `#include <iostream>
#include <string>
using namespace std;

int main() {

    string text = "AlgoQuest";

    text.insert(4, " AI");

    cout << text;

    return 0;
}

// Output
Algo AIQuest`,
    },

    {
      heading: "❌ Deleting Characters",
      text:
        "Deletion removes characters from a specific position.",

      code: `string text = "AlgoQuest";

text.erase(4, 5);

cout << text;

// Output
Algo`,
    },

    {
      heading: "🔄 Replacing Characters",
      text:
        "Replacement changes existing characters or words into new ones.",

      code: `string text = "Hello World";

text.replace(6, 5, "AlgoQuest");

cout << text;

// Output
Hello AlgoQuest`,
    },

    {
      heading: "📝 Updating Individual Characters",
      text:
        "Characters can be modified directly in mutable strings such as C++ std::string.",

      code: `string text = "Algo";

text[0] = 'a';

cout << text;

// Output
algo`,
    },

    {
      heading: "⚡ String Manipulation in Python",
      code: `text = "AlgoQuest"

newText = text.replace("Quest", "World")

print(newText)

# Output
AlgoWorld`,
    },

    {
      heading: "🟨 String Manipulation in JavaScript",
      code: `let text = "Hello World";

text = text.replace("World", "AlgoQuest");

console.log(text);

// Output
Hello AlgoQuest`,
    },

    {
      heading: "📌 Important Points",
      bullets: [
        "Strings are immutable in Java, Python, JavaScript, and C#.",
        "Most modifications create a new string.",
        "C++ std::string allows direct modification.",
        "Insertion and deletion usually shift remaining characters.",
        "Always check valid indices before modifying strings.",
      ],
    },

    {
      heading: "⚡ Time Complexity",
      bullets: [
        "Insert → O(n)",
        "Delete → O(n)",
        "Replace → O(n)",
        "Update Character → O(1)",
      ],
    },

    {
      heading: "🌍 Real-World Applications",
      bullets: [
        "Editing documents",
        "Updating usernames",
        "Correcting spelling mistakes",
        "Replacing offensive words in chats",
        "Editing file names",
        "Text formatting software",
      ],
    },

    {
      heading: "⚠ Common Mistakes",
      bullets: [
        "Trying to modify immutable strings directly.",
        "Using an invalid index.",
        "Forgetting to store the modified string.",
        "Replacing the wrong substring.",
      ],
    },

    {
      heading: "🎯 Interview Tip",
      text:
        "Many interview questions ask you to modify strings without using built-in functions. Practice inserting, deleting, and replacing characters manually using loops.",
    },

    {
      heading: "🤖 Nova Tip",
      text:
        "Think of a string like a sentence written with pencil. You can erase, insert, or replace letters—but in some languages, you must create a brand-new sentence instead of changing the original.",
    },

    {
      heading: "🧩 Mini Challenge",
      text:
        "Given the string 'AlgoQuest':\n\n1. Insert ' AI' after 'Algo'.\n2. Replace 'Quest' with 'World'.\n3. Delete 'Algo'.\n4. Change the first letter to lowercase.",
    },
  ],
},

{
  id: 8,
  title: "Case Conversion",
  icon: "🔠",
  description:
    "Convert strings to uppercase, lowercase and toggle case.",

  content: [
    {
      heading: "📖 What is Case Conversion?",
      text:
        "Case conversion means changing the letters of a string from lowercase to uppercase, uppercase to lowercase, or switching both. It is commonly used while validating user input, formatting text, and performing case-insensitive searches.",
    },

    {
      heading: "🌟 Types of Case Conversion",
      bullets: [
        "Lowercase → Uppercase",
        "Uppercase → Lowercase",
        "Toggle Case",
        "Capitalize First Letter",
        "Convert Every Word to Title Case",
      ],
    },

    {
      heading: "💻 Convert to Uppercase (C++)",
      code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {

    string text = "algoquest";

    for(char &c : text)
        c = toupper(c);

    cout << text;

    return 0;
}

// Output
ALGOQUEST`,
    },

    {
      heading: "💻 Convert to Lowercase (C++)",
      code: `string text = "ALGOQUEST";

for(char &c : text)
    c = tolower(c);

cout << text;

// Output
algoquest`,
    },

    {
      heading: "🐍 Python Example",
      code: `text = "AlgoQuest AI"

print(text.upper())

print(text.lower())

# Output
ALGOQUEST AI
algoquest ai`,
    },

    {
      heading: "☕ Java Example",
      code: `String text = "AlgoQuest AI";

System.out.println(text.toUpperCase());

System.out.println(text.toLowerCase());`,
    },

    {
      heading: "🟨 JavaScript Example",
      code: `let text = "AlgoQuest AI";

console.log(text.toUpperCase());

console.log(text.toLowerCase());`,
    },

    {
      heading: "🔄 Toggle Case",
      text:
        "Toggle case converts uppercase letters into lowercase and lowercase letters into uppercase.",

      code: `Input
AlgoQuest AI

Output
aLGOqUEST ai`,
    },

    {
      heading: "⭐ Capitalize the First Letter",
      text:
        "Capitalization means converting only the first character into uppercase while keeping the remaining letters unchanged.",

      code: `Input
algoquest

Output
Algoquest`,
    },

    {
      heading: "📌 Why is Case Conversion Important?",
      bullets: [
        "Case-insensitive searching",
        "Username normalization",
        "Password validation",
        "Formatting titles",
        "Displaying user names properly",
        "Data cleaning in Machine Learning",
      ],
    },

    {
      heading: "⚡ Time Complexity",
      bullets: [
        "Uppercase Conversion → O(n)",
        "Lowercase Conversion → O(n)",
        "Toggle Case → O(n)",
        "Capitalize First Letter → O(1)",
      ],
    },

    {
      heading: "🌍 Real-World Applications",
      bullets: [
        "Search engines ignore letter case.",
        "Email addresses are usually converted to lowercase.",
        "Word processors provide uppercase/lowercase conversion.",
        "AI systems normalize text before processing.",
        "Database searches often use lowercase matching.",
      ],
    },

    {
      heading: "⚠ Common Mistakes",
      bullets: [
        "Changing digits along with letters.",
        "Forgetting that spaces remain unchanged.",
        "Ignoring Unicode characters.",
        "Using manual ASCII arithmetic when built-in functions are available.",
      ],
    },

    {
      heading: "🎯 Interview Tip",
      text:
        "Many interview questions ask you to perform case-insensitive comparison. A simple trick is to convert both strings to lowercase (or uppercase) before comparing them.",
    },

    {
      heading: "🤖 Nova Tip",
      text:
        "Imagine uppercase letters as people standing and lowercase letters as people sitting. Case conversion simply changes everyone's posture without changing their identity.",
    },

    {
      heading: "🧩 Mini Challenge",
      text:
        "Given the string 'AlgoQuest AI':\n\n1. Convert it to uppercase.\n2. Convert it to lowercase.\n3. Toggle the case of every character.\n4. Capitalize only the first letter.",
    },
  ],
},

{
  id: 9,
  title: "Interview Patterns",
  icon: "🧠",
  description:
    "Master palindrome, anagram, frequency count and other common interview questions.",

  content: [
    {
      heading: "📖 What are String Interview Patterns?",
      text:
        "Instead of memorizing hundreds of questions, interview preparation becomes much easier if you master a few common problem-solving patterns. Most string interview questions are built using these patterns.",
    },

    {
      heading: "🌟 Most Important Interview Patterns",
      bullets: [
        "Palindrome Checking",
        "Anagram Detection",
        "Character Frequency Count",
        "Two Pointers",
        "Sliding Window",
        "Hash Map / Frequency Array",
        "Substring Problems",
        "Pattern Matching",
      ],
    },

    {
      heading: "🔁 Pattern 1: Palindrome",
      text:
        "A palindrome is a string that reads the same from left to right and right to left.",

      code: `Input:
madam

Output:
Palindrome

Input:
hello

Output:
Not Palindrome`,
    },

    {
      heading: "💻 Palindrome (C++)",
      code: `bool isPalindrome(string s){

    int left = 0;
    int right = s.length() - 1;

    while(left < right){

        if(s[left] != s[right])
            return false;

        left++;
        right--;
    }

    return true;
}`,
    },

    {
      heading: "🔤 Pattern 2: Anagram",
      text:
        "Two strings are anagrams if they contain exactly the same characters with the same frequencies but in a different order.",

      code: `Input:
listen
silent

Output:
Anagrams`,
    },

    {
      heading: "📊 Pattern 3: Frequency Count",
      text:
        "Count how many times each character appears inside a string. This technique is commonly used in interview problems.",

      code: `string text = "banana";

unordered_map<char,int> freq;

for(char ch : text)
    freq[ch]++;

for(auto x : freq)
    cout << x.first << " -> " << x.second;`,
    },

    {
      heading: "👉 Pattern 4: Two Pointers",
      text:
        "Two pointers move from opposite ends of the string towards the center. This pattern is useful for palindrome checking and reversing strings efficiently.",

      bullets: [
        "Palindrome",
        "Reverse String",
        "Remove Duplicates",
        "Compare Strings",
      ],
    },

    {
      heading: "🪟 Pattern 5: Sliding Window",
      text:
        "Sliding Window maintains a moving section of the string instead of checking every possible substring. It is widely used for substring and longest unique character problems.",

      bullets: [
        "Longest Substring Without Repeating Characters",
        "Minimum Window Substring",
        "Maximum Vowels in a Substring",
        "Permutation in String",
      ],
    },

    {
      heading: "📌 Pattern 6: Hash Map",
      text:
        "Hash Maps store the frequency or position of characters, allowing many string problems to be solved efficiently.",

      bullets: [
        "Frequency Count",
        "First Unique Character",
        "Anagram Problems",
        "Duplicate Character Detection",
      ],
    },

    {
      heading: "⚡ Time Complexity Cheat Sheet",
      bullets: [
        "Palindrome → O(n)",
        "Reverse String → O(n)",
        "Frequency Count → O(n)",
        "Anagram Check → O(n)",
        "Sliding Window → O(n)",
        "Hash Map Operations → O(1) Average",
      ],
    },

    {
      heading: "🌍 Real Interview Questions",
      bullets: [
        "Valid Palindrome",
        "Reverse String",
        "Valid Anagram",
        "Longest Common Prefix",
        "Longest Substring Without Repeating Characters",
        "Group Anagrams",
        "Minimum Window Substring",
        "String Compression",
      ],
    },

    {
      heading: "⚠ Common Mistakes",
      bullets: [
        "Ignoring uppercase/lowercase differences.",
        "Not handling spaces or punctuation.",
        "Using nested loops unnecessarily.",
        "Forgetting edge cases like empty strings.",
      ],
    },

    {
      heading: "🎯 Interview Tip",
      text:
        "When solving a string problem, first ask yourself: 'Can I solve it using Two Pointers, Sliding Window, or a Hash Map?' In many interviews, one of these three techniques leads directly to an efficient solution.",
    },

    {
      heading: "🤖 Nova Tip",
      text:
        "Don't memorize hundreds of interview questions. Master the underlying patterns. Once you recognize the pattern, the solution becomes much easier to build.",
    },

    {
      heading: "🧩 Mini Challenge",
      text:
        "Identify which pattern you would use for the following problems:\n\n1. Check if 'racecar' is a palindrome.\n2. Find the longest substring without repeating characters.\n3. Check whether 'listen' and 'silent' are anagrams.\n4. Count the frequency of every character in 'programming'.",
    },
  ],
},

{
  id: 10,
  title: "Strings Recap & Real World Applications",
  icon: "🏆",
  description:
    "Revise everything you've learned before taking the quiz.",

  content: [
    {
      heading: "🎉 Congratulations!",
      text:
        "Fantastic! You have successfully completed the Strings Kingdom. You now understand the fundamentals of strings, their operations, searching techniques, manipulation methods, and common interview patterns. You are ready to solve real-world string problems.",
    },

    {
      heading: "📚 What You've Learned",
      bullets: [
        "✅ What is a String?",
        "✅ String Declaration & Initialization",
        "✅ Finding String Length",
        "✅ Accessing Characters using Indexing",
        "✅ Common String Operations",
        "✅ Searching in Strings",
        "✅ String Manipulation",
        "✅ Case Conversion",
        "✅ Interview Patterns",
      ],
    },

    {
      heading: "🌍 Real-World Applications of Strings",
      bullets: [
        "Search Engines like Google",
        "Messaging Apps (WhatsApp, Telegram)",
        "Email Validation",
        "Password Authentication",
        "Social Media Platforms",
        "Chatbots and AI Assistants",
        "Search Bars & Autocomplete",
        "Text Editors (VS Code, MS Word)",
        "DNA Sequence Analysis",
        "Natural Language Processing (NLP)",
      ],
    },

    {
      heading: "⚡ String Operations Cheat Sheet",
      bullets: [
        "Find Length → O(1) or O(n) depending on language",
        "Access Character → O(1)",
        "Traverse String → O(n)",
        "Search Character → O(n)",
        "Substring Search → O(n)",
        "Insert/Delete → O(n)",
        "Reverse String → O(n)",
        "Palindrome Check → O(n)",
        "Frequency Count → O(n)",
      ],
    },

    {
      heading: "💻 Most Important Built-in Functions",

      code: `// C++
length()
size()
find()
substr()
replace()
erase()
insert()
reverse()

// Java
length()
charAt()
substring()
contains()
indexOf()
replace()
toUpperCase()
toLowerCase()

// Python
len()
find()
replace()
split()
join()
upper()
lower()
strip()

// JavaScript
length
indexOf()
includes()
replace()
substring()
slice()
toUpperCase()
toLowerCase()`,
    },

    {
      heading: "🎯 Interview Preparation Checklist",
      bullets: [
        "✔ Traverse Strings",
        "✔ Reverse a String",
        "✔ Check Palindrome",
        "✔ Count Character Frequency",
        "✔ Check Anagrams",
        "✔ Find Longest Substring",
        "✔ Sliding Window Problems",
        "✔ Two Pointer Problems",
        "✔ Pattern Matching",
      ],
    },

    {
      heading: "🚀 What's Next?",
      text:
        "Now that you've mastered Strings, you're ready to move to advanced topics like Recursion, Linked Lists, Trees, Graphs, Dynamic Programming, and Pattern Matching algorithms such as KMP, Rabin-Karp, and Trie.",
    },

    {
      heading: "🏅 Achievement Unlocked",
      bullets: [
        "🎖 String Explorer",
        "🎖 Text Manipulator",
        "🎖 Pattern Hunter",
        "🎖 String Master",
      ],
    },

    {
      heading: "🤖 Nova's Final Advice",
      text:
        "Every coding interview contains at least one string problem. If you master traversal, frequency counting, two pointers, sliding window, and hash maps, you'll be able to solve most string questions confidently. Keep practicing every day—consistency beats cramming.",
    },

    {
      heading: "🧩 Final Challenge",
      text:
        "Before moving to the quiz, try solving these problems on your own:\n\n1. Reverse a String\n2. Valid Palindrome\n3. Valid Anagram\n4. Longest Substring Without Repeating Characters\n5. Group Anagrams\n6. String Compression\n7. Longest Common Prefix\n8. Minimum Window Substring",
    },

    {
      heading: "🎊 Ready for the Final Test?",
      text:
        "You have completed all lessons in the Strings Kingdom. Click the button below to begin the Strings Quiz and prove that you are a true String Master!",
    },
  ],
},
  
];