// frontend/src/components/layout/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NotificationBanner from '@/components/ui/NotificationBanner';

export default function Layout() {
  const location = useLocation();
  console.log('Current path:', location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <NotificationBanner />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}