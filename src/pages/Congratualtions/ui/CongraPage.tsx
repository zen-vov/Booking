"use client";
import React from "react";
import Card from "@/entities/Card/ui/Card";
import styles from "./styles.module.scss";
import Slider from "react-slick";
import Star from "@/shared/ui/Icons/Star/Star";
import Button from "@/shared/ui/Button/Button";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/shared/ui/Modal/Modal";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";

export default function CongratulationsPage() {
  const [modal, setModal] = React.useState(false);
  const [modalActive, setModalActive] = React.useState(false);

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
    infinite: true,
  };
  return (
    <>
      <div className="pt-10">
        <Link href={"/"} className="flex gap-[5px] items-center mb-10">
          <Arrow />
          <span className="text-[16px] font-medium">
            Вернутся на главное меню
          </span>
        </Link>
        <div className="flex flex-col items-center justify-center">
          <Image
            width={187}
            height={221}
            src={"/fef5e8de15d56da97dd49c139659bd3e.png"}
            alt="content"
          />
          <h1 className="text-[30px] mt-[22px] text-center">
            Вы успешно разместили ваше обьяление!
          </h1>
        </div>
        <div className="container flex justify-center items-center gap-[125px] pl-[125px] pt-[125px]">
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
        <div className="container mt-[168px]">
          <div className="text-center">
            <h2 className="font-[600] text-[24px]">
              Быть арендодателем проще, чем когда-либо
            </h2>
            <p className="text-[16px] font-[400] pt-[20px]">
              Экономьте время с помощью наших инструментов управления
              недвижимостью, которые помогут вам получить то, что вам <br />
              нужно — подписанные договоры аренды и арендные платежи.
            </p>
          </div>
          <div className="flex items-top justify-between mt-[80px]">
            <div>
              <p className="text-[20px] font-[600] mb-[20px]">
                Разместите свое объявление об аренде бесплатно
              </p>
              <p className="mb-[27px] w-[520px]">
                Простые в использовании инструменты нашего сайта позволяют
                разместить вашу недвижимость там, где ее каждый месяц ищут
                тысячу арендаторов. Кроме того, в нашу платформу для листинга
                интегрированы функции обмена сообщениями и проверки арендаторов,
                которые помогут вам быстро находить и проверять кандидатов.
              </p>
              <Link href={"/routs/posthouse"}>
                <Button
                  className="bg-blue w-[130px] rounded-[5px] py-[10px] text-white text-[20px] font-[500]"
                  type="submit"
                  label="Начать"
                />
              </Link>

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
        <div className="container mt-[48px] mb-[150px]">
          <h2
            onClick={() => setModal(true)}
            className="font-[600] text-center mb-[40px] text-[32px]"
          >
            Отзывы про нас
          </h2>
          <Slider {...settings}>
            {sliderParams.map((item, index) => (
              <div
                className="w-[50%] h-[auto] py-6 px-4 bg-transparent"
                key={index}
              >
                <p className="text-[16px] mb-[40px]">{item.title}</p>
                <div className="flex items-center  gap-[3px] mb-[10px]">
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
    </>
  );
}
