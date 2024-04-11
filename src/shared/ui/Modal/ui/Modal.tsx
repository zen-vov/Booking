import React from "react";
import cn from "classnames";

interface ModalProps {
  isSplit: boolean;
}

const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isRegistering, setIsRegistering] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-8 border-[1px] rounded-[15px] w-[580px] h-fit"
        ref={modalRef}
      >
        <div className="flex flex-col justify-between py-[20px]"></div>
      </div>
    </div>
  );
};

export default Modal;
