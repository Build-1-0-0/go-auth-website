// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';

// Performance monitoring
const initPerformanceMonitoring = () => {
  if (import.meta.env.PROD) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};

// Error tracking (Sentry example)
const initErrorTracking = async () => {
  if (import.meta.env.PROD) {
    const Sentry = await import('@sentry/react');
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [new Sentry.BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }
};

// Theme initialization
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.classList.add(savedTheme);
};

async function bootstrapApplication() {
  // 1. Initialize theme
  initTheme();

  // 2. Initialize monitoring
  if (import.meta.env.PROD) {
    await initErrorTracking();
    initPerformanceMonitoring();
  }

  // 3. Load critical app data if needed
  // await loadEssentialData();
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
