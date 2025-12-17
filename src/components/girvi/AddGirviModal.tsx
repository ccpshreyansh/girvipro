"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import AddCustomerModal from "./AddCustomerModal";
import JewelleryItems from "./JewelleryItems";
import { useUser } from "@/src/context/UserContext";
import { get } from "http";
import { getISTDateTime } from "@/src/utils/dateTimeIST";

type Customer = {
  id: string;
  name: string;
  phone: string;
};

export default function AddGirviModal({
  onClose,
  preSelectedCustomerId,
}: {
  onClose: () => void;
  preSelectedCustomerId?: string;
}) {
  const { user } = useUser();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [items, setItems] = useState([
    { title: "", caret: "", weight: "" },
  ]);

  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loading, setLoading] = useState(false);

  const [openAddCustomer, setOpenAddCustomer] = useState(false);

  /* ================= FETCH CUSTOMERS ================= */
  const shopId = user?.shopId || "";
  useEffect(() => {
    if (!shopId) return;

    const fetchCustomers = async () => {
      const snap = await getDocs(
        collection(db, "shops", shopId, "customers")
      );

      const list = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));

      setCustomers(list);

      if (preSelectedCustomerId) {
        const found = list.find((c) => c.id === preSelectedCustomerId);
        if (found) setSelectedCustomer(found);
      }
    };

    fetchCustomers();
  }, [shopId, preSelectedCustomerId]);

  console.log("Customers:", customers);

  /* ================= SEARCH ================= */
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  /* ================= SUBMIT GIRVI ================= */
  const submitGirvi = async () => {
    if (!selectedCustomer) {
      alert("Select customer");
      return;
    }

    if (!principal || !interestRate) {
      alert("Enter amount & interest");
      return;
    }

    setLoading(true);

    await addDoc(collection(db, "shops", shopId, "girvis"), {
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,

      items,
      principal: Number(principal),
      interestRate: Number(interestRate),

      status: "active",
      createdAt: serverTimestamp(),
      CreatedAtIST : getISTDateTime(),
    });

    setLoading(false);
    onClose();
  };
const inputClass =
    "w-full p-3 rounded-lg border border-yellow-300 bg-yellow-50 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500 focus:bg-white outline-none";
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 space-y-5">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">Add Girvi</h2>
          <button className="text-black" onClick={onClose}>✕</button>
        </div>

        {/* ================= CUSTOMER SEARCH ================= */}
        {!selectedCustomer && (
          <>
            <input
              placeholder="Search customer by name or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={inputClass}
            />

            {search && filteredCustomers.length > 0 && (
              <div className="border rounded-lg max-h-44 overflow-auto">
                {filteredCustomers.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCustomer(c)}
                    className="p-3 cursor-pointer hover:bg-yellow-50 text-black"
                  >
                    <div className="font-medium text-black">{c.name}</div>
                    <div className="text-sm text-gray-500 text-black">{c.phone}</div>
                  </div>
                ))}
              </div>
            )}

            {search && filteredCustomers.length === 0 && (
              <button
                onClick={() => setOpenAddCustomer(true)}
                className="text-yellow-600 font-semibold"
              >
                + Add Customer
              </button>
            )}
          </>
        )}

        {/* ================= SELECTED CUSTOMER ================= */}
        {selectedCustomer && (
          <div className="bg-yellow-50 p-4 rounded-lg flex justify-between text-black">
            <div>
              <div className="font-semibold text-black">{selectedCustomer.name}</div>
              <div className="text-sm text-black">{selectedCustomer.phone}</div>
            </div>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="text-sm text-red-500 text-black"
            >
              Change
            </button>
          </div>
        )}

        {/* ================= JEWELLERY ITEMS ================= */}
        {/* <JewelleryItems items={items} setItems={setItems} /> */}
        <JewelleryItems items={items} setItems={setItems} inputClass={inputClass} />


        {/* ================= PRICING ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
          <input
            placeholder="Principal Amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="p-3 border rounded-lg text-black"
          />
          <input
            placeholder="Monthly Interest (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="p-3 border rounded-lg text-black"
          />
        </div>

        {/* ================= SUBMIT ================= */}
        <button
          onClick={submitGirvi}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full font-semibold disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Girvi"}
        </button>

        {/* ================= ADD CUSTOMER MODAL ================= */}
        {openAddCustomer && (
          <AddCustomerModal
            onClose={() => setOpenAddCustomer(false)}
            onAdded={(customer: Customer) => {
              setCustomers((p) => [...p, customer]);
              setSelectedCustomer(customer);
              setSearch("");
              setOpenAddCustomer(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
