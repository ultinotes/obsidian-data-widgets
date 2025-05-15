import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enables global test functions like `describe` and `it`
    environment: "node", // Use 'jsdom' if testing browser-specific code
    coverage: {
      reporter: ["text"], // Optional: for coverage reports
    },
  },
});
