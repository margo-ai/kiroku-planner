import { createContext, useContext } from "react";

import { AuthContextType } from "../types";

const AuthDefaultContextValue: AuthContextType = {
  async signUp() {
    throw new Error("AuthProvider not mounted");
  },
  async signIn() {
    throw new Error("AuthProvider not mounted");
  },
  async logOut() {
    throw new Error("AuthProvider not mounted");
  },
  user: null,
  loading: true,
  error: null
};

export const AuthContext = createContext<AuthContextType>(AuthDefaultContextValue);
export const useAuthContext = () => useContext(AuthContext);
