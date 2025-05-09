import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Updated PostCSS plugin imports
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import postcssNesting from 'postcss-nesting'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssNesting,
        tailwindcss,
        autoprefixer,
      ],
    },
  },
})
