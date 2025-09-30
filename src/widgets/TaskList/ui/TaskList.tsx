import { Draggable, Droppable } from "@hello-pangea/dnd";
import classnames from "classnames";
import { memo, useEffect, useState } from "react";

import { ITaskList } from "@/entities/List";
import { Task } from "@/entities/Task";
import { AddTask } from "@/features/AddTask";
import { DeleteList } from "@/features/List/DeleteList";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./TaskList.module.scss";

interface TaskListProps {
  list: ITaskList;
  index: number;
  className?: string;
}

export const TaskList = memo((props: TaskListProps) => {
  const { className, list, index } = props;

  const { listTitle, tasks, listId } = list;

  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  const newTaskOrder = tasks.length ? tasks[tasks.length - 1].taskOrder + 1 : 1;

  useEffect(() => {
    console.log({ tasks });
  }, [tasks]);

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <Stack
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          align="flex-start"
          direction="column"
          className={classnames(cls.taskListWrapper, {}, [className])}
          onMouseOver={() => setIsDeleteButtonVisible(true)}
          onMouseLeave={() => setIsDeleteButtonVisible(false)}
        >
          <Stack fullWidth justify="space-between" className={cls.listHeader}>
            <Typography bold size="l" title={listTitle} className={cls.title} />
            {isDeleteButtonVisible && <DeleteList listId={listId} />}
          </Stack>

          <Droppable droppableId={listId} type="TASK" direction="vertical">
            {(provided, snapshot) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classnames(cls.taskList, { [cls.dragOver]: snapshot.isDraggingOver })}
              >
                {tasks.map((task, index) => (
                  <Task
                    index={index}
                    key={task.taskId}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    taskId={task.taskId}
                    taskOrder={task.taskOrder}
                    createdAt={task.createdAt}
                    finishBy={task.finishBy}
                    listId={listId}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <AddTask listId={listId} newTaskOrder={newTaskOrder} />
        </Stack>
      )}
    </Draggable>
  );
});
