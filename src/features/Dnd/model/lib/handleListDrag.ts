import { DraggableLocation } from "@hello-pangea/dnd";

import { ITaskList } from "@/entities/List";

import { updateListsInDB } from "../services/updateListsInDB";

export const handleListDrag = async (
  destination: DraggableLocation<string>,
  source: DraggableLocation<string>,
  lists: ITaskList[],
  userId: string
) => {
  if (destination.droppableId === source.droppableId) {
    const newTaskLists = structuredClone(lists);

    const [removed] = newTaskLists.splice(source.index, 1);
    newTaskLists.splice(destination.index, 0, removed);
    const updatedLists = newTaskLists.map((list, index) => ({
      ...list,
      listOrder: index
    }));

    await updateListsInDB(updatedLists, userId);
  }
};
