import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repository = "2026_geophysics_gravity";

export default defineConfig(({ command }) => ({
  base: command === "build" ? `/${repository}/` : "/",
  plugins: [react()],
  server: { host: true, port: 5173 },
}));
