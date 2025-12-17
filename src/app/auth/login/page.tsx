"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserLock, FaWhatsapp } from "react-icons/fa";
import { useUser } from "@/src/context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser(); // ✅ UI-only usage
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // ❌ Handle inactive plan
      if (res.status === 403) {
        throw new Error("Your plan is inactive. Please contact support.");
      }

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ Set user ONLY for UI (safe fields only)
      setUser(data.user);

      // ✅ Server already set HTTP-only cookie
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white border border-yellow-200 rounded-2xl shadow-2xl p-8 sm:p-10"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-500 p-4 rounded-full">
              <FaUserLock className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">GirviPro</h1>
          <p className="text-gray-600 mt-2 text-sm">
            Secure Jewellery Management Login
          </p>
          <p className="text-yellow-700 mt-2 text-sm">
            New User?{" "}
            <a
              href="https://wa.me/91XXXXXXXXXX?text=I%20want%20to%20book%20a%20free%20demo%20for%20GirviPro"
              target="_blank"
              className="font-semibold underline flex items-center justify-center gap-2"
            >
              Book your free demo <FaWhatsapp />
            </a>
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="owner@girvipro.com"
          className="w-full bg-yellow-50 border border-yellow-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="••••••••"
          className="w-full bg-yellow-50 border border-yellow-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 text-white py-3 rounded-full font-semibold hover:bg-yellow-600 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} GirviPro · Shreyansh Webcraft
        </p>
      </form>
    </div>
  );
}
