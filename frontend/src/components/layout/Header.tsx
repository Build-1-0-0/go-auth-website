// frontend/src/components/layout/Header.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-gray-950 text-foreground py-3 shadow-xs">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:text-primary">
            GoAuthWebsite
          </Link>
        </h1>
        <nav role="navigation" aria-label="Main navigation">
          <ul className="flex space-x-4 text-sm">
            <li>
              <Link to="/" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                Contact
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}