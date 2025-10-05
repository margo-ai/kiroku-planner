import classnames from "classnames";
import { memo } from "react";

import cls from "./Typography.module.scss";

type TextVariant = "primary" | "error" | "accent";

type TextAlign = "left" | "right" | "center";

type TextSize = "xs" | "s" | "m" | "l" | "xl";

type TagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

type TitleMarginBottom = 0 | 8 | 12 | 16 | 24 | 32;
interface TypographyProps {
  title: string;
  className?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  Tag?: TagType;
  size?: TextSize;
  bold?: boolean;
  titleMb?: TitleMarginBottom;
  dataTestId?: string;
}

const mapSizeToClass: Record<TextSize, string> = {
  xs: "size_xs",
  s: "size_s",
  m: "size_m",
  l: "size_l",
  xl: "size_xl"
};

export const Typography = memo((props: TypographyProps) => {
  const {
    className,
    text,
    title,
    Tag = "p",
    variant = "primary",
    align = "left",
    size = "m",
    bold = false,
    titleMb,
    dataTestId
  } = props;

  const sizeClass = mapSizeToClass[size];

  const additionalClasses = [className, cls[variant], cls[align], cls[sizeClass]];

  return (
    <div
      data-testid={dataTestId}
      className={classnames(cls.typography, { [cls.bold]: bold }, additionalClasses)}
    >
      {title && (
        <Tag className={classnames(cls.title)} style={{ marginBottom: `${titleMb}px` }}>
          {title}
        </Tag>
      )}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});
