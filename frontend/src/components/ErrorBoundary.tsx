// src/components/ErrorBoundary.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    // Log to error monitoring service
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <DefaultErrorFallback 
          error={this.state.error} 
          errorInfo={this.state.errorInfo} 
        />
      );
    }

    return this.props.children;
  }
}

// Default Error Fallback Component
interface DefaultErrorFallbackProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({ error, errorInfo }) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="error-boundary fade-in">
      <h1 className="error-boundary__title">Something went wrong</h1>
      
      {error && (
        <>
          <p className="error-boundary__message">
            {error.message || 'An unexpected error occurred'}
          </p>
          
          {import.meta.env.DEV && errorInfo && (
            <details className="error-boundary__stack">
              <summary>Error details</summary>
              <pre>{error.stack}</pre>
              <pre>{errorInfo.componentStack}</pre>
            </details>
          )}
        </>
      )}

      <div className="flex gap-4 mt-6">
        <button 
          onClick={handleRefresh}
          className="error-boundary__action"
        >
          Refresh Page
        </button>
        <button 
          onClick={handleGoHome}
          className="error-boundary__action bg-gray-600 hover:bg-gray-700"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
