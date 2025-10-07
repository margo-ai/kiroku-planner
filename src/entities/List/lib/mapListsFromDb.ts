import { ITask, Priority } from "@/entities/Task";

import { ITaskList } from "../model/types/list";

type DBTask = Omit<ITask, "taskId" | "priority"> & {
  priority: string;
};

type DBTasks = Record<string, DBTask>;
type DBList = {
  listOrder: number;
  listTitle: string;
  tasks?: DBTasks;
};
type DBListsType = Record<string, DBList> | null;

export const mapListsFromDB = (rawData: DBListsType) => {
  if (rawData === null) return [];
  const formattedLists: ITaskList[] = Object.entries(rawData).map(([listId, list]) => {
    const tasks: ITask[] = list.tasks
      ? Object.entries(list.tasks)
          .map(([taskId, task]) => ({ ...task, priority: task.priority as Priority, taskId }))
          .sort((a, b) => a.taskOrder - b.taskOrder)
      : [];

    return { ...list, tasks, listId };
  });

  formattedLists.sort((a, b) => a.listOrder - b.listOrder);

  return formattedLists;
};
