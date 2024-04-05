import SettingsPage from "@/pages/Settings/ui/Settings";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout type="login" isHouse={true} showFooter={false}>
      <main className="container">
        <SettingsPage />
      </main>
    </Layout>
  );
}
