"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { BASE_URL } from "@/shared/api/BASE";
import Input from "@/shared/ui/Input/Input";
import ProductList from "@/widgets/productList/ui/productLIst";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import Modal from "@/shared/ui/Modal/ui/Modal";
import Button from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";
import Link from "next/link";
import DropdownFilter from "@/features/DropdownFilter/ui/DropdownFilter";

const roomsData = [
  { label: "1 -комнатная" },
  { label: "2 -комнатная" },
  { label: "3 -комнатная" },
  { label: "4 и более комнат" },
];

export default function MyProduct() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [active, setActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [hasAuth, setHasAuth] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [maxPayment, setMaxPayment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputPrice, setInputPrice] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const pageNumber = new URLSearchParams(window.location.search).get("page");
    const parsedPage = pageNumber ? parseInt(pageNumber) : 1;
    setCurrent(parsedPage);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setHasAuth(true);
        }

        const { data: res } = await axios.get(`${BASE_URL}/advertisement/`, {
          params: {
            numberOfRooms: numberOfRooms,
            price: maxPayment,
          },
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        let filteredData = res;
        if (maxPayment) {
          filteredData = res.filter(
            (item: any) => item.price <= parseInt(maxPayment)
          );
        }

        if (numberOfRooms !== "") {
          filteredData = res.filter((item: any) => {
            if (numberOfRooms === "4 и более комнат") {
              return item.numberOfRooms >= 4;
            } else {
              return item.numberOfRooms === parseInt(numberOfRooms);
            }
          });
        }

        const filteredProducts = filteredData.filter((product: any) => {
          return product.author.toString() === userId?.toString();
        });

        setData(filteredData);
        setSearchResult(filteredProducts);
      } catch (err) {
        console.log(err);
      }
    };
// 
    const fetchRole = async () => {
      try {
        const userResponse = await fetch(
          `http://studhouse.kz/api/v1/auth/user/${userId}/`
        );
        const user = await userResponse.json();
        setRole(user.role.role_name);
        console.log("user role asdasd", user.role.id);
      } catch (error) {
        console.log("Error fetching user role: ", error);
      }
    };

    fetchRole();
    fetchData();

    if (searchQuery) {
      const searchResults = data.filter((item: any) =>
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResult(searchResults);
    } else {
      setSearchResult([]);
    }
  }, [numberOfRooms, maxPayment, searchQuery]);

  const recordsPerPage = 6;
  const lastIndex = current * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = searchResult.length
    ? searchResult.slice(firstIndex, lastIndex)
    : data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(searchResult.length / recordsPerPage);
  const numbers = Array.from({ length: npage }).map((_, i) => i + 1);

  const changeCurrentPage = (page: number) => {
    setCurrent(page);
    window.history.pushState({}, "", `/?page=${page}`);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleRoomSelect = (selectedOption: any) => {
    const roomMapping: { [key: string]: any } = {
      "1 -комнатная": 1,
      "2 -комнатная": 2,
      "3 -комнатная": 3,
    };

    setNumberOfRooms(roomMapping[selectedOption]);
  };

  const handleMaxPayment = (event: string | any) => {
    const numericValue = event.target?.value.replace(/\D/g, "");
    setMaxPayment(numericValue);
  };

  const handleOkButtonClick = () => {
    handleMaxPayment(inputPrice);
    setIsOpen(false);
  };

  return (
    <section className="pb-[45px]">
      {/*-----*/}
      <div className="container mt-[50px] flex items-center  gap-[100px] mb-[60px]">
        <div className="flex items-center gap-2">
          <Image src={"/Search.png"} width={29} height={29} alt="search" />
          <Input
            placeholder="Поиск"
            className="search-input pb-[5px] text-black text-md"
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="flex gap-[30px] items-center">
          <div className="flex gap-[5px] items-center">
            <div className="relative">
              <Button
                className="text-[20px] font-medium"
                onClick={toggleDropdown}
              >
                Макс. оплата
              </Button>
            </div>
            <span className="-rotate-90">
              <Arrow />
            </span>
            <div className="relative">
              {isOpen && (
                <div className="absolute rounded-[6px] bg-white py-4 px-[15px] z-50 top-5 left-[-15rem]">
                  <div className="flex gap-5 items-center">
                    <div className="border-[1px] border-black rounded-[10px] ">
                      <Input
                        className="p-2"
                        placeholder="Напишите сумму"
                        onChange={handleMaxPayment}
                        onKeyDown={(event: any) => {
                          const regex = new RegExp("^[0-9]+$");
                          if (!regex.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <Button
                      onClick={handleOkButtonClick}
                      className="rounded-[10px] py-[5px] px-[15px] text-white bg-blue text-[16px] font-medium"
                    >
                      ок
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-[15px]">
            <DropdownFilter
              options={roomsData}
              buttonStyle="text-[20px] font-medium "
              listStyle="bg-white gap-3 py-3 px-10"
              defaultLabel={"Кол. комнат"}
              onSelect={(selectedOption: any) =>
                handleRoomSelect(selectedOption)
              }
            />
            <span className="-rotate-90">
              <Arrow />
            </span>
          </div>
        </div>
      </div>
      <div className="container grid grid-cols-2 gap-[92px] mb-12">
        <ProductList records={records} />
      </div>
      <div className="container flex gap-4 items-center justify-center">
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
