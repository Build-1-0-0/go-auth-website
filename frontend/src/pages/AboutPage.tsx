// frontend/src/pages/AboutPage.tsx
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page max-w-6xl mx-auto py-12 px-4 fade-in">
      <header className="about-header mb-8">
        <h1 className="text-3xl font-bold text-foreground">About Us</h1>
      </header>
      <section className="about-content p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Mission</h2>
        <p className="text-foreground mb-4">
          Go Auth Website is dedicated to providing secure and user-friendly authentication solutions.
          Built with modern technologies like React, TypeScript, and Cloudflare Workers, we aim to
          deliver a seamless experience for users and developers alike.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Technology</h2>
        <ul className="list-disc pl-5 space-y-2 text-foreground">
          <li>Frontend: React 19, TypeScript, Tailwind CSS v4</li>
          <li>Backend: Hono, Cloudflare Workers, D1, KV</li>
          <li>Deployment: Cloudflare Pages and Workers</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
