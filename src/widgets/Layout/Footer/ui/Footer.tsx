import React from "react";
import Facebook from "@/shared/ui/Icons/Facebook/Facebook";
import Twitter from "@/shared/ui/Icons/Twitter/Twitter";
import VK from "@/shared/ui/Icons/VK/VK";
import Instagram from "@/shared/ui/Icons/Instagram/Instagram";

export default function Footer() {
  return (
    <>
      <footer className="pt-[45px] pb-[75px] bg-second text-white">
        <div className="container">
          <div className="flex flex-col text-center items-center gap-[25px]">
            <div>
              <h2 className="text-[40px]">StudHouse.kz</h2>
              <p className="text-[16px]">since 2024</p>
            </div>

            <div className="flex gap-[80px] flex-[600]">
              <div className="text-left flex flex-col gap-[5px]">
                <p className="cursor-pointer">Компания</p>
                <p className="cursor-pointer">Кто мы</p>
                <p className="cursor-pointer">Контакты</p>
                <p className="cursor-pointer">Корпоративным клиентам</p>
                <p className="cursor-pointer">Благотворительность</p>
                <p className="cursor-pointer">Адреса сервисных центров</p>
              </div>
              <div className="text-left flex flex-col gap-[5px]">
                <p className="cursor-pointer">Помощь арендатору</p>
                <p className="cursor-pointer">Обратная связь</p>
                <p className="cursor-pointer">История</p>
                <p className="cursor-pointer">Дополнительные услуги</p>
              </div>
              <div className="text-left flex flex-col gap-[12px]">
                <p>Наши социальные сети</p>
                <div className="flex gap-[5px]">
                  <Facebook />
                  <Twitter />
                  <VK />
                  <Instagram />
                </div>
                <p>studhouse@gmail.com 8-777-007-70-07</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
