import { Document } from "mongoose";

export interface IDoctor extends Document {
    name: string;
    email: string;
    password: string;
    speciality: string;
    qualification?: string;
    profileUrl?: string;
    status: string;
    isVerified: boolean;
    verificationToken?: string;
    isAdmin: boolean;
    availability: string[];
    timeSlots: string[];
    rating: number;
    ratingCount: number;
    experience: string;
    description?: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    x?: string;
}