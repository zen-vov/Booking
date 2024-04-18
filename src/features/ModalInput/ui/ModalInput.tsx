// ModalInputField.tsx

import React, { useState } from "react";
import Modal from "@/shared/ui/Modal/ui/Modal";

interface ModalInputFieldProps {
  initialValue: string;
  onSave: (newValue: string) => void;
  onClose: () => void;
  fieldName: string;
}

const ModalInputField: React.FC<ModalInputFieldProps> = ({
  initialValue,
  onSave,
  onClose,
  fieldName,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2>Редактирование поля "{fieldName}"</h2>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleSave}>Сохранить</button>
    </Modal>
  );
};

export default ModalInputField;
