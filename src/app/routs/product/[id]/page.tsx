import ProductPage from "@/pages/ProductPage/ui/ProductPage";
import Layout from "@/widgets/Layout/Layout";

export interface PageI {
  role: 1 | 2;
}

export default function Product({ role }: PageI) {
  return (
    <Layout userRole={role}>
      <main className="container">
        <ProductPage />
      </main>
    </Layout>
  );
}
