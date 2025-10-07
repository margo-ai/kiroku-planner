import { ref, set } from "firebase/database";

import { db } from "@/config/firebase";
import { ITaskList } from "@/entities/List";

import { transformListsArrayToDBObject } from "../lib/transformListsArrayToDBObject";

export const updateListsInDB = async (taskLists: ITaskList[], userId: string) => {
  const sortedLists = taskLists.map((list) => ({
    ...list,
    tasks: [...list.tasks].sort((a, b) => a.taskOrder - b.taskOrder)
  }));

  const dbFormatData = transformListsArrayToDBObject(sortedLists);

  await set(ref(db, `users/${userId}`), dbFormatData)
    .then(() => {
      console.log("Списки обновлены!");
    })
    .catch((error) => {
      console.error(error);
      throw Error(error.message);
    });
};
