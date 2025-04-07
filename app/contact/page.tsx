"use client";

import React from 'react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Contact () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' }); // Reset form

    // Redirect to home after a short delay to show success message
    setTimeout(() => router.push('/'), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen ">
    
      <main className="py-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4 transition-transform duration-300 hover:scale-105">
          Contact Us
        </h1>
        <p className="text-center text-gray-50 mb-8 transition-opacity duration-300 hover:opacity-80">
          Have questions or need assistance? Reach out to us!
        </p>

        <section className="mb-12">
          {submitted ? (
            <div className="text-center text-blue-600 bg-blue-100 p-6 rounded-lg mb-6 transform transition-all duration-500 ease-in-out hover:shadow-lg hover:-translate-y-1">
              Thank you for your message! We’ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2 transition-colors duration-300 hover:text-blue-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                  placeholder="Your Name"
                />
              </div>
              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2 transition-colors duration-300 hover:text-blue-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                  placeholder="Your Email"
                />
              </div>
              <div className="transform transition-all duration-300 hover:-translate-y-1">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2 transition-colors duration-300 hover:text-blue-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 text-white p-3 rounded-lg font-bold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95"
              >
                Send Message
              </button>
            </form>
          )}
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 transition-transform duration-300 hover:scale-105">
            Other Ways to Reach Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2 transition-all duration-300 hover:text-blue-600 hover:pl-2">
            Email:{' '}
            <a
              href="mailto:support@kamadobookstore.com"
              className="text-blue-600 transition-all duration-300 hover:underline hover:text-blue-800"
            >
              support@kamadobookstore.com
            </a>
          </p>
          <p className="text-gray-700 leading-relaxed mb-2 transition-all duration-300 hover:text-blue-600 hover:pl-2">
            Phone: (555) 123-4567
          </p>
          <p className="text-gray-700 leading-relaxed transition-all duration-300 hover:text-blue-600 hover:pl-2">
            Address: 123 Reading Lane, Booktown, CA 90210
          </p>
        </section>
      </main>
    </div>
  );
};
