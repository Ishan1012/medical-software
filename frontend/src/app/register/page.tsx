'use client';
import React, { useState } from 'react'
import RegisterForm from '@/pages/RegisterForm'
import Header from '@/pages/Header'
import Footer from '@/pages/Footer'
import UserSelectionPage from '@/pages/UserSelectionPage';
import { UserType } from '@/types/type';

export default function Doctor() {
  const [userType, setUserType] = useState<UserType | null>(null);
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
  );
}
