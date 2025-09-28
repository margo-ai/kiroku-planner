import { yupResolver } from "@hookform/resolvers/yup";
import { memo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

import { useAuthContext } from "../../model/services/authContext";

import cls from "./LoginForm.module.scss";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email("Введите корректный email").required("Email обязателен"),
    password: yup.string().min(8, "Минимум 8 символов").required("Пароль обязателен")
  })
  .required();

export const LoginForm = memo(() => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const { user, signIn, error } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    await signIn(email, password);
  };

  if (error) {
    return <>произошла ошибка {error}</>;
  }

  if (user) {
    navigate("/");
  }

  return (
    <div className={cls.formWrapper}>
      <form className={cls.form} name="Auth form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              autoFocus
              placeholder="Введите почту"
              validateErrorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Введите пароль"
              type="password"
              validateErrorMessage={errors.password?.message}
            />
          )}
        />

        <Button type="submit" variant="filled">
          Войти
        </Button>
      </form>
      <Button variant="clear" onClick={() => navigate("/registration")}>
        Вы у нас впервые?
      </Button>
    </div>
  );
});
