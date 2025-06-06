import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
    allowedHosts: ['reminder-2-2ktk.onrender.com'],  // Add your Render domain here
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
