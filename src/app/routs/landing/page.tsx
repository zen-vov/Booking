import LandingPage from "@/pages/Landing/ui/LandingPage";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout type="login">
      <main className="container">
        <LandingPage />
      </main>
    </Layout>
  );
}
