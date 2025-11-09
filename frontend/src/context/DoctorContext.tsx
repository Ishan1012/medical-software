'use client';
import { getDoctorsApi, registerDoctorApi } from "@/apis/apis";
import { Doctor, DoctorFormData } from "@/types/type";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface DoctorContextType {
    submitRegistrationForm: (registrationForm: DoctorFormData) => Promise<boolean | null>;
    getDoctors: () => Promise<Doctor[]>;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
    
    const submitRegistrationForm = async (registrationForm: DoctorFormData): Promise<boolean | null> => {
        try {
            const response = await registerDoctorApi(registrationForm);
            const doctor: Doctor = response.data.doctor;

            if (!doctor) {
                console.log("Unable to register the doctor");
                return false;
            }

            return true;
        } catch (error) {
            console.log(error);
        }

        return false;
    }
    
    const getDoctors = async (): Promise<Doctor[]> => {
        try {
            const response = await getDoctorsApi();
            const success = response.data.success;
            let doctors: Doctor[] = response.data.doctors;

            if (!success) {
                throw new Error("An error occured in fetching doctors!");
            }

            return doctors;
        } catch (error) {
            console.log(error);
        }

        return [];
    }

    const value = {
        getDoctors,
        submitRegistrationForm
    }

    return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
}

export const useDoctor = (): DoctorContextType => {
    const context = useContext(DoctorContext);

    if (context === undefined) {
        throw new Error("⚠️ useDoctor() called outside of <DoctorProvider>.");
    } else {
        return context;
    }
}