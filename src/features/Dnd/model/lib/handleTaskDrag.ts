import { DraggableLocation } from "@hello-pangea/dnd";

import { ITaskList } from "@/entities/List";

import { updateListsInDB } from "../services/updateListsInDB";

export const handleTaskDrag = async (
  destination: DraggableLocation<string>,
  source: DraggableLocation<string>,
  draggableId: string,
  lists: ITaskList[],
  userId: string
) => {
  console.log({ lists });

  const newTaskLists = structuredClone(lists);

  const sourceListIndex = newTaskLists.findIndex((list) => list.listId === source.droppableId);
  const destListIndex = newTaskLists.findIndex((list) => list.listId === destination.droppableId);

  const sourceList = newTaskLists[sourceListIndex];
  const destList = newTaskLists[destListIndex];

  const taskIndex = sourceList.tasks.findIndex((task) => task.taskId === draggableId);
  const [movedTask] = sourceList.tasks.splice(taskIndex, 1);

  destList.tasks.splice(destination.index, 0, movedTask);

  if (source.droppableId !== destination.droppableId) {
    sourceList.tasks.forEach((task, index) => {
      task.taskOrder = index;
    });
  }

  destList.tasks.forEach((task, index) => {
    task.taskOrder = index;
  });

  console.log({ newTaskLists });
  await updateListsInDB(newTaskLists, userId);
};
