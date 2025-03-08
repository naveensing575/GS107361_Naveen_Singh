import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeSKU } from "../store/skuSlice";

export default function SKUList() {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);

  return (
    <ul className="space-y-2">
      {skus.map((sku) => (
        <li
          key={sku.id}
          className="flex justify-between p-3 bg-white shadow rounded"
        >
          <span>
            {sku.label} - ${sku.price}
          </span>
          <button
            className="text-red-500"
            onClick={() => dispatch(removeSKU(sku.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
