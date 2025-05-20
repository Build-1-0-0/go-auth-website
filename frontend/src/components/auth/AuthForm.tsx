// frontend/src/components/ErrorBoundary.tsx import React from 'react'; import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps { children: React.ReactNode; fallback?: React.ReactNode; }

interface ErrorBoundaryState { hasError: boolean; error: Error | null; errorInfo: React.ErrorInfo | null; }

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> { constructor(props: ErrorBoundaryProps) { super(props); this.state = { hasError: false, error: null, errorInfo: null, }; }

static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> { return { hasError: true, error }; }

componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { this.setState({ errorInfo }); console.error('Error Boundary caught:', error, errorInfo); // Optionally report to Sentry here }

render() { const { hasError, error, errorInfo } = this.state; if (hasError) { return this.props.fallback || ( <DefaultErrorFallback error={error} errorInfo={errorInfo} /> ); } return this.props.children; } }

interface DefaultErrorFallbackProps { error: Error | null; errorInfo: React.ErrorInfo | null; }

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({ error, errorInfo }) => { const navigate = useNavigate(); const handleRefresh = () => window.location.reload(); const handleGoHome = () => navigate('/');

return ( <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 text-center fade-in"> <h1 className="text-3xl font-bold mb-4 text-error">Something went wrong</h1> {error && ( <> <p className="text-lg mb-4 max-w-2xl">{error.message}</p> {errorInfo && ( <details className="text-sm text-gray-500 mb-8 p-4 bg-white rounded max-w-2xl w-full overflow-auto"> <summary>Error details (click to expand)</summary> <pre>{error.stack}</pre> <pre>{errorInfo.componentStack}</pre> </details> )} </> )} <div className="flex gap-4 mt-6"> <button onClick={handleRefresh} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"> Refresh Page </button> <button onClick={handleGoHome} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"> Go to Homepage </button> </div> </div> ); };

export default ErrorBoundary;

