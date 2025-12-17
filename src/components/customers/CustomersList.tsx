"use client";

import { FaEdit, FaTrash, FaUser } from "react-icons/fa";

export default function CustomersList({
  customers,
  onEdit,
  onDelete,
}: any) {
  return (
    <div className="bg-white rounded-2xl border shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-yellow-50">
          <tr>
            <th className="p-3 text-black text-left">Customer</th>
            <th className="p-3 text-black text-left">Mobile</th>
            <th className="p-3 text-black text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c: any) => (
            <tr key={c.id} className="border-b">
              <td className="p-3 flex text-black items-center gap-2">
                <FaUser className="text-yellow-500" /> {c.name}
              </td>
              <td className="p-3 text-black">{c.phone}</td>
              <td className="p-3 flex justify-end gap-3">
                <button onClick={() => onEdit(c)} className="text-yellow-600">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(c.id)} className="text-red-600">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
