"use client";

import { FaBoxOpen } from "react-icons/fa";

export default function InventoryPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
      <div className="text-yellow-500 text-6xl">
        <FaBoxOpen />
      </div>
      <h1 className="text-3xl font-bold text-black">Inventory Access Restricted</h1>
      <p className="text-black text-lg max-w-md">
        To get access to the inventory, please contact the admin:{" "}
        <span className="font-semibold text-yellow-600">Shreyansh</span>
      </p>
      <p className="text-gray-500">
        Until access is granted, you won't be able to view or manage inventory items.
      </p>
    </div>
  );
}
