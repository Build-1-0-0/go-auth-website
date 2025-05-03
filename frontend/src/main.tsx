// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const initErrorTracking = async () => {
  if (import.meta.env.PROD) {
    const Sentry = await import('@sentry/react');
    const { BrowserTracing } = await import('@sentry/tracing');

    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }
};

const initTheme = () => {
  const savedTheme =
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');
  document.documentElement.classList.add(savedTheme);
};

async function bootstrapApplication() {
  // Initialize theme
  initTheme();

  // Initialize monitoring and error tracking
  if (import.meta.env.PROD) {
    await initErrorTracking();
    reportWebVitals();
  }
}

bootstrapApplication()
  .then(() => {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );

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