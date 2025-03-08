import { useState } from "react";
import GMChart from "../components/GMChart";
import { STORES } from "../data/demoData";

export default function ChartPage() {
  const [selectedStore, setSelectedStore] = useState(STORES[0].label);

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Gross Margin Chart</h2>

      {/* Store Selection Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Store:</label>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="border p-2 rounded"
        >
          {STORES.map((store) => (
            <option key={store.id} value={store.label}>
              {store.label}
            </option>
          ))}
        </select>
      </div>

      {/* Scrollable Chart Container */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md overflow-auto">
        <div className="w-full min-w-[900px] h-[400px] md:h-[500px] lg:h-[600px]">
          <GMChart store={selectedStore} />
        </div>
      </div>
    </div>
  );
}
