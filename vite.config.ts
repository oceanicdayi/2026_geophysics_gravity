import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repository = "2026_geophysics_gravity";

export default defineConfig(({ command }) => ({
  root: "web",
  base: command === "build" ? `/${repository}/` : "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: { host: true, port: 5173 },
}));