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
import SettlementList from "@/widgets/SettlementList/ui/Settlement";

export default function FavoritePage() {
  const [data, setData] = useState([]);
  const [relocation, setRelocation] = useState([]);
  const [current, setCurrent] = useState(1);
  const [active, setActive] = useState(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>();

  useEffect(() => {
    const pageNumber = new URLSearchParams(window.location.search).get("page");
    const parsedPage = pageNumber ? parseInt(pageNumber) : 1;
    setCurrent(parsedPage);
  }, []);

  const recordsPerPage = 6;
  const lastIndex = current * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);

  const changeCurrentPage = (page: number) => {
    setCurrent(page);
    setActive(true);
    window.history.pushState({}, "", `/?page=${page}`);
  };

  useEffect(() => {
    const fetchFavourite = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${BASE_URL}/advertisement/get_favorite_advertisements/`,
          {
            params: {
              is_favorite: true,
            },
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

  useEffect(() => {
    const fetchRelocation = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${BASE_URL}/relocation/get_favorite_relocations/`,
          {
            params: {
              is_favorite: true,
            },
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        setRelocation(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRelocation();
  }, []);

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <section className="pb-[45px]">
      <div className="container mt-[32px] flex flex-col gap-[56px] mb-[60px]">
        <h1 className="text-xl font-[500] ">Мои избранные</h1>
      </div>
      <div className="container mt-[32px] flex tems-center gap-[56px] mb-[60px]">
        <button
          className="text-[24px] font-[500] border py-[4px] px-[6px]"
          onClick={() => handleCheck()}
        >
          {check ? "Подселения" : "Квартиры"}
        </button>
      </div>
      {data.length === 0 && relocation.length === 0 ? (
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
        <>
          {check ? (
            <div className="container grid grid-cols-2 gap-[92px] mb-12">
              <ProductList records={records} />
            </div>
          ) : (
            <div className="container grid grid-cols-2 gap-[92px] mb-12">
              <SettlementList records={relocation} />
            </div>
          )}
          {/* <div className="container grid grid-cols-2 gap-[92px] mb-12">
            <ProductList records={records} />
          </div> */}
          {/* <div className="container grid grid-cols-2 gap-[92px] mb-12">
            <SettlementList records={relocation} />
          </div> */}
        </>
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
