import React from "react";
import Card from "@/entities/Card/ui/Card";
import styles from "./styles.module.scss";

export default function LandingPage() {
  return (
    <div>
      <div className={styles.imgbg}>
        <div className="py-[128px] pl-[131px] w-[600px] text-2xl text-center font-semibold text-primary">
          <p>Найди свое идеальное жилье</p>
        </div>
      </div>
      <div className="flex gap-[125px] pl-[115px] pt-[125px]">
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
    </div>    
  );
}