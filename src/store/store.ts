import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import artworksSlice from "./slices/artworksSlice";

export const store = configureStore({
  reducer: {
    artworks: artworksSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
