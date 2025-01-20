import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { UserData } from "../../../shared/types/common";

interface UserStore {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData) => void;
  resetCurrentUser: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      resetCurrentUser: () => set({ currentUser: null })
    }),
    { name: "UserStore" }
  )
);
