import Footer from "@/pages/Footer";
import Header from "@/pages/Header";
import LandingPage from "@/pages/LandingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Home() {
  const GoogleAuthWrapperSignInPage = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    return <>
      <GoogleOAuthProvider clientId={clientId}>
        <Header />
        <LandingPage />
        <Footer />
      </GoogleOAuthProvider>
    </>
  }
  return <GoogleAuthWrapperSignInPage />;
}
