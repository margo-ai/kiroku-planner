import { configureStore } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { Provider } from "react-redux";

import { userReducer } from "@/entities/User";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = configureStore({
    reducer: { userReducer },
    devTools: process.env.NODE_ENV !== "production"
  });

  return <Provider store={store}>{children}</Provider>;
};
