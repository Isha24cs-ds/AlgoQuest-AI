const questions = [
  {
    id: "ARR001",

    title: "Largest Element in Array",

    difficulty: "Easy",

    xp: 100,

    coins: 50,

    description:
      "Given an integer array, return the largest element.",

    examples: [
      {
        input: "[2,5,8,1]",

        output: "8",
      },
    ],

    hints: [
      "Traverse the array once.",

      "Keep track of the maximum element.",

      "Update the maximum whenever required.",
    ],
  },

  {
    id: "ARR002",

    title: "Second Largest Element",

    difficulty: "Easy",

    xp: 120,

    coins: 60,

    description:
      "Find the second largest element in the array.",

    examples: [
      {
        input: "[5,8,2,9]",

        output: "8",
      },
    ],

    hints: [
      "Maintain two variables.",

      "Largest and second largest.",

      "Update both carefully.",
    ],
  },

  {
    id: "ARR003",

    title: "Check if Array is Sorted",

    difficulty: "Easy",

    xp: 120,

    coins: 60,

    description:
      "Return true if the array is sorted.",

    examples: [
      {
        input: "[1,2,3,4]",

        output: "true",
      },
    ],

    hints: [
      "Compare adjacent elements.",

      "Stop immediately if order breaks.",

      "Traverse once.",
    ],
  }
];

module.exports = questions;