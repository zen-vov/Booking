import StudentPostHouse from "@/pages/PostHousing/ui/student/StudentPostHouse";
import Layout from "@/widgets/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="container">
        <StudentPostHouse />
      </main>
    </Layout>
  );
}
