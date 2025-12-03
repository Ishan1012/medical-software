export interface VerificationResponse {
    token: string;
    email: string;
    name: string;
    verificationToken: string;
    profile?: string;
}