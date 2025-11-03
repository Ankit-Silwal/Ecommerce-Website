import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target:'https://just-for-backend-copied.onrender.com/'
      },
      '/images':{
        target:'https://just-for-backend-copied.onrender.com/'
      }
    }
  }
})
