import React from "react";
import Button from "@/shared/ui/Button/Button";

export default function Problem() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <>
      {!accessToken && (
        <article className="pt-20 flex flex-col gap-8">
          <h1 className="text-[35px] font-bold">Мы вам поможем</h1>
          <p className="text-[18px] font-semibold">
            Войдите в систему, чтобы получить помощь с бронированиеми, аккаунтом
            и решить другие вопросы.
          </p>
          <div className="flex justify-end">
            <Button className="text-[22px] font-medium mt-10 rounded-[12px] bg-blue text-white py-[11px] px-[88px]">
              Войти или зарегистрироваться
            </Button>
          </div>
        </article>
      )}
      {accessToken && (
        <article className="pt-20 flex flex-col gap-8">
          <textarea
            name=""
            id=""
            cols={100}
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
      )}
    </>
  );
}
