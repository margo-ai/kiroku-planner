import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuthContext } from "@/features/Auth";
import { useUpdateTaskMutation } from "@/shared/api/taskApi";
import { priorityOptions } from "@/shared/const/options";
import { Button } from "@/shared/ui/Button";
import { DateInput, Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { Select } from "@/shared/ui/Select";
import { TextArea } from "@/shared/ui/TextArea";
import { Typography } from "@/shared/ui/Typography";

import { Priority } from "../../model/types/task";

import cls from "./EditTaskModal.module.scss";

interface ITaskFields {
  title: string;
  priority: Priority;
  finishBy: Date;
  description?: string;
}

interface EditTaskModalProps {
  isModalOpen: boolean;
  fields: ITaskFields;
  taskId: string;
  listId: string;
  onClose: () => void;
}

const schema: yup.ObjectSchema<ITaskFields> = yup
  .object({
    title: yup.string().required("Название обязательно"),
    description: yup.string().optional(),
    finishBy: yup.date().required("Укажите дату завершения задачи"),
    priority: yup.mixed<Priority>().oneOf(["Low", "Medium", "High"]).required("Укажите приоритет")
  })
  .required();

export const EditTaskModal = (props: EditTaskModalProps) => {
  const { isModalOpen, fields, taskId, listId, onClose } = props;
  const { title, description, priority, finishBy } = fields;

  const { user } = useAuthContext();

  const [updateTask] = useUpdateTaskMutation();

  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors }
  } = useForm<ITaskFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      title,
      description,
      finishBy,
      priority
    }
  });

  useEffect(() => {
    if (isModalOpen) {
      const id = setTimeout(() => setFocus("title"), 500); // синхронизация с анимацией модалки
      return () => clearTimeout(id);
    }
  }, [isModalOpen]);

  const onSubmit: SubmitHandler<ITaskFields> = async (data) => {
    try {
      await updateTask({
        listId,
        userId: user?.uid || "",
        taskId,
        taskData: { ...data, finishBy: data.finishBy.getTime() }
      }).unwrap();
      messageApi.success({ content: "Задача изменена!" });
      onClose();
    } catch (error) {
      console.error(error);
      messageApi.error({ content: "Произошла неизвестная ошибка" });
    }
  };

  return (
    <>
      {contextHolder}
      <Modal dataTestId="edit-task-modal" isOpen={isModalOpen} onClose={onClose}>
        <Typography title="Редактирование" titleMb={16} />
        <form className={cls.form} name="Edit task form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                placeholder="Название задачи"
                validateErrorMessage={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextArea
                {...field}
                autoFocus
                dataTestId="description-input"
                placeholder="Описание задачи"
              />
            )}
          />

          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select {...field} autoFocus label="Приоритет" options={priorityOptions} />
            )}
          />

          <Controller
            control={control}
            name="finishBy"
            render={({ field }) => (
              <DateInput {...field} autoFocus label="Завершить к" placeholder="Дата завершения" />
            )}
          />

          <Button type="submit" variant="filled">
            Готово
          </Button>
        </form>
      </Modal>
    </>
  );
};
