// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig({
  root: '.',
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'https://b6bb9839b9972fcb7cdf7770bd8ba4a4@o4509252418076672.ingest.de.sentry.io/4509252475027536', // Replace with your actual Sentry org slug
      project: 'go-auth-website',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'frontend/src'),
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
  css: {
    postcss: './postcss.config.cjs',
  },
});
