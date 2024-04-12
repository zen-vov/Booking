"use client";
import Input from "@/shared/ui/Input/Input";
import ProductList from "@/widgets/productList/ui/productLIst";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import styles from "./styles.module.scss";
import Button from "@/shared/ui/Button/Button";
import AuthModal from "@/features/AuthModal/ui/AuthModal";
import Link from "next/link";

export default function LandLord() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [active, setActive] = useState(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);

  useEffect(() => {
    const pageNumber = new URLSearchParams(window.location.search).get("page");
    const parsedPage = pageNumber ? parseInt(pageNumber) : 1;
    setCurrent(parsedPage);
  }, []);

  // const recordsPerPage = 6;
  // const lastIndex = current * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = .slice(firstIndex, lastIndex);
  // const npage = Math.ceil(mainData.length / recordsPerPage);
  // const numbers = Array.from({ length: npage }).map((_, i) => i + 1);

  const changeCurrentPage = (page: number) => {
    setCurrent(page);
    setActive(true);
    window.history.pushState({}, "", `/?page=${page}`);
  };

  return (
    <section className="pb-[45px]">
      <div className={`${styles.imgbg} flex`}>
        <div className="container py-[128px] flex flex-col items-start w-full">
          <div className="flex flex-col">
            <span className="text-2xl text-center mb-[1rem] font-semibold text-primary">
              Создай себе идеальное <br /> окружение
            </span>
            <Link href={"/routs/posthouse"} className="">
              <Button
                onClick={() => setActiveModal(true)}
                className="border-[1px] flex items-center px-[10rem] justify-center border-black rounded-[10px] text-center bg-white text-[20px]"
                label="Добавить объявление"
              >
                <span className="text-[45px] mr-[1rem] font-semibold text-center">
                  +
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-[50px] flex items-center  gap-[100px] mb-[60px]">
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
      <div className="container grid grid-cols-2 gap-[92px] mb-12">
        <ProductList />
      </div>
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
