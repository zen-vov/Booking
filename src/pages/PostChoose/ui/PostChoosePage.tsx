import React from "react";
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";

export default function PostChoosePage() {
  return (
    <div>
      <div>
        <div>
          <Link href={"/"}>
            <p className="text-[16px] font-[500]">Вернутся на главное меню</p>
          </Link>
          <h1 className="text-[24px] mt-[20px] mb-[55px] font-[500]">
            Информация о жилье
          </h1>
        </div>
        <div className="flex flex-col w-full h-[400px] py-[60px] px-[65px] bg-white rounded-lg">
          <p className="text-[20px] font-[500] mb-[47px]">
            Выберите тип аренды
          </p>
          <div className="flex gap-[90px] mb-[76px]">
            <Button
              className="bg-[#F3F3F3] rounded-[5px] py-[10px] px-[100px] text-white text-[22px] font-500"
              labelStyle="text-black text-[16px] font-[500]"
              label="Квартира"
            />
            <Button
              className="bg-[#F3F3F3] rounded-[5px] py-[10px] px-[100px] text-white text-[22px] font-500"
              labelStyle="text-black text-[16px] font-[500]"
              label="Подселение"
            />
          </div>
          <Link href={"/routs/postsettlement"}>
            <Button
              className="bg-blue rounded-[5px] py-[10px] px-[20px] text-white text-[22px] font-500"
              label="Далее "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
