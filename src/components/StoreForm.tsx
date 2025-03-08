import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStore } from "../store/storesSlice";

export default function StoreForm() {
  const dispatch = useDispatch();
  const [storeName, setStoreName] = useState("");

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1"
        type="text"
        placeholder="Enter store name"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => {
          if (storeName.trim() !== "") {
            dispatch(
              addStore({
                id: `ST${Date.now()}`,
                label: storeName,
                city: "Unknown",
                state: "Unknown",
              })
            );
            setStoreName("");
          }
        }}
      >
        Add Store
      </button>
    </div>
  );
}
