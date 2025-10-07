import { Dropdown as AntdDropdown, DropdownProps as AntdDropdownProps, MenuProps } from "antd";
import classnames from "classnames";
import { ReactNode, useRef } from "react";
import { Link } from "react-router-dom";

import cls from "./Dropdown.module.scss";

export interface DropdownItem {
  key: string;
  content?: ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

interface DropdownProps extends Omit<AntdDropdownProps, "menu"> {
  children: ReactNode;
  menu: DropdownItem[];
  className?: string;
}

export const Dropdown = (props: DropdownProps) => {
  const { menu, children, trigger = ["hover"], className, ...otherProps } = props;

  const preparedItems: MenuProps["items"] = menu?.map((item) => {
    if (item.href) {
      return { key: item.key, label: <Link to={item.href}>{item.content}</Link> };
    }
    return { key: item.key, label: <button onClick={item.onClick}>{item.content}</button> };
  });

  const popupContainerRef = useRef<HTMLDivElement>(null);

  const getPopupContainer = (node: HTMLElement) => {
    return popupContainerRef.current || node;
  };

  return (
    <div ref={popupContainerRef} className={classnames(cls.dropdownWrapper, [className])}>
      <AntdDropdown
        className={cls.dropdown}
        getPopupContainer={getPopupContainer}
        menu={{ items: preparedItems }}
        trigger={trigger}
        {...otherProps}
      >
        {children}
      </AntdDropdown>
    </div>
  );
};
