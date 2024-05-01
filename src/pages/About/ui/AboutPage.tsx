"use client";
import React, { useState } from "react";
import AboutUs from "@/widgets/AboutUs/ui/aboutus";
import Contacts from "@/widgets/Contacts/ui/contacts";
import RateUs from "@/widgets/RateUs/ui/RateUs";
import Faq from "@/widgets/faq/ui/faq";
import Problem from "@/widgets/Problem/ui/Problem";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  React.useEffect(() => {
    const footerTab = localStorage.getItem("footerTab");
    setActiveTab(String(footerTab));
  }, []);

  return (
    <section className="flex gap-[56px]">
      <div>
        <h1 className="text-xl font-semibold mb-9">О компании</h1>
        <div className="flex flex-col">
          <h3
            className={`border-b-[1px] text-md font-semibold whitespace-nowrap border-[#767272] pb-[9px] cursor-pointer ${
              activeTab === "about" ? "text-blue" : ""
            }`}
            onClick={() => handleTabClick("about")}
          >
            О компании
          </h3>
          <h3
            className={`border-b-[1px] text-md font-semibold whitespace-nowrap border-[#767272] py-[9px] cursor-pointer ${
              activeTab === "contacts" ? "text-blue" : ""
            }`}
            onClick={() => handleTabClick("contacts")}
          >
            Контакты
          </h3>
          <h3
            className={`border-b-[1px] text-md font-semibold whitespace-nowrap border-[#767272] py-[9px] cursor-pointer ${
              activeTab === "faq" ? "text-blue" : ""
            }`}
            onClick={() => handleTabClick("faq")}
          >
            FAQ
          </h3>
          <h3
            className={`border-b-[1px] text-md font-semibold whitespace-nowrap border-[#767272] py-[9px] cursor-pointer ${
              activeTab === "rateus" ? "text-blue" : ""
            }`}
            onClick={() => handleTabClick("rateus")}
          >
            Обратная связь
          </h3>
          <h3
            className={`border-b-[1px] text-md font-semibold whitespace-nowrap border-[#767272] py-[9px] cursor-pointer ${
              activeTab === "problem" ? "text-blue" : ""
            }`}
            onClick={() => handleTabClick("problem")}
          >
            Сообщить о проблеме
          </h3>
        </div>
      </div>
      {activeTab === "about" && <AboutUs />}
      {activeTab === "contacts" && <Contacts />}
      {activeTab === "rateus" && <RateUs />}
      {activeTab === "faq" && <Faq />}
      {activeTab === "problem" && <Problem />}
    </section>
  );
}
