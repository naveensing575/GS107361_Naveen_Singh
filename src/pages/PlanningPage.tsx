import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const PlanningPage = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);

  const [rowData] = useState(
    stores.flatMap((store) =>
      skus.map((sku) => ({
        store: store.name,
        sku: sku.name,
        salesUnits: 0,
        price: sku.price,
        cost: sku.cost,
        salesDollars: 0,
        gmDollars: 0,
        gmPercentage: 0,
      }))
    )
  );

  const columnDefs = [
    { headerName: "Store", field: "store" },
    { headerName: "SKU", field: "sku" },
    { headerName: "Sales Units", field: "salesUnits", editable: true },
    { headerName: "Sales $", field: "salesDollars" },
    { headerName: "GM $", field: "gmDollars" },
    { headerName: "GM %", field: "gmPercentage" },
  ];

  return (
    <div className="p-6 ml-60">
      <h2 className="text-2xl font-bold mb-4">Planning</h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default PlanningPage;
