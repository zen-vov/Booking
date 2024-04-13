"use client";
import React, { useState, useRef } from "react";
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
import Image from "next/image";
import ProductList from "@/widgets/productList/ui/productLIst";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import axios from "axios";
import { BASE_URL } from "@/shared/api/BASE";

interface Counter {
  name: string;
  count: number;
}

interface IconButton {
  icon: JSX.Element;
  label: string;
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
  { label: "в год", path: "/year" },
  { label: "на день", path: "/day" },
  { label: "полгода", path: "/half-year" },
];

export default function PostSettlementPage() {
  const [counterState, setCounterState] = useState<Counter[]>([
    { name: "Максимальное количество жителей", count: 0 },
    { name: "Количество комнат", count: 0 },
    { name: "Спальни", count: 0 },
    { name: "Ванные, душ", count: 0 },
  ]);
  const MIN_PRICE = 0;
  const MIN_PRICE2 = 0;
  const [price, setPrice] = useState<number>(MIN_PRICE);
  const [price2, setPrice2] = useState<number>(MIN_PRICE2);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [active, setActive] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    location: "",
    uploaded_images: [],
    author_id: 1,
    title: "",
    description: "",
    typeOfHouse: "string",
    price: "3000",
    numberOfRooms: 2147483647,
    paymentTime: "daily",
    floor: 2147483647,
    square: 2147483647,
    haveWifi: true,
    haveTV: true,
    haveWashingMachine: true,
    haveParking: true,
    haveConditioner: true,
    nearbyTradeCenter: true,
    nearbyHospital: true,
    nearbySchool: true,
    nearbyGym: true,
    isSold: true,
    isArchived: true,
  });

  const createApartment = async (apartmentData: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${BASE_URL}/advertisement`,
        apartmentData,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при создании квартиры:", error);
    }
  };

  const saveToLocalStorageAndSend = async () => {
    try {
      localStorage.setItem("apartmentData", JSON.stringify(formData));
      await createApartment(formData);
      alert("Данные успешно сохранены и отправлены!");
    } catch (error) {
      console.error(
        "Ошибка при сохранении данных и отправке на сервер:",
        error
      );
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
    setSelectedType((prevType) => (prevType === type ? null : type));
  };

  const handleIconClick = (index: number) => {
    setSelectedIconIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const increase = () => {
    setPrice((prevprice) => Math.max(MIN_PRICE, prevprice + 5000));
  };
  const increase2 = () => {
    setPrice2((prevprice) => Math.max(MIN_PRICE2, prevprice + 5000));
  };

  const decrease = () => {
    setPrice((prevPrice) => Math.max(MIN_PRICE, prevPrice - 5000));
  };
  const decrease2 = () => {
    setPrice2((prevprice) => Math.max(MIN_PRICE2, prevprice - 5000));
  };

  const handleInputChange = (e: any) => {
    const inputValue = parseInt(e.target.value);
    setPrice(isNaN(inputValue) ? MIN_PRICE : Math.max(MIN_PRICE, inputValue));
  };
  const handleInputChange2 = (e: any) => {
    const inputValue = parseInt(e.target.value);
    setPrice2(
      isNaN(inputValue) ? MIN_PRICE2 : Math.max(MIN_PRICE2, inputValue)
    );
  };

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

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (uploadedImages.length === 0) {
      errors.push("Вы должны загрузить хотя бы одно фото");
    }

    setFormErrors(errors);

    return errors.length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imagesArray: File[] = Array.from(files);

      if (imagesArray.length + uploadedImages.length <= 5) {
        setUploadedImages((prevImages) => [...prevImages, ...imagesArray]);
      } else {
        setFormErrors(["Можно загрузить только 5 фотографий"]);
      }
    }
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
                    selectedIconIndex === index ? "bg-blue text-white" : ""
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
                  className="bg-[#f1f1f1] cursor-pointer rounded-[5px] w-[60px] h-[40px] py-[12px] px-[23px] text-[22px] font-500"
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
            {uploadedImages.map((image, index) => (
              <div key={index} className="bg-white w-[70px] h-[49px] ">
                <Image
                  width={70}
                  height={49}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Image ${index}`}
                />
              </div>
            ))}
          </div>
          <p className="text-[12px] font-[400] cursor-pointer mt-[6px]">
            <button onClick={() => fileInputRef.current?.click()}>
              Загрузить еще
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: "none" }}
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
                className={`py-2 px-[50px] text-[0.7rem] rounded-[10px] ${
                  selectedType === "Для девушек"
                    ? "bg-blue text-white"
                    : "bg-[#f1f1f1]"
                }`}
              />
              <Button
                onClick={() => handleButtonClick("Для парней")}
                label={"Для парней"}
                className={`py-2 px-[50px] text-[0.7rem] rounded-[10px] ${
                  selectedType === "Для парней"
                    ? "bg-blue text-white"
                    : "bg-[#f1f1f1]"
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
                <button onClick={decrease2}>
                  <Minus />
                </button>
                <Input
                  className="text-[14px] w-[30%]"
                  onChange={handleInputChange2}
                  value={price}
                />
                <button onClick={increase2}>
                  <Plus />
                </button>
              </div>
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
                <button onClick={decrease}>
                  <Minus />
                </button>
                <Input
                  className="text-[14px] w-[30%]"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
                <button onClick={increase}>
                  <Plus />
                </button>
              </div>
            </div>
          </div>
          <div className="mb-[28px]">
            <p className="text-[16px] text-black font-[500]">Залог</p>
            <p className="text-[12px] mb-[6px]">
              Его можно изменить в любое время.
            </p>
            <div className="flex items-center">
              <div className="mr-5 flex gap-2 items-center">
                <button onClick={decrease}>
                  <Minus />
                </button>
                <Input
                  className="text-[14px] w-[30%]"
                  onChange={handleInputChange}
                  value={price}
                />
                <button onClick={increase}>
                  <Plus />
                </button>
              </div>
            </div>
          </div>
          <Button
            label="Сохранить и отправить на проверку"
            className="px-[35px] py-[13px] font-[500] text-[16px] bg-[#000080] text-white rounded-[6px]"
            onClick={saveToLocalStorageAndSend}
          />
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
