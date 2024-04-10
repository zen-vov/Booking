import React from "react";
import Image from "next/image";

interface CardProps {
  image: string;
  name: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, name, description }) => {
  return (
    <div className="flex flex-col w-[320px] h-fit py-[30px] px-[20px] relative">
      {image === "/Landing/students.png" ? (
        <div>
          <div className="absolute right-[10px]">
            <Image width={235} height={150} src={image} alt={name} />
          </div>
          <div className="flex flex-col gap-[10px] w-[280px] mb-[20px] mt-[167px]">
            <p className="text-lg2 text-primary text-lg text-center font-semibold">
              {name}
            </p>
            <p className="text-sm font-700 text-center text-gray">
              {description}
            </p>
          </div>
        </div>
      ) : (
        <div>
          {image === "/Landing/Handshake.png" ? (
            <div className="mx-auto mb-[37px] pt-[20px] flex justify-center">
              <Image width={235} height={150} src={image} alt={name} />
            </div>
          ) : (
            <div className="mx-auto mb-[17px] flex justify-center">
              <Image width={235} height={150} src={image} alt={name} />
            </div>
          )}
          <div className="flex flex-col gap-[10px] w-[280px] mb-[20px]">
            <p className="text-lg2 text-primary text-lg text-center font-semibold">
              {name}
            </p>
            <p className="text-sm font-700 text-center text-gray">
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
