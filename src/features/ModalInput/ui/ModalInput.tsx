// import React from "react";
// import Modal from "@/shared/ui/Modal/ui/Modal";

// interface ModalInputProps {
//     initialValue: string;
//     onSave: (newValue: string) = void;
//     onClose: () => void;
//     fieldName: string;
// }

// const ModalInput: React.FC<ModalInputProps> = ({initialValue, onSave, onClose, fieldName}) => {

//     const [value, setValue] = React.useState("");

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setValue(e.target.value);
//     }
//     const handleSave = () => {
//         onSave(value);
//         onClose();
//     }

//     return (
//         <Modal onClose={onClose}>
//             <h2>Редактирование поля "{</h2>
//         </Modal>
//     )
// }
