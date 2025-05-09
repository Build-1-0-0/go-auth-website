// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "./frontend/src/index.css" // Explicitly include CSS file
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        error: 'var(--color-error)',
        'error-light': 'var(--color-error-light)',
      },
    },
  },
  corePlugins: {
    preflight: true, // Ensure base styles are loaded
  },
  plugins: [],
}
