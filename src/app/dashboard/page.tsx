"use client";

import {
  FaGem,
  FaUsers,
  FaBoxOpen,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { useUser } from "@/src/context/UserContext";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

export default function DashboardPage() {
  const { user, loading } = useUser();
  const [stats, setStats] = useState({
    customers: 0,
    inventory: 0,
    payments: 0,
    activeGirvi: 0,
  });
  const shopId = user?.shopId || "";

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    if (!shopId) return;

    const fetchStats = async () => {
      try {
        // Customers count
        const customersSnap = await getDocs(collection(db, "shops", shopId, "customers"));
        const customersCount = customersSnap.size;

        // Inventory count
        const inventorySnap = await getDocs(collection(db, "shops", shopId, "inventory"));
        const inventoryCount = inventorySnap.size;

        // Girvi data
        const girviSnap = await getDocs(collection(db, "shops", shopId, "girvis"));
        let totalPayments = 0;
        let activeGirviCount = 0;
        girviSnap.docs.forEach((doc) => {
          const data = doc.data() as any;
          if (data.status === "active") activeGirviCount++;
          const payments = data.payments || [];
          totalPayments += payments.reduce((a: number, b: number) => a + b, 0);
        });

        setStats({
          customers: customersCount,
          inventory: inventoryCount,
          payments: totalPayments,
          activeGirvi: activeGirviCount,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, [shopId]);

  if (loading) {
    return (
      <div className="text-yellow-700 font-semibold">
        Loading dashboard...
      </div>
    );
  }

  if (!user) return null;

  const shopName = user.shopName;

  return (
    <div className="space-y-10">
      {/* Top Branding Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="bg-white border border-yellow-200 px-6 py-4 rounded-2xl shadow-lg">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Logged in shop
          </p>
          <h1 className="text-2xl font-bold text-gray-900">{shopName}</h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon={<FaUsers />} title="Customers" value={stats.customers.toString()} />
        <DashboardCard icon={<FaBoxOpen />} title="Inventory Items" value={stats.inventory.toString()} />
        <DashboardCard
          icon={<FaMoneyCheckAlt />}
          title="Total Payments"
          value={`₹${stats.payments.toLocaleString()}`}
        />
        <DashboardCard icon={<FaGem />} title="Active Girvi" value={stats.activeGirvi.toString()} />
      </div>

      {/* Recent Section */}
      <div className="bg-white border border-yellow-200 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Recent Activities
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Your latest girvi entries, payments, customer updates, and inventory
          changes will appear here for quick access and tracking.
        </p>
      </div>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="group flex items-center gap-5 p-6 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-md hover:shadow-2xl transition-all">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-yellow-500 text-white text-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700">{title}</p>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
