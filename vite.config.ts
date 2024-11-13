import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
import path from 'path'
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  server: {
    https: {
      key: './server.key',
      cert: './server.crt',
    },
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_BASE_URL,
        secure: false,
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
