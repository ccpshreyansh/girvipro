import Image from "next/image";

export const metadata = {
  title: "GirviPro – Jewellery Girvi Management Software",
  description:
    "GirviPro helps jewellery shops manage loans, inventory, and customer girvi records easily. Trusted by jewellery shops across India.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-100 to-white">
        <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              GirviPro – Professional Jewellery Girvi Management Software
            </h1>
            <p className="text-lg mb-8">
              Manage loans, inventory, and customer girvi records easily. Trusted by jewellery shops across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/auth/register"
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
              >
                Get Started
              </a>
              <a
                href="/contact"
                className="px-6 py-3 border border-yellow-500 text-yellow-500 rounded-lg font-semibold hover:bg-yellow-50 transition"
              >
                Book a Demo
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <Image
              src="/hero-jewellery.png" // Add a suitable image in public folder
              alt="GirviPro Jewellery Dashboard"
              width={500}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="p-6 border rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Customer & Girvi Management</h3>
            <p>Track all loans and jewellery details in a simple dashboard.</p>
          </div>
          <div className="p-6 border rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Inventory & Billing</h3>
            <p>Manage stock, generate invoices, and stay organized.</p>
          </div>
          <div className="p-6 border rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Payments & Receipts</h3>
            <p>Keep digital records of payments and receipts securely.</p>
          </div>
          <div className="p-6 border rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Secure Cloud Storage</h3>
            <p>All your data is safely stored on Firebase cloud.</p>
          </div>
          <div className="p-6 border rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Multi-Shop Support</h3>
            <p>Manage multiple shops from a single dashboard.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-yellow-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Managing Your Jewellery Shop Today</h2>
          <p className="mb-8">Sign up for free and streamline your girvi and inventory management.</p>
          <a
            href="/auth/register"
            className="px-8 py-4 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}
