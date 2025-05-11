// frontend/src/pages/HomePage.tsx
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page fade-in">
      <header className="hero py-12 text-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Welcome to Go Auth Website
        </h1>
        <p className="text-lg mb-6 text-foreground">
          A secure authentication system built with React, TypeScript, and Cloudflare Workers
        </p>
        <div className="cta-buttons flex justify-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="py-2 px-4 rounded-xs bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-3 focus:ring-primary-dark"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="py-2 px-4 rounded-xs bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-3 focus:ring-primary-dark"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="py-2 px-4 rounded-xs bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      <section className="features py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="feature-card p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs text-center">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Secure Authentication</h3>
          <p className="text-foreground">Built with industry-standard security practices</p>
        </div>
        <div className="feature-card p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs text-center">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Fast Performance</h3>
          <p className="text-foreground">Powered by Cloudflare's global network</p>
        </div>
        <div className="feature-card p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs text-center">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Modern Stack</h3>
          <p className="text-foreground">React, TypeScript, and Vite for optimal DX</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;