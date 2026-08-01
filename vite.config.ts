import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative assets keep the same build working on the GitHub project URL
  // and on a future custom domain without rebuilding the application shell.
  base: './',
  plugins: [react()],
})
