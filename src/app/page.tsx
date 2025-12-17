import Image from "next/image";
import { ReactNode } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaCloud,
  FaGem,
  FaWhatsapp,
} from "react-icons/fa";

export const metadata = {
  title: "GirviPro – Jewellery Girvi Management Software",
  description:
    "GirviPro helps jewellery shops manage loans, inventory, and customer girvi records easily. Trusted by jewellery shops across India.",
};

// =================== Types ===================
type FeatureProps = {
  icon: ReactNode;
  title: string;
  desc: string;
};

type PriceCardProps = {
  title: string;
  price: string;
  note: string;
  popular?: boolean;
  contact?: boolean;
};

type FAQProps = {
  q: string;
  a: string;
};

// =================== Landing Page ===================
export default function LandingPage() {
  return (
    <main className="font-sans text-gray-900 bg-gradient-to-b from-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-r from-yellow-100 to-white">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900">
              GirviPro – Jewellery Girvi Management Software
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Manage loans, inventory, and customer girvi records effortlessly.
              Built specially for Indian jewellery shops.
            </p>

            <div className="flex justify-center lg:justify-start flex-col sm:flex-row gap-4">
              <a
                href="/auth/login"
                className="px-8 py-3 bg-yellow-500 text-white rounded-full font-semibold shadow-lg hover:bg-yellow-600 transform hover:-translate-y-1 transition"
              >
                Get Started
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border border-yellow-500 text-yellow-600 rounded-full font-semibold hover:bg-yellow-50 shadow-sm hover:shadow-lg transition"
              >
                Book a Demo
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              Used by jewellery shops across India • Secure Firebase Cloud • No credit card required
            </p>
          </div>

          <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
            <Image
              src="/girvipro.jpg"
              alt="GirviPro Dashboard"
              width={550}
              height={450}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* How It Works – Stepper */}
      <section className="container mx-auto px-6 py-28">
        <h2 className="text-4xl font-bold text-center mb-6">How GirviPro Works</h2>
        <p className="text-center text-gray-600 mb-20 max-w-2xl mx-auto">
          Simple, fast, and designed for jewellery shop owners. Start managing girvi digitally in minutes.
        </p>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-yellow-200 -z-10" />

          <div className="grid md:grid-cols-3 gap-12">
            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-yellow-500 text-white text-2xl font-bold group-hover:scale-110 transition">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3">Create Your Shop</h3>
              <p className="text-gray-600">
                Register your jewellery shop and set basic details in less than 2 minutes.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-yellow-500 text-white text-2xl font-bold group-hover:scale-110 transition">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3">Add Girvi & Customers</h3>
              <p className="text-gray-600">
                Store jewellery details, loan amount, interest, and customer records securely.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-yellow-500 text-white text-2xl font-bold group-hover:scale-110 transition">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3">Track Payments & Reports</h3>
              <p className="text-gray-600">
                See pending amounts, payment history, and shop performance instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-28">
        <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <Feature icon={<FaUsers />} title="Customer & Girvi Management" desc="Avoid manual registers and mistakes" />
          <Feature icon={<FaBoxOpen />} title="Inventory & Billing" desc="Track stock and generate bills easily" />
          <Feature icon={<FaMoneyCheckAlt />} title="Payments & Receipts" desc="Digital record of every payment" />
          <Feature icon={<FaCloud />} title="Secure Cloud Storage" desc="Your data is safe and backed up" />
          <Feature icon={<FaGem />} title="Multi-Shop Support" desc="Manage multiple shops from one login" />
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 py-28">
        <h2 className="text-4xl font-bold text-center mb-16">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <PriceCard title="Starter" price="₹0" note="Up to 10 customers • Basic reports" />
          <PriceCard title="Professional" price="₹3000 / year" note="Unlimited customers • Billing • Reports • Support" popular />
          <PriceCard title="Enterprise" price="Custom" note="Multi-shop & custom needs" contact />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-yellow-50 py-28">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <FAQ q="Is my data safe?" a="Yes. All data is securely stored on Firebase Cloud with proper access control." />
            <FAQ q="Can I use GirviPro on mobile?" a="Yes. GirviPro works on mobile, tablet, and desktop." />
            <FAQ q="Will you help with setup?" a="Yes. We provide free onboarding and demo support." />
            <FAQ q="Can I upgrade later?" a="Absolutely. You can upgrade anytime without data loss." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">© {new Date().getFullYear()} GirviPro – A Product by Shreyansh Webcraft</p>
        </div>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-xl hover:scale-110 transition"
        >
          <FaWhatsapp className="text-white text-2xl" />
        </a>
      </footer>
    </main>
  );
}

// =================== Components ===================
function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="p-8 border rounded-2xl shadow-lg hover:shadow-2xl transition text-center">
      <div className="text-yellow-500 text-4xl mx-auto mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function PriceCard({ title, price, note, popular = false, contact = false }: PriceCardProps) {
  return (
    <div className={`relative border rounded-2xl p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${popular ? "scale-105 shadow-2xl border-yellow-400" : ""}`}>
      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-sm font-semibold px-5 py-1 rounded-full shadow-lg animate-pulse">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-4">{price}</p>
      <p className="text-gray-600">{note}</p>
      <a
        href={contact ? "/contact" : "/auth/register"}
        className="mt-6 inline-block px-8 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition shadow-lg"
      >
        {contact ? "Contact Us" : "Get Started"}
      </a>
    </div>
  );
}

function FAQ({ q, a }: FAQProps) {
  return (
    <div className="p-6 bg-white border rounded-xl shadow">
      <h4 className="font-semibold mb-2">{q}</h4>
      <p className="text-gray-600">{a}</p>
    </div>
  );
}
