import Input from "@/shared/ui/Input/Input";
import Image from "next/image";

export default function LandLord() {
  return (
    <section>
      <div className="flex items-center">
        <div className="flex items-center">
          <Image 
            src={'/Search.png'}
            width={29}
            height={29}
            alt="search"
          />
          <Input 
            className="search-input pb-[5px] text-black text-md"
          />
        </div>
        <div className="flex gap-[30px]">
          <div className="flex gap-[5px]">
            <span className="text-md text-black font-medium">Макс. оплата</span>
            <Image 
              src={'/arrow.png'}
              width={16}
              height={16}
              alt="arrow"
            />
          </div>
          <div className="flex gap-[5px]">
            <span className="text-md text-black font-medium">Кол. комнат</span>
            <Image 
              src={'/arrow.png'}
              width={16}
              height={16}
              alt="arrow"
            />
          </div>
          <h3 className="text-md font-medium text-black">Фильтр</h3>
        </div>
      </div>
    </section>
  )
}