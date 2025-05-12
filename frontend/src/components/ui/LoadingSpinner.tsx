// frontend/src/components/ui/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  fullPage?: boolean;
  className?: string;
}

export default function LoadingSpinner({ fullPage, className }: LoadingSpinnerProps) {
  return (
    <div
      className={`${fullPage ? 'flex items-center justify-center min-h-screen bg-background' : ''} fade-in`}
      aria-live="polite"
    >
      <div
        className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary ${className}`}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}