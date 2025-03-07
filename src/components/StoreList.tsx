import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeStore } from "../store/storesSlice";

export default function StoreList() {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);

  return (
    <ul className="space-y-2">
      {stores.map((store) => (
        <li
          key={store.id}
          className="flex justify-between p-3 bg-white shadow rounded"
        >
          <span>{store.name}</span>
          <button
            className="text-red-500"
            onClick={() => dispatch(removeStore(store.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
