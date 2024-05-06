"use client";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import axios from "axios";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import { BASE_URL } from "@/shared/api/BASE";

interface ModalI {
  onClose: () => void;
  active?: boolean;
}

interface UserData {
  role: number;
  login: string;
  full_name: string;
  password: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
}

const AuthModal = ({ onClose, active }: ModalI) => {
  const [username, setUsername] = useState("");
  const [activate, setActivate] = useState<string>("");
  const [showActivation, setShowActivation] = useState<boolean>(false);
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(2);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = React.useRef<HTMLDivElement>(null);
  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (event: any) => {
    console.log("register button");
    event.preventDefault();

    try {
      if (isRegistering) {
        const registerResponse = await fetch(
          "http://studhouse.kz/api/v1/auth/user/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              role: selectedRole,
              login: username,
              full_name: username,
              password: password,
              is_active: true,
              is_staff: true,
              is_superuser: true,
            }),
          }
        );

        if (registerResponse.ok) {
          setShowActivation(true);
        } else {
          const errorData = await registerResponse.json();
          console.log("Registration error data:", errorData);

          // const activeCheck = await fetch(
          //   "http://studhouse.kz/api/v1/auth/user/activate_user/",
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       login: username,
          //       code: activate,
          //     }),
          //   }
          // );
          // console.log("active check:", activeCheck)

          // if (!activeCheck.ok) {
          //   setShowActivation(true);
          //   return;
          // }

          if (errorData && errorData.error && errorData.error.login) {
            const errorMessage = errorData.error.login[0].string;
            setErrorMessage(errorMessage);
          } else {
            setErrorMessage("Такой пользователь уже сущесвует");
            throw new Error("Registration failed");
          }
        }

        const registerData = await registerResponse.json();
        console.log("registration spend ok");
        localStorage.setItem("accessToken", registerData.jwt);
      }

      const loginResponse = await fetch(
        "http://studhouse.kz/api/v1/jwt/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: username,
            password: password,
          }),
        }
      );

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        console.log("Registration error data:", errorData);

        if (errorData && errorData.error && errorData.error.login) {
          const errorMessage = errorData.error.login[0].string;
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage("Неправильный логин или пароль");
          throw new Error("Registration failed");
        }
      }

      const loginData = await loginResponse.json();
      localStorage.setItem("accessToken", loginData.access);
      if (!isRegistering) {
        window.location.reload();
        onClose();
      }
      if (isRegistering) {
        handleActiveForm();
      }
    } catch (error: any) {
      console.log("a-", errorMessage);
      // setErrorMessage(error.message || "Произошла ошибка");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const handleActivationSubmit = async (event: any) => {
    console.log("activation code: ", activate);
    event.preventDefault();

    try {
      const activateResponse = await fetch(
        "http://studhouse.kz/api/v1/auth/user/activate_user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: username,
            code: activate,
          }),
        }
      );

      console.log(activateResponse);

      if (activateResponse.ok) {
        const loginResponse = await fetch(
          "http://studhouse.kz/api/v1/jwt/create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              login: username,
              password: password,
            }),
          }
        );

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem("accessToken", loginData.access);
          window.location.reload();
          onClose();
        } else {
          throw new Error("Failed to authenticate user after activation");
        }
      } else {
        throw new Error("Failed to activate user");
      }
    } catch (error: any) {
      // setErrorMessage(error.message || "Произошла ошибка");
    }
  };
  const handleActiveForm = () => {
    setShowActivation(true);
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
            {!showActivation && (
              <>
                <label className="mb-[30px]">
                  <p className="text-[18px] font-[500]">Почта</p>
                  <Input
                    className="w-full h-[50px] py-[10px] px-[20px] border bg-[#F7F7F7] rounded-[12px] focus:outline-none"
                    style={{ color: "#A8A2A2" }}
                    name="username"
                    placeholder="Введите электронную почту"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                <label className="mb-[20px]">
                  <p className="text-[18px] font-[500]">Пароль</p>
                  <Input
                    className="w-full h-[50px] py-[10px] px-[20px] border bg-[#F7F7F7] rounded-[12px] focus:outline-none"
                    style={{ color: "#A8A2A2" }}
                    name="password"
                    placeholder="Введите пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {isRegistering && (
                  <div className="mb-[40px] flex items-center">
                    <input
                      type="checkbox"
                      id="studentRole"
                      checked={selectedRole === 1}
                      onChange={() => {
                        setSelectedRole(selectedRole === 2 ? 1 : 2);
                      }}
                    />
                    <label htmlFor="studentRole" className="ml-[10px]">
                      Студент
                    </label>
                  </div>
                )}
              </>
            )}

            {showActivation && (
              <div className="mb-4">
                <div className="w-full">
                  <label
                    className="block mb-2 text-[18px] font-[500]"
                    htmlFor="activate1"
                  >
                    Код активации
                  </label>
                  <div className="flex items-center justify-between w-full">
                    <div className="w-[20%]">
                      <input
                        className="w-full h-[50px] py-[10px] px-[20px] border-b border-black focus:outline-none text-center"
                        id="activate1"
                        name="activate1"
                        type="text"
                        maxLength={1}
                        value={activate[0] || ""}
                        onChange={(e) => {
                          setActivate(e.target.value + activate.slice(1, 4));
                          if (e.target.value.length === 1) {
                            document.getElementById("activate2")?.focus();
                          }
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Backspace" && activate[0] === "") {
                            document.getElementById("activate1")?.blur();
                            document.getElementById("activate1")?.focus();
                          }
                        }}
                        required
                      />
                    </div>
                    <div className="w-[20%]">
                      <input
                        className="w-full h-[50px] py-[10px] px-[20px] border-b border-black focus:outline-none text-center"
                        id="activate2"
                        name="activate2"
                        type="text"
                        maxLength={1}
                        value={activate[1] || ""}
                        onChange={(e) => {
                          setActivate(
                            activate.slice(0, 1) +
                              e.target.value +
                              activate.slice(2, 4)
                          );
                          if (e.target.value.length === 1) {
                            document.getElementById("activate3")?.focus();
                          }
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Backspace" && activate[1] === "") {
                            document.getElementById("activate1")?.focus();
                          }
                        }}
                        required
                      />
                    </div>
                    <div className="w-[20%]">
                      <input
                        className="w-full h-[50px] py-[10px] px-[20px] border-b border-black focus:outline-none text-center"
                        id="activate3"
                        name="activate3"
                        type="text"
                        maxLength={1}
                        value={activate[2] || ""}
                        onChange={(e) => {
                          setActivate(
                            activate.slice(0, 2) +
                              e.target.value +
                              activate.slice(3, 4)
                          );
                          if (e.target.value.length === 1) {
                            document.getElementById("activate4")?.focus();
                          }
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Backspace" && activate[2] === "") {
                            document.getElementById("activate2")?.focus();
                          }
                        }}
                        required
                      />
                    </div>
                    <div className="w-[20%]">
                      <input
                        className="w-full h-[50px] py-[10px] px-[20px] border-b border-black focus:outline-none text-center"
                        id="activate4"
                        name="activate4"
                        type="text"
                        maxLength={1}
                        value={activate[3] || ""}
                        onChange={(e) => {
                          setActivate(activate.slice(0, 3) + e.target.value);
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Backspace" && activate[3] === "") {
                            document.getElementById("activate3")?.focus();
                          }
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {errorMessage && !showActivation && (
              <p className="text-red text-lg font-semibold">{errorMessage}</p>
            )}
            {showActivation && (
              <Button
                className="bg-blue rounded-[5px] py-[10px] text-white text-[22px] font-500"
                type="submit"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleActivationSubmit(e)
                }
                label="Продолжить"
              />
            )}
            {!showActivation && isRegistering && (
              <>
                <Button
                  className={`bg-blue rounded-[5px] py-[10px] text-white text-[22px] font-500 ${
                    !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSubmit(e)
                  }
                  disabled={!isFormValid}
                  label={"Зарегистрироваться"}
                />
                {/* <Button
                  onClick={() => handleActiveForm()}
                  className="mt-[16px]"
                >
                  Активировать аккаунт
                </Button> */}
              </>
            )}
            {!showActivation && !isRegistering && (
              <>
                <Button
                  className="bg-blue rounded-[5px] py-[10px] text-white text-[22px] font-500"
                  type="submit"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSubmit(e)
                  }
                  label={"Войти"}
                />
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
