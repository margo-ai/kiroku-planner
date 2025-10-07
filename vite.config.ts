import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tsConfigPaths(),
    svgr({ svgrOptions: { exportType: "default" }, include: "**/*.svg" })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  css: {
    modules: {
      scopeBehaviour: "local",
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    }
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames({ names }) {
          const fileName = names && names[0];
          if (fileName?.endsWith(".css")) {
            return "css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        }
      }
    }
  }
});
