import { useEffect, useState } from "react";

import { ITaskList } from "@/entities/List";

import { ITask } from "../../types/task";
import { getUrgentTasks } from "../helpers/getUrgentTasks";

export const useUrgentTasks = (listsLoading: boolean, lists?: ITaskList[]) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isTasksLoading, setIsTasksLoading] = useState(true);

  useEffect(() => {
    if (listsLoading) {
      setIsTasksLoading(true);
      return;
    }

    if (!lists) {
      setTasks([]);
      setIsTasksLoading(false);
      return;
    }

    if (lists.length > 0) {
      const filteredTasks = lists.flatMap((list) => getUrgentTasks(list.tasks));
      setTasks(filteredTasks);
    } else {
      setTasks([]);
    }

    setIsTasksLoading(false);
  }, [lists, listsLoading]);

  return { tasks, isTasksLoading };
};
