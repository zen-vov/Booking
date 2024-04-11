"use client";
import React, { useState } from "react";
import cn from "classnames";
import axios from "axios";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";

const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let accessToken;
      if (isRegistering) {
        const fakeUser = {
          id: 1,
          login: username,
          full_name: "John Doe",
          is_active: true,
          is_deleted: false,
          role: {
            id: 1,
            role_name: selectedRole === "student" ? "Student" : "Landlord",
          },
          user_info: {
            user: 1,
            photo_avatar: "avatar.jpg",
            contacts: "123456789",
            email: username,
            birthDate: "1990-01-01",
            address: "123 Main Street",
            imagePaths: "images/",
            frontIDCard: "front.jpg",
            backIDCard: "back.jpg",
          },
          additional_user: {
            full_name: "Jane Doe",
            who_is: selectedRole === "student" ? "Student" : "Landlord",
            contacts: "987654321",
          },
        };
        accessToken = "fake-access-token";
      } else {
        accessToken = "fake-access-token";
      }
      localStorage.setItem("accessToken", accessToken);
      window.location.reload();
      onClose();
    } catch (error: any) {
      setErrorMessage("Произошла ошибка");
    }
  };

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

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-8 border-[1px] rounded-[15px] w-[580px] h-fit"
        ref={modalRef}
      >
        <div className="flex flex-col justify-between py-[20px]">
          <div className="flex justify-between mb-[30px]">
            <Button
              className={cn(!isRegistering ? "active" : "", "text-lg w-full", {
                "border-b-4 border-blue rounded-[3px]": !isRegistering,
              })}
              onClick={() => setIsRegistering(false)}
              label="Войти"
            />
            <Button
              className={cn(isRegistering ? "active" : "", "text-lg w-full", {
                "border-b-4 border-blue rounded-[3px]": isRegistering,
              })}
              onClick={() => setIsRegistering(true)}
              label="Регистрация"
            />
          </div>

          <form
            className="flex flex-col justify-between"
            onSubmit={handleSubmit}
          >
            <label className="mb-[30px]">
              <p className="text-[18px] font-[500]">Почта</p>
              <Input
                className="w-full h-[50px] py-[10px] px-[20px] border bg-[#F7F7F7] rounded-[12px] focus:outline-none"
                style={{ color: "#A8A2A2" }}
                name="username"
                placeholder="Введите электронную почту"
                type="text"
                value={username}
                onChange={handleChange}
                required
              />
            </label>
            <label className="mb-[145px]">
              <p className="text-[18px] font-[500]">Пароль</p>
              <Input
                className="w-full h-[50px] py-[10px] px-[20px] border bg-[#F7F7F7] rounded-[12px] focus:outline-none"
                style={{ color: "#A8A2A2" }}
                name="password"
                placeholder="Введите пароль"
                type="password"
                value={password}
                onChange={handleChange}
                required
              />
            </label>
            {isRegistering && (
              <label className="mt-[20px] mb-[100px]">
                <select value={selectedRole} onChange={handleRoleChange}>
                  <option value="">Выберите роль</option>
                  <option value="student">Студент</option>
                  <option value="landlord">Арендодатель</option>
                </select>
              </label>
            )}
            <div className="error-message">{errorMessage}</div>
            <Button
              className="bg-blue rounded-[5px] py-[10px] text-white text-[22px] font-500"
              type="submit"
              label={isRegistering ? "Зарегистрироваться" : "Войти"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
