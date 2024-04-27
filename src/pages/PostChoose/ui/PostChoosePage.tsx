"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import "./styles.scss";

export default function PostChoosePage() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <section className="pt-[30px] pb-[200px]">
      <div>
        <Link href={"/"} className="flex gap-[5px] items-center">
          <Arrow />
          <p className="text-[16px] font-[500]">Вернуться на главное меню</p>
        </Link>
        <h1 className="text-[24px] mt-[20px] mb-[55px] font-[500]">
          Информация о жилье
        </h1>
      </div>
      <div className="flex flex-col w-full h-[400px] py-[60px] px-[65px] bg-white rounded-lg">
        <p className="text-[20px] font-[500] mb-[47px]">Выберите тип аренды</p>
        <div className="flex gap-[90px] mb-[76px]">
          <Button
            className={`rounded-[5px] py-[10px] px-[100px] text-white text-[22px] font-500 ${
              selectedOption === "Квартира"
                ? "bg-blue hover:bg-blue-600"
                : "bg-[#F3F3F3] "
            }`}
            labelStyle={`text-${
              selectedOption === "Квартира" ? "white" : "black"
            } text-[16px] font-[500]`}
            label="Квартира"
            onClick={() => handleSelectOption("Квартира")}
          />
          <Button
            className={`rounded-[5px] py-[10px] px-[100px] text-white text-[22px] font-500 ${
              selectedOption === "Подселение"
                ? "bg-blue hover:bg-blue-600"
                : "bg-[#F3F3F3]"
            }`}
            labelStyle={`text-${
              selectedOption === "Подселение" ? "white" : "black"
            } text-[16px] font-[500]`}
            label="Подселение"
            onClick={() => handleSelectOption("Подселение")}
          />
        </div>
        <Link href={"/routs/student/posthouse/create"}>
          <Button
            className="bg-blue rounded-[5px] py-[10px] px-[20px] text-white text-[22px] font-500"
            label="Далее"
          />
        </Link>
      </div>
    </section>
  );
}
