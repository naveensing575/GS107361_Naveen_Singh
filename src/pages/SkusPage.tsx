import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addSKU, removeSKU } from "../store/skusSlice";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const SkusPage = () => {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);
  const [skuName, setSkuName] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");

  const handleAddSku = () => {
    if (skuName.trim() && price && cost) {
      dispatch(
        addSKU({
          id: crypto.randomUUID(),
          name: skuName,
          price: Number(price),
          cost: Number(cost),
        })
      );
      setSkuName("");
      setPrice("");
      setCost("");
    }
  };

  return (
    <div className="p-6 ml-60">
      <h2 className="text-2xl font-bold mb-4">SKUs</h2>
      <div className="flex space-x-2">
        <Input
          value={skuName}
          onChange={(e) => setSkuName(e.target.value)}
          placeholder="Enter SKU Name"
        />
        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
        />
        <Input
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Cost"
          type="number"
        />
        <Button onClick={handleAddSku}>Add</Button>
      </div>

      <ul className="mt-4">
        {skus.map((sku) => (
          <li key={sku.id} className="flex justify-between p-2 border">
            {sku.name} - ${sku.price} | Cost: ${sku.cost}
            <Button onClick={() => dispatch(removeSKU(sku.id))} color="red">
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkusPage;
