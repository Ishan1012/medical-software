import React from 'react'
import LoginForm from '@/pages/LoginForm'
import Header from '@/pages/Header'
import Footer from '@/pages/Footer'
import { GoogleOAuthProvider } from '@react-oauth/google'

export default function Login() {
  const GoogleAuthWrapperSignInPage = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    return <>
      <Header />
      <GoogleOAuthProvider clientId={clientId}>
        <LoginForm />
      </GoogleOAuthProvider>
      <Footer />
    </>
  }
  return <GoogleAuthWrapperSignInPage />;
}
