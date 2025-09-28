import { ITaskList } from "@/entities/List";

export const transformListsArrayToBDObject = (listsArray: ITaskList[]) => {
  const result = {};
  for (const list of listsArray) {
    const tasksObject = {};

    for (const task of list.tasks) {
      const { taskId, ...taskData } = task;
      //@ts-ignore
      tasksObject[taskId] = { ...taskData };
    }

    const { listId, ...listData } = list;
    //@ts-ignore
    result[listId] = {
      ...listData,
      tasks: { ...tasksObject }
    };
  }

  return result;
};
