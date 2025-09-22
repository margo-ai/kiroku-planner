import { Select as AntdSelect } from "antd";
import { SelectProps as AntdSelectProps } from "antd/lib";
import classnames from "classnames";
import { forwardRef, memo } from "react";

import { Stack } from "../Stack";
import { Typography } from "../Typography";

import cls from "./Select.module.scss";

type HTMLSelectProps = Omit<AntdSelectProps, "size">;

type SelectSize = "s" | "m" | "l";

interface SelectProps extends HTMLSelectProps {
  label: string;
  className?: string;
  size?: SelectSize;
}

type SelectRef = React.ComponentRef<typeof AntdSelect>;

export const Select = memo(
  forwardRef<SelectRef, SelectProps>((props, forwardedRef) => {
    const { className, label, size = "m", ...otherProps } = props;

    const select = (
      <div className={cls.selectWrapper}>
        <AntdSelect
          ref={forwardedRef}
          className={classnames("", {}, [className, cls[size]])}
          {...otherProps}
        />
      </div>
    );

    if (label) {
      return (
        <Stack fullWidth gap="8" justify="space-between">
          <Typography withoutMargin title={label} size="s" />
          {select}
        </Stack>
      );
    }

    return select;
  })
);
