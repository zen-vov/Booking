import AboutUs from "@/widgets/AboutUs/ui/aboutus";

export default function AboutPage() {
  return (
    <section className="flex gap-[56px]">
      <div>
        <h1 className="text-xl font-semibold mb-9">О компании</h1>
        <div className="flex flex-col">
          <h3 className="border-b-[1px] text-md font-semibold whitespace-nowrap border-[#767272] pb-[9px]">Контакты</h3>
          <h3 className="border-b-[1px] text-md font-semibold whitespace-nowrap border-[#767272] py-[9px]">FAQ</h3>
          <h3 className="border-b-[1px] text-md font-semibold whitespace-nowrap border-[#767272] py-[9px]">
            Оцените нас
          </h3>
          <h3 className="border-b-[1px] text-md font-semibold whitespace-nowrap border-[#767272] py-[9px]">
            Обратная связь
          </h3>
          <h3 className="py-[9px] text-md font-semibold whitespace-nowrap">Сообщить о проблеме</h3>
        </div>
      </div>
      <AboutUs />
    </section>
  );
}
