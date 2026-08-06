const arraysMedium = [
  {
    title: "Two Sum",
    slug: "two-sum",
    topic: "Arrays",
    difficulty: "Medium",

    statement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

Return the answer in any order.`,

    example: {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "nums[0] + nums[1] = 2 + 7 = 9",
    },

    constraints: [
      "2 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Exactly one valid answer exists.",
    ],

    hints: [
      "Can you solve it in one pass?",
      "Use a HashMap to store visited elements.",
      "For every number, search for target - number.",
    ],

    starterCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {

}
`,

    solution: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> mp;

    for(int i=0;i<nums.size();i++){
        int need = target - nums[i];

        if(mp.count(need)){
            return {mp[need], i};
        }

        mp[nums[i]] = i;
    }

    return {};
}
`,

    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",

    testCases: [
      {
        input: "[2,7,11,15]\n9",
        expected: "[0,1]",
        isHidden: false,
      },
      {
        input: "[3,2,4]\n6",
        expected: "[1,2]",
        isHidden: false,
      },
      {
        input: "[3,3]\n6",
        expected: "[0,1]",
        isHidden: false,
      },
      {
        input: "[1,5,8,10]\n18",
        expected: "[2,3]",
        isHidden: true,
      },
      {
        input: "[5,75,25]\n100",
        expected: "[1,2]",
        isHidden: true,
      },
    ],
  },
{
  title: "Best Time to Buy and Sell Stock",
  slug: "best-time-to-buy-and-sell-stock",
  topic: "Arrays",
  difficulty: "Medium",

  statement: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve. If you cannot achieve any profit, return 0.`,

  example: {
    input: "prices = [7,1,5,3,6,4]",
    output: "5",
    explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6).",
  },

  constraints: [
    "1 <= prices.length <= 100000",
    "0 <= prices[i] <= 10000",
  ],

  hints: [
    "Keep track of the minimum price seen so far.",
    "Calculate profit at every day.",
    "Update maximum profit whenever possible.",
  ],

  starterCode: `#include <bits/stdc++.h>
using namespace std;

int maxProfit(vector<int>& prices) {

}
`,

  solution: `#include <bits/stdc++.h>
using namespace std;

int maxProfit(vector<int>& prices) {
    int mini = prices[0];
    int ans = 0;

    for(int i=1;i<prices.size();i++){
        ans = max(ans, prices[i]-mini);
        mini = min(mini, prices[i]);
    }

    return ans;
}
`,

  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",

  testCases: [
    {
      input: "[7,1,5,3,6,4]",
      expected: "5",
      isHidden: false,
    },
    {
      input: "[7,6,4,3,1]",
      expected: "0",
      isHidden: false,
    },
    {
      input: "[2,4,1]",
      expected: "2",
      isHidden: true,
    },
    {
      input: "[2,1,2,1,0,1,2]",
      expected: "2",
      isHidden: true,
    },
  ],
},
{
  title: "Rotate Array",
  slug: "rotate-array",
  topic: "Arrays",
  difficulty: "Medium",

  statement: `Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

Modify the array in-place.`,

  example: {
    input: "nums = [1,2,3,4,5,6,7], k = 3",
    output: "[5,6,7,1,2,3,4]",
    explanation: "Rotate the array three steps to the right.",
  },

  constraints: [
    "1 <= nums.length <= 100000",
    "-2^31 <= nums[i] <= 2^31 - 1",
    "0 <= k <= 100000",
  ],

  hints: [
    "Reverse the whole array.",
    "Reverse first k elements.",
    "Reverse remaining elements.",
  ],

  starterCode: `#include <bits/stdc++.h>
using namespace std;

void rotate(vector<int>& nums, int k) {

}
`,

  solution: `#include <bits/stdc++.h>
using namespace std;

void rotate(vector<int>& nums, int k) {
    int n = nums.size();

    k %= n;

    reverse(nums.begin(), nums.end());
    reverse(nums.begin(), nums.begin()+k);
    reverse(nums.begin()+k, nums.end());
}
`,

  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",

  testCases: [
    {
      input: "[1,2,3,4,5,6,7]\n3",
      expected: "[5,6,7,1,2,3,4]",
      isHidden: false,
    },
    {
      input: "[-1,-100,3,99]\n2",
      expected: "[3,99,-1,-100]",
      isHidden: false,
    },
    {
      input: "[1]\n0",
      expected: "[1]",
      isHidden: true,
    },
    {
      input: "[1,2]\n3",
      expected: "[2,1]",
      isHidden: true,
    },
  ],
},
{
  title: "Next Permutation",
  slug: "next-permutation",
  topic: "Arrays",
  difficulty: "Medium",

  statement: `A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

Given an array of integers nums, find the next lexicographically greater permutation of numbers.

If such an arrangement is not possible, rearrange it as the lowest possible order (i.e., sorted in ascending order).

You must modify the array in-place using only constant extra memory.`,

  example: {
    input: "nums = [1,2,3]",
    output: "[1,3,2]",
    explanation: "The next lexicographical permutation after [1,2,3] is [1,3,2]."
  },

  constraints: [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 100"
  ],

  hints: [
    "Traverse the array from right to left.",
    "Find the first index where nums[i] < nums[i+1].",
    "Swap with the next greater element on the right and reverse the suffix."
  ],

  starterCode: `#include <bits/stdc++.h>
using namespace std;

void nextPermutation(vector<int>& nums) {

}
`,

  solution: `#include <bits/stdc++.h>
using namespace std;

void nextPermutation(vector<int>& nums) {
    int n = nums.size();

    int ind = -1;

    for(int i=n-2;i>=0;i--){
        if(nums[i] < nums[i+1]){
            ind = i;
            break;
        }
    }

    if(ind == -1){
        reverse(nums.begin(), nums.end());
        return;
    }

    for(int i=n-1;i>ind;i--){
        if(nums[i] > nums[ind]){
            swap(nums[i], nums[ind]);
            break;
        }
    }

    reverse(nums.begin()+ind+1, nums.end());
}
`,

  timeComplexity: "O(n)",

  spaceComplexity: "O(1)",

  testCases: [
    {
      input: "[1,2,3]",
      expected: "[1,3,2]",
      isHidden: false
    },
    {
      input: "[3,2,1]",
      expected: "[1,2,3]",
      isHidden: false
    },
    {
      input: "[1,1,5]",
      expected: "[1,5,1]",
      isHidden: false
    },
    {
      input: "[1,3,2]",
      expected: "[2,1,3]",
      isHidden: true
    },
    {
      input: "[2,3,1]",
      expected: "[3,1,2]",
      isHidden: true
    }
  ]
},

];

export default arraysMedium;