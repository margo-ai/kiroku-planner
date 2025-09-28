import classnames from "classnames";
import { CSSProperties, useMemo } from "react";

import cls from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
}

export const Avatar = (props: AvatarProps) => {
  const { className, src, size = 100 } = props;

  const styles = useMemo<CSSProperties>(() => ({ width: size, height: size }), [size]);

  return (
    <img style={styles} className={classnames(cls.avatar, [className])} src={src} alt="Avatar" />
  );
};
