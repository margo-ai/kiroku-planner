import { LoginForm } from "@/features/Auth";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <Stack className={cls.loginPage} direction="column" gap="32">
      <Typography title="Вход" Tag="h1" size="xl" align="center" />
      <LoginForm />
    </Stack>
  );
};
