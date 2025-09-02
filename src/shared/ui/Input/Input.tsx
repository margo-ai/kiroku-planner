import cn from "classnames";
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

import cls from "./Input.module.scss";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "size">;

type InputSize = "s" | "m" | "l";

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  autofocus?: boolean;
  size?: InputSize;
  addonLeft?: ReactNode;
  validateErrorMessage?: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
    const {
      className,
      value,
      label,
      autofocus,
      addonLeft,
      placeholder,
      size = "m",
      type = "text",
      validateErrorMessage,
      onChange,
      onBlur,
      onFocus,
      ...otherProps
    } = props;

    const internalRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      if (autofocus) {
        setIsFocused(true);
        internalRef.current?.focus();
      }
    }, []);

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

    const mods = { [cls.focused]: isFocused, [cls.withAddonLeft]: Boolean(addonLeft) };

    const input = (
      <div className={cn(cls.inputWrapper, mods, [className, cls[size]])}>
        {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
        <input
          className={cls.input}
          placeholder={placeholder}
          ref={forwardedRef || internalRef}
          type={type}
          value={value || ""}
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
        <Stack fullWidth gap="8">
          <h3>{label}</h3>
          {input}
        </Stack>
      );
    }

    return input;
  })
);
