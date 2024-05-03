/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import Plus from "@/shared/ui/Icons/Plus/Plus";
import Minus from "@/shared/ui/Icons/Minus/Minus";
import Wifi from "@/shared/ui/Icons/Wifi/Wifi";
import TV from "@/shared/ui/Icons/TV/TV";
import Parking from "@/shared/ui/Icons/Parking/Parking";
import Conditioner from "@/shared/ui/Icons/Conditioner/Conditioner";
import Washing from "@/shared/ui/Icons/Washing/Washing";
import NoImg from "@/shared/ui/Icons/NoImg/NoImg";
import Shop from "@/shared/ui/Icons/Shop/Shop";
import School from "@/shared/ui/Icons/School/School";
import Hospital from "@/shared/ui/Icons/Hospital/Hospital";
import Dumbell from "@/shared/ui/Icons/Dumbell/Dumbell";
import Dropdown from "@/shared/ui/Dropdown/Dropdown";
import ProductList from "@/widgets/productList/ui/productLIst";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import Map from "@/features/Map/ui/Map";

interface Counter {
  name: string;
  count: number;
}

interface IconButton {
  icon: JSX.Element;
  label: string;
}

interface FormData {
  location: string;
  uploaded_images: File[] | null; // Массив файлов изображений
  title: string;
  author: number;
  description: string;
  typeOfHouse: string; // Тип дома: например, "апартаменты", "дом", "квартира" и т. д.
  price: number; // Цена за жилье (может быть строкой, если нужно учитывать валюту и т. д.)
  paymentTime: "daily" | "monthly" | "yearly"; // Время оплаты: ежедневно, ежегодно, раз в полгода
  floor: number; // Этаж
  square: number; // Площадь квартиры
  max_people_count: number;
  current_people_count: number;
  count_bedrooms: number;
  count_bathrooms: number;
  numberOfRooms: number;
  haveWifi: boolean; // Наличие Wi-Fi
  haveTV: boolean; // Наличие телевизора
  haveWashingMachine: boolean; // Наличие стиральной машины
  haveParking: boolean; // Наличие парковки
  haveConditioner: boolean; // Наличие кондиционера
  nearbyTradeCenter: boolean; // Рядом есть торговый центр
  nearbyHospital: boolean; // Рядом есть больница
  nearbySchool: boolean; // Рядом есть школа
  nearbyGym: boolean; // Рядом есть тренажерный зал
  isSold: boolean; // Жилье продано
  isArchived: boolean; // Жилье в архиве
}

const icons: IconButton[] = [
  { icon: <Wifi />, label: "Wifi" },
  { icon: <TV className="bg-[#f1f1f1]" />, label: "TV" },
  { icon: <Washing className="bg-[#f1f1f1]" />, label: "Washing" },
  { icon: <Parking className="bg-[#f1f1f1]" />, label: "Parking" },
  { icon: <Conditioner className="bg-[#f1f1f1]" />, label: "Conditioner" },
];

const iconsNear: IconButton[] = [
  { icon: <Shop className="bg-[#f1f1f1]" />, label: "Shop" },
  { icon: <Hospital className="bg-[#f1f1f1]" />, label: "Hospital" },
  { icon: <School className="bg-[#f1f1f1]" />, label: "School" },
  { icon: <Dumbell className="bg-[#f1f1f1]" />, label: "Dumbell" },
];

const NearButton = ["Торговый центр", "Больница", "Школа", "Тренажорный зал"];

const options = [
  { label: "в год" },
  { label: "на день" },
  { label: "полгода" },
];

