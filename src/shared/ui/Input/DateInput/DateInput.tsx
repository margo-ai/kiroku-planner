import classnames from "classnames";
import { ru } from "date-fns/locale/ru";
import { InputHTMLAttributes, forwardRef, memo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Stack } from "../../Stack";
import cls from "../Input.module.scss";

type InputSize = "s" | "m" | "l";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "size" | "onChange">;

interface DateInputProps extends HTMLInputProps {
  value: Date | null;
  size?: InputSize;
  label?: string;
  onChange?: (
    date: Date | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
}

export const DateInput = memo(
  forwardRef<DatePicker, DateInputProps>((props, forwardedRef) => {
    const { label, size = "m", value, onChange, onBlur, onFocus } = props;

    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const dateInput = (
      <div className={classnames(cls.inputWrapper, { [cls.focused]: isFocused }, [cls[size]])}>
        <DatePicker
          className={cls.input}
          name="Date"
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          locale={ru}
          ref={forwardedRef}
          selected={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
    );

    if (label) {
      return (
        <Stack fullWidth gap="8">
          <h3>{label}</h3>
          {dateInput}
        </Stack>
      );
    }

    return dateInput;
  })
);
