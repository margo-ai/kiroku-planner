import { Button } from "antd";
import { Header as AntdHeader } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../config/firebase";
import { useLogin } from "../../../entities/user/lib/hooks/useLogin";
import { useAuthContext } from "../../../features/Auth/authContext";

export const Header = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuthContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("uid");
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
    <AntdHeader
      style={{
        backgroundColor: "#74afe7",
        color: "#fff",
        fontSize: "30px",
        textTransform: "uppercase",
        textAlign: "center"
      }}
    >
      Kiroku
      {user && <Button onClick={handleLogout}>Logout</Button>}
    </AntdHeader>
  );
};
