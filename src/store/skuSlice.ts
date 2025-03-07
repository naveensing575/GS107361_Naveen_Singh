import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SKU {
  id: number;
  name: string;
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
    removeSKU: (state, action: PayloadAction<number>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
    updateSKU: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        price: number;
        cost: number;
      }>
    ) => {
      const sku = state.skus.find((sku) => sku.id === action.payload.id);
      if (sku) {
        sku.name = action.payload.name;
        sku.price = action.payload.price;
        sku.cost = action.payload.cost;
      }
    },
  },
});

export const { setSKUs, addSKU, removeSKU, updateSKU } = skuSlice.actions;
export default skuSlice.reducer;
