"use client";

import { FaTimes } from "react-icons/fa";

export default function CustomerModal({
  open,
  onClose,
  children,
  title,
}: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl text-black font-extrabold mb-4">{title}</h2>

        {children}
      </div>
    </div>
  );
}
