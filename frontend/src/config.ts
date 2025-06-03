// config.ts
export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://stone-hub-m00p.onrender.com";
