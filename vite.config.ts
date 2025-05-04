// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // Root contains index.html
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // For Sentry
  },
  resolve: {
    alias: {
      // Use relative alias to avoid absolute path issues
      '@': resolve(__dirname, 'src'), // Maps @ to frontend/src
    },
  },
  server: {
    proxy: {
      '/auth': {
        target: 'https://go-auth-website.africancontent807.workers.dev', // Fix URL
        changeOrigin: true,
      },
      '/protected': {
        target: 'https://go-auth-website.africancontent807.workers.dev',
        changeOrigin: true,
      },
    },
  },
});