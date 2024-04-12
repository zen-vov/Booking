"use client";
import ProductCard, {
  ProductProps,
} from "@/entities/ProductCard/ui/ProductCard";
import axios from "axios";
import { BASE_URL } from "@/shared/api/BASE";
import { useEffect, useState } from "react";

interface ProductListI {
  records?: ProductProps[];
}

export default function ProductList({ records }: ProductListI) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const { data: res } = await axios.get(`${BASE_URL}/advertisement`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
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
      {data?.map(
        ({ id, location, price, creationDate, advertisement_images }) => (
          <>
            <ProductCard
              id={id}
              location={location}
              price={price}
              creationDate={creationDate}
              advertisement_images={advertisement_images[0]}
            />
          </>
        )
      )}
    </>
  );
}
