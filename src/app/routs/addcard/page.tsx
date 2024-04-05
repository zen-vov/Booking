import AddCardPage from "@/pages/AddCard/ui/AddCard";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout type="login" isHouse={true} showFooter={false}>
      <main className="container">
        <AddCardPage />
      </main>
    </Layout>
  );
}
