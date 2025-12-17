import CustomerForm from "@/src/components/customers/CustomerForm";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { getISTDateTime } from "@/src/utils/dateTimeIST";
import { useUser } from "@/src/context/UserContext";

export default function AddCustomerModal({ onClose, onAdded }: any) {
    const {user} = useUser();
    const shopId = user?.shopId;
  const saveCustomer = async (data: any) => {
    const ref = await addDoc(collection(db, "shops", shopId!, "customers"), {
          ...data,
          createdAt: serverTimestamp(),
          createdAtIST: getISTDateTime(),
        });
    onAdded({ id: ref.id, ...data });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Add Customer</h2>
        <CustomerForm onSubmit={saveCustomer} loading={false} />
        <button onClick={onClose} className="mt-3 text-sm text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
