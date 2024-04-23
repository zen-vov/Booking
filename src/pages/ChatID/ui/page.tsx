"use client";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/shared/api/BASE";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function ChatIdPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${BASE_URL}/chat/chats/`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChat();
  }, []);

  return (
    <section className="pt-12 pb-[120px]">
      <Link href={"/"} className="flex items-center gap-[6px] mb-12">
        <Arrow />
        <span className="text-lg">Вернуться на Главную страницу</span>
      </Link>
      <h1 className="text-lg font-semibold mb-12">Все сообщения</h1>
      <div className="flex flex-col gap-10">
        {data.length === 0 ? (
          <p className="text-center text-lg font-medium">У вас нет сообщений</p>
        ) : (
          data.map(({ id, creationDate, interlocutor, author }) => (
            <div className="flex gap-9" key={id}>
              <Image
                src={""}
                className="rounded-[12px]"
                width={247}
                height={123}
                alt="chat"
              />
              <div className="flex flex-col gap-8">
                <h1 className="text-lg font-medium white-space">
                  г. Алматы, Бостандыкский район · 3-х комнатная квартира
                </h1>
                <p className="text-md font-light">
                  Здравствуйте! Хотели бы снять эту квартиру
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
