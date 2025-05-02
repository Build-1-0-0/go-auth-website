// src/components/errors/NotFound.tsx
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

// src/components/errors/Unauthorized.tsx
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="error-boundary">
      <h1 className="error-boundary__title">401 - Unauthorized</h1>
      <p className="error-boundary__message">
        You don't have permission to access this page.
      </p>
      <div className="flex gap-4">
        <Link to="/" className="error-boundary__action">
          Go to Homepage
        </Link>
        <Link to="/login" className="error-boundary__action bg-gray-600 hover:bg-gray-700">
          Login
        </Link>
      </div>
    </div>
  );
      }
