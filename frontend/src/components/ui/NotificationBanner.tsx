// src/components/ui/NotificationBanner.tsx
import { useState } from 'react';

export default function NotificationBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-yellow-500 text-black px-4 py-2 text-center relative">
      <p>
        This is an important notification! Stay informed.
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-white"
        aria-label="Close Notification"
      >
        &times;
      </button>
    </div>
  );
}