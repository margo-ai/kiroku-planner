import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import classnames from "classnames";
import { useMemo } from "react";

import { useAuthContext } from "@/features/Auth";
import { useDnd } from "@/features/Dnd";
import { AddList, useGetListsByUserQuery } from "@/features/List";
import { Loader } from "@/shared/ui/Loader";
import { Stack } from "@/shared/ui/Stack";
import { TaskList } from "@/widgets/TaskList";

import cls from "./BoardPage.module.scss";

interface BoardProps {
  className?: string;
}

const BoardPage = (props: BoardProps) => {
  const { className } = props;
  const { user } = useAuthContext();

  const { data: lists, isLoading } = useGetListsByUserQuery(user?.uid || "");
  const newListOrder = useMemo(
    () => (lists?.length ? lists[lists.length - 1].listOrder + 1 : 0),
    [lists]
  );

  const { onDragEnd } = useDnd(lists ?? [], user?.uid ?? "");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction="horizontal" droppableId="board" type="LIST">
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            align="flex-start"
            className={classnames(cls.boardPage, {}, [className])}
            gap="32"
            ref={provided.innerRef}
          >
            {lists?.map((taskList, index) => (
              <TaskList index={index} key={taskList.listId} list={taskList} />
            ))}
            {provided.placeholder}
            <AddList listOrder={newListOrder} />
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BoardPage;
