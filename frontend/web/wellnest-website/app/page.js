import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import Footer from "@/components/Footer";
export default function Home() {
  const underDevelopment = 0;
  return (
    <div>
      <Header status={underDevelopment} />
      <LandingPage />
      <Footer />
    </div>
  );
}
