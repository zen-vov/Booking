"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";

export default function AddCardPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  const handleChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue = value.replace(/\D/g, "");
    const formattedValue = newValue.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  const handleChangeExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue = value.replace(/\D/g, "");
    const formattedValue = newValue.replace(/(\d{2})(\d{0,2})/, "$1/$2").trim();
    setExpiry(formattedValue);
  };

  const handleChangeCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue = value.replace(/\D/g, "");
    setCVC(newValue);
  };

  const handleChangeCardHolderName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setCardHolderName(value);
  };

  return (
    <div>
      <div>
        <Link href={"/"}>
          <p className="text-[16px] font-[500]">Вернуться на главное меню</p>
        </Link>
        <h1 className="text-[24px] mt-[20px] mb-[55px] font-[500]">
          Платежи и выплаты
        </h1>
      </div>
      <div className="flex flex-col h-fit w-full h-[400px] py-[60px] px-[65px] bg-white rounded-lg">
        <h2 className="text-[20px] font-[500] mb-[15px]">Добавить карту</h2>
        <form className="flex flex-col">
          <div className="flex flex-col my-[10px]">
            <label htmlFor="cardNumber">Номер карты</label>
            <input
              className="bg-[#EDEDED] py-[10px] pl-[10px] w-[320px] rounded-[10px] mt-[5px]"
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              onChange={handleChangeCardNumber}
              maxLength={19}
              placeholder="XXXX XXXX XXXX XXXX"
              autoComplete="cc-number"
              required
            />
          </div>
          <div className="flex flex-col my-[10px]">
            <label htmlFor="expiry">Срок действия</label>
            <input
              className="bg-[#EDEDED] py-[10px] pl-[10px] w-[100px] rounded-[10px] mt-[5px]"
              type="text"
              id="expiry"
              name="expiry"
              value={expiry}
              onChange={handleChangeExpiry}
              maxLength={5}
              placeholder="MM/YY"
              autoComplete="cc-exp"
              required
            />
          </div>
          <div className="flex flex-col my-[10px]">
            <label htmlFor="cvc">CVC</label>
            <input
              className="bg-[#EDEDED] py-[10px] pl-[10px] w-[50px] rounded-[10px] mt-[5px]"
              type="text"
              id="cvc"
              name="cvc"
              value={cvc}
              onChange={handleChangeCVC}
              maxLength={3}
              placeholder="XXX"
              autoComplete="cc-csc"
              required
            />
          </div>
          <div className="flex flex-col my-[10px]">
            <label htmlFor="cardHolderName">Имя на карте</label>
            <input
              className="bg-[#EDEDED] py-[10px] pl-[10px] w-[320px] rounded-[10px] mt-[5px]"
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              value={cardHolderName}
              onChange={handleChangeCardHolderName}
              placeholder="Имя Фамилия"
              autoComplete="cc-name"
              required
            />
          </div>
          <Button
            className="bg-blue w-[130px] mt-[50px] rounded-[5px] py-[10px] text-white text-[12px] font-500"
            type="submit"
            label="добавить"
          />
        </form>
      </div>
    </div>
  );
}
