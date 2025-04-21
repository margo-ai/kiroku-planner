import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider } from "../../config/firebase";
import { useAuthContext } from "../../features/Auth/authContext";
import { UserData } from "../../shared/types/common";

import st from "./Login.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userUid = localStorage.getItem("uid");

  const { user, signIn, signInWithGoogle, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userUid);
  }, [userUid]);

  if (user) {
    navigate(-1);
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    signIn(email, password)
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

  const handleSignInWithGoogle = () => {
    signInWithGoogle(auth, googleProvider)
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

  if (loading) {
    return <>LOADING</>;
  }

  return (
    <form name="Auth form" className={st.form} onSubmit={handleSubmit}>
      <label htmlFor="User email">
        Email
        <Input
          placeholder="Email..."
          type="email"
          id="User email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="User password">
        Password
        <Input
          placeholder="Password..."
          type="password"
          id="User password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <Button htmlType="submit" type="primary">
        Sign In
      </Button>
      <button onClick={() => navigate("/registration")}>Вы у нас впервые?</button>
      <Button type="primary" onClick={handleSignInWithGoogle}>
        Sign In With Google
      </Button>
    </form>
  );
};
