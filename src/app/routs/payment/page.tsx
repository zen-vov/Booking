import PaymentPage from "@/pages/Payment/ui/Payment";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout type="login" isHouse={true} showFooter={false}>
      <main className="container">
        <PaymentPage />
      </main>
    </Layout>
  );
}
