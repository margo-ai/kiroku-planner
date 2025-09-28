import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { RegistrationForm, useAuthContext } from "@/features/Auth";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./Registration.module.scss";

export const RegistrationPage = () => {
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
    <Stack gap="32" direction="column">
      <Typography title="Регистрация" Tag="h1" size="xl" />
      <RegistrationForm />
    </Stack>
  );
};
