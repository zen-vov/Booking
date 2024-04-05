"use client";
import React from "react";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import Link from "next/link";
import Plus from "@/shared/ui/Icons/Plus/Plus";
import Minus from "@/shared/ui/Icons/Minus/Minus";

interface Counter {
  name: string;
  count: number;
}

export default function PostSettlementPage() {
  const [counterState, setCounterState] = React.useState<Counter[]>([
    { name: "Максимальная количество жителей", count: 0 },
    { name: "Количество комнат", count: 0 },
    { name: "Спальни", count: 0 },
    { name: "Ванные, душ", count: 0 },
  ]);

  const handleIncrement = (index: number) => {
    setCounterState((prevCounters) => {
      const updatedCounters = [...prevCounters];
      updatedCounters[index].count += 1;
      return updatedCounters;
    });
  };

  const handleDecrement = (index: number) => {
    setCounterState((prevCounters) => {
      const updatedCounters = [...prevCounters];
      updatedCounters[index].count -= 1;
      return updatedCounters.map((counter, i) => ({
        ...counter,
        count: i === index ? Math.max(0, counter.count - 1) : counter.count,
      }));
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
      <div className="flex flex-col w-full h-[400px] py-[60px] px-[65px] bg-white rounded-lg">
        <p className="text-[12px] font-[500] mb-[10px]">
          Где расположено ваше жилье?
        </p>
        <div className="flex gap-[15px] mb-[27px] items-center">
          <Input
            className="w-full w-[310px] h-[50px] py-[10px] px-[20px] border-none bg-[#F7F7F7] rounded-[12px] focus:outline-none"
            placeholder="Введите адрес"
          />
          <p className="text-[14px] font-[500] text-blue">указать на карте</p>
        </div>
        <p className="text-[12px] font-[500] mb-[10px]">
          Основная информация о жилье
        </p>
        <div className="w-[400px]">
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
        <div>
          <p className="text-[12px] font-[500] mb-[10px]">
            Преимущества вашего жилья
          </p>
        </div>
      </div>
    </div>
  );
}
