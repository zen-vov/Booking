"use client";
import SettlementCard, {
  ProductProps,
} from "@/entities/settlementCard/ui/SettlementCard";
import Link from "next/link";

interface ProductListI {
  records?: ProductProps[];
}

export default function SettlementList({ records }: ProductListI) {
  return (
    <>
      {records?.map(
        ({
          id,
          author,
          location,
          price,
          creationDate,
          typeOfHouse,
          relocation_images,
        }) => (
          <Link href={`/routs/settlement/${id}`} key={id} passHref>
            <SettlementCard
              id={id}
              author={author}
              typeOfHouse={typeOfHouse}
              location={location}
              price={price}
              creationDate={creationDate}
              relocation_images={relocation_images}
            />
          </Link>
        )
      )}
    </>
  );
}
