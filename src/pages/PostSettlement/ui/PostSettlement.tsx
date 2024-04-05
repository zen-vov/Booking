"use client";
import React from "react";
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import Plus from "@/shared/ui/Icons/Plus/Plus";
import Minus from "@/shared/ui/Icons/Minus/Minus";
import Wifi from "@/shared/ui/Icons/Wifi/Wifi";
import TV from "@/shared/ui/Icons/TV/TV";
import Conditioner from "@/shared/ui/Icons/Conditioner/Conditioner";
import Washing from "@/shared/ui/Icons/Washing/Washing";
import NoImg from "@/shared/ui/Icons/NoImg/NoImg";
import Dropdown from "@/shared/ui/Dropdown/Dropdown";
import Image from "next/image";
import ProductList from "@/widgets/productList/ui/productLIst";

interface Counter {
  name: string;
  count: number;
}

interface IconButton {
  icon: JSX.Element;
  label: string;
}

const icons: IconButton[] = [
  { icon: <Wifi />, label: "Wifi" },
  { icon: <TV />, label: "TV" },
  { icon: <Conditioner />, label: "Conditioner" },
  { icon: <Washing />, label: "Washing" },
];

const NearButton = ["Торговый центр", "Больница", "Школа", "Тренажорный зал"];

const options = ["в год", "на день", "полгода"];

export default function PostSettlementPage() {
  const [counterState, setCounterState] = React.useState<Counter[]>([
    { name: "Максимальное количество жителей", count: 0 },
    { name: "Количество комнат", count: 0 },
    { name: "Спальни", count: 0 },
    { name: "Ванные, душ", count: 0 },
  ]);
  const handleIncrement = (index: number) => {
    setCounterState((prevCounters) => {
      const updatedCounters = [...prevCounters];
      updatedCounters[index] = {
        ...updatedCounters[index],
        count: updatedCounters[index].count + 1,
      };
      return updatedCounters;
    });
  };

  const handleDecrement = (index: number) => {
    setCounterState((prevCounters) => {
      const updatedCounters = [...prevCounters];
      updatedCounters[index] = {
        ...updatedCounters[index],
        count: Math.max(0, updatedCounters[index].count - 1),
      };
      return updatedCounters;
    });
  };

  return (
    <div>
      <div>
        <Link href={"/"}>
          <p className="text-[16px] font-[500]">Вернуться на главное меню</p>
        </Link>
        <h1 className="text-[24px] mt-[20px] mb-[55px] font-[500]">
          Информация о жилье
        </h1>
      </div>
      <div className="flex flex-col h-fit w-full h-[400px] py-[60px] px-[65px] bg-white rounded-lg">
        <p className="text-[12px] font-[500] mb-[10px]">
          Где расположено ваше жилье?
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.034149153324!2d76.6670930764335!3d43.20877307112663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x388345a35db0962d%3A0xd9437541092dd062!2sSDU!5e0!3m2!1sen!2skz!4v1712296819450!5m2!1sen!2skz"
          width="668"
          height="202"
          style={{ border: "0", borderRadius: "5px" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="flex gap-[15px] mb-[27px] items-center">
          <Input
            className="w-full w-[30px] h-[50px] py-[10px] px-[20px] border-none bg-[#F7F7F7] rounded-[12px] focus:outline-none"
            placeholder="Введите адрес"
          />
          {/* <p className="text-[14px] font-[500] text-blue cursor-pointer">
            указать на карте
          </p> */}
        </div>
        <p className="text-[16px] font-[500] mb-[15px]">
          Основная информация о жилье
        </p>
        <div className="w-[400px] mb-[20px]">
          {counterState.map((counter, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <p className="text-[14px] font-[400]">{counter.name}</p>
              <div className="flex items-center gap-[5px]">
                <button onClick={() => handleDecrement(index)}>
                  <Minus />
                </button>
                <p className="text-[14px] font-[400]">{counter.count}</p>
                <button onClick={() => handleIncrement(index)}>
                  <Plus />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-[15px]">
          <p className="text-[16px] font-[500] mb-[10px]">
            Преимущества вашего жилья
          </p>
          <div className="flex items-center gap-[13px]">
            {icons.map((icon, index) => (
              <button
                key={index}
                className="bg-blue rounded-[5px] w-[60px] h-[40px] py-[12px] px-[23px] text-[22px] font-500"
              >
                {icon.icon}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-[22px]">
          <p className="text-[16px] font-[500] mb-[10px]">
            Преимущества вашего жилья
          </p>
          <div className="flex items-center gap-[13px]">
            {icons.map((icon, index) => (
              <button
                key={index}
                className="bg-blue rounded-[5px] w-[60px] h-[40px] py-[12px] px-[23px] text-[22px] font-500"
              >
                {icon.icon}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-[12px]">
          <p className="text-[16px] text-black font-[500]">
            Загрузите фото жилья
          </p>
          <p className="text-[12px] mb-[6px]">
            Для начала хватит 5 фотографий. Позже вы сможете добавить другие или
            внести изменения.
          </p>
          <div className="flex items-center gap-[13px]">
            <div>
              <NoImg />
            </div>
            <div>
              <NoImg />
            </div>
            <div>
              <NoImg />
            </div>
            <div>
              <NoImg />
            </div>
          </div>
          <p>Загрузить еще</p>
        </div>
        <div className="mb-[16px]">
          <p className="text-[16px] text-black font-[500]">
            Придумайте, как будет называться квартира
          </p>
          <p className="text-[12px] mb-[6px]">
            Краткое название — то, что нужно. Не беспокойтесь, вы всегда сможете
            отредактировать его.
          </p>
          <textarea className="w-[380px] h-[50px] py-[10px] px-[20px] border-none bg-[#F1F1F1] rounded-[12px] focus:outline-none" />
        </div>
        <div className="mb-[16px]">
          <p className="text-[16px] text-black font-[500]">
            Составьте описание
          </p>
          <p className="text-[12px] mb-[6px]">
            Расскажите, что делает ваше жилье особенным.
          </p>
          <textarea className="w-[380px] h-[100px] py-[10px] px-[20px] border-none bg-[#F1F1F1] rounded-[12px] focus:outline-none" />
        </div>
        <div className="mb-[46px]">
          <p className="text-[16px] text-black font-[500]">Установите цену</p>
          <p className="text-[12px] mb-[6px]">
            Ее можно изменить в любое время.
          </p>
          <div className="flex items-center">
            <Dropdown
              buttonStyle="text-[14px] font-[400]"
              listStyle="bg-white text-base py-[2px] px-[4px] left-[8x`px] flex flex-col border-white rounded-[6px] gap-[13px] w-fit h-fit"
              options={options}
              label="в месяц"
            />
            <Input
              className="w-[120px] h-[20px] py-[10px] text-[12px] px-[20px] border-b-black bg-[#F1F1F1] rounded-[12px] focus:outline-none"
              placeholder="Депозит"
              type="number"
            />
          </div>
        </div>
        <Button
          className="bg-blue w-[130px] rounded-[5px] py-[10px] text-white text-[12px] font-500"
          type="submit"
          label="опубликовать"
        />
      </div>
    </div>
  );
}
