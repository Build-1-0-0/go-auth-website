// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/browser';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const initErrorTracking = () => {
  if (import.meta.env.PROD && typeof window !== 'undefined') {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (!dsn) {
      console.warn('VITE_SENTRY_DSN is not set. Skipping Sentry initialization.');
      return;
    }
    Sentry.init({
      dsn: 'https://b6bb9839b9972fcb7cdf7770bd8ba4a4@o4509252418076672.ingest.de.sentry.io/4509252475027536',
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      tracePropagationTargets: ['localhost', 'https://go-auth-website.africancontent807.workers.dev'],
    });
    console.log('Sentry initialized successfully');
  }
};

const initTheme = () => {
  const savedTheme =
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.add(savedTheme);
};

async function bootstrapApplication() {
  try {
    initTheme();
    if (import.meta.env.PROD) {
      initErrorTracking();
      reportWebVitals();
    }
  } catch (error) {
    console.error('Bootstrap initialization failed:', error);
    throw error;
  }
}

bootstrapApplication()
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <ErrorBoundary>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error('Application bootstrap failed:', error);
    document.getElementById('root')!.innerHTML = `
      <div class="error-boundary">
        <h1>Application Error</h1>
        <p>Failed to initialize the application.</p>
        <button onclick="window.location.reload()">Try Again</button>
      </div>
    `;
  });