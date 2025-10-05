import { AuthForm } from "@/features/Auth";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

export const RegistrationPage = () => {
  return (
    <Stack gap="32" direction="column">
      <Typography title="Регистрация" Tag="h1" size="xl" titleMb={16} />
      <AuthForm
        type="registration"
        submitButtonText="Зарегистрироваться"
        redirectButtonText="Уже зарегистрированы?"
        redirectPath="/login"
      />
    </Stack>
  );
};
