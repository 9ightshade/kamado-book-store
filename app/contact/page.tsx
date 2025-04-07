"use client";
import Head from "next/head";
// import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" }); // Reset form

    router.push("/")
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Head>
        <title>Contact Us | Kamado Book Store Collections</title>
        <meta
          name="description"
          content="Contact Kamado Book Store Collections for inquiries or support"
        />
      </Head>
      <main className="py-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have questions or need assistance? Reach out to us!
        </p>

        <section className="mb-12">
          {submitted ? (
            <div className="text-center text-green-600 bg-green-100 p-4 rounded-lg mb-6">
              Thank you for your message! We’ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          )}
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Other Ways to Reach Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Email:{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline">
              support@kamadobookstore.com
            </a>
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            Phone: (555) 123-4567
          </p>
          <p className="text-gray-700 leading-relaxed">
            Address: 123 Reading Lane, Booktown, CA 90210
          </p>
        </section>
      </main>
    </div>
  );
}
