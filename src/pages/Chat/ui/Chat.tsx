import React from "react";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import Image from "next/image";

export default function ChatPage() {
  return (
    <div>
      <div>
        <div className="flex items-center gap-[6px]">
          <Arrow />
          <h2 className="text-lg font-[400]">Назад к объявлению</h2>
        </div>
        <div>
          <div className="bg-white">
            <Image
              src={"/settings/flatMini.png"}
              width={82}
              height={55}
              alt="#"
            />
            <p>г. Алматы, Бостандыкский район · 3-х комнатная квартира</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}
