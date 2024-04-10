import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import Link from "next/link";
import { data, data2 } from "./data/data";
import Button from "@/shared/ui/Button/Button";

export default function PostHousePage() {
  return (
    <section className="py-[30px] pb-[74px]">
      <Link href={"/"} className="flex gap-1 items-center mb-[65px]">
        <Arrow />
        <p className="text-[16px] font-[500]">Вернутся на главное меню</p>
      </Link>
      <div className="flex gap-[183px] items-center">
        <div className="left__post mb-[65px]">
          <h1 className="text-[36px] w-[105%] font-medium">
            Сдать жилье на StudHouse.kz
          </h1>
        </div>
        <div className="left__post">
          <h1 className="text-md mb-5">Правила пользования сайтом</h1>
          <p className="text-[12px]">
            Добро пожаловать на StudHouse.kz! Мы предлагаем платформу для
            арендодателей, желающих сдать свое жилье. Пожалуйста, внимательно
            ознакомьтесь с данными правилами, так как они определяют ваши права
            и обязанности при использовании нашего сайта.
          </p>
          <ul className="list-decimal mt-[18px] mb-[18px] pl-5">
            {data.map(({ text_span, text }, index) => (
              <li className="text-[12px]" key={index}>
                <span className="text-[12px] font-medium">{text_span}</span>{" "}
                {text}
              </li>
            ))}
          </ul>
          <h3 className="text-[12px] mb-[18px]">Политика конфиденциальности</h3>
          <p className="text-[12px]">
            Ваша конфиденциальность важна для нас. Наша политика
            конфиденциальности описывает, как мы собираем, используем и защищаем
            вашу личную информацию.
          </p>
          <ul className="list-decimal mt-[1rem] pl-5">
            {data2.map(({ text_span, text }, index) => (
              <li className="text-[12px]" key={index}>
                <span className="text-[12px] font-medium">{text_span}</span>{" "}
                {text}
              </li>
            ))}
          </ul>
          <div className="flex gap-[6px] mt-[1rem]">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-[12px]">
              Я прочитал(а) и соглашаюсь с Условиями использования и Политикой
              конфиденциальности сайта StudHouse.kz. Я понимаю, что моя личная
              информация будет использоваться в соответствии с этими
              документами.
            </label>
          </div>
          <Link href={"/routs/postchoose"} className="flex justify-end">
            <Button
              label="Продолжить"
              className="rounded-[5px] text-center text-white bg-blue text-[12px] font-medium mt-[33px] p-[1rem]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
