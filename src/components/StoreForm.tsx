import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addStore, updateStore } from "../store/storesSlice";

interface StoreFormProps {
  onClose: () => void;
  editingStore?: {
    id: string;
    label: string;
    city: string;
    state: string;
  } | null;
}

export default function StoreForm({ onClose, editingStore }: StoreFormProps) {
  const dispatch = useDispatch();
  const [storeName, setStoreName] = useState(editingStore?.label || "");
  const [city, setCity] = useState(editingStore?.city || "");
  const [state, setState] = useState(editingStore?.state || "");

  useEffect(() => {
    if (editingStore) {
      setStoreName(editingStore.label);
      setCity(editingStore.city);
      setState(editingStore.state);
    }
  }, [editingStore]);

  const handleSubmit = () => {
    if (storeName && city && state) {
      if (editingStore) {
        dispatch(
          updateStore({ id: editingStore.id, label: storeName, city, state })
        );
      } else {
        dispatch(
          addStore({ id: `ST${Date.now()}`, label: storeName, city, state })
        );
      }
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingStore ? "Edit Store" : "Add New Store"}
        </h2>
        <input
          type="text"
          placeholder="Store Name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border p-2 mb-4 rounded"
        />
        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {editingStore ? "Save Changes" : "Add Store"}
          </button>
        </div>
      </div>
    </div>
  );
}
