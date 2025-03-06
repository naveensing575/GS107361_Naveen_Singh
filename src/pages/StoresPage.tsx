import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addStore, removeStore } from "../store/storesSlice";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const StoresPage = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);
  const [storeName, setStoreName] = useState("");

  const handleAddStore = () => {
    if (storeName.trim()) {
      dispatch(addStore({ id: crypto.randomUUID(), name: storeName }));
      setStoreName("");
    }
  };

  return (
    <div className="p-6 ml-60">
      <h2 className="text-2xl font-bold mb-4">Stores</h2>
      <div className="flex space-x-2">
        <Input
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Enter Store Name"
        />
        <Button onClick={handleAddStore}>Add</Button>
      </div>

      <ul className="mt-4">
        {stores.map((store) => (
          <li key={store.id} className="flex justify-between p-2 border">
            {store.name}
            <Button onClick={() => dispatch(removeStore(store.id))} color="red">
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoresPage;
