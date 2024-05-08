"use client";
import ProductCard, {
  ProductProps,
} from "@/entities/ProductCard/ui/ProductCard";
import Link from "next/link";
import React from "react";

interface ProductListI {
  records?: ProductProps[];
}

export default function ProductList({ records }: ProductListI) {
  const [userRole, setUserRole] = React.useState<"Student" | "Landlord" | null>(
    null
  );

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");

    const decodedToken = jwt.decode(accessToken);
    const userId = decodedToken?.user_id;

    const fetchRole = async () => {
      try {
        const userResponse = await fetch(
          `http://studhouse.kz/api/v1/auth/user/${userId}/`
        );
        const user = await userResponse.json();
        console.log("user role: ", user.role.role_name);
        setUserRole(user.role.role_name);
      } catch (error) {
        console.error("Error fetching user role: ", error);
      }
    };

    fetchRole();
  }, []);

  return (
    <>
      {records?.map(
        ({
          id,
          location,
          price,
          creationDate,
          advertisement_images,
          is_favorite,
        }) => (
          // <Link href={`/routs/product/${id}`} key={id} passHref>
          <div>
            <ProductCard
              id={id}
              location={location}
              userRole={userRole}
              price={price}
              creationDate={creationDate}
              advertisement_images={advertisement_images}
              is_favorite={is_favorite}
            />
          </div>

          // </Link>
        )
      )}
    </>
  );
}
