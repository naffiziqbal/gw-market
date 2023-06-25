import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Other build options...
    rollupOptions: {
      // Add this line to include the .env files
      inlineDynamicImports: true,
    },
  }
})
