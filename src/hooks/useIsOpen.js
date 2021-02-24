import { useState } from "react";

export const useIsOpen = (initialState = false) => {
  const [isOpen, handleIsOpen] = useState(initialState);

  const open = () => {
    handleIsOpen(true);
  };
  const close = () => {
    handleIsOpen(false);
  };

  const toggle = () => {
    handleIsOpen((state) => !state);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
