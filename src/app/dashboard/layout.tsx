"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/UserContext";
import Sidebar from "@/src/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (!user) return null;

  return (
    <div className="h-screen bg-yellow-50">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </aside>

      {/* Scrollable Content */}
      <main className="ml-64 h-screen overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
