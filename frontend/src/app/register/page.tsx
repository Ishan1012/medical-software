'use client';
import React, { useState } from 'react'
import Footer from '@/pages/Footer'
import UserSelectionPage from '@/pages/UserSelectionPage';
import { UserType } from '@/types/type';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const RegisterForm = dynamic(() => import("@/components/RegisterForm"), { ssr: false });

export default function Doctor() {
  const [userType, setUserType] = useState<UserType | null>(null);
  if (!userType) {
    return (
      <>
        <Header />
        <UserSelectionPage setUserType={setUserType} />
        <Footer />
      </>
    )
  }
  return (
    <>
      <Header />
      <RegisterForm userType={userType} />
      <Footer />
    </>
  );
}
