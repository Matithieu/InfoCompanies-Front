import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig } from 'vite'
import vitePluginEnvCompatible from 'vite-plugin-env-compatible'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ui',
  server: {
    host: 'localhost',
    https: {
      key: '../config/certs/server.key',
      cert: '../config/certs/server.crt',
    },
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:443',
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    vitePluginEnvCompatible({
      prefix: 'VITE_',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env': process.env,
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
})
