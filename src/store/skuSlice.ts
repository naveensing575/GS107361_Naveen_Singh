import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SKUS } from "../data/demoData";

interface SKU {
  id: string;
  label: string;
  class: string;
  department: string;
  price: number;
  cost: number;
}

interface SKUState {
  skus: SKU[];
}

const initialState: SKUState = {
  skus: [],
};

const skuSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    setSKUs: (state, action: PayloadAction<SKU[]>) => {
      state.skus = action.payload;
    },
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.skus.push(action.payload);
    },
    removeSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
    loadSampleSKUs: (state) => {
      state.skus = SKUS;
    },
  },
});

export const { setSKUs, addSKU, removeSKU, loadSampleSKUs } = skuSlice.actions;
export default skuSlice.reducer;
