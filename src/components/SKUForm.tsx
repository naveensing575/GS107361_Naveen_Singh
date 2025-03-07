import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSKU } from "../store/skuSlice";

export default function SKUForm() {
  const dispatch = useDispatch();
  const [skuName, setSkuName] = useState("");
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1"
        type="text"
        placeholder="SKU Name"
        value={skuName}
        onChange={(e) => setSkuName(e.target.value)}
      />
      <input
        className="border p-2 w-24"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <input
        className="border p-2 w-24"
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => {
          if (skuName.trim() !== "") {
            dispatch(addSKU({ id: Date.now(), name: skuName, price, cost }));
            setSkuName("");
            setPrice(0);
            setCost(0);
          }
        }}
      >
        Add SKU
      </button>
    </div>
  );
}
