// ModalInputField.tsx

import React, { useState } from "react";
import Modal from "@/shared/ui/Modal/ui/Modal";
import Button from "@/shared/ui/Button/Button";

interface Fields {
  full_name: string;
  contacts: string;
  email: string;
  birthDate: string;
  identification: string;
  additional_user: string;
  // Добавьте другие поля, если необходимо
}

interface ModalInputFieldProps {
  initialValue: string;
  // onSave: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
  fieldName: string;
  buttonField: string;
  children: React.ReactNode;
}

const ModalInputField: React.FC<ModalInputFieldProps> = ({
  initialValue,
  onSave,
  onClose,
  buttonField,
  fieldName,
  children,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(value);
  };

  const handleSave = () => {
    onSave();
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
