import { AuthForm } from "@/features/Auth";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <Stack className={cls.loginPage} direction="column" gap="32">
      <Typography align="center" size="xl" Tag="h1" title="Вход" titleMb={16} />
      <AuthForm
        redirectButtonText="Вы у нас впервые?"
        redirectPath="/registration"
        submitButtonText="Войти"
        type="login"
      />
    </Stack>
  );
};
