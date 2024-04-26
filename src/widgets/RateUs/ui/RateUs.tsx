"use client";
import React from "react";
import Button from "@/shared/ui/Button/Button";
import CustomRating from "@/features/CustomRating/ui/CustomRating";

export default function RateUs() {
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [user, setUser] = React.useState();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    console.log("count of rating: ", rating);
  };
  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");

    const decodedToken = jwt.decode(accessToken);
    console.log("decoded token: ", decodedToken);
    const userId = decodedToken?.user_id;

    setUser(userId);
  });

  const submitReview = async () => {
    try {
      const response = await fetch("http://studhouse.kz/api/v1/review/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          text: review,
          author: user,
        }),
      });

      if (response.ok) {
        console.log("Отзыв успешно отправлен!");
        setRating(0);
        setReview("");
      } else {
        console.error("Ошибка при отправке запроса!");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса: ", error);
    }
  };

  return (
    <article className="pt-20 flex flex-col gap-8">
      <h1 className="text-md font-semibold">
        Мы ценим ваше мнение! Поделитесь своим опытом пребывания с нами, чтобы
        мы могли улучшить наши услуги.
      </h1>
      <CustomRating onRatingChange={handleRatingChange} />
      <textarea
        name=""
        value={review}
        onChange={handleReviewChange}
        id=""
        cols={30}
        rows={10}
        className="py-2.5 rounded-[12px] border-[1px] border-black px-[30px]"
        placeholder="Напишите здесь..."
      ></textarea>
      <div className="flex justify-end">
        <Button
          onClick={submitReview}
          className="text-[22px] font-medium mt-10 rounded-[12px] bg-blue text-white py-[11px] px-[88px]"
        >
          Отправить
        </Button>
      </div>
    </article>
  );
}
