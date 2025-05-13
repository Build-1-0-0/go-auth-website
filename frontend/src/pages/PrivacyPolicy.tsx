// frontend/src/pages/PrivacyPolicy.tsx
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-page max-w-6xl mx-auto py-12 px-4 fade-in">
      <header className="privacy-policy-header mb-8">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
      </header>
      <section className="privacy-policy-content p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Commitment to Privacy</h2>
        <p className="text-foreground mb-4">
          At Go Auth Website, we value your privacy and are committed to protecting your personal
          information. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-foreground">Information We Collect</h3>
        <ul className="list-disc pl-5 space-y-2 text-foreground mb-4">
          <li>Email address provided during registration</li>
          <li>Usage data collected via Cloudflare Insights for performance monitoring</li>
          <li>Error reports sent to Sentry for debugging purposes</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 text-foreground">How We Use Your Information</h3>
        <p className="text-foreground mb-4">
          Your information is used to:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-foreground mb-4">
          <li>Provide and improve our authentication services</li>
          <li>Monitor and analyze usage patterns to enhance user experience</li>
          <li>Diagnose and fix technical issues</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 text-foreground">Contact Us</h3>
        <p className="text-foreground">
          For questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:support@go-auth-website.com" className="text-primary hover:underline">
            support@go-auth-website.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;