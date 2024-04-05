"use client";
import Input from "@/shared/ui/Input/Input";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";

const mainData = [
  {
    id: 1,
    address: "г. Алматы, Бостандыкский район",
    price: "320 000",
    dataAT: "11.03.2024",
    photo: "/Image1.png",
  },
  {
    id: 2,
    address: "г. Алматы, Бостандыкский район",
    price: "320 000",
    dataAT: "11.03.2024",
    photo: "/Image1.png",
  },
  {
    id: 3,
    address: "г. Алматы, Бостандыкский район",
    price: "320 000",
    dataAT: "11.03.2024",
    photo: "/Image1.png",
  },
  {
    id: 4,
    address: "г. Алматы, Бостандыкский район",
    price: "320 000",
    dataAT: "11.03.2024",
    photo: "/Image1.png",
  },
  {
    id: 5,
    address: "г. Алматы, Бостандыкский район",
    price: "320 000",
    dataAT: "11.03.2024",
    photo: "/Image1.png",
  },
  {
    id: 6,
    address: "г. Алматы, Бостандыкский район",
    price: "320 000",
    dataAT: "11.03.2024",
    photo: "/Image1.png",
  },
  {
    id: 7,
    address: "г. Алматы, Бостандыкский район",
    price: "320 000",
    dataAT: "11.03.2024",
    photo: "/Image1.png",
  },
  {
    id: 8,
    address: "г. Алматы, Бостандыкский район",
    price: "320 000",
    dataAT: "11.03.2024",
    photo: "/Image1.png",
  },
];

