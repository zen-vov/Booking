import React from "react";
import modal from "./modal.module.sass";

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  active,
  setActive,
  children,
}) => {
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (active && !target.closest(`.${modal.modal__content}`)) {
        setActive(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [active, setActive]);

  return (
    <div className={`${active ? modal.active : modal.modal}`}>
      <div
        className={modal.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
