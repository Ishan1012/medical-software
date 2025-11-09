'use client';
import { registerPatientApi } from "@/apis/apis";
import { Patient, PatientFormData } from "@/types/type";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface PatientContextType {
    submitRegistrationForm: (registrationForm: PatientFormData) => Promise<boolean | null>;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider = ({ children }: { children: ReactNode }) => {
    const submitRegistrationForm = async (registrationForm: PatientFormData): Promise<boolean | null> => {
        try {
            const response = await registerPatientApi(registrationForm);
            const patient: Patient = response.data.patient;

            if (!patient) {
                console.log("Unable to register the patient");
                return false;
            }

            return true;
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    const value = {
        submitRegistrationForm
    }

    return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
}

export const usePatient = (): PatientContextType => {
    const context = useContext(PatientContext);

    if (context === undefined) {
        throw new Error("⚠️ usePatient() called outside of <PatientProvider>.");
    } else {
        return context;
    }
}