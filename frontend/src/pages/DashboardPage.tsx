// frontend/src/pages/DashboardPage.tsx
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { AuthService } from '@/api/authService';
import { ApiResponse, User } from '@/@types/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response: ApiResponse<User> = await AuthService.getProfile();
        if (response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        const error = err as ApiResponse;
        setError(error.error || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="dashboard-page max-w-6xl mx-auto py-12 px-4 fade-in">
      <header className="dashboard-header flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome to your Dashboard</h1>
        <button
          onClick={logout}
          className="py-2 px-4 rounded-xs bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-3 focus:ring-primary-dark"
        >
          Logout
        </button>
      </header>

      {error && <div className="error-message text-error mb-6">{error}</div>}

      <div className="profile-section mb-8 p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Profile</h2>
        <div className="profile-details space-y-2 text-foreground">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Account Created:</strong>{' '}
            {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      <div className="dashboard-content grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dashboard-card p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Recent Activity</h3>
          <p className="text-foreground">Your recent login was successful!</p>
        </div>
        <div className="dashboard-card p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Account Settings</h3>
          <p className="text-foreground">Update your profile information</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;