import React from "react";
import Logo from "@/shared/ui/Icons/Logo/Logo";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";

export default function Header() {
  return (
    <header className="py-[30px]">
      <div className="container">
        <nav className="flex justify-between">
          <Logo />
          <Input
            className="border-none focus:outline-none cursor-pointer"
            style={{
              borderBottom: "2px solid #2C2B2B",
            }}
            placeholder="Поиск квартиры"
          />
          <div className="flex gap-[40px]">
            <Button className="text-md font-[500]" label="Квартиры " />
            <Button className="text-md font-[500]" label="Подселение" />
            <Button className="text-md font-[500]" label="Войти" />
          </div>
        </nav>
      </div>
    </header>
  );
}
