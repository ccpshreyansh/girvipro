"use client";

import { useEffect, useState } from "react";
import { db } from "@/src/lib/firebase";
import {
  collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp
} from "firebase/firestore";
import { FaPlus } from "react-icons/fa";
import { useUser } from "@/src/context/UserContext";
import { getISTDateTime } from "@/src/utils/dateTimeIST";

import CustomerModal from "@/src/components/customers/CustomerModal";
import CustomerForm from "@/src/components/customers/CustomerForm";
import CustomersList from "@/src/components/customers/CustomersList";

export default function CustomersPage() {
  const { user } = useUser();
  const shopId = user?.shopId;

  const [customers, setCustomers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!shopId) return;
    getDocs(collection(db, "shops", shopId, "customers")).then((snap) =>
      setCustomers(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [shopId]);

  const handleAdd = async (data: any) => {
    setLoading(true);
    const ref = await addDoc(collection(db, "shops", shopId!, "customers"), {
      ...data,
      createdAt: serverTimestamp(),
      createdAtIST: getISTDateTime(),
    });
    setCustomers((p) => [...p, { id: ref.id, ...data }]);
    setOpen(false);
    setLoading(false);
  };

  const handleUpdate = async (data: any) => {
    setLoading(true);
    await updateDoc(
      doc(db, "shops", shopId!, "customers", editData.id),
      data
    );
    setCustomers((p) =>
      p.map((c) => (c.id === editData.id ? { ...c, ...data } : c))
    );
    setEditData(null);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this customer?")) return;
    await deleteDoc(doc(db, "shops", shopId!, "customers", id));
    setCustomers((p) => p.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-black font-extrabold">Customers</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-500 text-white px-5 py-2 rounded-full flex gap-2"
        >
          <FaPlus /> Add Customer
        </button>
      </div>

      <CustomersList
        customers={customers}
        onEdit={setEditData}
        onDelete={handleDelete}
      />

      <CustomerModal
        open={open || !!editData}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        title={editData ? "Edit Customer" : "Add Customer"}
      >
        <CustomerForm
          initialData={editData}
          onSubmit={editData ? handleUpdate : handleAdd}
          loading={loading}
        />
      </CustomerModal>
    </div>
  );
}
