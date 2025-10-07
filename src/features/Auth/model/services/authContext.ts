import { createContext, useContext } from "react";

import { AuthContextType } from "../types";

const AuthDefaultContextValue: AuthContextType = {
  signUp: () => Promise.resolve(undefined),
  signIn: () => Promise.resolve(undefined),
  logOut: () => Promise.resolve(),
  refreshUser: () => Promise.resolve(),
  user: null,
  loading: true,
  error: null
};

export const AuthContext = createContext<AuthContextType>(AuthDefaultContextValue);
export const useAuthContext = () => useContext(AuthContext);
