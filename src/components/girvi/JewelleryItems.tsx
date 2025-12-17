"use client";

import { useState } from "react";
import { compressImageToBase64 } from "@/src/utils/image";

type JewelleryItem = {
  title: string;
  caret: string;
  weight: string;
  photoBase64?: string;
  photoName?: string;
};

export default function JewelleryItems({
  items,
  setItems,
  inputClass,
}: {
  items: JewelleryItem[];
  setItems: (items: JewelleryItem[]) => void;
  inputClass?: string;
}) {
  const addItem = () => {
    setItems([...items, { title: "", caret: "", weight: "" }]);
  };

  const updateItem = (i: number, key: keyof JewelleryItem, value: string) => {
    const copy = [...items];
    copy[i][key] = value;
    setItems(copy);
  };

  const handleImage = async (i: number, file: File) => {
    const base64 = await compressImageToBase64(file, 100); // compress to ~100KB
    const copy = [...items];
    copy[i].photoBase64 = base64;
    copy[i].photoName = file.name;
    setItems(copy);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-black">Jewellery Items</h3>

      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <input
            placeholder={`Item ${i + 1} Title`}
            value={item.title}
            onChange={(e) => updateItem(i, "title", e.target.value)}
            className={inputClass}
          />
          <input
            placeholder="Caret"
            value={item.caret}
            onChange={(e) => updateItem(i, "caret", e.target.value)}
            className={inputClass}
          />
          <input
            placeholder="Weight (gm)"
            value={item.weight}
            onChange={(e) => updateItem(i, "weight", e.target.value)}
            className={inputClass}
          />
          <label className="flex items-center gap-2 cursor-pointer border border-dashed border-yellow-300 p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100">
            <span className="text-sm text-gray-700">
              {item.photoName || "Upload Image"}
            </span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files && handleImage(i, e.target.files[0])}
            />
          </label>
        </div>
      ))}

      <button
        onClick={addItem}
        className="text-yellow-600 font-semibold mt-2"
      >
        + Add Item
      </button>
    </div>
  );
}
