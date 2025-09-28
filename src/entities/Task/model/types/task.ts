export type Priority = "Low" | "Medium" | "High";

export interface ITask {
  taskId: string;
  taskOrder: number;
  priority: Priority;
  title: string;
  finishBy: number;
  createdAt: number;
  description?: string;
  updatedAt?: Date;
  createdBy?: string;
  isDone?: boolean;
}
