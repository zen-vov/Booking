import React from "react";
import cn from "classnames";
import Button from "@/shared/ui/Button/Button";
import AuthModal from "@/features/AuthModal/ui/AuthModal";
import { useUser } from "@/features/UserContext/ui/UserProvider";
import Input from "@/shared/ui/Input/Input";
import Dropdown from "@/shared/ui/Dropdown/Dropdown";
import Link from "next/link";
import Logo from "@/shared/ui/Icons/Logo/Logo";
import Search from "@/shared/ui/Icons/Search/Search";

import Modal from "@/shared/ui/Modal/ui/Modal";

// interface HeaderProps {
//   isProfile: boolean;
//   isHouse?: boolean;
// }

const options = [
  "Личные данные",
  "Счет и платежи",
  "Мои объявление",
  "Центр помощи",
  "Выйти",
];

export default function Header() {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [modalOpen, setModalOpen] = React.useState(false);

  // React.useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const jwt = require("jsonwebtoken");
  //   const decodedToken = jwt.decode(accessToken);
  //   console.log("decoded token: ", decodedToken);
  //   const userId = decodedToken?.user_id;
  //   if (userId) {
  //     localStorage.setItem("userId", userId);
  //   }

  //   const fetchName = async () => {
  //     try {
  //       const userResponse = await fetch(
  //         `http://studhouse.kz/api/v1/auth/user/${userId}/`
  //       );
  //       const user = await userResponse.json();
  //       console.log("username: ", user.full_name);
  //     } catch (error) {
  //       console.error("Ошибка при загрузке данных: ", error);
  //     }
  //   };

  //   fetchName();
  // }, []);

  const handleLoginClick = () => {
    if (!user) {
      setIsModalOpen(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  return (
    <header className={cn("border-b-[1px] border-[#534949] py-[30px]")}>
      <div className="container">
        <nav className="flex justify-between items-center">
          <Link href={"/"}>
            <Logo />
          </Link>
          <div className="flex gap-[2px]">
            <Search />
            <Input
              className="text-md text-primary border-primary border-b-[2px] py-[2px] px-[4px]"
              placeholder="Поиск квартиры"
            />
          </div>

          <div className="flex gap-[40px]">
            <Link href={"/roust/product"}>
              <Button className="text-md font-[500]" label="Квартиры" />
            </Link>

            <Link href={"/routs/posthouse"}>
              <Button className="text-md font-[500]" label="Подселение" />
            </Link>
            <Button
              className="text-md font-[500]"
              label="Войти"
              onClick={handleLoginClick}
            />
          </div>
        </nav>
      </div>

      {/* <div>
        <button onClick={handleButtonClick}>Открыть модальное окно</button>
        {modalOpen && (
          <Modal onClose={handleModalClose}>
            <h2>Заголовок модального окна</h2>
            <p>Содержимое модального окна...</p>
          </Modal>
        )}
      </div> */}

      {isModalOpen && <AuthModal onClose={closeModal} />}
    </header>
  );
}
