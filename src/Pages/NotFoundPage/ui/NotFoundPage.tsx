import classnames from "classnames";

import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
  className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
  return (
    <Stack data-testid="NotFoundPage" className={classnames(cls.notFoundPage, {}, [className])}>
      <Typography
        align="center"
        size="l"
        title="Страница не найдена"
        //TODO Сделать переадресацию на главную
        text="Венитесь на главную страницу"
      />
    </Stack>
  );
};

export default NotFoundPage;
