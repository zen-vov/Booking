import LandingPage from "@/pages/Landing/ui/LandingPage";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout type="login" isHouse={false} showFooter={true}>
      <main className="container">
        <LandingPage />
      </main>
    </Layout>
  );
}
