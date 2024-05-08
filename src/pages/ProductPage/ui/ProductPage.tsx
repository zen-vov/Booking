"use client";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/shared/api/BASE";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import ProductList from "@/widgets/productList/ui/productLIst";
import axios from "axios";
import Image from "next/image";
import Edit from "@/shared/ui/Icons/Edit/Edit";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Modal from "@/shared/ui/Modal/ui/Modal";

interface Advertisement {
  id: number;
  title: string;
  author: number;
  description: string;
  location: string;
  paymentTime: string;
  advertisement_images: { image: string | undefined | null }[];
  price: string;
  creationDate: string;
  floor: number;
  typeOfHouse: string;
  count_bedrooms: number;
  count_bathrooms: number;
  numberOfRooms: number;
  square: number;
  isSold: boolean;
  isArchived: boolean;
  owner: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
  haveWifi: boolean;
  haveTV: boolean;
  haveWashingMachine: boolean;
  haveParking: boolean;
  haveConditioner: boolean;
  nearbyTradeCenter: boolean;
  nearbyHospital: boolean;
  nearbySchool: boolean;
  nearbyGym: boolean;
  is_favorite: boolean;
}

interface User {
  full_name: string;
  user_info: {
    contacts: string;
  };
  login: string;
  id: number;
}

const initialChatData = {
  creationDate: "",
  author: 0,
  interlocutor: 0,
};

