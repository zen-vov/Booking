"use client";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/shared/api/BASE";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function ChatIdPage() {
  const [data, setData] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [personalChats, setPersonalChats] = useState([]);
  const [incomingChats, setIncomingChats] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [interlocutor, setInterlocutor] = useState("");
  const [interlocutorId, setInterlocutorId] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("user id from chats: ", userId);

    const fetchUser = async () => {
      try {
        const userRes = await fetch(
          `http://studhouse.kz/api/v1/auth/user/${userId}/`
        );
        const user = await userRes.json();
        setUserId(user.id);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    const fetchChat = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://studhouse.kz/api/v1/chat/chats/", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        const chats = res.data;
        setData(chats);
        // console.log("chats from res.data: ", chats);

        const personalChatsFiltered = res.data.filter(
          (chat: { author: undefined }) => chat.author === Number(userId)
        );
        const incomingChatsFiltered = res.data.filter(
          (chat: { interlocutor: undefined; author: undefined }) =>
            chat.interlocutor === Number(userId) &&
            chat.author !== Number(userId)
        );
        setPersonalChats(personalChatsFiltered);
        setIncomingChats(incomingChatsFiltered);

        console.log("all chats: ", data);
        console.log("personal chats: ", personalChats);
        console.log("incoming chats: ", incomingChats);
      } catch (err) {
        console.log(err);
      }
    };

    // const fetchInterlocutor = async () => {
    //   try {
    //     const userRes = await fetch(
    //       `http://studhouse.kz/api/v1/auth/user/${interlocutor}/`
    //     );
    //     const user = await userRes.json();
    //     setUserId(user.id);
    //   } catch (error) {
    //     console.error("Error fetching user: ", error);
    //   }
    // };

    fetchUser();
    fetchChat();
  }, [userId]);

  return (
    <section className="pt-12 pb-[120px]">
      <Link href={"/"} className="flex items-center gap-[6px] mb-12">
        <Arrow />
        <span className="text-lg">Вернуться на Главную страницу</span>
      </Link>
      <h1 className="text-lg font-semibold mb-12">Все сообщения</h1>
      <div className="flex flex-col gap-10">
        {personalChats.length === 0 && incomingChats.length === 0 ? (
          <p className="text-center text-lg font-medium">У вас нет сообщений</p>
        ) : (
          <>
            {personalChats.length > 0 && (
              <div>
                <h2 className="text-lg font-medium white-space mb-[24px]">
                  Чаты, созданные вами:
                </h2>
                {personalChats.map(({ id, creationDate, interlocutor }) => (
                  <Link
                    href={`/routs/chat/${id}`}
                    className="flex gap-9 border-b border-b-primary py-[10px] hover:bg-[#ddd] rounded-[10px] my-[16px]"
                    key={id}
                  >
                    {/* <Image
                      src={"/"}
                      className="rounded-[12px]"
                      width={247}
                      height={123}
                      alt="chat"
                    /> */}
                    <div className="flex flex-col gap-8">
                      <h1 className="text-lg font-medium white-space">
                        г. Алматы, Бостандыкский район · 3-х комнатная квартира
                      </h1>
                      <div className="flex items-center gap-[16px]">
                        {interlocutor}:
                        <p className="text-md font-light">
                          У вас новое сообщение.
                        </p>
                      </div>
                      <p>{creationDate}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {incomingChats.length > 0 && (
              <div>
                <h2 className="text-lg font-medium white-space mb-[24px]">
                  Чаты, где вам пишут:
                </h2>
                {incomingChats.map(({ id, creationDate, author }) => (
                  <Link
                    href={`/routs/chat/${id}`}
                    className="flex gap-9 border-b border-b-primary py-[10px] hover:bg-[#ddd] rounded-[10px] my-[16px]"
                    key={id}
                  >
                    {/* <Image
                      src={"/"}
                      className="rounded-[12px]"
                      width={247}
                      height={123}
                      alt="chat"
                    /> */}
                    <div className="flex flex-col gap-8">
                      <h1 className="text-lg font-medium white-space">
                        г. Алматы, Бостандыкский район · 3-х комнатная квартира
                      </h1>
                      <div className="flex items-center gap-[16px]">
                        {author}:
                        <p className="text-md font-light">
                          У вас новое сообщение.
                        </p>
                      </div>
                      <p>{creationDate}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
