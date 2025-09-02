import { memo } from "react";

import cls from "./Loader.module.scss";

export const Loader = memo(() => {
  return (
    <div className={cls.loaderWrapper}>
      <span className={cls.loader} />
    </div>
  );
});
