/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './frontend/src/**/*.{js,ts,jsx,tsx}', // Ensure this path correctly captures all files using Tailwind classes
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: 'hsl(221, 83%, 53%)', // #2563eb
        'primary-dark': 'hsl(221, 75%, 40%)', // #1d4ed8
        error: 'hsl(0, 84%, 60%)', // #dc2626
        'error-light': 'hsl(0, 87%, 94%)', // #fee2e2
      },
    },
  },
  plugins: [], // This is fine if you don't have custom plugins
};
