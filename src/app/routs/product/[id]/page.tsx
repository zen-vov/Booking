import ProductPage from "@/pages/ProductPage/ui/ProductPage";
import Layout from "@/widgets/Layout/Layout";

export default function Product() {
  return (
    <Layout>
      <main className="container">
        <ProductPage />
      </main>
    </Layout>
  );
}