import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // ← добавляем алиас
    }
  }
});
