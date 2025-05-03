import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="error-boundary">
      <h1 className="error-boundary__title">404 - Page Not Found</h1>
      <p className="error-boundary__message">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="error-boundary__action">
        Go to Homepage
      </Link>
    </div>
  );
}