// pages/about.tsx
import React from "react";
import Head from "next/head";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
}

interface Location {
  name: string;
  address: string;
}

const teamMembers: TeamMember[] = [
  { name: "Tanjiro Kamado", role: "CEO & Founder" },
  { name: "Nezuko Kamado", role: "Creative Director" },
  { name: "Zenitsu Agatsuma", role: "Marketing Manager" },
  { name: "Inosuke Hashibira", role: "Operations Director" },
];

const locations: Location[] = [
  { name: "Downtown Flagship", address: "123 Book Avenue, Literary District" },
  { name: "Westside Branch", address: "456 Novel Boulevard, Westside" },
  { name: "Northend Corner", address: "789 Story Street, Northend" },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>About Us | Kamado Book Stores Collection</title>
        <meta
          name="description"
          content="Learn about the history, mission, and values of Kamado Book Stores Collection"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Kamado Book Stores Collection
          </h1>
          <p className="text-xl max-w-2xl">
            A legacy of literary passion spanning generations.
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 1985 by the Kamado family, our bookstore collection
                began as a single cozy shop in downtown. What started as a
                passion project quickly blossomed into a beloved community
                fixture.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Over the decades, we&apos;ve grown to multiple locations across
                the region, but our core mission remains unchanged: to ignite
                the flame of curiosity and foster a love for reading in every
                person who walks through our doors.
              </p>
              <p className="text-lg text-gray-600">
                Today, the second generation of the Kamado family continues to
                build upon this legacy, blending traditional bookselling wisdom
                with innovative approaches to literature and community
                engagement.
              </p>
            </div>
            <div className="md:w-1/2 relative h-80 md:h-96">
              <div className="bg-gray-200 w-full h-full rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Knowledge for All",
                description:
                  "We believe that books and knowledge should be accessible to everyone. We strive to create welcoming spaces where people from all walks of life can discover their next favorite read.",
              },
              {
                title: "Community Connection",
                description:
                  "Our stores are more than retail spaces—they're community hubs where ideas are exchanged, relationships are formed, and cultural conversations happen every day.",
              },
              {
                title: "Literary Passion",
                description:
                  "Every Kamado team member shares a deep love for books. Our staff's expertise and enthusiasm help create the unique experience that sets our stores apart.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 w-48 h-48 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Our Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {location.name}
                </h3>
                <p className="text-gray-600 mb-4">{location.address}</p>
                <p className="text-gray-600">
                  Mon-Sat: 9AM-9PM
                  <br />
                  Sunday: 10AM-7PM
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have questions or want to learn more about Kamado Book Stores
            Collection? We&apos;d love to hear from you.
          </p>
          <Link href={"/contact"}>
            <button className="bg-white text-gray-900 px-8 py-3 cursor-pointer rounded-lg font-bold hover:bg-gray-100 transition">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
