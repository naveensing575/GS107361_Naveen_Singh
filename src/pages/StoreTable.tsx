import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeStore, reorderStores } from "../store/storesSlice";
import { useDrag, useDrop } from "react-dnd";
import { FaTrash, FaGripVertical } from "react-icons/fa";

interface StoreItemProps {
  store: { id: string; label: string; city: string; state: string };
  index: number;
  moveStore: (fromIndex: number, toIndex: number) => void;
}

const StoreRow = ({ store, index, moveStore }: StoreItemProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "STORE",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveStore(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "STORE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr
      ref={ref}
      className={`border-b ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <td className="p-3 text-center">
        <button
          className="text-red-500"
          onClick={() => dispatch(removeStore(store.id))}
        >
          <FaTrash />
        </button>
      </td>
      <td className="p-3 text-center cursor-move">
        <FaGripVertical />
      </td>
      <td className="p-3">{index + 1}</td>
      <td className="p-3">{store.label}</td>
      <td className="p-3">{store.city}</td>
      <td className="p-3">{store.state}</td>
    </tr>
  );
};

export default function StoreTable() {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);

  const moveStore = (fromIndex: number, toIndex: number) => {
    dispatch(reorderStores({ fromIndex, toIndex }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border rounded-lg shadow-lg bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Delete</th>
            <th className="p-3">Drag</th>
            <th className="p-3">S.No</th>
            <th className="p-3">Store</th>
            <th className="p-3">City</th>
            <th className="p-3">State</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => (
            <StoreRow
              key={store.id}
              store={store}
              index={index}
              moveStore={moveStore}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
