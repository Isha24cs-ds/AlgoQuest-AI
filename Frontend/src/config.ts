let baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// Sanitize URL to ensure it always ends with /api/v1
if (!baseUrl.endsWith("/api/v1")) {
  baseUrl = baseUrl.replace(/\/$/, "") + "/api/v1";
}

export const API_BASE_URL = baseUrl;
