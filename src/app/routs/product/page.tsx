import MainPage from "@/pages/Main/ui/MainPage";
import ProductPage from "@/pages/ProductPage/ui/ProductPage";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="container">
        {/* <MainPage /> */}
        <ProductPage />
      </main>
    </Layout>
  );
}