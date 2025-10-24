import { Document } from "mongoose";

export interface IPatient extends Document{
    name: string;
    email: string;
    password?: string;
    isOAuth: boolean;
    status: string;
    isVerified: boolean;
    verificationToken?: string;
    profile: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    createdAt: Date;
    updatedAt: Date;
}