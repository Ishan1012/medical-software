'use client';
import React, { useState } from 'react'
import RegisterForm from '@/pages/RegisterForm'
import Header from '@/pages/Header'
import Footer from '@/pages/Footer'
import UserSelectionPage from '@/pages/UserSelectionPage';
import { UserType } from '@/types/type';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Doctor() {
  const [userType, setUserType] = useState<UserType | null>(null);
  const GoogleAuthWrapperRegisterPage = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    return <>
      <GoogleOAuthProvider clientId={clientId}>
        <Header />
        {
          !userType ? (
            <UserSelectionPage setUserType={setUserType} />
          ) : (
            <RegisterForm userType={userType} />
          )
        }
        <Footer />
      </GoogleOAuthProvider>
    </>
  }
  return <GoogleAuthWrapperRegisterPage />;
}
