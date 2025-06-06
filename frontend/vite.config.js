import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',                  // Listen on all interfaces (required by Render)
    port: Number(process.env.PORT) || 5173,  // Use Render's PORT env var or fallback
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
