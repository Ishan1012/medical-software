'use client';
import React, { useState } from 'react'
import RegisterForm from '@/components/RegisterForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import UserSelectionPage from '@/components/UserSelectionPage';

export default function page() {
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
