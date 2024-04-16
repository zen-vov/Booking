import React, { useRef, useEffect } from "react";
import cn from "classnames";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-[64px] rounded-[15px] h-fit"
        ref={modalRef}
      >
        <div className="flex flex-col justify-between py-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
