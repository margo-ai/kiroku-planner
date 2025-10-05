import { ITask } from "@/entities/Task";

export interface ITaskList {
  listId: string;
  listOrder: number;
  listTitle: string;
  tasks?: ITask[];
}
