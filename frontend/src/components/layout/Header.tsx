// frontend/src/components/layout/Header.tsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-xs">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-foreground">
          Go Auth
        </Link>
        <button
          className="md:hidden p-2 rounded-xs focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 right-0 bg-white dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent p-4 md:p-0 z-10`}
        >
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block py-2 md:py-0 text-foreground hover:text-primary ${isActive ? 'text-primary font-semibold' : ''}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `block py-2 md:py-0 text-foreground hover:text-primary ${isActive ? 'text-primary font-semibold' : ''}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block py-2 md:py-0 text-foreground hover:text-primary ${isActive ? 'text-primary font-semibold' : ''}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/privacy-policy"
            className={({ isActive }) =>
              `block py-2 md:py-0 text-foreground hover:text-primary ${isActive ? 'text-primary font-semibold' : ''}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Privacy Policy
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block py-2 md:py-0 text-foreground hover:text-primary ${isActive ? 'text-primary font-semibold' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block py-2 md:py-0 text-foreground hover:text-primary ${isActive ? 'text-primary font-semibold' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block py-2 md:py-0 text-foreground hover:text-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block py-2 md:py-0 text-foreground hover:text-primary ${isActive ? 'text-primary font-semibold' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `block py-2 md:py-0 text-foreground hover:text-primary ${isActive ? 'text-primary font-semibold' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;