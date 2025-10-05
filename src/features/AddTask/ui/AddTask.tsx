import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { memo, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Priority } from "@/entities/Task";
import { useAuthContext } from "@/features/Auth";
import { useAddTaskMutation } from "@/shared/api/taskApi";
import PlusIcon from "@/shared/assets/icons/plus.svg";
import { priorityOptions } from "@/shared/const/options";
import { Button } from "@/shared/ui/Button";
import { DateInput, Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { Select } from "@/shared/ui/Select";
import { TextArea } from "@/shared/ui/TextArea";
import { Typography } from "@/shared/ui/Typography";

import cls from "./AddTask.module.scss";

interface AddTaskProps {
  listId: string;
  newTaskOrder: number;
}

type Inputs = {
  title: string;
  priority: Priority;
  description?: string;
  finishBy: Date;
};

const schema: yup.ObjectSchema<Inputs> = yup
  .object({
    title: yup.string().required("Название обязательно"),
    description: yup.string().optional(),
    finishBy: yup.date().required("Укажите дату завершения задачи"),
    priority: yup.mixed<Priority>().oneOf(["Low", "Medium", "High"]).required("Укажите приоритет")
  })
  .required();

export const AddTask = memo((props: AddTaskProps) => {
  const { listId, newTaskOrder } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthContext();

  const [addTask] = useAddTaskMutation();

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
      title: "",
      description: "",
      finishBy: new Date(),
      priority: "Low"
    }
  });

  useEffect(() => {
    if (isModalOpen) {
      const id = setTimeout(() => setFocus("title"), 500); // синхронизируем с анимацией модалки
      return () => clearTimeout(id);
    }
  }, [isModalOpen, setFocus]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { title, description, priority, finishBy } = data;
    console.log({ title, description, priority, finishBy: finishBy.getTime() });

    try {
      await addTask({
        taskOrder: newTaskOrder,
        priority: priority,
        title: title,
        description: description,
        createdAt: Date.now(),
        createdBy: user?.name ?? "",
        finishBy: finishBy.getTime(),
        isDone: false,
        userId: user?.uid ?? "",
        listId
      }).unwrap();
      console.log("Задача добавлена!");
      messageApi.success({ content: "Задача добавлена!" });
      handleClose();
    } catch (error) {
      console.error(error);
      messageApi.error({ content: "Произошла неизвестная ошибка" });
    }
  };

  const handleClose = () => {
    reset();
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button
        data-testid="add-task-button"
        variant="clear"
        onClick={() => setIsModalOpen(true)}
        className={cls.addTaskBtn}
      >
        <PlusIcon />
      </Button>
      <Modal dataTestId="add-task-modal" onClose={handleClose} isOpen={isModalOpen}>
        <Typography title="Добавление задачи" titleMb={24} />
        <form className={cls.form} name="Add task form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                data-testid="title-input"
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
                dataTestId="description-input"
                {...field}
                autoFocus
                placeholder="Описание задачи"
              />
            )}
          />

          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select
                {...field}
                autoFocus
                dataTestId="priority-input"
                label="Приоритет"
                options={priorityOptions}
              />
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
            Создать задачу
          </Button>
        </form>
      </Modal>
    </>
  );
});
