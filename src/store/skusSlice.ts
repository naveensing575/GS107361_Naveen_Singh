import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SKU {
  id: string;
  name: string;
  price: number;
  cost: number;
}

interface SKUsState {
  skus: SKU[];
}

const initialState: SKUsState = {
  skus: [],
};

const skusSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.skus.push(action.payload);
    },
    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.skus.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
    removeSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
  },
});

export const { addSKU, updateSKU, removeSKU } = skusSlice.actions;
export default skusSlice.reducer;
