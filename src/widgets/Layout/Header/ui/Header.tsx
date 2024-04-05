"use client";
import React from "react";
import Logo from "@/shared/ui/Icons/Logo/Logo";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import AuthModal from "@/features/AuthModal/ui/AuthModal";
import cn from "classnames";
import Dropdown from "@/shared/ui/Dropdown/Dropdown";
import Link from "next/link";

interface HeaderProps {
  isProfile: boolean;
  isHouse?: boolean;
}

const options = [
  "Личные данные",
  "Счет и платежи",
  "Мои объявление",
  "Центр помощи",
  "Выйти",
];

export default function Header({ isProfile, isHouse }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={cn("py-[30px]", { "border-b-black": isProfile })}>
      <div className="container">
        {isHouse && (
          <nav className="flex justify-between items-center">
            <Link href={"/"}>
              <span className="cursor-pointer">
                <Logo />
              </span>
            </Link>

            <div className="flex gap-[40px]">
              <Link href={"/"}>
                <Button
                  className="text-md font-[500]"
                  label="Разместить жилье на StudHouse.kz "
                />
              </Link>

              <Dropdown
                buttonStyle="text-[20px] font-[500]"
                listStyle="bg-white text-base py-[14px] px-[45px] flex flex-col border-white rounded-[6px] gap-[13px] w-[210px] h-fit"
                options={options}
                label="Zhandos"
              />
              {isModalOpen && <AuthModal onClose={closeModal} />}
            </div>
          </nav>
        )}
        {!isHouse && (
          <nav className="flex justify-between items-center">
            <Logo />
            <Input
              className="border-none bg-background focus:outline-none cursor-pointer"
              style={{
                borderBottom: "2px solid #2C2B2B",
              }}
              placeholder="Поиск квартиры"
            />
            {isProfile && (
              <div className="flex gap-[40px]">
                <Button className="text-md font-[500]" label="Квартиры " />
                <Button className="text-md font-[500]" label="Подселение" />
                <Button
                  onClick={openModal}
                  className="text-md font-[500]"
                  label="Войти"
                />
                {isModalOpen && <AuthModal onClose={closeModal} />}
              </div>
            )}
            {!isProfile && (
              <div className="flex gap-[40px]">
                <Button className="text-md font-[500]" label="Сообщения " />
                <Button
                  className="text-md font-[500] border border-[1px] border-black py-[3px] px-[6px]"
                  label="Разместить объявление"
                />
                <Dropdown
                  buttonStyle="text-[20px] font-[500]"
                  listStyle="bg-white text-base py-[14px] px-[45px] flex flex-col border-white rounded-[6px] gap-[13px] w-[210px] h-fit"
                  options={options}
                  label="Zhandos"
                />
                {isModalOpen && <AuthModal onClose={closeModal} />}
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
