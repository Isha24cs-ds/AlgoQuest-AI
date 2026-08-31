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

export const variablesPracticeQuestions: QuestionItem[] = [
  // ================= 🟢 EASY (10 Problems) =================
  {
    id: 1,
    title: "GCD of Multiple Numbers",
    slug: "gcd-of-multiple-numbers",
    topic: "Variables & Math",
    difficulty: "Easy",
    statement: "Given an array of positive integers nums, find the Greatest Common Divisor (GCD) of all numbers in the array.",
    example: {
      input: "nums = [12, 24, 36, 48]",
      output: "12",
      explanation: "12 is the largest integer that divides all elements."
    },
    constraints: ["1 <= nums.length <= 10^4", "1 <= nums[i] <= 10^9"],
    hints: ["Use Euclidean algorithm std::gcd iteratively across array."],
    starterCode: `#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    int findGCD(vector<int>& nums) {
        int res = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            res = std::gcd(res, nums[i]);
        }
        return res;
    }
};`
  },
  {
    id: 2,
    title: "LCM of an Array",
    slug: "lcm-of-an-array",
    topic: "Variables & Math",
    difficulty: "Easy",
    statement: "Given an array of integers nums, return the Least Common Multiple (LCM) of all numbers.",
    example: {
      input: "nums = [2, 4, 6, 8]",
      output: "24",
      explanation: "24 is the smallest number divisible by 2, 4, 6, and 8."
    },
    constraints: ["1 <= nums.length <= 1000", "1 <= nums[i] <= 10^5"],
    hints: ["LCM(a, b) = (a * b) / GCD(a, b)."],
    starterCode: `#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    long long findLCM(vector<int>& nums) {
        long long ans = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            ans = (ans * nums[i]) / std::gcd(ans, (long long)nums[i]);
        }
        return ans;
    }
};`
  },
  {
    id: 3,
    title: "Prime Factors of a Number",
    slug: "prime-factors-of-a-number",
    topic: "Variables & Math",
    difficulty: "Easy",
    statement: "Given a positive integer N, return a list of all its unique prime factors in ascending order.",
    example: {
      input: "N = 100",
      output: "[2, 5]",
      explanation: "Prime factors of 100 = 2^2 * 5^2, unique prime factors are 2 and 5."
    },
    constraints: ["2 <= N <= 10^9"],
    hints: ["Trial division up to sqrt(N)."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> getPrimeFactors(int n) {
        vector<int> factors;
        for (int d = 2; d * d <= n; d++) {
            if (n % d == 0) {
                factors.push_back(d);
                while (n % d == 0) n /= d;
            }
        }
        if (n > 1) factors.push_back(n);
        return factors;
    }
};`
  },
  {
    id: 4,
    title: "Count Numbers with Exactly K Divisors",
    slug: "count-numbers-with-exactly-k-divisors",
    topic: "Variables & Math",
    difficulty: "Easy",
    statement: "Given an upper bound N and an integer K, count how many numbers between 1 and N have exactly K divisors.",
    example: {
      input: "N = 10, K = 3",
      output: "2",
      explanation: "4 (divisors 1,2,4) and 9 (divisors 1,3,9) have 3 divisors."
    },
    constraints: ["1 <= N <= 10^5"],
    hints: ["Use Sieve of Eratosthenes to count divisors up to N."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int countWithKDivisors(int n, int k) {
        vector<int> divisors(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            for (int j = i; j <= n; j += i) divisors[j]++;
        }
        int count = 0;
        for (int i = 1; i <= n; i++) {
            if (divisors[i] == k) count++;
        }
        return count;
    }
};`
  },
  {
    id: 5,
    title: "Count Primes in a Range Using Segmented Sieve",
    slug: "count-primes-range-segmented-sieve",
    topic: "Variables & Math",
    difficulty: "Easy",
    statement: "Given range [L, R], count the total prime numbers between L and R inclusive.",
    example: {
      input: "L = 10, R = 30",
      output: "6",
      explanation: "Primes in range [10, 30]: 11, 13, 17, 19, 23, 29 (6 primes)."
    },
    constraints: ["1 <= L <= R <= 10^9"],
    hints: ["Find primes up to sqrt(R) then mark multiples in range [L, R]."],
    starterCode: `#include <vector>
#include <cmath>
using namespace std;

class Solution {
public:
    int countPrimesInRange(long long L, long long R) {
        int limit = sqrt(R) + 1;
        vector<bool> isPrime(limit + 1, true);
        vector<int> primes;
        for (int p = 2; p * p <= limit; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i <= limit; i += p) isPrime[i] = false;
            }
        }
        for (int p = 2; p <= limit; p++) if (isPrime[p]) primes.push_back(p);

        vector<bool> dummy(R - L + 1, true);
        if (L == 1) dummy[0] = false;
        for (int p : primes) {
            long long first = (L / p) * p;
            if (first < L) first += p;
            for (long long j = max(first, (long long)p * p); j <= R; j += p) {
                dummy[j - L] = false;
            }
        }
        int count = 0;
        for (bool b : dummy) if (b) count++;
        return count;
    }
};`
  },
  {
    id: 6,
    title: "Fast Power Using Binary Exponentiation",
    slug: "fast-power-binary-exponentiation",
    topic: "Variables & Math",
    difficulty: "Easy",
    statement: "Calculate x^n (x raised to power n) efficiently in O(log n) time.",
    example: {
      input: "x = 2.0, n = 10",
      output: "1024.0",
      explanation: "2^10 = 1024."
    },
    constraints: ["-100.0 < x < 100.0"],
    hints: ["If n is even, x^n = (x^2)^(n/2). If odd, x^n = x * x^(n-1)."],
    starterCode: `class Solution {
public:
    double myPow(double x, long long n) {
        if (n < 0) { x = 1 / x; n = -n; }
        double res = 1.0;
        while (n > 0) {
            if (n & 1) res *= x;
            x *= x;
            n >>= 1;
        }
        return res;
    }
};`
  },
  {
    id: 7,
    title: "Modular Multiplication and Exponentiation",
    slug: "modular-multiplication-exponentiation",
    topic: "Variables & Math",
    difficulty: "Easy",
    statement: "Compute (base^exp) % mod efficiently in O(log exp) time for large numbers.",
    example: {
      input: "base = 3, exp = 45, mod = 1000000007",
      output: "235472851",
      explanation: "(3^45) % 1000000007 = 235472851."
    },
    constraints: ["1 <= base, exp, mod <= 10^9"],
    hints: ["Use binary exponentiation taking modulo at each step."],
    starterCode: `class Solution {
public:
    long long modPow(long long base, long long exp, long long mod) {
        long long res = 1;
        base %= mod;
        while (exp > 0) {
            if (exp % 2 == 1) res = (res * base) % mod;
            base = (base * base) % mod;
            exp /= 2;
        }
        return res;
    }
};`
  },
  {
    id: 8,
    title: "Find Nth Fibonacci Number Efficiently",
    slug: "find-nth-fibonacci-number-efficiently",
    topic: "Variables & Math",
    difficulty: "Easy",
    statement: "Calculate the N-th Fibonacci number F(N) modulo 10^9 + 7 using linear space memory efficiency.",
    example: {
      input: "N = 10",
      output: "55",
      explanation: "F(10) = 55."
    },
    constraints: ["0 <= N <= 10^6"],
    hints: ["Use two variable pointers a=0, b=1 for linear space memory efficiency."],
    starterCode: `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        long long a = 0, b = 1, mod = 1e9 + 7;
        for (int i = 2; i <= n; i++) {
            long long c = (a + b) % mod;
            a = b;
            b = c;
        }
        return b;
    }
};`
  },
  {
    id: 9,
    title: "Count Trailing Zeroes in Factorial",
    slug: "count-trailing-zeroes-in-factorial",
    topic: "Variables & Math",
    difficulty: "Easy",
    statement: "Given an integer N, return the number of trailing zeroes in N! (N factorial).",
    example: {
      input: "N = 25",
      output: "6",
      explanation: "25! has 6 trailing zeroes (25/5 + 25/25 = 5 + 1 = 6)."
    },
    constraints: ["0 <= N <= 10^9"],
    hints: ["Count prime factors of 5: count = N/5 + N/25 + N/125 + ..."],
    starterCode: `class Solution {
public:
    int trailingZeroes(int n) {
        int count = 0;
        while (n >= 5) {
            count += n / 5;
            n /= 5;
        }
        return count;
    }
};`
  },
  {
    id: 10,
    title: "Find All Prime Numbers in a Given Range",
    slug: "find-all-prime-numbers-in-range",
    topic: "Variables & Math",
    difficulty: "Easy",
    statement: "Given two integers start and end, return all prime numbers in the range [start, end] inclusive.",
    example: {
      input: "start = 1, end = 10",
      output: "[2, 3, 5, 7]",
      explanation: "Primes between 1 and 10."
    },
    constraints: ["1 <= start <= end <= 10^5"],
    hints: ["Apply Sieve of Eratosthenes."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findPrimes(int start, int end) {
        vector<bool> isPrime(end + 1, true);
        if (end >= 0) isPrime[0] = false;
        if (end >= 1) isPrime[1] = false;
        for (int p = 2; p * p <= end; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i <= end; i += p) isPrime[i] = false;
            }
        }
        vector<int> res;
        for (int i = max(2, start); i <= end; i++) {
            if (isPrime[i]) res.push_back(i);
        }
        return res;
    }
};`
  },

  // ================= 🟡 MEDIUM (19 Problems) =================
  {
    id: 11,
    title: "Three Number Comparison Without Nested Conditions",
    slug: "three-number-comparison-without-nested-conditions",
    topic: "Variables & Logic",
    difficulty: "Medium",
    statement: "Determine the maximum of three integers a, b, and c using logical AND/OR expressions or ternary operators without nested if-else statements.",
    example: {
      input: "a = 15, b = 27, c = 19",
      output: "27",
      explanation: "27 is the maximum value."
    },
    constraints: ["-10^9 <= a, b, c <= 10^9"],
    hints: ["Use std::max(a, std::max(b, c)) or ternary operator chaining."],
    starterCode: `#include <algorithm>
