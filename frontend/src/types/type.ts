import React from "react";
import { LucideIcon } from "lucide-react";

export interface UserSession {
  email: string;
  name: string;
  token: string;
  profile: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface PatientRequest {
  patient?: Patient;
}

export interface SignUpRequest {
  role: string;
  name: string;
  email: string;
  password: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  address: string;
  phone: string;
  experience: string;
  profileUrl: string;
  availability: string[];
  timeSlots: string[];
  lat: number;
  lng: number;
  email: string;
  password: string;
  notifications: {
    appointmentReminders: boolean;
    healthTips: boolean;
    promotionalUpdates: boolean;
  };
}

export interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
  concern: string;
}

export interface AppointmentDetails {
  id: string;
  type: string;
  doctor: Doctor | null;
  date: string;
  time: string;
  patientInfo: PatientInfo;
  reportUrl?: string;
}

export interface AppointmentType {
  title: string;
  description: string;
  icon: React.ReactElement<LucideIcon>;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  password?: string;
  isOAuth: boolean;
  detailsComplete: boolean;
  status: string;
  isVerified: boolean;
  verificationToken?: string | undefined;
  profileUrl?: string;
  age: number;
  phone: string;
  isPhoneVerified: boolean;
  address: string;
  upcomingAppointments: AppointmentDetails[];
  medicalRecords: AppointmentDetails[];
  createdAt: Date;
  updatedAt: Date;
}

export type UserType = 'Patient' | 'Doctor';

// ---------------------------------------------------

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