import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ordersApi } from "../api/orders";
import { authApi } from "../api/auth";
import { adminApi } from "../api/adminApi";

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ordersApi.middleware)
      .concat(authApi.middleware)
      .concat(adminApi.middleware),
});

setupListeners(store.dispatch);
