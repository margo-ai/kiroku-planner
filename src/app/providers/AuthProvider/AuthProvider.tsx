import { FirebaseError } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AuthContext, AuthContextType } from "@/features/Auth";

import { auth } from "../../../config/firebase";
import { UserData } from "../../../shared/types";

const mapUser = (firebaseUser: User): UserData => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  name: firebaseUser.displayName,
  photo: firebaseUser.photoURL
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const userData = await createUserWithEmailAndPassword(auth, email, password);
      return userData;
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      return userData;
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);

        setError(error.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("Произошла ошибка входа");
      }
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      const updatedUser = mapUser(auth.currentUser);
      setUser(updatedUser);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = mapUser(currentUser);
        setUser(userData);
      } else {
        setUser(null);
      }

      setError(null);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue: AuthContextType = useMemo(
    () => ({ signUp, signIn, user, logOut, loading, error, refreshUser }),
    [signUp, signIn, user, logOut, loading, error, refreshUser]
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
