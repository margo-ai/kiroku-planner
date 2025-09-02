import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    svgr({ svgrOptions: { exportType: "default" }, include: "**/*.svg" })
  ]
});
