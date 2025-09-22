import classnames from "classnames";
import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";

import cls from "./Stack.module.scss";

type FlexJustify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
type FlexAlign = "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
type FlexDirection = "column" | "column-reverse" | "row" | "row-reverse";
type FlexGap = "4" | "8" | "12" | "24" | "32";

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const justifyClasses: Record<FlexJustify, string> = {
  "flex-start": cls["justify-start"],
  center: cls["justify-center"],
  "flex-end": cls["justify-end"],
  "space-between": cls["justify-between"],
  "space-around": cls["justify-around"]
};

const alignClasses: Record<FlexAlign, string> = {
  "flex-start": cls["align-start"],
  center: cls["align-center"],
  "flex-end": cls["align-end"],
  stretch: cls["align-stretch"],
  baseline: cls["align-baseline"]
};

const directionClasses: Record<FlexDirection, string> = {
  column: cls["direction-column"],
  "column-reverse": cls["direction-column-reverse"],
  row: cls["direction-row"],
  "row-reverse": cls["direction-row-reverse"]
};

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  12: cls.gap12,
  24: cls.gap24,
  32: cls.gap32
};

interface StackProps extends DivProps {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  fullWidth?: boolean;
  fullHeight?: boolean;
  wrap?: boolean;
  className?: string;
  gap?: FlexGap;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>((props, forwardedRef) => {
  const {
    wrap,
    fullWidth,
    fullHeight,
    className,
    children,
    gap,
    direction = "row",
    align = "center",
    justify = "flex-start",
    ...restProps
  } = props;

  const mods = {
    [cls.fullWidth]: fullWidth,
    [cls.fullHeight]: fullHeight,
    [cls.wrap]: wrap
  };
  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap]
  ];

  return (
    <div className={classnames(cls.stack, mods, classes)} ref={forwardedRef} {...restProps}>
      {children}
    </div>
  );
});
