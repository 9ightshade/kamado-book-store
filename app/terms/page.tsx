import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Head>
        <title>Terms and Conditions | Kamado Book Store Collections</title>
        <meta
          name="description"
          content="Terms and Conditions for Kamado Book Store Collections"
        />
      </Head>
      <main className="py-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Terms and Conditions
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Last Updated: April 07, 2025
        </p>

        <section className="mb-8">
          <p className="text-gray-400 leading-relaxed">
            Welcome to Kamado Book Store Collections. By accessing or using our
            website, you agree to be bound by these Terms and Conditions. If you
            do not agree with these Terms, please do not use our Site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            1. Use of the Site
          </h2>
          <ul className="list-disc pl-6 text-gray-400 leading-relaxed">
            <li>
              <strong>Eligibility</strong>: You must be at least 18 years old to
              use this Site.
            </li>
            <li>
              <strong>License</strong>: We grant you a limited, non-exclusive
              license to use the Site for personal, non-commercial purposes.
            </li>
            <li>
              <strong>Prohibited Conduct</strong>: You agree not to use the Site
              for illegal purposes, attempt unauthorized access, or reproduce
              content without permission.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            2. Products and Services
          </h2>
          <ul className="list-disc pl-6 text-gray-400 leading-relaxed">
            <li>
              <strong>Book Collections</strong>: We offer physical and digital
              books for purchase or subscription.
            </li>
            <li>
              <strong>Availability</strong>: Products are subject to
              availability and may be discontinued at any time.
            </li>
            <li>
              <strong>Pricing</strong>: Prices are in USD and subject to change.
              We are not liable for pricing errors.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            3. Orders and Payments
          </h2>
          <ul className="list-disc pl-6 text-gray-400 leading-relaxed">
            <li>
              <strong>Order Acceptance</strong>: We reserve the right to accept
              or reject any order.
            </li>
            <li>
              <strong>Payment</strong>: You must provide accurate payment
              information via our accepted methods.
            </li>
            <li>
              <strong>Refunds</strong>: Physical books are refundable within 14
              days if unused; digital products are non-refundable unless
              specified.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            4. Intellectual Property
          </h2>
          <p className="text-gray-400 leading-relaxed">
            All content on the Site is owned by Kamado Book Store Collections or
            its licensors and is protected by copyright laws. You may not
            reproduce or distribute it without permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            5. User Accounts
          </h2>
          <ul className="list-disc pl-6 text-gray-400 leading-relaxed">
            <li>
              <strong>Registration</strong>: Accounts may be required for some
              features. You are responsible for your account security.
            </li>
            <li>
              <strong>Termination</strong>: We may suspend or terminate accounts
              for suspected misuse.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We are not liable for indirect damages from Site use. Our liability
            is limited to the amount paid for Products.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            7. Governing Law
          </h2>
          <p className="text-gray-400 leading-relaxed">
            These Terms are governed by the laws of California, USA.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            8. Changes to These Terms
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We may update these Terms, with changes posted here. Continued use
            after updates means you accept them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            9. Contact Us
          </h2>
          <p className="text-gray-400 leading-relaxed">
            For questions, contact us at:
            <br />
            Email:{" "}
            <a href="#" className="text-blue-400 hover:underline">
              support@kamadobookstore.com
            </a>
            <br />
            Address: 123 Reading Lane, Booktown, CA 90210
          </p>
        </section>
      </main>
    </div>
  );
}
