import classnames from "classnames";
import { TextareaHTMLAttributes, forwardRef, memo, useState } from "react";

import cls from "./TextArea.module.scss";

type HTMLTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, HTMLTextAreaProps>((props, forwardedRef) => {
    const { className, rows = 4, onFocus, onBlur, ...otherProps } = props;

    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    return (
      <textarea
        className={classnames(cls.textArea, { [cls.focused]: isFocused }, [className])}
        rows={rows}
        ref={forwardedRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...otherProps}
      />
    );
  })
);
