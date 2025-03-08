import { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateSalesUnits } from "../store/planningSlice";
import { STORES, SKUS, CALENDAR } from "../data/demoData";

export default function PlanningGrid() {
  const dispatch = useDispatch();
  const planningData = useSelector((state: RootState) => state.planning.data);
  const [loading, setLoading] = useState(true);

  // Transform Data to Match UI
  const rowData = useMemo(() => {
    const data = STORES.flatMap((store) =>
      SKUS.map((sku) => {
        const row: Record<string, string | number> = {
          store: store.label,
          sku: sku.label,
        };
        CALENDAR.forEach(({ week }) => {
          const matchingEntry = planningData.find(
            (d) => d.store === store.id && d.sku === sku.id && d.week === week
          );
          const salesUnits = matchingEntry ? matchingEntry.salesUnits : 0;
          row[`salesUnits_${week}`] = salesUnits;
          row[`salesDollars_${week}`] = salesUnits * sku.price;
          row[`gmDollars_${week}`] =
            salesUnits * sku.price - salesUnits * sku.cost;
          row[`gmPercent_${week}`] =
            salesUnits > 0
              ? ((row[`gmDollars_${week}`] as number) /
                  (row[`salesDollars_${week}`] as number)) *
                100
              : 0;
        });
        return row;
      })
    );
    return data;
  }, [planningData]);

  // Simulating Data Loading Effect
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // ✅ Simulated loading delay
  }, []);

  // Column Definitions
  const columnDefs = useMemo(() => {
    let columns: any[] = [
      { field: "store", headerName: "Store", pinned: "left", flex: 1 },
      { field: "sku", headerName: "SKU", pinned: "left", flex: 1 },
    ];
    CALENDAR.forEach(({ week }) => {
      columns.push({
        headerName: `${week}`,
        groupId: `week_${week}`,
        children: [
          {
            field: `salesUnits_${week}`,
            headerName: "Sales Units",
            editable: true,
            flex: 1,
            valueFormatter: (params: { value: any }) => params.value || 0,
            onCellValueChanged: (params: {
              data: Record<string, any>;
              newValue: number;
            }) => {
              dispatch(
                updateSalesUnits({
                  store: params.data.store,
                  sku: params.data.sku,
                  week,
                  value: params.newValue,
                })
              );
            },
          },
          {
            field: `salesDollars_${week}`,
            headerName: "Sales Dollars",
            flex: 1,
            valueFormatter: currencyFormatter,
          },
          {
            field: `gmDollars_${week}`,
            headerName: "GM Dollars",
            flex: 1,
            valueFormatter: currencyFormatter,
          },
          {
            field: `gmPercent_${week}`,
            headerName: "GM Percent",
            flex: 1,
            valueFormatter: percentageFormatter,
            cellStyle: (params: { value: number }) => ({
              backgroundColor: getGMColor(params.value),
              color: "black",
              textAlign: "center",
            }),
          },
        ],
      });
    });
    return columns;
  }, [dispatch]);

  return (
    <div className="ag-theme-alpine w-full h-full">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
      ) : (
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true, sortable: true }}
          modules={[ClientSideRowModelModule]}
          domLayout="autoHeight"
        />
      )}
    </div>
  );
}

// Formatter Functions
const currencyFormatter = (params: { value: number }) =>
  `$${Number(params.value || 0).toFixed(2)}`;
const percentageFormatter = (params: { value: number }) =>
  `${Number(params.value || 0).toFixed(2)}%`;

// Conditional Formatting
const getGMColor = (value: number) => {
  if (value >= 40) return "#4CAF50"; // Green
  if (value >= 10) return "#FFC107"; // Yellow
  if (value > 5) return "#FF9800"; // Orange
  return "#F44336"; // Red
};
