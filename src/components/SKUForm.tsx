import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSKU, updateSKU } from "../store/skuSlice";

interface SKUFormProps {
  onClose: () => void;
  editingSKU?: {
    id: string;
    label: string;
    price: number;
    cost: number;
    class: string;
    department: string;
  } | null;
}

export default function SKUForm({ onClose, editingSKU }: SKUFormProps) {
  const dispatch = useDispatch();
  const [skuName, setSkuName] = useState(editingSKU?.label || "");
  const [price, setPrice] = useState(editingSKU?.price.toString() || "");
  const [cost, setCost] = useState(editingSKU?.cost.toString() || "");

  useEffect(() => {
    if (editingSKU) {
      setSkuName(editingSKU.label);
      setPrice(editingSKU.price.toString());
      setCost(editingSKU.cost.toString());
    }
  }, [editingSKU]);

  const handleSubmit = () => {
    if (skuName.trim() && price.trim() && cost.trim()) {
      const newSKU = {
        id: editingSKU ? editingSKU.id : `SK${Date.now()}`,
        label: skuName,
        price: parseFloat(price),
        cost: parseFloat(cost),
        class: editingSKU ? editingSKU.class : "Unknown",
        department: editingSKU ? editingSKU.department : "Unknown",
      };

      if (editingSKU) {
        dispatch(updateSKU(newSKU));
      } else {
        dispatch(addSKU(newSKU));
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingSKU ? "Edit SKU" : "Add New SKU"}
        </h2>
        <input
          className="border p-2 w-full mb-2 rounded"
          type="text"
          placeholder="SKU Name"
          value={skuName}
          onChange={(e) => setSkuName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <input
          className="border p-2 w-full mb-2 rounded"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <input
          className="border p-2 w-full mb-4 rounded"
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
            onClick={handleSubmit}
          >
            {editingSKU ? "Save Changes" : "Add SKU"}
          </button>
        </div>
      </div>
    </div>
  );
}
