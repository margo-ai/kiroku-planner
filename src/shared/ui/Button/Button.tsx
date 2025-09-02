import cn from "classnames";
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

import cls from "./Button.module.scss";

type ButtonVariant = "clear" | "outline" | "filled";

type ButtonColor = "normal" | "success" | "error";

type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  color?: ButtonColor;
}

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const {
    className,
    children,
    variant = "outline",
    size = "m",
    disabled,
    color = "normal",
    ...otherProps
  } = props;

  const mods = {
    [cls.disabled]: disabled
  };

  const classes = [className, cls[variant], cls[size], cls[color]];

  return (
    <button className={cn(cls.button, mods, classes)} disabled={disabled} ref={ref} {...otherProps}>
      {children}
    </button>
  );
});
