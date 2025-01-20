import {
  Auth,
  AuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { UserData } from "../../../../shared/types";
import { useUserStore } from "../../index";

export const useLogin = () => {
  const navigate = useNavigate();

  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const resetCurrentUser = useUserStore((state) => state.resetCurrentUser);

  const signIn = (auth: Auth, email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);

        const userData: UserData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        };

        localStorage.setItem("uid", userData.uid);
        setCurrentUser(userData);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const signInWithGoogle = (auth: Auth, googleProvider: AuthProvider) => {
    signInWithPopup(auth, googleProvider)
      .then(({ user }) => {
        console.log(user);

        const userData: UserData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        };

        localStorage.setItem("uid", userData.uid);
        setCurrentUser(userData);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const signUp = (auth: Auth, email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        const userData: UserData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        };

        localStorage.setItem("uid", userData.uid);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const logout = (auth: Auth) => {
    signOut(auth);

    localStorage.removeItem("uid");
    resetCurrentUser();
    navigate("/login");
  };

  return { signIn, signInWithGoogle, signUp, logout };
};
