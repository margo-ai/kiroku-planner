import { push, ref, remove, set, update } from "firebase/database";

import { db } from "@/config/firebase";
import { Priority } from "@/entities/Task";
import { baseApi } from "@/shared/api/rtk/baseApi";

interface INewTask {
  userId: string;
  listId: string;
  taskOrder: number;
  priority: Priority;
  title: string;
  createdAt: number;
  createdBy: string;
  finishBy: number;
  isDone: boolean;
  description?: string;
}

interface IEditTask {
  userId: string;
  listId: string;
  taskId: string;
  taskData: { title: string; priority: Priority; finishBy: number; description?: string };
}

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTask: build.mutation<void, INewTask>({
      queryFn: async ({
        createdAt,
        createdBy,
        description,
        finishBy,
        isDone,
        listId,
        priority,
        taskOrder,
        title,
        userId
      }) => {
        try {
          const taskList = ref(db, `users/${userId}/${listId}/tasks`);
          const newTask = push(taskList);
          await set(newTask, {
            createdAt,
            createdBy,
            description,
            finishBy,
            isDone,
            priority,
            taskOrder,
            title
          });

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Tasks"]
    }),
    deleteTask: build.mutation<void, { userId: string; listId: string; taskId: string }>({
      queryFn: async ({ listId, taskId, userId }) => {
        try {
          const taskToDelete = ref(db, `users/${userId}/${listId}/tasks/${taskId}`);
          await remove(taskToDelete);

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Tasks"]
    }),
    updateTask: build.mutation<void, IEditTask>({
      queryFn: async ({ userId, listId, taskId, taskData }) => {
        try {
          const taskRef = ref(db, `users/${userId}/${listId}/tasks/${taskId}`);
          await update(taskRef, { ...taskData });

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Tasks"]
    })
  })
});

export const { useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi;
