"use client";
import { Rating } from "flowbite-react";
import Button from "@/shared/ui/Button/Button";

export default function RateUs() {
  return (
    <article className="pt-20 flex flex-col gap-8">
      <h1 className="text-md font-semibold">
        Мы ценим ваше мнение! Поделитесь своим опытом пребывания с нами, чтобы
        мы могли улучшить наши услуги.
      </h1>
      <Rating size="lg">
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star filled={false} />
      </Rating>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        className="py-2.5 rounded-[12px] border-[1px] border-black px-[30px]"
        placeholder="Напишите здесь..."
      ></textarea>
      <div className="flex justify-end">
        <Button className="text-[22px] font-medium mt-10 rounded-[12px] bg-blue text-white py-[11px] px-[88px]">
          Отправить
        </Button>
      </div>
    </article>
  );
}
