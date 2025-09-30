import { Dropdown as AntdDropdown, MenuProps } from "antd";
import classnames from "classnames";
import { ReactNode, useRef } from "react";

import cls from "./Dropdown.module.scss";

export interface DropdownItem {
  key: string;
  content?: ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

interface DropdownProps {
  children: ReactNode;
  items: DropdownItem[];
  triggerEvent?: "click" | "hover" | "contextMenu";
  className?: string;
}

export const Dropdown = (props: DropdownProps) => {
  const { items, children, triggerEvent = "hover", className } = props;

  const preparedItems: MenuProps["items"] = items.map((item) => {
    if (item.href) {
      return { key: item.key, label: <a href={item.href}>{item.content}</a> };
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
        trigger={[triggerEvent]}
      >
        {children}
      </AntdDropdown>
    </div>
  );
};
