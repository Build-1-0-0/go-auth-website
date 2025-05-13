// frontend/src/pages/ContactPage.tsx
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page max-w-6xl mx-auto py-12 px-4 fade-in">
      <header className="contact-header mb-8">
        <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
      </header>
      <section className="contact-content p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Get in Touch</h2>
        <p className="text-foreground mb-4">
          Have questions or need support? Reach out to our team, and we’ll get back to you as soon as
          possible.
        </p>
        <div className="space-y-4 text-foreground">
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:support@go-auth-website.com" className="text-primary hover:underline">
              support@go-auth-website.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p>
            <strong>Address:</strong> 123 Auth Lane, Cloud City, CF 94105
          </p>
        </div>
        <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">Support Hours</h2>
        <p className="text-foreground">
          Monday - Friday: 9:00 AM - 5:00 PM (UTC)<br />
          Closed on weekends and major holidays.
        </p>
      </section>
    </div>
  );
};

export default ContactPage;