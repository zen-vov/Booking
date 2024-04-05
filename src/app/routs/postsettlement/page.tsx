import PostSettlementPage from "@/pages/PostSettlement/ui/PostSettlement";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout type="login" isHouse={true} showFooter={false}>
      <main className="container">
        <PostSettlementPage />
      </main>
    </Layout>
  );
}
