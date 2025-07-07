import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          faceapi: ['face-api.js'],
          tensorflow: ['@tensorflow/tfjs', '@tensorflow/tfjs-backend-webgl']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['face-api.js', '@tensorflow/tfjs', '@tensorflow/tfjs-backend-webgl']
  }
})