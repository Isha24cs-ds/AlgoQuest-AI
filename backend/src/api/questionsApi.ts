const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export async function getQuestions() {
  const response = await fetch(`${BASE_URL}/questions`);

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data = await response.json();

  return data.data;
}

export async function getQuestion(id: number) {
  const response = await fetch(`${BASE_URL}/questions/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch question");
  }

  const data = await response.json();

  return data.data;
}