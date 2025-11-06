import Footer from '@/pages/Footer'
import Header from '@/pages/Header'
import DoctorRegistrationPage from '@/pages/DoctorRegistrationPage'
import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function DoctorRegistration() {
  const GoogleAuthWrapperDoctorRegistrationPage = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    return <>
      <GoogleOAuthProvider clientId={clientId}>
        <Header />
        <DoctorRegistrationPage />
        <Footer />
      </GoogleOAuthProvider>
    </>
  };
  return <GoogleAuthWrapperDoctorRegistrationPage />;

}
