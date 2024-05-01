"use client";
import React, { useState, useEffect } from "react";
import Button from "@/shared/ui/Button/Button";
import AuthModal from "@/features/AuthModal/ui/AuthModal";
import { useUser } from "@/features/UserContext/ui/UserProvider";
import axios from "axios";
import { BASE_URL } from "@/shared/api/BASE";

export default function Problem() {
  const accessToken = localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const { user, setUser } = useUser();

  const handleLoginClick = () => {
    if (!user) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${BASE_URL}/report/`,
        {
          text,
          date,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      console.log("Report submitted:", res.data);
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/report/`);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProblem();
  }, []);

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
            <Button
              onClick={handleLoginClick}
              className="text-[22px] font-medium mt-10 rounded-[12px] bg-blue text-white py-[11px] px-[88px]"
            >
              Войти или зарегистрироваться
            </Button>
          </div>
          {isModalOpen && <AuthModal onClose={closeModal} />}
        </article>
      )}
      {accessToken && (
        <article className="pt-20 flex flex-col gap-8">
          <textarea
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            cols={100}
            rows={10}
            className="py-2.5 rounded-[12px] border-[1px] border-black px-[30px]"
            placeholder="Напишите здесь..."
          ></textarea>

          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="text-[22px] font-medium mt-10 rounded-[12px] bg-blue text-white py-[11px] px-[88px]"
            >
              Отправить
            </Button>
          </div>
        </article>
      )}
    </>
  );
}
