// ModalInputField.tsx

import React, { useState } from "react";
import Modal from "@/shared/ui/Modal/ui/Modal";
import Button from "@/shared/ui/Button/Button";

interface ModalInputFieldProps {
  initialValue: string;
  onSave: (value: string) => void;
  onClose: () => void;
  fieldName: string;
  buttonField: string;
  children: React.ReactNode;
  errorMessage?: string;
}

const ModalInputField: React.FC<ModalInputFieldProps> = ({
  initialValue,
  onSave,
  onClose,
  buttonField,
  fieldName,
  children,
  errorMessage,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(value);
  };

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  const handleKeyDowm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleSave();
    }
  };

  return (
    <Modal onClose={onClose}>
      <div>{children}</div>
      <input
        autoFocus
        onKeyDown={handleKeyDowm}
        type="text"
        value={value}
        onChange={handleChange}
      />
      <Button
        className="bg-blue w-[424px] h-[50px] mt-[60px] text-white text-[22px] rounded-[5px]"
        label={buttonField}
        onClick={handleSave}
      />
    </Modal>
  );
};

export default ModalInputField;
