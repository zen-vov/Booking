import React, { useState } from "react";
import cn from "classnames";
import axios from "axios";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import { useUser } from "@/features/UserContext/ui/UserProvider";

const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser } = useUser();
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response;
      if (isRegistering) {
        response = await axios.post(
          "http://195.49.212.131:8000/api/v1/auth/user/",
          {
            email: username,
            login: username,
            password: password,
            role: 1,
          }
        );
      } else {
        response = await axios.post(
          "http://195.49.212.131:8000/api/v1/auth/user/",
          {
            login: username,
            password: password,
          }
        );
      }

      const token = response.data.jwt || response.data.access;
      if (token) {
        localStorage.setItem("accessToken", token);
        setUser(response.data.user);
        console.log(
          isRegistering ? "Registration successful:" : "Login successful:",
          response.data.user
        );
        onClose();
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Произошла ошибка");
      }
      console.error(
        isRegistering ? "Registration failed:" : "Login failed:",
        error
      );
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
  }, [onClose]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-8 border border-[1px] rounded-[15px] w-[580px] h-fit"
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
                type="email"
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

// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   try {
//     if (isRegistering) {
//       const response = await axios.post(
//         "http://195.49.212.131:8000/api/v1/auth/user/",
//         {
//           email: username,
//           login: username,
//           password: password,
//           role: 1,
//         }
//       );
//       localStorage.setItem("accessToken", response.data.jwt);
//       await fetch("http://195.49.212.131:8000/api/v1/jwt/create/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           login: username,
//           password: password,
//         }),
//       })
//         .then((response) => {
//           return response.json();
//         })
//         .then(async (data) => {
//           if (data.access) {
//             localStorage.setItem("accessToken", data.access);
//             const userData = { username: "exampleUser", role: "admin" };
//             setUser(userData);
//             console.log(userData);
//           }
//         });
//     } else {
//       const response = await axios.post(
//         "http://195.49.212.131:8000/api/v1/jwt/create/",
//         {
//           login: username,
//           password: password,
//         }
//       );
//     }
//     onClose();
//   } catch (error: any) {
//     if (axios.isAxiosError(error) && error.response) {
//       setErrorMessage(error.response.data.message);
//     } else {
//       setErrorMessage("Произошла ошибка");
//     }
//   }
// };
