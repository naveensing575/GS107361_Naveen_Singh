import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeStore, reorderStores } from "../store/storesSlice";
import { useDrag, useDrop } from "react-dnd";
import { FaTrash, FaGripVertical, FaEdit } from "react-icons/fa";

interface StoreItemProps {
  store: { id: string; label: string; city: string; state: string };
  index: number;
  moveStore: (fromIndex: number, toIndex: number) => void;
  onEdit: (store: any) => void;
}

const StoreRow = ({ store, index, moveStore, onEdit }: StoreItemProps) => {
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
      className={`border-b ${
        isDragging ? "opacity-50" : "opacity-100"
      } hover:bg-gray-50`}
    >
      {/* Delete Icon */}
      <td className="p-4 text-center">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => dispatch(removeStore(store.id))}
        >
          <FaTrash />
        </button>
      </td>

      {/* Drag Handle */}
      <td className="p-4 text-center cursor-move">
        <FaGripVertical />
      </td>

      {/* Store Details */}
      <td className="p-4 text-center">{index + 1}</td>
      <td className="p-4">{store.label}</td>
      <td className="p-4">{store.city}</td>
      <td className="p-4">{store.state}</td>

      {/* Edit Icon */}
      <td className="p-4 text-center">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => onEdit(store)}
        >
          <FaEdit />
        </button>
      </td>
    </tr>
  );
};

export default function StoreTable({
  onEdit,
}: {
  onEdit: (store: any) => void;
}) {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);

  const moveStore = (fromIndex: number, toIndex: number) => {
    dispatch(reorderStores({ fromIndex, toIndex }));
  };

  return (
    <div className="overflow-y-auto flex-1">
      <table className="w-full border-collapse border rounded-lg shadow-lg bg-white">
        <thead className="bg-gray-200 border-b border-gray-400">
          <tr>
            <th className="p-4 text-center">Delete</th>
            <th className="p-4 text-center">Drag</th>
            <th className="p-4 text-center">S.No</th>
            <th className="p-4 text-left">Store</th>
            <th className="p-4 text-left">City</th>
            <th className="p-4 text-left">State</th>
            <th className="p-4 text-center">Edit</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => (
            <StoreRow
              key={store.id}
              store={store}
              index={index}
              moveStore={moveStore}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
