"use client";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import Like from "@/shared/ui/Icons/Like/Like";
import Share from "@/shared/ui/Icons/Share/Share";
import Image from "next/image";
import Link from "next/link";
import "./styles.scss";
import { useParams } from "next/navigation";
import axios from "axios";

export type ProductProps = {
  id: number;
  author: number;
  title?: string;
  description?: string;
  location?: string;
  price: string;
  typeOfHouse?: string;
  is_favorite: boolean;
  relocation_images: { image: string | undefined | null }[];
  creationDate: string;
  owner?: {
    full_name: string;
    phone_number: string | null;
  };
};

interface Author {
  full_name: string;
  user_info: {
    contacts: string;
  };
  login: string;
  id: number;
}

export default function SettlementCard(props: ProductProps) {
  const {
    id,
    author,
    title,
    price,
    description,
    typeOfHouse,
    relocation_images,
    location,
    owner,
    creationDate,
  } = props;
  const [like, setLike] = useState<boolean>(false);
  const params = useParams() as { id: string | number };
  const [hasToken, setHasToken] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [name, setName] = useState<string>("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState(0);
  const [profession, setProfession] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const jwt = require("jsonwebtoken");

  const decodedToken = jwt.decode(accessToken);
  const full_name = decodedToken?.full_name;

  // const fetchUserData = async (userId: number) => {
  //   try {
  //     const response = await axios.get(
  //       `http://studhouse.kz/api/v1/auth/user/${userId}/`
  //     );
  //     setAuthorData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   const authorId = author;
  //   if (authorId !== undefined) {
  //     fetchUserData(authorId);
  //   }
  // }, []);

  const copyLinkToClipboard = () => {
    const url = `http://localhost:3000/routs/settlement/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Ссылка скопирована!");
      })
      .catch((error) => {
        console.error("Ошибка при копировании ссылки:", error);
      });
  };
// 
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");

    const decodedToken = jwt.decode(accessToken);
    const userId = decodedToken?.user_id;

    if (userId) {
      localStorage.setItem("userId", userId);
      setHasToken(true);
    }

    const fetchRole = async () => {
      try {
        const userResponse = await fetch(
          `http://studhouse.kz/api/v1/auth/user/${userId}/`
        );
        const user = await userResponse.json();
        setName(user.full_name);
      } catch (error) {
        console.error("Error fetching user role: ", error);
      }
    };

    fetchRole();
  }, []);

  useEffect(() => {
    const fetchDataname = async () => {
      try {
        const res = await axios.get(
          `http://studhouse.kz/api/v1/relocation/${id}`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );
        setUniversity(res.data.university);
        setCourse(res.data.course);
        setProfession(res.data.profession);
        setOwnerName(res.data.owner.full_name);
        console.log(res.data.owner.full_name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataname();
  }, [owner]);

  const addToFavorite = () => {
    setLike(!like);
    alert("Добавлено в избранные!");
  };

  return (
    <div key={id} className="bg-white rounded-[12px] pb-[30px]">
      <Link href={`/routs/settlement/${id}`}>
        <Carousel leftControl=" " rightControl=" ">
          {relocation_images?.map((image, index) => (
            <Image
              key={index}
              src={`http://studhouse.kz${image.image}`}
              width={618}
              height={380}
              className="flex object-contain img relative"
              alt="photo"
            />
          ))}
        </Carousel>
      </Link>

      <div className="flex justify-between px-7 pt-6">
        <div className="flex flex-col">
          <h1 className="text-[20px] font-medium mb-5">{typeOfHouse}</h1>
          <span className="text-[20px] font-medium mb-1">{ownerName}</span>
          <p className="text-[16px] text-[#767272] mb-3">
            {university}, {course} курс, {profession}
          </p>
          <h1 className="text-md font-medium mb-[14px]">{location}</h1>
          <h3 className="text-md mb-6">{price} т/мес.</h3>
          <h5 className="text-sm">Опубликовано в {creationDate}</h5>
        </div>
        <div className="flex items-start gap-[1rem]">
          <button onClick={copyLinkToClipboard}>
            <Share />
          </button>
          <button onClick={() => addToFavorite()}>
            <Like className={like ? "like" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
