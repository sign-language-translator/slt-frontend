import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@assets": "/src/assets",
      "@": "/src",
    },
  },
  server: {
    port: 3000,
  },
});
