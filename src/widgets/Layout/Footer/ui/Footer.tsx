"use client";
import React from "react";
import Facebook from "@/shared/ui/Icons/Facebook/Facebook";
import Twitter from "@/shared/ui/Icons/Twitter/Twitter";
import VK from "@/shared/ui/Icons/VK/VK";
import Instagram from "@/shared/ui/Icons/Instagram/Instagram";
import Link from "next/link";

export default function Footer() {
  const [footerTab, setFooterTab] = React.useState("");

  const handleFooterTab = (tab: any) => {
    setFooterTab(tab);
    localStorage.setItem("footerTab", tab);
    // window.location.reload();
  };

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
                <Link href={"/routs/about"}>
                  <p className="cursor-pointer">Компания</p>
                </Link>
                <Link href={"/routs/about"}>
                  <p
                    className="cursor-pointer"
                    onClick={() => handleFooterTab("about")}
                  >
                    О нас
                  </p>
                </Link>
                <Link href={"/routs/about"}>
                  <p
                    className="cursor-pointer"
                    onClick={() => handleFooterTab("contacts")}
                  >
                    Контакты
                  </p>
                </Link>
                <Link href={"/routs/about"}>
                  <p
                    className="cursor-pointer"
                    onClick={() => handleFooterTab("faq")}
                  >
                    F.A.Q
                  </p>
                </Link>
                <Link href={"/routs/about"}>
                  <p
                    className="cursor-pointer"
                    onClick={() => handleFooterTab("rateus")}
                  >
                    Оцените нас
                  </p>
                </Link>
              </div>
              <div className="text-left flex flex-col gap-[5px]">
                <p className="cursor-pointer">Помощь арендатору</p>
                <Link href={"/routs/about"}>
                  <p
                    className="cursor-pointer"
                    onClick={() => handleFooterTab("rateus")}
                  >
                    Обратная связь
                  </p>
                </Link>

                <Link href={"/routs/about"}>
                  <p
                    className="cursor-pointer"
                    onClick={() => handleFooterTab("problem")}
                  >
                    Сообщить о проблеме
                  </p>
                </Link>
              </div>
              <div className="text-left flex flex-col gap-[12px]">
                <p>Наши социальные сети</p>
                <div className="flex gap-[5px]">
                  <Facebook />
                  <Twitter />
                  <VK />
                  <Instagram />
                </div>
                <a href="">student.house.sdu@gmail.com</a>
                <p>8-777-007-70-07</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
