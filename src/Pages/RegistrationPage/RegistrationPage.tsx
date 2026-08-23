import { AuthForm } from "@/features/Auth";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

export const RegistrationPage = () => {
  return (
    <Stack direction="column" gap="32">
      <Typography size="xl" Tag="h1" title="Регистрация" titleMb={16} />
      <AuthForm
        redirectButtonText="Уже зарегистрированы?"
        redirectPath="/login"
        submitButtonText="Зарегистрироваться"
        type="registration"
      />
    </Stack>
  );
};