export default function ProductPage() {
  const [role, setRole] = useState<"Student" | "Landlord" | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(
    null
  );
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [people, setPeople] = useState<number | any>(1);
  const [user, setUser] = useState<User | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams() as { id: number | string };
  const accessToken = localStorage.getItem("accessToken");
  const jwt = require("jsonwebtoken");

  const decodedToken = jwt.decode(accessToken);
  const userId = decodedToken?.user_id;
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get<Advertisement>(
        `${BASE_URL}/advertisement/${[params.id]}/`,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
      localStorage.setItem("productId", String(response.data.id));
      return response.data;
    } catch (error) {
      console.error("Error fetching advertisement:", error);
      throw error;
    }
  };

  const fetchUserData = async (userId: number) => {
    try {
      const response = await axios.get(
        `http://studhouse.kz/api/v1/auth/user/${userId}/`
      );
      setAuthor(response.data);
      setPhone(response.data.user_info.contacts);
      console.log(user?.login);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleImageClick = (index: any) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const authorId = advertisement?.author;
    if (authorId !== undefined) {
      fetchUserData(authorId);
    }
  }, [advertisement]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");

    const decodedToken = jwt.decode(accessToken);
    const userId = decodedToken?.user_id;

    if (userId) {
      localStorage.setItem("userId", userId);
    }

    const fetchRole = async () => {
      try {
        const userResponse = await fetch(
          `http://studhouse.kz/api/v1/auth/user/${userId}/`
        );
        const user = await userResponse.json();
        console.log("owner: ", advertisement?.owner);
        setName(user.full_name);
        setRole(user.role.role_name);
      } catch (error) {
        console.error("Error fetching user role: ", error);
      }
    };

    fetchRole();
  }, [role]);

  useEffect(() => {
    if (params.id) {
      fetchData()
        .then((data) => {
          setAdvertisement(data);
          setIsFavorite(data.is_favorite);
        })
        .catch((error) => {
          console.log("error");
        });
    }
  }, [params]);

  const handleShowPhoneNumber = () => {
    setShowPhoneNumber(true);
  };

  const handleAddPeople = () => {
    if (people < 5) {
      setPeople((prevPeople: any) => {
        const updatedPeople = prevPeople + 1;
        localStorage.setItem("people", updatedPeople);
        return updatedPeople;
      });
    } else {
      return people;
    }
  };

  const handleDeleteAdvertisement = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found.");
        return;
      }
      const res = await axios.delete(`${BASE_URL}/advertisement/${params.id}`, {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });
      console.log("Advertisement deleted successfully:", res.data);
      router.push("/routs/product");
    } catch (error) {
      console.error("Error deleting advertisement:", error);
    }
  };
  //
  const addToFavorites = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found.");
        return;
      }
      const res = await axios.post(
        `${BASE_URL}/advertisement/add_to_favorite/`,
        {
          advertisement: params.id,
        },
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
      console.log("Added to favorites:", res.data);
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const fetchRepeat = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${BASE_URL}/advertisement/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      setData(res.data);
      setFilteredData(res.data.slice(0, 4));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRepeat();
  }, []);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found.");
          return;
        }

        // const currentAdId = currentAdId();

        const res = await axios.get(
          `${BASE_URL}/advertisement/get_favorite_advertisements`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );

        const favoriteAdvertisements = res.data;

        // const isCurrentAdFavorite = favoriteAdvertisements.some(
        //   (ad: any) => ad.id === currentAdId
        // );
        // setIsFavorite(isCurrentAdFavorite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, []);

  const createChat = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      const currentDate = new Date().toISOString();
      const authorId = userId;
      const interlocutorId = advertisement?.author;

      const chatData = {
        creationDate: currentDate,
        author: authorId,
        interlocutor: interlocutorId,
      };

      const res = await axios.post(
        "http://studhouse.kz/api/v1/chat/chats/",
        chatData,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );

      console.log("Chat created: ", res.data);
    } catch (error) {
      console.error("Error creating chat: ", error);
    }
  };

  const handleMessageSend = () => {
    console.log("Message sent: ", message);
  };

  const copyLinkToClipboard = () => {
    const url = `http://localhost:3000/routs/settlement/${params.id}`;
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
    <section className="py-[75px]">
      {advertisement && (
        <>
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg font-medium">{advertisement?.title}</h1>
              <h3 className="text-xl">{advertisement?.price} т/мес.</h3>
            </div>
            <p className="text-[16px] mb-8">
              Опубликовано в {advertisement?.creationDate}
            </p>
            <div className="flex gap-[60px]">
              <div className="w-[110%] h-[376px]">
                <div className="flex flex-col gap-[22px] mb-12">
                  <Image
                    src={`http://studhouse.kz${advertisement.advertisement_images[currentImageIndex]?.image}`}
                    width={558}
                    height={376}
                    alt="photo"
                    className="flex object-contain img relative"
                    onClick={openModal}
                  />
                  <div className="flex gap-4">
                    {advertisement.advertisement_images.map((image, index) => (
                      <div key={index} onClick={() => handleImageClick(index)}>
                        {image.image && (
                          <Image
                            src={`http://studhouse.kz${image.image}`}
                            width={122}
                            height={93}
                            alt={`photo-${index}`}
                            className="rounded-md h-[93px] cursor-pointer"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                  <div style={{ textAlign: "center" }}>
                    <Image
                      src={`http://studhouse.kz${advertisement.advertisement_images[currentImageIndex]?.image}`}
                      width={800}
                      height={600}
                      alt="photo"
                    />
                  </div>
                </Modal>
                {author?.id == Number(localStorage.getItem("userId")) ? (
                  <div className="flex flex-col gap-7">
                    <Button
                      label="Удалить объявление"
                      onClick={handleDeleteAdvertisement}
                      className="w-full text-white bg-blue rounded-[6px] py-2.5 text-[16px] font-medium"
                    />
                  </div>
                ) : (
                  ""
                )}
                {author?.id != Number(localStorage.getItem("userId")) ? (
                  <div className="bg-white rounded-xl py-6 px-11">
                    <div className="mb-[1rem] flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/male_user.png"}
                          width={27}
                          height={27}
                          alt="user"
                        />
                        <span className="text-[1rem]">
                          {author?.login || user?.full_name}
                        </span>
                      </div>
                      <h3 className="text-[0.8rem]">Хозяин квартиры</h3>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={"/Checkmark.png"}
                        width={27}
                        height={27}
                        alt="checkmark"
                      />
                      <h1 className="text-[1rem]">
                        Собственность подтверждена
                      </h1>
                    </div>
                    <p className="text-[0.8rem] mt-[0.5rem]">
                      Арендодатель предоставил документы собственности на жильё
                    </p>
                    <div>
                      <Link href={"/routs/chat"}>
                        <Button
                          onClick={() => {
                            handleMessageSend();
                            createChat();
                          }}
                          className="bg-blue w-[200px] text-white rounded-[6px] text-[0.9rem] font-medium text-center p-2.5 mt-[16px]"
                        >
                          Начать чат
                        </Button>
                      </Link>
                    </div>
                    {/* <div className="bg-[#f1f1f1] w-full rounded-[6px] flex justify-between relative mt-6 ">
                      <Input
                        placeholder="Отправить сообщение..."
                        className="text-[0.9rem] font-medium w-full text-[#A8A2A2] py-[11px] px-5"
                      />
                      <Link href={"/routs/chat"}>
                        <Button
                          onClick={() => {
                            handleMessageSend();
                            createChat();
                          }}
                          className="bg-blue text-white rounded-[6px] text-[0.9rem] font-medium text-center p-2.5"
                        >
                          Отправить
                        </Button>
                      </Link>
                    </div> */}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <div className="flex justify-between mb-10">
                  <div className="">
                    <h1 className="text-lg mb-[0.5rem] whitespace-nowrap">
                      О квартире
                    </h1>
                    <div className="flex flex-col gap-2">
                      <span className="text-[16px]">Адрес</span>
                      <span className="text-[16px]">Этаж</span>
                      <span className="text-[16px]">Площадь</span>
                      <span className="text-[16px]">Кол. комнат</span>
                      <span className="text-[16px]">Кол. спальни</span>
                      <span className="text-[16px]">Кол. ванных комнат</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex gap-[10px]">
                      <div className="flex flex-col gap-[0.7rem]">
                        <div className="flex gap-2 justify-end">
                          <span onClick={copyLinkToClipboard}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="cursor-pointer"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M16.8751 1.25022C16.3778 1.25022 15.9009 1.44773 15.5492 1.79932C15.1976 2.1509 15.0001 2.62774 15.0001 3.12495C15.0001 3.62217 15.1976 4.09901 15.5492 4.45059C15.9009 4.80218 16.3778 4.99969 16.8751 4.99969C17.3723 4.99969 17.8492 4.80218 18.2009 4.45059C18.5525 4.09901 18.75 3.62217 18.75 3.12495C18.75 2.62774 18.5525 2.1509 18.2009 1.79932C17.8492 1.44773 17.3723 1.25022 16.8751 1.25022ZM13.7501 3.12495C13.75 2.39185 14.0077 1.68205 14.4782 1.11975C14.9486 0.557447 15.6018 0.178447 16.3235 0.049057C17.0452 -0.0803328 17.7894 0.0481275 18.4259 0.411963C19.0625 0.775798 19.5508 1.35184 19.8054 2.0393C20.0601 2.72677 20.0649 3.48188 19.819 4.17252C19.5731 4.86317 19.0921 5.44536 18.4603 5.81726C17.8284 6.18915 17.0859 6.32705 16.3626 6.20684C15.6394 6.08662 14.9814 5.71595 14.5038 5.15967L6.10648 9.05912C6.29945 9.67085 6.29945 10.3271 6.10648 10.9389L14.5038 14.8383C15.0086 14.2513 15.7134 13.8726 16.4816 13.7755C17.2497 13.6785 18.0265 13.87 18.6615 14.313C19.2965 14.756 19.7443 15.4189 19.9183 16.1733C20.0923 16.9276 19.98 17.7197 19.6032 18.396C19.2264 19.0723 18.612 19.5847 17.8789 19.8338C17.1458 20.0829 16.3463 20.0511 15.6354 19.7444C14.9245 19.4377 14.3528 18.8781 14.031 18.1739C13.7092 17.4698 13.6604 16.6713 13.8939 15.9332L5.49649 12.0337C5.08079 12.5181 4.52669 12.8636 3.90874 13.0237C3.29079 13.1838 2.63862 13.1508 2.03997 12.9292C1.44132 12.7076 0.924911 12.308 0.560206 11.7841C0.195502 11.2602 0 10.6373 0 9.99899C0 9.36071 0.195502 8.73774 0.560206 8.21388C0.924911 7.69003 1.44132 7.29041 2.03997 7.0688C2.63862 6.84719 3.29079 6.81422 3.90874 6.97431C4.52669 7.1344 5.08079 7.47988 5.49649 7.96428L13.8939 4.06482C13.7983 3.7607 13.7498 3.44374 13.7501 3.12495ZM3.12528 8.12425C2.62801 8.12425 2.1511 8.32177 1.79948 8.67335C1.44785 9.02493 1.25031 9.50178 1.25031 9.99899C1.25031 10.4962 1.44785 10.973 1.79948 11.3246C2.1511 11.6762 2.62801 11.8737 3.12528 11.8737C3.62255 11.8737 4.09946 11.6762 4.45108 11.3246C4.80271 10.973 5.00025 10.4962 5.00025 9.99899C5.00025 9.50178 4.80271 9.02493 4.45108 8.67335C4.09946 8.32177 3.62255 8.12425 3.12528 8.12425ZM16.8751 14.9983C16.3778 14.9983 15.9009 15.1958 15.5492 15.5474C15.1976 15.899 15.0001 16.3758 15.0001 16.873C15.0001 17.3702 15.1976 17.8471 15.5492 18.1987C15.9009 18.5502 16.3778 18.7478 16.8751 18.7478C17.3723 18.7478 17.8492 18.5502 18.2009 18.1987C18.5525 17.8471 18.75 17.3702 18.75 16.873C18.75 16.3758 18.5525 15.899 18.2009 15.5474C17.8492 15.1958 17.3723 14.9983 16.8751 14.9983Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                          {role == "Student" ? (
                            <svg
                              className="cursor-pointer"
                              onClick={addToFavorites}
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M10.0002 3.66405L9.1039 2.68139C7.00008 0.37473 3.14246 1.17073 1.74992 4.07072C1.09615 5.43471 0.948648 7.40404 2.14243 9.91737C3.29247 12.3374 5.68504 15.236 10.0002 18.3933C14.3153 15.236 16.7066 12.3374 17.8579 9.91737C19.0517 7.40271 18.9054 5.43471 18.2504 4.07072C16.8579 1.17073 13.0003 0.373397 10.8965 2.68006L10.0002 3.66405ZM10.0002 20C-9.16666 6.49071 4.09874 -4.05326 9.78017 1.52406C9.85517 1.59784 9.9285 1.67384 10.0002 1.75206C10.0706 1.67334 10.144 1.59773 10.2202 1.52539C15.9004 -4.05592 29.167 6.48938 10.0002 20Z"
                                fill={`${isFavorite ? "red" : "black"}`}
                              />
                            </svg>
                          ) : (
                            <Link href={"/routs/edit"}>
                              <Edit />
                            </Link>
                          )}
                        </div>
                        <span className="whitespace-nowrap text-[16px]">
                          {advertisement.location}
                        </span>
                        <span className="text-[16px] whitespace-nowrap">
                          {advertisement.floor}
                        </span>
                        <span className="text-[16px] whitespace-nowrap">
                          {advertisement.square} м²
                        </span>
                        <span className="text-[16px] whitespace-nowrap">
                          {advertisement.numberOfRooms}
                        </span>
                        <span className="text-[16px] whitespace-nowrap">
                          {advertisement.count_bedrooms}
                        </span>
                        <span className="text-[16px] whitespace-nowrap">
                          {advertisement.count_bathrooms}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <h1 className="mb-3 text-lg">Описание</h1>
                  <p className="text-[14px] max-w-[1800px]">
                    {advertisement?.description}
                  </p>
                </div>
                <div className="">
                  <h1 className="text-lg mt-10 mb-[18px]">Удобство</h1>
                  <div className="flex gap-[489px]">
                    <div>
                      <ul className="flex flex-col gap-2.5">
                        <li className="text-[15px]">Wi-Fi</li>
                        <li className="text-[15px]">Телевизор</li>
                        <li className="text-[15px]">Стиральная машина</li>
                        <li className="text-[15px]">Парковка</li>
                        <li className="text-[15px]">Кондиционер</li>
                        <li className="text-[15px]">Торговые центры</li>
                        <li className="text-[15px]">Больница</li>
                        <li className="text-[15px]">Школа</li>
                        <li className="text-[15px]">Спортивный зал</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="flex flex-col gap-2.5">
                        <li className="text-[15px]">
                          {advertisement.haveWifi ? "Есть" : "Нету"}
                        </li>
                        <li className="text-[15px]">
                          {advertisement.haveTV ? "Есть" : "Нету"}
                        </li>
                        <li className="text-[15px]">
                          {advertisement.haveWashingMachine ? "Есть" : "Нету"}
                        </li>
                        <li className="text-[15px]">
                          {advertisement.haveParking ? "Есть" : "Нету"}
                        </li>
                        <li className="text-[15px]">
                          {advertisement.haveConditioner ? "Есть" : "Нету"}
                        </li>
                        <li className="text-[15px]">
                          {advertisement.nearbyTradeCenter ? "Есть" : "Нету"}
                        </li>
                        <li className="text-[15px]">
                          {advertisement.nearbyHospital ? "Есть" : "Нету"}
                        </li>
                        <li className="text-[15px]">
                          {advertisement.nearbySchool ? "Есть" : "Нету"}
                        </li>
                        <li className="text-[15px]">
                          {advertisement.nearbyGym ? "Есть" : "Нету"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-[100px]">
                  {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.034149153324!2d76.6670930764335!3d43.20877307112663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x388345a35db0962d%3A0xd9437541092dd062!2sSDU!5e0!3m2!1sen!2skz!4v1712296819450!5m2!1sen!2skz"
                    width="668"
                    height="202"
                    style={{ border: "0", borderRadius: "5px" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe> */}
                </div>
              </div>
            </div>
            <h1 className="text-md font-medium mt-[111px] mb-6 mt-[100px]">
              Похожие запросы
            </h1>
            <div className="grid grid-cols-2 gap-10">
              <ProductList records={filteredData} />
            </div>
          </>
        </>
      )}
    </section>
  );
}
