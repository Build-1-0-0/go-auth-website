// src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        <p className="text-sm">
          <a href="/privacy-policy" className="hover:text-gray-300">
            Privacy Policy
          </a> | 
          <a href="/terms-of-service" className="hover:text-gray-300">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}