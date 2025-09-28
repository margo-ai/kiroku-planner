import { RouterProvider } from "../../providers/RouterProvider";

import cls from "./Content.module.scss";

export const Content = () => {
  return (
    <main className={cls.content}>
      <RouterProvider />
    </main>
  );
};
