import { type Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './frontend/src/**/*.{js,ts,jsx,tsx}',
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
  safelist: [
    'p-8',
    'px-6',
    'py-3',
    'text-error',
    'bg-primary',
    'bg-primary-dark',
    'text-white',
    'bg-gray-50',
    'text-gray-500',
    'bg-white',
    'rounded',
    'rounded-lg',
    'transition-colors',
    'text-3xl',
    'text-lg',
    'text-sm',
    'font-bold',
    'mb-4',
    'mb-6',
    'mb-8',
    'max-w-2xl',
    'w-full',
    'overflow-auto',
    'min-h-screen',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
  ],
  plugins: [],
};

export default config;
