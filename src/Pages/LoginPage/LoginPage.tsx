import { AuthForm } from "@/features/Auth";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <Stack className={cls.loginPage} direction="column" gap="32">
      <Typography titleMb={16} title="Вход" Tag="h1" size="xl" align="center" />
      <AuthForm
        type="login"
        submitButtonText="Войти"
        redirectButtonText="Вы у нас впервые?"
        redirectPath="/registration"
      />
    </Stack>
  );
};
