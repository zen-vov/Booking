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

const options = ["Личные данные", "Мои объявление", "Выйти"];

export default function Header() {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [modalOpen, setModalOpen] = React.useState(false);

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

          <div className="flex gap-[40px]">
            <Button
              className="text-md font-[500]"
              label="Войти"
              onClick={handleLoginClick}
            />
          </div>
        </nav>
      </div>

      {isModalOpen && <AuthModal onClose={closeModal} />}
    </header>
  );
}