export default function EditRelocation() {
  const id = localStorage.getItem("productId");
  const [counterState, setCounterState] = useState<Counter[]>([
    { name: "Максимальное количество жителей", count: 0 },
    { name: "Количество комнат", count: 0 },
    { name: "Спальни", count: 0 },
    { name: "Ванные, душ", count: 0 },
  ]);
  const MIN_PRICE2 = 0;
  const [price2, setPrice2] = useState<number>(MIN_PRICE2);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const accessToken = localStorage.getItem("accessToken");
  const jwt = require("jsonwebtoken");

  const decodedToken = jwt.decode(accessToken);
  const userId = decodedToken?.user_id;

  const [formData, setFormData] = useState<FormData>({
    location: "",
    uploaded_images: [],
    author: userId,
    title: "",
    description: "",
    typeOfHouse: "",
    price: 0,
    numberOfRooms: 1,
    paymentTime: "daily",
    floor: 5,
    square: 5,
    haveWifi: false,
    max_people_count: 5,
    current_people_count: 2,
    count_bedrooms: 2,
    count_bathrooms: 2,
    haveTV: false,
    haveWashingMachine: false,
    haveParking: false,
    haveConditioner: false,
    nearbyTradeCenter: false,
    nearbyHospital: false,
    nearbySchool: false,
    nearbyGym: false,
    isSold: false,
    isArchived: false,
  });
  const [priceCounter, setPriceCounter] = useState<number>(formData.price);

  const [selectedIcons, setSelectedIcons] = useState<boolean[]>(
    icons.map(() => false)
  );

  const handleIconClick = (index: number) => {
    setSelectedIcons((prevSelectedIcons) => {
      const newSelectedIcons = [...prevSelectedIcons];
      newSelectedIcons[index] = !newSelectedIcons[index];

      if (index < icons.length) {
        switch (index) {
          case 0:
            setFormData({ ...formData, haveWifi: newSelectedIcons[index] });
            break;
          case 1:
            setFormData({ ...formData, haveTV: newSelectedIcons[index] });
            break;
          case 2:
            setFormData({
              ...formData,
              haveWashingMachine: newSelectedIcons[index],
            });
            break;
          case 3:
            setFormData({ ...formData, haveParking: newSelectedIcons[index] });
            break;
          case 4:
            setFormData({
              ...formData,
              haveConditioner: newSelectedIcons[index],
            });
            break;
          default:
            break;
        }
      } else {
        switch (index - icons.length) {
          case 0:
            setFormData({
              ...formData,
              nearbyTradeCenter: newSelectedIcons[index],
            });
            break;
          case 1:
            setFormData({
              ...formData,
              nearbyHospital: newSelectedIcons[index],
            });
            break;
          case 2:
            setFormData({ ...formData, nearbySchool: newSelectedIcons[index] });
            break;
          case 3:
            setFormData({ ...formData, nearbyGym: newSelectedIcons[index] });
            break;
          default:
            break;
        }
      }

      return newSelectedIcons;
    });
  };

  const createApartment = async (apartmentData: any) => {
    try {
      const token = localStorage.getItem("accessToken");

      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("author", String(formData.author));
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", String(formData.price));
      formDataToSend.append("location", formData.location);
      formDataToSend.append("paymentTime", formData.paymentTime);
      formDataToSend.append("floor", String(formData.floor));
      formDataToSend.append("typeOfHouse", formData.typeOfHouse);
      formDataToSend.append("count_bedrooms", String(formData.count_bedrooms));
      formDataToSend.append(
        "count_bathrooms",
        String(formData.count_bathrooms)
      );
      formDataToSend.append(
        "max_people_count",
        String(formData.max_people_count)
      );
      formDataToSend.append(
        "current_people_count",
        String(formData.current_people_count)
      );
      formDataToSend.append("numberOfRooms", String(formData.numberOfRooms));
      formDataToSend.append("square", String(formData.square));
      formDataToSend.append("isSold", String(formData.isSold));
      formDataToSend.append("isArchived", String(formData.isArchived));
      formDataToSend.append("haveWifi", String(formData.haveWifi));
      formDataToSend.append("haveTV", String(formData.haveTV));
      formDataToSend.append(
        "haveWashingMachine",
        String(formData.haveWashingMachine)
      );
      formDataToSend.append("haveParking", String(formData.haveParking));
      formDataToSend.append(
        "haveConditioner",
        String(formData.haveConditioner)
      );
      formDataToSend.append(
        "nearbyTradeCenter",
        String(formData.nearbyTradeCenter)
      );
      formDataToSend.append("nearbyHospital", String(formData.nearbyHospital));
      formDataToSend.append("nearbySchool", String(formData.nearbySchool));
      formDataToSend.append("nearbyGym", String(formData.nearbyGym));

      if (formData.uploaded_images) {
        const uploadedImages = formData.uploaded_images;
        for (let i = 0; i < uploadedImages.length; i++) {
          formDataToSend.append("uploaded_images", uploadedImages[i]);
        }
      }

      if (apartmentData.price < 0) {
        throw new Error("Цена не может быть меньше 0");
      }
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://studhouse.kz/api/v1/relocation/${id}/`,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch advertisement");
      }
      const data: FormData = await response.json();
      console.log("dattta", apartmentData);
      setFormData(apartmentData);
    } catch (error) {
      console.error("Ошибка при создании квартиры:", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };
  const cola = 0.5 
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (fileInputRef.current) {
        const newFiles = Array.from(files);
        setUploadedImages((prevImages) => [...prevImages, ...newFiles]);

        setFormData({ ...formData, uploaded_images: uploadedImages });
      }
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `http://studhouse.kz/api/v1/relocation/${id}/`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch advertisement");
        }
        const data: FormData = await response.json();
        console.log("dattta", data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching advertisement:", error);
        throw error;
      }
    };

    fetchData();
  }, []);

  const updateAdvertisement = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://studhouse.kz/api/v1/relocation/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("----> ", formData);
      if (!response.ok) {
        throw new Error("Failed to update advertisement");
      }
      console.log("Advertisement updated successfully");
    } catch (error) {
      console.error("Error updating advertisement:", error);
    }
  };

  const saveToLocalStorageAndSend = async () => {
    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "uploaded_images") {
          const filesArray = Array.from(value as FileList);
          filesArray.forEach((file, index) => {
            formDataToSend.append(`uploaded_images[${index}]`, file);
          });
        } else {
          formDataToSend.append(key, value.toString());
        }
      });

      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://studhouse.kz/api/v1/relocation/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      console.log(response.data);
      // router.push("/routs/congru");
    } catch (error) {
      console.error("Ошибка при создании квартиры:", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  const handleIncrement = (index: number) => {
    setCounterState((prevCounters) => {
      const updatedCounters = [...prevCounters];
      updatedCounters[index] = {
        ...updatedCounters[index],
        count: updatedCounters[index].count + 1,
      };
      return updatedCounters;
    });
  };

  const handleButtonClick = (type: string) => {
    setFormData({ ...formData, typeOfHouse: type });
  };

  const increase = useCallback(() => {
    setPriceCounter((prevprice) => Math.max(formData.price, prevprice + 5000));
  }, [formData.price]);

  const decrease = useCallback(() => {
    setPriceCounter((prevPrice) => Math.max(formData.price, prevPrice - 5000));
  }, [formData.price]);

  const handleDecrement = (index: number) => {
    setCounterState((prevCounters) => {
      const updatedCounters = [...prevCounters];
      updatedCounters[index] = {
        ...updatedCounters[index],
        count: Math.max(0, updatedCounters[index].count - 1),
      };
      return updatedCounters;
    });
  };

  const handlePriceChange = (e: { target: { value: string } }) => {
    const newPrice = parseInt(e.target.value, 10);
    // const newPrice = e.target.value;
    // if (!NaN(newPrice)) {
    setFormData({ ...formData, price: newPrice });
    // }
  };

  return (
    <section className="pt-[30px] pb-[200px]">
      <div>
        <Link href={"/"} className="flex gap-[5px] items-center ">
          <Arrow />
          <p className="text-[16px] font-[500]">Вернуться на главное меню</p>
        </Link>
        <h1 className="text-[24px] mt-[20px] mb-[55px] font-[500]">
          Информация о жилье
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-10 h-fit w-full py-[60px] px-[65px] bg-white rounded-lg">
        <div className="left">
          <h1 className="font-medium text-[1rem] pb-2.5">
            Где расположено ваше жилье?
          </h1>
          <div className="flex items-center gap-4 mb-2.5">
            <div className="py-2.5 px-4 flex bg-[#F3F3F3] rounded-[12px] items-center">
              <Input
                className="text-[1rem] w-full"
                placeholder="Введите адрес"
                name="address"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <span className="text-blue font-medium text-[0.8rem] cursor-pointer">
              указать на карте
            </span>
            {/* <Map address={formData.location} /> */}
          </div>
          <p className="text-[16px] font-[500] mb-[15px]">
            Основная информация о жилье
          </p>
          <div className="w-[400px] mb-[20px]">
            {counterState.map((counter, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <p className="text-[14px] font-[400]">{counter.name}</p>
                <div className="flex items-center gap-[5px]">
                  <button onClick={() => handleDecrement(index)}>
                    <Minus />
                  </button>
                  <p className="text-[14px] font-[400]">{counter.count}</p>
                  <button onClick={() => handleIncrement(index)}>
                    <Plus />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-[15px]">
            <p className="text-[16px] font-[500] mb-[10px]">
              Преимущества вашего жилья
            </p>
            <div className="flex items-center gap-[13px]">
              {icons.map((icon, index) => (
                <button
                  key={index}
                  className={`bg-[#f1f1f1] rounded-[5px] w-[60px] h-[40px] py-[12px] px-[23px] text-[22px] font-500 ${
                    selectedIcons[index] ? "bg-blue text-white" : ""
                  }`}
                  onClick={() => handleIconClick(index)}
                >
                  {icon.icon}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-[22px]">
            <p className="text-[16px] font-[500] mb-[10px]">Рядом</p>
            <div className="flex items-center gap-[13px]">
              {iconsNear.map((icon, index) => (
                <button
                  key={index}
                  className={`bg-[#f1f1f1] cursor-pointer rounded-[5px] w-[60px] h-[40px] py-[12px] px-[23px] text-[22px] font-500 ${
                    selectedIcons[index + icons.length]
                      ? "bg-blue text-white"
                      : ""
                  }`}
                  onClick={() => handleIconClick(index + icons.length)}
                >
                  {icon.icon}
                </button>
              ))}
            </div>
          </div>
          <p className="text-[16px] text-black font-[500]">
            Загрузите фото жилья
          </p>
          <p className="text-[12px] mb-[6px]">
            Для начала хватит 5 фотографий. Позже вы сможете добавить другие или
            внести изменения.
          </p>
          <div className="flex items-center gap-[13px]">
            {formData.uploaded_images &&
              Array.from(formData.uploaded_images).map((file, index) => (
                <div key={index} className="bg-white w-[70px] h-[49px]">
                  <img
                    width={80}
                    height={80}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded Image ${index}`}
                  />
                </div>
              ))}
          </div>
          <p
            className="text-[12px] font-[400] cursor-pointer mt-[6px]"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
          </p>
          <div className="mb-[16px] mt-[1rem]">
            <p className="text-[16px] text-black font-[500]">
              Придумайте, как будет называться квартира
            </p>
            <p className="text-[12px] mb-[6px]">
              Краткое название — то, что нужно. Не беспокойтесь, вы всегда
              сможете отредактировать его.
            </p>
            <textarea
              className="w-[380px] h-[50px] py-[10px] px-[20px] border-none bg-[#F1F1F1] rounded-[12px] focus:outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="mb-[16px]">
            <p className="text-[16px] text-black font-[500]">
              Составьте описание
            </p>
            <p className="text-[12px] mb-[6px]">
              Расскажите, что делает ваше жилье особенным.
            </p>
            <textarea
              className="w-[380px] h-[100px] py-[10px] px-[20px] border-none bg-[#F1F1F1] rounded-[12px] focus:outline-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="">
            <h1 className="text-[1rem] font-medium mb-0.5">О подселении</h1>
            <p className="text-[#767272] text-[0.8rem] mb-[6px]">
              Расскажите, о соседях
            </p>
            <div className="flex items-center gap-[35px]">
              <Button
                onClick={() => handleButtonClick("Для девушек")}
                label={"Для девушек"}
                className={`py-2 border-[1px] px-4 text-sm rounded-md ${
                  formData.typeOfHouse === "Для девушек"
                    ? "bg-blue text-white"
                    : "border-black"
                }`}
              />
              <Button
                onClick={() => handleButtonClick("Для парней")}
                label={"Для парней"}
                className={`py-2 px-4 border-[1px] text-sm rounded-md ${
                  formData.typeOfHouse === "Для парней"
                    ? "bg-blue text-white"
                    : "border-black"
                }`}
              />
            </div>
            <div className="flex gap-[26px] mt-2.5">
              <div>
                <h3 className="text-[#767272] text-[0.8rem] mb-[6px]">
                  Университет
                </h3>
                <div className="py-[0.3rem] px-4 bg-[#F1F1F1] rounded-[10px]">
                  <Input className="text-[0.7rem]" />
                </div>
              </div>
              <div>
                <h3 className="text-[#767272] text-[0.8rem] mb-[6px]">Курс</h3>
                <div className="py-[0.3rem] px-4 bg-[#F1F1F1] rounded-[10px]">
                  <Input className="text-[0.7rem]" />
                </div>
              </div>
              <div>
                <h3 className="text-[#767272] text-[0.8rem] mb-[6px]">
                  Профессия
                </h3>
                <div className="py-[0.3rem] px-4 bg-[#F1F1F1] rounded-[10px]">
                  <Input className="text-[0.7rem]" />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-[46px] mt-[1rem]">
            <p className="text-[16px] text-black font-[500]">Установите цену</p>
            <p className="text-[12px] mb-[6px]">
              Ее можно изменить в любое время.
            </p>
            <div className="flex items-center">
              <div className="mr-5 flex gap-[5px] justify-center items-center">
                <Dropdown
                  buttonStyle="whitespace-nowrap text-[14px] font-[400]"
                  listStyle="bg-white text-base py-[2px] px-[4px] left-[8px] flex flex-col border border-black rounded-[6px] gap-[13px] w-fit h-fit"
                  options={options}
                  label="в месяц"
                />
                <svg
                  className="relative top-[2px] w-5 h-5 text-gray-800 dark:text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="mr-5 flex gap-2 items-center">
                <input
                  type="text"
                  name="price"
                  className="text-[14px] border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                  value={formData.price}
                  // onChange={handlePriceChange}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex gap-[20px]">
            <Button
              label="Сохранить и отправить на проверку"
              className="px-[35px] py-[13px] font-[500] text-[16px] bg-[#000080] text-white rounded-[6px]"
              onClick={updateAdvertisement}
            />
            <Link href={`/routs/settlement`}>
              <Button
                label="Назад"
                className="px-[35px] py-[13px] font-[500] text-[16px] bg-[#000080] text-white rounded-[6px]"
              />
            </Link>
          </div>
        </div>
        <div className="right">
          <ProductList />
        </div>
      </div>
      <div>
        {formErrors.map((error, index) => (
          <p key={index} className="text-red-500">
            {error}
          </p>
        ))}
      </div>
    </section>
  );
}
