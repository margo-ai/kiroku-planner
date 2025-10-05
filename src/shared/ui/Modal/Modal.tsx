import classNames from "classnames";
import { ReactNode } from "react";

import { useModal } from "@/shared/lib/hooks/useModal";

import { Overlay } from "../Overlay";
import { Portal } from "../Portal";

import cls from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  dataTestId?: string;
}

const ANIMATION_DELAY = 500;

export const Modal = (props: ModalProps) => {
  const { children, className, isOpen, dataTestId, onClose } = props;

  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen
  });

  const mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <div data-testid={dataTestId} className={classNames(cls.modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
