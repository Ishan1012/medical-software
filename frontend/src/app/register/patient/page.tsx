'use client';
import Footer from '@/pages/Footer'
import React from 'react'
import dynamic from 'next/dynamic';
import PatientRegistration from '@/components/PatientRegistration';
import { PatientProvider } from '@/context/PatientContext';

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export default function PatientRegistrationPage() {
  return (
    <PatientProvider>
      <Header />
      <PatientRegistration />
      <Footer />
    </PatientProvider>
  );
}
