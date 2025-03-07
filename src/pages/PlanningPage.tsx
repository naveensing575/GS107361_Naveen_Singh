import { useState } from "react";
import PlanningGrid from "../components/PlanningGrid";

export default function PlanningPage() {
  const [rowData] = useState([
    { store: "Store A", sku: "Product X", salesUnits: 10, price: 20, cost: 8 },
    { store: "Store B", sku: "Product Y", salesUnits: 5, price: 15, cost: 6 },
  ]);

  const columnDefs = [
    { field: "store", headerName: "Store", editable: false },
    { field: "sku", headerName: "SKU", editable: false },
    { field: "salesUnits", headerName: "Sales Units", editable: true },
    {
      field: "salesDollars",
      headerName: "Sales $",
      valueGetter: (params: { data: { salesUnits: number; price: number } }) =>
        params.data.salesUnits * params.data.price,
      cellRenderer: (params: { value: any }) => `$${params.value}`,
    },
    {
      field: "gmDollars",
      headerName: "GM $",
      valueGetter: (params: {
        data: { salesUnits: number; price: number; cost: number };
      }) =>
        params.data.salesUnits * params.data.price -
        params.data.salesUnits * params.data.cost,
      cellRenderer: (params: { value: any }) => `$${params.value}`,
    },
    {
      field: "gmPercent",
      headerName: "GM %",
      valueGetter: (params: {
        data: { salesUnits: number; price: number; cost: number };
      }) => {
        const gmDollars =
          params.data.salesUnits * params.data.price -
          params.data.salesUnits * params.data.cost;
        return gmDollars / (params.data.salesUnits * params.data.price);
      },
      cellStyle: (params: { value: any }) => {
        const val = params.value;
        if (val >= 0.4) return { backgroundColor: "green", color: "white" };
        if (val >= 0.1) return { backgroundColor: "yellow" };
        if (val >= 0.05) return { backgroundColor: "orange" };
        return { backgroundColor: "red", color: "white" };
      },
      cellRenderer: (params: { value: number }) =>
        `${(params.value * 100).toFixed(2)}%`,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Planning</h2>
      <PlanningGrid rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
}
