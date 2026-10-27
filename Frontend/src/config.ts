let baseUrl = import.meta.env.VITE_API_URL || "https://algoquest-backend-iakp.onrender.com/api/v1";

// Sanitize URL to ensure it always ends with /api/v1
if (!baseUrl.endsWith("/api/v1")) {
  baseUrl = baseUrl.replace(/\/$/, "") + "/api/v1";
}

export const API_BASE_URL = baseUrl;
