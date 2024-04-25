"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/shared/api/BASE";
import { useParams } from "next/navigation";
import Image from "next/image";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import Dots from "@/shared/ui/Icons/3dots/dots";
import Input from "@/shared/ui/Input/Input";
import "./styles.scss";

interface Message {
  id: number;
  chat: number;
  text: string;
  creationDate: string | any;
  author: number;
  author_detail: {
    author_type: string;
    author: {
      id: number;
      username: string | null;
    };
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const params = useParams() as { id: string | number };
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/chat/chats/${params.id}/messages/`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (data.length > 0) {
        setMessages((prev) => [...data, ...prev]);
      }
      await subscribe();
    } catch (err) {
      console.error("Error in long polling:", err);
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post(
        `${BASE_URL}/chat/chats/${params.id}}/messages/`,
        {
          text: newMessage,
          creationDate: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <section className="pb-20 pt-5">
      <div className="flex items-center gap-[6px] mb-[25px]">
        <Arrow />
        <h2 className="text-lg font-[400]">Назад к объявлению</h2>
      </div>
      <div className="flex justify-between gap-10">
        <div className="bg-white h-[100%] w-[1100px] rounded-[12px] flex flex-col justify-between">
          <div className="static pt-6 pl-[37px] pr-6 flex items-center pb-6 justify-between border-b-[1px] border-[#534949]">
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
          <div className="px-6 overflow-y-auto flex flex-col items-end py-4">
            {messages?.map((message) => (
              <Message key={message.id} text={message.text} id={message.id} />
            ))}
          </div>
          <div className="px-6 py-[19px] border-t-[1px] border-[#534949] flex items-center justify-between">
            <div className="flex items-center justify-between gap-[22px]">
              <Image src={"/Attach.png"} width={28} height={28} alt="attach" />
              <div className="w-[500px]">
                <Input
                  className="text-[#837777] text-[16px] w-[1000px]"
                  placeholder="Написать сообщение"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>
            </div>
            <button onClick={sendMessage} className="cursor-pointer">
              <Image src={"/Sent.png"} width={27} height={27} alt="send" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[22px]">
          <h1 className="whitespace-nowrap text-md font-medium mb-0.5">
            Все сообщение{" "}
          </h1>
          <div className="flex flex-col gap-[22px]">
            {/* Список всех чатов */}
          </div>
        </div>
      </div>
    </section>
  );
}

function Message({
  text,
  creationDate,
  author_detail,
  fullName,
  currentUserType,
}: Message & {
  fullName: string | null;
  currentUserType: string | null;
}) {
  const isCurrentUser = currentUserType === "me";

  return (
    <div
      className={`rounded-lg flex flex-col justify-end bg-background w-[30%] mb-5 p-3 ${
        isCurrentUser ? `self-end bg-blue-100` : `bg-gray-100`
      }`}
    >
      <p className="text-sm overflow-hidden overflow-ellipsis break-words">
        {text}
      </p>
      <p className="text-xs text-[#837777]">
        {fullName} - {new Date(creationDate).toLocaleString()}
      </p>
      <svg width="9" height="20" className="svg-appendix">
        <defs>
          <filter
            x="-50%"
            y="-14.7%"
            width="200%"
            height="141.2%"
            filterUnits="objectBoundingBox"
            id="messageAppendix"
          >
            <feOffset
              dy="1"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            ></feOffset>
            <feGaussianBlur
              stdDeviation="1"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            ></feGaussianBlur>
            <feColorMatrix
              values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0"
              in="shadowBlurOuter1"
            ></feColorMatrix>
          </filter>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <path
            d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
            fill="#000"
            filter="url(#messageAppendix)"
          ></path>
          <path
            d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
            fill="FFF"
            className="corner"
          ></path>
        </g>
      </svg>
    </div>
  );
}
