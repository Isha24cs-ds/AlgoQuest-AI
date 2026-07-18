import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.question.create({
    data: {
      title: "Largest Element in Array",
      difficulty: "Easy",
      statement:
        "Given an array of integers nums, return the largest element present in the array.",
      example: {
        input: "nums = [2,5,1,8,3]",
        output: "8",
        explanation: "8 is the largest element in the array."
      },
      constraints: [
        "1 <= nums.length <= 100000",
        "-10^9 <= nums[i] <= 10^9"
      ],
      hints: [
        "Traverse the array once.",
        "Maintain the maximum element seen so far.",
        "Update the maximum whenever you find a larger element."
      ],
      starterCode: `int largestElement(vector<int>& nums){

}`,
      solution: `int largestElement(vector<int>& nums){
    int mx = nums[0];

    for(int x : nums){
        if(x > mx) mx = x;
    }

    return mx;
}`
    }
  });

  console.log("✅ Question inserted successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });