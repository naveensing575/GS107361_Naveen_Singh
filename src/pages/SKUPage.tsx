import SKUTable from "../components/SKUTable";

export default function SKUPage() {
  return (
    <div className="relative p-6 h-full flex flex-col">
      {/* Scrollable Table Section */}
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow-md border border-gray-300">
        <SKUTable />
      </div>

      {/* Fixed Footer with Background */}
      <div className="bg-gray-300 w-full py-4 flex justify-center border-t border-gray-400">
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg">
          NEW SKU
        </button>
      </div>
    </div>
  );
}
