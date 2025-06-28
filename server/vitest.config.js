import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.test.js"], // or adjust to your test file pattern
    coverage: {
      reporter: ["text", "html"],
    },
    setupFiles: [], // Add setup files if needed
    // Uncomment if you use aliases
    // resolve: {
    //   alias: {
    //     '@': '/src',
    //   },
    // },
  },
});
