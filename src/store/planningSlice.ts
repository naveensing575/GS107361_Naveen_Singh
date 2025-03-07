import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlanningData {
  storeId: number;
  skuId: number;
  salesUnits: number;
  price: number;
  cost: number;
}

interface PlanningState {
  planning: PlanningData[];
}

const initialState: PlanningState = {
  planning: [],
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setPlanningData: (state, action: PayloadAction<PlanningData[]>) => {
      state.planning = action.payload;
    },
    updateSalesUnits: (
      state,
      action: PayloadAction<{
        storeId: number;
        skuId: number;
        salesUnits: number;
      }>
    ) => {
      const item = state.planning.find(
        (p) =>
          p.storeId === action.payload.storeId &&
          p.skuId === action.payload.skuId
      );
      if (item) {
        item.salesUnits = action.payload.salesUnits;
      }
    },
  },
});

export const { setPlanningData, updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;
