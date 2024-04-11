import MainPage from "@/pages/Main/ui/MainPage";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout showFooter={true}>
      <main className="container">
        <MainPage />
      </main>
    </Layout>
  );
}
