"use client";
import React from "react";
import Card from "@/entities/Card/ui/Card";
import styles from "./styles.module.scss";
import Slider from "react-slick";
import Star from "@/shared/ui/Icons/Star/Star";
import Button from "@/shared/ui/Button/Button";
import Image from "next/image";
import { Modal } from "@/shared/ui/Modal/Modal";

export default function LandingPage() {
  const [modal, setModal] = React.useState(false)

  const sliderParams = [
    {
      title: "“Отличное и удобное приложение, очень понравилось”",
      author: "Zhumadil Bagdat",
    },
    {
      title: "“Отличное и удобное приложение, очень понравилось”",
      author: "Zhumadil Bagdat",
    },
    {
      title: "“Отличное и удобное приложение, очень понравилось”",
      author: "Zhumadil Bagdat",
    },
    {
      title: "“Отличное и удобное приложение, очень понравилось”",
      author: "Zhumadil Bagdat",
    },
    {
      title: "“Отличное и удобное приложение, очень понравилось”",
      author: "Zhumadil Bagdat",
    },
    {
      title: "“Отличное и удобное приложение, очень понравилось”",
      author: "Zhumadil Bagdat",
    },
  ];

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    className: "mb-[63px]",
    Infinity: true,
  };
  return (
    <>
      <div>
        <div className={styles.imgbg}>
          <div className="py-[128px] pl-[131px] w-[600px] text-2xl text-center font-semibold text-primary">
            <p>Найди свое идеальное жилье</p>
          </div>
        </div>
        <div className="flex gap-[125px] pl-[125px] pt-[125px]">
          <Card
            image="/Landing/house.png"
            name="Заполните запросы и найдите квартиру"
            description="Арендовать стало проще,
            независимо от того, арендуете ли вы одну или много квартир."
          />
          <Card
            image="/Landing/Handshake.png"
            name="Бренд которому вы
            можете доверять"
            description="Инструменты для арендодателей, созданные экспертами отрасли и брендом, который разбирается в недвижимости."
          />
          <Card
            image="/Landing/students.png"
            name="Только для студентов удобный сайт"
            description="Разместите свою недвижимость бесплатно на нашем сайте, чтобы помочь вам найти идеального арендатора."
          />
        </div>
        <div>
          <div className="text-center">
            <h2 className="font-[600] text-[24px]">
              Быть арендодателем проще, чем когда-либо
            </h2>
            <p className="text-[16px] font-[400]">
              Экономьте время с помощью наших инструментов управления
              недвижимостью, которые помогут вам получить то, что вам нужно —
              подписанные договоры аренды и арендные платежи.
            </p>
          </div>
          <div className="flex items-top justify-between mt-[80px]">
            <div>
              <p className="text-[20px] font-[600] mb-[20px]">
                Разместите свое объявление об аренде бесплатно
              </p>
              <p className="mb-[27px] w-[520px]">
                Простые в использовании инструменты нашего сайта позволяют
                разместить вашу недвижимость там, где ее каждый месяц ищут тысячу
                арендаторов. Кроме того, в нашу платформу для листинга
                интегрированы функции обмена сообщениями и проверки арендаторов,
                которые помогут вам быстро находить и проверять кандидатов.
              </p>
              <Button
                className="bg-blue w-[130px] rounded-[5px] py-[10px] text-white text-[20px] font-[500]"
                type="submit"
                label="Начать"
              />
              <Button
                className=" w-[130px] rounded-[5px] py-[10px] text-black  text-[20px] font-[500]"
                type="submit"
                label="Изучить"
              />
            </div>
            <div className="relative top-[-80px]">
              <Image
                width={460}
                height={460}
                src="/Landing/smart.png"
                alt="smart"
              />
            </div>
          </div>
        </div>
        <div className="mt-[64px]">
          <h2 onClick={() => setModal(true)} className="font-[600] text-center mb-[40px] text-[32px]">
            Отзывы про нас
          </h2>
          <Slider {...settings}>
            {sliderParams.map((item, index) => (
              <div className="w-[50%] h-[fit] py-6 px-4  bg-F1F1F1" key={index}>
                <p className="text-[16px] font-[400] mb-[40px]">{item.title}</p>
                <div className="flex items-center gap-[3px] mb-[10px]">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="text-[16px] font-[500]">{item.author}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
        <Modal active={modal} setActive={setModal}>
          <h1>Hello world</h1>
        </Modal>
    </>
  );
}
