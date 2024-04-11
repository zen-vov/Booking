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
};

export default function ProductCard(props: ProductProps) {
  const { id, address, price, dataAT, photo } = props;

  // const [currentSlide, setCurrentSlide] = useState(0);

  // const handleSlideChange = (newSlide: number) => {
  //   setCurrentSlide(newSlide);
  // };

  //здесь будет логика вытаскивания айди продукта и формирования ссылки для копирования

  const copyLinkToClipboard = () => {
    const url = "http://localhost:3000/routs/product";
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Ссылка скопирована!");
      })
      .catch((error) => {
        console.error("Ошибка при копировании ссылки:", error);
      });
  };

  return (
    <div key={id} className="bg-white rounded-[12px] pb-[30px]">
      <Link href={"/routs/product"}>
        <Carousel leftControl="" rightControl="">
          <Image
            src={photo}
            width={618}
            height={476}
            className="bg-no-repeat relative"
            alt="photo"
          />
        </Carousel>
      </Link>

      <div className="flex justify-between px-7 pt-6">
        <div className="flex flex-col">
          <h1 className="text-md font-medium mb-[14px]">{address}</h1>
          <h3 className="text-md mb-6">{price} т/мес.</h3>
          <h5 className="text-sm">Опубликовано в {dataAT}</h5>
        </div>
        <div className="flex items-start gap-[1rem]">
          <button onClick={copyLinkToClipboard}>
            <Share />
          </button>
          <Like />
        </div>
      </div>
    </div>
  );
}
