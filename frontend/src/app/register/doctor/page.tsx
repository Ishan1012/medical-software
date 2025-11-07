'use client';
import Footer from '@/pages/Footer'
import DoctorRegistrationPage from '@/pages/DoctorRegistrationPage'
import React from 'react'
import dynamic from 'next/dynamic';

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export default function DoctorRegistration() {
  return (
    <>
      <Header />
      <DoctorRegistrationPage />
      <Footer />
    </>
  );
}
