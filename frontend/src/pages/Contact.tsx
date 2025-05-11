// frontend/src/pages/Contact.tsx
export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Contact Us</h1>
      <p className="text-lg mb-6 text-foreground">
        Have questions or need support? Reach out to us!
      </p>
      <form className="max-w-md space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-200 dark:border-gray-600 rounded-xs px-3 py-2 focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-200 dark:border-gray-600 rounded-xs px-3 py-2 focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            placeholder="Your Email"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Message
          </label>
          <textarea
            id="message"
            className="w-full border border-gray-200 dark:border-gray-600 rounded-xs px-3 py-2 focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            rows={4}
            placeholder="Your Message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-xs hover:bg-primary-dark focus:outline-none focus:ring-3 focus:ring-primary-dark"
        >
          Send
        </button>
      </form>
    </div>
  );
}