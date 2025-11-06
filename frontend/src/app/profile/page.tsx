import Header from '@/pages/Header'
import ProfilePage from '@/pages/ProfilePage'
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'

export default async function Profile() {
    const GoogleAuthWrapperProfilePage = () => {
        const clientId = process.env.GOOGLE_CLIENT_ID || '';
        return <>
            <GoogleOAuthProvider clientId={clientId}>
                <Header />
                <ProfilePage />
            </GoogleOAuthProvider>
        </>
    }
    return <GoogleAuthWrapperProfilePage />;
}
