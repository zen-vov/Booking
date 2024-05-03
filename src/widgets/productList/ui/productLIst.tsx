"use client";
import ProductCard, {
  ProductProps,
} from "@/entities/ProductCard/ui/ProductCard";
import Link from "next/link";

interface ProductListI {
  records?: ProductProps[];
}

export default function ProductList({ records }: ProductListI) {

  return (
    <>
      {records?.map(
        ({ id, location, price, creationDate, advertisement_images }) => (
          <Link href={`/routs/product/${id}`} key={id} passHref>
            <ProductCard
              id={id}
              location={location}
              price={price}
              creationDate={creationDate}
              advertisement_images={advertisement_images}
            />
          </Link>
        )
      )}
    </>
  );
}
