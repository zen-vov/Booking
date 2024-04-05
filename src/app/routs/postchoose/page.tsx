import PostChoosePage from "@/pages/PostChoose/ui/PostChoosePage";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout type="login" isHouse={true} showFooter={false}>
      <main className="container">
        <PostChoosePage />
      </main>
    </Layout>
  );
}
