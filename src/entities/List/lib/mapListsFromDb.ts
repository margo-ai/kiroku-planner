import { ITask } from "@/entities/Task";

import { ITaskList } from "../model/types/list";

type RawTask = Omit<ITask, "taskId">;

type RawTasks = Record<string, RawTask>;
type RawList = {
  listOrder: number;
  listTitle: string;
  tasks?: RawTasks;
};
type RawDataType = Record<string, RawList> | null;

export const mapListsFromDB = (rawData: RawDataType) => {
  if (rawData === null) return [];

  const formattedLists: ITaskList[] = Object.entries(rawData).map(([listId, list]) => {
    const tasks: ITask[] = list.tasks
      ? Object.entries(list.tasks)
          .map(([taskId, task]) => ({ ...task, taskId }))
          .sort((a, b) => a.taskOrder - b.taskOrder)
      : [];

    return { ...list, tasks, listId };
  });

  formattedLists.sort((a, b) => a.listOrder - b.listOrder);

  return formattedLists;
};
