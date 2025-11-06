import React from 'react'
import ServicesPage from '@/pages/ServicesPage'
import Header from '@/pages/Header'
import Footer from '@/pages/Footer'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Services() {
  const GoogleAuthWrapperServicePage = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    return <>
      <GoogleOAuthProvider clientId={clientId}>
        <Header />
        <ServicesPage />
      <Footer />
      </GoogleOAuthProvider>
    </>
  };
  return <GoogleAuthWrapperServicePage />;
}
