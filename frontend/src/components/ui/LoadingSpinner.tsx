// src/components/ui/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  fullPage?: boolean;
  className?: string;
}

export default function LoadingSpinner({ fullPage, className }: LoadingSpinnerProps) {
  return (
    <div className={`${fullPage ? 'flex items-center justify-center min-h-screen' : ''}`}>
      <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary ${className}`}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
