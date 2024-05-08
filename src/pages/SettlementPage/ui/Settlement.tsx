"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { BASE_URL } from "@/shared/api/BASE";
import Input from "@/shared/ui/Input/Input";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import Button from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";
import Link from "next/link";
import SettlementList from "@/widgets/SettlementList/ui/Settlement";
import DropdownFilter from "@/features/DropdownFilter/ui/DropdownFilter";

const roomsData = [
  { label: "1 -комнатная" },
  { label: "2 -комнатная" },
  { label: "3 -комнатная" },
  { label: "4 -комнатная" },
];

export default function LandLord() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [active, setActive] = useState(false);
  const [role, setRole] = useState<1 | 2 | null>(null);
  const [hasAuth, setHasAuth] = useState(false);
  const [maxPayment, setMaxPayment] = useState<string>("");
  const [numberOfRooms, setNumberOfRooms] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputPrice, setInputPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setHasAuth(true);
        }

        const { data: res } = await axios.get(`${BASE_URL}/relocation/`, {
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

        // filteredData.sort((a: any, b: any) => {
        //   if (sortBy === "asc") {
        //     return a.price - b.price;
        //   } else {
        //     return b.price - a.price;
        //   }
        // });

        setData(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchRole = async () => {
      try {
        const userResponse = await fetch(
          `http://studhouse.kz/api/v1/auth/user/${userId}/`
        );
        const user = await userResponse.json();
        setRole(user.role.id);
        console.log("user role asdasd", user.role.id);
      } catch (error) {
        console.log("Error fetching user role: ", error);
      }
    };

    fetchRole();
    fetchData();
  }, [numberOfRooms, maxPayment, searchQuery, sortBy]);

  const recordsPerPage = 6;
  const lastIndex = current * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const recordsToDisplay = searchQuery
    ? searchResult.slice(firstIndex, lastIndex)
    : data.slice(firstIndex, lastIndex);

  const pageNumbers = Array.from({ length: totalPages }).map((_, i) => i + 1);

  useEffect(() => {
    if (searchQuery) {
      const searchResults = data.filter((item: any) =>
        item.location.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setSearchResult(searchResults);
      setTotalPages(Math.ceil(searchResults.length / recordsPerPage));
    } else {
      setSearchResult([]);
      setTotalPages(Math.ceil(data.length / recordsPerPage));
    }
    setCurrent(1);
  }, [searchQuery, data]);

  const changeCurrentPage = (page: number) => {
    setCurrent(page);
    setActive(true);
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
      "4 -комнатная": 4,
    };

    setNumberOfRooms(roomMapping[selectedOption]);
  };

  const handleMaxPayment = (event: string | any) => {
    const numericValue = event.target?.value.replace(/\D/g, "");
    setMaxPayment(numericValue);
  };

  const handleInputPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrice(event.target.value);
  };

  const handleOkButtonClick = () => {
    handleMaxPayment(inputPrice);
    setIsOpen(false);
  };

  return (
    <section className="pb-[45px]">
      {role === 1 && hasAuth && (
        <div className={`${styles.imgbg} flex`}>
          <div className=" py-[128px] flex flex-col items-start w-full">
            <div className="container flex flex-col">
              <span className="text-2xl mb-[1rem] font-semibold text-primary">
                Создай себе идеальное <br /> окружение
              </span>
              <Link href={"/routs/student/posthouse"} className="">
                <Button
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
      )}

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
            <Button
              className="text-[20px] font-medium"
              onClick={toggleDropdown}
            >
              Макс. оплата
            </Button>
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
                        onKeyPress={(event: any) => {
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
      </div>
      <div className={`grid__rel container grid gap-[92px] mb-12`}>
        <SettlementList records={recordsToDisplay} />
      </div>
      <div className="container flex gap-4 items-center justify-center">
        {pageNumbers.map((n, i) => (
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
