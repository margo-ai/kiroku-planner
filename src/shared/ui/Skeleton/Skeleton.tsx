import classNames from "classnames";
import { CSSProperties } from "react";

import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string;
}

export const Skeleton = (props: SkeletonProps) => {
  const { borderRadius, className, height, width } = props;
  const styles: CSSProperties = { height, width, borderRadius };

  return <div className={classNames(cls.skeleton, [className])} style={styles} />;
};
