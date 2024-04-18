// ModalInputField.tsx

import React, { useState } from "react";
import Modal from "@/shared/ui/Modal/ui/Modal";
import Button from "@/shared/ui/Button/Button";

interface ModalInputFieldProps {
  initialValue: string;
  onSave: (newValue: string) => void;
  onClose: () => void;
  fieldName: string;
  buttonField: string;
  children: React.ReactNode;
}

const ModalID: React.FC<ModalInputFieldProps> = ({
  initialValue,
  onSave,
  onClose,
  buttonField,
  fieldName,
  children,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(e.target.value);
  };

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div>{children}</div>
      <input type="text" value={value} onChange={handleChange} />
      <Button
        className="bg-blue w-[424px] h-[50px] mt-[60px] text-white text-[22px] rounded-[5px]"
        label={buttonField}
        onClick={handleSave}
      />
    </Modal>
  );
};

export default ModalID;
