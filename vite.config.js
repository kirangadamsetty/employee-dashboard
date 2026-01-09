

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Opens on localhost:3000 like you are used to
    open: true  // Automatically opens browser
  }
})