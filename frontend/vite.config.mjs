import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.VITE_APP_BASE || '/mgenetica/',
  build: {
    target: 'es2018',
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
