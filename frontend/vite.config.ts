/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    includeSource: ["src/**/*.{ts,tsx}"],
    css: true,
    coverage: {
      provider: "v8",
      // exclude: ["src/**/*.ts", "src/**/*.js"],
      include: ["src/**/*.{ts,tsx}"],
      reportOnFailure: true,
    },
  },
});
