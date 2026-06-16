import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.VITE_APP_BASE || '/mgenetica/',
  build: {
    target: 'es2018',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/appwrite/')) {
            return 'appwrite'
          }

          return undefined
        }
      }
    }
  }
})
