"use client";
import React, { useState, useEffect } from "react";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import Image from "next/image";
import Dots from "@/shared/ui/Icons/3dots/dots";
import Input from "@/shared/ui/Input/Input";
import axios from "axios";
import { BASE_URL } from "@/shared/api/BASE";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface Message {
  id?: number;
  chat?: number;
  text?: string;
  creationDate?: string;
  author?: number;
  author_detail?: {
    author_type?: string;
    author?: {
      id?: number;
      username?: string | null;
    };
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams() as { id: number | string };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const storedMessages = localStorage.getItem(
          `chatMessages_${params.id}`
        );
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }

        const res = await axios.get(
          `${BASE_URL}/chat/chats/${params.id}/messages/`
        );
        setMessages(res.data);
        localStorage.setItem(
          `chatMessages_${params.id}`,
          JSON.stringify(res.data)
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();

    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");

    const decodedToken = jwt.decode(accessToken);
    const userId = decodedToken?.user_id;
    const full_name = decodedToken?.full_name;

    if (userId) {
      setUserId(userId);
    }
    if (full_name) {
      setFullName(full_name);
    }
  }, [params.id]);

  const handleMessageSend = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const newMessageObject = {
        text: newMessage,
        creationDate: new Date().toISOString(),
      };

      const res = await axios.post(
        `${BASE_URL}/chat/chats/${params.id}/messages/`,
        newMessageObject,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );

      setMessages([...messages, res.data]);
      setNewMessage("");

      localStorage.setItem(
        `chatMessages_${params.id}`,
        JSON.stringify([...messages, res.data])
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  return (
    <section className="pb-20 pt-5">
      <div className="flex items-center gap-[6px] mb-[25px]">
        <Arrow />
        <h2 className="text-lg font-[400]">Назад к объявлению</h2>
        <button onClick={handleLogout}>Выйти</button>
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between">
          <div className="bg-white h-[622px] w-[1100px] rounded-[12px] flex flex-col justify-between">
            <div>
              <div className="pt-6 pl-[37px] pr-6 flex items-center pb-6 justify-between border-b-[1px] border-[#534949]">
                <div className="flex items-center gap-6">
                  <Image
                    src={"/settings/flatMini.png"}
                    width={82}
                    height={55}
                    alt="#"
                  />
                  <p className="text-md">
                    г. Алматы, Бостандыкский район · 3-х комнатная квартира
                  </p>
                </div>
                <Dots />
              </div>
              <div className="px-6 flex flex-col items-end py-4">
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    text={message.text}
                    creationDate={message.creationDate}
                    author={message.author}
                    fullName={fullName}
                    userId={userId}
                  />
                ))}
              </div>
            </div>
            <div className="px-6 py-[19px] border-t-[1px] border-[#534949] flex items-center justify-between">
              <div className="flex items-center justify-between gap-[22px]">
                <Image
                  src={"/Attach.png"}
                  width={28}
                  height={28}
                  alt="attach"
                />
                <div className="w-[500px]">
                  <Input
                    className="text-[#837777] text-[16px] w-[1000px]"
                    placeholder="Написать сообщение"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </div>
              </div>
              <button onClick={handleMessageSend} className="cursor-pointer">
                <Image src={"/Sent.png"} width={27} height={27} alt="send" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[22px]">
          <h1 className="whitespace-nowrap text-md font-medium mb-0.5">
            Все сообщение{" "}
          </h1>
        </div>
      </div>
    </section>
  );
}

function Message({
  text,
  creationDate,
  author,
  userId,
  fullName,
}: Message & { fullName: string | null; userId: number | null }) {
  const isCurrentUser = author === userId;

  return (
    <div
      className={`rounded-lg flex flex-col justify-end bg-background w-[30%] mb-5 p-3 ${
        isCurrentUser ? "self-end bg-blue-100" : "bg-gray-100"
      }`}
    >
      <p className="text-sm">{text}</p>
      <p className="text-xs text-[#837777]">
        {fullName} - {new Date(creationDate).toLocaleString()}
      </p>
    </div>
  );
}
