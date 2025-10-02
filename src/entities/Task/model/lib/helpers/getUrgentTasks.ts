import { ITask } from "@/entities/Task";

export const getUrgentTasks = (tasks: ITask[]) => {
  const now = new Date();

  // начало сегодняшнего дня (00:00:00)
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTodayMs = startOfToday.getTime();

  // нонец сегодняшнего дня (23:59:59.999)
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);
  const endOfThirdDayMs = endOfToday.getTime() + 172800000; // 172800000 - количество миллисекунд в двух сутках

  return tasks.filter(
    (task) => task.finishBy >= startOfTodayMs && task.finishBy <= endOfThirdDayMs
  );
};
