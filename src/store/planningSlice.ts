import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlanningEntry {
  storeId: string;
  skuId: string;
  week: number;
  salesUnits: number;
  salesDollars: number;
  gmDollars: number;
  gmPercentage: number;
}

interface PlanningState {
  planningData: PlanningEntry[];
}

const initialState: PlanningState = {
  planningData: [],
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    addPlanningEntry: (state, action: PayloadAction<PlanningEntry>) => {
      state.planningData.push(action.payload);
    },
    updatePlanningEntry: (state, action: PayloadAction<PlanningEntry>) => {
      const index = state.planningData.findIndex(
        (p) =>
          p.storeId === action.payload.storeId &&
          p.skuId === action.payload.skuId &&
          p.week === action.payload.week
      );
      if (index !== -1) {
        state.planningData[index] = action.payload;
      }
    },
    removePlanningEntry: (
      state,
      action: PayloadAction<{ storeId: string; skuId: string; week: number }>
    ) => {
      state.planningData = state.planningData.filter(
        (p) =>
          !(
            p.storeId === action.payload.storeId &&
            p.skuId === action.payload.skuId &&
            p.week === action.payload.week
          )
      );
    },
  },
});

export const { addPlanningEntry, updatePlanningEntry, removePlanningEntry } =
  planningSlice.actions;
export default planningSlice.reducer;
