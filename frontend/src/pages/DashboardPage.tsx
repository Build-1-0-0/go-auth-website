// src/pages/DashboardPage.tsx
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { AuthService } from '../api/authService';
import { ApiResponse, User } from '../@types/auth';

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
    return <div className="dashboard-loading">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Welcome to your Dashboard</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="profile-section">
        <h2>Your Profile</h2>
        <div className="profile-details">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Account Created:</strong> {profile?.createdAt 
              ? new Date(profile.createdAt).toLocaleDateString() 
              : 'N/A'}
          </p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Recent Activity</h3>
          <p>Your recent login was successful!</p>
        </div>
        <div className="dashboard-card">
          <h3>Account Settings</h3>
          <p>Update your profile information</p>
        </div>
      </div>
    </div>
  );
};
