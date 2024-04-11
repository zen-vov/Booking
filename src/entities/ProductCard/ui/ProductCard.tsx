import { Carousel } from "flowbite-react";
import Like from "@/shared/ui/Icons/Like/Like";
import Share from "@/shared/ui/Icons/Share/Share";
import Image from "next/image";
import Link from "next/link";

export type ProductProps = {
  id: number;
  address: string;
  price: string;
  dataAT: string;
  photo: any;
}

export default function ProductCard(props: ProductProps) {
  const { id, address, price, dataAT, photo } = props;

  // const [currentSlide, setCurrentSlide] = useState(0);

  // const handleSlideChange = (newSlide: number) => {
  //   setCurrentSlide(newSlide);
  // };

  return (
    <Link key={id} href={"/routs/product"}>
      <div className="bg-white rounded-[12px] pb-[30px]">
        <Carousel leftControl='' rightControl=''>
          <Image 
            src={photo}
            width={618}
            height={476}
            className="bg-no-repeat relative"
            alt="photo"
          />
        </Carousel>
        <div className="flex justify-between px-7 pt-6">
          <div className="flex flex-col">
            <h1 className="text-md font-medium mb-[14px]">{address}</h1>
            <h3 className="text-md mb-6">{price} т/мес.</h3>
            <h5 className="text-sm">Опубликовано в {dataAT}</h5>
          </div>
          <div className="flex gap-[1rem]">
            <Share />
            <Like />
          </div>
        </div>
      </div>
    </Link>
  );
}
