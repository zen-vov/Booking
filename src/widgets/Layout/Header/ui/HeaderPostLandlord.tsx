"use client";
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
import { BASE_URL } from "@/shared/api/BASE";

interface HeaderProps {
  isProfile: boolean;
  isHouse?: boolean;
}

const options = ["Личные данные", "Мои объявление", "Выйти"];

export default function HeaderPostLandlord() {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [name, setName] = React.useState("");

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");
    const decodedToken = jwt.decode(accessToken);
    console.log(decodedToken);
    const userId = decodedToken?.user_id;

    const fetchName = async () => {
      try {
        const userResponse = await fetch(`${BASE_URL}/auth/user/${userId}/`);
        const user = await userResponse.json();

        setName(user.full_name);
        console.log(user);
      } catch (error) {
        console.error("Ошибка при загрузке данных: ", error);
      }
    };

    fetchName();
  }, []);

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

  return (
    <header className={cn("border-b-[1px] border-[#534949] py-[30px]")}>
      <div className="container">
        <nav className="flex justify-between items-center">
          <Link href={"/"}>
            <Logo />
          </Link>

          <div className="flex gap-[40px]">
            <div className="flex gap-[40px] items-center">
              <Link href={"/routs/posthouse"}>
                <Button
                  className="text-md font-[500] border-[1px] border-black py-[3px] px-[6px]"
                  label="Разместить жилье на StudHouse.kz"
                />
              </Link>
            </div>

            {user && (
              <Button
                className="text-md font-[500]"
                label="Войти"
                onClick={handleLoginClick}
              />
            )}
          </div>
        </nav>
      </div>
      {isModalOpen && <AuthModal onClose={closeModal} />}
    </header>
  );
}
