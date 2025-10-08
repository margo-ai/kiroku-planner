import { get, onValue, push, ref, remove, set } from "firebase/database";

import { db } from "@/config/firebase";
import { ITaskList } from "@/entities/List";
import { mapListsFromDB } from "@/entities/List/lib/mapListsFromDB";
import { baseApi } from "@/shared/api/baseApi";

export const listApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getListsByUser: build.query<ITaskList[], string>({
      queryFn: async (userId) => {
        const userRef = ref(db, `users/${userId}`);

        const snapshot = await get(userRef);
        const raw = snapshot.val();

        const formattedLists = mapListsFromDB(raw);

        return { data: formattedLists };
      },
      providesTags: ["Lists"],
      async onCacheEntryAdded(userId, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded;

        const userRef = ref(db, `users/${userId}`);

        const unsubscribe = onValue(userRef, (snapshot) => {
          const raw = snapshot.val();

          const formattedLists = mapListsFromDB(raw);

          updateCachedData(() => formattedLists);
        });

        await cacheEntryRemoved;
        unsubscribe();
      }
    }),
    addList: build.mutation<void, { userId: string; listTitle: string; listOrder: number }>({
      queryFn: async ({ listOrder, listTitle, userId }) => {
        try {
          const userBd = ref(db, `users/${userId}`);
          const newList = push(userBd);
          await set(newList, {
            listOrder: listOrder,
            listTitle: listTitle
          });

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Lists"]
    }),
    removeList: build.mutation<void, { userId: string; listId: string }>({
      queryFn: async ({ listId, userId }) => {
        try {
          const list = ref(db, `users/${userId}/${listId}`);
          await remove(list);

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Lists"]
    })
  })
});

export const { useGetListsByUserQuery, useAddListMutation, useRemoveListMutation } = listApi;
