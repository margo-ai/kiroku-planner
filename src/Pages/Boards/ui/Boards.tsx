import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const Boards = () => {
  const navigate = useNavigate();

  return (
    <div>
      BOARDS<Button onClick={() => navigate("/")}>TO HOME</Button>
    </div>
  );
};
