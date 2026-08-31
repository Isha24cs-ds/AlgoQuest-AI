const arraysEasy = [
  {
    title: "Largest Element in Array",
    slug: "largest-element-in-array",
    topic: "Arrays",
    pattern: "Two Pointers",
    difficulty: "Easy",


    statement: `Given an array of integers nums, return the largest element present in the array.`,

    example: {
      input: "nums = [2,5,1,3,0]",
      output: "5",
      explanation: "The largest element in the array is 5."
    },

    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],

    hints: [
      "Initialize answer with the first element.",
      "Traverse the array once.",
      "Update answer whenever a larger element is found."
    ],

    starterCode: `int largestElement(vector<int>& nums) {

}`,

    solution: `int largestElement(vector<int>& nums){
    int maxi=nums[0];

    for(int x:nums)
        maxi=max(maxi,x);

    return maxi;
}`,

    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",

    testCases: [
      { input: "[2,5,1,3,0]", expected: "5", isHidden:false },
      { input: "[8]", expected:"8", isHidden:false },
      { input: "[-5,-2,-9]", expected:"-2", isHidden:true },
      { input: "[100,200,300]", expected:"300", isHidden:true }
    ]
  },

  {
    title: "Second Largest Element",
    slug: "second-largest-element",
    topic: "Arrays",
    difficulty: "Easy",

    statement: `Given an array of integers, return the second largest distinct element. If it doesn't exist, return -1.`,

    example:{
      input:"nums=[1,2,4,7,7,5]",
      output:"5",
      explanation:"Largest = 7, Second Largest = 5."
    },

    constraints:[
      "2 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],

    hints:[
      "Keep track of largest and second largest.",
      "Ignore duplicate values.",
      "Only one traversal is needed."
    ],

    starterCode:`int secondLargest(vector<int>& nums){

}`,

    solution:`int secondLargest(vector<int>& nums){

    int largest=INT_MIN;
    int second=INT_MIN;

    for(int x:nums){

        if(x>largest){
            second=largest;
            largest=x;
        }
        else if(x!=largest && x>second){
            second=x;
        }
    }

    return second==INT_MIN?-1:second;
}`,

    timeComplexity:"O(n)",
    spaceComplexity:"O(1)",

    testCases:[
      {input:"[1,2,4,7,7,5]",expected:"5",isHidden:false},
      {input:"[10,10]",expected:"-1",isHidden:false},
      {input:"[5,4,3,2,1]",expected:"4",isHidden:true},
      {input:"[-5,-2,-1]",expected:"-2",isHidden:true}
    ]
  },

  {
    title:"Check if Array is Sorted",

    slug:"check-if-array-is-sorted",

    topic:"Arrays",

    difficulty:"Easy",

    statement:`Given an integer array nums, return true if the array is sorted in non-decreasing order, otherwise return false.`,

    example:{
      input:"nums=[1,2,2,3,4]",
      output:"true",
      explanation:"Every element is greater than or equal to the previous element."
    },

    constraints:[
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],

    hints:[
      "Compare adjacent elements.",
      "If nums[i] < nums[i-1], return false.",
      "If traversal finishes, array is sorted."
    ],

    starterCode:`bool isSorted(vector<int>& nums){

}`,

    solution:`bool isSorted(vector<int>& nums){

    for(int i=1;i<nums.size();i++){

        if(nums[i]<nums[i-1])
            return false;
    }

    return true;
}`,

    timeComplexity:"O(n)",

    spaceComplexity:"O(1)",

    testCases:[
      {input:"[1,2,2,3]",expected:"true",isHidden:false},
      {input:"[5,4,3]",expected:"false",isHidden:false},
      {input:"[7]",expected:"true",isHidden:true},
      {input:"[-5,-2,-2,-1]",expected:"true",isHidden:true}
    ]
  },
  {
  title: "Remove Duplicates from Sorted Array",
  slug: "remove-duplicates-from-sorted-array",
  topic: "Arrays",
  difficulty: "Easy",

  statement:
    "Given a sorted integer array nums, remove the duplicates in-place such that each unique element appears only once. Return the number of unique elements.",

  example: {
    input: "nums = [1,1,2]",
    output: "2",
    explanation: "The unique elements are [1,2]."
  },

  constraints: [
    "1 <= nums.length <= 3 * 10^4",
    "-100 <= nums[i] <= 100",
    "nums is sorted in non-decreasing order"
  ],

  hints: [
    "Use two pointers.",
    "One pointer keeps track of unique elements.",
    "Traverse only once."
  ],

  starterCode: `int removeDuplicates(vector<int>& nums){

}`,

  solution: `int removeDuplicates(vector<int>& nums){

    int i=0;

    for(int j=1;j<nums.size();j++){

        if(nums[j]!=nums[i]){
            i++;
            nums[i]=nums[j];
        }

    }

    return i+1;

}`,

  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",

  testCases: [
    { input:"[1,1,2]", expected:"2", isHidden:false },
    { input:"[0,0,1,1,2]", expected:"3", isHidden:false },
    { input:"[1]", expected:"1", isHidden:true }
  ]
},
{
  title:"Left Rotate Array by One",

  slug:"left-rotate-array-by-one",

  topic:"Arrays",

  difficulty:"Easy",

  statement:
    "Given an array, rotate it left by one position.",

  example:{
    input:"nums=[1,2,3,4,5]",
    output:"[2,3,4,5,1]",
    explanation:"Shift every element left by one position."
  },

  constraints:[
    "1 <= nums.length <= 10^5"
  ],

  hints:[
    "Store the first element.",
    "Shift remaining elements.",
    "Place first element at the end."
  ],

  starterCode:`vector<int> rotateLeft(vector<int>& nums){

}`,

  solution:`vector<int> rotateLeft(vector<int>& nums){

    int first=nums[0];

    for(int i=1;i<nums.size();i++)
        nums[i-1]=nums[i];

    nums.back()=first;

    return nums;

}`,

  timeComplexity:"O(n)",

  spaceComplexity:"O(1)",

  testCases:[
    {input:"[1,2,3,4,5]",expected:"[2,3,4,5,1]",isHidden:false},
    {input:"[7]",expected:"[7]",isHidden:true}
  ]
},
{
  title:"Move Zeroes",

  slug:"move-zeroes",

  topic:"Arrays",

  difficulty:"Easy",

  statement:
    "Move all zeroes to the end while maintaining the relative order of non-zero elements.",

  example:{
    input:"[0,1,0,3,12]",
    output:"[1,3,12,0,0]",
    explanation:"All zeroes are moved to the end."
  },

  constraints:[
    "1 <= nums.length <= 10^4"
  ],

  hints:[
    "Use two pointers.",
    "Swap non-zero values forward.",
    "Avoid using extra array."
  ],

  starterCode:`void moveZeroes(vector<int>& nums){

}`,

  solution:`void moveZeroes(vector<int>& nums){

    int j=0;

    for(int i=0;i<nums.size();i++){

        if(nums[i]!=0){

            swap(nums[i],nums[j]);

            j++;

        }

    }

}`,

  timeComplexity:"O(n)",

  spaceComplexity:"O(1)",

  testCases:[
    {input:"[0,1,0,3,12]",expected:"[1,3,12,0,0]",isHidden:false},
    {input:"[0]",expected:"[0]",isHidden:true}
  ]
},
{
  title:"Linear Search",

  slug:"linear-search",

  topic:"Arrays",

  difficulty:"Easy",

  statement:
    "Given an array and a target value, return its index. Return -1 if the target does not exist.",

  example:{
    input:"nums=[2,4,6,8], target=6",
    output:"2",
    explanation:"6 is found at index 2."
  },

  constraints:[
    "1 <= nums.length <= 10^5"
  ],

  hints:[
    "Traverse from left to right.",
    "Compare each element with target.",
    "Return index immediately."
  ],

  starterCode:`int linearSearch(vector<int>& nums,int target){

}`,

  solution:`int linearSearch(vector<int>& nums,int target){

    for(int i=0;i<nums.size();i++){

        if(nums[i]==target)
            return i;

    }

    return -1;

}`,

  timeComplexity:"O(n)",

  spaceComplexity:"O(1)",

  testCases:[
    {input:"[2,4,6,8],6",expected:"2",isHidden:false},
    {input:"[1,2,3],7",expected:"-1",isHidden:true}
  ]
},
{
  title: "Find Missing Number",

  slug: "find-missing-number",

  topic: "Arrays",

  difficulty: "Easy",

  statement:
    "Given an array containing n distinct numbers from the range [0, n], return the only missing number.",

  example: {
    input: "nums = [3,0,1]",
    output: "2",
    explanation: "Numbers should be 0,1,2,3. Missing number is 2."
  },

  constraints: [
    "1 <= nums.length <= 10^5",
    "0 <= nums[i] <= n"
  ],

  hints: [
    "Find the expected sum from 0 to n.",
    "Subtract the array sum.",
    "Think of XOR as another solution."
  ],

  starterCode: `int missingNumber(vector<int>& nums){

}`,

  solution: `int missingNumber(vector<int>& nums){

    int n=nums.size();

    int expected=n*(n+1)/2;

    int sum=0;

    for(int x:nums)
        sum+=x;

    return expected-sum;

}`,

  timeComplexity:"O(n)",

  spaceComplexity:"O(1)",

  testCases:[
    {input:"[3,0,1]",expected:"2",isHidden:false},
    {input:"[0,1]",expected:"2",isHidden:false},
    {input:"[1]",expected:"0",isHidden:true}
  ]
},
{
  title:"Maximum Consecutive Ones",

  slug:"maximum-consecutive-ones",

  topic:"Arrays",

  difficulty:"Easy",

  statement:
    "Given a binary array nums, return the maximum number of consecutive 1's in the array.",

  example:{
    input:"[1,1,0,1,1,1]",
    output:"3",
    explanation:"Longest sequence of 1's has length 3."
  },

  constraints:[
    "1 <= nums.length <= 10^5"
  ],

  hints:[
    "Keep a running count.",
    "Reset when encountering 0.",
    "Maintain the maximum count."
  ],

  starterCode:`int findMaxConsecutiveOnes(vector<int>& nums){

}`,

  solution:`int findMaxConsecutiveOnes(vector<int>& nums){

    int cnt=0;

    int ans=0;

    for(int x:nums){

        if(x==1){

            cnt++;

            ans=max(ans,cnt);

        }

        else{

            cnt=0;

        }

    }

    return ans;

}`,

  timeComplexity:"O(n)",

  spaceComplexity:"O(1)",

  testCases:[
    {input:"[1,1,0,1,1,1]",expected:"3",isHidden:false},
    {input:"[0,0]",expected:"0",isHidden:true},
    {input:"[1,1,1]",expected:"3",isHidden:true}
  ]
},
{
  title:"Single Number",

  slug:"single-number",

  topic:"Arrays",

  difficulty:"Easy",

  statement:
    "Every element appears twice except one. Find that single element.",

  example:{
    input:"[4,1,2,1,2]",
    output:"4",
    explanation:"Only 4 appears once."
  },

  constraints:[
    "1 <= nums.length <= 3*10^4"
  ],

  hints:[
    "XOR of same numbers becomes 0.",
    "XOR is associative.",
    "XOR every element."
  ],

  starterCode:`int singleNumber(vector<int>& nums){

}`,

  solution:`int singleNumber(vector<int>& nums){

    int ans=0;

    for(int x:nums)

        ans^=x;

    return ans;

}`,

  timeComplexity:"O(n)",

  spaceComplexity:"O(1)",

  testCases:[
    {input:"[2,2,1]",expected:"1",isHidden:false},
    {input:"[4,1,2,1,2]",expected:"4",isHidden:false},
    {input:"[1]",expected:"1",isHidden:true}
  ]
}
];

export default arraysEasy;