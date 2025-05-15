import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import Footer from "@/components/Footer";
import dotenv from "dotenv";

dotenv.config();

export default function Home() {
  const underDevelopment = process.env.DEVELOPER_MODE === "true";
  return (
    <div>
      <Header status={underDevelopment} />
      <LandingPage />
      <Footer />
    </div>
  );
}
