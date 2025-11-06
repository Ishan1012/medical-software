import React from 'react'
import AppointmentPage from '@/pages/AppointmentPage'
import Header from '@/pages/Header'
import Footer from '@/pages/Footer'

export default function Appointment() {
  const GoogleAuthWrapperAppointmentPage = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    return <>
      <GoogleOAuthProvider clientId={clientId}>
        <Header />
        <AppointmentPage />
      </GoogleOAuthProvider>
    </>
  };
  return <GoogleAuthWrapperAppointmentPage />;
}
