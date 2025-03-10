import { useState } from "react";
import StoreTable from "./StoreTable";
import StoreForm from "../components/StoreForm";

export default function StorePage() {
  const [showForm, setShowForm] = useState(false);
  const [editingStore, setEditingStore] = useState<any | null>(null);

  const handleEdit = (store: any) => {
    setEditingStore(store);
    setShowForm(true);
  };

  return (
    <div className="relative p-6 h-full flex flex-col">
      {/* Scrollable Table Section */}
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow-md border border-gray-300">
        <StoreTable onEdit={handleEdit} />
      </div>

      {/* Fixed Footer with Background */}
      <div className="bg-gray-300 w-full py-4 flex justify-center border-t border-gray-400">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg"
          onClick={() => {
            setEditingStore(null);
            setShowForm(true);
          }}
        >
          NEW STORE
        </button>
      </div>

      {/* Store Form Modal */}
      {showForm && (
        <StoreForm
          onClose={() => setShowForm(false)}
          editingStore={editingStore}
        />
      )}
    </div>
  );
}
