import { Link, useNavigate } from "react-router-dom";

import { Task } from "@/entities/Task";
import { useUrgentTasks } from "@/entities/Task";
import { useAuthContext } from "@/features/Auth";
import { useGetListsByUserQuery } from "@/features/List";
import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./HomePage.module.scss";

const HomePage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { data: lists, isLoading } = useGetListsByUserQuery(user?.uid || "");

  const { tasks, isTasksLoading } = useUrgentTasks(isLoading, lists);

  const handleClick = () => {
    navigate("/board");
  };

  if (isTasksLoading) {
    return (
      <Stack fullWidth direction="column">
        <Typography size="l" Tag="h1" title="Загрузка задач..." titleMb={24} />
      </Stack>
    );
  }

  if (tasks.length > 0) {
    return (
      <Stack fullWidth data-testid="main-page" direction="column">
        <Typography size="xl" Tag="h1" title="Задачи на ближайшие 3 дня" titleMb={24} />
        <ul className={cls.tasksList}>
          {tasks?.map((task, index) => (
            <Link key={task.taskId} to={"/board"}>
              <Task
                createdAt={task.createdAt}
                description={task.description}
                finishBy={task.finishBy}
                index={index}
                isDraggable={false}
                key={task.taskId}
                priority={task.priority}
                taskId={task.taskId}
                taskOrder={task.taskOrder}
                title={task.title}
              />
            </Link>
          ))}
        </ul>
      </Stack>
    );
  }

  return (
    <Stack fullWidth data-testid="main-page" direction="column">
      <Typography size="l" Tag="h1" title="Срочных задач нет" titleMb={24} />
      <Button onClick={handleClick}>Перейти к задачам</Button>
    </Stack>
  );
};

export default HomePage;
