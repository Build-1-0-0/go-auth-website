// src/pages/HomePage.tsx
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <header className="hero">
        <h1>Welcome to Go Auth Website</h1>
        <p>A secure authentication system built with React, TypeScript, and Cloudflare Workers</p>
        
        <div className="cta-buttons">
          {user ? (
            <Link to="/dashboard" className="button primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="button primary">
                Login
              </Link>
              <Link to="/register" className="button secondary">
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Secure Authentication</h3>
          <p>Built with industry-standard security practices</p>
        </div>
        <div className="feature-card">
          <h3>Fast Performance</h3>
          <p>Powered by Cloudflare's global network</p>
        </div>
        <div className="feature-card">
          <h3>Modern Stack</h3>
          <p>React, TypeScript, and Vite for optimal DX</p>
        </div>
      </section>
    </div>
  );
};
