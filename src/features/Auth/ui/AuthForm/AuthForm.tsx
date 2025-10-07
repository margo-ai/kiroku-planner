import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

import { useAuthContext } from "../../model/services/authContext";

import cls from "./AuthForm.module.scss";

type AuthFormType = "login" | "registration";

export type AuthFormInputs = {
  email: string;
  password: string;
  confirmPassword?: string;
};

interface AuthFormProps {
  type: AuthFormType;
  submitButtonText: string;
  redirectPath: string;
  redirectButtonText: string;
}

const getValidationSchema = (type: AuthFormType) => {
  const baseSchema = {
    email: yup.string().email("Введите корректный email").required("Email обязателен"),
    password: yup.string().min(8, "Минимум 8 символов").required("Пароль обязателен")
  };

  if (type === "registration") {
    return yup.object({
      ...baseSchema,
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Пароли не совпадают")
        .required("Пароль обязателен")
    });
  }

  return yup.object(baseSchema);
};
export const AuthForm = (props: AuthFormProps) => {
  const { type, redirectButtonText, redirectPath, submitButtonText } = props;

  const schema = getValidationSchema(type);
  const isConfirmPasswordNeed = type === "registration";

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(isConfirmPasswordNeed && { confirmPassword: "" })
    }
  });

  const { user, signIn, error, signUp } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    const { email, password } = data;

    if (type === "login") {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  if (error) {
    return (
      <div className={cls.formWrapper}>
        <Typography titleMb={16} size="l" title={`Произошла ошибка: ${error}`} />
        <Button variant="outline" onClick={() => window.location.reload()}>
          Обновить страницу
        </Button>
      </div>
    );
  }

  return (
    <div className={cls.formWrapper}>
      <form
        data-testid="auth-form"
        className={cls.form}
        name="Auth form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              autoFocus
              data-testid="email-input"
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
              data-testid="password-input"
              placeholder="Введите пароль"
              type="password"
              validateErrorMessage={errors.password?.message}
            />
          )}
        />

        {isConfirmPasswordNeed && (
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input
                {...field}
                data-testid="password-confirm-input"
                placeholder="Повторите пароль"
                type="password"
                validateErrorMessage={errors.confirmPassword?.message}
              />
            )}
          />
        )}

        <Button data-testid="submit-button" type="submit" variant="filled">
          {submitButtonText}
        </Button>
      </form>
      <Button
        data-testid="redirect-to-registration"
        variant="clear"
        onClick={() => navigate(redirectPath)}
      >
        {redirectButtonText}
      </Button>
    </div>
  );
};
