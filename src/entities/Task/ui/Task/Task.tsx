import { Draggable } from "@hello-pangea/dnd";
import classnames from "classnames";
import { memo, useEffect, useMemo, useState } from "react";

import { getStringDate } from "@/shared/lib/helpers/getStringDate";
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

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const priorityClass = mapPriorityToClass[priority];

  const stringCreatedDate = getStringDate(createdAt);
  const stringFinishDate = getStringDate(finishBy);

  const taskFields = useMemo(
    () => ({ title, priority, description, finishBy: new Date(finishBy) }),
    [title, priority, description, finishBy]
  );

  useEffect(() => {
    console.log(isEditTaskModalOpen);
  }, [isEditTaskModalOpen]);

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided, snapshot) => (
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
                withoutMargin
                className={classnames(cls.priority, cls[priorityClass])}
                title={priority}
                size="s"
              />
              <Typography
                withoutMargin
                className={cls.createdAt}
                title={stringCreatedDate}
                size="s"
              />
            </Stack>
            <Typography className={cls.titleAndDescr} title={title} text={description} />

            <Typography size="s" title={`Завершить к ${stringFinishDate}`} />
          </li>
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
