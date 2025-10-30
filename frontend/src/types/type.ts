import React from "react";
import { LucideIcon } from "lucide-react";

export interface Doctor {
    id: string;
    name: string;
    email: string;
    speciality: string;
    qualification?: string;
    profileUrl?: string | null;
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

export interface Patient {
    id: string;
    name: string;
    email: string;
    status: string;
    profile: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
}

export interface Appointment {
    patientId: string;
    appointmentType: string;
    doctor: string;
    fullname: string;
    age: number;
    address: string;
    phone: string;
    gender: string;
    email: string;
    appointmentDate: string;
    appointmentTime: string;
    concern?: string;
    status: string;
    timeSlots: string[];
}

export interface FormData {
    email: string;
    password: string;
}

export interface Testimonial {
    id: number;
    image: string;
    name: string;
    status: string;
    testimonial: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export interface Value {
    id: number;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    category: string;
    author: {
        name: string;
        profileUrl: string;
        speciality: string;
    };
    readTime: string;
    createdAt: string;
}

export interface FormDataConsult {
  patientid: string;
  personalInfo: {
    name: string;
    age: string;
    gender: string;
  };
  symptoms: {
    primarySymptom: string;
    duration: string;
    severity: string;
    additionalSymptoms: string;
    image: File | null;
  };
}

export interface Step {
  id: string;
  title: string;
  icon: LucideIcon;
}

export interface ConsultationResult {
  urgency: 'urgent' | 'moderate' | 'non-urgent' | string;
  doctor: string;
  reasoning: string;
  tips: string[];
}

export type UserType = 'patient' | 'doctor';