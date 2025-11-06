import ConsultPage from '@/pages/ConsultPage'
import Header from '@/pages/Header'
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'

export default function Consult() {
  const GoogleAuthWrapperConsultPage = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    return <>
      <GoogleOAuthProvider clientId={clientId}>
        <Header />
        <ConsultPage />
      </GoogleOAuthProvider>
    </>
  };
  return <GoogleAuthWrapperConsultPage />;
}