export default function LandLord() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const pageNumber = new URLSearchParams(window.location.search).get("page");
    const parsedPage = pageNumber ? parseInt(pageNumber) : 1;
    setCurrent(parsedPage);
  }, []);

  const recordsPerPage = 6;
  const lastIndex = current * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = mainData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(mainData.length / recordsPerPage);
  const numbers = Array.from({ length: npage }).map((_, i) => i + 1);

  const changeCurrentPage = (page: number) => {
    setCurrent(page);
    setActive(true);
    window.history.pushState({}, "", `/?page=${page}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://195.49.212.131:8000/api/v1/advertisement/"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-[45px]">
      <div className="flex items-center  gap-[100px] mb-[60px]">
        <div className="flex items-center gap-2">
          <Image src={"/Search.png"} width={29} height={29} alt="search" />
          <Input
            placeholder="Выбор"
            className="search-input pb-[5px] text-black text-md"
          />
        </div>
        <div className="flex gap-[30px] items-center">
          <div className="flex gap-[5px] items-center">
            <span className="text-md text-black font-medium">Макс. оплата</span>
            <span className="-rotate-90">
              <Arrow />
            </span>
          </div>
          <div className="flex gap-[15px]">
            <span className="text-md text-black font-medium items-center">
              Кол. комнат
            </span>
            <span className="-rotate-90">
              <Arrow />
            </span>
          </div>
          <h3 className="text-md font-medium text-black">Фильтр</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[92px] mb-12">
        {records.map(({ id, address, price, dataAT, photo }) => (
          <div key={id} className="bg-white rounded-[12px] pb-[30px]">
            <Link href="/routs/product">
              <div
                style={{ backgroundImage: `url(${photo})` }}
                className="w-full bg-no-repeat h-[463px]"
              />
            </Link>

            <div className="flex justify-between px-7 pt-6">
              <div className="flex flex-col">
                <h1 className="text-md font-medium mb-[14px]">{address}</h1>
                <h3 className="text-md mb-6">{price} т/мес.</h3>
                <h5 className="text-sm ">Опубликовано в {dataAT}</h5>
              </div>
              <div className="flex gap-[14px]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M21.9376 1.62528C21.2911 1.62528 20.6711 1.88205 20.214 2.33911C19.7569 2.79617 19.5001 3.41607 19.5001 4.06244C19.5001 4.70882 19.7569 5.32872 20.214 5.78577C20.6711 6.24283 21.2911 6.4996 21.9376 6.4996C22.584 6.4996 23.204 6.24283 23.6611 5.78577C24.1182 5.32872 24.375 4.70882 24.375 4.06244C24.375 3.41607 24.1182 2.79617 23.6611 2.33911C23.204 1.88205 22.584 1.62528 21.9376 1.62528ZM17.8751 4.06244C17.875 3.1094 18.2101 2.18667 18.8216 1.45567C19.4332 0.724682 20.2824 0.231981 21.2206 0.0637742C22.1588 -0.104433 23.1262 0.0625658 23.9537 0.535552C24.7812 1.00854 25.416 1.75739 25.7471 2.6511C26.0781 3.5448 26.0844 4.52644 25.7647 5.42428C25.445 6.32212 24.8198 7.07897 23.9984 7.56243C23.1769 8.04589 22.2117 8.22516 21.2714 8.06889C20.3312 7.91261 19.4758 7.43074 18.855 6.70757L7.93843 11.7769C8.18928 12.5721 8.18928 13.4253 7.93843 14.2205L18.855 19.2898C19.5112 18.5267 20.4274 18.0344 21.426 17.9082C22.4246 17.782 23.4345 18.031 24.2599 18.6069C25.0854 19.1828 25.6676 20.0446 25.8938 21.0253C26.12 22.0059 25.9741 23.0356 25.4842 23.9148C24.9944 24.794 24.1956 25.4601 23.2425 25.784C22.2895 26.1078 21.2502 26.0664 20.326 25.6677C19.4019 25.269 18.6586 24.5415 18.2403 23.6261C17.822 22.7107 17.7585 21.6727 18.062 20.7131L7.14544 15.6438C6.60503 16.2735 5.8847 16.7227 5.08136 16.9308C4.27802 17.1389 3.4302 17.096 2.65196 16.8079C1.87372 16.5198 1.20238 16.0003 0.728268 15.3193C0.254153 14.6383 0 13.8285 0 12.9987C0 12.1689 0.254153 11.3591 0.728268 10.678C1.20238 9.99703 1.87372 9.47754 2.65196 9.18944C3.4302 8.90135 4.27802 8.85848 5.08136 9.0666C5.8847 9.27472 6.60503 9.72385 7.14544 10.3536L18.062 5.28427C17.9377 4.88891 17.8747 4.47686 17.8751 4.06244ZM4.06286 10.5615C3.41641 10.5615 2.79643 10.8183 2.33932 11.2754C1.88221 11.7324 1.6254 12.3523 1.6254 12.9987C1.6254 13.6451 1.88221 14.265 2.33932 14.722C2.79643 15.1791 3.41641 15.4358 4.06286 15.4358C4.70932 15.4358 5.3293 15.1791 5.78641 14.722C6.24352 14.265 6.50032 13.6451 6.50032 12.9987C6.50032 12.3523 6.24352 11.7324 5.78641 11.2754C5.3293 10.8183 4.70932 10.5615 4.06286 10.5615ZM21.9376 19.4978C21.2911 19.4978 20.6711 19.7545 20.214 20.2116C19.7569 20.6687 19.5001 21.2886 19.5001 21.9349C19.5001 22.5813 19.7569 23.2012 20.214 23.6583C20.6711 24.1153 21.2911 24.3721 21.9376 24.3721C22.584 24.3721 23.204 24.1153 23.6611 23.6583C24.1182 23.2012 24.375 22.5813 24.375 21.9349C24.375 21.2886 24.1182 20.6687 23.6611 20.2116C23.204 19.7545 22.584 19.4978 21.9376 19.4978Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="27"
                    viewBox="0 0 29 27"
                    fill="none"
                  >
                    <path
                      d="M14.5003 4.94647L13.2006 3.61988C10.1501 0.505886 4.55657 1.58048 2.53739 5.49547C1.58942 7.33686 1.37554 9.99545 3.10653 13.3884C4.77408 16.6554 8.24331 20.5686 14.5003 24.831C20.7572 20.5686 24.2246 16.6554 25.894 13.3884C27.625 9.99366 27.4129 7.33686 26.4631 5.49547C24.4439 1.58048 18.8504 0.504086 15.7999 3.61808L14.5003 4.94647ZM14.5003 27C-13.2917 8.76246 5.94318 -5.47189 14.1812 2.05748C14.29 2.15708 14.3963 2.25968 14.5003 2.36528C14.6024 2.25901 14.7088 2.15693 14.8193 2.05928C23.0555 -5.47549 42.2922 8.76066 14.5003 27Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 items-center justify-center">
        {numbers.map((n, i) => (
          <div
            className={`py-2 px-4 cursor-pointer text-md rounded-[6px] ${
              current === n ? "bg-blue text-white" : "bg-white text-black"
            }`}
            key={i}
            onClick={() => changeCurrentPage(n)}
          >
            {n}
          </div>
        ))}
      </div>
    </section>
  );
}
