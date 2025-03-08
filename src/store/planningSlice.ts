import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PLANNING_DATA } from "../data/demoData";

interface PlanningState {
  data: typeof PLANNING_DATA;
}

const initialState: PlanningState = { data: PLANNING_DATA };

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    updateSalesUnits: (
      state,
      action: PayloadAction<{
        store: string;
        sku: string;
        week: string;
        value: number;
      }>
    ) => {
      const { store, sku, week, value } = action.payload;
      const entry = state.data.find(
        (d) => d.store === store && d.sku === sku && d.week === week
      );
      if (entry) {
        entry.salesUnits = value;
      } else {
        state.data.push({ store, sku, week, salesUnits: value });
      }
    },

    // ✅ New action to load sample planning data
    loadSamplePlanningData: (state) => {
      state.data = PLANNING_DATA;
    },
  },
});

// ✅ Export both actions
export const { updateSalesUnits, loadSamplePlanningData } =
  planningSlice.actions;
export default planningSlice.reducer;
