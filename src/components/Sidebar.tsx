"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaGem,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", href: "/dashboard", icon: <FaHome /> },
    { name: "Customers", href: "/dashboard/customers", icon: <FaUsers /> },
    { name: "Inventory", href: "/dashboard/inventory", icon: <FaBoxOpen /> },
    { name: "Girvi", href: "/dashboard/girvi", icon: <FaGem /> },
  ];

  const MenuLinks = () => (
    <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
      {menu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
            ${
              pathname === item.href
                ? "bg-yellow-500 text-white shadow"
                : "text-gray-800 hover:bg-yellow-100"
            }
          `}
        >
          <span className="text-lg">{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-yellow-200 shadow">
        <h1 className="text-xl font-extrabold text-gray-900">
          Girvi<span className="text-yellow-500">Pro</span>
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="text-2xl text-gray-800"
        >
          <FaBars />
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <aside className="relative w-64 bg-white h-full shadow-xl flex flex-col">
            <div className="p-6 border-b border-yellow-200 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">
                  Girvi<span className="text-yellow-500">Pro</span>
                </h1>
                <p className="text-xs text-gray-600">
                  by Shreyansh WebCraft
                </p>
              </div>
              <button onClick={() => setOpen(false)}>
                <FaTimes className="text-xl" />
              </button>
            </div>

            <MenuLinks />

            <div className="p-4 border-t">
              <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold">
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white border-r border-yellow-200 shadow-xl z-30 flex-col">
        {/* Branding */}
        <div className="p-6 border-b border-yellow-200">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Girvi<span className="text-yellow-500">Pro</span>
          </h1>
          <p className="text-xs text-gray-600">
            by Shreyansh WebCraft
          </p>
        </div>

        <MenuLinks />

        {/* Logout */}
        <div className="p-4 border-t">
          <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
