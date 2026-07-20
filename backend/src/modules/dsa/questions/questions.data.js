export const arrayQuestions = [
  {
    title: "Largest Element in Array",
    difficulty: "Easy",
    statement:
      "Given an array of integers, return the largest element present in the array.",
    example: {
      input: "nums = [2, 5, 1, 3, 0]",
      output: "5",
      explanation: "5 is the largest element in the array."
    },
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    hints: [
      "Traverse the array once.",
      "Keep track of the maximum element."
    ],
    starterCode:
`int largestElement(vector<int>& nums) {

}`,
    solution: ""
  },

  {
    title: "Second Largest Element",
    difficulty: "Easy",
    statement:
      "Return the second largest distinct element in the array.",
    example: {
      input: "nums = [1,2,4,7,7,5]",
      output: "5",
      explanation: "7 is largest and 5 is second largest."
    },
    constraints: [
      "2 <= nums.length <= 10^5"
    ],
    hints: [
      "Maintain largest and second largest."
    ],
    starterCode:
`int secondLargest(vector<int>& nums) {

}`,
    solution: ""
  },

  {
    title: "Check if Array is Sorted",
    difficulty: "Easy",
    statement:
      "Determine whether the array is sorted in non-decreasing order.",
    example: {
      input: "[1,2,2,4,5]",
      output: "true",
      explanation: "Every element is >= previous."
    },
    constraints: [
      "1 <= n <= 10^5"
    ],
    hints: [
      "Compare adjacent elements."
    ],
    starterCode:
`bool isSorted(vector<int>& nums) {

}`,
    solution: ""
  },

  {
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    statement:
      "Remove duplicates from a sorted array in-place and return the new length.",
    example: {
      input: "[1,1,2,2,3]",
      output: "3",
      explanation: "Remaining array becomes [1,2,3]."
    },
    constraints: [
      "Array is sorted."
    ],
    hints: [
      "Use two pointers."
    ],
    starterCode:
`int removeDuplicates(vector<int>& nums) {

}`,
    solution: ""
  },

  {
    title: "Left Rotate Array by One Place",
    difficulty: "Easy",
    statement:
      "Rotate the array left by one position.",
    example: {
      input: "[1,2,3,4,5]",
      output: "[2,3,4,5,1]",
      explanation: "Move first element to the end."
    },
    constraints: [
      "1 <= n <= 10^5"
    ],
    hints: [
      "Store the first element temporarily."
    ],
    starterCode:
`void rotateByOne(vector<int>& nums) {

}`,
    solution: ""
  },

  {
    title: "Left Rotate Array by D Places",
    difficulty: "Easy",
    statement:
      "Rotate the array left by D positions.",
    example: {
      input: "nums=[1,2,3,4,5], d=2",
      output: "[3,4,5,1,2]",
      explanation: "Rotate two positions."
    },
    constraints: [
      "0 <= d <= n"
    ],
    hints: [
      "Use reversal algorithm."
    ],
    starterCode:
`void rotateArray(vector<int>& nums, int d) {

}`,
    solution: ""
  },

  {
    title: "Move Zeroes to End",
    difficulty: "Easy",
    statement:
      "Move all zeroes to the end while maintaining the relative order of non-zero elements.",
    example: {
      input: "[1,0,2,0,3]",
      output: "[1,2,3,0,0]",
      explanation: "All zeroes are shifted to the end."
    },
    constraints: [
      "1 <= n <= 10^5"
    ],
    hints: [
      "Use two pointers."
    ],
    starterCode:
`void moveZeroes(vector<int>& nums) {

}`,
    solution: ""
  },

  {
    title: "Linear Search",
    difficulty: "Easy",
    statement:
      "Return the index of the target element if present, otherwise return -1.",
    example: {
      input: "nums=[2,4,6], target=4",
      output: "1",
      explanation: "Target found at index 1."
    },
    constraints: [
      "1 <= n <= 10^5"
    ],
    hints: [
      "Traverse the array."
    ],
    starterCode:
`int linearSearch(vector<int>& nums, int target) {

}`,
    solution: ""
  },

  {
    title: "Union of Two Sorted Arrays",
    difficulty: "Easy",
    statement:
      "Return the union of two sorted arrays without duplicates.",
    example: {
      input: "[1,2,3] [2,3,4]",
      output: "[1,2,3,4]",
      explanation: "Duplicate values appear only once."
    },
    constraints: [
      "Arrays are sorted."
    ],
    hints: [
      "Use two pointers."
    ],
    starterCode:
`vector<int> unionArray(vector<int>& a, vector<int>& b) {

}`,
    solution: ""
  },

  {
    title: "Missing Number",
    difficulty: "Easy",
    statement:
      "Given an array containing numbers from 1 to N with one number missing, return the missing number.",
    example: {
      input: "[1,2,4,5]",
      output: "3",
      explanation: "3 is missing."
    },
    constraints: [
      "1 <= n <= 10^5"
    ],
    hints: [
      "Use sum formula or XOR."
    ],
    starterCode:
`int missingNumber(vector<int>& nums) {

}`,
    solution: ""
  }
];