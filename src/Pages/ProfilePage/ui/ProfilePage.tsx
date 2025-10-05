import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { FirebaseError } from "firebase/app";
import { User, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { auth } from "@/config/firebase";
import { useAuthContext } from "@/features/Auth";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./ProfilePage.module.scss";

type Inputs = {
  name?: string;
  photoUrl?: string;
};

const schema: yup.ObjectSchema<Inputs> = yup
  .object({
    name: yup.string().optional(),
    photoUrl: yup.string().optional().url("Введите корректный URL картинки")
  })
  .required();

export const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { user, refreshUser } = useAuthContext();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    setFocus,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
      photoUrl: user?.photo ?? ""
    }
  });

  useEffect(() => {
    if (isEditMode) {
      const id = setTimeout(() => setFocus("name"), 0);
      return () => clearTimeout(id);
    }
  }, [isEditMode]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsEditMode(false);
    console.log(data);
    try {
      await updateProfile(auth.currentUser as User, {
        displayName: data.name,
        photoURL: data.photoUrl
      });
      console.log("Профиль обновлён!");
      messageApi.success({ content: "Профиль обновлён!" });
      refreshUser();
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        messageApi.error({ content: error.message });
      } else {
        messageApi.error({ content: "Произошла неизвестная ошибка" });
      }
    }
  };

  const onCancel = () => {
    setIsEditMode(false);
    reset();
  };

  return (
    <Stack fullWidth className={cls.profilePage} direction="column" gap="24">
      {contextHolder}
      <Stack className={cls.header} gap="12" justify="space-between">
        <Typography bold title="Данные пользователя" Tag="h1" size="l" />
        {isEditMode ? (
          <Stack gap="12">
            <Button color="error" onClick={onCancel}>
              Отмена
            </Button>
            <Button color="success" type="submit" form="profile-form">
              Сохранить
            </Button>
          </Stack>
        ) : (
          <Button onClick={() => setIsEditMode(true)}>Редактировать</Button>
        )}
      </Stack>

      <form
        id="profile-form"
        className={cls.form}
        name="Edit profile form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={cls.inputWrapper}>
          <Typography title="Пользователь" />
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                data-testid="name-input"
                readonly={!isEditMode}
                labelInputGap="32"
                placeholder="Имя пользователя"
                validateErrorMessage={errors.name?.message}
              />
            )}
          />
        </div>

        <div className={cls.inputWrapper}>
          <Typography title="Ссылка на фото" />
          <Controller
            control={control}
            name="photoUrl"
            render={({ field }) => (
              <Input
                {...field}
                data-testid="photo-input"
                readonly={!isEditMode}
                labelInputGap="32"
                placeholder="Photo URL"
                validateErrorMessage={errors.photoUrl?.message}
              />
            )}
          />
        </div>
      </form>
    </Stack>
  );
};
