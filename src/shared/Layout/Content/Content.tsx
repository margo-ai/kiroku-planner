import { RouterProvider } from "../../../app/providers/RouterProvider/ui/RouterProvider";

import cls from "./Content.module.scss";

export const Content = () => {
  return (
    <div className={cls.content}>
      <RouterProvider />
    </div>
  );
};
