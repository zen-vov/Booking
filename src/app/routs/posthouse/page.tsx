import PostHousePage from "@/pages/PostHousing/ui/PostHousingPage";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="container">
        <PostHousePage />
      </main>
    </Layout>
  );
}
