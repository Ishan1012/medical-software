"use client";
import React from 'react'
import Header from '@/pages/Header'
import AboutPage from '@/pages/AboutPage'
import Footer from '@/pages/Footer'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function About() {
  const GoogleAuthWrapperAboutPage = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    return <>
      <GoogleOAuthProvider clientId={clientId}>
        <Header />
        <AboutPage />
        <Footer />
      </GoogleOAuthProvider>
    </>
  };
  return <GoogleAuthWrapperAboutPage />;
}
