import PostHousePage from "@/pages/PostHousing/ui/PostHousingPage";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout type="login" isHouse={true} showFooter={false}>
      <main className="container">
        <PostHousePage />
      </main>
    </Layout>
  );
}
