// frontend/src/components/ui/NotificationBanner.tsx
import { useState } from 'react';

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-white py-2 px-4 text-center text-sm fade-in">
      <p>
        Welcome to GoAuthWebsite! Check out our <a href="/services" className="underline hover:text-gray-200">services</a>.
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-2 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}