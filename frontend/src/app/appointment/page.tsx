'use client';
import React from 'react'
import AppointmentPage from '@/pages/AppointmentPage'
import dynamic from 'next/dynamic';

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export default function Appointment() {
  return (
    <>
      <Header />
      <AppointmentPage />
    </>
  )
}
