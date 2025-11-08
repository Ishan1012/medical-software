import { Document } from "mongoose";

export interface IDoctor extends Document {
    name: string;
    email: string;
    password?: string;
    isOAuth: boolean;
    detailsComplete: boolean;
    specialty: string;
    qualifications?: string;
    profileUrl?: string;
    status: string;
    isVerified: boolean;
    verificationToken?: string | undefined;
    isAdmin: boolean;
    availability: string[];
    timeSlots: string[];
    address?: string;
    phone: string;
    isPhoneVerified: boolean;
    experience: string;
    lat: number;
    lng: number;
    notifications: {
        appointmentReminders: boolean;
        healthTips: boolean;
        promotionalUpdates: boolean;
    };
}