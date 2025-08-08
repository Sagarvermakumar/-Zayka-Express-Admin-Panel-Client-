import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000, // Change this to your desired port
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
    
   
  }
})
