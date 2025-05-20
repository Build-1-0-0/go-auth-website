import { Helmet, HelmetProvider } from '@dr.pogodin/react-helmet';
import { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Layout from '@/components/layout/Layout';
import ProfilePage from '@/pages/ProfilePage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

const HomePage = lazy(() => import('@/pages/HomePage'));

export default function App() {
  return (
{/* at the very top of your JSX tree */}
<div
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'yellow',
    padding: '4px',
    zIndex: 9999,
  }}
>
  🚀 React Loaded
</div>
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner fullPage />}>
              <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>MyApp</title>
                <meta name="description" content="Welcome to MyApp, your authentication platform." />
                <script nonce={window.__CSP_NONCE__ || ''} />
              </Helmet>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}