"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaUpload } from "react-icons/fa";
import { compressImageToBase64 } from "@/src/utils/image";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
};

export default function CustomerForm({
  initialData,
  onSubmit,
  loading,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    aadhaarPan: "",
    address: "",
    photoBase64: "",
    photoName: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleImage = async (file: File) => {
    const base64 = await compressImageToBase64(file);
    setForm((p) => ({
      ...p,
      photoBase64: base64,
      photoName: file.name,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full p-3 rounded-lg border border-yellow-300 bg-yellow-50 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500 focus:bg-white outline-none";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="phone"
          placeholder="Mobile Number"
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="aadhaarPan"
          placeholder="Aadhaar / PAN"
          value={form.aadhaarPan}
          onChange={handleChange}
          className={`${inputClass} md:col-span-2`}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          rows={3}
          className={`${inputClass} md:col-span-2 resize-none`}
        />
      </div>

      {/* File Upload */}
      <label className="flex items-center gap-3 cursor-pointer border border-dashed border-yellow-400 p-4 rounded-lg bg-yellow-50 hover:bg-yellow-100">
        <FaUpload className="text-yellow-600" />
        <span className="text-sm text-gray-700">
          {form.photoName || "Upload customer photo"}
        </span>
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => e.target.files && handleImage(e.target.files[0])}
        />
      </label>

      <button
        onClick={() => onSubmit(form)}
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <FaCheckCircle />
        {loading ? "Saving..." : "Save Customer"}
      </button>
    </div>
  );
}
