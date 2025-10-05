import { configureStore } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { Provider } from "react-redux";

import { baseApi } from "@/shared/api/rtk/baseApi";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = configureStore({
    reducer: { [baseApi.reducerPath]: baseApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production"
  });

  return <Provider store={store}>{children}</Provider>;
};
