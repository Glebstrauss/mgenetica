import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.VITE_APP_BASE || '/mgenetica/',
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          appwrite: ['appwrite']
        }
      }
    }
  }
})