using namespace std;

class Solution {
public:
    int findMax(int a, int b, int c) {
        return (a >= b && a >= c) ? a : ((b >= c) ? b : c);
    }
};`
  },
  {
    id: 12,
    title: "Check Valid Triangle Using Multiple Conditions",
    slug: "check-valid-triangle-using-multiple-conditions",
    topic: "Variables & Geometry",
    difficulty: "Medium",
    statement: "Given three side lengths a, b, and c, return true if they form a valid triangle and state its type (\"Equilateral\", \"Isosceles\", or \"Scalene\").",
    example: {
      input: "a = 3, b = 4, c = 5",
      output: "\"Scalene\"",
      explanation: "Triangle inequality holds (3+4>5, 3+5>4, 4+5>3) and all sides are distinct."
    },
    constraints: ["1 <= a, b, c <= 10^4"],
    hints: ["Check triangle inequality (a + b > c && a + c > b && b + c > a)."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    string checkTriangle(int a, int b, int c) {
        if (a + b <= c || a + c <= b || b + c <= a) return "Invalid";
        if (a == b && b == c) return "Equilateral";
        if (a == b || b == c || a == c) return "Isosceles";
        return "Scalene";
    }
};`
  },
  {
    id: 13,
    title: "Find the Missing Condition in an Eligibility System",
    slug: "find-missing-condition-eligibility-system",
    topic: "Variables & Conditions",
    difficulty: "Medium",
    statement: "Evaluate candidate job eligibility based on age (18..60), experience (>= 2 years), and degree score (>= 60%). Return eligible category.",
    example: {
      input: "age = 25, experience = 3, score = 75",
      output: "\"Eligible\"",
      explanation: "All 3 conditions pass."
    },
    constraints: ["0 <= age <= 100"],
    hints: ["Combine boolean flags using logical AND."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    string checkEligibility(int age, int experience, int score) {
        bool ageOk = (age >= 18 && age <= 60);
        bool expOk = (experience >= 2);
        bool scoreOk = (score >= 60);
        return (ageOk && expOk && scoreOk) ? "Eligible" : "Ineligible";
    }
};`
  },
  {
    id: 14,
    title: "Complex Student Grade Calculator",
    slug: "complex-student-grade-calculator",
    topic: "Variables & Logic",
    difficulty: "Medium",
    statement: "Calculate final letter grade (A, B, C, D, F) based on attendance (>= 75% required) and weighted average of exam (60%) and assignment (40%).",
    example: {
      input: "exam = 85, assignment = 90, attendance = 80",
      output: "\"A\"",
      explanation: "Weighted mark = 85*0.6 + 90*0.4 = 87. Attendance >= 75%, grade is A."
    },
    constraints: ["0 <= marks, attendance <= 100"],
    hints: ["Check attendance threshold first."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    string calculateGrade(double exam, double assignment, double attendance) {
        if (attendance < 75.0) return "F (Attendance Shortage)";
        double total = exam * 0.6 + assignment * 0.4;
        if (total >= 85.0) return "A";
        if (total >= 70.0) return "B";
        if (total >= 55.0) return "C";
        if (total >= 40.0) return "D";
        return "F";
    }
};`
  },
  {
    id: 15,
    title: "Electricity Bill Using Multiple Slabs",
    slug: "electricity-bill-multiple-slabs",
    topic: "Variables & Slabs",
    difficulty: "Medium",
    statement: "Calculate total electricity bill given units consumed across progressive tariff slabs (0-100 @ $1.5/unit, 101-200 @ $2.5/unit, 201-500 @ $4.0/unit, 500+ @ $6.0/unit).",
    example: {
      input: "units = 250",
      output: "600.00",
      explanation: "First 100 @ 1.5 = 150. Next 100 @ 2.5 = 250. Next 50 @ 4.0 = 200. Total = 600."
    },
    constraints: ["0 <= units <= 10^5"],
    hints: ["Deduct consumed units slab by slab."],
    starterCode: `class Solution {
public:
    double calculateBill(int units) {
        double bill = 0.0;
        if (units > 500) { bill += (units - 500) * 6.0; units = 500; }
        if (units > 200) { bill += (units - 200) * 4.0; units = 200; }
        if (units > 100) { bill += (units - 100) * 2.5; units = 100; }
        bill += units * 1.5;
        return bill;
    }
};`
  },
  {
    id: 16,
    title: "Income Tax Calculator Using Slab Conditions",
    slug: "income-tax-calculator-slab-conditions",
    topic: "Variables & Tax Math",
    difficulty: "Medium",
    statement: "Calculate annual income tax liability based on slab tax brackets (Up to $2.5L: 0%, $2.5L-$5L: 5%, $5L-$10L: 20%, Above $10L: 30%).",
    example: {
      input: "income = 750000",
      output: "62500.00",
      explanation: "2.5L to 5L (2.5L @ 5%) = 12500. 5L to 7.5L (2.5L @ 20%) = 50000. Total = 62500."
    },
    constraints: ["0 <= income <= 10^8"],
    hints: ["Compute marginal tax contribution for each income interval."],
    starterCode: `class Solution {
public:
    double calculateTax(double income) {
        double tax = 0.0;
        if (income > 1000000) { tax += (income - 1000000) * 0.30; income = 1000000; }
        if (income > 500000) { tax += (income - 500000) * 0.20; income = 500000; }
        if (income > 250000) { tax += (income - 250000) * 0.05; }
        return tax;
    }
};`
  },
  {
    id: 17,
    title: "Date Validation with Leap-Year Logic",
    slug: "date-validation-leap-year-logic",
    topic: "Variables & Calendar Logic",
    difficulty: "Medium",
    statement: "Validate whether a given date (day, month, year) is valid considering leap year rules for February.",
    example: {
      input: "day = 29, month = 2, year = 2024",
      output: "true",
      explanation: "2024 is a leap year divisible by 4, so Feb 29 is valid."
    },
    constraints: ["1 <= year <= 9999"],
    hints: ["Leap year rule: (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)."],
    starterCode: `class Solution {
public:
    bool isValidDate(int d, int m, int y) {
        if (y < 1 || m < 1 || m > 12 || d < 1) return false;
        bool isLeap = (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);
        int daysInMonth[] = {0, 31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        return d <= daysInMonth[m];
    }
};`
  },
  {
    id: 18,
    title: "Determine Quadrant and Axis of a Point",
    slug: "determine-quadrant-and-axis-of-a-point",
    topic: "Variables & Coordinates",
    difficulty: "Medium",
    statement: "Given Cartesian coordinates (x, y), return its location (\"Origin\", \"X-Axis\", \"Y-Axis\", \"Q1\", \"Q2\", \"Q3\", \"Q4\").",
    example: {
      input: "x = -3, y = 5",
      output: "\"Q2\"",
      explanation: "x < 0 and y > 0 places the point in Quadrant 2."
    },
    constraints: ["-10^5 <= x, y <= 10^5"],
    hints: ["Handle origin (0,0) and axis checks (x=0 or y=0) first."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    string getQuadrant(int x, int y) {
        if (x == 0 && y == 0) return "Origin";
        if (x == 0) return "Y-Axis";
        if (y == 0) return "X-Axis";
        if (x > 0 && y > 0) return "Q1";
        if (x < 0 && y > 0) return "Q2";
        if (x < 0 && y < 0) return "Q3";
        return "Q4";
    }
};`
  },
  {
    id: 19,
    title: "ATM Transaction Validation",
    slug: "atm-transaction-validation",
    topic: "Variables & State Logic",
    difficulty: "Medium",
    statement: "Validate ATM cash withdrawal given balance, withdrawal amount (must be multiple of $100), and $0.50 bank service fee.",
    example: {
      input: "withdraw = 200, balance = 500.00",
      output: "299.50",
      explanation: "200 + 0.50 = 200.50 deducted from 500.00, remaining balance 299.50."
    },
    constraints: ["0 <= withdraw, balance <= 10^5"],
    hints: ["Check if withdraw % 100 == 0 and balance >= withdraw + 0.50."],
    starterCode: `class Solution {
public:
    double processWithdrawal(int withdraw, double balance) {
        if (withdraw % 100 == 0 && balance >= withdraw + 0.50) {
            return balance - withdraw - 0.50;
        }
        return balance;
    }
};`
  },
  {
    id: 20,
    title: "Find the Missing Number Using XOR",
    slug: "find-missing-number-using-xor",
    topic: "Bit Manipulation",
    difficulty: "Medium",
    statement: "Given an array nums containing n distinct numbers in range [0, n], find the missing number using XOR in O(N) time and O(1) space.",
    example: {
      input: "nums = [3,0,1]",
      output: "2",
      explanation: "2 is missing from range [0, 3]."
    },
    constraints: ["1 <= n <= 10^4"],
    hints: ["XOR all indices 0..n and XOR all elements in nums."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int xorVal = n;
        for (int i = 0; i < n; i++) {
            xorVal ^= i ^ nums[i];
        }
        return xorVal;
    }
};`
  },
  {
    id: 21,
    title: "Find the Single Number",
    slug: "find-single-number",
    topic: "Bit Manipulation",
    difficulty: "Medium",
    statement: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one using XOR.",
    example: {
      input: "nums = [4,1,2,1,2]",
      output: "4",
      explanation: "1^1 = 0, 2^2 = 0, leaving 4."
    },
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    hints: ["A ^ A = 0 and A ^ 0 = A."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ans = 0;
        for (int x : nums) ans ^= x;
        return ans;
    }
};`
  },
  {
    id: 22,
    title: "Find the Two Non-Repeating Numbers",
    slug: "find-two-non-repeating-numbers",
    topic: "Bit Manipulation",
    difficulty: "Medium",
    statement: "Given an array where every element appears twice except for two numbers, find those two non-repeating numbers in O(N) time and O(1) space.",
    example: {
      input: "nums = [1, 2, 3, 2, 1, 4]",
      output: "[3, 4]",
      explanation: "3 and 4 appear once."
    },
    constraints: ["2 <= nums.length <= 3 * 10^4"],
    hints: ["XOR all numbers, then partition by rightmost set bit."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> singleNumberIII(vector<int>& nums) {
        long long xorSum = 0;
        for (int x : nums) xorSum ^= x;
        long long rightmostBit = xorSum & (-xorSum);
        int num1 = 0, num2 = 0;
        for (int x : nums) {
            if (x & rightmostBit) num1 ^= x;
            else num2 ^= x;
        }
        return {num1, num2};
    }
};`
  },
  {
    id: 23,
    title: "Find the Rightmost Set Bit",
    slug: "find-rightmost-set-bit",
    topic: "Bit Manipulation",
    difficulty: "Medium",
    statement: "Given an integer N, return the 1-based position of the rightmost set bit in N (or 0 if N is 0).",
    example: {
      input: "N = 18",
      output: "2",
      explanation: "18 in binary is 10010. Rightmost set bit is at position 2."
    },
    constraints: ["0 <= N <= 10^9"],
    hints: ["N & (-N) isolates the rightmost set bit."],
    starterCode: `#include <cmath>

class Solution {
public:
    int getRightmostSetBit(int n) {
        if (n == 0) return 0;
        int isolated = n & (-n);
        return log2(isolated) + 1;
    }
};`
  },
  {
    id: 24,
    title: "Count Set Bits Using Brian Kernighan's Algorithm",
    slug: "count-set-bits-brian-kernighan",
    topic: "Bit Manipulation",
    difficulty: "Medium",
    statement: "Count the number of set bits (1s) in a 32-bit unsigned integer using Brian Kernighan's O(set_bits) algorithm.",
    example: {
      input: "N = 29",
      output: "4",
      explanation: "29 in binary is 11101 (4 set bits)."
    },
    constraints: ["0 <= N <= 2^31 - 1"],
    hints: ["Repeatedly clear rightmost set bit: N = N & (N - 1)."],
    starterCode: `class Solution {
public:
    int countSetBits(int n) {
        int count = 0;
        while (n > 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
};`
  },
  {
    id: 25,
    title: "Check if a Number is a Power of Two",
    slug: "check-if-number-is-power-of-two",
    topic: "Bit Manipulation",
    difficulty: "Medium",
    statement: "Given an integer n, return true if it is a power of two using O(1) bitwise operations.",
    example: {
      input: "n = 16",
      output: "true",
      explanation: "16 = 2^4."
    },
    constraints: ["-2^31 <= n <= 2^31 - 1"],
    hints: ["A power of 2 has exactly 1 set bit: n > 0 && (n & (n - 1)) == 0."],
    starterCode: `class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
};`
  },
  {
    id: 26,
    title: "Find XOR of All Numbers from 1 to N",
    slug: "find-xor-1-to-n",
    topic: "Bit Manipulation",
    difficulty: "Medium",
    statement: "Find the cumulative XOR of all integers from 1 to N in O(1) constant time.",
    example: {
      input: "N = 6",
      output: "7",
      explanation: "1^2^3^4^5^6 = 7."
    },
    constraints: ["1 <= N <= 10^9"],
    hints: ["Pattern repeats every 4 numbers based on N % 4."],
    starterCode: `class Solution {
public:
    int computeXOR(int n) {
        int rem = n % 4;
        if (rem == 0) return n;
        if (rem == 1) return 1;
        if (rem == 2) return n + 1;
        return 0;
    }
};`
  },
  {
    id: 27,
    title: "Find the Number Occurring Odd Number of Times",
    slug: "find-number-occurring-odd-times",
    topic: "Bit Manipulation",
    difficulty: "Medium",
    statement: "Given an array of positive integers where all numbers occur an even number of times except one, find that number.",
    example: {
      input: "nums = [1, 2, 3, 2, 3, 1, 3]",
      output: "3",
      explanation: "3 occurs 3 times (odd)."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["XOR all elements in the array."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int findOdd(vector<int>& nums) {
        int res = 0;
        for (int x : nums) res ^= x;
        return res;
    }
};`
  },
  {
    id: 28,
    title: "Find Maximum XOR Pair in an Array",
    slug: "find-maximum-xor-pair",
    topic: "Trie & Bitwise XOR",
    difficulty: "Medium",
    statement: "Given an integer array nums, return the maximum result of nums[i] XOR nums[j].",
    example: {
      input: "nums = [3,10,5,25,2,8]",
      output: "28",
      explanation: "Maximum XOR pair is 5 XOR 25 = 28."
    },
    constraints: ["1 <= nums.length <= 2 * 10^4"],
    hints: ["Build Bitwise Trie of 31-bit integer representations."],
    starterCode: `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int findMaximumXOR(vector<int>& nums) {
        int maxResult = 0, mask = 0;
        for (int i = 31; i >= 0; i--) {
            mask |= (1 << i);
            unordered_set<int> prefixes;
            for (int num : nums) prefixes.insert(num & mask);
            int candidate = maxResult | (1 << i);
            for (int prefix : prefixes) {
                if (prefixes.count(prefix ^ candidate)) {
                    maxResult = candidate;
                    break;
                }
            }
        }
        return maxResult;
    }
};`
  },
  {
    id: 29,
    title: "Find a Number Appearing Once When Others Appear Twice",
    slug: "find-number-appearing-once-others-twice",
    topic: "Bit Manipulation",
    difficulty: "Medium",
    statement: "Find the unique number in an array where every other number appears twice.",
    example: {
      input: "nums = [7, 3, 5, 4, 5, 3, 4]",
      output: "7",
      explanation: "7 is the single element."
    },
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    hints: ["XOR accumulated total."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int result = 0;
        for (int num : nums) result ^= num;
        return result;
    }
};`
  },

  // ================= 🔴 HARD (10 Requested Problems) =================
  {
    id: 30,
    title: "Matrix Exponentiation for Fibonacci",
    slug: "matrix-exponentiation-for-fibonacci",
    topic: "Matrix & Fast Power Math",
    difficulty: "Hard",
    statement: "Calculate the N-th Fibonacci number modulo 10^9 + 7 using 2x2 Matrix Exponentiation in O(log N) time.",
    example: {
      input: "N = 1000000000",
      output: "517691607",
      explanation: "F(10^9) % 10^9+7 computed via [[1,1],[1,0]]^N in log(N) matrix multiplications."
    },
    constraints: ["0 <= N <= 10^18"],
    hints: ["Multiply 2x2 transformation matrix {{1, 1}, {1, 0}} using binary exponentiation."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
    long long MOD = 1e9 + 7;
    vector<vector<long long>> multiply(vector<vector<long long>>& A, vector<vector<long long>>& B) {
        vector<vector<long long>> C(2, vector<long long>(2, 0));
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < 2; k++) {
                    C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
                }
            }
        }
        return C;
    }
