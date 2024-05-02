"use client";
import { useState } from "react";
import { Carousel } from "flowbite-react";
import Like from "@/shared/ui/Icons/Like/Like";
import Share from "@/shared/ui/Icons/Share/Share";
import Image from "next/image";
import Link from "next/link";
import "./styles.scss";
import { useParams } from "next/navigation";

export type ProductProps = {
  id: number;
  title?: string;
  description?: string;
  location?: string;
  price: string;
  advertisement_images: { image: string }[];
  creationDate: string;
};

export default function ProductCard(props: ProductProps) {
  const {
    id,
    title,
    price,
    description,
    advertisement_images,
    location,
    creationDate,
  } = props;
  const [like, setLike] = useState<boolean>(false);
  const params = useParams() as { id: string | number };

  // const [currentSlide, setCurrentSlide] = useState(0);

  // const handleSlideChange = (newSlide: number) => {
  //   setCurrentSlide(newSlide);
  // };

  const copyLinkToClipboard = () => {
    const url = `http://localhost:3000/routs/product/${params.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Ссылка скопирована!");
      })
      .catch((error) => {
        console.error("Ошибка при копировании ссылки:", error);
      });
  };

  const addToFavorite = () => {
    setLike(!like);
    alert("Добавлено в избранные!");
  };

  return (
    <div key={id} className="bg-white rounded-[12px] pb-[30px]">
      <Link href={`/routs/product/${id}`}>
        <Carousel leftControl="" rightControl="">
          {advertisement_images.map((image, index) => (
            <Image
              src={`http://studhouse.kz${image.image}`}
              key={index}
              width={611}
              height={380}
              alt="photo"
              className="bg-no-repeat w-full relative"
            />
          ))}
        </Carousel>
      </Link>

      <div className="flex justify-between px-7 pt-6">
        <div className="flex flex-col">
          <h1 className="text-md font-medium mb-[14px]">{location}</h1>
          <h3 className="text-md mb-6">{price} т/мес.</h3>
          <h5 className="text-sm">Опубликовано в {creationDate}</h5>
        </div>
        <div className="flex items-start gap-[1rem]">
          <button onClick={copyLinkToClipboard}>
            <Share />
          </button>
        </div>
      </div>
    </div>
  );
}
