import React from "react";
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
  { name: "Ubuyashiki Mansion", address: "123 Book Avenue, Literary District" },
  { name: "Infinity Castle", address: "456 Novel Boulevard, Westside" },
  { name: "Swordsmith Village", address: "789 Story Street, Northend" },
  // { name: 'Butterfly Mansion', address: '101 Poetry Lane, Eastside' },
  // { name: 'Kagura House', address: '202 Fiction Road, Southside' },
  // { name: 'Demon Slayer HQ', address: '303 Epic Way, Central' },
  // { name: 'Hashira Headquarters', address: '404 Legend Lane, Uptown' },
  { name: "Final Selection Grounds", address: "505 Adventure Ave, Downtown" },
  // { name: 'Mount Natagumo', address: '606 Mystery Mountain, Hilltop' },
  // { name: 'Yoshiwara District', address: '707 Romance Road, Love City' },
  // { name: 'Asakusa', address: '808 Culture Street, Heritage Town' },
  // { name: 'Kibutsuji Mansion', address: '909 Dark Alley, Shadow City' },
  {
    name: "Kanao's Flower Shop",
    address: "111 Blooming Lane, Floral District",
  },
  // { name: "Tengen's Entertainment District", address: '222 Glamour Street, Showbiz City' },
  {
    name: "Shinobu's Butterfly Mansion",
    address: "333 Serenity Lane, Peaceful Valley",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative  text-white text-center py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 transform transition duration-500 hover:scale-105">
            Kamado Book Stores Collection
          </h1>
          <p className="text-xl transition-opacity duration-300 hover:opacity-80">
            A legacy of literary passion spanning generations.
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 hover:opacity-30"></div>
      </div>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 transition-colors duration-300 hover:text-gray-600">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-4 transition-all duration-300 hover:text-gray-300 hover:pl-2">
                Founded in 1985 by the Kamado family, our bookstore collection
                began as a single cozy shop in downtown. What started as a
                passion project quickly blossomed into a beloved community
                fixture.
              </p>
              <p className="text-lg text-gray-600 mb-4 transition-all duration-300 hover:text-gray-300 hover:pl-2">
                Over the decades, we’ve grown to multiple locations across the
                region, but our core mission remains unchanged: to ignite the
                flame of curiosity and foster a love for reading in every person
                who walks through our doors.
              </p>
              <p className="text-lg text-gray-600 transition-all duration-300 hover:text-gray-300 hover:pl-2">
                Today, the second generation of the Kamado family continues to
                build upon this legacy, blending traditional bookselling wisdom
                with innovative approaches to literature and community
                engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 transition-transform duration-300 hover:scale-105">
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
                  "Our stores are more than retail spaces—they’re community hubs where ideas are exchanged, relationships are formed, and cultural conversations happen every day.",
              },
              {
                title: "Literary Passion",
                description:
                  "Every Kamado team member shares a deep love for books. Our staff’s expertise and enthusiasm help create the unique experience that sets our stores apart.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-4 text-gray-800 transition-colors duration-300 hover:text-blue-600">
                  {value.title}
                </h3>
                <p className="text-gray-600 transition-opacity duration-300 hover:opacity-80">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 transition-transform duration-300 hover:scale-105">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="bg-gray-200 w-48 h-48 rounded-full mx-auto mb-4 transition-colors duration-300 hover:bg-blue-200"></div>
                <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 hover:text-blue-600">
                  {member.name}
                </h3>
                <p className="text-gray-600 transition-opacity duration-300 hover:opacity-80">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 transition-transform duration-300 hover:scale-105">
            Our Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-2 text-gray-800 transition-colors duration-300 hover:text-blue-600">
                  {location.name}
                </h3>
                <p className="text-gray-600 mb-4 transition-opacity duration-300 hover:opacity-80">
                  {location.address}
                </p>
                <p className="text-gray-600 transition-opacity duration-300 hover:opacity-80">
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
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 transition-transform duration-300 hover:scale-105">
            Get in Touch
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto transition-opacity duration-300 hover:opacity-80">
            Have questions or want to learn more about Kamado Book Stores
            Collection? We’d love to hear from you.
          </p>
          <Link href="/contact">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg transform hover:-translate-y-1">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
