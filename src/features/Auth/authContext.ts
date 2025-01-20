import { Auth, AuthProvider, UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext } from "react";

import { auth } from "../../config/firebase";
import { UserData } from "../../shared/types";

interface AuthContextType {
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: (auth: Auth, googleProvider: AuthProvider) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  user: UserData | null;
  loading: boolean;
}

const AuthDefaultContextValue = {
  signUp: async () => {
    throw new Error("signUp function is not implemented");
  },
  signIn: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Ошибка при входе:", error);
      throw error; // пробрасываем ошибку дальше
    }
  },
  signInWithGoogle: async (auth: Auth, googleProvider: AuthProvider) => {
    throw new Error("signInWithGoogle function is not implemented");
  },
  logOut: async () => {
    await auth.signOut();
  },
  user: null,
  loading: false
};

export const AuthContext = createContext<AuthContextType>(AuthDefaultContextValue);
export const useAuthContext = () => useContext(AuthContext);
