"use client";
import { type ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/sonner";
import { DoctorProvider } from "@/context/DoctorContext";

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<AuthProvider>
				<DoctorProvider>
					{children}
					<Toaster position="bottom-right" richColors />
				</DoctorProvider>
			</AuthProvider>
		</GoogleOAuthProvider>
	);
}
