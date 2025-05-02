// src/components/errors/Unauthorized.tsx
export const Unauthorized = () => (
  <div className="error-boundary">
    <h1 className="error-boundary__title">401 - Unauthorized</h1>
    <p className="error-boundary__message">
      You don't have permission to view this page.
    </p>
  </div>
);
