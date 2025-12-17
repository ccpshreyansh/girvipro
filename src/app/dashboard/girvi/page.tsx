"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, serverTimestamp, DocumentData } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useUser } from "@/src/context/UserContext";
import AddGirviModal from "@/src/components/girvi/AddGirviModal";
import { getISTDateTime } from "@/src/utils/dateTimeIST";

// ================= Types =================
type GirviItem = {
  title: string;
  photoBase64: string;
  caret?: string;
  weight?: string;
};

type Girvi = {
  id: string;
  customerName: string;
  customerPhone: string;
  items: GirviItem[];
  principal: number;
  interestRate: number;
  status: string;
  createdAt: any;
  payments?: number[];
  CreatedAtIST: string;
};

// ================= Component =================
export default function GirviPage() {
  const { user } = useUser();
  const shopId = user?.shopId || "";

  const [girvis, setGirvis] = useState<Girvi[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedGirvi, setSelectedGirvi] = useState<Girvi | null>(null);

  // ================= FETCH GIRVIS =================
  useEffect(() => {
    if (!shopId) return;

    const fetchGirvis = async () => {
      setLoading(true);
      const snap = await getDocs(collection(db, "shops", shopId, "girvis"));

      const list: Girvi[] = snap.docs.map((d) => {
        const data = d.data() as DocumentData;
        return {
          id: d.id,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          items: data.items || [],
          principal: data.principal || 0,
          interestRate: data.interestRate || 0,
          status: data.status || "active",
          createdAt: data.createdAt,
          payments: data.payments || [],
          CreatedAtIST: getISTDateTime(data.createdAt),
        };
      });

      setGirvis(list);
      setLoading(false);
    };

    fetchGirvis();
  }, [shopId]);

  // ================= STATUS COLOR =================
  const statusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "closed":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  // ================= CALCULATE DUE =================
  const calculateDue = (g: Girvi) => {
    if (!g.createdAt) return 0;
    const created = g.createdAt.toDate ? g.createdAt.toDate() : new Date(g.createdAt);
    const now = new Date();
    const months = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    const interest = g.principal * (g.interestRate / 100) * months;
    const totalPayments = g.payments?.reduce((a, b) => a + b, 0) || 0;
    return g.principal + interest - totalPayments;
  };

  // ================= UPDATE PAYMENTS =================
  const addPayment = async (amount: number) => {
    if (!selectedGirvi) return;
    const updatedPayments = [...(selectedGirvi.payments || []), amount];
    const docRef = doc(db, "shops", shopId, "girvis", selectedGirvi.id);
    await updateDoc(docRef, { payments: updatedPayments, updatedAt: serverTimestamp() });

    setSelectedGirvi({ ...selectedGirvi, payments: updatedPayments });
    setGirvis((prev) =>
      prev.map((g) =>
        g.id === selectedGirvi.id ? { ...g, payments: updatedPayments } : g
      )
    );
  };

  // ================= CLOSE GIRVI =================
  const closeGirvi = async () => {
    if (!selectedGirvi) return;
    const docRef = doc(db, "shops", shopId, "girvis", selectedGirvi.id);
    await updateDoc(docRef, { status: "closed", updatedAt: serverTimestamp() });

    setSelectedGirvi({ ...selectedGirvi, status: "closed" });
    setGirvis((prev) =>
      prev.map((g) =>
        g.id === selectedGirvi.id ? { ...g, status: "closed" } : g
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Girvi</h1>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full font-semibold"
        >
          + Add Girvi
        </button>
      </div>

      {/* Girvi List */}
      {loading ? (
        <div>Loading...</div>
      ) : girvis.length === 0 ? (
        <div className="text-black">No Girvi found. Add one to get started.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {girvis.map((g) => (
            <div
              key={g.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition relative bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-black">{g.customerName}</h2>
                <span className={`px-2 py-1 rounded-full text-sm ${statusColor(g.status)}`}>
                  {g.status.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-black mb-2">{g.customerPhone}</div>
              <div className="text-sm text-black mb-2">{g.CreatedAtIST}</div>

              <div className="mb-2">
                <div className="font-medium text-black">Jewellery Items:</div>
                {g.items.map((i, idx) => (
                  <div key={idx} className="text-sm text-black">
                    - {i.title}
                    {i.caret && <span>, Caret: {i.caret}</span>}
                    {i.weight && <span>, Weight: {i.weight}</span>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <div className="font-medium text-black">Principal</div>
                  <div className="text-black">₹ {g.principal}</div>
                </div>
                <div>
                  <div className="font-medium text-black">Interest (%)</div>
                  <div className="text-black">{g.interestRate}</div>
                </div>
              </div>

              <button
                className="w-full bg-yellow-100 text-yellow-800 py-2 rounded font-medium hover:bg-yellow-200"
                onClick={() => setSelectedGirvi(g)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= ADD GIRVI MODAL ================= */}
      {openAddModal && <AddGirviModal onClose={() => setOpenAddModal(false)} />}

      {/* ================= VIEW GIRVI MODAL ================= */}
      {selectedGirvi && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-xl p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black">Girvi Details</h2>
              <button className="text-black" onClick={() => setSelectedGirvi(null)}>✕</button>
            </div>

            {/* Customer Info */}
            <div className="bg-yellow-50 p-4 rounded-lg flex justify-between">
              <div>
                <div className="font-semibold text-black">{selectedGirvi.customerName}</div>
                <div className="text-black">{selectedGirvi.customerPhone}</div>
              </div>
            </div>

            {/* Jewellery Items */}
            <div>
              <div className="font-medium text-black mb-2">Jewellery Items:</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedGirvi.items.map((i, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 border rounded-lg p-3 bg-white"
                  >
                    {i.photoBase64 && (
                      <img
                        src={i.photoBase64}
                        alt={i.title}
                        className="w-14 h-14 rounded-lg object-cover border"
                      />
                    )}

                    <div className="text-black text-sm">
                      <div className="font-semibold">{i.title}</div>
                      {i.caret && <div>Caret: {i.caret}</div>}
                      {i.weight && <div>Weight: {i.weight}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Principal & Interest */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-black">Principal</div>
                <div className="text-black">₹ {selectedGirvi.principal}</div>
              </div>
              <div>
                <div className="font-medium text-black">Interest (%)</div>
                <div className="text-black">{selectedGirvi.interestRate}</div>
              </div>
            </div>

            {/* Payments */}
            <div>
              <div className="font-medium text-black mt-4">Payments</div>
              {(selectedGirvi.payments || []).map((p, i) => (
                <div key={i} className="text-black">Payment {i + 1}: ₹ {p}</div>
              ))}
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Add Payment"
                  className="flex-1 p-2 border rounded text-black"
                  id="newPayment"
                />
                <button
                  className="bg-green-500 text-white px-3 rounded"
                  onClick={() => {
                    const input = document.getElementById("newPayment") as HTMLInputElement;
                    if (!input.value) return;
                    addPayment(Number(input.value));
                    input.value = "";
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Due */}
            <div className="font-medium text-black mt-4">
              Due: ₹ {calculateDue(selectedGirvi)}
            </div>

            {/* Close Girvi */}
            {selectedGirvi.status !== "closed" && (
              <button
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold mt-4"
                onClick={closeGirvi}
              >
                Close Girvi
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
