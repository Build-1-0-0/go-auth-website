// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import NotificationBanner from '../ui/NotificationBanner';

export default function Layout() {
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
