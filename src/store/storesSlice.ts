import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORES } from "../data/demoData";

interface Store {
  id: string;
  label: string;
  city: string;
  state: string;
}

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    setStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    },
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },
    removeStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter(
        (store) => store.id !== action.payload
      );
    },
    reorderStores: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedItem] = state.stores.splice(fromIndex, 1);
      state.stores.splice(toIndex, 0, movedItem);
    },
    loadSampleStores: (state) => {
      state.stores = STORES;
    },
  },
});

export const {
  setStores,
  addStore,
  removeStore,
  reorderStores,
  loadSampleStores,
} = storeSlice.actions;
export default storeSlice.reducer;
