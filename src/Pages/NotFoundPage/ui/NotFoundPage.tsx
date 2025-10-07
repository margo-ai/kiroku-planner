import classnames from "classnames";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
  className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const navigate = useNavigate();

  return (
    <Stack direction="column" className={classnames(cls.notFoundPage, {}, [className])}>
      <Typography align="center" size="l" title="Страница не найдена" titleMb={16} />
      <Button variant="outline" onClick={() => navigate("/")}>
        Вернуться на главную страницу
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
