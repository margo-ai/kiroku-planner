import { Button, Input } from "antd";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../../config/firebase";
import { useAuthContext } from "../../../features/Auth/authContext";

import st from "./Registration.module.scss";

export const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = auth.currentUser;

  const navigate = useNavigate();

  const { signUp, user, loading } = useAuthContext();

  const updateData = async () => {
    if (currentUser) {
      await updateProfile(currentUser, {
        displayName: "Tony Stark",
        photoURL:
          "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/tony_stark.png"
      });
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signUp(email, password)
      .then(({ user }) => {
        updateProfile(user, {
          displayName: name
        });
        localStorage.setItem("uid", user.uid);
        navigate("/");
        console.log(user);
      })
      .catch((error) => console.error(error));
  };

  if (user) {
    navigate("/");
  }

  if (loading) {
    return <>LOADING</>;
  }

  return (
    <>
      <form name="Registration form" className={st.form} onSubmit={handleSubmit}>
        <label htmlFor="User name">
          Email
          <Input
            placeholder="Name..."
            type="text"
            id="User name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
          Sign Up
        </Button>
        <Button onClick={updateData}>Update user data</Button>
        <Link to="/">Nav to Home</Link>
      </form>
      <button onClick={() => navigate("/login")}>Уже зарегистрированы?</button>
    </>
  );
};
