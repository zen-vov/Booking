"use client";
import { useState } from "react";
import { Carousel } from "flowbite-react";
import Share from "@/shared/ui/Icons/Share/Share";
import Link from "next/link";
import "./styles.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

export type ProductProps = {
  id: number;
  title?: string;
  description?: string;
  location?: string;
  price: string;
  advertisement_images: { image: string | any | null }[];
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
  const router = useRouter();

  const copyLinkToClipboard = () => {
    const url = `http://localhost:3000/routs/product/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Ссылка скопирована!");
      })
      .catch((error) => {
        console.error("Ошибка при копировании ссылки:", error);
      });
  };

  return (
    <div key={id} className="bg-white rounded-[12px] pb-[30px]">
      <Link href={`/routs/product/${id}`}>
        <Carousel leftControl=" " rightControl=" ">
          {advertisement_images?.map((image, index) => (
            <Image
              key={index}
              src={`http://studhouse.kz${image.image}`}
              width={611}
              height={380}
              alt="photo"
              className="flex relative"
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
