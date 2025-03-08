import PlanningGrid from "../components/PlanningGrid";

export default function PlanningPage() {
  return (
    <div className="relative p-6 h-full flex flex-col">
      {/* Page Header */}
      <h2 className="text-2xl font-bold mb-4">Planning</h2>

      {/* Scrollable Table Section */}
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow-md border border-gray-300">
        <PlanningGrid />
      </div>
    </div>
  );
}
