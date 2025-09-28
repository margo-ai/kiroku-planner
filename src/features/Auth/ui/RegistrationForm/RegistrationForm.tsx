import { yupResolver } from "@hookform/resolvers/yup";
import { memo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

import { useAuthContext } from "../../model/services/authContext";

import cls from "./RegistrationForm.module.scss";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object({
    email: yup.string().email("Введите корректный email").required("Email обязателен"),
    password: yup.string().min(8, "Минимум 8 символов").required("Пароль обязателен"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Пароль обязателен")
  })
  .required();

export const RegistrationForm = memo(() => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  const { signUp, user, error } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    await signUp(email, password);
  };

  if (error) {
    return <>произошла ошибка {error}</>;
  }
  if (user) {
    navigate("/");
  }

  return (
    <div className={cls.formWrapper}>
      <form className={cls.form} name="Registration form" onSubmit={handleSubmit(onSubmit)}>
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

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Повторите пароль"
              type="password"
              validateErrorMessage={errors.confirmPassword?.message}
            />
          )}
        />

        <Button type="submit" variant="filled">
          Зарегистрироваться
        </Button>
        <Button variant="clear" onClick={() => navigate("/login")}>
          Уже зарегистрированы?
        </Button>
      </form>
    </div>
  );
});
