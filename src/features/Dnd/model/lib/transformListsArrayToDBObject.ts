import { ITaskList } from "@/entities/List";

export const transformListsArrayToDBObject = (listsArray: ITaskList[]) => {
  const result = {};
  for (const list of listsArray) {
    const tasksObject = {};

    for (const task of list.tasks) {
      const { taskId, ...taskData } = task;
      //@ts-expect-error: dynamic index on empty object
      tasksObject[taskId] = { ...taskData };
    }

    const { listId, ...listData } = list;
    //@ts-expect-error: dynamic index on empty object
    result[listId] = {
      ...listData,
      tasks: { ...tasksObject }
    };
  }

  return result;
};
