import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import classnames from "classnames";
import { useMemo } from "react";

import { useAuthContext } from "@/features/Auth";
import { useDnd } from "@/features/Dnd";
import { AddList } from "@/features/List/AddList";
import { useGetLists } from "@/features/List/GetList";
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

  const { error, lists, loading } = useGetLists(user?.uid);

  const newListOrder = useMemo(
    () => (lists.length ? lists[lists.length - 1].listOrder + 1 : 0),
    [lists]
  );

  const { onDragEnd } = useDnd(lists, user?.uid ?? "");

  if (loading) {
    return <Loader />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="LIST" direction="horizontal">
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            align="flex-start"
            gap="32"
            className={classnames(cls.boardPage, {}, [className])}
          >
            {lists.map((taskList, index) => (
              <TaskList key={taskList.listId} list={taskList} index={index} />
            ))}
            {provided.placeholder}
            <AddList newListOrder={newListOrder} />
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BoardPage;
