import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: true,
    // 👇 هنا الحل
    historyApiFallback: true,
  },
  preview: {
    port: 4173,
    open: true,
    historyApiFallback: true,
  },
});