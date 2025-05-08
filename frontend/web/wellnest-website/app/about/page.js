"use client";
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import AboutPage from '@/components/AboutPage'

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-700"></div>
  </div>
);

export default function About() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Header />
      <AboutPage />
    </div>
  )
}
