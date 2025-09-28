import { DropResult } from "@hello-pangea/dnd";
import { useCallback } from "react";

import { ITaskList } from "@/entities/List";

import { handleListDrag } from "../lib/handleListDrag";
import { handleTaskDrag } from "../lib/handleTaskDrag";

export const useDnd = (lists: ITaskList[], userId: string) => {
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result;
      console.log({ result });

      // Если элемент брошен не в допустимую область
      if (!destination) return;

      // Если элемент брошен на то же место
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      if (type === "TASK") {
        handleTaskDrag(destination, source, draggableId, lists, userId);
      }

      if (type === "LIST") {
        handleListDrag(destination, source, lists, userId);
      }
    },
    [lists, userId]
  );

  return { onDragEnd };
};
