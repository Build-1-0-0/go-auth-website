// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: '..', // Point to root/ where index.html is
  plugins: [react()],
  build: {
    outDir: 'dist', // Output to root/dist
    emptyOutDir: true,
    sourcemap: true, // For Sentry
  },
  publicDir: 'public', // Point to root/public
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Maps @ to frontend/src
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