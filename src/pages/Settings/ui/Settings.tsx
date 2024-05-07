"use client";
import React, { useState, useEffect } from "react";
import ModalInputField from "@/features/ModalInput/ui/ModalInput";
import Pen from "@/shared/ui/Icons/Pen/Pen";
import Link from "next/link";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import { useRouter } from "next/navigation";

interface Fields {
  full_name: string;
  contacts: string;
  email: string;
  birthDate: string;
  // identification: string;
  // additional_user: string;
  // university_data?: string;
  // student_hobbies?: string;
}

const Profile = () => {
  const [fields, setFields] = useState<Fields>({
    full_name: "",
    contacts: "",
    email: "",
    birthDate: "",
    // identification: "",
    // additional_user: "",
  });

  const [editingField, setEditingField] = useState<keyof Fields | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // todo добавить стэйти для университета, хобби, сохранять в локал хост

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const jwt = require("jsonwebtoken");
      if (!accessToken) return;
      const decodedToken: any = jwt.decode(accessToken);
      const userId = decodedToken?.user_id;
      try {
        const userResponse = await fetch(
          `http://studhouse.kz/api/v1/auth/user/${userId}/`
        );
        const user = await userResponse.json();

        setFields({
          full_name: user.full_name,
          contacts: user.user_info.contacts,
          email: user.user_info.email,
          birthDate: user.user_info.birthDate,
          // identification: user.user_info.frontIDCard,
          // additional_user: user.additional_user,
          // university_data: user.university_data,
          // student_hobbies: user.student_hobbies,
        });

        setUserRole(user?.role?.role_name || "");
      } catch (error) {
        console.error("Ошибка при загрузке данных: ", error);
      }
    };

    fetchUser();
  }, []);

  const handleOpenModal = (field: keyof Fields) => {
    setEditingField(field);
  };

  const handleSave = (field: keyof Fields, value: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
    setEditingField(null);
    updateField(field, value);
  };

  const updatePhoneNumber = async (value: string) => {
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");
    if (!accessToken) return;
    const decodedToken: any = jwt.decode(accessToken);
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
            contacts: phoneNumber,
          }),
        }
      );
      if (response.ok) {
        console.log(`Данные успешно обновлены для поля ТЕЛЕФОН`);
      } else {
        console.error("Ошибка при обновлении данных");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса: ", error);
    }
  };

  const updateField = async (field: keyof Fields, value: string) => {
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");
    if (!accessToken) return;
    const decodedToken: any = jwt.decode(accessToken);
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
            [field]: value,
          }),
        }
      );
      if (response.ok) {
        console.log(`Данные успешно обновлены для поля ${field}`);
      } else {
        console.error("Ошибка при обновлении данных");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса: ", error);
    }
  };

  const getFieldLabel = (fieldName: keyof Fields): string => {
    switch (fieldName) {
      case "full_name":
        return "Имя по документам";
      case "contacts":
        return "Номер телефона";
      case "email":
        return "Электронная почта";
      case "birthDate":
        return "Дата рождения";
        // case "identification":
        //   return "Удостоверение личности";
        // case "additional_user":
        //   return "Контактное лицо в чрезвычайной ситуации";
        // case "university_data":
        //   return "Данные об университете";
        // case "student_hobbies":
        //   return "Увлечения студента";
        // default:
        return "";
    }
  };

  const renderField = (field: keyof Fields) => {
    const isEditing = editingField === field;
    const fieldValue = fields[field] || "";

    const validFieldKeys: Array<keyof Fields> = [
      "full_name",
      "contacts",
      "email",
      "birthDate",
      // "identification",
      // "additional_user",
      // "university_data",
      // "student_hobbies",
    ];

    if (!validFieldKeys.includes(field)) {
      return null;
    }

    return (
      <div key={field}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-16 text-black font-[500]">
            {getFieldLabel(field)}
          </span>
          {!isEditing && (
            <button
              className="cursor-pointer text-blue-500"
              onClick={() => handleOpenModal(field)}
            >
              <Pen />
            </button>
          )}
        </div>
        {!isEditing ? (
          <span className="text-16 font-400 text-gray">{fieldValue}</span>
        ) : (
          <ModalInputField
            initialValue={fieldValue}
            onSave={(updatedValue) => handleSave(field, updatedValue)}
            onClose={() => setEditingField(null)}
            fieldName={getFieldLabel(field)}
            buttonField="Сохранить"
          >
            <h2>{getFieldLabel(field)}</h2>
          </ModalInputField>
        )}
      </div>
    );
  };

  const renderStudentFields = () => {
    if (userRole === "Student") {
      return (
        <div>
          {/* {renderField("university_data")} */}
          {/* {renderField("student_hobbies")} */}
        </div>
      );
    }
    return null;
  };

  const deleteUser = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const jwt = require("jsonwebtoken");
    const decodedToken: any = jwt.decode(accessToken);
    const userId = decodedToken?.user_id;

    try {
      const response = await fetch(
        `http://studhouse.kz/api/v1/auth/user/${userId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN":
              "d2yg9dlTCExrPKRqz122a6fD3uA7FPNGgI3PXyfJ77HSCJhY7lE82It17s8bTefc",
            Authorization: `JWT ${accessToken}`,
          },
          body: JSON.stringify({}),
        }
      );
      if (response.ok) {
        console.log(`Аккаунт успешно удален`);
        window.location.reload();
        router.push("/");
        alert("Ваш аккаунт удален");
      } else {
        console.error("Ошибка при удалении аккаунта");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса: ", error);
    }
  };

  const handlePhoneChange = (event: any) => {
    const value = event.target.value;
    setPhoneNumber(value);

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("Некорретный номер телефона");
    } else {
      setPhoneError("");
    }
  };

  return (
    <div>
      <Link href={"/"} className="flex gap-1 items-center mt-[25px] mb-[16px]">
        <Arrow />
        <p className="text-lg font-[400]">Вернуться на Главную страницу</p>
      </Link>
      <h2 className="ml-[40px] text-lg font-[500]">Личные данные</h2>
      <div className="mx-10 mt-[35px] mb-[100px] py-[60px] px-[65px] bg-white rounded-lg">
        <div className="flex flex-col gap-[16px]">
          <div className="text-16 font-[600] mb-30">Личная информация</div>
          {renderField("full_name")}
          {renderField("contacts")}
          {renderField("email")}
          {renderField("birthDate")}
          {/* {renderField("identification")} */}
          {/* {renderField("additional_user")} */}
          {/* {renderStudentFields()} */}
        </div>
        <div className="mt-[84px]">
          <p className="text-[18px] font-[400]">Хотите онулировать аккаунт?</p>
          <button
            onClick={deleteUser}
            className="decoration-solid text-[16px] cursor-pointer font-[500] mt-[8px]"
          >
            Приступить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
