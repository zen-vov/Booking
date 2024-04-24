"use client";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/shared/api/BASE";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ChatIdPage() {
  const [chats, setChats] = useState([]);
  const params = useParams() as { id: string | number };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${BASE_URL}/chat/chats/`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        const chatWithLastMessages = await Promise.all(
          res.data.map(async (chat: any) => {
            try {
              const lastMessageRes = await axios.get(
                `${BASE_URL}/chat/chats/${params.id}/messages/${chat.id}`,
                {
                  headers: {
                    Authorization: `JWT ${token}`,
                  },
                }
              );

              return {
                ...chat,
                last_message: lastMessageRes.data.text,
              };
            } catch (error) {
              console.error("Error fetching last message:", error);
              return {
                ...chat,
                last_message: null,
              };
            }
          })
        );

        setChats(chatWithLastMessages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChats();
  }, []);

  return (
    <section className="pt-12 pb-[120px]">
      <Link href={"/"} className="flex items-center gap-[6px] mb-12">
        <Arrow />
        <span className="text-lg">Вернуться на Главную страницу</span>
      </Link>
      <h1 className="text-lg font-semibold mb-12">Все сообщения</h1>
      <div className="flex flex-col gap-10">
        {chats.length === 0 ? (
          <p className="text-center text-lg font-medium">У вас нет сообщений</p>
        ) : (
          chats.map(({ id, text }) => (
            <Link href={`/routs/chat/${id}`} className="flex gap-9" key={id}>
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
                  {text ? text : "Нет сообщений"}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
