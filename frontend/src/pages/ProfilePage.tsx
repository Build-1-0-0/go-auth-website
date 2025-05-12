// frontend/src/pages/ProfilePage.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/api/authService';
import { ApiResponse, User } from '@/@types/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ProfilePage: React.FC = () => {
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
        } else {
          setError('Failed to load profile');
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
    <div className="profile-page max-w-6xl mx-auto py-12 px-4 fade-in">
      <header className="profile-header flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
        <button
          onClick={logout}
          className="py-2 px-4 rounded-xs bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-3 focus:ring-primary-dark"
        >
          Logout
        </button>
      </header>

      {error && <div className="error-message text-error mb-6">{error}</div>}

      <div className="profile-details p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Profile Information</h2>
        <div className="space-y-2 text-foreground">
          <p>
            <strong>Email:</strong> {user?.email || 'N/A'}
          </p>
          {profile?.username && (
            <p>
              <strong>Username:</strong> {profile.username}
            </p>
          )}
          <p>
            <strong>Account Created:</strong>{' '}
            {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;