import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createTailwindMerge, extendTailwindMerge } from 'tailwind-merge'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),createTailwindMerge,extendTailwindMerge],
})
