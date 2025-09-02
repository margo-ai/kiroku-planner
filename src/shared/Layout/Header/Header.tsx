import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../features/AuthForm/model/services/authContext";
import { Stack } from "../../ui/Stack";

import cls from "./Header.module.scss";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";

export const Header = () => {
  const navigate = useNavigate();
  const { logOut, user, loading } = useAuthContext();

  useEffect(() => {
    console.log(user, loading);
  }, [user, loading]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  // const updateData = async () => {
  //   if (currentUser) {
  //     await updateProfile(currentUser, {
  //       displayName: "Tony Stark",
  //       photoURL:
  //         "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/tony_stark.png"
  //     });
  //   }
  // };

  return (
    <header>
      <Stack fullHeight className={cls.header} justify="center">
        Kiroku
        {user && <Button onClick={handleLogout}>Logout</Button>}
        <div className={cls.userName}>{user && user.name}</div>
        <ThemeSwitcher />
      </Stack>
    </header>
  );
};
