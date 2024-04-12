"use client";
import React, { useState } from "react";
import Modal from "@/shared/ui/Modal/ui/Modal";
import jwt from "jsonwebtoken";

interface Fields {
  full_name: string;
  contacts: string;
  email: string;
  birthDate: string;
  identification: string;
  additional_user: string;
}

const Profile = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const [fields, setFields] = useState<Fields>({
    full_name: "",
    contacts: "",
    email: "",
    birthDate: "",
    identification: "",
    additional_user: "",
  });

  const [editingFields, setEditingFields] = useState<
    Record<keyof Fields, boolean>
  >({
    full_name: false,
    contacts: false,
    email: false,
    birthDate: false,
    identification: false,
    additional_user: false,
  });

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");
    const decodedToken = jwt.decode(accessToken);
    const userId = decodedToken?.user_id;
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(
          `http://studhouse.kz/api/v1/auth/user/${userId}/`
        );
        const user = await userResponse.json();

        setFields({
          ...fields,
          full_name: user.full_name,
          contacts: user.user_info.contacts,
          email: user.user_info.email,
          birthDate: user.user_info.birthDate,
          identification: user.user_info.frontIDCard,
          additional_user: user.additional_user,
        });
      } catch (error) {
        console.error("Ошибка при загрузке данных: ", error);
      }
    };

    fetchUser();
  }, []);

  const handleEditClick = (field: keyof Fields) => {
    setEditingFields({ ...editingFields, [field]: true });
  };

  const handleSaveClick = async (field: keyof Fields) => {
    setEditingFields({ ...editingFields, [field]: false });
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");
    const decodedToken = jwt.decode(accessToken);
    const userId = decodedToken?.user_id;

    try {
      const response = await fetch(
        `http://studhouse.kz/api/v1/auth/user/${userId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [field]: fields[field],
          }),
        }
      );
      if (response.ok) {
        window.location.reload();
        console.log(`Данные успешно обновлены для поля ${field}`);
      } else {
        console.error("Ошибка при обновлении данных");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса: ", error);
    }
  };

  const handleChange = (field: keyof Fields, value: string) => {
    setFields({ ...fields, [field]: value });
  };

  const renderField = (field: keyof Fields, label: string) => {
    const isEditing = editingFields[field];
    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-16 text-black font-[500]">{label}</span>
          {isEditing ? (
            <button
              className="cursor-pointer text-blue-500"
              onClick={() => handleSaveClick(field)}
            >
              Сохранить
            </button>
          ) : (
            <button
              className="cursor-pointer text-blue-500"
              onClick={() => handleEditClick(field)}
            >
              Редактировать
            </button>
          )}
        </div>
        {isEditing ? (
          <input
            className="w-full p-2 border rounded"
            value={fields[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            autoFocus
          />
        ) : (
          <span className="text-16 font-400 text-gray">{fields[field]}</span>
        )}
      </div>
    );
  };

  return (
    <div className="mx-10 my-4 py-[60px] px-[65px] bg-white rounded-lg">
      <div className="flex flex-col gap-[16px]">
        <div className="text-16 font-[600] mb-30">Личная информация</div>
        {renderField("full_name", "Имя по документам")}
        {renderField("contacts", "Номер телефона")}
        {renderField("email", "Электронная почта")}
        {renderField("birthDate", "Дата рождения")}
        {renderField(
          "identification",
          "Удостоверение личности государственного образца"
        )}
        {renderField(
          "additional_user",
          "Контактное лицо в чрезвычайной ситуации"
        )}
      </div>
      <div className="mt-[84px]">
        <p className="text-[18px] font-[400]">Хотите онулировать аккаунт?</p>
        <p className="decoration-solid text-[16px] cursor-pointer font-[500]">
          Приступить
        </p>
      </div>
    </div>
  );
};
export default Profile;
