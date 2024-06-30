import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import vitePluginEnvCompatible from 'vite-plugin-env-compatible'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginEnvCompatible({
      prefix: 'VITE_',
    }),
  ],
  base: '/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target:
          process.env.VITE_PROXY_BASE_URL + ':' + process.env.VITE_PROXY_PORT,
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
})
