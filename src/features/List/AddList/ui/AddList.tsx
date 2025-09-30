import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { FirebaseError } from "firebase/app";
import { getDatabase, push, ref, set } from "firebase/database";
import { memo, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuthContext } from "@/features/Auth";
import PlusIcon from "@/shared/assets/icons/plus.svg";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { Typography } from "@/shared/ui/Typography";

import cls from "./AddList.module.scss";

interface AddListProps {
  newListOrder: number;
}

type Inputs = {
  listTitle: string;
};

const schema = yup
  .object({
    listTitle: yup.string().required("Название обязательно")
  })
  .required();

export const AddList = memo((props: AddListProps) => {
  const { newListOrder } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthContext();

  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      listTitle: ""
    }
  });

  useEffect(() => {
    if (isModalOpen) {
      const id = setTimeout(() => setFocus("listTitle"), 500); // синхронизируем с анимацией модалки
      return () => clearTimeout(id);
    }
  }, [isModalOpen, setFocus]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { listTitle } = data;

    const db = getDatabase();
    const userBd = ref(db, `users/${user?.uid}`);
    const newList = push(userBd);
    try {
      await set(newList, {
        listOrder: newListOrder,
        listTitle: listTitle
      });
      console.log("Список добавлен!");
      messageApi.success({ content: "Список добавлен!" });
      onModalClose();
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        messageApi.error({ content: error.message });
      } else {
        messageApi.error({ content: "Произошла неизвестная ошибка" });
      }
    }
  };

  const onModalClose = () => {
    reset();
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button variant="clear" onClick={() => setIsModalOpen(true)} className={cls.addListBtn}>
        <PlusIcon />
      </Button>
      <Modal onClose={onModalClose} isOpen={isModalOpen}>
        <Typography title="Создание списка" titleMb={24} />
        <form className={cls.form} name="Add list form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="listTitle"
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                placeholder="Название списка"
                validateErrorMessage={errors.listTitle?.message}
              />
            )}
          />

          <Button type="submit" variant="filled">
            Создать список
          </Button>
        </form>
      </Modal>
    </>
  );
});
