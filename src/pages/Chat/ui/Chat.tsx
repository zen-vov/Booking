"use client";
import React, { useState, useEffect } from "react";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import Image from "next/image";
import Dots from "@/shared/ui/Icons/3dots/dots";
import Input from "@/shared/ui/Input/Input";

interface Message {
  id: number;
  text: string;
  sender: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetch("http://studhouse.kz/api/v1/userfeed/landlord/")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Received data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const handleMessageSend = () => {
    const newMessageObject = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
    };
    setMessages([...messages, newMessageObject]);
    setNewMessage("");
  };

  return (
    <section className="pb-20 pt-5">
      <div className="flex items-center gap-[6px] mb-[25px]">
        <Arrow />
        <h2 className="text-lg font-[400]">Назад к объявлению</h2>
      </div>
      <div className="flex justify-between">
        <div className="bg-white h-[622px] w-[80%] rounded-[12px]">
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
                sender={message.sender}
                id={message.id}
              />
            ))}
          </div>
          <div className="px-6 py-[19px] border-t-[1px] border-[#534949] flex items-center justify-between">
            <div className="flex items-center justify-between gap-[22px]">
              <Image src={"/Attach.png"} width={28} height={28} alt="attach" />
              <div className="w-[500px]">
                <Input
                  className="text-[#837777] text-[16px] w-[80%]"
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
        <div className="flex flex-col gap-[22px]">
          <h1 className="whitespace-nowrap text-md font-medium mb-0.5">
            Все сообщение{" "}
          </h1>
        </div>
      </div>
    </section>
  );
}

function Message({ text, sender }: Message) {
  return (
    <div
      className={`rounded-lg flex flex-col justify-end bg-background w-[30%] mb-5 p-3 ${
        sender === "user" ? "bg-blue-100" : "bg-gray-100"
      }`}
    >
      <p className="text-sm">{text}</p>
    </div>
  );
}
