// frontend/src/pages/ServicesPage.tsx
import React from 'react';

const ServicesPage: React.FC = () => {
  return (
    <div className="services-page max-w-6xl mx-auto py-12 px-4 fade-in">
      <header className="services-header mb-8">
        <h1 className="text-3xl font-bold text-foreground">Our Services</h1>
      </header>
      <section className="services-content p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Authentication Solutions</h2>
        <p className="text-foreground mb-4">
          We provide secure and scalable authentication services powered by Cloudflare Workers and
          modern web technologies. Our services include:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-foreground">
          <li>User registration and login with email and password</li>
          <li>Secure session management with Cloudflare KV</li>
          <li>Protected routes for authenticated users</li>
          <li>Real-time performance monitoring with Sentry</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">Why Choose Us?</h2>
        <p className="text-foreground">
          Our platform is built with security, performance, and user experience in mind, leveraging
          React 19, TypeScript, and Tailwind CSS v4 for a modern and responsive interface.
        </p>
      </section>
    </div>
  );
};

export default ServicesPage;