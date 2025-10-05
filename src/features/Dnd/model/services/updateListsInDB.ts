import { ref, set } from "firebase/database";

import { db } from "@/config/firebase";
import { ITaskList } from "@/entities/List";

import { transformListsArrayToBDObject } from "../lib/transformListsArrayToBDObject";

export const updateListsInDB = async (taskLists: ITaskList[], userId: string) => {
  const sortedLists = taskLists.map((list) => ({
    ...list,
    tasks: [...list.tasks].sort((a, b) => a.taskOrder - b.taskOrder)
  }));

  const bdFormatData = transformListsArrayToBDObject(sortedLists);

  await set(ref(db, `users/${userId}`), bdFormatData)
    .then(() => {
      console.log("Списки обновлены!");
    })
    .catch((error) => {
      console.log(error);
      throw Error(error.message);
    });
};
