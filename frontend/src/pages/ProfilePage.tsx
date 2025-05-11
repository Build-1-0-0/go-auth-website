// frontend/src/pages/ProfilePage.tsx
import { useState } from 'react';

interface ProfileData {
  name: string;
  email: string;
  bio: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Tell us about yourself...',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Profile saved:', profile);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-xs rounded-xs mt-8 fade-in">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Your Profile</h2>

      <div className="flex items-center mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mr-4"
        />
        <button className="text-primary hover:underline">Change Photo</button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-200 dark:border-gray-600 p-2 rounded-xs focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-200 dark:border-gray-600 p-2 rounded-xs focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bio
          </label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-200 dark:border-gray-600 p-2 rounded-xs focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            rows={4}
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-primary text-white px-4 py-2 rounded-xs hover:bg-primary-dark focus:outline-none focus:ring-3 focus:ring-primary-dark"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;