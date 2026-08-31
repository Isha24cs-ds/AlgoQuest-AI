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

export const practiceQuestions: QuestionItem[] = [
  // ================= 🟢 EASY (10 Problems) =================
  {
    id: 1,
    title: "Find the Largest Element in an Array",
    slug: "find-largest-element-in-array",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "Given an array of integers nums, return the largest element present in the array.",
    example: {
      input: "nums = [3, 7, 2, 9, 5]",
      output: "9",
      explanation: "9 is the maximum value in the array."
    },
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    hints: ["Initialize maxVal with nums[0] and iterate through the array."],
    starterCode: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findLargest(vector<int>& nums) {
        int maxVal = nums[0];
        for (int x : nums) {
            if (x > maxVal) maxVal = x;
        }
        return maxVal;
    }
};`
  },
  {
    id: 2,
    title: "Find the Smallest Element in an Array",
    slug: "find-smallest-element-in-array",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "Given an array of integers nums, return the smallest element present in the array.",
    example: {
      input: "nums = [14, 5, 22, 1, 9]",
      output: "1",
      explanation: "1 is the minimum value."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Initialize minVal with nums[0] and compare each element."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int findSmallest(vector<int>& nums) {
        int minVal = nums[0];
        for (int x : nums) {
            if (x < minVal) minVal = x;
        }
        return minVal;
    }
};`
  },
  {
    id: 3,
    title: "Find the Sum of Array Elements",
    slug: "find-sum-of-array-elements",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "Given an array of integers nums, return the sum of all its elements.",
    example: {
      input: "nums = [1, 2, 3, 4, 5]",
      output: "15",
      explanation: "1 + 2 + 3 + 4 + 5 = 15."
    },
    constraints: ["1 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4"],
    hints: ["Use a accumulator variable initialized to 0."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    long long findSum(vector<int>& nums) {
        long long sum = 0;
        for (int x : nums) sum += x;
        return sum;
    }
};`
  },
  {
    id: 4,
    title: "Reverse an Array",
    slug: "reverse-an-array",
    topic: "Arrays & Two Pointers",
    difficulty: "Easy",
    statement: "Given an array nums, reverse the order of its elements in-place.",
    example: {
      input: "nums = [1, 2, 3, 4]",
      output: "[4, 3, 2, 1]",
      explanation: "Elements are swapped from outer ends inwards."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Use two pointers at start and end of array and swap until they meet."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    void reverseArray(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            swap(nums[left++], nums[right--]);
        }
    }
};`
  },
  {
    id: 5,
    title: "Find the Second Largest Element",
    slug: "find-second-largest-element",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "Find the second largest distinct element in an array. If it does not exist, return -1.",
    example: {
      input: "nums = [12, 35, 1, 10, 34, 1]",
      output: "34",
      explanation: "Largest is 35, second largest is 34."
    },
    constraints: ["2 <= nums.length <= 10^5"],
    hints: ["Maintain largest and secondLargest in a single pass."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int findSecondLargest(vector<int>& nums) {
        int largest = -1, second = -1;
        for (int x : nums) {
            if (x > largest) {
                second = largest;
                largest = x;
            } else if (x < largest && x > second) {
                second = x;
            }
        }
        return second;
    }
};`
  },
  {
    id: 6,
    title: "Check if Array is Sorted",
    slug: "check-if-array-is-sorted",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "Given an array of integers nums, return true if the array is sorted in non-decreasing order.",
    example: {
      input: "nums = [1, 2, 3, 4, 5]",
      output: "true",
      explanation: "Every element nums[i] <= nums[i+1]."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Loop from index 1 to N-1 and check if nums[i] < nums[i-1]."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    bool isSorted(vector<int>& nums) {
        for (size_t i = 1; i < nums.size(); i++) {
            if (nums[i] < nums[i - 1]) return false;
        }
        return true;
    }
};`
  },
  {
    id: 7,
    title: "Linear Search in an Array",
    slug: "linear-search-in-an-array",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "Given an array nums and a target integer target, return the 0-based index of target if found, else -1.",
    example: {
      input: "nums = [4, 2, 8, 1, 9], target = 8",
      output: "2",
      explanation: "8 occurs at index 2."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Iterate through array indices 0 to N-1."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        for (int i = 0; i < (int)nums.size(); i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
};`
  },
  {
    id: 8,
    title: "Count Even and Odd Elements",
    slug: "count-even-and-odd-elements",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "Given an array nums, return a pair containing the count of even numbers and odd numbers.",
    example: {
      input: "nums = [1, 2, 3, 4, 5, 6]",
      output: "even: 3, odd: 3",
      explanation: "Evens: [2,4,6], Odds: [1,3,5]."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Check (x % 2 == 0) for even."],
    starterCode: `#include <vector>
#include <utility>
using namespace std;

class Solution {
public:
    pair<int, int> countEvenOdd(vector<int>& nums) {
        int even = 0, odd = 0;
        for (int x : nums) {
            if (x % 2 == 0) even++;
            else odd++;
        }
        return {even, odd};
    }
};`
  },
  {
    id: 9,
    title: "Remove Duplicates from Sorted Array",
    slug: "remove-duplicates-from-sorted-array-easy",
    topic: "Arrays & Two Pointers",
    difficulty: "Easy",
    statement: "Given a sorted array nums, remove the duplicates in-place such that each unique element appears only once.",
    example: {
      input: "nums = [1, 1, 2]",
      output: "length = 2, nums = [1, 2, _]",
      explanation: "Unique elements are 1 and 2."
    },
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    hints: ["Use a write pointer starting at index 1."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int write = 1;
        for (size_t read = 1; read < nums.size(); read++) {
            if (nums[read] != nums[read - 1]) {
                nums[write++] = nums[read];
            }
        }
        return write;
    }
};`
  },
  {
    id: 10,
    title: "Move All Zeroes to the End",
    slug: "move-all-zeroes-to-end",
    topic: "Arrays & Two Pointers",
    difficulty: "Easy",
    statement: "Given an array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
    example: {
      input: "nums = [0, 1, 0, 3, 12]",
      output: "[1, 3, 12, 0, 0]",
      explanation: "Non-zero elements shifted forward, zeros placed at end."
    },
    constraints: ["1 <= nums.length <= 10^4"],
    hints: ["Maintain a insertPos pointer for non-zero values."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int insertPos = 0;
        for (int x : nums) {
            if (x != 0) nums[insertPos++] = x;
        }
        while (insertPos < (int)nums.size()) {
            nums[insertPos++] = 0;
        }
    }
};`
  },

  // ================= 🟡 MEDIUM (10 Problems) =================
  {
    id: 11,
    title: "Two Sum",
    slug: "two-sum",
    topic: "Arrays & Hash Map",
    difficulty: "Medium",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    example: {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0, 1]",
      explanation: "nums[0] + nums[1] == 9."
    },
    constraints: ["2 <= nums.length <= 10^4"],
    hints: ["Store seen values in unordered_map."],
    starterCode: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < (int)nums.size(); i++) {
            int diff = target - nums[i];
            if (mp.count(diff)) return {mp[diff], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};`
  },
  {
    id: 12,
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    topic: "Arrays & Greedy",
    difficulty: "Medium",
    statement: "Find the maximum profit you can achieve by choosing a single day to buy one stock and a different day in the future to sell it.",
    example: {
      input: "prices = [7,1,5,3,6,4]",
      output: "5",
      explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5."
    },
    constraints: ["1 <= prices.length <= 10^5"],
    hints: ["Track minimum buying price seen so far."],
    starterCode: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = 1e9;
        int maxProf = 0;
        for (int p : prices) {
            minPrice = min(minPrice, p);
            maxProf = max(maxProf, p - minPrice);
        }
        return maxProf;
    }
};`
  },
  {
    id: 13,
    title: "Majority Element",
    slug: "majority-element",
    topic: "Boyer-Moore Voting",
    difficulty: "Medium",
    statement: "Find the majority element that appears more than ⌊n / 2⌋ times in an array.",
    example: {
      input: "nums = [2,2,1,1,1,2,2]",
      output: "2",
      explanation: "2 appears 4 times out of 7."
    },
    constraints: ["1 <= nums.length <= 5 * 10^4"],
    hints: ["Apply Boyer-Moore Voting Algorithm."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = 0, count = 0;
        for (int x : nums) {
            if (count == 0) candidate = x;
            count += (x == candidate) ? 1 : -1;
        }
        return candidate;
    }
};`
  },
  {
    id: 14,
    title: "Rotate Array",
    slug: "rotate-array",
    topic: "Arrays",
    difficulty: "Medium",
    statement: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.",
    example: {
      input: "nums = [1,2,3,4,5,6,7], k = 3",
      output: "[5,6,7,1,2,3,4]",
      explanation: "Rotated right by 3 positions."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Reverse whole array, reverse first k, reverse remaining N-k."],
    starterCode: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};`
  },
  {
    id: 15,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    topic: "Kadane's Algorithm",
    difficulty: "Medium",
    statement: "Find the contiguous subarray with the largest sum and return its sum.",
    example: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "Subarray [4,-1,2,1] has sum 6."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Use Kadane's Algorithm keeping current running sum."],
    starterCode: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int curr = nums[0], maxSoFar = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            curr = max(nums[i], curr + nums[i]);
            maxSoFar = max(maxSoFar, curr);
        }
        return maxSoFar;
    }
};`
  },
  {
    id: 16,
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    topic: "Arrays & Prefix Product",
    difficulty: "Medium",
    statement: "Return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i] in O(N) time without division.",
    example: {
      input: "nums = [1,2,3,4]",
      output: "[24,12,8,6]",
      explanation: "24 = 2*3*4, 12 = 1*3*4, 8 = 1*2*4, 6 = 1*2*3."
    },
    constraints: ["2 <= nums.length <= 10^5"],
    hints: ["Compute prefix products forward and suffix products backward."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
};`
  },
  {
    id: 17,
    title: "Sort Colors",
    slug: "sort-colors",
    topic: "Dutch National Flag",
    difficulty: "Medium",
    statement: "Sort an array nums with 0s, 1s, and 2s in-place in a single pass.",
    example: {
      input: "nums = [2,0,2,1,1,0]",
      output: "[0,0,1,1,2,2]",
      explanation: "0s first, 1s second, 2s last."
    },
    constraints: ["1 <= nums.length <= 300"],
    hints: ["Use 3 pointers: low, mid, and high."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) swap(nums[low++], nums[mid++]);
            else if (nums[mid] == 1) mid++;
            else swap(nums[mid], nums[high--]);
        }
    }
};`
  },
  {
    id: 18,
    title: "3Sum",
    slug: "3sum",
    topic: "Two Pointers & Sorting",
    difficulty: "Medium",
    statement: "Find all unique triplets [nums[i], nums[j], nums[k]] in the array such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    example: {
      input: "nums = [-1,0,1,2,-1,-4]",
      output: "[[-1,-1,2],[-1,0,1]]",
      explanation: "Distinct triplets summing to 0."
    },
    constraints: ["3 <= nums.length <= 3000"],
    hints: ["Sort array, fix first element i, use two pointers for remaining pair."],
    starterCode: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Your code here
        return {};
    }
};`
  },
  {
    id: 19,
    title: "Subarray Sum Equals K",
    slug: "subarray-sum-equals-k",
    topic: "Prefix Sum & Hash Map",
    difficulty: "Medium",
    statement: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.",
    example: {
      input: "nums = [1,1,1], k = 2",
      output: "2",
      explanation: "[1,1] at indices (0,1) and (1,2)."
    },
    constraints: ["1 <= nums.length <= 2 * 10^4"],
    hints: ["Store prefix sum frequencies in unordered_map."],
    starterCode: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        mp[0] = 1;
        int curr = 0, count = 0;
        for (int x : nums) {
            curr += x;
            if (mp.count(curr - k)) count += mp[curr - k];
            mp[curr]++;
        }
        return count;
    }
};`
  },
  {
    id: 20,
    title: "Longest Consecutive Sequence",
    slug: "longest-consecutive-sequence",
    topic: "Hash Set",
    difficulty: "Medium",
    statement: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence in O(N) time.",
    example: {
      input: "nums = [100,4,200,1,3,2]",
      output: "4",
      explanation: "Sequence is [1, 2, 3, 4]."
    },
    constraints: ["0 <= nums.length <= 10^5"],
    hints: ["Put all elements into unordered_set. Only start count if num-1 is not in set."],
    starterCode: `#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> st(nums.begin(), nums.end());
        int maxLen = 0;
        for (int x : st) {
            if (!st.count(x - 1)) {
                int curr = x;
                int len = 1;
                while (st.count(curr + 1)) { curr++; len++; }
                maxLen = max(maxLen, len);
            }
        }
        return maxLen;
    }
};`
  },

  // ================= 🔴 HARD (10 Problems) =================
  {
    id: 21,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water-array",
    topic: "Two Pointers",
    difficulty: "Hard",
    statement: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
    example: {
      input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
      output: "6",
      explanation: "Trapped water volume is 6 units."
    },
    constraints: ["1 <= height.length <= 2 * 10^4"],
    hints: ["Maintain leftMax and rightMax using two pointers."],
    starterCode: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
};`
  },
  {
    id: 22,
    title: "First Missing Positive",
    slug: "first-missing-positive",
    topic: "Arrays & Cyclic Sort",
    difficulty: "Hard",
    statement: "Given an unsorted integer array nums, return the smallest missing positive integer in O(N) time and O(1) space.",
    example: {
      input: "nums = [3,4,-1,1]",
      output: "2",
      explanation: "1 and 3,4 are present. 2 is the smallest missing positive integer."
    },
    constraints: ["1 <= nums.length <= 5 * 10^5"],
    hints: ["Place each element x at index x-1 if 1 <= x <= N."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[i], nums[nums[i] - 1]);
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
};`
  },
  {
    id: 23,
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    topic: "Binary Search",
    difficulty: "Hard",
    statement: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays in O(log (m+n)) time.",
    example: {
      input: "nums1 = [1,3], nums2 = [2]",
      output: "2.00000",
      explanation: "Merged array = [1,2,3] and median is 2.0."
    },
    constraints: ["0 <= m, n <= 1000"],
    hints: ["Binary search on smaller array to find correct partition."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
        return 0.0;
    }
};`
  },
  {
    id: 24,
    title: "Maximum Product Subarray",
    slug: "maximum-product-subarray",
    topic: "Dynamic Programming",
    difficulty: "Hard",
    statement: "Find a contiguous non-empty subarray within an array that has the largest product.",
    example: {
      input: "nums = [2,3,-2,4]",
      output: "6",
      explanation: "[2,3] has the largest product 6."
    },
    constraints: ["1 <= nums.length <= 2 * 10^4"],
    hints: ["Maintain both maxProduct and minProduct at each step."],
    starterCode: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int maxProd = nums[0], minProd = nums[0], res = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            if (nums[i] < 0) swap(maxProd, minProd);
            maxProd = max(nums[i], maxProd * nums[i]);
            minProd = min(nums[i], minProd * nums[i]);
            res = max(res, maxProd);
        }
        return res;
    }
};`
  },
  {
    id: 25,
    title: "Largest Rectangle in Histogram",
    slug: "largest-rectangle-in-histogram-array",
    topic: "Monotonic Stack",
    difficulty: "Hard",
    statement: "Given an array of integers heights representing the histogram's bar height, return the area of the largest rectangle in the histogram.",
    example: {
      input: "heights = [2,1,5,6,2,3]",
      output: "10",
      explanation: "Bars 5 and 6 form a rectangle of area 10."
    },
    constraints: ["1 <= heights.length <= 10^5"],
    hints: ["Use monotonic increasing stack storing bar indices."],
    starterCode: `#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 26,
    title: "Count of Smaller Numbers After Self",
    slug: "count-of-smaller-numbers-after-self",
    topic: "Merge Sort / Fenwick Tree",
    difficulty: "Hard",
    statement: "Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].",
    example: {
      input: "nums = [5,2,6,1]",
      output: "[2,1,1,0]",
      explanation: "To right of 5: 2 and 1 (2 smaller), to right of 2: 1 (1 smaller)."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Use modified Merge Sort or Binary Indexed Tree (Fenwick)."],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> countSmaller(vector<int>& nums) {
        // Your code here
        return {};
    }
};`
  },
  {
    id: 27,
    title: "Maximum Sum Circular Subarray",
    slug: "maximum-sum-circular-subarray",
    topic: "Kadane's Algorithm Variant",
    difficulty: "Hard",
    statement: "Given a circular integer array nums, find the maximum possible sum of a non-empty subarray.",
    example: {
      input: "nums = [5,-3,5]",
      output: "10",
      explanation: "Subarray [5, 5] across circular boundary has sum 10."
    },
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    hints: ["Max circular sum is totalSum - minSubarraySum."],
    starterCode: `#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        // Your code here
        return 0;
    }
};`
  },
  {
    id: 28,
    title: "Candy",
    slug: "candy",
    topic: "Greedy Arrays",
    difficulty: "Hard",
    statement: "There are n children standing in a line. Each child is assigned a rating. Allocate minimum candies such that higher rating children get more candies than neighbors.",
    example: {
      input: "ratings = [1,0,2]",
      output: "5",
      explanation: "Candies allocated: [2, 1, 2]."
    },
    constraints: ["n == ratings.length <= 2 * 10^4"],
    hints: ["Two passes: left-to-right pass then right-to-left pass."],
    starterCode: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> candies(n, 1);
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
        }
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) candies[i] = max(candies[i], candies[i + 1] + 1);
        }
        int total = 0;
        for (int c : candies) total += c;
        return total;
    }
};`
  },
  {
    id: 29,
    title: "Sliding Window Maximum",
    slug: "sliding-window-maximum-array",
    topic: "Monotonic Deque",
    difficulty: "Hard",
    statement: "Given an array nums and window size k, return the maximum value in each window as it slides from left to right.",
    example: {
      input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
      output: "[3,3,5,5,6,7]",
      explanation: "Optimal double-ended queue tracking window maximum."
    },
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Store indices in monotonic decreasing deque."],
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
    id: 30,
    title: "Split Array Largest Sum",
    slug: "split-array-largest-sum",
    topic: "Binary Search on Answer",
    difficulty: "Hard",
    statement: "Given an array nums of non-negative integers and an integer k, split the array into k non-empty contiguous subarrays such that the largest sum among these subarrays is minimized.",
    example: {
      input: "nums = [7,2,5,10,8], k = 2",
      output: "18",
      explanation: "Subarrays: [7,2,5] and [10,8]. Largest sum is 18."
    },
    constraints: ["1 <= nums.length <= 1000", "1 <= k <= min(50, nums.length)"],
    hints: ["Binary search the answer between max(nums) and sum(nums)."],
    starterCode: `#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
public:
    int splitArray(vector<int>& nums, int k) {
        // Your code here
        return 0;
    }
};`
  }
];
