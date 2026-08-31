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

export const stringsPracticeQuestions: QuestionItem[] = [
  // ================= 🟢 EASY (10 Problems) =================
  {
    id: 1,
    title: "Reverse a String",
    slug: "reverse-a-string",
    topic: "Strings",
    difficulty: "Easy",
    statement: "Given a string s, reverse its characters in-place.",
    example: {
      input: "s = \"hello\"",
      output: "\"olleh\"",
      explanation: "Characters flipped in reverse order."
    },
    constraints: ["1 <= s.length <= 10^5"],
    hints: ["Use two pointers at start and end."],
    starterCode: `#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    void reverseString(string& s) {
        int l = 0, r = s.length() - 1;
        while (l < r) swap(s[l++], s[r--]);
    }
};`
  },
  {
    id: 2,
    title: "Check if a String is Palindrome",
    slug: "check-if-string-is-palindrome",
    topic: "Strings & Two Pointers",
    difficulty: "Easy",
    statement: "Return true if the input string is a palindrome, considering only alphanumeric characters and ignoring cases.",
    example: {
      input: "s = \"A man, a plan, a canal: Panama\"",
      output: "true",
      explanation: "Reads \"amanaplanacanalpanama\" forward and backward."
    },
    constraints: ["1 <= s.length <= 2 * 10^5"],
    hints: ["Convert to lowercase and skip non-alphanumeric characters."],
    starterCode: `#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};`
  },
  {
    id: 3,
    title: "Count Vowels and Consonants",
    slug: "count-vowels-and-consonants",
    topic: "Strings",
    difficulty: "Easy",
    statement: "Given a string s, count the total number of vowels and consonants.",
    example: {
      input: "s = \"Hello World\"",
      output: "vowels: 3, consonants: 7",
      explanation: "Vowels: e, o, o. Consonants: H, l, l, W, r, l, d."
    },
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Check if character is in 'aeiouAEIOU'."],
    starterCode: `#include <string>
#include <cctype>
#include <utility>
using namespace std;

class Solution {
public:
    pair<int, int> countVowelsConsonants(string s) {
        int v = 0, c = 0;
        string vowels = "aeiouAEIOU";
        for (char ch : s) {
            if (isalpha(ch)) {
                if (vowels.find(ch) != string::npos) v++;
                else c++;
            }
        }
        return {v, c};
    }
};`
  },
  {
    id: 4,
    title: "Count Frequency of Characters",
    slug: "count-frequency-of-characters",
    topic: "Strings & Hash Map",
    difficulty: "Easy",
    statement: "Return the frequency of each character in string s.",
    example: {
      input: "s = \"banana\"",
      output: "b:1, a:3, n:2",
      explanation: "'a' occurs 3 times, 'n' 2 times, 'b' 1 time."
    },
    constraints: ["1 <= s.length <= 10^5"],
    hints: ["Use an array of size 256 or unordered_map."],
    starterCode: `#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    unordered_map<char, int> countFreq(string s) {
        unordered_map<char, int> freq;
        for (char c : s) freq[c]++;
        return freq;
    }
};`
  },
  {
    id: 5,
    title: "Convert Lowercase to Uppercase",
    slug: "convert-lowercase-to-uppercase",
    topic: "Strings",
    difficulty: "Easy",
    statement: "Convert all lowercase letters in a string to uppercase without built-in library functions.",
    example: {
      input: "s = \"questAI\"",
      output: "\"QUESTAI\"",
      explanation: "s[i] = s[i] - 32 for lowercase ASCII."
    },
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Subtract 32 from ASCII value if between 'a' and 'z'."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    string toUpper(string s) {
        for (char& c : s) {
            if (c >= 'a' && c <= 'z') c -= 32;
        }
        return s;
    }
};`
  },
  {
    id: 6,
    title: "Remove Spaces from a String",
    slug: "remove-spaces-from-a-string",
    topic: "Strings",
    difficulty: "Easy",
    statement: "Given a string s, remove all whitespace characters from it.",
    example: {
      input: "s = \"  Data   Structures  \"",
      output: "\"DataStructures\"",
      explanation: "All space characters removed."
    },
    constraints: ["1 <= s.length <= 10^5"],
    hints: ["Build new string filtering out ' '."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    string removeSpaces(string s) {
        string res;
        for (char c : s) {
            if (c != ' ') res += c;
        }
        return res;
    }
};`
  },
  {
    id: 7,
    title: "Find the First Character That Does Not Repeat",
    slug: "find-first-character-that-does-not-repeat",
    topic: "Strings & Frequency Map",
    difficulty: "Easy",
    statement: "Find the first non-repeating character in a string and return its index.",
    example: {
      input: "s = \"swiss\"",
      output: "1",
      explanation: "'w' at index 1 is the first non-repeating character."
    },
    constraints: ["1 <= s.length <= 10^5"],
    hints: ["Count frequencies in first pass, find index in second pass."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int firstUniqChar(string s) {
        vector<int> freq(256, 0);
        for (char c : s) freq[(unsigned char)c]++;
        for (int i = 0; i < (int)s.length(); i++) {
            if (freq[(unsigned char)s[i]] == 1) return i;
        }
        return -1;
    }
};`
  },
  {
    id: 8,
    title: "Check if Two Strings are Anagrams",
    slug: "check-if-two-strings-are-anagrams",
    topic: "Strings & Hash Map",
    difficulty: "Easy",
    statement: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    example: {
      input: "s = \"anagram\", t = \"nagaram\"",
      output: "true",
      explanation: "Same characters with exact same frequencies."
    },
    constraints: ["1 <= s.length, t.length <= 5 * 10^4"],
    hints: ["Compare character frequency counts."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        vector<int> count(26, 0);
        for (int i = 0; i < (int)s.length(); i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }
};`
  },
  {
    id: 9,
    title: "Remove Duplicate Characters",
    slug: "remove-duplicate-characters",
    topic: "Strings",
    difficulty: "Easy",
    statement: "Remove duplicate characters from string s while preserving first appearance order.",
    example: {
      input: "s = \"programming\"",
      output: "\"progami\"",
      explanation: "Duplicates r, g, m are dropped."
    },
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Use boolean visited array of size 256."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string removeDuplicates(string s) {
        vector<bool> seen(256, false);
        string res;
        for (char c : s) {
            if (!seen[(unsigned char)c]) {
                seen[(unsigned char)c] = true;
                res += c;
            }
        }
        return res;
    }
};`
  },
  {
    id: 10,
    title: "Reverse Words in a String",
    slug: "reverse-words-in-a-string",
    topic: "Strings & Two Pointers",
    difficulty: "Easy",
    statement: "Given an input string s, reverse the order of the words.",
    example: {
      input: "s = \"the sky is blue\"",
      output: "\"blue is sky the\"",
      explanation: "Words reversed with single space separation."
    },
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Extract words, reverse vector of words, join with spaces."],
    starterCode: `#include <string>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    string reverseWords(string s) {
        stringstream ss(s);
        string word;
        vector<string> words;
        while (ss >> word) words.push_back(word);
        reverse(words.begin(), words.end());
        string res = "";
        for (size_t i = 0; i < words.size(); i++) {
            res += words[i] + (i == words.size() - 1 ? "" : " ");
        }
        return res;
    }
};`
  },

  // ================= 🟡 MEDIUM (10 Problems) =================
  {
    id: 11,
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    topic: "Sliding Window & Hash Map",
    difficulty: "Medium",
    statement: "Given a string s, find the length of the longest substring without repeating characters.",
    example: {
      input: "s = \"abcabcbb\"",
      output: "3",
      explanation: "Longest substring without repeating characters is \"abc\"."
    },
    constraints: ["0 <= s.length <= 5 * 10^4"],
    hints: ["Use sliding window with last seen index map."],
    starterCode: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> last(256, -1);
        int maxLen = 0, start = 0;
        for (int i = 0; i < (int)s.length(); i++) {
            if (last[(unsigned char)s[i]] >= start) {
                start = last[(unsigned char)s[i]] + 1;
            }
            last[(unsigned char)s[i]] = i;
            maxLen = max(maxLen, i - start + 1);
        }
        return maxLen;
    }
};`
  },
  {
    id: 12,
    title: "Group Anagrams",
    slug: "group-anagrams",
    topic: "Hash Map & Sorting",
    difficulty: "Medium",
    statement: "Given an array of strings strs, group the anagrams together in any order.",
    example: {
      input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
      output: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
      explanation: "Grouped by identical sorted key."
    },
    constraints: ["1 <= strs.length <= 10^4"],
    hints: ["Use sorted string as map key."],
    starterCode: `#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (string s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& p : mp) res.push_back(p.second);
        return res;
    }
};`
  },
  {
    id: 13,
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    topic: "Expand Around Center",
    difficulty: "Medium",
    statement: "Given a string s, return the longest palindromic substring in s.",
    example: {
      input: "s = \"babad\"",
      output: "\"bab\"",
      explanation: "\"aba\" is also a valid answer."
    },
    constraints: ["1 <= s.length <= 1000"],
    hints: ["Expand around center for odd and even palindrome centers."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    string longestPalindrome(string s) {
        // Your code here
        return "";
    }
};`
  },
  {
    id: 14,
    title: "String Compression",
    slug: "string-compression",
    topic: "Two Pointers",
    difficulty: "Medium",
    statement: "Given an array of characters chars, compress it using the consecutive repeating characters count.",
    example: {
      input: "chars = [\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
      output: "Return 6, chars = [\"a\",\"2\",\"b\",\"2\",\"c\",\"3\"]",
      explanation: "\"aa\" -> \"a2\", \"bb\" -> \"b2\", \"ccc\" -> \"c3\"."
    },
    constraints: ["1 <= chars.length <= 2000"],
    hints: ["Use read and write pointers."],
    starterCode: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    int compress(vector<char>& chars) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 15,
    title: "Valid Anagram",
    slug: "valid-anagram",
    topic: "Strings & Hash Table",
    difficulty: "Medium",
    statement: "Given two strings s and t, return true if t is an anagram of s.",
    example: {
      input: "s = \"anagram\", t = \"nagaram\"",
      output: "true",
      explanation: "Contains identical character frequencies."
    },
    constraints: ["1 <= s.length, t.length <= 5 * 10^4"],
    hints: ["Compare character frequencies."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        // Your code here
        return true;
    }
};`
  },
  {
    id: 16,
    title: "Longest Common Prefix",
    slug: "longest-common-prefix",
    topic: "Strings",
    difficulty: "Medium",
    statement: "Write a function to find the longest common prefix string amongst an array of strings.",
    example: {
      input: "strs = [\"flower\",\"flow\",\"flight\"]",
      output: "\"fl\"",
      explanation: "\"fl\" is common to all strings."
    },
    constraints: ["1 <= strs.length <= 200"],
    hints: ["Compare character by character across strings."],
    starterCode: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        string pref = strs[0];
        for (size_t i = 1; i < strs.size(); i++) {
            while (strs[i].find(pref) != 0) {
                pref = pref.substr(0, pref.length() - 1);
                if (pref.empty()) return "";
            }
        }
        return pref;
    }
};`
  },
  {
    id: 17,
    title: "Permutation in String",
    slug: "permutation-in-string",
    topic: "Sliding Window",
    difficulty: "Medium",
    statement: "Given two strings s1 and s2, return true if s2 contains a permutation of s1.",
    example: {
      input: "s1 = \"ab\", s2 = \"eidbaooo\"",
      output: "true",
      explanation: "s2 contains one permutation of s1 (\"ba\")."
    },
    constraints: ["1 <= s1.length, s2.length <= 10^4"],
    hints: ["Maintain fixed-length sliding window of size s1.length()."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        // Your code here
        return false;
    }
};`
  },
  {
    id: 18,
    title: "Find All Anagrams in a String",
    slug: "find-all-anagrams-in-a-string",
    topic: "Sliding Window",
    difficulty: "Medium",
    statement: "Given two strings s and p, return an array of all the start indices of p's anagrams in s.",
    example: {
      input: "s = \"cbaebabacd\", p = \"abc\"",
      output: "[0, 6]",
      explanation: "Anagrams \"cba\" starts at 0, \"bac\" starts at 6."
    },
    constraints: ["1 <= s.length, p.length <= 3 * 10^4"],
    hints: ["Fixed window frequency vector comparison."],
    starterCode: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        // Your code here
        return {};
    }
};`
  },
  {
    id: 19,
    title: "Decode String",
    slug: "decode-string-strings",
    topic: "Stacks & Strings",
    difficulty: "Medium",
    statement: "Given an encoded string k[encoded_string], return its decoded string.",
    example: {
      input: "s = \"3[a]2[bc]\"",
      output: "\"aaabcbc\"",
      explanation: "Expand 3[a] to aaa and 2[bc] to bcbc."
    },
    constraints: ["1 <= s.length <= 30"],
    hints: ["Use stack for numbers and previous string states."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    string decodeString(string s) {
        // Your code here
        return "";
    }
};`
  },
  {
    id: 20,
    title: "Minimum Window Substring",
    slug: "minimum-window-substring",
    topic: "Sliding Window",
    difficulty: "Medium",
    statement: "Given two strings s and t, return the minimum window substring of s such that every character in t is included.",
    example: {
      input: "s = \"ADOBECODEBANC\", t = \"ABC\"",
      output: "\"BANC\"",
      explanation: "Minimum window containing A, B, C is \"BANC\"."
    },
    constraints: ["1 <= s.length, t.length <= 10^5"],
    hints: ["Expand right pointer to satisfy counts, shrink left to minimize window."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        // Your code here
        return "";
    }
};`
  },

  // ================= 🔴 HARD (10 Problems) =================
  {
    id: 21,
    title: "Edit Distance",
    slug: "edit-distance",
    topic: "Dynamic Programming",
    difficulty: "Hard",
    statement: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2 (insert, delete, replace).",
    example: {
      input: "word1 = \"horse\", word2 = \"ros\"",
      output: "3",
      explanation: "horse -> rorse -> rose -> ros (3 ops)."
    },
    constraints: ["0 <= word1.length, word2.length <= 500"],
    hints: ["2D DP grid dp[i][j] representing minimum edit distance."],
    starterCode: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) dp[i][j] = dp[i-1][j-1];
                else dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
            }
        }
        return dp[m][n];
    }
};`
  },
  {
    id: 22,
    title: "Regular Expression Matching",
    slug: "regular-expression-matching",
    topic: "Dynamic Programming & Regex",
    difficulty: "Hard",
    statement: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
    example: {
      input: "s = \"aa\", p = \"a*\"",
      output: "true",
      explanation: "'*' means zero or more of preceding element 'a'."
    },
    constraints: ["1 <= s.length <= 20", "1 <= p.length <= 20"],
    hints: ["DP state dp[i][j] matching s[0..i] with p[0..j]."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
        // Your code here
        return false;
    }
};`
  },
  {
    id: 23,
    title: "Wildcard Matching",
    slug: "wildcard-matching",
    topic: "Dynamic Programming & Strings",
    difficulty: "Hard",
    statement: "Given an input string s and a pattern p, implement wildcard pattern matching with support for '?' and '*'.",
    example: {
      input: "s = \"cb\", p = \"?a\"",
      output: "false",
      explanation: "'?' matches 'c', but 'b' does not match 'a'."
    },
    constraints: ["0 <= s.length, p.length <= 2000"],
    hints: ["'?' matches any single char, '*' matches any sequence of chars."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
        // Your code here
        return false;
    }
};`
  },
  {
    id: 24,
    title: "Word Break II",
    slug: "word-break-ii",
    topic: "Backtracking & DP",
    difficulty: "Hard",
    statement: "Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word.",
    example: {
      input: "s = \"catsanddog\", wordDict = [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
      output: "[\"cats and dog\",\"cat sand dog\"]",
      explanation: "All valid sentences formed."
    },
    constraints: ["1 <= s.length <= 20"],
    hints: ["Backtracking with memoization."],
    starterCode: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        // Your code here
        return {};
    }
};`
  },
  {
    id: 25,
    title: "Longest Valid Parentheses",
    slug: "longest-valid-parentheses-strings",
    topic: "Stacks & DP",
    difficulty: "Hard",
    statement: "Given a string containing just '(' and ')', return the length of the longest valid parentheses substring.",
    example: {
      input: "s = \")()())\"",
      output: "4",
      explanation: "\"()()\" is the longest valid substring."
    },
    constraints: ["0 <= s.length <= 3 * 10^4"],
    hints: ["Stack stores indices of unmatched parens."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    int longestValidParentheses(string s) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 26,
    title: "Distinct Subsequences",
    slug: "distinct-subsequences",
    topic: "Dynamic Programming",
    difficulty: "Hard",
    statement: "Given two strings s and t, return the number of distinct subsequences of s which equals t.",
    example: {
      input: "s = \"rabbbit\", t = \"rabbit\"",
      output: "3",
      explanation: "3 ways to generate \"rabbit\" from \"rabbbit\"."
    },
    constraints: ["1 <= s.length, t.length <= 1000"],
    hints: ["dp[i][j] = dp[i-1][j] + (s[i-1] == t[j-1] ? dp[i-1][j-1] : 0)."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int numDistinct(string s, string t) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 27,
    title: "Palindrome Partitioning II",
    slug: "palindrome-partitioning-ii",
    topic: "DP & Palindromes",
    difficulty: "Hard",
    statement: "Given a string s, partition s such that every substring of the partition is a palindrome. Return the minimum cuts needed.",
    example: {
      input: "s = \"aab\"",
      output: "1",
      explanation: "\"aa\" | \"b\" requires 1 cut."
    },
    constraints: ["1 <= s.length <= 2000"],
    hints: ["Precompute palindrome table then compute min cut DP."],
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int minCut(string s) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 28,
    title: "Substring with Concatenation of All Words",
    slug: "substring-with-concatenation-of-all-words",
    topic: "Sliding Window & Hash Map",
    difficulty: "Hard",
    statement: "Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once.",
    example: {
      input: "s = \"barfoothefoobarman\", words = [\"foo\",\"bar\"]",
      output: "[0, 9]",
      explanation: "Concatenations starting at 0 (\"barfoo\") and 9 (\"foobar\")."
    },
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Sliding window with word-length stride."],
    starterCode: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        // Your code here
        return {};
    }
};`
  },
  {
    id: 29,
    title: "Text Justification",
    slug: "text-justification",
    topic: "Strings Formatting",
    difficulty: "Hard",
    statement: "Format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.",
    example: {
      input: "words = [\"This\", \"is\", \"an\", \"example\", \"of\", \"text\", \"justification.\"], maxWidth = 16",
      output: "[\"This    is    an\",\"example  of text\",\"justification.  \"]",
      explanation: "Fully justified lines with exact maxWidth padding."
    },
    constraints: ["1 <= words.length <= 300"],
    hints: ["Pack words per line, distribute space gaps evenly."],
    starterCode: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        // Your code here
        return {};
    }
};`
  },
  {
    id: 30,
    title: "Shortest Palindrome",
    slug: "shortest-palindrome",
    topic: "KMP & Strings",
    difficulty: "Hard",
    statement: "Convert string s to a palindrome by adding characters in front of it. Find the shortest palindrome by performing this transformation.",
    example: {
      input: "s = \"aacecaaa\"",
      output: "\"aaacecaaa\"",
      explanation: "Prepend 'a' to form palindrome."
    },
    constraints: ["0 <= s.length <= 5 * 10^4"],
    hints: ["Use KMP prefix function table on s + '#' + reverse(s)."],
    starterCode: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    string shortestPalindrome(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        string temp = s + "#" + rev;
        vector<int> lps(temp.length(), 0);
        for (int i = 1; i < (int)temp.length(); i++) {
            int j = lps[i - 1];
            while (j > 0 && temp[i] != temp[j]) j = lps[j - 1];
            if (temp[i] == temp[j]) j++;
            lps[i] = j;
        }
        return rev.substr(0, s.length() - lps.back()) + s;
    }
};`
  }
];
