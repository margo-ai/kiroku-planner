import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

import { ITaskList } from "@/entities/List";
import { ITask } from "@/entities/Task";

export const useGetLists = (userId?: string) => {
  const [lists, setLists] = useState<ITaskList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const db = getDatabase();
    const userListsRef = ref(db, `users/${userId}`);
    const unsubscribe = onValue(
      userListsRef,
      (snapshot) => {
        const data = snapshot.val();
        setLoading(false);
        console.log(data);

        const formattedLists: ITaskList[] = [];

        Object.entries(data).forEach(([key, value]) => {
          console.log(key, value);
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

          console.log({ tasks });

          formattedLists.push({ ...listValue, tasks, listId: key });
        });

        formattedLists.sort((a, b) => a.listOrder - b.listOrder);
        console.log(formattedLists);

        setLists(formattedLists);
      },
      (error) => {
        setLoading(false);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { lists, loading, error };
};
