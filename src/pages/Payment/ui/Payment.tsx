import React from "react";
import Link from "next/link";

export default function PaymentPage() {
  return (
    <div className="mb-[100px]">
      <div>
        <Link href={"/"}>
          <p className="mt-[20px] text-[16px] font-[500]">
            Вернуться на главное меню
          </p>
        </Link>
        <h1 className="text-[24px] mt-[20px] mb-[55px] font-[500]">
          Платежи и выплаты
        </h1>
      </div>
      <div className="flex flex-col h-fit w-full h-[400px] py-[60px] px-[65px] bg-white rounded-lg">
        <h2 className="text-[20px] font-[500] mb-[15px]">Платежи</h2>
        <div className="flex text-bottom gap-[10px]">
          <p className="text-[16px] font-[500]">Мои карты</p>
        </div>
        <div className="flex flex-col gap-[10px] my-[20px]">
          <input
            className="bg-[#EDEDED] py-[10px] pl-[10px] w-[320px] rounded-[10px] mt-[5px]"
            type="text"
            maxLength={3}
            placeholder="1234 1234 1234 1234"
            readOnly
            required
          />
          <Link href={"/routs/addcard"}>
            {" "}
            <span className="text-blue">Добавить новую карту</span>{" "}
          </Link>
        </div>
        <div className="flex flex-col gap-[3px] my-[20px]">
          <h2 className="text-[20px] font-[500]">История платежей</h2>
          <p className="text-[16px] font-[500]">
            Вы еще не совершили ни одного платежа
          </p>
        </div>
        <div className="flex gap-[60px] my-[20px]">
          <div className="flex flex-col gap-[10px]">
            <input
              className="bg-[#EDEDED] py-[10px] pl-[10px] w-[320px] rounded-[10px] mt-[5px]"
              type="text"
              maxLength={3}
              placeholder="1234 1234 1234 1234"
              readOnly
              required
            />
            <Link href={"/routs/addcard"}>Добавить новую карту</Link>
          </div>
          <div>
            <h2 className="text-[20px] font-[500]">Нужна помощь?</h2>
            <p className="text-[16px] font-[500]">Когда вы получите выплату</p>
            <p className="text-[16px] font-[500]">Как получать выплаты</p>
            <p className="text-[16px] font-[500]">Открыть историю операций</p>
          </div>
        </div>
      </div>
    </div>
  );
}
