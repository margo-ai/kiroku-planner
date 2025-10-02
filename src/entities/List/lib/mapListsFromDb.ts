import { ITask } from "@/entities/Task";

import { ITaskList } from "../model/types/list";

export const mapListsFromDb = (rawData: any) => {
  const formattedLists: ITaskList[] = [];

  Object.entries(rawData).forEach(([key, value]) => {
    const listValue = value as {
      listOrder: number;
      listTitle: string;
      tasks: ITask[];
    };

    let tasks: ITask[];
    if (listValue["tasks"]) {
      tasks = Object.entries(listValue["tasks"])
        .map(([key, value]) => {
          return { ...value, taskId: key };
        })
        .sort((a, b) => a.taskOrder - b.taskOrder);
    } else {
      tasks = [];
    }

    formattedLists.push({ ...listValue, tasks, listId: key });
  });

  formattedLists.sort((a, b) => a.listOrder - b.listOrder);

  return formattedLists;
};
