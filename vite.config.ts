import react from "@vitejs/plugin-react-swc"
import dotenv from "dotenv"
import { defineConfig } from "vite"
import vitePluginEnvCompatible from "vite-plugin-env-compatible"

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginEnvCompatible({
      prefix: "VITE_",
    }),
  ],
  define: {
    "process.env": process.env,
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
})
