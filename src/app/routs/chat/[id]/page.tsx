import ChatPage from "@/pages/Chat/ui/Chat";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="container">
        <ChatPage />
      </main>
    </Layout>
  )
}