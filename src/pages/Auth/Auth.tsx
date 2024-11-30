import { useEffect, useState } from "react";
import { Button, Checkbox, Form, FormProps, Input } from "antd";

import { auth, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import st from "./Auth.module.scss";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await signOut(auth);
  };

  return (
    <form name="Auth form" className={st.form}>
      <label htmlFor="User email">
        Email
        <input
          placeholder="Email..."
          type="email"
          id="User email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="User password">
        Password
        <input
          placeholder="Password..."
          type="password"
          id="User password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button className={st.signInButton} onClick={(e) => signIn(e)}>
        Sign In
      </button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logout}>Logout</button>
    </form>
  );
};
