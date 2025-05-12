// frontend/src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-foreground py-3 mt-6">
      <div className="container mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} GoAuthWebsite. All rights reserved.</p>
        <p className="mt-1">
          <Link
            to="/privacy-policy"
            className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link
            to="/terms-of-service"
            className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
}