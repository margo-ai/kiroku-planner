import { Draggable } from "@hello-pangea/dnd";
import { message } from "antd";
import classnames from "classnames";
import { FirebaseError } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";
import { memo, useEffect, useMemo, useState } from "react";

import { useAuthContext } from "@/features/Auth";
import { getStringDate } from "@/shared/lib/helpers/getStringDate";
import { Dropdown, DropdownItem } from "@/shared/ui/Dropdown";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import { ITask } from "../../model/types/task";
import { EditTaskModal } from "../EditTaskModal/EditTaskModal";

import cls from "./Task.module.scss";

const mapPriorityToClass: Record<string, string> = {
  Low: "low",
  Medium: "medium",
  High: "high"
};

interface TaskProps extends ITask {
  index: number;
  listId: string;
}

export const Task = memo((props: TaskProps) => {
  const { title, priority, description, createdAt, finishBy, index, taskId, listId } = props;

  const { user } = useAuthContext();

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const priorityClass = mapPriorityToClass[priority];

  const stringCreatedDate = getStringDate(createdAt);
  const stringFinishDate = getStringDate(finishBy);

  const [messageApi, contextHolder] = message.useMessage();

  const taskFields = useMemo(
    () => ({ title, priority, description, finishBy: new Date(finishBy) }),
    [title, priority, description, finishBy]
  );

  const handleDeleteTask = async () => {
    const db = getDatabase();
    const task = ref(db, `users/${user?.uid}/${listId}/tasks/${taskId}`);
    try {
      await remove(task);
      message.success({ content: "Задача удалена!" });
      console.log("Задача удалена!");
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        messageApi.error({ content: error.message });
      } else {
        messageApi.error({ content: "Произошла неизвестная ошибка" });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Draggable draggableId={taskId} index={index}>
        {(provided, snapshot) => (
          <Dropdown
            items={[{ key: "1", content: "Удалить задачу", onClick: handleDeleteTask }]}
            triggerEvent="contextMenu"
          >
            <li
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={classnames(cls.task, {
                [cls.dragging]: snapshot.isDragging,
                [cls.mouseOver]: isMouseOver
              })}
              onClick={() => setIsEditTaskModalOpen(true)}
              onMouseOver={() => setIsMouseOver(true)}
              onMouseOut={() => setIsMouseOver(false)}
            >
              <Stack justify="space-between" className={cls.priorityAndCreatedDate}>
                <Typography
                  className={classnames(cls.priority, cls[priorityClass])}
                  title={priority}
                  size="s"
                />
                <Typography
                  className={cls.createdAt}
                  title={stringCreatedDate}
                  size="s"
                  titleMb={24}
                />
              </Stack>
              <Typography className={cls.titleAndDescr} title={title} text={description} />

              <Typography size="s" title={`Завершить к ${stringFinishDate}`} />
            </li>
          </Dropdown>
        )}
      </Draggable>

      <EditTaskModal
        isModalOpen={isEditTaskModalOpen}
        fields={taskFields}
        taskId={taskId}
        listId={listId}
        onClose={() => setIsEditTaskModalOpen(false)}
      />
    </>
  );
});
