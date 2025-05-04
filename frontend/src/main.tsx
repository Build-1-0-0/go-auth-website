// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const initErrorTracking = async () => {
  if (import.meta.env.PROD && typeof window !== 'undefined') {
    try {
      const Sentry = await import('@sentry/react');
      const { BrowserTracing } = await import('@sentry/browser');
      const dsn = import.meta.env.VITE_SENTRY_DSN;
      if (!dsn) {
        console.warn('VITE_SENTRY_DSN is not set. Skipping Sentry initialization.');
        return;
      }
      Sentry.init({
        dsn,
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
      });
      console.log('Sentry initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Sentry:', error);
    }
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
  try {
    initTheme();
    if (import.meta.env.PROD) {
      await initErrorTracking();
      reportWebVitals();
    }
  } catch (error) {
    console.error('Bootstrap initialization failed:', error);
    throw error;
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