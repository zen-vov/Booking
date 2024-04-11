"use client";
import Input from "@/shared/ui/Input/Input";
import ProductList, { mainData } from "@/widgets/productList/ui/productLIst";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";

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
        <ProductList records={records} />
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
