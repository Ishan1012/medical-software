"use client";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <AuthProvider>
                {children}
                <Toaster position="bottom-right" richColors />
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}