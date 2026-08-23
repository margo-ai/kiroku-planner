import { Draggable, Droppable } from "@hello-pangea/dnd";
import classnames from "classnames";
import { memo, useMemo, useState } from "react";

import { ITaskList } from "@/entities/List";
import { Task } from "@/entities/Task";
import { AddTask } from "@/features/AddTask";
import { DeleteList } from "@/features/List";
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

  const newTaskOrder = useMemo(
    () => (tasks.length ? tasks[tasks.length - 1].taskOrder + 1 : 1),
    [tasks]
  );

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <Stack
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          align="flex-start"
          className={classnames(cls.taskListWrapper, {}, [className])}
          direction="column"
          onMouseLeave={() => setIsDeleteButtonVisible(false)}
          onMouseOver={() => setIsDeleteButtonVisible(true)}
        >
          <Stack
            fullWidth
            className={cls.listHeader}
            data-testid="list-header"
            justify="space-between"
          >
            <Typography bold className={cls.title} size="l" title={listTitle} />
            {isDeleteButtonVisible && <DeleteList listId={listId} />}
          </Stack>

          <Droppable direction="vertical" droppableId={listId} type="TASK">
            {(provided, snapshot) => (
              <ul
                {...provided.droppableProps}
                className={classnames(cls.taskList, { [cls.dragOver]: snapshot.isDraggingOver })}
                data-testid="tasks-list"
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <Task
                    createdAt={task.createdAt}
                    description={task.description}
                    finishBy={task.finishBy}
                    index={index}
                    key={task.taskId}
                    listId={listId}
                    priority={task.priority}
                    taskId={task.taskId}
                    taskOrder={task.taskOrder}
                    title={task.title}
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
