// frontend/src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Unauthorized from '@/components/errors/Unauthorized';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner fullPage />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (requiredRole && user.role !== requiredRole) return <Unauthorized />;

  return <>{children}</>;
}
