// frontend/src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} GoAuthWebsite. All rights reserved.</p>
        <p className="text-sm">
          <Link to="/privacy-policy" className="hover:text-gray-300">
            Privacy Policy
          </Link> |{' '}
          <Link to="/terms-of-service" className="hover:text-gray-300">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
}