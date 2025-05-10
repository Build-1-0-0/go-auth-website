// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting';

export default defineConfig({
  root: '.',
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'your-sentry-org',
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
    postcss: {
      plugins: [postcssNesting(), tailwindcss(), autoprefixer()],
    },
  },
});
