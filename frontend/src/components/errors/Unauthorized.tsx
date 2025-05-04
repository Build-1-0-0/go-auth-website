// frontend/src/components/errors/Unauthorized.tsx
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="unauthorized">
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
}

export default Unauthorized;