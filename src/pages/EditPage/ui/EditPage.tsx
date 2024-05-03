"use client";
import React from "react";
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

interface Fields {
  title: string;
  author: number;
  description: string;
  price: string;
  location: string;
  paymentTime: string;
  floor: number;
  typeOfHouse: string;
  numberOfRooms: number;
  count_bedrooms: number;
  count_bathrooms: number;
  square: number;
  isSold: boolean;
  isArchived: boolean;
  haveWifi: boolean;
  haveTV: boolean;
  haveWashingMachine: boolean;
  haveParking: boolean;
  haveConditioner: boolean;
  nearbyTradeCenter: boolean;
  nearbyHospital: boolean;
  nearbySchool: boolean;
  nearbyGym: boolean;
  uploaded_images: string[];
}

interface Counter {
  name: string;
  title: string;
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

const options = [
  { label: "в год", path: "/year" },
  { label: "на день", path: "/day" },
  { label: "полгода", path: "/half-year" },
];

export default function EditPage() {
  const id = localStorage.getItem("productId");
  const [selectedIcons, setSelectedIcons] = React.useState<boolean[]>(
    icons.map(() => false)
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const MIN_PRICE = "0";
  const MIN_PRICE2 = "0";
  const [price, setPrice] = React.useState<string>(MIN_PRICE);
  const [price2, setPrice2] = React.useState<string>(MIN_PRICE2);
  const [uploadedImages] = React.useState<File[] | null>([]);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [formErrors, setFormErrors] = React.useState<string[]>([]);

  const [fields, setFields] = React.useState<Fields>({
    title: "",
    author: 0,
    description: "",
    price: "0",
    location: "",
    paymentTime: "daily",
    floor: 0,
    typeOfHouse: "",
    numberOfRooms: 0,
    count_bathrooms: 3,
    count_bedrooms: 3,
    square: 0,
    isSold: true,
    isArchived: true,
    haveWifi: false,
    haveTV: true,
    haveWashingMachine: true,
    haveParking: true,
    haveConditioner: true,
    nearbyTradeCenter: true,
    nearbyHospital: true,
    nearbySchool: true,
    nearbyGym: true,
    uploaded_images: [],
  });

  const [counterState, setCounterState] = React.useState<Counter[]>([
    { name: "Максимальное количество жителей", title: "", count: 0 },
    { name: "Количество комнат", title: "numberOfRooms", count: 0 },
    { name: "Спальни", title: "", count: 0 },
    { name: "Ванные, душ", title: "", count: 0 },
  ]);
  const pepsi = 5
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `http://studhouse.kz/api/v1/advertisement/${id}/`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch advertisement");
        }
        const data: Fields = await response.json();
        console.log("dattta", data);
        setFields(data);
      } catch (error) {
        console.error("Error fetching advertisement:", error);
        throw error;
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const updateAdvertisement = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://studhouse.kz/api/v1/advertisement/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${accessToken}`,
          },
          body: JSON.stringify(fields),
        }
      );
      console.log("----> ", fields);
      if (!response.ok) {
        throw new Error("Failed to update advertisement");
      }
      console.log("Advertisement updated successfully");
    } catch (error) {
      console.error("Error updating advertisement:", error);
    }
  };

  const handleGoBack = () => {
    window.history.back();
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

  const handleIconClick = (index: number) => {
    setSelectedIcons((prevSelectedIcons) => {
      const newSelectedIcons = [...prevSelectedIcons];
      newSelectedIcons[index] = !newSelectedIcons[index];

      // Обработка выбора иконок в соответствии с индексом
      if (index < icons.length) {
        switch (index) {
          case 0:
            setFields({ ...fields, haveWifi: newSelectedIcons[index] });
            break;
          case 1:
            setFields({ ...fields, haveTV: newSelectedIcons[index] });
            break;
          case 2:
            setFields({
              ...fields,
              haveWashingMachine: newSelectedIcons[index],
            });
            break;
          case 3:
            setFields({ ...fields, haveParking: newSelectedIcons[index] });
            break;
          case 4:
            setFields({
              ...fields,
              haveConditioner: newSelectedIcons[index],
            });
            break;
          default:
            break;
        }
      } else {
        switch (index - icons.length) {
          case 0:
            setFields({
              ...fields,
              nearbyTradeCenter: newSelectedIcons[index],
            });
            break;
          case 1:
            setFields({
              ...fields,
              nearbyHospital: newSelectedIcons[index],
            });
            break;
          case 2:
            setFields({ ...fields, nearbySchool: newSelectedIcons[index] });
            break;
          case 3:
            setFields({ ...fields, nearbyGym: newSelectedIcons[index] });
            break;
          default:
            break;
        }
      }

      return newSelectedIcons;
    });
  };

  const handleButtonClick = (type: string) => {
    setSelectedType((prevType) => (prevType === type ? null : type));
  };

  const increase = () => {
    setPrice((prevprice) =>
      String(Math.max(Number(MIN_PRICE), Number(prevprice) + 5000))
    );
    setFields({ ...fields, price: price });
  };
  const increase2 = () => {
    setPrice2((prevprice) =>
      String(Math.max(Number(MIN_PRICE2), Number(prevprice) + 5000))
    );
  };

  const decrease = () => {
    setPrice((prevPrice) =>
      String(Math.max(Number(MIN_PRICE), Number(prevPrice) - 5000))
    );
    setFields({ ...fields, price: price });
  };
  const decrease2 = () => {
    setPrice2((prevprice) =>
      String(Math.max(Number(MIN_PRICE2), Number(prevprice) - 5000))
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setFields((prev) => ({
        ...prev,
        uploaded_images: [...prev.uploaded_images, ...fileNames],
      }));
    }
  };

  const saveToLocalStorageAndSend = async () => {
    try {
      const apartmentData = {
        location: fields.location,
        uploaded_images: fields.uploaded_images.map((image) => image), // Предполагая, что вы хотите отправить только имена файлов
        title: fields.title,
        description: fields.description,
        typeOfHouse: fields.typeOfHouse || "", // Если тип дома не указан, используем пустую строку
        price: fields.price,
        numberOfRooms: fields.numberOfRooms || 0, // Если количество комнат не указано, используем 0
        paymentTime: fields.paymentTime,
        floor: fields.floor,
        square: fields.square,
        haveWifi: fields.haveWifi,
        haveTV: fields.haveTV,
        haveWashingMachine: fields.haveWashingMachine,
        haveParking: fields.haveParking,
        haveConditioner: fields.haveConditioner,
        nearbyTradeCenter: fields.nearbyTradeCenter,
        nearbyHospital: fields.nearbyHospital,
        nearbySchool: fields.nearbySchool,
        nearbyGym: fields.nearbyGym,
        isSold: fields.isSold,
        isArchived: fields.isArchived,
      };
    } catch (error) {
      console.error(
        "Ошибка при сохранении данных и отправке на сервер:",
        error
      );
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <section className="pt-[30px] pb-[200px]">
      <div>
        <div
          className="flex items-center gap-[8px] cursor-pointer"
          onClick={handleGoBack}
        >
          <Arrow />
          <p className="text-[16px] font-[500]">Вернуться на главное меню</p>
        </div>

        <h1 className="text-[24px] mt-[20px] mb-[55px] font-[500]">
          Информация о жилье
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-10 h-fit w-full py-[60px] px-[65px] bg-white rounded-lg">
        <div className="left">
          <h1 className="font-medium text-[1rem] pb-2.5">
            Где расположено ваше жилье?
          </h1>
          <div className="flex flex-col items-start gap-4 mb-2.5">
            {/* <div className="py-2.5 px-4 flex bg-[#F3F3F3] rounded-[12px] items-center">
              <Input
                className="text-[1rem] w-full"
                placeholder="Введите название"
                name="address"
                value={fields.title}
                onChange={(e) =>
                  setFields({ ...fields, title: e.target.value })
                }
                // onChange={handleInputChange}
              />
            </div> */}
            <div className="py-2.5 px-4 flex bg-[#F3F3F3] rounded-[12px] items-center">
              <Input
                className="text-[1rem] w-full"
                placeholder="Введите адрес"
                name="address"
                value={fields.location}
                onChange={(e) =>
                  setFields({ ...fields, location: e.target.value })
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
                  <button
                    onClick={() => handleDecrement(index)}
                    onChange={() =>
                      setFields({ ...fields, numberOfRooms: counter.count })
                    }
                  >
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
            {fields.uploaded_images?.map((imageUrl, index) => (
              <div key={index} className="bg-white w-[70px] h-[49px] ">
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={imageUrl}
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
              value={fields.title}
              onChange={(e) => setFields({ ...fields, title: e.target.value })}
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
              value={fields.description}
              onChange={(e) =>
                setFields({ ...fields, description: e.target.value })
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
                  label="В месяц"
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
                  className="text-[14px] w-[40%]"
                  value={fields.price}
                  // onChange={handleInputChange2}
                  // onChange={(e) =>
                  //   setFields({ ...fields, price: e.target.value })
                  // }
                />
                <button onClick={increase}>
                  <Plus />
                </button>
              </div>
              <div className="mr-5 flex gap-[5px] justify-center items-center">
                <Dropdown
                  buttonStyle="whitespace-nowrap text-[14px] font-[400]"
                  listStyle="bg-white text-base py-[2px] px-[4px] left-[8px] flex flex-col border border-black rounded-[6px] gap-[13px] w-fit h-fit"
                  options={options}
                  label="Депозит"
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
                  className="text-[14px] w-[40%]"
                  value={price2}
                  onChange={(e) =>
                    setFields({ ...fields, price: e.target.value })
                  }
                />
                <button onClick={increase2}>
                  <Plus />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-[20px]">
            <Button
              label="Сохранить и отправить на проверку"
              className="px-[35px] py-[13px] font-[500] text-[16px] bg-[#000080] text-white rounded-[6px]"
              onClick={updateAdvertisement}
            />
            <Button
              label="Назад"
              className="px-[35px] py-[13px] font-[500] text-[16px] bg-[#000080] text-white rounded-[6px]"
              onClick={handleGoBack}
            />
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
