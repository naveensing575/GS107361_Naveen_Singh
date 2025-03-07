import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storesSlice";
import skuReducer from "./skuSlice";
import planningReducer from "./planningSlice";

export const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
    planning: planningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
