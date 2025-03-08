import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSKU } from "../store/skuSlice";

export default function SKUForm({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch();
  const [skuName, setSkuName] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");

  const handleAddSKU = () => {
    if (skuName.trim() !== "" && price.trim() !== "" && cost.trim() !== "") {
      dispatch(
        addSKU({
          id: `SK${Date.now()}`,
          label: skuName,
          class: "Unknown",
          department: "Unknown",
          price: parseFloat(price),
          cost: parseFloat(cost),
        })
      );
      setSkuName("");
      setPrice("");
      setCost("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New SKU</h2>
        <input
          className="border p-2 w-full mb-2 rounded"
          type="text"
          placeholder="SKU Name"
          value={skuName}
          onChange={(e) => setSkuName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2 rounded"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onFocus={() => setPrice("")}
          onKeyDown={(e) => e.key === "Enter" && handleAddSKU()}
          inputMode="decimal"
          pattern="[0-9]*"
        />
        <input
          className="border p-2 w-full mb-4 rounded"
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          onFocus={() => setCost("")}
          onKeyDown={(e) => e.key === "Enter" && handleAddSKU()}
          inputMode="decimal"
          pattern="[0-9]*"
        />
        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddSKU}
          >
            Add SKU
          </button>
        </div>
      </div>
    </div>
  );
}
