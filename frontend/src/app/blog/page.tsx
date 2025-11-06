import React from 'react'
import BlogPage from '@/pages/BlogPage'
import Header from '@/pages/Header'
import Footer from '@/pages/Footer'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Blog() {
    const GoogleAuthWrapperBlogPage = () => {
        const clientId = process.env.GOOGLE_CLIENT_ID || '';
        return <>
            <GoogleOAuthProvider clientId={clientId}>
                <Header />
                <BlogPage />
                <Footer />
            </GoogleOAuthProvider>
        </>
    };
    return <GoogleAuthWrapperBlogPage />;
}
