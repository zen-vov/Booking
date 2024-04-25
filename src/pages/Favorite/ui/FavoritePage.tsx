"use client";
import Input from "@/shared/ui/Input/Input";
import ProductList from "@/widgets/productList/ui/productLIst";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import Button from "@/shared/ui/Button/Button";
import { BASE_URL } from "@/shared/api/BASE";
import Link from "next/link";

export default function FavoritePage() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [active, setActive] = useState(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);

  useEffect(() => {
    const pageNumber = new URLSearchParams(window.location.search).get("page");
    const parsedPage = pageNumber ? parseInt(pageNumber) : 1;
    setCurrent(parsedPage);
  }, []);

  const recordsPerPage = 6;
  const lastIndex = current * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(mainData.length / recordsPerPage);
  // const numbers = Array.from({ length: npage }).map((_, i) => i + 1);

  const changeCurrentPage = (page: number) => {
    setCurrent(page);
    setActive(true);
    window.history.pushState({}, "", `/?page=${page}`);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://195.49.212.131:8000/api/v1/advertisement/"
  //       );
  //       console.log(response.data);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchFavourite = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${BASE_URL}/advertisement/get_favorite_advertisements/`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.log("err", error);
      }
    };

    fetchFavourite();
  }, []);

  return (
    <section className="pb-[45px]">
      <div className="container mt-[32px] flex flex-col gap-[56px] mb-[60px]">
        {/* <div className="flex items-center gap-[100px]">
          <div className="flex items-center gap-2">
            <Image src={"/Search.png"} width={29} height={29} alt="search" />
            <Input
              placeholder="Выбор"
              className="search-input pb-[5px] text-black text-md"
            />
          </div>
          <div className="flex gap-[30px] items-center">
            <div className="flex gap-[5px] items-center">
              <span className="text-md text-black font-medium">
                Макс. оплата
              </span>
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
        </div> */}
        <h1 className="text-xl font-[500] ">Мои избранные</h1>
      </div>
      {data.length === 0 ? (
        <div className="container pb-20 flex flex-col justify-center items-center mt-8 text-lg">
          <h1 className="text-xl font-medium">
            У вас нет объявление вашей квартиры
          </h1>
          <Link href={"/routs/posthouse"} className="mt-[45px]">
            <Button className="text-md font-medium rounded-[5px] border-[1px] border-solid border-black py-[13px] px-[22px]">
              Разместить объявление
            </Button>
          </Link>
        </div>
      ) : (
        <div className="container grid grid-cols-2 gap-[92px] mb-12">
          <ProductList records={records} />
        </div>
      )}
      {/* <div className="container flex gap-4 items-center justify-center">
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
      </div> */}
      {/* {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(false)} />
      )}
      <AuthModal onClose={() => setActiveModal(false)} active={activeModal} /> */}
    </section>
  );
}
