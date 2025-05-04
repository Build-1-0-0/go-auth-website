// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: '..', // Root is project root where index.html lives
  plugins: [react()],
  build: {
    outDir: 'dist', // Build output to root/dist
    emptyOutDir: true,
    sourcemap: true, // Optional: for debugging and Sentry
  },
  publicDir: 'public', // Use root/public for static files like _redirects
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Allows imports like @/components/...
    },
  },
  server: {
    proxy: {
      '/auth': {
        target: 'https://go-auth-website.africancontent807.workers.dev',
        changeOrigin: true,
      },
      '/protected': {
        target: 'https://go-auth-website.africancontent807.workers.dev',
        changeOrigin: true,
      },
    },
  },
});