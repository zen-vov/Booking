"use client";
import ProductCard, {
  ProductProps,
} from "@/entities/ProductCard/ui/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

export const mainData = [
  {
    id: 1,
    address: "г. Алматы, Бостандыкский район",
    price: "320 000",
    dataAT: "11.03.2024",
    photo: [
      "/Image1.png",
      "/Image1.png",
      "/Image1.png",
    ]
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

interface ProductListI {
  records: ProductProps[];
}

export default function ProductList({ records }: ProductListI) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: res } = await axios.get(`${BASE_URL}/advertisement`);
        console.log(res);
        setData(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {records.map(({ id, address, price, dataAT, photo }) => (
        <>
          <ProductCard
            id={id}
            address={address}
            price={price}
            dataAT={dataAT}
            photo={photo}
          />
        </>
      ))}
    </>
  );
}
