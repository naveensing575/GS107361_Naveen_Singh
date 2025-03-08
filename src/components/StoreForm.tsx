import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStore } from "../store/storesSlice";

export default function StoreForm({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch();
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleAddStore = () => {
    if (storeName && city && state) {
      dispatch(
        addStore({
          id: `ST${Date.now()}`,
          label: storeName,
          city,
          state,
        })
      );
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Store</h2>
        <input
          type="text"
          placeholder="Store Name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
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
            onClick={handleAddStore}
          >
            Add Store
          </button>
        </div>
      </div>
    </div>
  );
}
