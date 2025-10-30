'use client';
import React, { useState } from 'react'
import RegisterForm from '@/pages/RegisterForm'
import Header from '@/pages/Header'
import Footer from '@/pages/Footer'
import UserSelectionPage from '@/pages/UserSelectionPage';

export default function Page() {
  const [userType, setUserType] = useState(null);
  return (
    <div>
      <Header />
      {
        !userType ? (
          <UserSelectionPage setUserType={setUserType} />
        ) : (
          <RegisterForm userType={userType} />
        )
      }
      <Footer />
    </div>
  )
}
