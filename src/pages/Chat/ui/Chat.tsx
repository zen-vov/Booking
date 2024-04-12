import React from "react";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import Image from "next/image";
import Dots from "@/shared/ui/Icons/3dots/dots";
import Input from "@/shared/ui/Input/Input";

export default function ChatPage() {
  return (
    <div>
      <div>
        <div className="flex items-center gap-[6px] mb-[25px]">
          <Arrow />
          <h2 className="text-lg font-[400]">Назад к объявлению</h2>
        </div>
        <div className="flex justify-between">
          <div className="bg-white h-[622px] w-[80%] rounded-[12px]">
            <div className="pt-6 pl-[37px] pr-6 flex items-center pb-6 justify-between border-b-[1px] border-[#534949]">
              <div className="flex items-center gap-6">
                <Image
                  src={"/settings/flatMini.png"}
                  width={82}
                  height={55}
                  alt="#"
                />
                <p className="text-md">
                  г. Алматы, Бостандыкский район · 3-х комнатная квартира
                </p>
              </div>
              <Dots />
            </div>
            <div className="px-6 py-[19px] mt-[451px] border-t-[1px] border-[#534949] flex items-center justify-between">
              <div className="flex items-center justify-between gap-[22px]">
                <Image
                  src={"/Attach.png"}
                  width={28}
                  height={28}
                  alt="attach"
                />
                <div className="w-[500px]">
                  <Input
                    className="text-[#837777] text-[16px] w-[80%]"
                    placeholder="Написать сообщения"
                  />
                </div>
              </div>
              <Image src={"/Sent.png"} width={27} height={27} alt="send" />
            </div>
          </div>
          <div className="flex flex-col gap-[22px]">
            <h1 className="whitespace-nowrap text-md font-medium mb-0.5">
              Все сообщение{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