public:
    int fib(long long n) {
        if (n == 0) return 0;
        vector<vector<long long>> res = {{1, 0}, {0, 1}};
        vector<vector<long long>> T = {{1, 1}, {1, 0}};
        while (n > 0) {
            if (n & 1) res = multiply(res, T);
            T = multiply(T, T);
            n >>= 1;
        }
        return res[0][1];
    }
};`
  },
  {
    id: 31,
    title: "Chinese Remainder Theorem",
    slug: "chinese-remainder-theorem",
    topic: "Number Theory Math",
    difficulty: "Hard",
    statement: "Given system of remainders num[] and pairwise coprime moduli rem[], find minimum positive integer X satisfying X % num[i] = rem[i].",
    example: {
      input: "num = [3, 4, 5], rem = [2, 3, 1]",
      output: "11",
      explanation: "11 % 3 = 2, 11 % 4 = 3, 11 % 5 = 1."
    },
    constraints: ["1 <= num.length <= 10", "1 <= num[i], rem[i] <= 100"],
    hints: ["Compute Product M = prod(num[i]), Mi = M/num[i], find modular inverse of Mi mod num[i]."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
    long long modInverse(long long a, long long m) {
        long long m0 = m, y = 0, x = 1;
        if (m == 1) return 0;
        while (a > 1) {
            long long q = a / m, t = m;
            m = a % m; a = t; t = y;
            y = x - q * y; x = t;
        }
        if (x < 0) x += m0;
        return x;
    }
public:
    long long findMinX(vector<int>& num, vector<int>& rem) {
        long long prod = 1, result = 0;
        for (int x : num) prod *= x;
        for (size_t i = 0; i < num.size(); i++) {
            long long pp = prod / num[i];
            result = (result + rem[i] * pp * modInverse(pp, num[i])) % prod;
        }
        return (result + prod) % prod;
    }
};`
  },
  {
    id: 32,
    title: "Extended Euclidean Algorithm",
    slug: "extended-euclidean-algorithm",
    topic: "Number Theory Math",
    difficulty: "Hard",
    statement: "Given integers a and b, compute g = gcd(a, b) and integer coefficients x and y such that a*x + b*y = g.",
    example: {
      input: "a = 35, b = 15",
      output: "g = 5, x = 1, y = -2",
      explanation: "35*(1) + 15*(-2) = 35 - 30 = 5 = gcd(35, 15)."
    },
    constraints: ["1 <= a, b <= 10^9"],
    hints: ["Recursive step: x1 = y0 - (b/a)*x0, y1 = x0."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int extGCD(int a, int b, int &x, int &y) {
        if (b == 0) {
            x = 1; y = 0;
            return a;
        }
        int x1, y1;
        int gcd = extGCD(b, a % b, x1, y1);
        x = y1;
        y = x1 - (a / b) * y1;
        return gcd;
    }
};`
  },
  {
    id: 33,
    title: "Euler's Totient Function",
    slug: "eulers-totient-function",
    topic: "Number Theory Math",
    difficulty: "Hard",
    statement: "Given integer N, count numbers from 1 to N that are coprime to N (i.e. phi(N)) in O(sqrt N) time.",
    example: {
      input: "N = 36",
      output: "12",
      explanation: "12 numbers <= 36 share no common factors with 36."
    },
    constraints: ["1 <= N <= 10^9"],
    hints: ["phi(N) = N * product(1 - 1/p) for all distinct prime factors p."],
    starterCode: `class Solution {
public:
    int getTotient(int n) {
        int result = n;
        for (int p = 2; p * p <= n; p++) {
            if (n % p == 0) {
                while (n % p == 0) n /= p;
                result -= result / p;
            }
        }
        if (n > 1) result -= result / n;
        return result;
    }
};`
  },
  {
    id: 34,
    title: "Fast Modular Exponentiation",
    slug: "fast-modular-exponentiation",
    topic: "Binary Exponentiation",
    difficulty: "Hard",
    statement: "Compute (a^b) % mod efficiently when b is up to 10^18 and mod is up to 10^9 + 7.",
    example: {
      input: "a = 2, b = 1000000000, mod = 1000000007",
      output: "140964160",
      explanation: "(2^10^9) % 10^9+7 computed in log(b) multiplications."
    },
    constraints: ["1 <= a, mod <= 10^9", "0 <= b <= 10^18"],
    hints: ["Binary exponentiation taking modulo at each multiplication step."],
    starterCode: `class Solution {
public:
    long long power(long long a, long long b, long long mod) {
        long long res = 1;
        a %= mod;
        while (b > 0) {
            if (b & 1) res = (res * a) % mod;
            a = (a * a) % mod;
            b >>= 1;
        }
        return res;
    }
};`
  },
  {
    id: 35,
    title: "Segmented Sieve",
    slug: "segmented-sieve-hard",
    topic: "Sieve & Prime Math",
    difficulty: "Hard",
    statement: "Generate all prime numbers in range [L, R] where R can be as large as 10^12 and R - L <= 10^6.",
    example: {
      input: "L = 1000000000, R = 1000000050",
      output: "[1000000007, 1000000009, 1000000021, 1000000033]",
      explanation: "Primes found in large 10^12 interval using segmented array."
    },
    constraints: ["1 <= L <= R <= 10^12", "R - L <= 10^6"],
    hints: ["Use Sieve up to sqrt(R) to cross off multiples in range [L, R]."],
    starterCode: `#include <vector>
#include <cmath>
using namespace std;

class Solution {
public:
    vector<long long> segmentedSieve(long long L, long long R) {
        long long limit = sqrt(R) + 1;
        vector<bool> mark(limit + 1, true);
        vector<long long> primes;
        for (long long p = 2; p * p <= limit; p++) {
            if (mark[p]) {
                for (long long i = p * p; i <= limit; i += p) mark[i] = false;
            }
        }
        for (long long p = 2; p <= limit; p++) if (mark[p]) primes.push_back(p);

        vector<bool> isPrime(R - L + 1, true);
        if (L == 1) isPrime[0] = false;
        for (long long p : primes) {
            long long start = (L / p) * p;
            if (start < L) start += p;
            for (long long j = max(start, p * p); j <= R; j += p) {
                isPrime[j - L] = false;
            }
        }
        vector<long long> result;
        for (long long i = 0; i <= R - L; i++) {
            if (isPrime[i]) result.push_back(L + i);
        }
        return result;
    }
};`
  },
  {
    id: 36,
    title: "Prime Factorization Using Sieve",
    slug: "prime-factorization-using-sieve",
    topic: "Smallest Prime Factor (SPF)",
    difficulty: "Hard",
    statement: "Precompute Smallest Prime Factor (SPF) array up to N=10^7 and answer prime factorization queries in O(log N) time per query.",
    example: {
      input: "N = 60",
      output: "[2, 2, 3, 5]",
      explanation: "60 = 2 * 2 * 3 * 5."
    },
    constraints: ["2 <= N <= 10^7"],
    hints: ["Compute spf[i] = i for all i, then for each p, mark spf[j] = p for all multiples of p."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> getFactorization(int n) {
        vector<int> spf(n + 1);
        for (int i = 1; i <= n; i++) spf[i] = i;
        for (int i = 2; i * i <= n; i++) {
            if (spf[i] == i) {
                for (int j = i * i; j <= n; j += i) {
                    if (spf[j] == j) spf[j] = i;
                }
            }
        }
        vector<int> factors;
        while (n != 1) {
            factors.push_back(spf[n]);
            n /= spf[n];
        }
        return factors;
    }
};`
  },
  {
    id: 37,
    title: "Count Numbers with Exactly K Divisors (Hard)",
    slug: "count-numbers-with-exactly-k-divisors-hard",
    topic: "Number Theory & Prime Power Math",
    difficulty: "Hard",
    statement: "Count how many numbers <= N (where N <= 10^12) have exactly K divisors.",
    example: {
      input: "N = 100, K = 3",
      output: "4",
      explanation: "Numbers with 3 divisors are squares of primes: 4 (2^2), 9 (3^2), 25 (5^2), 49 (7^2)."
    },
    constraints: ["1 <= N <= 10^12", "1 <= K <= 100"],
    hints: ["A number p^2 has 3 divisors. Find primes p such that p^2 <= N."],
    starterCode: `#include <vector>
#include <cmath>
using namespace std;

class Solution {
public:
    long long countThreeDivisors(long long n) {
        long long limit = sqrt(n);
        vector<bool> isPrime(limit + 1, true);
        long long count = 0;
        for (long long p = 2; p <= limit; p++) {
            if (isPrime[p]) {
                count++;
                for (long long i = p * p; i <= limit; i += p) isPrime[i] = false;
            }
        }
        return count;
    }
};`
  },
  {
    id: 38,
    title: "Modular Inverse Using Extended GCD",
    slug: "modular-inverse-using-extended-gcd",
    topic: "Modular Arithmetic",
    difficulty: "Hard",
    statement: "Given integer A and modulus M (where gcd(A, M) = 1), find the modular multiplicative inverse A^-1 mod M such that (A * A^-1) % M = 1.",
    example: {
      input: "A = 3, M = 11",
      output: "4",
      explanation: "(3 * 4) % 11 = 12 % 11 = 1."
    },
    constraints: ["1 <= A, M <= 10^9"],
    hints: ["Use Extended Euclidean Algorithm: A*x + M*y = 1, return (x % M + M) % M."],
    starterCode: `class Solution {
    int extGCD(int a, int b, int &x, int &y) {
        if (b == 0) { x = 1; y = 0; return a; }
        int x1, y1;
        int gcd = extGCD(b, a % b, x1, y1);
        x = y1;
        y = x1 - (a / b) * y1;
        return gcd;
    }
public:
    int modInverse(int a, int m) {
        int x, y;
        int g = extGCD(a, m, x, y);
        if (g != 1) return -1; // Inverse doesn't exist
        return (x % m + m) % m;
    }
};`
  },
  {
    id: 39,
    title: "Large Number Divisibility Without Big Integers",
    slug: "large-number-divisibility-without-big-integers",
    topic: "Strings & Modular Arithmetic",
    difficulty: "Hard",
    statement: "Given a large integer represented as a string num (up to 10^5 digits) and a divisor K, determine if num is divisible by K and return num % K.",
    example: {
      input: "num = \"123456789123456789123456789\", K = 7",
      output: "rem = 4, isDivisible = false",
      explanation: "Process string digit by digit taking remainder modulo K."
    },
    constraints: ["1 <= num.length <= 10^5", "1 <= K <= 10^9"],
    hints: ["Iterate through string: rem = (rem * 10 + (ch - '0')) % K."],
    starterCode: `#include <string>
using namespace std;

class Solution {
public:
    long long getModulo(string num, long long k) {
        long long rem = 0;
        for (char ch : num) {
            rem = (rem * 10 + (ch - '0')) % k;
        }
        return rem;
    }
};`
  }
];
