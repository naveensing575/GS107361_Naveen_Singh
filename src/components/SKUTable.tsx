import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeSKU } from "../store/skuSlice";
import { FaTrash } from "react-icons/fa";

export default function SKUTable() {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border rounded-lg shadow-lg bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Delete</th>
            <th className="p-3">SKU</th>
            <th className="p-3">Price</th>
            <th className="p-3">Cost</th>
          </tr>
        </thead>
        <tbody>
          {skus.map((sku) => (
            <tr key={sku.id} className="border-b">
              <td className="p-3 text-center">
                <button
                  className="text-red-500"
                  onClick={() => dispatch(removeSKU(sku.id))}
                >
                  <FaTrash />
                </button>
              </td>
              <td className="p-3">{sku.label}</td>
              <td className="p-3">${sku.price.toFixed(2)}</td>
              <td className="p-3">${sku.cost.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
