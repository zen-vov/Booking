// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import cn from "classnames";
// import axios from "axios";
// import Button from "@/shared/ui/Button/Button";
// import Input from "@/shared/ui/Input/Input";

// const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [confirmationCode, setConfirmationCode] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const modalRef = useRef<HTMLDivElement>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "username") setUsername(value);
//     if (name === "password") setPassword(value);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       let accessToken;
//       if (isRegistering) {
//         const response = await axios.post(
//           "http://studhouse.kz/api/v1/auth/user/",
//           {
//             role: 0,
//             login: username,
//             full_name: username,
//             password: password,
//             is_active: true,
//             is_staff: true,
//             is_superuser: true,
//           }
//         );
//         accessToken = response.data.jwt;
//         setShowConfirmation(true);
//       } else {
//         const response = await axios.post(
//           "http://studhouse.kz/api/v1/jwt/create/",
//           {
//             login: username,
//             password: password,
//           }
//         );
//         accessToken = response.data.access;
//       }
//       localStorage.setItem("accessToken", accessToken);
//       onClose();
//     } catch (error: any) {
//       if (axios.isAxiosError(error) && error.response) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage("Произошла ошибка");
//       }
//     }
//   };

//   const handleConfirmationSubmit = async (
//     event: React.FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();
//     try {
//       await axios.post(
//         "http://studhouse.kz/api/v1/auth/user/send_activation_code/",
//         {
//           login: username, // Замените username на соответствующее значение
//           full_name: "ваше_имя", // Замените "ваше_имя" на ваше реальное имя
//           is_active: true,
//           is_deleted: true,
//         }
//       );
//       setShowConfirmation(false);
//       onClose();
//     } catch (error: any) {
//       setErrorMessage("Произошла ошибка при подтверждении кода");
//     }
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedRole(event.target.value);
//   };

//   return (
//     <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div
//         className="bg-white p-8 border-[1px] rounded-[15px] w-[580px] h-fit"
//         ref={modalRef}
//       >
//         <div className="flex flex-col justify-between py-[20px]">
//           <div className="flex justify-between mb-[30px]">
//             <Button
//               className={cn(!isRegistering ? "active" : "", "text-lg w-full", {
//                 "border-b-4 border-blue rounded-[3px]": !isRegistering,
//               })}
//               onClick={() => setIsRegistering(false)}
//               label="Войти"
//             />
//             <Button
//               className={cn(isRegistering ? "active" : "", "text-lg w-full", {
//                 "border-b-4 border-blue rounded-[3px]": isRegistering,
//               })}
//               onClick={() => setIsRegistering(true)}
//               label="Регистрация"
//             />
//           </div>

//           {showConfirmation ? (
//             <form onSubmit={handleConfirmationSubmit}>
//               <label className="mb-[20px]">
//                 <p className="text-[18px] font-[500]">Код подтверждения</p>
//                 <Input
//                   className="w-full h-[50px] py-[10px] px-[20px] border bg-[#F7F7F7] rounded-[12px] focus:outline-none"
//                   style={{ color: "#A8A2A2" }}
//                   name="confirmationCode"
//                   placeholder="Введите код подтверждения"
//                   type="text"
//                   value={confirmationCode}
//                   onChange={(e) => setConfirmationCode(e.target.value)}
//                   required
//                 />
//               </label>
//               <div className="error-message">{errorMessage}</div>
//               <Button
//                 className="bg-blue rounded-[5px] py-[10px] text-white text-[22px] font-500"
//                 type="submit"
//                 label="Подтвердить"
//               />
//             </form>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <label className="mb-[30px]">
//                 <p className="text-[18px] font-[500]">Почта</p>
//                 <Input
//                   className="w-full h-[50px] py-[10px] px-[20px] border bg-[#F7F7F7] rounded-[12px] focus:outline-none"
//                   style={{ color: "#A8A2A2" }}
//                   name="username"
//                   placeholder="Введите электронную почту"
//                   type="text"
//                   value={username}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <label className="mb-[20px]">
//                 <p className="text-[18px] font-[500]">Пароль</p>
//                 <Input
//                   className="w-full h-[50px] py-[10px] px-[20px] border bg-[#F7F7F7] rounded-[12px] focus:outline-none"
//                   style={{ color: "#A8A2A2" }}
//                   name="password"
//                   placeholder="Введите пароль"
//                   type="password"
//                   value={password}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               {isRegistering && (
//                 <div className="mb-[100px] flex items-center">
//                   <input
//                     type="checkbox"
//                     id="studentRole"
//                     checked={selectedRole === "student"}
//                     onChange={() => {
//                       setSelectedRole(
//                         selectedRole === "student" ? "" : "student"
//                       );
//                     }}
//                   />
//                   <label htmlFor="studentRole" className="ml-[10px]">
//                     Студент
//                   </label>
//                 </div>
//               )}
//               <div className="error-message">{errorMessage}</div>
//               <Button
//                 className="bg-blue rounded-[5px] py-[10px] text-white text-[22px] font-500"
//                 type="submit"
//                 label={isRegistering ? "Зарегистрироваться" : "Войти"}
//               />
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;

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
        const response = await axios.post(
          "http://studhouse.kz/api/v1/auth/user/",
          {
            email: username,
            login: username,
            password: password,
            role: 1,
          }
        );
        console.log("authorized");
        accessToken = response.data.jwt;
      } else {
        const response = await axios.post(
          "http://studhouse.kz/api/v1/jwt/create/",
          {
            login: username,
            password: password,
          }
        );
        accessToken = response.data.access;
      }
      localStorage.setItem("accessToken", accessToken);
      window.location.reload();
      onClose();
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Произошла ошибка");
      }
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
            <label className="mb-[20px]">
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
              <div className="mb-[100px] flex items-center">
                <input
                  type="checkbox"
                  id="studentRole"
                  checked={selectedRole === "student"}
                  onChange={() => {
                    setSelectedRole(
                      selectedRole === "student" ? "" : "student"
                    );
                  }}
                />
                <label htmlFor="studentRole" className="ml-[10px]">
                  Студент
                </label>
              </div>
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
