import { Draggable } from "@hello-pangea/dnd";
import { message } from "antd";
import classnames from "classnames";
import { memo, useMemo, useState } from "react";

import { useAuthContext } from "@/features/Auth";
import { useDeleteTaskMutation } from "@/shared/api/taskApi";
import { getStringDate } from "@/shared/lib/helpers/getStringDate";
import { Dropdown } from "@/shared/ui/Dropdown";
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
  listId?: string;
  isDraggable?: boolean;
}

export const Task = memo((props: TaskProps) => {
  const {
    title,
    priority,
    description,
    createdAt,
    finishBy,
    index,
    taskId,
    listId,
    isDraggable = true
  } = props;

  const { user } = useAuthContext();

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const priorityClass = mapPriorityToClass[priority];

  const stringCreatedDate = getStringDate(createdAt);
  const stringFinishDate = getStringDate(finishBy);

  const [deleteTask] = useDeleteTaskMutation();

  const [messageApi, contextHolder] = message.useMessage();

  const taskFields = useMemo(
    () => ({ title, priority, description, finishBy: new Date(finishBy) }),
    [title, priority, description, finishBy]
  );

  const handleDeleteTask = async () => {
    try {
      await deleteTask({ listId: listId || "y", taskId, userId: user?.uid || "" }).unwrap();
      message.success({ content: "Задача удалена!" });
    } catch (error) {
      console.error(error);
      messageApi.error({ content: "Произошла неизвестная ошибка" });
    }
  };

  if (isDraggable) {
    return (
      <>
        {contextHolder}
        <Draggable draggableId={taskId} index={index}>
          {(provided, snapshot) => (
            <Dropdown
              menu={[{ key: "1", content: "Удалить задачу", onClick: handleDeleteTask }]}
              trigger={["contextMenu"]}
            >
              <li
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                data-testid="task-item"
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
          listId={listId || ""}
          onClose={() => setIsEditTaskModalOpen(false)}
        />
      </>
    );
  }
  return (
    <li
      className={classnames(cls.task)}
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
        <Typography className={cls.createdAt} title={stringCreatedDate} size="s" titleMb={24} />
      </Stack>
      <Typography className={cls.titleAndDescr} title={title} text={description} />

      <Typography size="s" title={`Завершить к ${stringFinishDate}`} />
    </li>
  );
});
