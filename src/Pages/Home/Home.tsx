import { Button } from "antd";
import { useNavigate } from "react-router";

import { useUserStore } from "../../entities/user/model/userStore";

export const Home = () => {
  const currentUser = useUserStore((state) => state.currentUser);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("data", currentUser);
  // }, [currentUser]);
  return (
    <>
      Hello {currentUser?.name}
      <Button onClick={() => navigate("/boards")}>TO BOARDS</Button>
    </>
  );
};
