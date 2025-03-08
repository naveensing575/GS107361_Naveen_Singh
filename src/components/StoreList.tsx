import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeStore, reorderStores } from "../store/storesSlice";
import { useDrag, useDrop } from "react-dnd";

interface StoreItemProps {
  store: { id: string; label: string; city: string; state: string };
  index: number;
  moveStore: (fromIndex: number, toIndex: number) => void;
}

const StoreItem = ({ store, index, moveStore }: StoreItemProps) => {
  const ref = useRef<HTMLLIElement>(null);
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
    <li
      ref={ref}
      className={`flex justify-between items-center p-3 bg-white shadow rounded cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div>
        <p className="font-semibold">{store.label}</p>
        <p className="text-sm text-gray-500">
          {store.city}, {store.state}
        </p>
      </div>
      <button
        className="text-red-500"
        onClick={() => dispatch(removeStore(store.id))}
      >
        Delete
      </button>
    </li>
  );
};

export default function StoreList() {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);

  const moveStore = (fromIndex: number, toIndex: number) => {
    dispatch(reorderStores({ fromIndex, toIndex }));
  };

  return (
    <ul className="space-y-2">
      {stores.map((store, index) => (
        <StoreItem
          key={store.id}
          store={{
            id: store.id,
            label: store.label,
            city: store.city || "N/A",
            state: store.state || "N/A",
          }}
          index={index}
          moveStore={moveStore}
        />
      ))}
    </ul>
  );
}
