import classnames from "classnames";
import {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  memo,
  useEffect,
  useRef,
  useState
} from "react";

import { Stack } from "../Stack";
import { Typography } from "../Typography";

import cls from "./Input.module.scss";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "size" | "readonly">;

type InputSize = "s" | "m" | "l";

type LabelInputGap = "4" | "8" | "12" | "24" | "32";

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  readonly?: boolean;
  size?: InputSize;
  addonLeft?: ReactNode;
  validateErrorMessage?: string;
  labelInputGap?: LabelInputGap;
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
    const {
      className,
      value,
      label,
      autoFocus,
      addonLeft,
      placeholder,
      size = "m",
      type = "text",
      readonly,
      validateErrorMessage,
      labelInputGap = "8",
      onChange,
      onBlur,
      onFocus,

      ...otherProps
    } = props;

    const internalRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      if (autoFocus) {
        setIsFocused(true);
        internalRef.current?.focus();
      }
    }, [autoFocus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const mods = {
      [cls.focused]: isFocused,
      [cls.withAddonLeft]: Boolean(addonLeft),
      [cls.readonly]: readonly
    };

    const input = (
      <div className={classnames(cls.inputWrapper, mods, [className, cls[size]])}>
        {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
        <input
          className={cls.input}
          placeholder={placeholder}
          ref={forwardedRef || internalRef}
          type={type}
          readOnly={readonly}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          {...otherProps}
        />
        {validateErrorMessage && <span className={cls.error}>{validateErrorMessage}</span>}
      </div>
    );

    if (label) {
      return (
        <Stack fullWidth gap={labelInputGap} justify="space-between">
          <Typography title={label} size="s" />
          {input}
        </Stack>
      );
    }

    return input;
  })
);
