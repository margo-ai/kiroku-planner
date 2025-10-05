import { Link, useNavigate } from "react-router-dom";

import { Task } from "@/entities/Task";
import { useUrgentTasks } from "@/entities/Task";
import { useAuthContext } from "@/features/Auth";
import { useGetListsByUserQuery } from "@/shared/api/listApi";
import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./HomePage.module.scss";

const HomePage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { data: lists, isLoading } = useGetListsByUserQuery(user?.uid || "");

  const { tasks, isTasksLoading } = useUrgentTasks(isLoading, lists);

  const onClick = () => {
    navigate("/board");
  };

  if (isTasksLoading) {
    return (
      <Stack fullWidth direction="column">
        <Typography title="Загрузка задач..." Tag="h1" size="l" titleMb={24} />
      </Stack>
    );
  }

  if (tasks.length > 0) {
    return (
      <Stack data-testid="main-page" fullWidth direction="column">
        <Typography title="Задачи на ближайшие 3 дня" Tag="h1" size="xl" titleMb={24} />
        <ul className={cls.tasksList}>
          {tasks?.map((task, index) => (
            <Link key={task.taskId} to={"/board"}>
              <Task
                isDraggable={false}
                index={index}
                key={task.taskId}
                title={task.title}
                description={task.description}
                priority={task.priority}
                taskId={task.taskId}
                taskOrder={task.taskOrder}
                createdAt={task.createdAt}
                finishBy={task.finishBy}
              />
            </Link>
          ))}
        </ul>
      </Stack>
    );
  }

  return (
    <Stack data-testid="main-page" fullWidth direction="column">
      <Typography title="Срочных задач нет" Tag="h1" size="l" titleMb={24} />
      <Button onClick={onClick}>Перейти к задачам</Button>
    </Stack>
  );
};

export default HomePage;
