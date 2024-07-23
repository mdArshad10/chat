import { configureStore } from "@reduxjs/toolkit";
import { basicApi } from "./apiService";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [basicApi.reducerPath]: basicApi.reducer,
    user: userSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(basicApi.middleware),
  devTools: true,
});
